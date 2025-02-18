import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './message.module.scss';

import {
  getMessagesResponseType,
  MessagesKeyType,
  sendMessageCountResponseType,
} from '../../../types/messageType';
import { WriteMessageModal } from '../../../components/my-page/message/WriteMessageModal';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getMessageCount,
  getMessages,
  patchMessageRead,
} from '../../../apis/messageAPI';
import { useIntersectionObserverAPI } from '../../../hooks/useIntersectionObserverAPI';
import Loading from '../../../assets/icons/loading.svg?react';

export const Message = () => {
  const MENU: Record<MessagesKeyType, string> = {
    ALL: '전체 메세지',
    SEND: '보낸 메세지',
    RECEIVED: '받은 메세지',
  };

  type MenuValueType = (typeof MENU)[MessagesKeyType];
  const writeMessageModalRef = useRef(null);
  const queryClient = useQueryClient();

  const [selectedStatus, setSelectedStatus] = useState<MessagesKeyType>('ALL');
  const [clickedMenu, setClickedMenu] = useState<MenuValueType>('전체 메세지');
  const [writeModalType, setWriteModalType] = useState<
    'write' | 'reply' | 'show'
  >('show');
  const [isOpenWriteModal, setIsOpenWriteModal] = useState(false);
  const [clickedMessageId, setClickedMessageId] = useState<string>('');
  const [lastMessageIndex, setLastMessageIndex] = useState(0);

  const {
    data: messages,
    fetchNextPage,
    isFetching: isFetchingMessages,
  } = useInfiniteQuery({
    queryKey: ['messages', selectedStatus],
    initialPageParam: 0,
    queryFn: ({ pageParam = 0 }) => getMessages(selectedStatus, pageParam),
    getNextPageParam: (lastPage) => {
      if (lastPage.data.hasNext) {
        return lastPage?.data.currentPage + 1;
      }
    },
  });

  const { setTarget } = useIntersectionObserverAPI({
    onIntersect: (observer) => {
      if (observer.isIntersecting) {
        fetchNextPage();
        const totalCurrentCardLength = messages?.pages.reduce(
          (acc, page) => acc + page.data.messageDetailList.length,
          0,
        );

        setLastMessageIndex(totalCurrentCardLength - 1);
      }
    },
  });

  const { data: messageCount } = useQuery<sendMessageCountResponseType>({
    queryKey: ['messageCount'],
    queryFn: getMessageCount,
  });

  const { mutate: patchReadMutate } = useMutation({
    mutationFn: (messageId: string) => patchMessageRead(messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['messages', 'ALL'],
      });
      queryClient.invalidateQueries({
        queryKey: ['messages', 'SEND'],
      });
      queryClient.invalidateQueries({
        queryKey: ['messages', 'RECEIVED'],
      });
      queryClient.invalidateQueries({
        queryKey: ['messageCount'],
      });
    },
  });

  const handleCloseWriteModal = () => {
    setIsOpenWriteModal(false);
  };

  const handleClickMessage = async (messageId: string, isRead: boolean) => {
    setWriteModalType('show');
    setIsOpenWriteModal(true);
    setClickedMessageId(messageId);
    if (!isRead) {
      patchReadMutate(messageId);
    }
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
        <span className={classNames(styles.readCount)}>
          읽음 {messageCount?.readMessageCount}
        </span>
        <span className={classNames(styles.readCount)}>
          안 읽음 {messageCount?.unreadMessageCount}
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
              setLastMessageIndex(2);
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
              (
                {
                  messageId,
                  title,
                  sendDate,
                  senderNickname,
                  isRead,
                }: getMessagesResponseType,
                idx: number,
              ) => (
                <div
                  key={messageId}
                  ref={
                    3 * pageIdx + idx === lastMessageIndex ? setTarget : null
                  }
                  className={classNames(styles.messageCardContainer, {
                    [styles.isRead]: isRead,
                  })}>
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
                        onClick={() => handleClickMessage(messageId, isRead)}
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
      {isFetchingMessages && <Loading className={classNames(styles.loading)} />}
    </div>
  );
};
