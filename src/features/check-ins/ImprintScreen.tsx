import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, TextInput} from 'react-native';
import {COLOGNE_CITY_LOGO_MARK} from 'src/features/check-ins/imprintLocales';
import Image from 'src/shared/components/Image/Image';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import Title from 'src/shared/components/Typography/Title';
import {toDpFromPixel} from 'src/shared/theme/util';

const style = StyleSheet.create({
  text: {
    fontSize: toDpFromPixel(12),
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
