import {Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import React, {useEffect} from 'react';
import {BarCodeReadEvent} from 'react-native-camera';
import {useDispatch, useSelector} from 'react-redux';

import {px2dp} from 'src/shared/styles/createStyles';
import {TEST_PROVIDERS} from 'src/testData';
import {PartialCheckInItem} from 'src/shared/models/Provider';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Title from 'src/shared/components/Typography/Title';
import Button from 'src/shared/components/Button/Button';
import QRScanner from 'src/shared/components/Form/QRCodeScanner';
import Description from 'src/shared/components/Typography/Description';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import PermissionsService from 'src/shared/services/PermissionsService';
import {
  providerDiscardAction,
  providerRegisterAction,
} from 'src/shared/redux/actions/providerActions';

import SubTitle from 'src/shared/components/Typography/Subtitle';
import ButtonLink from 'src/shared/components/Button/ButtonLink';
import NavigationService from 'src/features/navigation/services/NavigationService';
import NotAuthorizedView from 'src/features/scan/NotAutorizedView';

export const SCAN_SCREEN_BACKGROUND_COLOR = 'rgba(18, 22, 32, 1)';

const ScanQRCodeScreen: React.FC = () => {
  const {t} = useTranslation('scanQRCodeScreen');
  const dispatch = useDispatch();
  const current = useSelector(state => state.checkIns.current);

  const handleTestSubmit = (el: PartialCheckInItem) => () => {
    handleSuccess({data: el.url});
  };

  const handleSuccess = ({data: url}: Pick<BarCodeReadEvent, 'data'>) => {
    NavigationService.fromScanQRScreen();

    // dispatch action with a bit of delay
    // otherwise the case where there is a current provider flashes
    setTimeout(() => dispatch(providerRegisterAction({url})), 0);
  };

  useEffect(() => {
    PermissionsService.requestCamera();
  });

  if (current && current.startTime) {
    const handleGoToCheckout = () => {
      NavigationService.fromScanQRScreen();
    };

    const handleDiscardCheckIn = () => {
      const title = t('checkInProgressTitle');
      const message = t('checkInProgressDiscardAlertMessage');

      Alert.alert(title, message, [
        {
          text: t('yes'),
          onPress: () => dispatch(providerDiscardAction()),
        },
        {
          text: t('no'),
        },
      ]);
    };

    return (
      <TopLevelView
        flex={1}
        display="flex"
        flexDirection="column"
        paddingHorizontal={px2dp(30)}
        backgroundColor={SCAN_SCREEN_BACKGROUND_COLOR}
      >
        <Space.V s={40} />
        <Title color="white" split={false}>
          {t('checkInProgressTitle')}
        </Title>
        <Space.V s={15} />
        <SubTitle color="white">{t('checkInProgressSubTitle')}</SubTitle>
        <Space.V s={25} />

        <Button fullWidth={true} onPress={handleGoToCheckout}>
          {t('checkInProgressContinue')}
        </Button>

        <Space.V s={10} />
        <Button fullWidth={true} mode="text" onPress={handleDiscardCheckIn}>
          {t('checkInProgressDiscard')}
        </Button>
      </TopLevelView>
    );
  }

  return (
    <TopLevelView
      flex={1}
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      backgroundColor={SCAN_SCREEN_BACKGROUND_COLOR}
    >
      <Box marginHorizontal="10%">
        <Box display="flex" alignItems="center" justifyContent="center">
          <Space.V s={10} />
          <Title color="white">{t('title')}</Title>
          <Space.V s={10} />
        </Box>

        <Box flex={1} display="flex" alignItems="center" justifyContent="center">
          <QRScanner
            backgroundColor={SCAN_SCREEN_BACKGROUND_COLOR}
            notAuthorizedView={<NotAuthorizedView />}
            onRead={handleSuccess}
          />
        </Box>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Space.V s={10} />
          <Description color="white" textAlign="center">
            {t('description')}
          </Description>
          <Space.V s={10} />

          {__DEV__ ? (
            <>
              <Space.V s={10} />
              <Box display="flex" flexDirection="row" maxWidth="100%" flexWrap="wrap">
                {TEST_PROVIDERS.map(el => {
                  return (
                    <ButtonLink key={el.id} onPress={handleTestSubmit(el)}>
                      {'  ' + el.name + '  '}
                    </ButtonLink>
                  );
                })}
              </Box>
              <Space.V s={10} />
            </>
          ) : null}
        </Box>
      </Box>
    </TopLevelView>
  );
};

export default ScanQRCodeScreen;
