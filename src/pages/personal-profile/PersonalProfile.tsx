import classNames from 'classnames';
import styles from './personalProfile.module.scss';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { PostsCarousel } from '../../components/personal-profile/PostsCarousel';
import { IndividualProfileType } from '../../types/profileType';
import {
  getOtherProfileCompany,
  getOtherProfilePersonal,
} from '../../apis/profileAPI';
import { PERSONAL_RPOFILE_INIT } from '../../constants/initValues';
import { ProfileCard } from '../../components/personal-profile/ProfileCard';
import { DescriptionTable } from '../../components/personal-profile/DescriptionTable';

export const PersonalProfile = () => {
  const { id, userType } = useParams();

  const {
    data: selectedPersonalUserInfo,
    isLoading: isFetchingPersonalInfoData,
  } = useQuery({
    queryKey: ['selectedUserInfo'],
    queryFn: () => getOtherProfilePersonal(Number(id)),
    enabled: userType === 'personal',
  });

  const {
    data: selectedCompanylUserInfo,
    isFetching: isFetchingCompanyInfoData,
  } = useQuery({
    queryKey: ['selectedUserInfo'],
    queryFn: () => getOtherProfileCompany(Number(id)),
    enabled: userType === 'corporate',
  });

  if (isFetchingCompanyInfoData || isFetchingPersonalInfoData) {
    <div>로딩 중..</div>;
  }

  const { name, specializations, profileImage } =
    (selectedPersonalUserInfo as IndividualProfileType) ??
    PERSONAL_RPOFILE_INIT;

  return (
    <div className={classNames(styles.container)}>
      <ProfileCard
        userType={userType || ''}
        userName={name}
        specializations={specializations}
        profileImage={profileImage}
      />
      <DescriptionTable userData={selectedPersonalUserInfo} />
      {/* <PortfolioCarousel size={4} /> */}
      <PostsCarousel />
    </div>
  );
};
