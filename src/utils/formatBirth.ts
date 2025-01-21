export const formatBirth = (birth: string) => {
  const value = birth.replace(/[^0-9]/g, '');
  if (value.length > 6) {
    return (
      value.substring(0, 4) +
      '-' +
      value.substring(4, 6) +
      '-' +
      value.substring(6)
    );
  }
  if (value.length > 4) {
    return value.substring(0, 4) + '-' + value.substring(4);
  }
  return value;
};
