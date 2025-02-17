import { Control, Controller, Path } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';
import DownButton from '../../../assets/icons/categoryDownButton.svg?react';
import UpButton from '../../../assets/icons/categoryUpButton.svg?react';
import InfoDropdown from '../../../assets/icons/infoDropdown.svg?react';
import styles from './categorySection.module.scss';

interface CategorySectionProps<
  T extends { category: string; pageType: 'Idea Solution' | 'Market Place' },
> {
  control: Control<T>;
  isDropdownOpen: boolean;
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>;
  showDetail: boolean;
  setShowDetail: Dispatch<SetStateAction<boolean>>;
}

export const CategorySection = <
  T extends { category: string; pageType: 'Idea Solution' | 'Market Place' },
>({
  control,
  isDropdownOpen,
  setIsDropdownOpen,
  showDetail,
  setShowDetail,
}: CategorySectionProps<T>) => {
  const pageType = control._formValues.pageType;

  return (
    <div className={styles.horizontalContainer}>
      <div className={`${styles.formGroup} ${styles.categoryGroup}`}>
        <div className={styles.labelWrapper}>
          <label htmlFor='category'>
            카테고리
            <span className={styles.required}>(필수)</span>
          </label>
        </div>
        <Controller
          name={'category' as Path<T>}
          control={control}
          render={({ field }) => (
            <div
              className={styles.select}
              onClick={() => setIsDropdownOpen((prev) => !prev)}>
              <span>{field.value || '분야별'}</span>
              {isDropdownOpen ? <UpButton /> : <DownButton />}
              {isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  {[
                    '광고 · 홍보',
                    '디자인',
                    '레슨',
                    '마케팅',
                    '문서 · 글쓰기',
                  ].map((cat) => (
                    <div
                      key={cat}
                      className={styles.dropdownItem}
                      onClick={() => {
                        field.onChange(cat);
                        setIsDropdownOpen(false);
                      }}>
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        />
      </div>

      <div className={`${styles.formGroup} ${styles.pageTypeGroup}`}>
        <div className={styles.labelWrapper}>
          <span id='pageTypeLabel'>
            페이지 설정
            <span className={styles.required}>(필수)</span>
          </span>
        </div>
        <Controller
          name={'category' as Path<T>}
          control={control}
          render={({ field }) => (
            <div className={styles.pageTypeWrapper}>
              <button
                type='button'
                className={`${styles.pageTypeButton} ${
                  field.value === 'Idea Solution' ? styles.active : ''
                }`}
                onClick={() => field.onChange('Idea Solution')}>
                Idea Solution
              </button>
              <button
                type='button'
                className={`${styles.pageTypeButton} ${
                  field.value === 'Market Place' ? styles.active : ''
                }`}
                onClick={() => field.onChange('Market Place')}>
                Market Place
              </button>
            </div>
          )}
        />

        <div
          className={`${styles.pageDescription} ${showDetail ? styles.detail : ''}`}
          onClick={() => setShowDetail(!showDetail)}>
          <div className={styles.header}>
            <span className={styles.descriptionText}>
              {pageType === 'Idea Solution'
                ? 'Idea Solution이란?'
                : 'Market Place란?'}
            </span>
            <InfoDropdown
              className={styles.infoIcon}
              onClick={(e) => {
                e.stopPropagation();
                setShowDetail(!showDetail);
              }}
            />
          </div>
          {showDetail && (
            <div className={styles.detailDescription}>
              <span className={styles.mainText}>
                {pageType === 'Idea Solution'
                  ? '전문가가 제공하는 과제 제작 서비스'
                  : '완성된 과제물과 창의적인 제품을 거래하는 공간'}
              </span>
              <span className={styles.subText}>
                {pageType === 'Idea Solution'
                  ? `ex) '블로그 제작을 도와드립니다.' / '로고 제작 서비스를 제공합니다.'`
                  : `ex) '어르신 맞춤형 키오스크 로봇' / '다이어트 식단 관리 앱 개발'`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
