import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import BuildConfig from 'react-native-config';
import {enableScreens} from 'react-native-screens';
import {I18nextProvider} from 'react-i18next';
import {Platform, UIManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';

import i18n from 'src/shared/i18n';
import store from 'src/shared/redux/store';
import theme from 'src/shared/theme/theme';
import RootErrorBoundary from 'src/RootErrorBoundary';
import MainStackNavigator from 'src/features/navigation/RootStackNavigator';

import {rootNavigationRef} from 'src/features/navigation/services/NavigationService';
import {initializeAppThunk} from 'src/shared/redux/effects/appThunks';

(function setup() {
  if (process.env.NODE_ENV !== 'test') {
    console.log('BuildConfig', BuildConfig);
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
  useEffect(() => {
    store.dispatch(initializeAppThunk());
  }, []);

  return (
    <RootErrorBoundary>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <I18nextProvider i18n={i18n}>
            <NavigationContainer ref={rootNavigationRef}>
              <MainStackNavigator />
            </NavigationContainer>
          </I18nextProvider>
        </PaperProvider>
      </Provider>
    </RootErrorBoundary>
  );
};

export default App;
