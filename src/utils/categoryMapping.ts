import { CATEGORY_LABELS, TASK_TYPE_LABELS } from '../constants/categoryMapper';

export const getCategoryLabel = (categoryKey: string): string => {
  return CATEGORY_LABELS[categoryKey] ?? '기타';
};

export const getTaskTypeLabel = (taskTypeKey: string): string => {
  return TASK_TYPE_LABELS[taskTypeKey] ?? '기타';
};
