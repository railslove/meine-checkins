import React, {useCallback} from 'react';
import {Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import {StackActions} from '@react-navigation/core';
import {useTranslation} from 'react-i18next';

import {MainStackRoutes} from 'src/features/navigation/constants';
import {useAppNavigation} from 'src/shared/hooks/navigationHooks';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Image from 'src/shared/components/Image/Image';
import Button from 'src/shared/components/Button/Button';
import Description from 'src/shared/components/Typography/Description';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import LargeHeadline from 'src/shared/components/Typography/LargeTitle';

const StartScreen: React.FC = () => {
  const {height} = Dimensions.get('screen');

  const {t} = useTranslation('startScreen');
  const navigation = useAppNavigation();
  const {item: user, isLoading: isUserLoading} = useSelector(state => state.user);

  const handleNavigation = useCallback(() => {
    navigation.dispatch(StackActions.replace(MainStackRoutes.MainNavigation));
  }, [navigation]);

  if (isUserLoading) {
    // wait to see if we have a guest or not (guest = no user data yet)
    return null;
  }

  if (user != null) {
    // we have user data so we can move on
    handleNavigation();
    return null;
  }

  return (
    <TopLevelView>
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
