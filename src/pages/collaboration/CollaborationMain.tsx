import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import axios from 'axios';
import styles from './collaborationMain.module.scss';
import PreviewThumbnail from '../../components/preview/PreviewThumbnail';
import {
  toggleIdeaBookmark,
  getIdeaList,
  GetIdeaListRequest,
} from '../../apis/mainPageAPI';
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

interface IdeaData {
  ideaId: number;
  auth: 'ALL' | 'COMPANY' | 'ME';
  writerImageUrl: string;
  writerName: string;
  thumbnailImageUrl: string;
  title: string;
  price: number;
  category: string;
  saveCount: number;
  viewCount: number;
  isSavedPost: boolean;
}
interface CardData {
  id: number;
  isBookmarked?: boolean;
  saves: number;
  views: number;
}

export const CollaborationMain = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [_cardsData, setCardsData] = useState<CardData[]>([]);
  const [ideaData, setIdeaData] = useState<IdeaData[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true); // 초기 로딩용
  const [_isUpdating, setIsUpdating] = useState(false);
  const [viewOption, setViewOption] = useState<'all' | 'company'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('카테고리');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchIdeas = useCallback(
    async (category?: string) => {
      try {
        setIsUpdating(true);
        const params: GetIdeaListRequest = {
          type: 'IDEA_SOLUTION',
          page: 0,
          size: 10,
        };

        if (category && category !== '분야별') {
          params.category = categoryMapReverse[category];
        }

        const response = await getIdeaList(params);

        if (response.success) {
          const filteredData =
            viewOption === 'company'
              ? response.data.content.filter((item) => item.auth === 'COMPANY')
              : response.data.content.filter((item) => item.auth !== 'COMPANY');

          setIdeaData(filteredData);
          setCardsData(
            filteredData.map((item) => ({
              id: item.ideaId,
              isBookmarked: item.isSavedPost,
              saves: item.saveCount,
              views: item.viewCount,
            })),
          );
        }
      } catch (error) {
        console.error('아이디어 데이터 로딩 중 에러:', error);
      } finally {
        setIsInitialLoading(false);
        setIsUpdating(false);
      }
    },
    [viewOption],
  );

  const handleViewOptionChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newViewOption = event.target.value as 'all' | 'company';
      setViewOption(newViewOption);
      fetchIdeas(selectedCategory);
    },
    [fetchIdeas, selectedCategory],
  );

  const handleCategorySelect = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      setIsDropdownOpen(false);
      fetchIdeas(category);
    },
    [fetchIdeas],
  );

  const handleBookmarkClick = async (ideaId: number) => {
    try {
      setIdeaData((prevData) =>
        prevData.map((idea) =>
          idea.ideaId === ideaId
            ? {
                ...idea,
                isSavedPost: !idea.isSavedPost,
                saveCount: idea.saveCount + (idea.isSavedPost ? -1 : 1),
              }
            : idea,
        ),
      );

      const response = await toggleIdeaBookmark(ideaId);

      if (!response.success) {
        setIdeaData((prevData) =>
          prevData.map((idea) =>
            idea.ideaId === ideaId
              ? {
                  ...idea,
                  isSavedPost: !idea.isSavedPost,
                  saveCount: idea.saveCount + (idea.isSavedPost ? 1 : -1),
                }
              : idea,
          ),
        );
      }
    } catch (err) {
      setIdeaData((prevData) =>
        prevData.map((idea) =>
          idea.ideaId === ideaId
            ? {
                ...idea,
                isSavedPost: !idea.isSavedPost,
                saveCount: idea.saveCount + (idea.isSavedPost ? 1 : -1),
              }
            : idea,
        ),
      );

      if (axios.isAxiosError(err)) {
        console.error('북마크 처리 실패:', err.message);
      } else {
        console.error('북마크 처리 중 에러:', err);
      }
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

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
  }, [handleCategorySelect]);

  if (isInitialLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className={styles.ideaMarketHeader}>
        <div className={styles.titleWrapper}>
          <span className={styles.mainTitle}>협업 광장</span>
        </div>
        <button
          className={styles.registerButton}
          onClick={() => navigate('/collaboration/register')}>
          팀원 모집 등록하기
        </button>
      </div>

      <div className={styles.headerComponents}>
        <div className={styles.leftComponents}>
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
            <select className={styles.sortSelect}>
              <option value='newest'>최신순</option>
              <option value='popular'>오래된순</option>
              <option value='low'>저가순</option>
              <option value='highView'>낮은 가격순</option>
              <option value='lowView'>높은 가격순</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.thumbnailGrid}>
        {ideaData.map((idea) => (
          <PreviewThumbnail
            key={idea.ideaId}
            data={{
              ideaId: idea.ideaId,
              username: idea.writerName,
              description: idea.title,
              price: idea.price,
              imageUrl: idea.thumbnailImageUrl || undefined,
              profileImage: idea.writerImageUrl,
              isBookmarked: idea.isSavedPost,
              saves: idea.saveCount,
              views: idea.viewCount,
              auth: idea.auth,
              category: idea.category,
              onBookmarkClick: () => handleBookmarkClick(idea.ideaId),
            }}
          />
        ))}
      </div>
    </>
  );
};
