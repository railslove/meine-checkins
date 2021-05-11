import {format} from 'date-fns-tz';
import {de} from 'date-fns/locale';

const options = {locale: de, timeZone: 'Europe/Berlin'};

/**
 * @param a start time
 * @param b end time
 */
export const formatItemDate = (a: number, b?: number) => {
  const stop = b == null ? null : format(b, 'H:mm', options);
  const start = format(a, 'dd.MM.yyyy H:mm', options);

  return stop == null ? `${start} - aktiv` : `${start}-${stop} Uhr`;
};
