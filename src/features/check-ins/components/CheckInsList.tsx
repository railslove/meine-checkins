import React, {Fragment} from 'react';
import {useTranslation} from 'react-i18next';

import {formatItemDateHeader} from 'src/shared/format/date';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import TextBox from 'src/shared/components/Typography/TextBox';
import SectionTitle from 'src/shared/components/Typography/SectionTitle';
import CheckInItemCard from 'src/features/check-ins/components/CheckInItemCard';
import {CompletedCheckInItem, PartialCheckInItem} from 'src/shared/models/Provider';

export type CheckInsListProps = {
  items: CompletedCheckInItem[];
  current?: PartialCheckInItem;
  handleNavigateToCurrent?: () => void;
};

const CheckInsList: React.FC<CheckInsListProps> = props => {
  const {current, items, handleNavigateToCurrent} = props;

  const {t} = useTranslation('myCheckInsScreen');

  return (
    <>
      {current ? (
        <>
          <Space.V s={5} />
          <Box>
            <SectionTitle>{t('activeCheckInTitle')}</SectionTitle>
            <Space.V s={10} />
            <CheckInItemCard item={current} onNavigate={handleNavigateToCurrent} />
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
              const dateHeader = formatItemDateHeader(el.startTime);

              const prevDateHeader =
                index > 1 ? formatItemDateHeader(items[index].startTime) : dateHeader;

              return (
                <Fragment key={el.id}>
                  {index > 0 ? <Space.V s={5} /> : null}
                  {index === 0 || dateHeader !== prevDateHeader ? (
                    <>
                      <TextBox fontSize={12}>{formatItemDateHeader(el.startTime)}</TextBox>
                      <Space.V s={5} />
                    </>
                  ) : null}
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
