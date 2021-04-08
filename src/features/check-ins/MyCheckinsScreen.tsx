import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {useAppNavigation} from 'src/shared/hooks/navigationHooks';

import Space from 'src/shared/components/Layout/Space';
import Title from 'src/shared/components/Typography/Title';
import Paragraph from 'src/shared/components/Typography/Paragraph';
import ButtonLink from 'src/shared/components/Button/ButtonLink';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';

import {ScanRoutes} from 'src/features/scan/ScanStackNavigator';
import CheckInsList from 'src/features/check-ins/components/CheckInsList';
import {CheckInsRoutes} from 'src/features/check-ins/CheckInsNavigator';
import EmptyCheckInsList from 'src/features/check-ins/components/EmptyCheckInsList';
import Box from 'src/shared/components/Layout/Box';
import {LAYOUT_PADDING_HORIZONTAL} from 'src/shared/components/Layout/constants';

const MyCheckInsScreen: React.FC = () => {
  const {t} = useTranslation('myCheckInsScreen');
  const navigate = useAppNavigation();

  const {current, items} = useSelector(state => {
    const {current, items} = state.checkIns;
    return {current, items};
  });

  const handleNavigateFAQ = useCallback(() => {
    navigate.navigate(CheckInsRoutes.FAQ);
  }, [navigate]);

  const handleNavigateToImprint = useCallback(() => {
    navigate.navigate(CheckInsRoutes.Imprint);
  }, [navigate]);

  const handleNavigateToCurrent = useCallback(() => {
    navigate.navigate(ScanRoutes.ProviderForm);
  }, [navigate]);

  const isEmpty = items.length === 0;

  return (
    <TopLevelView paddingHorizontal={0}>
      <Box paddingHorizontal={LAYOUT_PADDING_HORIZONTAL}>
        <Space.V s={10} />
        <Title>{t('title')}</Title>
        {isEmpty ? (
          <>
            <Space.V s={5} />
            <Paragraph>{t('emptyCheckInsDescription')}</Paragraph>
            <Space.V s={10} />
            <ButtonLink onPress={handleNavigateFAQ}>{t('faq')}</ButtonLink>
            <Space.V s={5} />
            <ButtonLink onPress={handleNavigateToImprint}>{t('imprint')}</ButtonLink>
            <Space.V s={5} />
          </>
        ) : null}
      </Box>

      {isEmpty ? (
        <EmptyCheckInsList />
      ) : (
        <Box paddingHorizontal={LAYOUT_PADDING_HORIZONTAL}>
          <CheckInsList
            items={items}
            current={current}
            handleNavigateToCurrent={handleNavigateToCurrent}
          />
        </Box>
      )}

      {isEmpty ? null : (
        <Box paddingHorizontal={LAYOUT_PADDING_HORIZONTAL}>
          <Space.V s={10} />
          <ButtonLink onPress={handleNavigateFAQ}>{t('faq')}</ButtonLink>
          <ButtonLink onPress={handleNavigateToImprint}>{t('imprint')}</ButtonLink>
        </Box>
      )}
    </TopLevelView>
  );
};

export default MyCheckInsScreen;
