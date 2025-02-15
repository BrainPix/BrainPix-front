import React from 'react';
import classNames from 'classnames';
import styles from './alarmsCard.module.scss';
import { useQuery } from '@tanstack/react-query';

import { getAlarms } from '../../../apis/alarmAPI';
import { getAlarmResponseType } from '../../../types/alarmType';

interface AlramCardPropsType {
  token: string | null;
}

export const AlarmsCard = ({ token }: AlramCardPropsType) => {
  const { data: alarmsData, isFetching: isFetchingAlarms } = useQuery({
    queryKey: ['alarms'],
    queryFn: () => getAlarms(0),
    enabled: !!token,
  });

  return (
    <div className={classNames(styles.wrapper)}>
      <div className={classNames(styles.title)}>
        알림
        <a
          href='/my/recent-news'
          className={classNames(styles.moreButton)}>
          더보기
        </a>
      </div>
      {token ? (
        <React.Fragment>
          {isFetchingAlarms ? (
            <div className={classNames(styles.alarmListContainer)}>
              {new Array(5).fill(0).map((_, index) => (
                <div
                  className={classNames(styles.listSkeleton)}
                  key={index}
                />
              ))}
            </div>
          ) : (
            <React.Fragment>
              {alarmsData.length === 0 ? (
                <div className={classNames(styles.noAlarmText)}>
                  알림이 없습니다.
                </div>
              ) : (
                <div className={classNames(styles.alarmListContainer)}>
                  {alarmsData.data.alarmDetailList.map(
                    (alarm: getAlarmResponseType) => (
                      <div
                        className={classNames(styles.list, {
                          [styles.isRead]: alarm.isRead,
                        })}
                        key={alarm.alarmId}>
                        <p className={classNames(styles.root)}>
                          {alarm.message}
                        </p>
                        <p className={classNames(styles.content)}>
                          {alarm.header}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <div className={classNames(styles.noToken)}>
          로그인이 필요합니다.
          <button
            className={classNames('buttonFilled-primary', styles.loginButton)}>
            로그인 하기
          </button>
        </div>
      )}
    </div>
  );
};
