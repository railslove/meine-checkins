import React, {Fragment} from 'react';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import SubTitle from 'src/shared/components/Typography/Subtitle';
import CheckInItemCard from 'src/features/check-ins/components/CheckInItemCard';
import {CompletedCheckInItem, PartialCheckInItem} from 'src/shared/models/Provider';
import {useTranslation} from 'react-i18next';

const SectionTitle: React.FC<{children: string}> = ({children}) => (
  <SubTitle textTransform="uppercase" fontWeight="700">
    {children}
  </SubTitle>
);

export type CheckInsListProps = {
  items: CompletedCheckInItem[];
  current?: PartialCheckInItem;
  activeTimeText: string;
  handleNavigateToCurrent?: () => void;
};

const CheckInsList: React.FC<CheckInsListProps> = props => {
  const {current, items, activeTimeText, handleNavigateToCurrent} = props;

  const {t} = useTranslation('myCheckInsScreen');

  return (
    <>
      {current ? (
        <>
          <Space.V s={5} />
          <Box>
            <SectionTitle>{t('activeCheckInTitle')}</SectionTitle>
            <Space.V s={10} />
            <CheckInItemCard
              item={current}
              activeTimeText={activeTimeText}
              onNavigate={handleNavigateToCurrent}
            />
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
                  {index > 0 ? <Space.V s={5} /> : null}
                  <CheckInItemCard item={el} />
                </Fragment>
              );
            })}
          </Box>
        </>
      ) : null}
    </>
  );
};

export default CheckInsList;
