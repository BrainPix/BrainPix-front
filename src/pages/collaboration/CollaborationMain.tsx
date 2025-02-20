import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styles from './collaborationMain.module.scss';
import PreviewThumbnail from '../../components/preview/PreviewThumbnail';
import {
  toggleCollaborationBookmark,
  getCollaborationList,
} from '../../apis/collaborationAPI';
import { GetCollaborationListRequest } from '../../types/collaborationType';
import DownButton from '../../assets/icons/categoryDownButton.svg?react';
import UpButton from '../../assets/icons/categoryUpButton.svg?react';
import LoadingPage from '../loading/LoadingPage';

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

interface CollaborationData {
  collaborationId: number;
  auth: 'ALL' | 'COMPANY' | 'ME';
  writerImageUrl: string;
  writerName: string;
  thumbnailImageUrl: string;
  title: string;
  deadline: number;
  category: string;
  occupiedQuantity: number;
  totalQuantity: number;
  saveCount: number;
  viewCount: number;
  isSavedPost: boolean;
}

export const CollaborationMain = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [collaborationData, setCollaborationData] = useState<
    CollaborationData[]
  >([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [viewOption, setViewOption] = useState<'all' | 'company'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('카테고리');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchCollaborations = useCallback(
    async (category?: string) => {
      try {
        const params: GetCollaborationListRequest = {
          page: 0,
          size: 10,
        };

        if (category && category !== '분야별') {
          params.category = categoryMapReverse[category];
        }

        const response = await getCollaborationList(params);

        if (response.success) {
          const filteredData =
            viewOption === 'company'
              ? response.data.content.filter((item) => item.auth === 'COMPANY')
              : response.data.content.filter((item) => item.auth !== 'COMPANY');

          setCollaborationData(filteredData);
        }
      } catch {
        alert('데이터 로딩에 실패했습니다.');
      } finally {
        setIsInitialLoading(false);
      }
    },
    [viewOption],
  );

  const handleViewOptionChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newViewOption = event.target.value as 'all' | 'company';
      setViewOption(newViewOption);
      fetchCollaborations(selectedCategory);
    },
    [fetchCollaborations, selectedCategory],
  );

  const handleCategorySelect = useCallback(
    (category: string) => {
      setSelectedCategory(category);
      setIsDropdownOpen(false);
      fetchCollaborations(category);
    },
    [fetchCollaborations],
  );

  const handleBookmarkClick = async (collaborationId: number) => {
    try {
      setCollaborationData((prevData) =>
        prevData.map((collab) =>
          collab.collaborationId === collaborationId
            ? {
                ...collab,
                isSavedPost: !collab.isSavedPost,
                saveCount: collab.saveCount + (collab.isSavedPost ? -1 : 1),
              }
            : collab,
        ),
      );

      const response = await toggleCollaborationBookmark(collaborationId);

      if (!response.success) {
        setCollaborationData((prevData) =>
          prevData.map((collab) =>
            collab.collaborationId === collaborationId
              ? {
                  ...collab,
                  isSavedPost: !collab.isSavedPost,
                  saveCount: collab.saveCount + (collab.isSavedPost ? 1 : -1),
                }
              : collab,
          ),
        );
      }
    } catch {
      alert('북마크 처리에 실패했습니다.');
    }
  };

  useEffect(() => {
    fetchCollaborations();
  }, [fetchCollaborations]);

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
    return <LoadingPage />;
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
              <option value='oldest'>오래된순</option>
              <option value='popular'>저장순</option>
              <option value='highView'>높은 모집순</option>
              <option value='lowView'>낮은 모집순</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.thumbnailGrid}>
        {collaborationData.map((collab) => (
          <PreviewThumbnail
            key={collab.collaborationId}
            data={{
              ideaId: collab.collaborationId,
              routePrefix: 'collaboration',
              username: collab.writerName,
              description: collab.title,
              deadline: collab.deadline,
              imageUrl: collab.thumbnailImageUrl,
              profileImage: collab.writerImageUrl,
              isBookmarked: collab.isSavedPost,
              saves: collab.saveCount,
              views: collab.viewCount,
              auth: collab.auth,
              category: collab.category,
              occupiedQuantity: collab.occupiedQuantity,
              totalQuantity: collab.totalQuantity,
              onBookmarkClick: () =>
                handleBookmarkClick(collab.collaborationId),
            }}
          />
        ))}
      </div>
    </>
  );
};
