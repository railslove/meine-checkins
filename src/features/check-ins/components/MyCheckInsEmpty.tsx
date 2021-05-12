import React from 'react';
import {useTranslation} from 'react-i18next';

import CHECK_IN_PROVIDER_LIST from 'src/shared/services/checkInProvidersList';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Title from 'src/shared/components/Typography/Title';
import CheckInLogo from 'src/features/check-ins/components/CheckInLogo';
import Description from 'src/shared/components/Typography/Description';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import MyCheckInsLinks from 'src/features/check-ins/components/MyCheckInsLinks';
import {px2dp} from 'src/shared/styles/createStyles';

export const EMPTY_CHECKIN_LOGO_DEMNSIONS = {
  width: px2dp(80),
  height: px2dp(60),
};

const MyCheckInsEmpty: React.FC = () => {
  const {t} = useTranslation('myCheckInsScreen');

  return (
    <TopLevelView flex={1}>
      <Space.V s={10} />
      <Title>{t('title')}</Title>
      <Space.V s={5} />
      <Description>{t('emptyCheckInsDescription')}</Description>
      <Space.V s={20} />
      <Box
        opacity={0.7}
        flexDirection="row"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
      >
        {CHECK_IN_PROVIDER_LIST.slice(0, 5).map(el => {
          return (
            <Box key={el.name} margin={5}>
              <CheckInLogo src={el.logoUrl} dimensions={EMPTY_CHECKIN_LOGO_DEMNSIONS} />
            </Box>
          );
        })}
      </Box>
      <MyCheckInsLinks />
    </TopLevelView>
  );
};

export default MyCheckInsEmpty;
