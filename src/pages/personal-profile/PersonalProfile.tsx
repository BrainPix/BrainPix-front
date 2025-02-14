import classNames from 'classnames';
import { ProfileCard } from '../../components/personal-profile/ProfileCard';
import { DescriptionTable } from '../../components/personal-profile/DescriptionTable';
import { PortfolioCarousel } from '../../components/personal-profile/PortfolioCarousel';
import { PostsCarousel } from '../../components/personal-profile/PostsCarousel';
import styles from './personalProfile.module.scss';
import { useParams } from 'react-router-dom';
import { IndividualProfileType } from '../../types/profileType';

export const PersonalProfile = () => {
  const { id, userType } = useParams();

  console.log(id, userType);

  // const { data: selectedPersonalUserInfo } = useQuery({
  //   queryKey: ['selectedUserInfo'],
  //   queryFn: () => getOtherProfilePersonal(id),
  // });

  // const { data: selectedCompanylUserInfo } = useQuery({
  //   queryKey: ['selectedUserInfo'],
  //   queryFn: () => getOtherProfileCompany(id),
  // });

  // console.log(selectedPersonalUserInfo);

  // if (userType === 'personal') {
  // }

  const USER_DATA: IndividualProfileType = {
    userId: 123,
    name: 'MIN JEONG',
    userType: 'INDIVIDUAL',
    profileImage: '',
    specializations: ['DESIGN', 'LESSON'],
    selfIntroduction: '자기 소개입니다.',
    contacts: [
      {
        type: 'PHONE',
        value: '010-1234-5576',
      },
    ],
    stacks: [
      {
        stackName: '파이썬',
        proficiency: 'HIGH',
      },
      {
        stackName: 'C언어',
        proficiency: 'LOW',
      },
    ],
    careers: [
      {
        content: 'SY TECH 인턴',
        startDate: '2022/12',
        endDate: '2023/06',
      },
      {
        content: 'TECH 인턴',
        startDate: '2024/12',
        endDate: '2027/02',
      },
    ],
  };

  return (
    <div className={classNames(styles.container)}>
      <ProfileCard
        userType={USER_DATA.userType}
        userName={USER_DATA.name}
        specializations={USER_DATA.specializations}
        profileImage={USER_DATA.profileImage}
      />
      <DescriptionTable userData={USER_DATA} />
      <PortfolioCarousel size={4} />
      <PostsCarousel />
    </div>
  );
};
