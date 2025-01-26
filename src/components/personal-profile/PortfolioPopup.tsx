import { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './portfolioPopup.module.scss';

interface PortfolioPopupPropsType {
  onClosePopup: () => void;
}

export const PortfolioPopup = forwardRef<
  HTMLDivElement,
  PortfolioPopupPropsType
>(({ onClosePopup }, ref) => {
  return (
    <div
      className={classNames(styles.container)}
      ref={ref}>
      <div className={classNames(styles.titleWrapper)}>
        <h1 className={classNames(styles.title)}>포트폴리오 제목</h1>
        <button className={classNames(styles.editButton)}>수정하기</button>
      </div>
      <div className={classNames(styles.infoWrapper)}>
        <span>카테고리: 디자인</span>
        <span>프로젝트 기간: 2024/8 - 2024/12</span>
      </div>
      <div className={classNames(styles.contentWrapper)}>포트폴리오 내용</div>
      <button
        className={classNames(styles.closeButton)}
        onClick={onClosePopup}>
        닫기
      </button>
    </div>
  );
});

PortfolioPopup.displayName = 'PortfolioPopup';
