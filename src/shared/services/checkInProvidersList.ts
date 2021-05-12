import {ImageSourcePropType} from 'react-native';

type CheckInProvider = {
  name: string;
  logoUrl: ImageSourcePropType;
  hostname: RegExp;
};

const CHECK_IN_PROVIDER_LIST = Object.freeze<CheckInProvider>([
  {
    name: 'recoverapp.de',
    logoUrl: require('./img/recover-logo.png'),
    hostname: /(rcvr|recover)\.app$/,
  },
  {
    name: 'checkincode.de',
    logoUrl: require('./img/checkincode-logo.png'),
    hostname: /checkincode\.de$/,
  },
  {
    name: 'BEVENTIO',
    logoUrl: require('./img/BEVENTIO-logo.png'),
    hostname: /bevent\.io$/,
  },
  {
    name: 'PERK ViSITS',
    logoUrl: require('./img/perk-visits-logo.png'),
    hostname: /perkiot\.com$/,
  },
  {
    name: 'Gastindent',
    logoUrl: require('./img/gastident-logo.png'),
    hostname: /gastident\.de$/,
  },
  {
    name: 'PANDA·SAFE',
    logoUrl: require('./img/pandasafe-logo.png'),
    hostname: /pandasafe\.app$/,
  },
]);

export default CHECK_IN_PROVIDER_LIST;
