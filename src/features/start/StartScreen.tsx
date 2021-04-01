import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {StackActions, useNavigation} from '@react-navigation/core';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Image from 'src/shared/components/Image/Image';
import Button from 'src/shared/components/Button/Button';
import LargeHeadline from 'src/shared/components/Typography/LargeTitle';
import {MainStackRoutes} from 'src/features/navigation/MainStackNavigator';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import {initializeAppAction} from 'src/shared/redux/actions/appActions';
import Description from 'src/shared/components/Typography/Description';

const StartScreen: React.FC = () => {
  const {t} = useTranslation('startScreen');
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAppAction.request());
  });

  const handleSubmit = () => {
    navigation.dispatch(StackActions.replace(MainStackRoutes.MainNavigation));
  };

  return (
    <TopLevelView>
      <Space.V s={15} />
      <Box marginLeft="5%">
        <LargeHeadline>{t('title')}</LargeHeadline>
      </Box>
      <Image source={require('./img/start-illustration.png')} />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box width="85%">
          <Description>{t('description')}</Description>
        </Box>
      </Box>
      <Space.V s={15} />
      <Button onPress={handleSubmit}>{t('submit')}</Button>
    </TopLevelView>
  );
};

export default StartScreen;
