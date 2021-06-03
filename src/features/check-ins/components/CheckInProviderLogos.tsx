import React from 'react';

import CHECK_IN_PROVIDER_LIST from 'src/shared/services/checkInProvidersList';

import Box, {BoxProps} from 'src/shared/components/Layout/Box';
import CheckInLogo from 'src/features/check-ins/components/CheckInLogo';
import {EMPTY_CHECK_IN_LOGO_DIMENSIONS} from 'src/features/check-ins/components/constants';

export type CheckInProviderLogosProps = BoxProps & {
  displayCount?: number;
};

const randomSort = () => 0.5 - Math.random();

const CheckInProviderLogos: React.FC<CheckInProviderLogosProps> = ({
  displayCount = 5,
  ...props
}) => {
  return (
    <Box
      opacity={0.8}
      flexWrap="wrap"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      {...props}
    >
      {CHECK_IN_PROVIDER_LIST.slice()
        .sort(randomSort)
        .slice(0, displayCount)
        .map(el => {
          return (
            <Box key={el.name}>
              <CheckInLogo src={el.logoUrl} dimensions={EMPTY_CHECK_IN_LOGO_DIMENSIONS} />
            </Box>
          );
        })}
    </Box>
  );
};

export default CheckInProviderLogos;
