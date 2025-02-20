import { useEffect, useState } from 'react';
import styles from './postHeader.module.scss';
import ArrowIcon from '../../assets/icons/arrowUp2Thin.svg?react';
import DotIcon from '../../assets/icons/dot.svg?react';
import BookmarkIcon from '../../assets/icons/bookmarkFill.svg?react';
import EmptyCircleIcon from '../../assets/icons/emptyCircle.svg?react';
import { DeadlineLabel } from '../common/label/DeadlineLabel';
import Label from '../common/label/Label';
import { getCategoryLabel } from '../../utils/categoryMapping';
import { postSavedPosts } from '../../apis/savePostsAPI';

interface PostHeaderProps {
  category: string;
  auth: string;
  title: string;
  deadline: number;
  viewCount: number;
  saveCount: number;
  createdDate: string;
  postId: number;
  isSavedPost: boolean;
}

const PostHeader = ({
  category,
  auth,
  title,
  deadline,
  viewCount,
  saveCount,
  createdDate,
  postId,
  isSavedPost,
}: PostHeaderProps) => {
  const [isBookmarked, setIsBookmarked] = useState(isSavedPost);
  const [currentSaveCount, setCurrentSaveCount] = useState(saveCount);

  useEffect(() => {
    const savedBookmarks = JSON.parse(
      localStorage.getItem('bookmarkedPosts') || '[]',
    );
    setIsBookmarked(savedBookmarks.includes(postId));
  }, [postId]);

  const handleBookmarkClick = async () => {
    try {
      await postSavedPosts(postId);
      const updatedBookmarked = !isBookmarked;
      setIsBookmarked(updatedBookmarked);
      setCurrentSaveCount((prev) => (updatedBookmarked ? prev + 1 : prev - 1));

      const savedBookmarks = JSON.parse(
        localStorage.getItem('bookmarkedPosts') || '[]',
      );
      if (updatedBookmarked) {
        localStorage.setItem(
          'bookmarkedPosts',
          JSON.stringify([...savedBookmarks, postId]),
        );
      } else {
        localStorage.setItem(
          'bookmarkedPosts',
          JSON.stringify(savedBookmarks.filter((id: number) => id !== postId)),
        );
      }
    } catch {
      throw Error;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <span className={styles.text}>협업광장</span>
        <ArrowIcon className={styles.arrowIcon} />
        <span className={styles.text}>{getCategoryLabel(category)}</span>
      </div>
      <div className={styles.firstContainer}>
        <DeadlineLabel deadline={deadline} />
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{title}</h1>
          {auth === 'COMPANY' && (
            <Label
              text='기업 공개'
              type='corporatePublic'
            />
          )}
          {auth === 'ALL' && (
            <Label
              text='전체 공개'
              type='entire'
            />
          )}
        </div>
      </div>
      <div className={styles.details}>
        <span className={styles.date}>{createdDate}</span>
        <DotIcon className={styles.dotIcon} />
        <span className={styles.info}>조회 {viewCount}</span>
        <DotIcon className={styles.dotIcon} />
        <span className={styles.info}>저장 {currentSaveCount}</span>
        <button
          className={styles.bookmarkButton}
          onClick={handleBookmarkClick}>
          <EmptyCircleIcon
            className={styles.outerCircle}
            style={{
              stroke: isBookmarked ? '#377FF8' : '#BDBDBD',
            }}
          />
          <BookmarkIcon
            className={styles.bookmarkIcon}
            fill={isBookmarked ? '#377FF8' : '#BDBDBD'}
          />
        </button>
      </div>
    </div>
  );
};

export default PostHeader;
