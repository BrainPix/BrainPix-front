import classNames from 'classnames';
import { userProfileData } from '../../types/userDataType';
import styles from './descriptionTable.module.scss';

interface DescriptionTablePropsType {
  userData: userProfileData;
}

export const DescriptionTable = ({ userData }: DescriptionTablePropsType) => {
  const { phoneNumber, notion, github, skills, careers } = userData;
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.descriptionWrapper)}>
        <h2 className={classNames(styles.title)}>자기소개</h2>
        <p>자기소개 입니다. </p>
      </div>
      <div className={classNames(styles.descriptionWrapper)}>
        <h2 className={classNames(styles.title)}>개별 정보</h2>
        <table className={classNames(styles.infoTable)}>
          <tbody>
            <tr className={classNames(styles.row)}>
              <th>연락처</th>
              <td>{phoneNumber}</td>
            </tr>
            <tr className={classNames(styles.row)}>
              <th>노션</th>
              <td>{notion}</td>
            </tr>
            <tr className={classNames(styles.row)}>
              <th>깃허브</th>
              <td>{github}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={classNames(styles.descriptionWrapper)}>
        <h2 className={classNames(styles.title)}>보유 기술</h2>
        <div className={classNames(styles.skillsContainer)}>
          {skills.map((skill) => (
            <div
              key={skill.name}
              className={classNames(styles.skillWrapper)}>
              <div className={classNames(styles.name)}>{skill.name}</div>
              <hr className={classNames(styles.skillDivider)} />
              <div className={classNames(styles.content)}>{skill.content}</div>
              <hr className={classNames(styles.skillDivider)} />
              <div className={classNames(styles.level)}>{skill.level}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={classNames(styles.descriptionWrapper)}>
        <h2 className={classNames(styles.title)}>경력 사항</h2>
        <div className={classNames(styles.careersContainer)}>
          {careers.map((career) => (
            <div
              key={career.name}
              className={classNames(styles.careerWrapper)}>
              <div className={classNames(styles.name)}>{career.name}</div>
              <hr className={classNames(styles.careerDivider)} />
              <div className={classNames(styles.date)}>
                {career.start} - {career.end}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
