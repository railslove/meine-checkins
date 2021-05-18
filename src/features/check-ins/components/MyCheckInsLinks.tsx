import React, {Fragment, useCallback} from 'react';
import {useTranslation} from 'react-i18next';

import NavigationService from 'src/features/navigation/services/NavigationService';
import OpenLinkService, {EXTERNAL_LINKS} from 'src/shared/services/OpenLinkService';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import ButtonLink from 'src/shared/components/Button/ButtonLink';
import {MyCheckInsRoutes} from 'src/features/navigation/routes';

const MyCheckInsLinks = () => {
  const {t} = useTranslation('myCheckInsScreen');

  const handleNavigateFAQ = useCallback(() => {
    NavigationService.fromMyCheckIns(MyCheckInsRoutes.FAQ);
  }, []);

  return (
    <Box>
      <Space.V s={7.5} />
      <ButtonLink onPress={handleNavigateFAQ}>{t('faq')}</ButtonLink>
      {EXTERNAL_LINKS.map(name => {
        const handleOpenLink = () => {
          OpenLinkService.openExternalURL(name);
        };

        return (
          <Fragment key={name}>
            <Space.V s={7.5} />
            <ButtonLink onPress={handleOpenLink}>{t(name)}</ButtonLink>
          </Fragment>
        );
      })}
    </Box>
  );
};

export default MyCheckInsLinks;
