import {URL} from 'react-native-url-polyfill';
import {WebViewSource} from 'react-native-webview/lib/WebViewTypes';
import {WEBVIEW_DEFAULT_HEADERS, WEBVIEW_DEFAULT_QUERY_PARAMS} from 'src/config';

export const formatWebViewSource = (url: string): WebViewSource => {
  const uri = new URL(url);

  WEBVIEW_DEFAULT_QUERY_PARAMS.forEach(el => {
    uri.searchParams.append(el.name, el.value);
  });

  return {
    uri: uri.toString(),
    headers: {
      ...WEBVIEW_DEFAULT_HEADERS,
    },
  };
};
