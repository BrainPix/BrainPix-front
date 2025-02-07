import styles from './postFormRequestTitle.module.scss';
import { DeadlineLabel } from '../common/label/DeadlineLabel.tsx';
import CorporatePublicLabel from '../common/label/Label.tsx';

export const PostFormRequestTitle = () => {
  const POST_DATA = {
    tab: '요청 과제',
    category: '디자인',
    mainImage: null,
    title: '디자인 해 주실 분',
    date: '2024/12/28',
    viewCount: 120,
    saveCount: 12,
    deadline: 16,
    description: '과제 설명입니다...',
  };

  return (
    <div>
      <div className={styles.imageAndDetails}>
        <div className={styles.imageWrapper}>
          {POST_DATA.mainImage ? (
            <img
              className={styles.mainImage}
              src={POST_DATA.mainImage}
              alt='대표사진'
            />
          ) : (
            <div className={styles.mainImage} />
          )}
        </div>
        <div className={styles.details}>
          <div className={styles.route}>
            {POST_DATA.tab} {'>'} {POST_DATA.category}
          </div>
          <div className={styles.deadlineLabel}>
            <DeadlineLabel deadline={POST_DATA.deadline} />
          </div>
          <div className={styles.titleAndLabel}>
            <p className={styles.title}>{POST_DATA.title}</p>
            <CorporatePublicLabel
              text='기업 공개'
              type='corporatePublic'
            />
          </div>
          <p className={styles.date}>
            {POST_DATA.date} · 조회 {POST_DATA.viewCount} · 저장{' '}
            {POST_DATA.saveCount}
          </p>
          <button className={styles.applyButton}>구매하기</button>
        </div>
      </div>
    </div>
  );
};
