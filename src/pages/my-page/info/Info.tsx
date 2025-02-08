import { useState } from 'react';
import classNames from 'classnames';
import styles from './info.module.scss';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { MyProfileCard } from '../../../components/my-page/info/MyProfileCard';
import { IntroducePart } from '../../../components/my-page/info/IntroducePart';
import { IndividualInfoPart } from '../../../components/my-page/info/IndividualInfoPart';
import { SkillPart } from '../../../components/my-page/info/SkillPart';
import { ExperiencePart } from '../../../components/my-page/info/ExperiencePart';
import { PortfolioPart } from '../../../components/my-page/info/PortfolioPart';
import { SpecializationPart } from '../../../components/my-page/info/SpecializationPart';
import { BusinessInfoPart } from '../../../components/my-page/info/BusinessInfoPart';
import { useQuery } from '@tanstack/react-query';
import { getProfilePersonal } from '../../../apis/profileAPI';
import { PERSONAL_RPOFILE_INIT } from '../../../constants/initValues';

const USER_DATA = {
  연락처: '01023451234',
  노션: '노션 주소',
  깃허브: '깃허브 주소',
};

export const Info = () => {
  const [editMode, setEditMode] = useState(false);
  type userTypetype = '개인' | '기업';

  const userType: userTypetype =
    localStorage.getItem('myType') === 'personal' ? '개인' : '기업';

  const defaultInputValues = {
    introduce: '',
    phone: '01012345678',
    notion: '노션 주소임',
    github: '깃허브 주소임',
    homepage: '홈페이지 주소',
    email: '이메일 주소',
    others: '',
  };

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: defaultInputValues,
  });

  const { data: personalData, isLoading: isPersonalDataPending } = useQuery({
    queryKey: ['userData'],
    queryFn: getProfilePersonal,
    enabled: userType === '기업',
  });

  const { data: companyData, isLoading: isCompanyDataPending } = useQuery({
    queryKey: ['userData'],
    queryFn: getProfilePersonal,
    enabled: userType === '개인',
  });

  if (isPersonalDataPending || isCompanyDataPending) {
    return <div>로딩 중..</div>;
  }

  const handleClickEditButton = () => {
    setEditMode(true);
  };

  const handleClickSaveButton = () => {
    setEditMode(false);
  };

  const handleSubmitHandler: SubmitHandler<FieldValues> = () => {
    setEditMode(false);
  };

  const individualInfoRegisters = {
    phone: register('phone'),
    notion: register('notion'),
    github: register('github'),
    email: register('email'),
    others: register('others'),
  };

  const enterpriseInfoRegisters = {
    homepage: register('homepage'),
    email: register('email'),
    phone: register('phone'),
    others: register('others'),
  };
  return (
    <div className={classNames(styles.container)}>
      <form onSubmit={handleSubmit(handleSubmitHandler)}>
        <MyProfileCard
          userData={personalData ?? PERSONAL_RPOFILE_INIT}
          status={editMode ? 'save' : 'edit'}
          onClickButton={
            editMode ? handleClickSaveButton : handleClickEditButton
          }
        />
        {userType === '개인' && personalData && (
          <div className={classNames(styles.contentContainer)}>
            <IntroducePart
              editMode={editMode}
              setValue={setValue}
              watch={watch}
              {...register('introduce')}
            />
            <div
              className={classNames(
                editMode ? styles.colContainer : styles.rowContainer,
              )}>
              <IndividualInfoPart
                editMode={editMode}
                registers={individualInfoRegisters}
              />
              {editMode && <SpecializationPart userType={userType} />}

              <SkillPart editMode={editMode} />
            </div>
            <ExperiencePart editMode={editMode} />
            <PortfolioPart
              editMode={editMode}
              userType={userType}
            />
          </div>
        )}
        {userType === '기업' && companyData && (
          <div className={classNames(styles.contentContainer)}>
            <IntroducePart
              editMode={editMode}
              setValue={setValue}
              watch={watch}
              {...register('introduce')}
            />
            <IndividualInfoPart
              editMode={editMode}
              registers={enterpriseInfoRegisters}
            />
            {editMode && <SpecializationPart userType={userType} />}
            <BusinessInfoPart editMode={editMode} />
            <PortfolioPart
              editMode={editMode}
              userType={userType}
            />
          </div>
        )}
      </form>
    </div>
  );
};
