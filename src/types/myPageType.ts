import {
  IndividualCareerResponseType,
  ContactType,
  IndividualSkillTypePayloadType,
  IndividualSkillTypeResponseType,
} from './profileType';

export interface MyBaseInfoType {
  nickname: string;
  userId: number;
  userType: string;
  specializations: string[];
  ideaCount: number;
  collaborationCount: number;
  selfIntroduction: string;
  profileImage: string;
}

export interface IndividualInfoType {
  profileImage: string;
  selfIntroduction: string;
  contacts: ContactType[];
  stackOpen: boolean;
  careers: IndividualCareerResponseType[];
  careerOpen: boolean;
  specializations: string[];
}

export interface IndividualInfoResponseType extends IndividualInfoType {
  stacks: IndividualSkillTypeResponseType[];
}

export interface IndividualInfoPayloadType extends IndividualInfoType {
  stacks: IndividualSkillTypePayloadType[];
}

export interface MyPorfolioType {
  id: number;
  title: string;
  createdDate: string;
  profileImage: string;
}

export interface PostPortfolioPayload {
  title: string;
  specializations: string[];
  startDate: string;
  endDate: string;
  content: string;
  profileImage: string;
}

export interface PortfolioDetailResponseType {
  id: number;
  title: string;
  specializations: string[];
  startDate: string;
  endDate: string;
  content: string;
  profileImage: string;
}

export interface EditProfilePayload {
  title: string;
  specializations: string[];
  startDate: string;
  endDate: string;
  content: string;
  profileImage: string;
}

export interface putCompanyInfoPayload {
  profileImage: string;
  selfIntroduction: string;
  businessInformation: string;
  companyInformations: ContactType[];
  specializations: string[];
}
