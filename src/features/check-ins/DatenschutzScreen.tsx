import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {useTranslation} from 'react-i18next';

import {px2dp} from 'src/shared/styles/createStyles';

import Title from 'src/shared/components/Typography/Title';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import MultilineText from 'src/shared/components/Typography/MultilineText';

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
      <MultilineText>{t('content')}</MultilineText>
    </TopLevelView>
  );
};

export default React.memo(DatenschutzScreen);
