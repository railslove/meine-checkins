import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {useTranslation} from 'react-i18next';

import Title from 'src/shared/components/Typography/Title';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import {toDpFromPixel} from 'src/shared/theme/util';

const styles = StyleSheet.create({
  text: {
    fontSize: toDpFromPixel(12),
    fontFamily: 'Inter-Regular',
  },
});

const DatenschutzScreen = () => {
  const {t} = useTranslation('datenschutz');

  return (
    <TopLevelView>
      <Title>{t('title')}</Title>
      <TextInput
        dataDetectorTypes={['link', 'phoneNumber']}
        editable={false}
        multiline={true}
        value={t('content')}
        style={styles.text}
        scrollEnabled={false}
      />
    </TopLevelView>
  );
};

export default React.memo(DatenschutzScreen);
