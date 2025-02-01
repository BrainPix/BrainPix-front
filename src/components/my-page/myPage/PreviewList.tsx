import classNames from 'classnames';
import styles from './previewList.module.scss';
import Arrow from '../../../assets/icons/arrowRight.svg?react';
import Trash from '../../../assets/icons/trash.svg?react';
import Undo from '../../../assets/icons/undo.svg?react';

interface NewsListPropsType {
  isRead?: boolean;
  iconType?: 'trash' | 'more' | 'delete';
}

export const PreviewList = ({
  isRead = false,
  iconType = 'more',
}: NewsListPropsType) => {
  return (
    <div className={classNames(styles.container, { [styles.isRead]: isRead })}>
      {isRead && (
        <div className={classNames(styles.tag, styles.read)}>읽음</div>
      )}
      <div className={classNames(styles.pageRouteWrapper)}>
        <span className={classNames(styles.page)}>아이디어 마켓</span>
        <Arrow
          width={24}
          height={24}
          className={classNames(styles.arrow)}
        />
        <span className={classNames(styles.page)}>담당자 Q&A</span>
      </div>
      <span className={classNames(styles.content)}>
        Roria님이 댓글을 남겼습니다.
      </span>
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
