import classNames from 'classnames';
import styles from './specializationPart.module.scss';
import { Dropdown } from '../../common/dropdown/Dropdown';
import Delete from '../../../assets/icons/delete.svg?react';

interface SpecializationPartPropsType {
  userType: '개인' | '기업';
  onChange: (option: string) => void;
  onDelete: (option: string) => void;
  selectedSpecialization: string[];
}

export const SpecializationPart = ({
  userType,
  onChange,
  onDelete,
  selectedSpecialization,
}: SpecializationPartPropsType) => {
  return (
    <div className={classNames(styles.speciallizationWrapper)}>
      <h1 className={classNames(styles.title)}>
        {userType === '개인' ? '전문 분야' : '기업 분야'}
        <span className={classNames(styles.subTitle)}>{'(최대 2개)'}</span>
      </h1>
      <Dropdown
        onSelect={onChange}
        selectedBoxClassName={classNames(styles.selectedropdown)}
        optionBoxClassName={classNames(styles.optionsDropdown)}
      />
      <div className={classNames(styles.selectedSpecialzationsWrapper)}>
        {selectedSpecialization &&
          selectedSpecialization.map((specialization) => (
            <div
              key={specialization}
              className={classNames(styles.selectedSpecialzations)}>
              {specialization}
              <Delete
                width={10}
                height={10}
                stroke='#757575'
                onClick={() => onDelete(specialization)}
                className={classNames(styles.deleteIcon)}
              />
            </div>
          ))}
      </div>
    </div>
  );
};
