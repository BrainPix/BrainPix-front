import { useNavigate } from 'react-router-dom';
import styles from './PostCard.module.scss';
import classNames from 'classnames';
import { PostProps, PostCategories } from '../../types/postData';

export const PostCard = ({
  id,
  category,
  user,
  profileImage,
  title,
  postImage,
  price,
  deadline,
  current,
  total,
  saveCount,
  viewCount,
}: PostProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    let categoryPath = '';
    if (category === PostCategories.IDEA_MARKET) categoryPath = 'idea-market';
    else if (category === PostCategories.REQUEST_ASSIGN)
      categoryPath = 'request-assign';
    else if (category === PostCategories.COLLABORATION)
      categoryPath = 'collaboration';

    if (categoryPath) {
      navigate(`/my/posts/${categoryPath}/${id}`);
    }
  };
  return (
    <div
      className={classNames(styles.postCard, styles[category])}
      onClick={handleCardClick}>
      {/* 카테고리별 조건부 렌더링 */}
      {/* 공통 헤더 */}
      <div className={styles.postHeader}>
        {profileImage ? (
          <img
            src={profileImage}
            alt='프로필 사진'
            className={styles.profileImage}
          />
        ) : (
          <div className={styles.profileImage} />
        )}
        <span className={styles.username}>{user}</span>
      </div>
      {/* 게시글 내용 */}
      <div className={styles.postContent}>
        {category === PostCategories.IDEA_MARKET && (
          <>
            {postImage ? (
              <img
                src={postImage}
                alt='게시글 사진'
                className={styles.postImage}
              />
            ) : (
              <div className={styles.postImage} />
            )}
            <p>{title}</p>
            {price && <p className={styles.price}>{price}</p>}
          </>
        )}

        {category === PostCategories.REQUEST_ASSIGN && (
          <>
            <p>{title}</p>
            {postImage ? (
              <img
                src={postImage}
                alt='게시글 사진'
                className={styles.postImage}
              />
            ) : (
              <div className={styles.postImage} />
            )}
            {deadline && <p className={styles.deadline}>D-{deadline}</p>}
          </>
        )}

        {category === PostCategories.COLLABORATION && (
          <>
            <p>{title}</p>
            {postImage ? (
              <img
                src={postImage}
                alt='게시글 사진'
                className={styles.postImage}
              />
            ) : (
              <div className={styles.postImage} />
            )}
            {deadline && <p className={styles.deadline}>D-{deadline}</p>}
            {current && total && (
              <p className={styles.memberInfo}>
                저장 {saveCount} · 조회 {viewCount}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
