import {format} from 'date-fns-tz';
import {de} from 'date-fns/locale';

const options = {locale: de, timeZone: 'Europe/Berlin'};

export const formatItemDate = (startTime: number, stopTime?: number) => {
  const date = format(startTime, 'dd.MM.yyyy', options);
  const stop = stopTime == null ? null : format(stopTime, 'HH:mm', options);
  const start = format(startTime, 'HH:mm', options);

  return `${date} ${start}-${stop || 'aktiv'} ${stop ? 'Uhr' : ''}`;
};
