export interface userProfileData {
  id: number;
  name: string;
  phoneNumber: string;
  notion: string;
  github: string;
  skills: {
    name: string;
    content: string;
    level: '상' | '중' | '하';
  }[];
  careers: {
    name: string;
    start: string;
    end: string;
  }[];
}
