import {ImageSourcePropType} from 'react-native';

type CheckInProvider = {
  name: string;
  logoUrl?: string | ImageSourcePropType;
  hostname: string;
};

const CHECK_IN_PROVIDER_LIST = Object.freeze<CheckInProvider>([
  {
    name: 'recover',
    logoUrl: require('./img/recover-logo.png'),
    hostname: 'rcvr.app',
  },
]);

export default CHECK_IN_PROVIDER_LIST;
