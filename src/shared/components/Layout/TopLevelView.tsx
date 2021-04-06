import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {toDpFromPixel} from 'src/shared/theme/util';

const useStyles = ({backgroundColor = 'white'}: ViewStyle = {}) =>
  StyleSheet.create({
    root: {
      backgroundColor,
      flex: 1,
      width: '100%',
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },
    main: {
      backgroundColor,
      flex: 1,
      display: 'flex',
      padding: 0,
    },
    scrollView: {
      backgroundColor,
      flex: 1,
      padding: 0,
      paddingHorizontal: toDpFromPixel(22),
    },
  });

export type TopLevelViewProps = {
  backgroundColor?: string;
};

const TopLevelView: React.FC<TopLevelViewProps> = ({children, backgroundColor}) => {
  const styles = useStyles({backgroundColor});

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.main}>
        <ScrollView contentInsetAdjustmentBehavior="always" style={styles.scrollView}>
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TopLevelView;
