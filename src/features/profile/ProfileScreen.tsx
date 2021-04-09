import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import React, {useCallback, useState} from 'react';

import User from 'src/shared/models/User';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Button from 'src/shared/components/Button/Button';
import Title from 'src/shared/components/Typography/Title';
import TextInput from 'src/shared/components/Form/TextInput';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import {ScanRoutes} from 'src/features/scan/ScanStackNavigator';
import LockIcon from 'src/shared/components/Icon/LockIcon';
import Subtitle from 'src/shared/components/Typography/Subtitle';
import {saveUserThunk} from 'src/shared/redux/effects/userThunks';
import Paragraph from 'src/shared/components/Typography/Paragraph';
import {useAppNavigation} from 'src/shared/hooks/navigationHooks';
import {toDpFromPixel} from 'src/shared/theme/util';

const ProfileScreen: React.FC = () => {
  const {t} = useTranslation('profileScreen');
  const user = useSelector(state => state.user.item);
  const dispatch = useDispatch();
  const navigation = useAppNavigation();

  const [lastName, setLastName] = useState(user?.lastName || '');
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');

  const [city, setCity] = useState(user?.city || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');

  const handleLastNameChange = useCallback((value: string) => {
    setLastName(value);
  }, []);

  const handleFirstNameChange = useCallback((value: string) => {
    setFirstName(value);
  }, []);

  const handlePhoneNumberChange = useCallback((value: string) => {
    setPhoneNumber(value);
  }, []);

  const handleStreetAddressChange = useCallback((value: string) => {
    setStreetAddress(value);
  }, []);

  const handlePostalCodeChange = useCallback((value: string) => {
    setPostalCode(value);
  }, []);

  const handleCityChange = useCallback((value: string) => {
    setCity(value);
  }, []);

  const handleSubmit = () => {
    const user: User = {
      lastName,
      firstName,
      phoneNumber,
      streetAddress,
      postalCode,
      city,
    };

    dispatch(saveUserThunk({user})).then(() => {
      navigation.navigate(ScanRoutes.ScanQRCode);
    });
  };

  return (
    <TopLevelView>
      <Space.V s={10} />

      <Box>
        <Title>{t('title')}</Title>
        <Subtitle>{t('subtitle')}</Subtitle>
      </Box>

      <Space.V s={10} />

      <Box flex={1} flexDirection="column">
        <Box display="flex" flexDirection="row">
          <Box flex={1}>
            <TextInput
              value={firstName}
              placeholder={t('firstName')}
              autoCompleteType="name"
              onChangeText={handleFirstNameChange}
            />
          </Box>
          <Box flex={2} marginLeft={toDpFromPixel(5)}>
            <TextInput
              value={lastName}
              placeholder={t('lastName')}
              autoCompleteType="name"
              onChangeText={handleLastNameChange}
            />
          </Box>
        </Box>

        <TextInput
          placeholder={t('streetAddress')}
          value={streetAddress}
          autoCompleteType="street-address"
          onChangeText={handleStreetAddressChange}
        />
        <Box display="flex" flexDirection="row">
          <Box flex={1}>
            <TextInput
              placeholder={t('postalCode')}
              value={postalCode}
              autoCompleteType="postal-code"
              onChangeText={handlePostalCodeChange}
            />
          </Box>
          <Box flex={2} marginLeft={toDpFromPixel(5)}>
            <TextInput placeholder={t('city')} value={city} onChangeText={handleCityChange} />
          </Box>
        </Box>
        <TextInput
          value={phoneNumber}
          placeholder={t('phoneNumber')}
          keyboardType="phone-pad"
          autoCompleteType="tel"
          onChangeText={handlePhoneNumberChange}
        />

        <Box display="flex" flexDirection="row" alignItems="center" flexWrap="wrap">
          <Box width="82%" display="flex" flexDirection="row" alignItems="center">
            <Box borderRadius={7} marginRight={20}>
              <LockIcon />
            </Box>
            <Box>
              <Paragraph>{t('dataPrivacyInfo')}</Paragraph>
            </Box>
          </Box>

          <Box>
            <Space.V s={15} />
            <Button fullWidth onPress={handleSubmit}>
              {t('submit')}
            </Button>
          </Box>
        </Box>
      </Box>
    </TopLevelView>
  );
};

export default ProfileScreen;
