import React from 'react';
import SubTitle from 'src/shared/components/Typography/Subtitle';

const SectionTitle: React.FC<{children: string}> = ({children}) => (
  <SubTitle textTransform="uppercase" fontWeight="700">
    {children}
  </SubTitle>
);

export default SectionTitle;
