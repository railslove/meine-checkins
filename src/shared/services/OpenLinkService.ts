import {Linking} from 'react-native';

export const IMPRINT_URL = 'https://www.wirfuerdigitalisierung.de/impressum';

class OpenLinkService {
  openImprint() {
    return Linking.openURL(IMPRINT_URL);
  }
}

export default new OpenLinkService();
