import React, {Fragment} from 'react';
import {useTranslation} from 'react-i18next';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import SectionTitle from 'src/shared/components/Typography/SectionTitle';
import CheckInItemCard from 'src/features/check-ins/components/CheckInItemCard';
import {PartialCheckInItem, PersitedCheckInItem} from 'src/shared/models/Provider';

export type CheckInsListProps = {
  items: PersitedCheckInItem[];
  current?: PartialCheckInItem;
  handleNavigateToCurrent?: () => void;
};

const CheckInsList: React.FC<CheckInsListProps> = props => {
  const {current, handleNavigateToCurrent} = props;

  const {t} = useTranslation('myCheckInsScreen');

  const id = current?.id;
  const items = id != null ? props.items.filter(el => el.id !== id) : props.items;

  return (
    <>
      {current ? (
        <>
          <Space.V s={5} />
          <Box>
            <SectionTitle>{t('activeCheckInTitle')}</SectionTitle>
            <Space.V s={10} />
            <CheckInItemCard item={current} isCurrent={true} onNavigate={handleNavigateToCurrent} />
          </Box>
        </>
      ) : null}

      {items.length ? (
        <>
          <Space.V s={10} />
          <Box>
            <SectionTitle>{t('previousCheckInsTitle')}</SectionTitle>
            <Space.V s={10} />
            {items.map((el, index) => (
              <Fragment key={el.id}>
                {index > 0 ? <Space.V s={5} /> : null}
                <CheckInItemCard item={el} isCurrent={false} />
              </Fragment>
            ))}
          </Box>
        </>
      ) : null}
    </>
  );
};

export default CheckInsList;
