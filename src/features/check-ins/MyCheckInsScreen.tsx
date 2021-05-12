import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import React, {useCallback} from 'react';

import {BottomTabsRoutes} from 'src/features/navigation/routes';
import NavigationService from 'src/features/navigation/services/NavigationService';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Title from 'src/shared/components/Typography/Title';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';

import TextBox from 'src/shared/components/Typography/TextBox';
import CheckInsList from 'src/features/check-ins/components/CheckInsList';
import MyCheckInsEmpty from 'src/features/check-ins/components/MyCheckInsEmpty';
import MyCheckInsLinks from 'src/features/check-ins/components/MyCheckInsLinks';
import CheckInProviderLogos from 'src/features/check-ins/components/CheckInProviderLogos';

const MyCheckInsScreen: React.FC = () => {
  const {t} = useTranslation('myCheckInsScreen');

  const {current, items} = useSelector(state => state.checkIns);

  const handleNavigateToCurrent = useCallback(() => {
    NavigationService.fromMyCheckIns(BottomTabsRoutes.ProviderForm);
  }, []);

  const isEmpty = current == null && items.length === 0;

  if (isEmpty) {
    return <MyCheckInsEmpty />;
  }

  return (
    <TopLevelView>
      <Box>
        <Space.V s={10} />
        <Title>{t('title')}</Title>
      </Box>

      <CheckInsList
        items={items}
        current={current}
        handleNavigateToCurrent={handleNavigateToCurrent}
      />

      <Space.V s={20} />
      <TextBox fontWeight="bold">{t('providerListHeader')}</TextBox>
      <CheckInProviderLogos opacity={1} justifyContent="flex-start" />

      <MyCheckInsLinks />
    </TopLevelView>
  );
};

export default MyCheckInsScreen;
