export default {
  title: 'QR-Code scannen',
  description: 'Indem du den QR-Code scannst, leiten wir dich zur Seite des Anbieters weiter. ',
  submitScanQRCode: 'check-in',

  gotoAppSettings: 'ändern',
  cameraNotAuthorized: 'Kamera nicht autorisiert',

  checkInProgressTitle: 'Du bist bereits eingecheckt',
  checkInProgressSubTitle:
    'Bitte checke dich bei deinem aktuellen Besuch aus, um einen weiteren QR-Code zu scannen.',

  checkInProgressDiscard: 'Neuer Check-in',
  checkInProgressContinue: 'zum aktuellen Check-in',

  ok: 'Ok',
  no: 'Nein',
  yes: 'Ja',
  sendEmail: 'E-Email senden',
  checkInProgressDiscardAlertMessage:
    'Willst Du dich neu einchecken ohne dich ausgecheckt zu haben?',

  checkInProviderNotSupportedYetTitle: 'Dieser Anbieter nimmt noch nicht Teil',
  checkInProviderNotSupportedYetMessage: [
    '',
    'Du kannst jedoch deine Daten manuell eingeben und dadurch die App gerne weiternutzen.',
    'Wenn Du den Betreiber darauf ansprechen möchtest, dass er Meine Checkins unterstützt verweise ihn per E-Mail.',
  ].join('\n\n'),
};
