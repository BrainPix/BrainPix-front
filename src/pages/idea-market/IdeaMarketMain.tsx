import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styles from './ideaMarketMain.module.scss';
import PreviewThumbnail from '../../components/preview/PreviewThumbnail';
import { Carousel } from '../../components/common/carousel/Carousel';
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

export const IdeaMarketMain = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [_cardsData, setCardsData] = useState<CardData[]>([]);
  const [ideaData, setIdeaData] = useState<IdeaData[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
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
      } catch {
        throw Error;
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
    } catch {
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
          <span className={styles.mainTitle}>아이디어 마켓</span>
          <span className={styles.subtitle}>Idea Solution</span>
        </div>
        <button
          className={styles.registerButton}
          onClick={() => navigate('/idea-market/register')}>
          아이디어 등록하기
        </button>
      </div>
      <div className={styles.carouselWrapper}>
        <div className={styles.ideaMarketMain}>
          <div className={styles.subTitle}>
            <span>전문가의 손길로 완성되는 아이디어</span>
            <span className={styles.highlight}></span>
          </div>
          <div>
            <Carousel
              buttonPosition='center'
              cardWidth={200}
              cardCount={3}
              gap={45}
              dataLength={ideaData.length}>
              {ideaData.map((idea) => (
                <div
                  key={idea.ideaId}
                  className={styles.carouselItem}>
                  <PreviewThumbnail
                    data={{
                      ideaId: idea.ideaId,
                      username: idea.writerName,
                      description: idea.title,
                      price: idea.price,
                      imageUrl: idea.thumbnailImageUrl || '',
                      profileImage: idea.writerImageUrl,
                      isBookmarked: idea.isSavedPost,
                      saves: idea.saveCount,
                      views: idea.viewCount,
                      auth: idea.auth,
                      category: idea.category,
                      size: 'large',
                      onBookmarkClick: () => handleBookmarkClick(idea.ideaId),
                    }}
                  />
                </div>
              ))}
            </Carousel>
          </div>
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
