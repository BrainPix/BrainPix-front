import { useContext, useEffect, useState } from 'react';
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfilePersonal } from '../../../apis/profileAPI';
import { PERSONAL_RPOFILE_INIT } from '../../../constants/initValues';
import {
  IndividualCareerResponseType,
  IndividualContactType,
  IndividualSkillTypeResponseType,
} from '../../../types/profileType';
import {
  CATEGORY_LABELS,
  CATEGORY_MAPPER_TO_ENG,
} from '../../../constants/categoryMapper';
import { IndividualInfoPayloadType } from '../../../types/myPageType';
import { putIndividualInfo } from '../../../apis/mypageAPI';
import { ToastContext } from '../../../contexts/toastContext';

export const Info = () => {
  type userTypetype = '개인' | '기업';
  const queryClient = useQueryClient();

  const [editMode, setEditMode] = useState(false);
  const [contacts, setContacts] = useState<IndividualContactType[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    string[]
  >(['']);
  const [skills, setSkills] = useState<IndividualSkillTypeResponseType[]>([]);
  const [careers, setCareers] = useState<IndividualCareerResponseType[]>([]);

  const { errorToast, successToast } = useContext(ToastContext);

  const userType: userTypetype =
    localStorage.getItem('myType') === 'personal' ? '개인' : '기업';

  const defaultInputValues = {
    profileImage: '',
    selfIntroduction: '',
    stackOpen: false,
    careerOpen: false,
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

  const { mutate: editMyInfoMutate } = useMutation({
    mutationFn: (payload: IndividualInfoPayloadType) =>
      putIndividualInfo(personalData.userId, payload),
    onSuccess: () => {
      successToast('수정되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['userData'],
      });
    },
    onError: () => {
      errorToast('수정에 실패하였습니다. 다시 시도해주세요.');
    },
  });

  useEffect(() => {
    if (personalData) {
      setValue('selfIntroduction', personalData.selfIntroduction);
      const updatedSpecializations = personalData.specializations.map(
        (value: string) => {
          return CATEGORY_LABELS[value];
        },
      );
      setSelectedSpecialization(updatedSpecializations);
      setContacts(personalData.contacts);
      setSkills(personalData.stacks);
      setCareers(personalData.careers);
    }
  }, [personalData, companyData, setValue]);

  if (isPersonalDataPending || isCompanyDataPending) {
    return <div>로딩 중..</div>;
  }

  const handleClickEditButton = () => {
    setEditMode(true);
  };

  const handleClickSaveButton = () => {
    setEditMode(false);
  };

  const handleChangeSpecialziations = (option: string) => {
    let haveOption = false;

    selectedSpecialization.forEach((specialization) => {
      if (specialization === option) {
        haveOption = true;
      }
    });

    if (!haveOption) {
      setSelectedSpecialization((prev) => [prev[0], option]);
    }
  };

  const handleClickDeleteSelectedSpecialization = (option: string) => {
    const updatedSpecialization = selectedSpecialization?.filter(
      (value) => value !== option,
    );
    setSelectedSpecialization(updatedSpecialization);
  };

  const handleSubmitHandler: SubmitHandler<FieldValues> = async (
    payload: FieldValues,
  ) => {
    const requestBody: IndividualInfoPayloadType = {
      profileImage: payload.profileImage,
      selfIntroduction: payload.selfIntroduction,
      stackOpen: payload.stackOpen,
      careerOpen: payload.careerOpen,
      contacts,
      careers,
      specializations: selectedSpecialization.map(
        (speicialization) => CATEGORY_MAPPER_TO_ENG[speicialization],
      ),
      stacks: skills.map(({ stackName, ...rest }) => ({
        name: stackName,
        ...rest,
      })),
    };
    editMyInfoMutate(requestBody);
    setEditMode(false);
  };

  const handleClickAddInfoButton = (data: IndividualContactType) => {
    setContacts((prev) => {
      const existingIndex = prev.findIndex((item) => item.type === data.type);
      if (existingIndex !== -1) {
        return prev.map((item, index) =>
          index === existingIndex
            ? { ...item, value: data.value, isPublic: data.isPublic }
            : item,
        );
      }
      return [...prev, data];
    });
  };

  const handleClickDeleteInfoButton = (deleteType: string) => {
    const updatedContacts = contacts.filter(
      (contact) => contact.type !== deleteType,
    );
    setContacts(updatedContacts);
  };

  const handleClickAddSkillButton = (data: IndividualSkillTypeResponseType) => {
    setSkills((prev) => [...prev, data]);
  };

  const handleClickDeleteSkillButton = (deleteName: string) => {
    const updatedSkills = skills.filter(
      (skill) => skill.stackName !== deleteName,
    );
    setSkills(updatedSkills);
  };

  const handleClickAddCareerButton = (data: IndividualCareerResponseType) => {
    setCareers((prev) => [...prev, data]);
  };

  const handleClickDeleteExperienceButton = (experience: string) => {
    const updatedExperiences = careers.filter(
      (career) => career.content !== experience,
    );
    setCareers(updatedExperiences);
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
              {...register('selfIntroduction')}
            />
            <div
              className={classNames(
                editMode ? styles.colContainer : styles.rowContainer,
              )}>
              {editMode && (
                <SpecializationPart
                  userType={userType}
                  onDelete={handleClickDeleteSelectedSpecialization}
                  onChange={handleChangeSpecialziations}
                  selectedSpecialization={selectedSpecialization}
                />
              )}
              <IndividualInfoPart
                editMode={editMode}
                contacts={contacts}
                onDelete={handleClickDeleteInfoButton}
                onClickAdd={handleClickAddInfoButton}
              />

              <SkillPart
                onDelete={handleClickDeleteSkillButton}
                editMode={editMode}
                setValue={setValue}
                skills={skills}
                onClickAdd={handleClickAddSkillButton}
                {...register('stackOpen')}
              />
            </div>
            <ExperiencePart
              editMode={editMode}
              setValue={setValue}
              careers={careers}
              onClickAdd={handleClickAddCareerButton}
              onDelete={handleClickDeleteExperienceButton}
              {...register('careerOpen')}
            />
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
              {...register('selfIntroduction')}
            />
            <IndividualInfoPart
              editMode={editMode}
              onClickAdd={handleClickAddInfoButton}
              onDelete={handleClickDeleteInfoButton}
              contacts={contacts}
            />
            {editMode && (
              <SpecializationPart
                userType={userType}
                onDelete={handleClickDeleteSelectedSpecialization}
                onChange={handleChangeSpecialziations}
                selectedSpecialization={selectedSpecialization}
              />
            )}
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
