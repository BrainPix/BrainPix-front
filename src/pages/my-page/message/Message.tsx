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

  const handleChangeModalType = (type: 'write' | 'reply' | 'show') => {
    setWriteModalType(type);
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
          // previousMessage={PREVIOUS_MESSAGE_TEMP}
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
                        onClick={() => {
                          handleChangeModalType('show');
                          setIsOpenWriteModal(true);
                        }}
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
        {/* {Object.entries(MENU).map(([key, value]) => {
          const messageKey = key as MessagesKeyType;
          return (
            clickedMenu === value &&
            (MESSAGES_TEMP[messageKey].length === 0 ? (
              <div
                key={key}
                className={classNames(styles.noMessageTextContainer)}>
                {noMessage[messageKey]}
              </div>
            ) : (
              <div
                key={key}
                onClick={() => {
                  handleChangeModalType('show');
                  setIsOpenWriteModal(true);
                }}
                className={classNames(styles.messageCardContainer)}>
                {MESSAGES_TEMP[messageKey].map((message) => (
                  <div
                    key={message.id}
                    className={classNames(styles.messageCardWrapper, {
                      [styles.isRead]: message.isRead,
                    })}>
                    <div className={classNames(styles.leftWrapper)}>
                      <div className={classNames(styles.rootWrapper)}>
                        {message.root.map((root, idx) => (
                          <div
                            key={root}
                            className={classNames(styles.root)}>
                            {root}
                            {idx !== message.root.length - 1 && (
                              <span className={classNames(styles.divider)}>
                                {'>'}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                      <p className={classNames(styles.name)}>{message.name}</p>
                      <p className={classNames(styles.content)}>
                        {message.content}
                      </p>
                    </div>
                    <div className={classNames(styles.rightWrapper)}>
                      {message.date}
                      <button
                        className={classNames(
                          'buttonFilled-grey800',
                          styles.moreButton,
                        )}>
                        자세히
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ); */}
        {/* })} */}
      </div>
    </div>
  );
};
