import classNames from 'classnames';
import styles from './descriptionTable.module.scss';

import { IndividualProfileType } from '../../types/profileType';
import {
  INFO_TYPE_MAPPER,
  SKILL_PROFICIENCY_MAPPER,
} from '../../constants/categoryMapper';

interface DescriptionTablePropsType {
  userData: IndividualProfileType;
}

export const DescriptionTable = ({ userData }: DescriptionTablePropsType) => {
  const { selfIntroduction, contacts, stacks, careers } = userData;
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.descriptionWrapper)}>
        <h2 className={classNames(styles.title)}>자기소개</h2>
        <p>{selfIntroduction}</p>
      </div>
      <div className={classNames(styles.descriptionWrapper)}>
        <h2 className={classNames(styles.title)}>개별 정보</h2>
        <table className={classNames(styles.infoTable)}>
          <tbody>
            {contacts.map(({ type, value }) => (
              <tr
                className={classNames(styles.row)}
                key={type}>
                <th>{INFO_TYPE_MAPPER[type]}</th>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={classNames(styles.descriptionWrapper)}>
        <h2 className={classNames(styles.title)}>보유 기술</h2>
        <div className={classNames(styles.skillsContainer)}>
          <div className={classNames(styles.skillWrapper, styles.label)}>
            <div className={classNames(styles.name)}>기술</div>
            <hr className={classNames(styles.skillDivider)} />
            <div className={classNames(styles.level)}>수준</div>
          </div>
          {stacks.map(({ stackName, proficiency }) => (
            <div
              key={stackName}
              className={classNames(styles.skillWrapper)}>
              <div className={classNames(styles.name)}>{stackName}</div>
              <hr className={classNames(styles.skillDivider)} />

              <div className={classNames(styles.level)}>
                {SKILL_PROFICIENCY_MAPPER[proficiency]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={classNames(styles.descriptionWrapper)}>
        <h2 className={classNames(styles.title)}>경력 사항</h2>
        <div className={classNames(styles.careersContainer)}>
          <div className={classNames(styles.careerWrapper, styles.label)}>
            <div className={classNames(styles.name)}>직무</div>
            <hr className={classNames(styles.careerDivider)} />
            <div className={classNames(styles.date)}>기간</div>
          </div>
          {careers.map(({ content, startDate, endDate }) => (
            <div
              key={content}
              className={classNames(styles.careerWrapper)}>
              <div className={classNames(styles.name)}>{content}</div>
              <hr className={classNames(styles.careerDivider)} />
              <div className={classNames(styles.date)}>
                {startDate} - {endDate}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
