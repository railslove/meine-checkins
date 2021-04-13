import {Linking} from 'react-native';

export const WFD_EMAIL = 'wirfuerdigitalisierung@railslove.com';
export const IMPRINT_URL = 'https://www.wirfuerdigitalisierung.de/impressum';

class OpenLinkService {
  openImprint = () => {
    return Linking.openURL(IMPRINT_URL);
  };

  openWFDEmail = () => {
    return Linking.openURL(`mailto:${WFD_EMAIL}`);
  };
}

export default new OpenLinkService();
