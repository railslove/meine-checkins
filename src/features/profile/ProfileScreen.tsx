import React from 'react';
import {useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Controller, useForm} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

import User from 'src/shared/models/User';
import {toDpFromPixel} from 'src/shared/theme/util';
import {saveUserAction} from 'src/shared/redux/actions/userActions';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Button from 'src/shared/components/Button/Button';
import Title from 'src/shared/components/Typography/Title';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import LockIcon from 'src/shared/components/Icon/LockIcon';
import Subtitle from 'src/shared/components/Typography/Subtitle';
import Paragraph from 'src/shared/components/Typography/Paragraph';
import NavigationService from 'src/features/navigation/services/NavigationService';
import TextInput, {TextInputProps} from 'src/shared/components/Form/TextInput';

const ProfileScreen: React.FC = () => {
  const {t} = useTranslation('profileScreen');
  const user = useSelector(state => state.user.item);
  const theme = useTheme();
  const checkIns = useSelector(state => state.checkIns);

  const dispatch = useDispatch();

  const {
    control,
    formState: {errors},
    getValues,
    handleSubmit,
  } = useForm<User>({
    defaultValues: user,
  });

  const handleSave = handleSubmit(user => {
    dispatch(saveUserAction(user));
    NavigationService.fromProfileScreen(checkIns);
  });

  const renderTextInput = (name: keyof User, inputProps: TextInputProps = {}) => {
    return (
      <Controller
        name={name}
        rules={{required: true}}
        control={control}
        render={({field: {onChange, onBlur}}) => {
          const value = getValues(name);
          const label = t(name);
          const hasError = errors[name] != null;

          return (
            <TextInput
              name={name}
              dataDetectorTypes="all"
              {...inputProps}
              label={hasError ? label : undefined}
              value={value}
              error={hasError}
              onBlur={onBlur}
              placeholder={hasError ? undefined : label}
              onChangeText={value => onChange(value)}
            />
          );
        }}
      />
    );
  };

  return (
    <TopLevelView>
      <Space.V s={15} />

      <Box>
        <Title>{t('title')}</Title>
        <Subtitle>{t('subtitle')}</Subtitle>
      </Box>

      <Space.V s={10} />

      <Box flex={1} flexDirection="column">
        <Box display="flex" flexDirection="row">
          <Box flex={1}>
            {renderTextInput('firstName', {
              autoCompleteType: 'name',
            })}
          </Box>
          <Box flex={1} marginLeft={toDpFromPixel(5)}>
            {renderTextInput('lastName', {
              autoCompleteType: 'name',
            })}
          </Box>
        </Box>

        {renderTextInput('streetAddress', {
          autoCompleteType: 'street-address',
          dataDetectorTypes: 'address',
        })}

        <Box display="flex" flexDirection="row">
          <Box flex={1}>
            {renderTextInput('postalCode', {
              keyboardType: 'number-pad',
              autoCompleteType: 'postal-code',
              dataDetectorTypes: 'phoneNumber',
            })}
          </Box>
          <Box flex={1} marginLeft={toDpFromPixel(5)}>
            {renderTextInput('city', {
              autoCompleteType: 'street-address',
              dataDetectorTypes: 'address',
            })}
          </Box>
        </Box>

        {renderTextInput('phoneNumber', {
          keyboardType: 'phone-pad',
          autoCompleteType: 'tel',
        })}

        <Space.V s={5} />
        <Box
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          marginHorizontal="7.5%"
        >
          <Box display="flex" flexDirection="row" alignItems="flex-start">
            <Box
              borderRadius={theme.roundness}
              marginRight={toDpFromPixel(20)}
              marginTop={toDpFromPixel(5)}
            >
              <LockIcon />
            </Box>
            <Box>
              <Paragraph>{t('dataPrivacyInfo')}</Paragraph>
            </Box>
          </Box>

          <Space.V s={10} />
          <Button fullWidth onPress={handleSave}>
            {t('submit')}
          </Button>
        </Box>
      </Box>
    </TopLevelView>
  );
};

export default ProfileScreen;
