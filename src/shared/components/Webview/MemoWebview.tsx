import React, {createRef} from 'react';
import {ProgressBar} from 'react-native-paper';
import WebView, {WebViewProps} from 'react-native-webview';

export const webviewRef = createRef<WebView>();
const renderLoading = () => <ProgressBar indeterminate />;

export type MemoWebViewProps = Omit<WebViewProps, 'ref' | 'source'> & {
  url: string;
};

/**
 * webview that only re-renders when the url changes
 */
const MemoWebView: React.FC<MemoWebViewProps> = ({url, ...restProps}) => {
  return (
    <WebView renderLoading={renderLoading} {...restProps} ref={webviewRef} source={{uri: url}} />
  );
};

export default React.memo(MemoWebView);
