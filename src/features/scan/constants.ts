export const PROVIDER_SITE_MESSAGE = {
  checkInSuccess: 'CheckInSuccess',
  checkInFailure: 'CheckInFailure',
  checkOutSuccess: 'CheckOutSuccess',
  checkOutFailure: 'CheckOutFailure',
};

export const TEST_PROVIDER = {
  id: Math.random().toString(32).slice(2),
  // url: 'https://check-in-provider.vercel.app',
  url:
    'https://rcvr.app/checkin?a=8c2bb0ea-5a6c-4219-8a6d-428f245d7aa7&k=LeDTVuNGteBiKoGmZH9jN%2FmQNuphhcg%2FksroGKnAGmw%3D',
};

export enum ScanRoutes {
  key = 'ScanRoutesKey',
  MyCheckIns = 'MyCheckIns',
  ScanQRCode = 'ScanQRCode',
  ProviderForm = 'ProviderForm',
}
