import classNames from 'classnames';
import styles from './specializationPart.module.scss';
import Dropdown from '../../dropdown/Dropdown';

export const SpecializationPart = () => {
  return (
    <div className={classNames(styles.speciallizationWrapper)}>
      <h1 className={classNames(styles.title)}>
        전문 분야
        <span className={classNames(styles.subTitle)}>{'(최대 3개)'}</span>
      </h1>
      <Dropdown customClassName={classNames(styles.speciallizationDropdown)} />
    </div>
  );
};
