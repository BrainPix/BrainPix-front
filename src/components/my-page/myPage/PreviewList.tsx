import classNames from 'classnames';
import { forwardRef, MouseEvent, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import styles from './previewList.module.scss';
import Trash from '../../../assets/icons/trash.svg?react';
import Undo from '../../../assets/icons/undo.svg?react';
import { getAlarmResponseType } from '../../../types/alarmType';
import {
  deleteAlarm,
  patchReadAlarm,
  patchRestoreAlarm,
  patchTrashAlarm,
} from '../../../apis/alarmAPI';
import { ToastContext } from '../../../contexts/toastContext';

interface NewsListPropsType {
  alarmData: getAlarmResponseType;
  iconType?: 'trash' | 'more' | 'delete';
  onClickIcon?: () => void;
}

export const PreviewList = forwardRef<HTMLDivElement, NewsListPropsType>(
  ({ alarmData, iconType = 'more', onClickIcon }, ref) => {
    const queryClient = useQueryClient();
    const { errorToast } = useContext(ToastContext);
    const { alarmId, isRead, header, message, redirectUrl } = alarmData ?? {
      alarmId: '',
      isRead: false,
      header: '',
      message: '',
      redirectUrl: '',
    };

    const { mutate: patchReadAlarmMutate } = useMutation({
      mutationFn: () => patchReadAlarm(alarmId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['alarmsInTrash'],
        });
        onClickIcon?.();
      },
    });

    const { mutate: patchTrashAlarmMutate } = useMutation({
      mutationFn: () => patchTrashAlarm(alarmId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['alarmsInTrash'],
        });
        onClickIcon?.();
      },
      onError: () => errorToast('삭제에 실패하였습니다.'),
    });

    const { mutate: patchRestoreAlarmMutate } = useMutation({
      mutationFn: () => patchRestoreAlarm(alarmId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['alarmsInTrash'],
        });
        onClickIcon?.();
      },
    });

    const { mutate: deleteAlarmMutate } = useMutation({
      mutationFn: () => deleteAlarm(alarmId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['alarmsInTrash'],
        });
        onClickIcon?.();
      },
    });

    const handleClickList = () => {
      if (isRead) {
        // navigate(redirectUrl);
        return null;
      }
      patchReadAlarmMutate();
      // navigate(redirectUrl);
    };

    const handleClickTrashIcon = (e: MouseEvent<SVGSVGElement>) => {
      e.stopPropagation();
      patchTrashAlarmMutate();
    };

    const handleClickRestoreIcon = (e: MouseEvent<SVGSVGElement>) => {
      e.stopPropagation();
      patchRestoreAlarmMutate();
    };

    const handleClickDeleteIcon = (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      deleteAlarmMutate();
    };

    return (
      <div
        className={classNames(styles.container, { [styles.isRead]: isRead })}
        onClick={handleClickList}
        ref={ref}>
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
            onClick={handleClickTrashIcon}
          />
        )}
        {iconType === 'delete' && (
          <>
            <button
              onClick={handleClickDeleteIcon}
              className={classNames(
                styles.deleteButton,
                'buttonFilled-grey700',
              )}>
              삭제
            </button>
            <Undo onClick={handleClickRestoreIcon} />
          </>
        )}
      </div>
    );
  },
);

PreviewList.displayName = 'PreviewList';
