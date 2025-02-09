import styles from './teamBuildingButton.module.scss';
import { useState } from 'react';
import { CollaborationSupportModal } from '../modal/CollaborationSupportModal';

interface TeamBuildingButtonProps {
  recruitments: {
    recruitmentId: number;
    domain: string;
    occupiedQuantity: number;
    totalQuantity: number;
  }[];
  category: string;
  writerName: string;
  title: string;
}

const TeamBuildingButton = ({
  recruitments,
  category,
  writerName,
  title,
}: TeamBuildingButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    if (recruitments.length === 0) {
      console.warn('지원할 모집 부문이 없습니다.');
      return;
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type='button'
        className={styles.button}
        onClick={openModal}
        disabled={recruitments.length === 0}>
        팀 빌딩 신청하기
      </button>
      {isModalOpen && (
        <CollaborationSupportModal
          onClose={closeModal}
          recruitments={recruitments}
          category={category}
          writerName={writerName}
          title={title}
        />
      )}
    </>
  );
};

export default TeamBuildingButton;
