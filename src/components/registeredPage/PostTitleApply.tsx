import { useEffect, useState } from 'react';
import styles from './postTitle.module.scss';
import ArrowIcon from '../../assets/icons/arrowUp2Thin.svg?react';
import DotIcon from '../../assets/icons/dot.svg?react';
import BookmarkIcon from '../../assets/icons/bookmarkFill.svg?react';
import EmptyCircleIcon from '../../assets/icons/emptyCircle.svg?react';
import Label from '../common/label/Label';
import RequestSupportModal from '../modal/RequestSupportModal';
import { DeadlineLabel } from '../common/label/DeadlineLabel';
import {
  getCategoryLabel,
  getTaskTypeLabel,
} from '../../utils/categoryMapping';
import { Image } from '../common/image/Image';
import { postSavedPosts } from '../../apis/savePostsAPI';

interface PostTitleApplyProps {
  thumbnailImageUrl: string;
  category: string;
  taskType: string;
  deadline: number;
  auth: string;
  title: string;
  price: number;
  viewCount: number;
  saveCount: number;
  createdDate: string;
  writerName: string;
  taskId: number;
  isSavedPost: boolean;
  recruitments: {
    recruitmentId: number;
    domain: string;
    occupiedQuantity: number;
    totalQuantity: number;
  }[];
}

const PostTitleApply = ({
  thumbnailImageUrl,
  category,
  taskType,
  deadline,
  auth,
  title,
  price,
  viewCount,
  saveCount,
  createdDate,
  writerName,
  recruitments,
  taskId,
  isSavedPost,
}: PostTitleApplyProps) => {
  const [isBookmarked, setIsBookmarked] = useState(isSavedPost);
  const [currentSaveCount, setCurrentSaveCount] = useState(saveCount);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedBookmarks = JSON.parse(
      localStorage.getItem('bookmarkedPosts') || '[]',
    );
    setIsBookmarked(savedBookmarks.includes(taskId));
  }, [taskId]);

  const handleBookmarkClick = async () => {
    try {
      await postSavedPosts(taskId);
      const updatedBookmarked = !isBookmarked;
      setIsBookmarked(updatedBookmarked);
      setCurrentSaveCount((prev) => (updatedBookmarked ? prev + 1 : prev - 1));

      const savedBookmarks = JSON.parse(
        localStorage.getItem('bookmarkedPosts') || '[]',
      );
      if (updatedBookmarked) {
        localStorage.setItem(
          'bookmarkedPosts',
          JSON.stringify([...savedBookmarks, taskId]),
        );
      } else {
        localStorage.setItem(
          'bookmarkedPosts',
          JSON.stringify(savedBookmarks.filter((id: number) => id !== taskId)),
        );
      }
    } catch {
      throw Error;
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <Image
          src={thumbnailImageUrl}
          alt='썸네일'
          className={styles.thumbnail}
        />
      </div>
      <div className={styles.rightSection}>
        <div className={styles.navigation}>
          <span className={styles.text}>{getCategoryLabel(category)}</span>
          <ArrowIcon className={styles.arrowIcon} />
          <span className={styles.text}>{getTaskTypeLabel(taskType)}</span>
        </div>
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
        <div className={styles.price}>{price.toLocaleString()}원</div>
        <div className={styles.details}>
          <span className={styles.date}>{createdDate}</span>
          <DotIcon className={styles.dotIcon} />
          <span className={styles.info}>조회 {viewCount}</span>
          <DotIcon className={styles.dotIcon} />
          <span className={styles.info}>저장 {currentSaveCount}</span>
        </div>
      </div>
      <button
        className={styles.purchaseButton}
        onClick={openModal}>
        지원하기
      </button>
      {isModalOpen && (
        <RequestSupportModal
          onClose={closeModal}
          recruitments={recruitments}
          category={category}
          writerName={writerName}
          title={title}
          taskId={taskId}
        />
      )}
    </div>
  );
};

export default PostTitleApply;
