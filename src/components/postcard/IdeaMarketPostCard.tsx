import styles from './ideaMarketPostCard.module.scss';
import { PostProps, PostCategories } from '../../types/postData';

export const IdeaMarketPostCard = ({
  category,
  user,
  profileImage,
  price,
  saveCount,
  viewCount,
}: PostProps) => {
  return (
    <div>
      {category === PostCategories.IDEA_MARKET && (
        <div>
          <div>
            {profileImage ? (
              <img
                src={profileImage}
                alt='프로필사진'
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.profileImage} />
            )}
            <span className={styles.username}>{user}</span>
          </div>
          {price && <div className={styles.price}>{price}</div>}
          <p>
            저장 {viewCount} • 조회 {saveCount}
          </p>
        </div>
      )}
    </div>
  );
};
