import {useTheme} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Animated, Easing} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import User from 'src/shared/models/User';
import {px2dp} from 'src/shared/styles/createStyles';
import {saveUserAction} from 'src/shared/redux/actions/userActions';
import NavigationService from 'src/features/navigation/services/NavigationService';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import Button from 'src/shared/components/Button/Button';
import Title from 'src/shared/components/Typography/Title';
import TextBox from 'src/shared/components/Typography/TextBox';
import LockIcon from 'src/shared/components/Icon/LockIcon';
import Subtitle from 'src/shared/components/Typography/Subtitle';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import CircledCheckIcon from 'src/shared/components/Icon/CircledCheckIcon';
import TextInput, {TextInputProps} from 'src/shared/components/Form/TextInput';

const ProfileScreen: React.FC = () => {
  const {t} = useTranslation('profileScreen');
  const theme = useTheme();

  const user = useSelector(state => state.user.item);
  const checkIns = useSelector(state => state.checkIns);

  const dispatch = useDispatch();

  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const [isAnimated, setIsAnimated] = useState(false);

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

    setIsAnimated(true);

    Animated.timing(fadeAnim, {
      easing: Easing.cubic,
      toValue: 100,
      duration: 750,
      useNativeDriver: false,
    }).start(() => {
      setTimeout(() => {
        NavigationService.fromProfileScreen(checkIns);
        setIsAnimated(false);
      }, 150);
    });
  });

  const renderTextInput = (name: keyof User, inputProps: TextInputProps = {}) => {
    const isRequired = name !== 'email';

    return (
      <Controller
        name={name}
        rules={{required: isRequired}}
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

      <Space.V s={15} />

      <Box flex={1} flexDirection="column">
        <Box display="flex" flexDirection="row">
          <Box flex={1}>
            {renderTextInput('firstName', {
              autoCompleteType: 'name',
            })}
          </Box>
          <Box flex={1.5} marginLeft={px2dp(5)}>
            {renderTextInput('lastName', {
              autoCompleteType: 'name',
            })}
          </Box>
        </Box>

        <Box display="flex" flexDirection="row">
          <Box flex={2}>
            {renderTextInput('streetAddress', {
              autoCompleteType: 'street-address',
              dataDetectorTypes: 'address',
            })}
          </Box>
          <Box flex={1} marginLeft={px2dp(5)}>
            {renderTextInput('postalCode', {
              keyboardType: 'number-pad',
              autoCompleteType: 'postal-code',
              dataDetectorTypes: 'phoneNumber',
            })}
          </Box>
        </Box>

        <Box display="flex" flexDirection="row">
          <Box flex={1}>
            {renderTextInput('city', {
              autoCompleteType: 'street-address',
              dataDetectorTypes: 'address',
            })}
          </Box>
          <Box flex={1.5} marginLeft={px2dp(5)}>
            {renderTextInput('phoneNumber', {
              keyboardType: 'phone-pad',
              autoCompleteType: 'tel',
              dataDetectorTypes: 'phoneNumber',
            })}
          </Box>
        </Box>

        {renderTextInput('email', {
          keyboardType: 'email-address',
          autoCompleteType: 'email',
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
            <Box borderRadius={theme.roundness} marginRight={px2dp(20)} marginTop={px2dp(5)}>
              <LockIcon />
            </Box>
            <Box>
              <TextBox fontSize={12} lineHeight={16.72} fontWeight="600">
                {t('dataPrivacyInfo')}
              </TextBox>
            </Box>
          </Box>

          <Space.V s={10} />
          <Button fullWidth onPress={handleSave}>
            <Box
              height={20}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row"
            >
              <Animated.View
                style={
                  isAnimated
                    ? {
                        opacity: Animated.divide(fadeAnim, 100),
                        marginRight: 10,
                      }
                    : {
                        display: 'none',
                      }
                }
              >
                <CircledCheckIcon />
              </Animated.View>
              <Animated.View
                style={
                  isAnimated
                    ? {
                        opacity: Animated.divide(fadeAnim, 100),
                      }
                    : undefined
                }
              >
                <TextBox color="white" fontSize={13} textTransform="uppercase" fontWeight="bold">
                  {isAnimated ? t('saved') : t('save')}
                </TextBox>
              </Animated.View>
            </Box>
          </Button>
        </Box>
      </Box>
    </TopLevelView>
  );
};

export default ProfileScreen;
