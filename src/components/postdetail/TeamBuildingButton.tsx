import styles from './teamBuildingButton.module.scss';
import { useState } from 'react';
import CollaborationSupportModal from '../modal/CollaborationSupportModal';

const TeamBuildingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
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
        onClick={openModal}>
        팀 빌딩 신청하기
      </button>
      {isModalOpen && <CollaborationSupportModal onClose={closeModal} />}
    </>
  );
};

export default TeamBuildingButton;
