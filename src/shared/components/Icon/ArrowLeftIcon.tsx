import React from 'react';
import Box from 'src/shared/components/Layout/Box';
import ArrowRightIcon from 'src/shared/components/Icon/ArrowRightIcon';

const ArrowLeftIcon: React.FC = () => (
  <Box transform={[{rotate: '180deg'}]}>
    <ArrowRightIcon />
  </Box>
);

export default ArrowLeftIcon;
