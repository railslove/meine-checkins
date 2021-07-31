import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, TouchableOpacity} from 'react-native';

import {formatItemDate} from 'src/shared/format/date';
import createStyles, {px2dp} from 'src/shared/styles/createStyles';
import {hasCheckInItemTimedOut, PersitedCheckInItem} from 'src/shared/models/Provider';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import BaseText from 'src/shared/components/Typography/BaseText';
import ChevronRightIcon from 'src/shared/components/Icon/ArrowRightIcon';
import CheckInLogo, {CHECKIN_LOGO_DIMENSIONS} from 'src/features/check-ins/components/CheckInLogo';

const useStyles = () => {
  return createStyles({
    root: {
      minHeight: CHECKIN_LOGO_DIMENSIONS.height,

      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      paddingVertical: 9,
      paddingHorizontal: 10,

      borderRadius: 5,
      backgroundColor: '#F0F1F3',
    },
    rootTouchable: {
      display: 'flex',
    },
    nameText: {
      textAlign: 'left',
      fontSize: 12,

      fontFamily: 'Inter-Bold',
      fontWeight: '700',
      lineHeight: 15,
    },
    infoText: {
      textAlign: 'left',
      fontSize: 12,
      lineHeight: 15,
    },
  });
};

export type CheckInItemCardProps = {
  item: PersitedCheckInItem;
  isCurrent: boolean;
  onNavigate?: () => void;
};

const CheckInItemCard: React.FC<CheckInItemCardProps> = props => {
  const {t} = useTranslation('myCheckInsScreen');
  const {item, isCurrent, onNavigate} = props;
  const {name, location, logoUrl, logoLarge, stopTime} = item;

  const styles = useStyles();

  const cardItem = (
    <View style={styles.root}>
      <CheckInLogo src={logoLarge || logoUrl} />

      <Box flex={1} marginLeft={px2dp(10)}>
        <BaseText style={styles.nameText}>{location || name}</BaseText>

        <Space.V s={1} />
        <BaseText style={styles.infoText}>
          {formatItemDate(item)}
          {isCurrent ? `-${t('active')}` : ` ${t('hour')}`}
        </BaseText>
        {!isCurrent && !stopTime && hasCheckInItemTimedOut(item) ? (
          <BaseText style={styles.infoText}>{t('checkedOutByService')}</BaseText>
        ) : null}
      </Box>

      {isCurrent ? (
        <Box marginHorizontal={px2dp(10)}>
          <ChevronRightIcon />
        </Box>
      ) : null}
    </View>
  );

  if (!isCurrent) {
    return cardItem;
  }

  return (
    <TouchableOpacity style={styles.rootTouchable} onPress={onNavigate}>
      {cardItem}
    </TouchableOpacity>
  );
};

export default CheckInItemCard;
