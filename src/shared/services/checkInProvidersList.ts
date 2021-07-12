import {ImageSourcePropType} from 'react-native';

type CheckInProvider = {
  name: string;
  logoUrl?: ImageSourcePropType;
  logoLarge?: ImageSourcePropType;
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
  {
    name: 'UNDO',
    logoUrl: require('./img/undo-logo.png'),
    hostname: /undo-app.de\.de$/,
  },
  {
    name: 'Visito',
    logoUrl: require('./img/visito-logo.png'),
    hostname: /(visito\.me|vsto\.me)$/,
  },
  {
    name: 'shapefruit',
    logoUrl: require('./img/shapefruit-logo.png'),
    hostname: /shapefruit\.de$/,
  },
  {
    name: 'ZzEuS',
    logoUrl: require('./img/zzeus-logo.png'),
    logoLarge: require('./img/zzeus-logo-large.png'),
    hostname: /zzeus\.de$/,
  },
  {
    name: 'SmartMeeting',
    logoUrl: require('./img/smartmeeting-logo.png'),
    hostname: /smartmeeting\.online$/,
  },
  {
    name: 'darfichrein',
    logoUrl: require('./img/darfichrein-logo.png'),
    hostname: /darfichrein\.de$/,
  },
]);

export default CHECK_IN_PROVIDER_LIST;
