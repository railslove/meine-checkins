import React from 'react';

import Box from 'src/shared/components/Layout/Box';
import {px2dp} from 'src/shared/styles/createStyles';

export type ScanHighlightProps = {
  size?: number;
  zIndex: number;
  backgroundColor: string;
};

const CIRCLE_SIZE = px2dp(130);
const BORDER_WIDTH = px2dp(12);

const ScanHighlight: React.FC<ScanHighlightProps> = ({
  size = CIRCLE_SIZE,
  zIndex,
  backgroundColor,
}) => {
  return (
    <Box
      top={-1}
      left={0}
      right={0}
      bottom={0}
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        width="100%"
        height="100%"
        zIndex={zIndex + 1}
        position="absolute"
        backgroundColor={backgroundColor}
      />
      <Box
        top="-20%"
        width={size}
        height={size}
        zIndex={zIndex}
        borderWidth={BORDER_WIDTH}
        borderRadius={size / 2}
        borderColor="rgba(55, 114, 255, 0.05)"
      >
        <Box
          width="100%"
          height="100%"
          backgroundColor="rgba(55, 114, 255, 0.15)"
          borderRadius={size}
        />
      </Box>
    </Box>
  );
};

export default ScanHighlight;
