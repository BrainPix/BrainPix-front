import classNames from 'classnames';
import { Fragment } from 'react/jsx-runtime';
import styles from './myPage.module.scss';
import { MyProfileCard } from '../../../components/my-page/myPage/MyProfileCard';
import { PreviewList } from '../../../components/my-page/myPage/PreviewList';

export const MyPage = () => {
  const USER_DATA = {
    name: 'SEO YEON',
    profileImage: null,
    type: '개인',
    department: '기획/디자인',
    ideaCount: 2,
    collaborationCount: 4,
    introduce: '자기소개임',
  };

  const SUB_INFO = {
    분야: USER_DATA.department,
    아이디어: USER_DATA.ideaCount,
    '협업 경험': USER_DATA.collaborationCount,
  };

  return (
    <div>
      <MyProfileCard />
      <div className={classNames(styles.subInfoWrapper)}>
        {Object.entries(SUB_INFO).map(([key, value], idx) => (
          <Fragment key={key}>
            <div>
              <p className={classNames(styles.subTitle)}>{key}</p>
              <p className={classNames(styles.content)}>{value}</p>
            </div>
            {idx < 2 && <hr className={classNames(styles.divider)} />}
          </Fragment>
        ))}
      </div>
      <div>
        <div className={classNames(styles.title)}>
          자기소개
          <a href='/my'>수정하기</a>
        </div>
        <p className={classNames(styles.introduceContent)}>
          {USER_DATA.introduce}
        </p>
      </div>
      <div>
        <div className={classNames(styles.title)}>
          최근 소식
          <a href='/my/recent-news'>전체보기</a>
        </div>
        <div className={classNames(styles.recentNewsWrapper)}>
          <PreviewList isRead />
          <PreviewList />
        </div>
      </div>
      <div>
        <div className={classNames(styles.title)}>
          내 아이디어
          <a href='/my'>전체보기</a>
        </div>
        <div className={classNames(styles.recentNewsWrapper)}>
          <PreviewList />
        </div>
      </div>
    </div>
  );
};
