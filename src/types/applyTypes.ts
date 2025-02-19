export interface ApplyRequestForCollaboration {
  collaborationRecruitmentId: number;
  isOpenProfile: boolean;
  message: string;
}

export interface ApplyRequestForRequest {
  requestRecruitmentId: number;
  isOpenProfile: boolean;
  message: string;
}

export interface DecodedJWTType {
  apiKey: string;
  exp: number;
  iat: number;
  identification: string;
}
