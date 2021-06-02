import React, {createRef} from 'react';
import {ProgressBar} from 'react-native-paper';
import WebView, {WebViewProps} from 'react-native-webview';

import {formatWebViewSource} from 'src/shared/format/webView';

const renderLoading = () => <ProgressBar indeterminate />;

export const webviewRef = createRef<WebView>();

export type CachedWebViewProps = Omit<WebViewProps, 'ref' | 'source'> & {
  /**
   * makes the webview re-render for different check-ins on the same provider
   */
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
const CachedWebView: React.FC<CachedWebViewProps> = ({
  id: _cachedID,
  url,
  injectedJavaScript,
  ...restProps
}) => {
  return (
    <WebView
      ref={webviewRef}
      incognito={true}
      renderLoading={renderLoading}
      injectedJavaScript={injectedJavaScript}
      startInLoadingState={true}
      {...restProps}
      source={formatWebViewSource(url)}
    />
  );
};

export default React.memo(CachedWebView);
