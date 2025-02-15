export const calculateDday = (targetDateStr: string): string => {
  const targetDate: Date = new Date(targetDateStr);
  const currentDate: Date = new Date();

  const timeDiff: number = targetDate.getTime() - currentDate.getTime();

  const dayDiff: number = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (dayDiff > 0) return `D-${dayDiff}`;
  else if (dayDiff === 0) return 'D-Day';
  else return '';
};
