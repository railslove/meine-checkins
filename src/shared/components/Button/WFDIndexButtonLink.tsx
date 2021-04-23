import React from 'react';
import {useTheme} from 'react-native-paper';
import {Text, TextStyle} from 'react-native';

import OpenLinkService from 'src/shared/services/OpenLinkService';
import {paragraphStyle} from 'src/shared/components/Typography/Paragraph';

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
    <Text style={textStyle} onPress={OpenLinkService.openWFDEmail}>
      {children}
    </Text>
  );
};

export default WFDIndexButtonLink;
