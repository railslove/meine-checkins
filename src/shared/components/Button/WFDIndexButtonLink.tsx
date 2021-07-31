import React from 'react';
import {useTheme} from 'react-native-paper';
import {TextStyle} from 'react-native';

import OpenLinkService from 'src/shared/services/OpenLinkService';
import {paragraphStyle} from 'src/shared/components/Typography/Paragraph';
import BaseText from '../Typography/BaseText';

export type WFDIndexButtonLinkProps = {
  styleProps?: TextStyle;
};

const WFDIndexButtonLink: React.FC<WFDIndexButtonLinkProps> = ({children, styleProps = {}}) => {
  const theme = useTheme();

  const textStyle: TextStyle = {
    ...paragraphStyle.root,
    color: theme.colors.primary,
    ...styleProps,
  };

  return (
    <BaseText style={textStyle} onPress={OpenLinkService.openWFDIndex}>
      {children}
    </BaseText>
  );
};

export default WFDIndexButtonLink;
