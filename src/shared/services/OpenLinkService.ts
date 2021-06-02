import {Linking} from 'react-native';

export const WFD_EMAIL = 'wirfuerdigitalisierung@railslove.com';

export const EXTERNAL_LINK = {
  imprint: 'https://www.wirfuerdigitalisierung.de/impressum-meine-checkins-app',
  datenschutz: 'https://www.wirfuerdigitalisierung.de/datenschutz-meine-checkins-app',
  feedback: 'https://hackersthinkers.typeform.com/to/ytKxiAPY',
  becomeProvider: 'https://hackersthinkers.typeform.com/to/sPTPAMqM',
};

export const EXTERNAL_LINKS = Object.keys(EXTERNAL_LINK) as Array<keyof typeof EXTERNAL_LINK>;

export const WFD_INDEX_URL = 'https://www.wirfuerdigitalisierung.de';

class OpenLinkService {
  openWFDIndex = () => {
    return Linking.openURL(WFD_INDEX_URL);
  };

  openWFDEmail = () => {
    return Linking.openURL(`mailto:${WFD_EMAIL}`);
  };

  openExternalURL = (name: keyof typeof EXTERNAL_LINK) => Linking.openURL(EXTERNAL_LINK[name]);
}

export default new OpenLinkService();
