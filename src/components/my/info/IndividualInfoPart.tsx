import classNames from 'classnames';
import styles from './individualInfoPart.module.scss';
import Dropdown from '../../dropdown/Dropdown';

interface IndividualInfoPartPropsType {
  editMode: boolean;
  userData: {
    연락처: string;
    노션: string;
    깃허브: string;
  };
}

const LABEL_OPTIONS = ['연락처', '노션', '깃허브'];

export const IndividualInfoPart = ({
  editMode,
  userData,
}: IndividualInfoPartPropsType) => {
  return (
    <div>
      <h1 className={classNames(styles.title)}>
        개별 정보
        {editMode && (
          <span className={classNames(styles.subTitle)}>{'(최대 500자)'}</span>
        )}
      </h1>
      <div className={classNames(styles.individualInfoWrapper)}>
        {Object.entries(userData).map(([key, value]) => (
          <div
            key={key}
            className={classNames(styles.list)}>
            <span className={classNames(styles.label)}>{key}</span>
            <hr className={classNames(styles.divider)} />
            <span>{value}</span>
          </div>
        ))}
      </div>
      {editMode && (
        <div className={classNames(styles.editInputWrapper)}>
          <div className={classNames(styles.inputContainer)}>
            <Dropdown
              options={LABEL_OPTIONS}
              customClassName={classNames(styles.dropdown)}
            />
            <input className={classNames(styles.input)} />
            <div className={classNames(styles.publicCheckWrapper)}>
              <input
                type='checkbox'
                className={classNames(styles.checkbox)}
              />
              공개여부
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
