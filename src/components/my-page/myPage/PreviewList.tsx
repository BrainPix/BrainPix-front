import classNames from 'classnames';
import styles from './previewList.module.scss';
import Trash from '../../../assets/icons/trash.svg?react';
import Undo from '../../../assets/icons/undo.svg?react';
import { getAlarmResponseType } from '../../../types/alarmType';
import { useMutation } from '@tanstack/react-query';
import { patchReadAlarm } from '../../../apis/alarmAPI';

interface NewsListPropsType {
  alarmData: getAlarmResponseType;
  iconType?: 'trash' | 'more' | 'delete';
}

export const PreviewList = ({
  alarmData,
  iconType = 'more',
}: NewsListPropsType) => {
  const { alarmId, isRead, header, message, redirectUrl } = alarmData ?? {
    alarmId: '',
    isRead: false,
    header: '',
    message: '',
    redirectUrl: '',
  };

  const { mutate: patchReadAlarmMutate } = useMutation({
    mutationFn: (alarmId: string) => patchReadAlarm(alarmId),
  });

  const handleClickList = () => {
    patchReadAlarmMutate(alarmId);
    // navigate(redirectUrl);
  };

  return (
    <div
      className={classNames(styles.container, { [styles.isRead]: isRead })}
      onClick={handleClickList}>
      {isRead && (
        <div className={classNames(styles.tag, styles.read)}>읽음</div>
      )}
      <div className={classNames(styles.pageRouteWrapper)}>
        <span className={classNames(styles.page)}>{message}</span>
      </div>
      <span className={classNames(styles.content)}>{header}</span>
      {iconType === 'more' && (
        <button className={classNames(styles.moreButton)}>자세히</button>
      )}
      {iconType === 'trash' && (
        <Trash
          className={classNames(styles.trashIcon)}
          stroke='#757575'
        />
      )}
      {iconType === 'delete' && (
        <>
          <button
            className={classNames(styles.deleteButton, 'buttonFilled-grey700')}>
            삭제
          </button>
          <Undo />
        </>
      )}
    </div>
  );
};
