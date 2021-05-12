import React from 'react';
import {useTranslation} from 'react-i18next';

import Space from 'src/shared/components/Layout/Space';
import Title from 'src/shared/components/Typography/Title';
import Description from 'src/shared/components/Typography/Description';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import MyCheckInsLinks from 'src/features/check-ins/components/MyCheckInsLinks';
import CheckInProviderLogos from 'src/features/check-ins/components/CheckInProviderLogos';

const MyCheckInsEmpty: React.FC = () => {
  const {t} = useTranslation('myCheckInsScreen');

  return (
    <TopLevelView flex={1}>
      <Space.V s={10} />
      <Title>{t('title')}</Title>
      <Space.V s={5} />
      <Description>{t('emptyCheckInsDescription')}</Description>
      <Space.V s={20} />
      <CheckInProviderLogos opacity={0.7} />
      <Space.V s={10} />
      <MyCheckInsLinks />
    </TopLevelView>
  );
};

export default MyCheckInsEmpty;
