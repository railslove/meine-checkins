import React from 'react';
import {useTranslation} from 'react-i18next';
import {TextInput} from 'react-native';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import Title from 'src/shared/components/Typography/Title';
import {toDpFromPixel} from 'src/shared/theme/util';

const DatenschutzScreen = () => {
  const {t} = useTranslation('datenschutz');

  return (
    <TopLevelView>
      <Title>{t('title')}</Title>
      <TextInput
        dataDetectorTypes={['link', 'phoneNumber']}
        editable={false}
        multiline={true}
        value={t('content')}
        style={{
          fontSize: toDpFromPixel(12),
          fontFamily: 'Inter-Regular',
        }}
      />
    </TopLevelView>
  );
};

export default React.memo(DatenschutzScreen);
