export interface PersonalSignUpPayload {
  id: string;
  password: string;
  name: string;
  birthday: string;
  email: string;
  userNickName: string;
}

export interface CompanySignUpPayload extends PersonalSignUpPayload {
  companyName: string;
  position: string;
}
