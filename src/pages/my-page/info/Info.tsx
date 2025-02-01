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

const USER_DATA = {
  연락처: '01023451234',
  노션: '노션 주소',
  깃허브: '깃허브 주소',
};

export const Info = () => {
  const [editMode, setEditMode] = useState(false);
  const [userType, setUserType] = useState<'개인' | '기업'>('기업');

  const defaultInputValues = {
    introduce: '',
    phone: '01012345678',
    notion: '노션 주소임',
    github: '깃허브 주소임',
    homepage: '홈페이지 주소',
    email: '이메일 주소',
  };

  const { register, handleSubmit } = useForm({
    defaultValues: defaultInputValues,
  });

  const handleClickEditButton = () => {
    setEditMode(true);
  };

  const handleClickSaveButton = () => {
    setEditMode(false);
  };

  const handleSubmitHandler: SubmitHandler<FieldValues> = (payload) => {
    console.log(payload);
    setEditMode(false);
  };

  const individualInfoRegisters = {
    phone: register('phone'),
    notion: register('notion'),
    github: register('github'),
  };

  const enterpriseInfoRegisters = {
    homepage: register('homepage'),
    email: register('email'),
    phone: register('phone'),
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitHandler)}>
      <button
        type='button'
        onClick={() => setUserType(userType === '기업' ? '개인' : '기업')}>
        {userType}
      </button>
      <MyProfileCard
        status={editMode ? 'save' : 'edit'}
        onClickButton={editMode ? handleClickSaveButton : handleClickEditButton}
      />
      {userType === '개인' ? (
        <div className={classNames(styles.contentContainer)}>
          <IntroducePart
            editMode={editMode}
            userType={userType}
            {...register('introduce')}
          />
          <div
            className={classNames(
              editMode ? styles.colContainer : styles.rowContainer,
            )}>
            <IndividualInfoPart
              editMode={editMode}
              userData={USER_DATA}
              userType={userType}
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
      ) : (
        <div className={classNames(styles.contentContainer)}>
          <IntroducePart
            editMode={editMode}
            userType={userType}
            {...register('introduce')}
          />
          <IndividualInfoPart
            editMode={editMode}
            userData={USER_DATA}
            userType={userType}
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
  );
};
