export interface IndividualProfileType {
  userType: string;
  profileImage: string;
  specializations: string;
  name: string;
  selfIntroduction: string;
  contacts: [
    {
      type: string;
      value: string;
    },
  ];
  stacks: [
    {
      stackName: string;
      proficiency: string;
    },
  ];
  careers: [
    {
      content: string;
      startDate: string;
      endDate: string;
    },
  ];
}

export interface CompanyProfileType {
  userId: 0;
  profileImage: string;
  userType: string;
  specializations: string;
  name: string;
  selfIntroduction: string;
  businessInformation: string;
  companyInformations: [
    {
      type: string;
      value: string;
    },
  ];
}

export interface IndividualContactType {
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
