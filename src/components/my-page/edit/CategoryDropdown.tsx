import React, { useState } from 'react';
import styles from './CategoryDropdown.module.scss';
import UpButton from '../../assets/icons/categoryUpButton.svg?react';
import DownButton from '../../assets/icons/categoryDownButton.svg?react';

interface CategoryDropdownProps {
  category: string;
  setCategory: (value: string) => void;
}

type SpecializationType =
  | 'ADVERTISING_PROMOTION'
  | 'DESIGN'
  | 'LESSON'
  | 'MARKETING'
  | 'DOCUMENT_WRITING'
  | 'MEDIA_CONTENT'
  | 'TRANSLATION_INTERPRETATION'
  | 'TAX_LAW_LABOR'
  | 'CUSTOM_PRODUCTION'
  | 'STARTUP_BUSINESS'
  | 'FOOD_BEVERAGE'
  | 'IT_TECH'
  | 'OTHERS';

const categoryToEnum: Record<string, SpecializationType> = {
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

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  category,
  setCategory,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (option: string) => {
    setCategory(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className={`${styles.formGroup} ${styles.categoryGroup}`}>
      <div className={styles.labelWrapper}>
        <label>
          카테고리 <span className={styles.required}>(필수)</span>
        </label>
      </div>
      <div
        className={styles.select}
        onClick={() => setIsDropdownOpen((prev) => !prev)}>
        <span>{category || '분야별'}</span>
        {isDropdownOpen ? <UpButton /> : <DownButton />}
        {isDropdownOpen && (
          <div className={styles.dropdownMenu}>
            {OPTIONS.map((option) => (
              <div
                key={option}
                className={styles.dropdownItem}
                onClick={() => handleSelect(option)}>
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
