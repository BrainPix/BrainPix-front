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

export interface ResponseType {
  success: boolean;
  code: string;
  message: string;
  data: object;
}
