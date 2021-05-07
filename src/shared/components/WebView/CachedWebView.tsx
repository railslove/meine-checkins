import React from 'react';
import {ProgressBar} from 'react-native-paper';
import WebView, {WebViewProps} from 'react-native-webview';

const renderLoading = () => <ProgressBar indeterminate />;

const webViewCache: Record<string, null | React.ReactElement<WebViewProps, typeof WebView>> = {};

export const clearCachedWebView = (id: string) => {
  webViewCache[id] = null;
};

export type CachedWebViewProps = Omit<WebViewProps, 'ref' | 'source'> & {
  id: string;
  url: string;
};

/**
 * webview that only re-renders when the url changes
 */
const CachedWebView: React.FC<CachedWebViewProps> = ({id, url, ...restProps}) => {
  const cached =
    webViewCache[id] ||
    (webViewCache[id] = (
      <WebView renderLoading={renderLoading} {...restProps} source={{uri: url}} />
    ));

  return cached;
};

export default React.memo(CachedWebView);
