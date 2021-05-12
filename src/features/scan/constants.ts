export enum PROVIDER_SITE_MESSAGE {
  start = 'start',
  check = 'check',
  setLogo = 'SetLogo',
  setLocation = 'SetLocation',
  checkInSuccess = 'CheckInSuccess',
  checkInFailure = 'CheckInFailure',
  checkOutSuccess = 'CheckOutSuccess',
  checkOutFailure = 'CheckOutFailure',
  parseMessageError = 'parseMessageError',
}

export type MessageKey = keyof typeof PROVIDER_SITE_MESSAGE;
