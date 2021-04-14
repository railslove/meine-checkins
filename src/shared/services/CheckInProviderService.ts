import {ProviderCheckInItem} from 'src/shared/models/Provider';
import PROVIDERS_LIST from 'src/shared/services/providersList';

class CheckInProviderService {
  mapProviderValues = (props: ProviderCheckInItem): ProviderCheckInItem => {
    const {url} = props;
    const hostname = (/^https?\:\/\/([^\s\/]+)/.exec(url) || []).pop();
    const provider = PROVIDERS_LIST.find(el => el.hostname === hostname);

    if (provider) {
      return {
        ...props,
        ...provider,
      };
    }

    return {
      name: hostname,
      ...props,
    };
  };
}

export default new CheckInProviderService();
