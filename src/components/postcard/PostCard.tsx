import styles from './PostCard.module.scss';
import classNames from 'classnames';
import { PostProps, PostCategories } from '../../types/postData';

export const PostCard = ({
  category,
  user,
  title,
  image,
  price,
  deadline,
  memberInfo,
}: PostProps) => {
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
        {category === PostCategories.IDEA_MARKET && (
          <>
            <div className={styles.postImage}>
              <img
                src={image || ''}
                alt='postImage'
              />
            </div>
            <p>{title}</p>
            {price && <p className={styles.price}>{price}</p>}
          </>
        )}

        {category === PostCategories.REQUEST_ASSIGN && (
          <>
            <p>{title}</p>
            <div className={styles.postImage}>
              <img
                src={image || ''}
                alt='postImage'
              />
            </div>
            {deadline && <p className={styles.deadline}>D-{deadline}</p>}
          </>
        )}

        {category === PostCategories.COLLABORATION && (
          <>
            <p>{title}</p>
            <div className={styles.postImage}>
              <img
                src={image || ''}
                alt='postImage'
              />
            </div>
            {deadline && <p className={styles.deadline}>D-{deadline}</p>}
            {memberInfo && <p className={styles.memberInfo}>{memberInfo}</p>}
          </>
        )}
      </div>
    </div>
  );
};
