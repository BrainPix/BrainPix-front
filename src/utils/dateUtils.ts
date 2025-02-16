export const calculateDday = (deadline: string): number => {
  const deadlineDate = new Date(deadline);
  const currentDate = new Date();

  // 밀리초 단위 차이를 일(day)로 변환
  const diffTime = deadlineDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 0; // 마감일이 지났다면 0으로 처리
};
