import styles from './authorInfo.module.scss';
import Label from '../common/label/Label';

import { getCategoryLabel } from '../../utils/categoryMapping';
import { Image } from '../common/image/Image';
import { useState } from 'react';
import { WriteMessageModal } from '../my-page/message/WriteMessageModal';

interface AuthorInfoProps {
  name: string;
  profileImageUrl: string;
  role: string;
  specialization: string;
  totalIdeas: number;
  totalCollaborations: number;
}

const AuthorInfo = ({
  name,
  profileImageUrl,
  role,
  specialization,
  totalIdeas,
  totalCollaborations,
}: AuthorInfoProps) => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const openMessageModal = () => {
    setIsMessageModalOpen(true);
  };

  const closeMessageModal = () => {
    setIsMessageModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>작성자 정보</h1>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.content}>
        <div className={styles.profile}>
          <Image
            src={profileImageUrl}
            alt='프로필 이미지'
            className={styles.profileIcon}
          />
          <div className={styles.textContainer}>
            <span className={styles.name}>{name}</span>
            {role === 'COMPANY' && (
              <Label
                text='기업'
                type='corporate'
              />
            )}
            {role === 'INDIVIDUAL' && (
              <Label
                text='개인'
                type='personal'
              />
            )}
          </div>
        </div>
        <button
          className={styles.messageButton}
          onClick={openMessageModal}>
          <div className={styles.messageText}>메신저 보내기</div>
        </button>
      </div>
      <div className={styles.infoBox}>
        <div className={styles.infoItem}>
          <span className={styles.infoTitle}>분야</span>
          <span className={styles.infoValue}>
            {getCategoryLabel(specialization)}
          </span>
        </div>
        <div className={styles.dividerLine}></div>
        <div className={styles.infoItem}>
          <span className={styles.infoTitle}>아이디어</span>
          <span className={styles.infoValue}>{totalIdeas}</span>
        </div>
        <div className={styles.dividerLine}></div>
        <div className={styles.infoItem}>
          <span className={styles.infoTitle}>협업 경험</span>
          <span className={styles.infoValue}>{totalCollaborations}</span>
        </div>
      </div>
      {isMessageModalOpen && (
        <WriteMessageModal
          onClose={closeMessageModal}
          type='write'
        />
      )}
    </div>
  );
};

export default AuthorInfo;
