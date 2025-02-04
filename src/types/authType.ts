export interface LoginPayload {
  id: string;
  password: string;
}

export interface CommonSignUpPayload {
  id: string;
  password: string;
  name: string;
  birthday: string;
  email: string;
}

export interface PersonalSignUpPayload extends CommonSignUpPayload {
  nickName: string;
}

export interface CompanySignUpPayload extends CommonSignUpPayload {
  companyName: string;
  position: string;
}

export interface ResponseType {
  success: boolean;
  code: string;
  message: string;
  data: object;
}
