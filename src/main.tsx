/**
 * Generated from
 * https://github.com/osamaq/react-native-template-osamaq
 *
 */
import React from 'react';
import {Provider} from 'react-redux';
import BuildConfig from 'react-native-config';
import {enableScreens} from 'react-native-screens';
import {Platform, UIManager} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';

import store from 'src/shared/redux/store';
import theme from 'src/shared/theme/theme';
import RootErrorBoundary from 'src/RootErrorBoundary';
import MainStackNavigator from 'src/features/navigation/MainStackNavigator';

(function setup() {
  // Log environement variables
  console.log(BuildConfig);

  // React Navigation, optimize memory usage.
  enableScreens();

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
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <MainStackNavigator />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </RootErrorBoundary>
  );
};

export default App;
