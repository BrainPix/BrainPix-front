import classNames from 'classnames';
import styles from './specializationPart.module.scss';
import Dropdown from '../../common/dropdown/Dropdown';

interface SpecializationPartPropsType {
  userType: '개인' | '기업';
}

export const SpecializationPart = ({
  userType,
}: SpecializationPartPropsType) => {
  return (
    <div className={classNames(styles.speciallizationWrapper)}>
      <h1 className={classNames(styles.title)}>
        {userType === '개인' ? '전문 분야' : '기업 분야'}
        <span className={classNames(styles.subTitle)}>{'(최대 2개)'}</span>
      </h1>
      <div className={classNames(styles.dropdown)}>
        <Dropdown
          customClassName={classNames(styles.speciallizationDropdown)}
        />
      </div>
    </div>
  );
};
