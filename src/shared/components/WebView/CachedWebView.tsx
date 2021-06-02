import React from 'react';
import {ProgressBar} from 'react-native-paper';
import WebView, {WebViewProps} from 'react-native-webview';

const renderLoading = () => <ProgressBar indeterminate />;

export type CachedWebViewProps = Omit<WebViewProps, 'ref' | 'source'> & {
  /**
   * makes the webview re-render for different check-ins on the same provider
   */
  id: string;
  url: string;
  children?: React.ReactNode;
};

/**
 * CachedWebView
 *
 * We need to maintain the website state while we use navigation on the app.
 * The id should be unique per check-in not per provider.
 * The component is cached and cleared when check-out is done or a check-in is discarded.
 */
const CachedWebView = React.forwardRef<WebView, CachedWebViewProps>(function CachedWebViewWithRef(
  props,
  ref
) {
  const {id: _cachedID, url, injectedJavaScript, ...restProps} = props;

  return (
    <WebView
      ref={ref}
      incognito={true}
      renderLoading={renderLoading}
      injectedJavaScript={injectedJavaScript}
      startInLoadingState={true}
      {...restProps}
      source={{uri: url}}
    />
  );
});

export default React.memo(CachedWebView);
