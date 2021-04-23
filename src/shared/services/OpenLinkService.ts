import {Linking} from 'react-native';

export const WFD_EMAIL = 'wirfuerdigitalisierung@railslove.com';
export const WFD_INDEX = 'https://www.wirfuerdigitalisierung.de';
export const IMPRINT_URL = 'https://www.wirfuerdigitalisierung.de/impressum';

class OpenLinkService {
  openImprint = () => {
    return Linking.openURL(IMPRINT_URL);
  };

  openWFDIndex = () => {
    return Linking.openURL(WFD_INDEX);
  };

  openWFDEmail = () => {
    return Linking.openURL(`mailto:${WFD_EMAIL}`);
  };
}

export default new OpenLinkService();
