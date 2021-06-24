import {format} from 'date-fns-tz';
import {de} from 'date-fns/locale';
import {PartialCheckInItem} from '../models/Provider';

const options = {locale: de, timeZone: 'Europe/Berlin'};

export const formatItemDate = ({scanTime, startTime, stopTime}: PartialCheckInItem) => {
  const begin = startTime || scanTime;
  const date = format(begin, 'dd.MM.yyyy', options);
  const stop = stopTime == null ? null : format(stopTime, 'HH:mm', options);
  const start = format(begin, 'HH:mm', options);

  return `${date} ${start}${stop ? `-${stop}` : ''}`;
};
