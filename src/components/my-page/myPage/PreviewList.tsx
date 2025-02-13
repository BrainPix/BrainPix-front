import classNames from 'classnames';
import styles from './previewList.module.scss';
import Trash from '../../../assets/icons/trash.svg?react';
import Undo from '../../../assets/icons/undo.svg?react';

interface NewsListPropsType {
  isRead?: boolean;
  iconType?: 'trash' | 'more' | 'delete';
  header: string;
  message: string;
  redirectUrl: string;
}

export const PreviewList = ({
  isRead = false,
  iconType = 'more',
  header,
  message,
  redirectUrl,
}: NewsListPropsType) => {
  return (
    <div className={classNames(styles.container, { [styles.isRead]: isRead })}>
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
        <Trash className={classNames(styles.trashIcon)} />
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
