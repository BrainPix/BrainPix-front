import { useState } from 'react';
import classNames from 'classnames';
import styles from './message.module.scss';
import { MessagesKeyType, MessagesType } from '../../../types/message';
import { noMessage } from '../../../constants/noMessageText';

export const Message = () => {
  const READ_COUNT = 1;
  const UNREAD_COUNT = 1;

  const MESSAGES: MessagesType = {
    all: [
      {
        id: 1,
        root: ['협업광장', '기획'],
        date: '12월 29일',
        name: 'SEO YEON',
        content: 'Web 서비스 게시글 관련 제안 드립니다.',
        isRead: false,
      },
      {
        id: 2,
        root: ['협업광장', '기획'],
        date: '12월 29일',
        name: 'SEO YEON',
        content: 'Web 서비스 게시글 관련 제안 드립니다.',
        isRead: true,
      },
    ],
    receive: [
      {
        id: 1,
        root: ['협업광장', '기획'],
        date: '12월 29일',
        name: 'SEO YEON',
        content: 'Web 서비스 게시글 관련 제안 드립니다.',
        isRead: false,
      },
      {
        id: 2,
        root: ['협업광장', '기획'],
        date: '12월 29일',
        name: 'SEO YEON',
        content: 'Web 서비스 게시글 관련 제안 드립니다.',
        isRead: true,
      },
    ],
    send: [],
  };

  const MENU: Record<MessagesKeyType, string> = {
    all: '전체 메세지',
    receive: '보낸 메세지',
    send: '받은 메세지',
  };

  type MenuValueType = (typeof MENU)[MessagesKeyType];

  const [clickedMenu, setClickedMenu] = useState<MenuValueType>('전체 메세지');

  return (
    <div>
      <div className={classNames(styles.titleWrapper)}>
        <span className={classNames(styles.title)}>메신저</span>
        <span className={classNames(styles.readCount)}>읽음 {READ_COUNT}</span>
        <hr className={classNames(styles.divider)} />
        <span className={classNames(styles.readCount)}>
          안 읽음 {UNREAD_COUNT}
        </span>
        <button
          className={classNames(styles.writeButton, 'buttonOutlined-grey500')}>
          메시지 쓰기
        </button>
      </div>
      <div className={classNames(styles.menuContainer)}>
        {Object.entries(MENU).map(([, value]) => (
          <button
            onClick={() => setClickedMenu(value)}
            key={value}
            className={classNames(styles.menu, {
              [styles.clicked]: clickedMenu === value,
            })}>
            {value}
          </button>
        ))}
      </div>
      <div className={classNames(styles.contentContainer)}>
        {Object.entries(MENU).map(([key, value]) => {
          const messageKey = key as MessagesKeyType;

          return (
            clickedMenu === value &&
            (MESSAGES[messageKey].length === 0 ? (
              <div
                key={key}
                className={classNames(styles.noMessageTextContainer)}>
                {noMessage[messageKey]}
              </div>
            ) : (
              <div
                key={key}
                className={classNames(styles.messageCardContainer)}>
                {MESSAGES[messageKey].map((message) => (
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
          );
        })}
      </div>
    </div>
  );
};
