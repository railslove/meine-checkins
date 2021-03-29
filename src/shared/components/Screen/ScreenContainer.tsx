import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 1,
    display: 'flex',
  },
  main: {
    flex: 1,
    padding: 30,

    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

const ScreenContainer: React.FC = ({children}) => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.main}>{children}</View>
    </SafeAreaView>
  );
};

export default ScreenContainer;
