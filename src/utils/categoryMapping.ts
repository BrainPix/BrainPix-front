import {
  CATEGORY_LABELS,
  TASK_TYPE_LABELS,
  PAYMENT_DURATION_LABELS,
  LABEL_TYPE_MAPPER,
} from '../constants/categoryMapper';

export const getCategoryLabel = (categoryKey: string): string => {
  return CATEGORY_LABELS[categoryKey] ?? '기타';
};

export const getTaskTypeLabel = (taskTypeKey: string): string => {
  return TASK_TYPE_LABELS[taskTypeKey] ?? '기타';
};

export const getPaymentDurationLabel = (paymentKey: string): string => {
  return PAYMENT_DURATION_LABELS[paymentKey] || '추후 협의';
};

export const getLabelType = (labelType: string): string => {
  return LABEL_TYPE_MAPPER[labelType] ?? '개인';
};
