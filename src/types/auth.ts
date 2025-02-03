export interface LoginPayload {
  id: string;
  password: string;
}

export interface PersonalSignUpPayload {
  id: string;
  password: string;
  name: string;
  birthday: string;
  email: string;
  nickName: string;
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
