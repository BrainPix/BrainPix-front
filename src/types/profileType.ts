export interface IndividualProfileType {
  userType: string;
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
