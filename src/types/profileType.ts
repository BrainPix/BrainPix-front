interface CommonProfileType {
  specializations: string[];
  selfIntroduction: string;
}

export interface IndividualProfileResponseType extends CommonProfileType {
  userId: number;
  profileImage: string;
  userType: string;
  nickname: string;
  contacts: {
    type: string;
    value: string;
    isPubilc: boolean;
  }[];
  stacks: {
    stackName: string;
    proficiency: string;
    stackOpen: boolean;
  }[];
  careers: {
    content: string;
    startDate: string;
    endDate: string;
    careerOpen: boolean;
  }[];
}

export interface putIndividualProfilePayloadType extends CommonProfileType {
  profileImage: string;
  contacts: ContactType[];
  stacks: IndividualSkillTypePayloadType[];
  stackOpen: boolean;
  careers: IndividualCareerResponseType[];
  careerOpen: boolean;
}

export interface CompanyProfileResponseType extends CommonProfileType {
  userId: number;
  imageUrl: string;
  userType: string;
  nickname: string;
  businessInformation: string;
  companyInformations: ContactType[];
}

export interface putComanyProfilePayloadType extends CommonProfileType {
  profileImage: string;
  businessInformation: string;
  companyInformations: ContactType[];
}

export interface ContactType {
  type: string;
  value: string;
  isPublic: boolean;
}

export interface IndividualSkillTypeResponseType {
  stackName: string;
  proficiency: string;
}

export interface IndividualSkillTypePayloadType {
  name: string;
  proficiency: string;
}

export interface IndividualCareerResponseType {
  content: string;
  startDate: string;
  endDate: string;
}
