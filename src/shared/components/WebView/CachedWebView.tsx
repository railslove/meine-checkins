import React, {createRef} from 'react';
import {ProgressBar} from 'react-native-paper';
import WebView, {WebViewProps} from 'react-native-webview';

const renderLoading = () => <ProgressBar indeterminate />;

export const webviewRef = createRef<WebView>();
const webViewCache: Record<string, null | React.ReactElement<WebViewProps, typeof WebView>> = {};

export const clearCachedWebView = (id: string) => {
  webViewCache[id] = null;
};

export type CachedWebViewProps = Omit<WebViewProps, 'ref' | 'source'> & {
  id: string;
  url: string;
};

/**
 * CachedWebView
 *
 * We need to maintain the website state while we use navigation on the app.
 * The id should be unique per check-in not per provider.
 * The component is cached and cleared when check-out is done or a check-in is discarded.
 */
const CachedWebView: React.FC<CachedWebViewProps> = ({id, url, ...restProps}) => {
  const cached =
    webViewCache[id] ||
    (webViewCache[id] = (
      <WebView renderLoading={renderLoading} {...restProps} ref={webviewRef} source={{uri: url}} />
    ));

  return cached;
};

export default React.memo(CachedWebView);
