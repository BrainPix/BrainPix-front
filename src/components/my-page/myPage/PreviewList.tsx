import classNames from 'classnames';
import styles from './previewList.module.scss';
import Trash from '../../../assets/icons/trash.svg?react';
import Undo from '../../../assets/icons/undo.svg?react';
import { getAlarmResponseType } from '../../../types/alarmType';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { patchReadAlarm, patchTrashAlarm } from '../../../apis/alarmAPI';

interface NewsListPropsType {
  alarmData: getAlarmResponseType;
  iconType?: 'trash' | 'more' | 'delete';
  onClickIcon?: () => void;
}

export const PreviewList = ({
  alarmData,
  iconType = 'more',
  onClickIcon,
}: NewsListPropsType) => {
  const queryClient = useQueryClient();
  const { alarmId, isRead, header, message, redirectUrl } = alarmData ?? {
    alarmId: '',
    isRead: false,
    header: '',
    message: '',
    redirectUrl: '',
  };

  const { mutate: patchReadAlarmMutate } = useMutation({
    mutationFn: () => patchReadAlarm(alarmId),
  });

  const { mutate: patchTrashAlarmMutate } = useMutation({
    mutationFn: () => patchTrashAlarm(alarmId),
  });

  const handleClickList = () => {
    patchReadAlarmMutate();
    // navigate(redirectUrl);
  };

  const handleClickTrash = () => {
    patchTrashAlarmMutate();
    queryClient.invalidateQueries({
      queryKey: ['alarmsInTrash'],
    });
    onClickIcon?.();
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
          onClick={handleClickTrash}
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
