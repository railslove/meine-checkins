import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import createStyles, {px2dp} from 'src/shared/styles/createStyles';
import {hasCheckInItemTimedOut, PersitedCheckInItem} from 'src/shared/models/Provider';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import CheckInLogo, {LOGO_DIMENSIONS} from 'src/features/check-ins/components/CheckInLogo';
import {formatItemDate} from 'src/shared/format/date';
import ChevronRightIcon from 'src/shared/components/Icon/ArrowRightIcon';
import {useTranslation} from 'react-i18next';

const useStyles = () => {
  return createStyles({
    root: {
      minHeight: LOGO_DIMENSIONS.height,

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
  const {name, location, logoUrl, stopTime} = item;

  const styles = useStyles();

  const cardItem = (
    <View style={styles.root}>
      {logoUrl ? <CheckInLogo src={logoUrl} /> : null}

      <Box flex={1} marginLeft={px2dp(10)}>
        <Text style={styles.nameText}>{location || name}</Text>

        <Space.V s={1} />
        <Text style={styles.infoText}>
          {formatItemDate(item)}
          {isCurrent ? `-${t('active')}` : ` ${t('hour')}`}
        </Text>
        {!isCurrent && !stopTime && hasCheckInItemTimedOut(item) ? (
          <Text style={styles.infoText}>{t('checkedOutByService')}</Text>
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
