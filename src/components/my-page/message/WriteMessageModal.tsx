import { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './writeMessageModal.module.scss';

interface WriteMessageModalPropsType {
  onClose: () => void;
}

export const WriteMessageModal = forwardRef<
  HTMLDivElement,
  WriteMessageModalPropsType
>(({ onClose }, ref) => {
  return (
    <div
      className={classNames(styles.container)}
      ref={ref}>
      <h3 className={classNames(styles.title)}>메세지 보내기</h3>
      <hr className={classNames(styles.titleDivider)} />
      <div className={classNames(styles.contentContainer)}>
        <div className={classNames(styles.inputContainer)}>
          <div className={classNames(styles.inputWrapper)}>
            <span>보낸 사람</span>
            <div className={classNames(styles.receiveNameTag)}>
              SEO YEON KIM
            </div>
          </div>
          <div className={classNames(styles.inputWrapper)}>
            <span>받는 사람</span>
            <input className={classNames(styles.textInput)} />
          </div>
          <div className={classNames(styles.inputWrapper)}>
            <span>제목</span>
            <input className={classNames(styles.textInput)} />
          </div>
        </div>
        <textarea
          className={classNames(styles.contentInput)}
          placeholder='내용을 입력하세요.'
        />
        <div className={classNames(styles.sendButtonWrapper)}>
          <button
            onClick={onClose}
            className={classNames(styles.cancelButton)}>
            취소
          </button>
          <button
            className={classNames('buttonFilled-grey800', styles.sendButton)}>
            보내기
          </button>
        </div>
      </div>
    </div>
  );
});

WriteMessageModal.displayName = 'WriteMessageModal';
