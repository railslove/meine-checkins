import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';

import {toDpFromPixel} from 'src/shared/theme/util';

import Space from 'src/shared/components/Layout/Space';
import PlusIcon from 'src/shared/components/Icon/PlusIcon';
import Paragraph from 'src/shared/components/Typography/Paragraph';

export type AccordionProps = {
  open?: boolean;
  title: string;
  content: React.ReactNode;
  onOpen: () => void;
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: toDpFromPixel(12),

    display: 'flex',
    flexDirection: 'column',

    borderTopWidth: toDpFromPixel(2),
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
    marginRight: toDpFromPixel(30),
  },
  headerText: {
    fontSize: toDpFromPixel(15),
    fontWeight: '700',
    fontFamily: 'Inter-Bold',
    lineHeight: toDpFromPixel(22),
  },
});

const Accordion: React.FC<AccordionProps> = ({open, title, content, onOpen}) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity style={styles.header} onPress={onOpen} activeOpacity={1}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
        <View style={styles.center}>
          <PlusIcon isSelected={!open} />
        </View>
      </TouchableOpacity>
      {open ? (
        <>
          <Space.V s={10} />
          <Paragraph>{content}</Paragraph>
        </>
      ) : null}
    </View>
  );
};

export default Accordion;
