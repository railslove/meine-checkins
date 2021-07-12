jest.mock('@sentry/react-native', () => {
  return {
    Severity: {},
    init: () => undefined,
    configureScope: () => undefined,
    captureMessage: () => undefined,
  };
});
