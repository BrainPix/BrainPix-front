import classNames from 'classnames';
import styles from './portfolioPart.module.scss';
import { PortfolioCarousel } from '../../personal-profile/PortfolioCarousel';

interface PortfolioParttPropsType {
  editMode: boolean;
  userType: '개인' | '기업';
}

export const PortfolioPart = ({
  editMode,
  userType,
}: PortfolioParttPropsType) => {
  console.log(editMode);
  return (
    <div className={classNames(styles.portfolioWrapper)}>
      <div className={classNames(styles.portfolioTitle)}>
        {userType === '기업' && '기업'} 포트폴리오
        {editMode && (
          <span className={classNames(styles.manageText)}>관리하기</span>
        )}
      </div>
      <PortfolioCarousel size={4} />
    </div>
  );
};
