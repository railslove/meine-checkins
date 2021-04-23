export enum PROVIDER_SITE_MESSAGE {
  fillFormStart = 'fillFormStart',
  checkInSuccess = 'CheckInSuccess',
  checkInFailure = 'CheckInFailure',
  checkOutSuccess = 'CheckOutSuccess',
  checkOutFailure = 'CheckOutFailure',
  setProviderLogo = 'SetProviderLogo',
  parseMessageError = 'parseMessageError',
}

export type MessageKey = keyof typeof PROVIDER_SITE_MESSAGE;
