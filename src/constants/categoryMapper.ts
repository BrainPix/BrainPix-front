//카테고리 라벨, 작성자 분야도 사용 가능
export const CATEGORY_LABELS: Record<string, string> = {
  ADVERTISING_PROMOTION: '광고 · 홍보',
  DESIGN: '디자인',
  LESSON: '레슨',
  MARKETING: '마케팅',
  DOCUMENT_WRITING: '문서 · 글쓰기',
  MEDIA_CONTENT: '미디어 · 콘텐츠',
  TRANSLATION_INTERPRETATION: '번역 및 통역',
  TAX_LAW_LABOR: '세무 · 법무 · 노무',
  CUSTOM_PRODUCTION: '주문제작',
  STARTUP_BUSINESS: '창업 · 사업',
  FOOD_BEVERAGE: '푸드 및 음료',
  IT_TECH: 'IT · 테크',
  OTHERS: '기타',
};

export const CATEGORY_MAPPER_TO_ENG: Record<string, string> = {
  '광고 · 홍보': 'ADVERTISING_PROMOTION',
  디자인: 'DESIGN',
  레슨: 'LESSON',
  마케팅: 'MARKETING',
  '문서 · 글쓰기': 'DOCUMENT_WRITING',
  '미디어 · 콘텐츠': 'MEDIA_CONTENT',
  '번역 및 통역': 'TRANSLATION_INTERPRETATION',
  '세무 · 법무 · 노무': 'TAX_LAW_LABOR',
  주문제작: 'CUSTOM_PRODUCTION',
  '창업 · 사업': 'STARTUP_BUSINESS',
  '푸드 및 음료': 'FOOD_BEVERAGE',
  'IT · 테크': 'IT_TECH',
  기타: 'OTHERS',
};

//아이디어 유형 라벨
export const TASK_TYPE_LABELS: Record<string, string> = {
  IDEA_SOLUTION: '아이디어 솔루션',
  MARKET_PLACE: '마켓 플레이스',
};

// 보수 지급 형태 라벨
export const PAYMENT_DURATION_LABELS: Record<string, string> = {
  ONCE: '건당',
  DAILY: '일간',
  WEEKLY: '주간',
  MONTHLY: '월간',
  NOT_APPLICABLE: '추후 협의',
};

export const INFO_TYPE_MAPPER: Record<string, string> = {
  PHONE: '연락처',
  EMAIL: '이메일',
  NOTION: '노션',
  GITHUB: '깃허브',
  OTHERS: '기타',
  HOMEPAGE: '홈페이지',
};

export const INFO_TYPE_MAPPER_TO_ENG: Record<string, string> = {
  연락처: 'PHONE',
  이메일: 'EMAIL',
  노션: 'NOTION',
  깃허브: 'GITHUB',
  기타: 'OTHERS',
  홈페이지: 'HOMEPAGE',
};

export const SKILL_PROFICIENCY_MAPPER: Record<string, string> = {
  HIGH: '상',
  MEDIUM: '중',
  LOW: '하',
};

export const SKILL_PROFICIENCY_MAPPER_TO_ENG: Record<string, string> = {
  상: 'HIGH',
  중: 'MEDIUM',
  하: 'LOW',
};

export const LABEL_TYPE_MAPPER: Record<string, string> = {
  INDIVIDUAL: '개인',
  COMPANY: '기업',
};
