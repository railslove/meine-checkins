import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LAYOUT_PADDING_HORIZONTAL} from 'src/shared/components/Layout/constants';

const useStyles = ({
  backgroundColor = 'white',
  paddingHorizontal = LAYOUT_PADDING_HORIZONTAL,
}: ViewStyle = {}) => {
  return StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor,
    },
    scrollView: {
      flex: 1,
    },
    scrollViewContent: {
      paddingHorizontal,
    },
  });
};

export type TopLevelViewProps = Partial<Pick<ViewStyle, 'backgroundColor' | 'paddingHorizontal'>>;

const TopLevelView: React.FC<TopLevelViewProps> = ({
  children,
  paddingHorizontal,
  backgroundColor,
}) => {
  const styles = useStyles({backgroundColor, paddingHorizontal});

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopLevelView;
