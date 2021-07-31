import React from 'react';

import Box from 'src/shared/components/Layout/Box';
import Space from 'src/shared/components/Layout/Space';
import ButtonLink from 'src/shared/components/Button/ButtonLink';
import {TEST_PROVIDERS} from 'src/testData';
import {PartialCheckInItem} from 'src/shared/models/Provider';

export type DebugProvidersListProps = {
  onClear: () => void;
  onSubmit: (el: PartialCheckInItem) => () => void;
};

const DebugProvidersList: React.FC<DebugProvidersListProps> = ({onSubmit, onClear}) => (
  <>
    <Space.V s={10} />
    <Box display="flex" flexDirection="row" maxWidth="100%" flexWrap="wrap">
      {TEST_PROVIDERS.map(el => {
        return (
          <ButtonLink key={el.id} onPress={onSubmit(el)}>
            {'  ' + el.name + '  '}
          </ButtonLink>
        );
      })}
    </Box>
    <Space.V s={10} />
    <ButtonLink onPress={onClear}>CLEAR CHECKIN DATA</ButtonLink>
  </>
);

export default DebugProvidersList;
