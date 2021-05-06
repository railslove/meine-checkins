export const normalizeDateNum = (value: number) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const formatItemDate = (value: number) => {
  const date = new Date(value);

  const [day, month, year, hours, minutes] = [
    date.getDay(),
    date.getMonth() + 1 /* January is 0 */,
    date.getFullYear(),
    date.getHours(),
    date.getMinutes(),
  ].map(normalizeDateNum);

  return `${day}.${month}.${year} - ${hours}:${minutes} Uhr`;
};
