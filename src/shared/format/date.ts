export const normalizeDateNum = (value: number) => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const formatItemDate = (value: number) => {
  const date = new Date(value);

  const day = date.getDay();
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // January is 0
  const mins = date.getMinutes();
  const hours = date.getHours();

  return [
    [day, month, year].map(normalizeDateNum).join('.'),
    `${[hours, mins].map(normalizeDateNum).join(':')} Uhr`,
  ].join(' - ');
};
