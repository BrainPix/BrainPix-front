import classNames from 'classnames';
import { ProfileCard } from '../../components/personal-profile/ProfileCard';
import { DescriptionTable } from '../../components/personal-profile/DescriptionTable';
import { Portfolio } from '../../components/personal-profile/portfolio';
import { userProfileData } from '../../types/userData';
import styles from './personalProfile.module.scss';

export const PersonalProfile = () => {
  // const { id } = useParams();

  const userData: userProfileData = {
    id: 123,
    name: 'MIN JEONG',
    phoneNumber: '010-1234-5678',
    notion: '노션 주소임',
    github: '깃허브 주소임',
    skills: [
      {
        name: '파이썬',
        content: '파이썬을 이용한 게임 제작',
        level: '상',
      },
      {
        name: 'C언어',
        content: 'C언어를 이용한 개발 경험',
        level: '하',
      },
    ],
    careers: [
      {
        name: 'SY TECH 인턴',
        start: '2022/12',
        end: '2023/06',
      },
      {
        name: 'TECH 인턴',
        start: '2024/12',
        end: '2027/02',
      },
    ],
  };

  return (
    <div className={classNames(styles.container)}>
      <ProfileCard />
      <DescriptionTable userData={userData} />
      <Portfolio />
    </div>
  );
};
