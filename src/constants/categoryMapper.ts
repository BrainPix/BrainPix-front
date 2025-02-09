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

export const getCategoryLabel = (categoryKey: string): string => {
  return CATEGORY_LABELS[categoryKey] || '기타';
};

export const getTaskTypeLabel = (taskTypeKey: string): string => {
  return TASK_TYPE_LABELS[taskTypeKey] || '기타';
};

export const getPaymentDurationLabel = (paymentKey: string): string => {
  return PAYMENT_DURATION_LABELS[paymentKey] || '추후 협의';
};
