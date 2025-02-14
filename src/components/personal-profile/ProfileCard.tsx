import { useState } from 'react';
import classNames from 'classnames';

import Mail from '../../assets/icons/mail.svg?react';
import styles from './profileCard.module.scss';
import Label from '../common/label/Label';
import { CATEGORY_LABELS } from '../../constants/categoryMapper';
import { WriteMessageModal } from '../my-page/message/WriteMessageModal';
import { PreviousMessageType } from '../../types/messageType';

interface ProfileCardPropsType {
  userType: string;
  userName: string;
  specializations: string[];
  profileImage: string;
}

export const ProfileCard = ({
  userType,
  userName,
  specializations,
  profileImage,
}: ProfileCardPropsType) => {
  const [openSendMessageModal, setOpenSendMessageModal] = useState(false);

  const messageData: PreviousMessageType = {
    receiver: userName,
    previousContent: '',
  };

  const handleCloseModal = () => {
    setOpenSendMessageModal(false);
  };

  return (
    <div className={classNames(styles.container)}>
      {openSendMessageModal && (
        <WriteMessageModal
          type='write'
          onClose={handleCloseModal}
          previousMessage={messageData}
        />
      )}
      <div className={classNames(styles.profileContainer)}>
        <div className={classNames(styles.profileImage)} />
        <div className={classNames(styles.profileNameContainer)}>
          <Label
            text={userType === 'personal' ? '개인' : '기업'}
            type={userType as 'personal' | 'corporate'}
          />
          <h1 className={classNames(styles.userName)}>{userName}</h1>
          <div className={classNames(styles.role)}>
            {specializations.map((role) => (
              <span key={role}>{CATEGORY_LABELS[role]}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={classNames(styles.mailIcon)}>
        <Mail onClick={() => setOpenSendMessageModal(true)} />
      </div>
    </div>
  );
};
