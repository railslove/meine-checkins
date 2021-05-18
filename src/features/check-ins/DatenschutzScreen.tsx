import React from 'react';
import {useTranslation} from 'react-i18next';

import Title from 'src/shared/components/Typography/Title';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import MultilineText from 'src/shared/components/Typography/MultilineText';

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
