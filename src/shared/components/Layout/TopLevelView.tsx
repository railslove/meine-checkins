import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    margin: 1,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  main: {
    flex: 1,
    padding: 0,
    paddingHorizontal: 22,
  },
});

const TopLevelView: React.FC = ({children}) => {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.main}>{children}</View>
    </SafeAreaView>
  );
};

export default TopLevelView;
