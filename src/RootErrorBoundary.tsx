import React, {Component} from 'react';
import {Alert, Clipboard, Linking, NativeModules, StatusBar, View} from 'react-native';

import BaseText from './shared/components/Typography/BaseText';
import createStyles from './shared/styles/createStyles';

/**
 * Example UI to show in the case of a JavaScript error.
 * TODO: also handle native exceptions.
 */
export default class RootErrorBoundary extends Component {
  private static NO_STACK = 'No stack trace.';
  private static ISSUE_REPORTING_URL = 'https://reactnative.dev';

  state: {hasError: boolean; error: Error | null} = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error) {
    return {hasError: true, error};
  }

  showError = () => {
    Alert.alert(
      this.state.error?.name || 'Error',
      this.state.error?.stack || RootErrorBoundary.NO_STACK,
      [
        {
          text: 'Cancel',
          onPress: () => {
            return;
          },
        },
        {
          text: 'Copy & Open Issue Form',
          onPress: () => {
            const stackTrace = this.state.error?.stack || RootErrorBoundary.NO_STACK;

            Clipboard.setString(stackTrace);

            Linking.openURL(RootErrorBoundary.ISSUE_REPORTING_URL);
          },
        },
      ],
      {
        cancelable: false,
      }
    );
  };

  /**
   * TODO: Restart app instead of reload.
   */
  reloadApp = () => {
    NativeModules.DevSettings.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <View style={styles.subContainer}>
            <BaseText style={styles.bigBoldText}>App couldn{"'"}t keep going...</BaseText>
            <BaseText style={[styles.text, styles.bold]} onPress={this.showError}>
              SHOW ERROR
            </BaseText>
            {__DEV__ && (
              <BaseText
                style={[styles.text, styles.bold, {marginTop: 50}]}
                onPress={this.reloadApp}
              >
                RESTART APP
              </BaseText>
            )}
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = createStyles({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  subContainer: {
    flex: 1,
    marginTop: '50%',
    marginHorizontal: 30,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 18,
  },
  bigBoldText: {
    fontSize: 18,
    letterSpacing: 0.8,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  text: {
    marginTop: 30,
    marginHorizontal: 24,
    lineHeight: 18,
    fontSize: 16,
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});
