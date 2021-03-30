import {useNavigation} from '@react-navigation/core';
import {useTranslation} from 'react-i18next';
import React, {useCallback, useState} from 'react';

import User from 'src/shared/models/User';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Button from 'src/shared/components/Button/Button';
import Headline from 'src/shared/components/Typography/Headline';
import TextInput from 'src/shared/components/Form/TextInput';
import Paragraph from 'src/shared/components/Typography/Paragraph';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import {ScanRoutes} from 'src/features/scan/ScanStackNavigator';
import theme from 'src/shared/theme/theme';
import LockIcon from 'src/shared/components/Icon/LockIcon';
import Description from 'src/shared/components/Typography/Description';
import UserService from 'src/shared/services/UserService';
import {useDispatch} from 'react-redux';
import {saveUserAction} from 'src/shared/redux/actions/userActions';

const ProfileScreen: React.FC = () => {
  const {t} = useTranslation();
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

    dispatch(saveUserAction.request(user));

    UserService.saveUser(user)
      .then(el => {
        saveUserAction.success(el);
        navigation.navigate(ScanRoutes.ScanQRCode);
      })
      .catch(error => saveUserAction.failure(error));
  };

  return (
    <TopLevelView>
      <Space.V s={15} />

      <Box>
        <Box width="50%">
          <Headline>{t('profileScreen:title')}</Headline>
        </Box>
        <Description>{t('profileScreen:subtitle')}</Description>
      </Box>

      <Space.V s={15} />

      <Box flex={1} flexDirection="column">
        <TextInput
          value={firstName}
          placeholder={t('profileScreen:firstName')}
          onChangeText={handleFirstNameChange}
        />
        <TextInput
          value={lastName}
          placeholder={t('profileScreen:lastName')}
          onChangeText={handleLastNameChange}
        />
        <TextInput
          placeholder={t('profileScreen:address')}
          value={address}
          onChangeText={handleAddressChange}
        />
        <TextInput
          value={phoneNumber}
          placeholder={t('profileScreen:phoneNumber')}
          onChangeText={handlePhoneNumberChange}
        />

        <Box display="flex" flexDirection="row" alignItems="center">
          <Box width="85%" display="flex" flexDirection="row" alignItems="center">
            <Box borderRadius={7} marginRight={20}>
              <LockIcon />
            </Box>
            <Box>
              <Description>{t('profileScreen:dataPrivacyInfo')}</Description>
            </Box>
          </Box>
        </Box>

        <Space.V s={15} />

        <Button onPress={handleSubmit}>{t('base:save')}</Button>
      </Box>
    </TopLevelView>
  );
};

export default ProfileScreen;
