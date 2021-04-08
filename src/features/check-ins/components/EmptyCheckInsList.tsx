import React, {Fragment} from 'react';
import EmptyCheckInItemCard from 'src/features/check-ins/components/EmptyCheckInItemCard';
import {EMPTY_CHECK_INS_ITEMS} from 'src/features/check-ins/components/constants';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';

const EmptyCheckInsList: React.FC = () => {
  return (
    <Box display="flex" flexDirection="row">
      <Box width="45%" />

      <Box flex={1} display="flex" flexDirection="column">
        {EMPTY_CHECK_INS_ITEMS.map((el, index) => (
          <Fragment key={index}>
            <Space.V s={5} />
            <EmptyCheckInItemCard source={el.logoUrl} />
          </Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default EmptyCheckInsList;
