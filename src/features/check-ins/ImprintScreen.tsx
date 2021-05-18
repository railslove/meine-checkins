import React from 'react';
import {useTranslation} from 'react-i18next';

import {COLOGNE_CITY_LOGO_MARK} from 'src/features/check-ins/imprintLocales';

import Image from 'src/shared/components/Image/Image';
import Title from 'src/shared/components/Typography/Title';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import MultilineText from 'src/shared/components/Typography/MultilineText';

const ImprintScreen = () => {
  const {t} = useTranslation('imprint');
  const [beforeLogo, afterLogo] = t('content').split(COLOGNE_CITY_LOGO_MARK);

  return (
    <TopLevelView>
      <Title>{t('title')}</Title>
      <MultilineText>{beforeLogo}</MultilineText>
      <Image source={require('src/features/check-ins/img/stadt-koeln.png')} />
      <MultilineText>{afterLogo}</MultilineText>
    </TopLevelView>
  );
};

export default React.memo(ImprintScreen);
