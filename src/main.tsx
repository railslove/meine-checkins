import React from 'react';
import {Provider} from 'react-redux';
import BuildConfig from 'react-native-config';
import {PersistGate} from 'redux-persist/integration/react';
import {enableScreens} from 'react-native-screens';
import {I18nextProvider} from 'react-i18next';
import {Platform, UIManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';

import i18n from 'src/shared/i18n';
import theme from 'src/shared/styles/theme';
import {store, persistor} from 'src/shared/redux/store';

import RootErrorBoundary from 'src/RootErrorBoundary';
import RootStackNavigator from 'src/features/navigation/RootStackNavigator';

import {rootNavigationRef} from 'src/features/navigation/services/NavigationService';

(function setup() {
  if (process.env.NODE_ENV !== 'test') {
    console.info('BuildConfig', BuildConfig);

    // React Navigation, optimize memory usage.
    enableScreens();
  }

  // Layout animation
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
})();

const App: React.FC = () => {
  return (
    <RootErrorBoundary>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PaperProvider theme={theme}>
            <I18nextProvider i18n={i18n}>
              <NavigationContainer ref={rootNavigationRef}>
                <RootStackNavigator />
              </NavigationContainer>
            </I18nextProvider>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </RootErrorBoundary>
  );
};

export default App;
