import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import React, {useCallback} from 'react';

import OpenLinkService from 'src/shared/services/OpenLinkService';
import NavigationService from 'src/features/navigation/services/NavigationService';
import {MyCheckInsRoutes} from 'src/features/navigation/routes';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Title from 'src/shared/components/Typography/Title';
import ButtonLink from 'src/shared/components/Button/ButtonLink';
import Description from 'src/shared/components/Typography/Description';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';

import CheckInsList from 'src/features/check-ins/components/CheckInsList';

const MyCheckInsScreen: React.FC = () => {
  const {t} = useTranslation('myCheckInsScreen');

  const {current, items} = useSelector(state => state.checkIns);

  const handleNavigateFAQ = useCallback(() => {
    NavigationService.fromMyCheckIns(MyCheckInsRoutes.FAQ);
  }, []);

  const handleNavigateToImprint = useCallback(() => {
    OpenLinkService.openImprint();
  }, []);

  const handleNavigateToDatenschutz = useCallback(() => {
    NavigationService.fromMyCheckIns(MyCheckInsRoutes.Datenschutz);
  }, []);

  const handleNavigateToCurrent = useCallback(() => {
    NavigationService.fromMyCheckIns(MyCheckInsRoutes.ProviderForm);
  }, []);

  const isEmpty = current == null && items.length === 0;

  return (
    <TopLevelView>
      <Box>
        <Space.V s={10} />
        <Title>{t('title')}</Title>
        {isEmpty ? (
          <>
            <Space.V s={5} />
            <Description>{t('emptyCheckInsDescription')}</Description>
            <Space.V s={10} />
            <ButtonLink onPress={handleNavigateFAQ}>{t('faq')}</ButtonLink>
            <Space.V s={5} />
            <ButtonLink onPress={handleNavigateToImprint}>{t('imprint')}</ButtonLink>
            <Space.V s={5} />
          </>
        ) : null}
      </Box>

      {isEmpty ? null : (
        <CheckInsList
          items={items}
          current={current}
          handleNavigateToCurrent={handleNavigateToCurrent}
        />
      )}

      {isEmpty ? null : (
        <Box>
          <Space.V s={10} />
          <ButtonLink onPress={handleNavigateFAQ}>{t('faq')}</ButtonLink>
          <Space.V s={5} />
          <ButtonLink onPress={handleNavigateToImprint}>{t('imprint')}</ButtonLink>
          <Space.V s={5} />
          <ButtonLink onPress={handleNavigateToDatenschutz}>{t('datenschutz')}</ButtonLink>
        </Box>
      )}
    </TopLevelView>
  );
};

export default MyCheckInsScreen;
