import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './requestAssignMain.module.scss';
import PreviewThumbnail from '../../components/preview/PreviewThumbnail';
import { Carousel } from '../../components/common/carousel/Carousel';
import {
  toggleIdeaBookmark,
  getIdeaList,
  GetIdeaListRequest,
} from '../../apis/requestAssignMainPageAPI';
import DownButton from '../../assets/icons/categoryDownButton.svg?react';
import UpButton from '../../assets/icons/categoryUpButton.svg?react';

const categoryMapReverse: Record<string, string> = {
  '광고 · 홍보': 'ADVERTISING_PROMOTION',
  디자인: 'DESIGN',
  레슨: 'LESSON',
  마케팅: 'MARKETING',
  '문서 · 글쓰기': 'DOCUMENT_WRITING',
  '미디어 · 콘텐츠': 'MEDIA_CONTENT',
  '번역 및 통역': 'TRANSLATION_INTERPRETATION',
  '세무 · 법무 · 노무': 'TAX_LAW_LABOR',
  주문제작: 'CUSTOM_PRODUCTION',
  '창업 · 사업': 'STARTUP_BUSINESS',
  '푸드 및 음료': 'FOOD_BEVERAGE',
  'IT · 테크': 'IT_TECH',
  기타: 'OTHERS',
};

type SortType =
  | 'NEWEST'
  | 'OLDEST'
  | 'POPULAR'
  | 'HIGHEST_PRICE'
  | 'LOWEST_PRICE';

const sortMap: Record<string, SortType> = {
  newest: 'NEWEST',
  oldest: 'OLDEST',
  popular: 'POPULAR',
  highView: 'HIGHEST_PRICE',
  lowView: 'LOWEST_PRICE',
};

export const RequestAssignMain = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [viewOption, setViewOption] = useState<'all' | 'company'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('카테고리');
  const [sortType, setSortType] = useState<SortType>('NEWEST');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { data: ideaListResponse, isLoading } = useQuery({
    queryKey: ['ideaList', selectedCategory, viewOption, sortType],
    queryFn: async () => {
      const params: GetIdeaListRequest = {
        type: 'OPEN_IDEA',
        page: 0,
        size: 10,
        sortType: sortType,
      };

      if (selectedCategory !== '카테고리') {
        params.category = categoryMapReverse[selectedCategory];
      }

      return await getIdeaList(params);
    },
  });

  const { data: popularIdeaResponse } = useQuery({
    queryKey: ['popularIdeas'],
    queryFn: async () => {
      const params: GetIdeaListRequest = {
        type: 'OPEN_IDEA',
        page: 0,
        size: 9,
        sortType: 'POPULAR',
      };

      return await getIdeaList(params);
    },
  });

  const popularIdeaData = useMemo(() => {
    if (!popularIdeaResponse?.success) return [];
    return popularIdeaResponse.data.content.slice(0, 9);
  }, [popularIdeaResponse]);

  const ideaData = useMemo(() => {
    if (!ideaListResponse?.success) return [];

    return ideaListResponse.data.content.filter((item) =>
      viewOption === 'company' ? item.auth === 'COMPANY' : item.auth === 'ALL',
    );
  }, [ideaListResponse, viewOption]);

  const handleViewOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newViewOption = event.target.value as 'all' | 'company';
    setViewOption(newViewOption);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  const handleBookmarkClick = async (ideaId: number) => {
    try {
      const response = await toggleIdeaBookmark(ideaId);
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ['ideaList'] });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error('북마크 처리 실패:', err.message);
      } else {
        console.error('북마크 처리 중 에러:', err);
      }
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortMap: Record<string, SortType> = {
      newest: 'NEWEST',
      oldest: 'OLDEST',
      popular: 'POPULAR',
      highView: 'HIGHEST_PRICE',
      lowView: 'LOWEST_PRICE',
    };

    const newSortType = sortMap[event.target.value] as SortType;
    setSortType(newSortType);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownItems = useMemo(() => {
    return Object.keys(categoryMapReverse).map((category) => (
      <div
        key={category}
        className={styles.dropdownItem}
        onClick={(e) => {
          e.stopPropagation();
          handleCategorySelect(category);
        }}>
        {category}
      </div>
    ));
  }, []);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className={styles.ideaMarketHeader}>
        <div className={styles.titleWrapper}>
          <span className={styles.mainTitle}>요청 과제</span>
          <span className={styles.subtitle}>Open Idea</span>
        </div>
        <button
          className={styles.registerButton}
          onClick={() => navigate('/request-assign/register')}>
          요청 과제 등록하기
        </button>
      </div>
      <div className={styles.carouselWrapper}>
        <div className={styles.ideaMarketMain}>
          <div className={styles.subTitle}>
            <span>누구나 참여할 수 있는 창의적인 아이디어 과제</span>
            <span className={styles.highlight}></span>
          </div>
          <Carousel
            buttonPosition='center'
            cardWidth={200}
            cardCount={3}
            gap={45}
            dataLength={popularIdeaData.length}>
            {popularIdeaData.map((idea) => (
              <div
                key={idea.taskId}
                className={styles.carouselItem}>
                <PreviewThumbnail
                  data={{
                    ideaId: idea.taskId,
                    routePrefix: 'request-assign',
                    username: idea.writerName,
                    description: idea.title,
                    deadline: idea.deadline,
                    imageUrl: idea.thumbnailImageUrl || '',
                    profileImage: idea.writerImageUrl,
                    isBookmarked: idea.isSavedPost,
                    saves: idea.saveCount,
                    views: idea.viewCount,
                    auth: idea.auth,
                    category: idea.category,
                    size: 'large',
                    onBookmarkClick: () => handleBookmarkClick(idea.taskId),
                  }}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <div className={styles.headerComponents}>
        <div className={styles.leftComponents}>
          <div className={styles.ideaText}>맞춤형 아이디어 모아보기</div>
          <div className={styles.filterWrapper}>
            <div
              ref={dropdownRef}
              className={styles.select}
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen((prev) => !prev);
              }}>
              <span>{selectedCategory}</span>
              {isDropdownOpen ? <UpButton /> : <DownButton />}
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>{dropdownItems}</div>
              )}
            </div>
            <div className={styles.viewOptions}>
              <label className={styles.radioWrapper}>
                <input
                  type='radio'
                  name='viewOption'
                  value='all'
                  checked={viewOption === 'all'}
                  onChange={handleViewOptionChange}
                />
                <span className={styles.radioLabel}>기업 공개 제외</span>
              </label>
              <label className={styles.radioWrapper}>
                <input
                  type='radio'
                  name='viewOption'
                  value='company'
                  checked={viewOption === 'company'}
                  onChange={handleViewOptionChange}
                />
                <span className={styles.radioLabel}>기업 공개만</span>
              </label>
            </div>
          </div>
        </div>
        <div className={styles.rightComponents}>
          <div className={styles.sortDropdown}>
            <select
              className={styles.sortSelect}
              onChange={handleSortChange}
              value={
                Object.entries(sortMap).find(
                  ([_, value]) => value === sortType,
                )?.[0] || 'newest'
              }>
              <option value='newest'>최신순</option>
              <option value='oldest'>오래된순</option>
              <option value='popular'>저장순</option>
              <option value='highView'>높은 가격순</option>
              <option value='lowView'>낮은 가격순</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.thumbnailGrid}>
        {ideaData.map((idea) => (
          <PreviewThumbnail
            key={idea.taskId}
            data={{
              ideaId: idea.taskId,
              routePrefix: 'request-assign',
              username: idea.writerName,
              description: idea.title,
              deadline: idea.deadline,
              imageUrl: idea.thumbnailImageUrl || undefined,
              profileImage: idea.writerImageUrl,
              isBookmarked: idea.isSavedPost,
              saves: idea.saveCount,
              views: idea.viewCount,
              auth: idea.auth,
              category: idea.category,
              onBookmarkClick: () => handleBookmarkClick(idea.taskId),
            }}
          />
        ))}
      </div>
    </>
  );
};
