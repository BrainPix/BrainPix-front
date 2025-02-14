import { forwardRef, useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { FieldValues, useForm } from 'react-hook-form';

import styles from './writeMessageModal.module.scss';
import {
  PreviousMessageType,
  sendMessagePayloadType,
} from '../../../types/messageType';
import { useMutation } from '@tanstack/react-query';
import { sendMessages } from '../../../apis/messageAPI';
import { ToastContext } from '../../../contexts/toastContext';

interface WriteMessageModalPropsType {
  onClose: () => void;
  onClickReply?: () => void;
  type?: 'write' | 'reply' | 'show';
  previousMessage?: PreviousMessageType;
}

export const WriteMessageModal = forwardRef<
  HTMLDivElement,
  WriteMessageModalPropsType
>(({ onClose, onClickReply, type = 'detail', previousMessage }, ref) => {
  const [myName, setMyName] = useState('');

  const { register, handleSubmit } = useForm();
  const { errorToast, successToast } = useContext(ToastContext);

  const { mutate: sendMessageMutate } = useMutation({
    mutationFn: (payload: sendMessagePayloadType) => sendMessages(payload),
    onSuccess: () => {
      successToast('메세지가 전송되었습니다.');
      onClose();
    },
    onError: () => {
      errorToast('메세지 전송에 실패하였습니다.');
      onClose();
    },
  });

  useEffect(() => {
    const myNameData = localStorage.getItem('userName');
    if (myNameData) {
      setMyName(myNameData);
    }
  }, []);

  const handleSubmitHandler = async (payload: FieldValues) => {
    sendMessageMutate(payload as sendMessagePayloadType);
  };

  const PreviousData = `To. ${previousMessage?.receiver} \nFrom. ${myName} \n${previousMessage?.previousContent}`;

  return (
    <div
      className={classNames(styles.container)}
      ref={ref}>
      <h3 className={classNames(styles.title)}>
        {type === 'show' ? '받은 메세지' : '메세지 보내기'}
      </h3>
      <hr className={classNames(styles.titleDivider)} />
      <form
        className={classNames(styles.contentContainer)}
        onSubmit={handleSubmit(handleSubmitHandler)}>
        <div className={classNames(styles.inputContainer)}>
          <div className={classNames(styles.inputWrapper)}>
            <span>보낸 사람</span>
            <div className={classNames(styles.nameTag, styles.sender)}>
              {myName}
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
              {...register('title')}
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
            {...register('content')}
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
              type='submit'
              className={classNames('buttonFilled-primary', styles.sendButton)}>
              보내기
            </button>
          )}
        </div>
      </form>
    </div>
  );
});

WriteMessageModal.displayName = 'WriteMessageModal';
