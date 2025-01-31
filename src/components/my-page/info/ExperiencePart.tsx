import classNames from 'classnames';
import styles from './experiencePart.module.scss';

interface ExperiencePartPropsType {
  editMode: boolean;
}

export const ExperiencePart = ({ editMode }: ExperiencePartPropsType) => {
  return (
    <div>
      <div className={classNames(styles.title)}>
        경력 사항
        {editMode && (
          <div className={classNames(styles.publicCheckboxWrapper)}>
            <input type='checkbox' />
            <span>공개여부</span>
          </div>
        )}
      </div>
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
      {editMode && (
        <div className={classNames(styles.editInputWrapper)}>
          <div className={classNames(styles.experienceInput)}>
            <input
              placeholder='경력 내용'
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
            className={classNames('buttonFilled-grey800', styles.addButton)}>
            추가하기
          </button>
        </div>
      )}
    </div>
  );
};
