import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TextInput} from 'react-native';

import {px2dp} from 'src/shared/styles/createStyles';

import Image from 'src/shared/components/Image/Image';
import Title from 'src/shared/components/Typography/Title';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import {COLOGNE_CITY_LOGO_MARK} from 'src/features/check-ins/imprintLocales';

const style = StyleSheet.create({
  text: {
    fontSize: px2dp(12),
    fontFamily: 'Inter-Regular',
  },
});

const renderTextContent = (content: string) => {
  return (
    <TextInput
      dataDetectorTypes={['link', 'phoneNumber']}
      editable={false}
      multiline={true}
      value={content}
      style={style.text}
      scrollEnabled={false}
    />
  );
};

const ImprintScreen = () => {
  const {t} = useTranslation('imprint');
  const [beforeLogo, afterLogo] = t('content').split(COLOGNE_CITY_LOGO_MARK);

  return (
    <TopLevelView>
      <Title>{t('title')}</Title>
      {renderTextContent(beforeLogo)}
      <Image source={require('src/features/check-ins/img/stadt-koeln.png')} />
      {renderTextContent(afterLogo)}
    </TopLevelView>
  );
};

export default React.memo(ImprintScreen);
