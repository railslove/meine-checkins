import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {LAYOUT_PADDING_HORIZONTAL} from 'src/shared/components/Layout/constants';

const useStyles = ({
  backgroundColor = 'white',
  paddingHorizontal = LAYOUT_PADDING_HORIZONTAL,
}: ViewStyle = {}) => {
  return StyleSheet.create({
    root: {
      backgroundColor,
      flex: 1,
      margin: 0,
    },
    main: {
      backgroundColor,
      flex: 1,
      padding: 0,
    },
    scrollView: {
      backgroundColor,
      paddingHorizontal,
      flex: 1,
      margin: 0,
      padding: 0,
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
      <ScrollView style={styles.scrollView}>
        <View style={styles.main}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopLevelView;
