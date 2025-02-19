import { ChangeEvent, useContext, useEffect, useState } from 'react';
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
import {
  getProfileCompany,
  getProfilePersonal,
} from '../../../apis/profileAPI';
import {
  IndividualCareerResponseType,
  ContactType,
  IndividualSkillTypeResponseType,
  putIndividualProfilePayloadType,
} from '../../../types/profileType';
import {
  CATEGORY_LABELS,
  CATEGORY_MAPPER_TO_ENG,
} from '../../../constants/categoryMapper';
import {
  IndividualInfoPayloadType,
  putCompanyInfoPayload,
} from '../../../types/myPageType';
import { putCompanyInfo, putIndividualInfo } from '../../../apis/mypageAPI';
import { ToastContext } from '../../../contexts/toastContext';

export const Info = () => {
  const queryClient = useQueryClient();

  const [editMode, setEditMode] = useState(false);
  const [contacts, setContacts] = useState<ContactType[]>([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    string[]
  >(['']);
  const [skills, setSkills] = useState<IndividualSkillTypeResponseType[]>([]);
  const [careers, setCareers] = useState<IndividualCareerResponseType[]>([]);
  const [businessInfo, setBusinessInfo] = useState<string>('');
  const [selectedProfileImage, setSelectedProfileImage] = useState('');
  const [userType, setUserType] = useState<string | null>(null);

  const { errorToast, successToast } = useContext(ToastContext);

  useEffect(() => {
    const storedType = localStorage.getItem('myType');
    if (storedType) {
      setUserType(storedType === 'personal' ? '개인' : '기업');
    }
  }, []);

  const defaultInputValues = {
    profileImage: '',
    selfIntroduction: '',
    stackOpen: false,
    careerOpen: false,
    businessInfo: '',
  };

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: defaultInputValues,
  });

  const { data: personalData, isLoading: isPersonalDataPending } = useQuery({
    queryKey: ['personalUserData'],
    queryFn: getProfilePersonal,
    enabled: userType === '개인',
  });

  const { data: companyData, isLoading: isCompanyDataPending } = useQuery({
    queryKey: ['companyUserData'],
    queryFn: getProfileCompany,
    enabled: userType === '기업',
  });

  const { mutate: editPersonalInfoMutate } = useMutation({
    mutationFn: (payload: putIndividualProfilePayloadType) =>
      putIndividualInfo(personalData.userId, payload),
    onSuccess: () => {
      successToast('수정되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['personalUserData'],
      });
    },
    onError: () => {
      errorToast('수정에 실패하였습니다. 다시 시도해주세요.');
    },
  });

  const { mutate: editCompanyInfoMutate } = useMutation({
    mutationFn: (payload: putCompanyInfoPayload) =>
      putCompanyInfo(companyData.userId, payload),
    onSuccess: () => {
      successToast('수정되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['companyUserData'],
      });
    },
    onError: () => {
      errorToast('수정에 실패하였습니다. 다시 시도해주세요.');
    },
  });

  useEffect(() => {
    if (personalData?.contacts !== undefined) {
      setValue('selfIntroduction', personalData.selfIntroduction);
      const updatedSpecializations = personalData.specializations.map(
        (value: string) => {
          return CATEGORY_LABELS[value];
        },
      );
      setSelectedSpecialization(updatedSpecializations);
      setContacts(personalData.contacts ?? []);
      setSkills(personalData.stacks ?? []);
      setCareers(personalData.careers ?? []);
      setSelectedProfileImage(personalData.profileImage);
    }

    if (companyData?.businessInformation !== undefined) {
      setValue('selfIntroduction', companyData.selfIntroduction);
      const updatedSpecializations = companyData.specializations?.map(
        (value: string) => {
          return CATEGORY_LABELS[value];
        },
      );
      setSelectedSpecialization(updatedSpecializations);
      setContacts(companyData.companyInformations ?? []);
      setSelectedProfileImage(companyData.imageUrl);
      setBusinessInfo(companyData.businessInformation);
    }
  }, [personalData, companyData, setValue]);

  if (!userType) {
    return <div>로딩 중...</div>;
  }

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
    const haveOption = selectedSpecialization?.includes(option) ?? false;

    if (!haveOption) {
      setSelectedSpecialization((prev) => [
        ...(prev.length >= 2 ? prev.slice(1) : prev),
        option,
      ]);
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
    if (userType === '개인') {
      const requestBody: IndividualInfoPayloadType = {
        profileImage: selectedProfileImage,
        contacts,
        stacks: skills.map(({ stackName, proficiency }) => ({
          name: stackName,
          proficiency: proficiency,
        })),
        stackOpen: payload.stackOpen,
        careers: careers.map(({ content, startDate, endDate }) => ({
          content,
          startDate,
          endDate,
        })),
        selfIntroduction: payload.selfIntroduction,
        specializations: selectedSpecialization.map(
          (speicialization) => CATEGORY_MAPPER_TO_ENG[speicialization],
        ),
        careerOpen: payload.careerOpen,
      };
      editPersonalInfoMutate(requestBody);
    }

    if (userType === '기업') {
      const requestBody: putCompanyInfoPayload = {
        profileImage: selectedProfileImage,
        selfIntroduction: payload.selfIntroduction,
        specializations: selectedSpecialization.map(
          (speicialization) => CATEGORY_MAPPER_TO_ENG[speicialization],
        ),
        companyInformations: contacts,
        businessInformation: businessInfo,
      };
      editCompanyInfoMutate(requestBody);
    }
    setEditMode(false);
  };

  const handleClickAddInfoButton = (data: ContactType) => {
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

  const handleChangeBusinessInfoInput = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setBusinessInfo(e.target.value);
  };

  const handleChangeProfileImageInput = (imgURL: string) => {
    setSelectedProfileImage(imgURL || '');
  };

  return (
    <div className={classNames(styles.container)}>
      <form onSubmit={handleSubmit(handleSubmitHandler)}>
        <MyProfileCard
          userData={personalData ?? companyData}
          status={editMode ? 'save' : 'edit'}
          onClickButton={
            editMode ? handleClickSaveButton : handleClickEditButton
          }
          onChangeProfileImage={handleChangeProfileImageInput}
          selectedImage={selectedProfileImage}
        />
        {userType === '개인' && personalData && (
          <div className={classNames(styles.contentContainer)}>
            <IntroducePart
              editMode={editMode}
              setValue={setValue}
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
            <BusinessInfoPart
              editMode={editMode}
              businessInfoText={businessInfo}
              {...register('businessInfo')}
              setValue={setValue}
              onChange={handleChangeBusinessInfoInput}
            />
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
