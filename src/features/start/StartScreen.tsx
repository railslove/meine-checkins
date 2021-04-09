import React from 'react';
import {useSelector} from 'react-redux';
import {StackActions} from '@react-navigation/core';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Image from 'src/shared/components/Image/Image';
import Button from 'src/shared/components/Button/Button';
import Description from 'src/shared/components/Typography/Description';
import LargeHeadline from 'src/shared/components/Typography/LargeTitle';
import {useAppNavigation} from 'src/shared/hooks/navigationHooks';
import {MainStackRoutes} from 'src/features/navigation/constants';

const StartScreen: React.FC = () => {
  const {t} = useTranslation('startScreen');
  const {item: user, isLoading} = useSelector(state => state.user);
  const navigation = useAppNavigation();

  const handleSubmit = () => {
    navigation.dispatch(StackActions.replace(MainStackRoutes.MainNavigation));
  };

  if (isLoading) {
    return null;
  }

  if (user != null) {
    handleSubmit();
    return null;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Box flex={1} display="flex" alignItems="center" justifyContent="center">
        <Box marginHorizontal="10%">
          <Box display="flex" alignItems="center" justifyContent="center">
            <LargeHeadline>{t('title')}</LargeHeadline>
            <Space.V s={5} />
          </Box>
          <Box height="50%">
            <Image source={require('./img/start-illustration.png')} resizeMode="contain" />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Space.V s={10} />
            <Description textAlign="center">{t('description')}</Description>
            <Space.V s={10} />
            <Button onPress={handleSubmit}>{t('submit')}</Button>
          </Box>
        </Box>
      </Box>
    </SafeAreaView>
  );
};

export default StartScreen;
