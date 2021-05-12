import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TextInput} from 'react-native';

import {px2dp} from 'src/shared/styles/createStyles';

import Title from 'src/shared/components/Typography/Title';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';

const styles = StyleSheet.create({
  text: {
    fontSize: px2dp(12),
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
