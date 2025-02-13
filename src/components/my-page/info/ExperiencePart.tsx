import classNames from 'classnames';
import styles from './experiencePart.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { IndividualProfileType } from '../../../types/profileType';

interface ExperiencePartPropsType {
  editMode: boolean;
}

export const ExperiencePart = ({ editMode }: ExperiencePartPropsType) => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData([
    'userData',
  ]) as IndividualProfileType;
  return (
    <div>
      <div className={classNames(styles.title)}>
        경력 사항
        {editMode && (
          <div>
            <label htmlFor='checkbox'>
              <div className={classNames(styles.publicCheckWrapper)}>
                <div className={classNames(styles.checkboxLabel)} />
                <span>공개</span>
                {''}
              </div>
            </label>
            <input
              id='checkbox'
              type='checkbox'
              className={classNames(styles.checkboxInput)}
            />
          </div>
        )}
      </div>
      <div className={classNames(styles.experienceWrapper)}>
        <div className={classNames(styles.labelWrapper)}>
          <div className={classNames(styles.label)}>직무</div>
          <hr className={classNames(styles.tableDivider)} />
          <div className={classNames(styles.label)}>기간</div>
        </div>
        {userData.careers.map(({ content, startDate, endDate }) => (
          <div
            className={classNames(styles.list)}
            key={content}>
            <div className={classNames(styles.experience)}>{content}</div>
            <hr className={classNames(styles.tableDivider)} />
            <div className={classNames(styles.date)}>
              {startDate} - {endDate}
            </div>
          </div>
        ))}
      </div>
      {editMode && (
        <div className={classNames(styles.editInputWrapper)}>
          <div className={classNames(styles.experienceInput)}>
            <input
              placeholder='직무 내용'
              className={classNames(styles.input, styles.contentInput)}
            />
            <div className={classNames(styles.dateInputWrapper)}>
              <input
                placeholder='시작 날짜 선택'
                className={classNames(styles.input, styles.startDate)}
              />
              <div className={classNames(styles.inputDivider)} />
              <input
                placeholder='종료 날짜 선택'
                className={classNames(styles.input, styles.endDate)}
              />
            </div>
          </div>
          <button
            type='button'
            className={classNames('buttonFilled-grey700', styles.addButton)}>
            추가하기
          </button>
        </div>
      )}
    </div>
  );
};
