import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/core';
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

const ProfileScreen: React.FC = () => {
  const {t} = useTranslation('profileScreen');
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [address, setAddress] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleAddressChange = useCallback((value: string) => {
    setAddress(value);
  }, []);

  const handleLastNameChange = useCallback((value: string) => {
    setLastName(value);
  }, []);

  const handleFirstNameChange = useCallback((value: string) => {
    setFirstName(value);
  }, []);

  const handlePhoneNumberChange = useCallback((value: string) => {
    setPhoneNumber(value);
  }, []);

  const handleSubmit = () => {
    const user: User = {
      address,
      lastName,
      firstName,
      phoneNumber,
    };

    dispatch(saveUserThunk({user})).then(() => {
      navigation.navigate(ScanRoutes.ScanQRCode);
    });
  };

  return (
    <TopLevelView>
      <Space.V s={15} />

      <Box>
        <Title>{t('title')}</Title>
        <Subtitle>{t('subtitle')}</Subtitle>
      </Box>

      <Space.V s={15} />

      <Box flex={1} flexDirection="column">
        <TextInput
          value={firstName}
          placeholder={t('firstName')}
          autoCompleteType="name"
          onChangeText={handleFirstNameChange}
        />
        <TextInput
          value={lastName}
          placeholder={t('lastName')}
          autoCompleteType="name"
          onChangeText={handleLastNameChange}
        />
        <TextInput
          placeholder={t('address')}
          value={address}
          autoCompleteType="street-address"
          onChangeText={handleAddressChange}
        />
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
