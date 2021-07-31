import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {px2dp} from 'src/shared/styles/createStyles';

import Space from 'src/shared/components/Layout/Space';
import PlusIcon from 'src/shared/components/Icon/PlusIcon';
import BaseText from 'src/shared/components/Typography/BaseText';

export type AccordionProps = {
  open?: boolean;
  title: string;
  content: React.ReactNode;
  onOpen: () => void;
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: px2dp(12),

    display: 'flex',
    flexDirection: 'column',

    borderTopWidth: px2dp(2),
    borderTopColor: '#E5ECFC',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
  },
  headerTextContainer: {
    flex: 1,
    marginRight: px2dp(30),
  },
  headerText: {
    fontSize: px2dp(13),
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    lineHeight: px2dp(20),
  },
});

const Accordion: React.FC<AccordionProps> = ({open, title, content, onOpen}) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.header} onPress={onOpen} activeOpacity={1}>
        <View style={styles.headerTextContainer}>
          <BaseText style={styles.headerText}>{title}</BaseText>
        </View>
        <View style={styles.center}>
          <PlusIcon isSelected={!open} />
        </View>
      </TouchableOpacity>
      {open ? (
        <>
          <Space.V s={10} />
          {content}
        </>
      ) : null}
    </View>
  );
};

export default Accordion;
