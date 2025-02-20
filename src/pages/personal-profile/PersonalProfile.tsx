import classNames from 'classnames';
import styles from './personalProfile.module.scss';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { PostsCarousel } from '../../components/personal-profile/PostsCarousel';
import {
  CompanyProfileResponseType,
  IndividualProfileResponseType,
} from '../../types/profileType';
import {
  getOtherProfileCompany,
  getOtherProfilePersonal,
} from '../../apis/profileAPI';
import { ProfileCard } from '../../components/personal-profile/ProfileCard';
import { DescriptionTable } from '../../components/personal-profile/DescriptionTable';
import {
  COMPANY_RPOFILE_INIT,
  PERSONAL_RPOFILE_INIT,
} from '../../constants/initValues';
import { PortfolioCarousel } from '../../components/personal-profile/PortfolioCarousel';
import LoadingPage from '../loading/LoadingPage';

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
    <LoadingPage />;
  }

  const userData =
    userType === 'personal'
      ? ((selectedPersonalUserInfo as IndividualProfileResponseType) ??
        PERSONAL_RPOFILE_INIT)
      : ((selectedCompanylUserInfo as CompanyProfileResponseType) ??
        COMPANY_RPOFILE_INIT);

  const { nickname, specializations } = userData;

  return (
    <div className={classNames(styles.container)}>
      <ProfileCard
        userType={userType || ''}
        userName={nickname}
        specializations={specializations}
        profileImage={
          userType === 'personal'
            ? (userData as IndividualProfileResponseType).profileImage
            : (userData as CompanyProfileResponseType).imageUrl
        }
      />
      <DescriptionTable userData={userData} />
      <PortfolioCarousel size={4} />
      <PostsCarousel />
    </div>
  );
};
