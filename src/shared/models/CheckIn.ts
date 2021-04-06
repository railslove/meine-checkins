type CheckIn =
  | {
      url: string;
      stopTime: number;
      startTime?: never;
    }
  | {
      url: string;
      stopTime?: never;
      startTime: number;
    };

export default CheckIn;
