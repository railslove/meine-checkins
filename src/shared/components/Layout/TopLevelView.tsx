import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LAYOUT_PADDING_HORIZONTAL} from 'src/shared/components/Layout/constants';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
});

export type TopLevelViewProps = ViewStyle;

const TopLevelView: React.FC<TopLevelViewProps> = ({children, ...styleProps}) => {
  const {
    backgroundColor = 'white',
    paddingHorizontal = LAYOUT_PADDING_HORIZONTAL,
    ...restStyleProps
  } = styleProps;

  const scrollViewContentStyle = {
    paddingHorizontal,
    ...restStyleProps,
  };

  return (
    <SafeAreaView style={{...styles.root, backgroundColor}}>
      <ScrollView style={styles.scrollView} contentContainerStyle={scrollViewContentStyle}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopLevelView;
