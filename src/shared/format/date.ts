import {format} from 'date-fns-tz';
import {de} from 'date-fns/locale';

const options = {locale: de, timeZone: 'Europe/Berlin'};

export const formatItemDate = (value: number) => {
  return format(value, "dd.MM.yyyy H:mm 'Uhr'", options);
};
