export const formatPhone = (phone: string) => {
  const value = phone.replace(/[^0-9]/g, '');

  if (value.length <= 3) return value;
  if (value.length <= 7) return `${value.slice(0, 3)}-${value.slice(3)}`;
  if (value.length <= 11)
    return `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;

  return value;
};
