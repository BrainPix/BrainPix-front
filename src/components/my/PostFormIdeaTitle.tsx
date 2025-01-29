import styles from './postFormIdeaTitle.module.scss';
import { DeadlineLabel } from '../common/label/DeadlineLabel.tsx';

export const PostFormIdeaTitle = () => {
  const POST_DATA = {
    tab: '요청과제',
    category: '디자인',
    mainImage: null,
    title: 'Web 서비스 제안',
    date: '2024/12/28',
    viewCount: 120,
    saveCount: 12,
    deadline: 21,
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
            <div className={styles.mainImage}>대표사진</div>
          )}
        </div>
        <div className={styles.details}>
          <div className={styles.route}>
            {POST_DATA.tab} {'>'} {POST_DATA.category}
          </div>
          <DeadlineLabel deadline={POST_DATA.deadline} />
          <p className={styles.title}>{POST_DATA.title}</p>
          <p className={styles.date}>
            {POST_DATA.date} · 조회 {POST_DATA.viewCount} · 저장{' '}
            {POST_DATA.saveCount}
          </p>
          <button className={styles.applyButton}>지원하기</button>
        </div>
      </div>
    </div>
  );
};
