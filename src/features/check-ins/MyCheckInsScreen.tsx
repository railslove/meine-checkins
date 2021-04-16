import React, {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import OpenLinkService from 'src/shared/services/OpenLinkService';
import NavigationService from 'src/features/navigation/services/NavigationService';
import {MyCheckInsRoutes} from 'src/features/navigation/routes';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Title from 'src/shared/components/Typography/Title';
import Paragraph from 'src/shared/components/Typography/Paragraph';
import ButtonLink from 'src/shared/components/Button/ButtonLink';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';

import CheckInsList from 'src/features/check-ins/components/CheckInsList';
import EmptyCheckInsList from 'src/features/check-ins/components/EmptyCheckInsList';
import {LAYOUT_PADDING_HORIZONTAL} from 'src/shared/components/Layout/constants';

const MyCheckInsScreen: React.FC = () => {
  const {t} = useTranslation('myCheckInsScreen');

  const {current, items} = useSelector(state => state.checkIns);

  const handleNavigateFAQ = useCallback(() => {
    NavigationService.fromMyCheckIns(MyCheckInsRoutes.FAQ);
  }, []);

  const handleNavigateToImprint = useCallback(() => {
    OpenLinkService.openImprint();
  }, []);

  const handleNavigateToCurrent = useCallback(() => {
    NavigationService.fromMyCheckIns(MyCheckInsRoutes.ProviderForm);
  }, []);

  const isEmpty = current == null && items.length === 0;

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
          <Space.V s={5} />
          <ButtonLink onPress={handleNavigateToImprint}>{t('imprint')}</ButtonLink>
        </Box>
      )}
    </TopLevelView>
  );
};

export default MyCheckInsScreen;
