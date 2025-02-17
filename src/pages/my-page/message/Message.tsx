import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './message.module.scss';

import {
  getMessageResponseType,
  MessagesKeyType,
} from '../../../types/messageType';
import { WriteMessageModal } from '../../../components/my-page/message/WriteMessageModal';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMessages } from '../../../apis/messageAPI';

export const Message = () => {
  const READ_COUNT = 1;
  const UNREAD_COUNT = 1;

  const MENU: Record<MessagesKeyType, string> = {
    ALL: '전체 메세지',
    SEND: '보낸 메세지',
    RECEIVED: '받은 메세지',
  };

  type MenuValueType = (typeof MENU)[MessagesKeyType];

  const [selectedStatus, setSelectedStatus] = useState<MessagesKeyType>('ALL');
  const [clickedMenu, setClickedMenu] = useState<MenuValueType>('전체 메세지');
  const [writeModalType, setWriteModalType] = useState<
    'write' | 'reply' | 'show'
  >('show');
  const [isOpenWriteModal, setIsOpenWriteModal] = useState(false);
  const [clickedMessageId, setClickedMessageId] = useState<string>('');

  const writeMessageModalRef = useRef(null);

  const { data: messages } = useInfiniteQuery({
    queryKey: ['messages', selectedStatus],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => getMessages(selectedStatus, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.hasNext) {
        return lastPage?.currentPage + 1;
      }
    },
  });

  const handleCloseWriteModal = () => {
    setIsOpenWriteModal(false);
  };

  const handleClickMessage = (messageId: string) => {
    setWriteModalType('show');
    setIsOpenWriteModal(true);
    setClickedMessageId(messageId);
  };

  const handleClickReplyButton = () => {
    setWriteModalType('reply');
  };

  useOutsideClick({
    ref: writeMessageModalRef,
    handler: handleCloseWriteModal,
  });

  return (
    <div>
      {isOpenWriteModal && (
        <WriteMessageModal
          onClose={handleCloseWriteModal}
          onClickReply={handleClickReplyButton}
          ref={writeMessageModalRef}
          type={writeModalType}
          clickedMessageId={
            writeModalType === 'show' || writeModalType === 'reply'
              ? clickedMessageId
              : ''
          }
        />
      )}
      <div className={classNames(styles.titleWrapper)}>
        <span className={classNames(styles.title)}>메신저</span>
        <span className={classNames(styles.readCount)}>읽음 {READ_COUNT}</span>
        <span className={classNames(styles.readCount)}>
          안 읽음 {UNREAD_COUNT}
        </span>
        <button
          onClick={() => {
            setIsOpenWriteModal(true);
            setWriteModalType('write');
          }}
          className={classNames(styles.writeButton, 'buttonOutlined-grey500')}>
          메시지 쓰기
        </button>
      </div>
      <div className={classNames(styles.menuContainer)}>
        {Object.entries(MENU).map(([key, value]) => (
          <button
            onClick={() => {
              setClickedMenu(value);
              setSelectedStatus(key as MessagesKeyType);
            }}
            key={value}
            className={classNames(styles.menu, {
              [styles.clicked]: clickedMenu === value,
            })}>
            {value}
          </button>
        ))}
      </div>
      <div className={classNames(styles.messageCardContainer)}>
        {messages?.pages.map((messagesData, pageIdx) => (
          <React.Fragment key={pageIdx}>
            {messagesData.data.messageDetailList.map(
              ({
                messageId,
                title,
                sendDate,
                senderNickname,
              }: getMessageResponseType) => (
                <div
                  key={messageId}
                  className={classNames(styles.messageCardContainer)}>
                  <div
                    key={messageId}
                    className={classNames(styles.messageCardWrapper, {
                      [styles.isRead]: false,
                    })}>
                    <div className={classNames(styles.leftWrapper)}>
                      <div className={classNames(styles.rootWrapper)}>
                        <div className={classNames(styles.root)}>경로</div>
                      </div>
                      <p className={classNames(styles.name)}>
                        {senderNickname}
                      </p>
                      <p className={classNames(styles.content)}>{title}</p>
                    </div>
                    <div className={classNames(styles.rightWrapper)}>
                      {sendDate}
                      <button
                        onClick={() => handleClickMessage(messageId)}
                        className={classNames(
                          'buttonFilled-grey800',
                          styles.moreButton,
                        )}>
                        자세히
                      </button>
                    </div>
                  </div>
                </div>
              ),
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
