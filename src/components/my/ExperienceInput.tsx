import classNames from 'classnames';
import styles from './experienceInput.module.scss';

export const ExperienceInput = () => {
  return (
    <div className={classNames(styles.container)}>
      <input
        placeholder='경력 내용'
        className={classNames(styles.input, styles.contentInput)}
      />
      <div className={classNames(styles.dateInputWrapper)}>
        <input
          placeholder='시작 날짜 선택'
          className={classNames(styles.input, styles.startDate)}
        />
        <div className={classNames(styles.divider)} />
        <input
          placeholder='종료 날짜 선택'
          className={classNames(styles.input, styles.endDate)}
        />
      </div>
    </div>
  );
};
