import React from 'react';
import {ProgressBar} from 'react-native-paper';
import WebView, {WebViewProps} from 'react-native-webview';

import {formatWebViewSource} from 'src/shared/format/webView';

const renderLoading = () => <ProgressBar indeterminate />;

export type CachedWebViewProps = Omit<WebViewProps, 'ref' | 'source'> & {
  /**
   * makes the webview re-render for different check-ins on the same provider
   */
  id: string;
  url: string;
  ref?: React.MutableRefObject<WebView>;
  children?: React.ReactNode;
};

/**
 * CachedWebview
 *
 * We need to maintain the website state while we use navigation on the app.
 * We use the id here to make the WebView unique per check-in not per provider.
 */
const CachedWebview = React.forwardRef<WebView, CachedWebViewProps>(function CachedWebViewWithRef(
  props,
  ref
) {
  const {url, injectedJavaScript, ...restProps} = props;

  return (
    <WebView
      ref={ref}
      incognito={true}
      renderLoading={renderLoading}
      injectedJavaScript={injectedJavaScript}
      startInLoadingState={true}
      {...restProps}
      source={formatWebViewSource(url)}
    />
  );
});

export default React.memo(CachedWebview);
