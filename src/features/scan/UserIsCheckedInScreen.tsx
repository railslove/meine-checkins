import React from 'react';
import {useTranslation} from 'react-i18next';

import {px2dp} from 'src/shared/styles/createStyles';

import Space from 'src/shared/components/Layout/Space';
import Title from 'src/shared/components/Typography/Title';
import Button from 'src/shared/components/Button/Button';
import SubTitle from 'src/shared/components/Typography/Subtitle';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';

export type UserIsCheckedInScreenProps = {
  backgroundColor: string;
  onGoToCheckOut: () => void;
  onDiscardCheckIn: () => void;
};

const UserIsCheckedInScreen: React.FC<UserIsCheckedInScreenProps> = ({
  backgroundColor,
  onGoToCheckOut,
  onDiscardCheckIn,
}) => {
  const {t} = useTranslation('scanQRCodeScreen');

  return (
    <TopLevelView
      flex={1}
      display="flex"
      flexDirection="column"
      paddingHorizontal={px2dp(30)}
      backgroundColor={backgroundColor}
    >
      <Space.V s={40} />
      <Title color="white" split={false}>
        {t('checkInProgressTitle')}
      </Title>
      <Space.V s={15} />
      <SubTitle color="white">{t('checkInProgressSubTitle')}</SubTitle>
      <Space.V s={25} />

      <Button fullWidth={true} onPress={onGoToCheckOut}>
        {t('checkInProgressContinue')}
      </Button>

      <Space.V s={10} />
      <Button fullWidth={true} mode="text" onPress={onDiscardCheckIn}>
        {t('checkInProgressDiscard')}
      </Button>
    </TopLevelView>
  );
};

export default UserIsCheckedInScreen;
