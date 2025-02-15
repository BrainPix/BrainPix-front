import { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';

import { SearchInput } from './SearchInput';
import Loading from '../../../assets/icons/loading.svg?react';
import Logo from '../../../assets/icons/logo.svg?react';
import Alarm from '../../../assets/icons/alarm.svg?react';
import { useNavigate } from 'react-router-dom';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { useQuery } from '@tanstack/react-query';
import { getMyBasicInfo } from '../../../apis/mypageAPI';
import { MyInfoCard } from '../../personal-profile/myInfoCard';
import { ToastContext } from '../../../contexts/toastContext';

const OPTION_MENU = {
  등록하기: '/register',
  요청하기: '/request',
};

const OPTION_MENU_NO_USER = {
  로그인: '/login',
  회원가입: '/sign-up',
};

const PAGE_MENU = {
  '아이디어 마켓': '/idea-market',
  '요청 과제': '/request-assign',
  '협업 광장': '/collaboration',
};

export const Header = () => {
  const location = window.location.pathname;
  const navigate = useNavigate();
  const { successToast } = useContext(ToastContext);
  const alaramContainerRef = useRef<HTMLDivElement>(null);
  const myInfoContainerRef = useRef<HTMLDivElement>(null);

  const [hoverIdeaMarket, setHoverIdeaMarket] = useState(false);
  const [hoverRequest, setHoverRequest] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [openAlarm, setOpenAlarm] = useState(false);
  const [openMyInfo, setOpenMyInfo] = useState(false);

  useOutsideClick({
    ref: alaramContainerRef,
    handler: () => setOpenAlarm(false),
  });

  useOutsideClick({
    ref: myInfoContainerRef,
    handler: () => setOpenMyInfo(false),
  });

  const { data: myBasicInfo, isFetching: isFetchingMyInfo } = useQuery({
    queryKey: ['myBasicInfo'],
    queryFn: getMyBasicInfo,
    enabled: !!(token && openMyInfo),
  });

  const handleClickLogoutButton = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
    successToast('로그아웃 되었습니다.');
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) setToken(accessToken);
  }, []);

  return (
    <div>
      <div className={classNames(styles.container)}>
        <Logo
          className={classNames(styles.logo)}
          onClick={() => navigate('/')}
        />
        <SearchInput />
        <menu>
          <div className={classNames(styles.optionContainer)}>
            <div className={classNames(styles.optionWrapper)}>
              {Object.entries(token ? OPTION_MENU : OPTION_MENU_NO_USER).map(
                ([menu, link]) => (
                  <a
                    href={link}
                    key={menu}>
                    {menu}
                  </a>
                ),
              )}
              {token && (
                <div
                  className={classNames(styles.myInfoContainer)}
                  ref={myInfoContainerRef}>
                  <div className={classNames(styles.icon)}>
                    <span onClick={() => setOpenMyInfo((prev) => !prev)}>
                      마이
                    </span>
                    {openMyInfo && (
                      <div
                        className={classNames(styles.wrapper, styles.myInfo)}>
                        {isFetchingMyInfo ? (
                          <Loading />
                        ) : (
                          <MyInfoCard
                            userData={myBasicInfo.data}
                            onClickLogout={handleClickLogoutButton}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div
              className={classNames(styles.alarmContainer)}
              ref={alaramContainerRef}>
              <Alarm
                onClick={() => setOpenAlarm((prev) => !prev)}
                className={classNames(styles.alarmIcon)}
              />
              {openAlarm && (
                <div className={classNames(styles.wrapper, styles.alarm)}>
                  <div className={classNames(styles.title)}>알림</div>
                  {token ? (
                    <div>알람들 리스트 넣기</div>
                  ) : (
                    <div className={classNames(styles.noToken)}>
                      로그인이 필요합니다.
                      <button
                        className={classNames(
                          'buttonFilled-primary',
                          styles.loginButton,
                        )}>
                        로그인 하기
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </menu>
      </div>
      <div className={classNames(styles.bottomPageWrapper)}>
        {Object.entries(PAGE_MENU).map(([page, link]) => (
          <a
            onMouseEnter={() => {
              setHoverIdeaMarket(page === '아이디어 마켓');
              setHoverRequest(page === '요청 과제');
            }}
            onMouseLeave={() => {
              setHoverIdeaMarket(false);
              setHoverRequest(false);
            }}
            href={link}
            className={classNames({ [styles.clickedPage]: link === location })}
            key={page}>
            {page}
          </a>
        ))}
        {hoverIdeaMarket && (
          <div
            className={classNames(styles.hoverMenu, styles.ideaMarket)}
            onMouseEnter={() => setHoverIdeaMarket(true)}
            onMouseLeave={() => setHoverIdeaMarket(false)}>
            <a href='/idea-market/idea-solution'>Idea Solution</a>
            <a href='/idea-market/market-place'>Market Place</a>
          </div>
        )}
        {hoverRequest && (
          <div
            className={classNames(styles.hoverMenu, styles.request)}
            onMouseEnter={() => setHoverRequest(true)}
            onMouseLeave={() => setHoverRequest(false)}>
            <a href='/request-assign/open-idea'>Open Idea</a>
            <a href='/request-assign/tech-zone'>Tech Zone</a>
          </div>
        )}
      </div>
    </div>
  );
};
