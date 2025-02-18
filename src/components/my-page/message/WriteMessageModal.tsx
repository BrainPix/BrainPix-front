import {
  forwardRef,
  useContext,
  useEffect,
  useState,
  KeyboardEvent,
} from 'react';
import classNames from 'classnames';
import { FieldValues, useForm } from 'react-hook-form';
import styles from './writeMessageModal.module.scss';

import {
  getMessageDetailResponseType,
  PreviousMessageType,
  sendMessagePayloadType,
} from '../../../types/messageType';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMessagesDetail, sendMessages } from '../../../apis/messageAPI';
import { ToastContext } from '../../../contexts/toastContext';
import Delete from '../../../assets/icons/delete.svg?react';
import React from 'react';

interface WriteMessageModalPropsType {
  onClose: () => void;
  onClickReply?: () => void;
  type?: 'write' | 'reply' | 'show';
  previousMessage?: PreviousMessageType;
  clickedMessageId?: string;
}

export const WriteMessageModal = forwardRef<
  HTMLDivElement,
  WriteMessageModalPropsType
>(({ onClose, onClickReply, type = 'detail', clickedMessageId }, ref) => {
  const [myName, setMyName] = useState('');
  const [receiver, setReceiver] = useState<string | null>(null);

  const { register, handleSubmit, watch, setValue } = useForm({
    mode: 'onBlur',
  });
  const { errorToast, successToast } = useContext(ToastContext);
  const queryClient = useQueryClient();

  const { mutate: sendMessageMutate } = useMutation({
    mutationFn: (payload: sendMessagePayloadType) => sendMessages(payload),
    onSuccess: () => {
      successToast('메세지가 전송되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['messages', 'ALL'],
      });
      queryClient.invalidateQueries({
        queryKey: ['messages', 'SEND'],
      });
      queryClient.invalidateQueries({
        queryKey: ['messages', 'RECEIVED'],
      });
      onClose();
    },
    onError: () => {
      errorToast('메세지 전송에 실패하였습니다.');
    },
  });

  const { data: clickedMessage } = useQuery<getMessageDetailResponseType>({
    queryKey: ['clickedMessage'],
    queryFn: () => getMessagesDetail(clickedMessageId || ''),
    enabled: clickedMessageId !== '',
  });

  useEffect(() => {
    if (clickedMessage && type === 'reply') {
      setReceiver(clickedMessage.receiverNickname);
    }
  }, [clickedMessage, watch, type]);

  useEffect(() => {
    const myNameData = localStorage.getItem('userNickname');
    if (myNameData) {
      setMyName(myNameData);
    }
  }, []);

  const handleSubmitHandler = async (payload: FieldValues) => {
    const requestBody = {
      title: payload.title,
      content: payload.content,
      receiverNickname: receiver || '',
    };
    sendMessageMutate(requestBody as sendMessagePayloadType);
  };

  const handleChangeReceiverInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setReceiver(watch('receiver'));
      setValue('receiver', '');
    }
  };

  const handleChangeTitleInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

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
              {type === 'write' || type === 'reply'
                ? myName
                : clickedMessage?.senderNickname}
            </div>
          </div>
          <div className={classNames(styles.inputWrapper)}>
            <span>받는 사람</span>
            {type === 'write' && (
              <React.Fragment>
                {receiver && (
                  <div className={classNames(styles.nameTag, styles.receiver)}>
                    {receiver}
                    <Delete
                      width={10}
                      height={10}
                      stroke='#fafafa'
                      className={classNames(styles.deleteIcon)}
                      onClick={() => setReceiver(null)}
                    />
                  </div>
                )}
                <input
                  className={classNames(styles.textInput)}
                  onKeyDown={handleChangeReceiverInput}
                  {...register('receiver')}
                  onBlur={() => {
                    setReceiver(watch('receiver'));
                    setValue('receiver', '');
                  }}
                />
              </React.Fragment>
            )}
            {(type === 'show' || type === 'reply') && (
              <div className={classNames(styles.nameTag, styles.receiver)}>
                {clickedMessage?.receiverNickname}
              </div>
            )}
          </div>
          <div className={classNames(styles.inputWrapper)}>
            <span>제목</span>
            {type === 'show' && <div>{clickedMessage?.title}</div>}
            {type === 'write' && (
              <input
                onKeyDown={handleChangeTitleInput}
                className={classNames(styles.textInput)}
                {...register('title')}
              />
            )}
            {type === 'reply' && (
              <>
                <input
                  onKeyDown={handleChangeTitleInput}
                  className={classNames(styles.textInput, {
                    [styles.reply]: type === 'reply',
                  })}
                  {...register('title')}
                />
                <div className={classNames(styles.replyTag)}>RE :</div>
              </>
            )}
          </div>
        </div>
        <div className={classNames(styles.contentInputWrapper)}>
          {type === 'write' && (
            <textarea
              className={classNames(styles.contentInput)}
              placeholder='내용을 입력하세요.'
              {...register('content')}
            />
          )}
          {type === 'show' && (
            <div className={classNames(styles.contentInput)}>
              {clickedMessage?.content}
            </div>
          )}

          {type === 'reply' && (
            <React.Fragment>
              <textarea
                className={classNames(styles.contentInput, styles.replyTop)}
                placeholder='내용을 입력하세요.'
                {...register('content')}
              />
              <div
                className={classNames(styles.contentInput, styles.replyBottom)}>
                <span
                  className={classNames(
                    styles.receiver,
                  )}>{`To. ${clickedMessage?.receiverNickname}`}</span>
                <span
                  className={classNames(
                    styles.sender,
                  )}>{`From. ${myName}`}</span>
                <span
                  className={classNames(
                    styles.content,
                  )}>{`${clickedMessage?.content}`}</span>
              </div>
            </React.Fragment>
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
