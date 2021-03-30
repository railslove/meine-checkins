import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {StackActions, useNavigation} from '@react-navigation/core';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Image from 'src/shared/components/Image/Image';
import Button from 'src/shared/components/Button/Button';
import Headline from 'src/shared/components/Typography/Headline';
import {MainStackRoutes} from 'src/features/navigation/MainStackNavigator';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import {initializeAppAction} from 'src/shared/redux/actions/appActions';
import Paragraph from 'src/shared/components/Typography/Paragraph';

const StartScreen: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();

  const goNext = () => {
    navigation.dispatch(StackActions.replace(MainStackRoutes.MainNavigation));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAppAction.request());
  });

  return (
    <TopLevelView>
      <Box flex={1} width="90%">
        <Space.V s={15} />
        <Box width="65%" display="flex" justifyContent="center" alignItems="center">
          <Headline>{t('startScreen:title')}</Headline>
        </Box>
        <Image source={require('./img/start-illustration.png')} />
        <Box display="flex" alignItems="center" justifyContent="center">
          <Box width="85%">
            <Paragraph>{t('startScreen:description')}</Paragraph>
          </Box>
        </Box>
        <Space.V s={15} />
        <Button onPress={goNext}>{t('base:letsGo')}</Button>
      </Box>
    </TopLevelView>
  );
};

export default StartScreen;
