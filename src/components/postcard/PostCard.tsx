import styles from './postCard.module.scss';
import classNames from 'classnames';

interface PostCardProps {
  category: string;
  user: string;
  title: string;
  image?: string;
  price?: string;
  deadline?: string;
  memberInfo?: string;
}

function PostCard({
  category,
  user,
  title,
  image,
  price,
  deadline,
  memberInfo,
}: PostCardProps) {
  return (
    <div className={classNames(styles.postCard, styles[category])}>
      {/* 공통 헤더 */}
      <div className={styles.postHeader}>
        <img
          src='/default-profile.png'
          alt='User Profile'
          className={styles.profileImage}
        />
        <span className={styles.username}>{user}</span>
      </div>

      {/* 카테고리별 조건부 렌더링 */}
      <div className={styles.postContent}>
        {category === 'ideaMarket' && (
          <>
            <div className={styles.postImage}>
              <img
                src={image || '/placeholder.png'}
                alt={title}
              />
            </div>
            <p>{title}</p>
            {price && <p className={styles.price}>{price}</p>}
          </>
        )}

        {category === 'requestTask' && (
          <>
            <p>{title}</p>
            <div className={styles.postImage}>
              <img
                src={image || '/placeholder.png'}
                alt='Task'
              />
            </div>
            {deadline && <p className={styles.deadline}>D-{deadline}</p>}
          </>
        )}

        {category === 'collaboration' && (
          <>
            <p>{title}</p>
            <div className={styles.postImage}>
              <img
                src={image || '/placeholder.png'}
                alt='Collaboration'
              />
            </div>
            {deadline && <p className={styles.deadline}>D-{deadline}</p>}
            {memberInfo && <p className={styles.memberInfo}>{memberInfo}</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default PostCard;
