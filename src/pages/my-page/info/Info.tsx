import classNames from 'classnames';
import styles from './info.module.scss';

import { MyProfileCard } from '../../../components/my/MyProfileCard';
import { PortfolioCarousel } from '../../../components/personal-profile/PortfolioCarousel';
import { LevelCheckboxGroup } from '../../../components/common/levelCheckboxGroup/LevelCheckboxGroup';

export const Info = () => {
  const handleClick = (value: string) => {
    console.log(value);
  };
  return (
    <div>
      <MyProfileCard status='edit' />
      <div className={classNames(styles.contentContainer)}>
        <div>
          <h1 className={classNames(styles.title)}>자기 소개</h1>
          <div className={classNames(styles.introduceWrapper)}>
            자기 소개 내용임
          </div>
        </div>
        <div>
          <h1 className={classNames(styles.title)}>개별 정보</h1>
          <div className={classNames(styles.individualInfoWrapper)}>
            <div className={classNames(styles.labelWrapper)}>
              <span>연락처</span>
              <span>노션</span>
              <span>깃허브</span>
            </div>
            <div className={classNames(styles.contentWrapper)}>
              <span>01023451234</span>
              <span>노션 주소</span>
              <span>깃허브 주소</span>
            </div>
          </div>
        </div>
        <div>
          <h1 className={classNames(styles.title)}>보유 기술</h1>
          <div className={classNames(styles.skillInfoWrapper)}>
            <div className={classNames(styles.list)}>
              <span className={classNames(styles.label)}>파이썬</span>
              <span className={classNames(styles.content)}>
                파이썬을 이용한 2D 게임 개발 경험
              </span>
              <LevelCheckboxGroup onChangeLevel={handleClick} />
            </div>
          </div>
        </div>
        <div>
          <h1 className={classNames(styles.title)}>경력 사항</h1>
          <div className={classNames(styles.experienceWrapper)}>
            <div className={classNames(styles.list)}>
              <span className={classNames(styles.content)}>
                삼성 소프트웨어 개발(서버) 인턴쉽
              </span>
              <hr className={classNames(styles.divider)} />
              <span className={classNames(styles.date)}>2024/08 - 2024/12</span>
            </div>
            <div className={classNames(styles.list)}>
              <span className={classNames(styles.content)}>
                삼성 소프트웨어 개발(서버) 인턴쉽
              </span>
              <hr className={classNames(styles.divider)} />
              <span className={classNames(styles.date)}>2024/08 - 2024/12</span>
            </div>
          </div>
        </div>
        <div className={classNames(styles.portfolioWrapper)}>
          <h1 className={classNames(styles.title)}>포트폴리오</h1>
          <PortfolioCarousel size={3} />
        </div>
      </div>
    </div>
  );
};
