export interface MyBaseInfoType {
  name: 'string';
  userType: 'string';
  specializations: string[];
  ideaCount: number;
  collaborationCount: number;
  selfIntroduction: 'string';
}

export interface MyPorfolioType {
  id: 7;
  title: '기죽지마';
  createdDate: '2025-02-08';
  profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS3rypq3_ZMR1jh38cucfhVHNTa44qbZYYvQ&s';
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
