import React, {useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import NavigationService from 'src/features/navigation/services/NavigationService';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import ButtonLink from 'src/shared/components/Button/ButtonLink';
import {MyCheckInsRoutes} from 'src/features/navigation/routes';

const MyCheckInsLinks = () => {
  const {t} = useTranslation('myCheckInsScreen');

  const handleNavigateFAQ = useCallback(() => {
    NavigationService.fromMyCheckIns(MyCheckInsRoutes.FAQ);
  }, []);

  const handleNavigateToImprint = useCallback(() => {
    NavigationService.fromMyCheckIns(MyCheckInsRoutes.Imprint);
  }, []);

  const handleNavigateToDatenschutz = useCallback(() => {
    NavigationService.fromMyCheckIns(MyCheckInsRoutes.Datenschutz);
  }, []);

  return (
    <Box>
      <Space.V s={15} />
      <ButtonLink onPress={handleNavigateFAQ}>{t('faq')}</ButtonLink>
      <Space.V s={5} />
      <ButtonLink onPress={handleNavigateToImprint}>{t('imprint')}</ButtonLink>
      <Space.V s={5} />
      <ButtonLink onPress={handleNavigateToDatenschutz}>{t('datenschutz')}</ButtonLink>
    </Box>
  );
};

export default MyCheckInsLinks;
