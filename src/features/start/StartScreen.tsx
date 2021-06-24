import React from 'react';
import {useSelector} from 'react-redux';
import {Dimensions} from 'react-native';
import {useTranslation} from 'react-i18next';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Image from 'src/shared/components/Image/Image';
import Button from 'src/shared/components/Button/Button';
import Description from 'src/shared/components/Typography/Description';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import LargeHeadline from 'src/shared/components/Typography/LargeTitle';
import NavigationService from 'src/features/navigation/services/NavigationService';

const StartScreen: React.FC = () => {
  const {height} = Dimensions.get('screen');

  const {t} = useTranslation('startScreen');
  const user = useSelector(state => state.user.item);

  const handleNavigation = () => {
    NavigationService.fromStartScreen(user);
  };

  return (
    <TopLevelView flex={1}>
      <Box flex={1} display="flex" alignItems="center" justifyContent="center" height={height}>
        <Box marginHorizontal="10%">
          <Box display="flex" alignItems="center" justifyContent="center">
            <LargeHeadline>{t('title')}</LargeHeadline>
            <Space.V s={5} />
          </Box>
          <Box height="50%">
            <Image source={require('./img/start-illustration.png')} />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Space.V s={10} />
            <Description textAlign="center">{t('description')}</Description>
            <Space.V s={10} />
            <Button onPress={handleNavigation}>{t('submit')}</Button>
          </Box>
        </Box>
      </Box>
    </TopLevelView>
  );
};

export default StartScreen;
