type CheckIn = {
  url: string;
  stopTime?: Date;
  startTime?: Date;
};

export type CheckInBegin = Pick<CheckIn, 'url' | 'startTime'>;
export type CheckInEnded = Pick<CheckIn, 'url' | 'stopTime'>;
export type CheckInRegister = Pick<CheckIn, 'url'>;

export default CheckIn;
