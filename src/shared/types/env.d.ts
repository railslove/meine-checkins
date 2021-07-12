declare module 'react-native-config' {
  type EnvValues = {
    ENV: 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION';
    SENTRY_URL: '';
    SENTRY_DSN: '';
    SENTRY_AUTH_TOKEN: '';
  };

  const Config: EnvValues;

  export default Config;
}
