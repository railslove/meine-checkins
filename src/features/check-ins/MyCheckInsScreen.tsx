import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import React, {useCallback} from 'react';

import NavigationService from 'src/features/navigation/services/NavigationService';
import {BottomTabsRoutes, MyCheckInsRoutes} from 'src/features/navigation/routes';

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
    NavigationService.fromMyCheckIns(MyCheckInsRoutes.Imprint);
  }, []);

  const handleNavigateToDatenschutz = useCallback(() => {
    NavigationService.fromMyCheckIns(MyCheckInsRoutes.Datenschutz);
  }, []);

  const handleNavigateToCurrent = useCallback(() => {
    NavigationService.fromMyCheckIns(BottomTabsRoutes.ProviderForm);
  }, []);

  const isEmpty = current == null && items.length === 0;

  const Links = (
    <Box>
      <Space.V s={15} />
      <ButtonLink onPress={handleNavigateFAQ}>{t('faq')}</ButtonLink>
      <Space.V s={5} />
      <ButtonLink onPress={handleNavigateToImprint}>{t('imprint')}</ButtonLink>
      <Space.V s={5} />
      <ButtonLink onPress={handleNavigateToDatenschutz}>{t('datenschutz')}</ButtonLink>
    </Box>
  );

  return (
    <TopLevelView>
      <Box>
        <Space.V s={10} />
        <Title>{t('title')}</Title>
        {isEmpty ? (
          <>
            <Space.V s={5} />
            <Description>{t('emptyCheckInsDescription')}</Description>
            {Links}
          </>
        ) : null}
      </Box>

      {isEmpty ? null : (
        <CheckInsList
          items={items}
          current={current}
          activeTimeText={t('activeTimeText')}
          handleNavigateToCurrent={handleNavigateToCurrent}
        />
      )}

      {isEmpty ? null : Links}
    </TopLevelView>
  );
};

export default MyCheckInsScreen;
