import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

import {px2dp} from 'src/shared/styles/createStyles';

const styles = StyleSheet.create({
  text: {
    fontSize: px2dp(12),
    fontFamily: 'Inter-Regular',
  },
});

export type MultilineTextProps = {
  children: string;
};

const MultilineText = ({children}: MultilineTextProps): JSX.Element => {
  return (
    <TextInput
      dataDetectorTypes={['link', 'phoneNumber']}
      editable={false}
      multiline={true}
      value={children
        .split('\n')
        .map(el => el.trim())
        .join('\n')}
      style={styles.text}
      scrollEnabled={false}
      allowFontScaling={false}
    />
  );
};

export default React.memo(MultilineText);
