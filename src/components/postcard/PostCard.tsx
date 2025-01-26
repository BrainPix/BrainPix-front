import styles from './PostCard.module.scss';
import classNames from 'classnames';
import { PostData } from '../../types/postData';

function PostCard({
  category,
  user,
  title,
  image,
  price,
  deadline,
  memberInfo,
}: PostData) {
  return (
    <div className={classNames(styles.postCard, styles[category])}>
      {/* 공통 헤더 */}
      <div className={styles.postHeader}>
        <img
          src={image || ''}
          alt=''
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
                src={image || ''}
                alt={''}
              />
            </div>
            <p>{title}</p>
            {price && <p className={styles.price}>{price}</p>}
          </>
        )}

        {category === 'requestAssign' && (
          <>
            <p>{title}</p>
            <div className={styles.postImage}>
              <img
                src={image || ''}
                alt=''
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
                src={image || ''}
                alt=''
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
