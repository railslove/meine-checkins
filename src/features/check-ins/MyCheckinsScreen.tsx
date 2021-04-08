import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Title from 'src/shared/components/Typography/Title';
import ButtonLink from 'src/shared/components/Button/ButtonLink';
import TopLevelView from 'src/shared/components/Layout/TopLevelView';
import {useAppNavigation} from 'src/shared/hooks/navigationHooks';

import {CheckInsRoutes} from 'src/features/check-ins/CheckInsNavigator';

import Space from 'src/shared/components/Layout/Space';
import Box from 'src/shared/components/Layout/Box';
import SubTitle from 'src/shared/components/Typography/Subtitle';
import CheckInItemCard from 'src/features/check-ins/components/CheckInItemCard';

const SectionTitle: React.FC<{children: string}> = ({children}) => (
  <SubTitle textTransform="uppercase" fontWeight="700">
    {children}
  </SubTitle>
);

const MyCheckInsScreen: React.FC = () => {
  const {t} = useTranslation('myCheckInsScreen');
  const navigate = useAppNavigation();

  const {current, items} = useSelector(state => {
    const {current, items} = state.checkIns;
    return {current, items};
  });

  const goFAQ = () => navigate.navigate(CheckInsRoutes.FAQ);
  const goImprint = () => navigate.navigate(CheckInsRoutes.Imprint);

  return (
    <TopLevelView>
      <Space.V s={10} />
      <Title>{t('title')}</Title>

      {current ? (
        <>
          <Space.V s={5} />
          <Box>
            <SectionTitle>{t('activeCheckInTitle')}</SectionTitle>
            <Space.V s={10} />
            <CheckInItemCard {...current} />
          </Box>
        </>
      ) : null}

      {items.length ? (
        <>
          <Space.V s={10} />
          <Box>
            <SectionTitle>{t('previousCheckInsTitle')}</SectionTitle>
            <Space.V s={10} />
            {items.map((el, index) => {
              return (
                <Fragment key={el.id}>
                  {index > 0 ? <Space.V s={10} /> : null}
                  <CheckInItemCard {...el} />
                </Fragment>
              );
            })}
          </Box>
        </>
      ) : null}

      <Space.V s={10} />
      <ButtonLink onPress={goFAQ}>{t('faq')}</ButtonLink>
      <ButtonLink onPress={goImprint}>{t('imprint')}</ButtonLink>
    </TopLevelView>
  );
};

export default MyCheckInsScreen;
