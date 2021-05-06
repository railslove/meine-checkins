import {ProviderCheckInItem} from 'src/shared/models/Provider';
import CHECK_IN_PROVIDER_LIST from 'src/shared/services/checkInProvidersList';

class CheckInProviderService {
  mapProviderValues = (props: ProviderCheckInItem): ProviderCheckInItem => {
    const {url} = props;
    const hostname = (/^https?\:\/\/([^\s\.]+\.)?([^\s\/]+)\.[^\s\.]/.exec(url) || []).pop();
    const provider = CHECK_IN_PROVIDER_LIST.find(el => el.hostname === hostname);

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
