import { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './writeMessageModal.module.scss';
import { PreviousMessageType } from '../../../types/messageType';

interface WriteMessageModalPropsType {
  onClose: () => void;
  onClickReply: () => void;
  type?: 'write' | 'reply' | 'show';
  previousMessage?: PreviousMessageType;
}

export const WriteMessageModal = forwardRef<
  HTMLDivElement,
  WriteMessageModalPropsType
>(({ onClose, onClickReply, type = 'detail', previousMessage }, ref) => {
  const PreviousData = `To. ${previousMessage?.receiver} \nFrom. ${previousMessage?.sender} \n${previousMessage?.previousContent}`;

  return (
    <div
      className={classNames(styles.container)}
      ref={ref}>
      <h3 className={classNames(styles.title)}>
        {type === 'show' ? '받은 메세지' : '메세지 보내기'}
      </h3>
      <hr className={classNames(styles.titleDivider)} />
      <div className={classNames(styles.contentContainer)}>
        <div className={classNames(styles.inputContainer)}>
          <div className={classNames(styles.inputWrapper)}>
            <span>보낸 사람</span>
            <div className={classNames(styles.nameTag, styles.sender)}>
              SEO YEON KIM
            </div>
          </div>
          <div className={classNames(styles.inputWrapper)}>
            <span>받는 사람</span>
            {type === 'detail' ? (
              <input className={classNames(styles.textInput)} />
            ) : (
              <div className={classNames(styles.nameTag, styles.receiver)}>
                {previousMessage?.receiver}
              </div>
            )}
          </div>
          <div className={classNames(styles.inputWrapper)}>
            <span>제목</span>
            <input
              className={classNames(styles.textInput, {
                [styles.reply]: type === 'reply',
              })}
            />
            {type === 'reply' && (
              <div className={classNames(styles.replyTag)}>RE :</div>
            )}
          </div>
        </div>
        <div className={classNames(styles.contentInputWrapper)}>
          <textarea
            className={classNames(styles.contentInput, {
              [styles.replyTop]: type === 'reply',
            })}
            placeholder='내용을 입력하세요.'
          />
          {type === 'reply' && (
            <textarea
              className={classNames(styles.contentInput, {
                [styles.replyBottom]: type === 'reply',
              })}
              placeholder='내용을 입력하세요.'
              defaultValue={(type === 'reply' && PreviousData) || ''}
              disabled
            />
          )}
        </div>
        <div className={classNames(styles.sendButtonWrapper)}>
          <button
            onClick={onClose}
            className={classNames(styles.cancelButton)}>
            닫기
          </button>
          {type === 'show' && (
            <button
              onClick={onClickReply}
              className={classNames('buttonFilled-primary', styles.sendButton)}>
              답장하기
            </button>
          )}
          {(type === 'write' || type === 'reply') && (
            <button
              className={classNames('buttonFilled-primary', styles.sendButton)}>
              보내기
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

WriteMessageModal.displayName = 'WriteMessageModal';
