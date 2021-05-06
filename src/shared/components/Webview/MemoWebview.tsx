import React, {createRef} from 'react';
import {ProgressBar} from 'react-native-paper';
import WebView, {WebViewProps} from 'react-native-webview';

export const webviewRef = createRef<WebView>();
const renderLoading = () => <ProgressBar indeterminate />;

export type MemoWebViewProps = Omit<WebViewProps, 'ref' | 'source'> & {
  id: string;
  url: string;
};

/**
 * webview that only re-renders when the url changes
 */
const MemoWebView: React.FC<MemoWebViewProps> = ({id, url, ...restProps}) => {
  console.info('Rendering MemoWebView for', id);
  return (
    <WebView renderLoading={renderLoading} {...restProps} ref={webviewRef} source={{uri: url}} />
  );
};

export default React.memo(MemoWebView);
