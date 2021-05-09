import React from 'react';
import QRCodeScanner, {RNQRCodeScannerProps} from 'react-native-qrcode-scanner';
import {Platform, StyleSheet, View, ViewStyle} from 'react-native';

import {toDpFromPixel} from 'src/shared/styles/util';
import Box from 'src/shared/components/Layout/Box';

const borderWidth = toDpFromPixel(3);
const borderRadius = Platform.select({
  android: toDpFromPixel(14),
  default: toDpFromPixel(24),
});

const borderStyleProps = ({top, right, bottom, left}: ViewStyle = {}): ViewStyle => {
  return {
    top,
    left,
    right,
    bottom,
    zIndex: 100,
    width: 30,
    height: 30,
    position: 'absolute',
    borderColor: '#3772FF',
    borderTopWidth: top ? borderWidth : 0,
    borderLeftWidth: left ? borderWidth : 0,
    borderRightWidth: right ? borderWidth : 0,
    borderBottomWidth: bottom ? borderWidth : 0,
    borderTopLeftRadius: top && left ? borderRadius : 0,
    borderTopRightRadius: top && right ? borderRadius : 0,
    borderBottomLeftRadius: bottom && left ? borderRadius : 0,
    borderBottomRightRadius: bottom && right ? borderRadius : 0,
  };
};

const useStyles = () => {
  const markerPad = -toDpFromPixel(12.5);
  const cameraSize = toDpFromPixel(200);

  return StyleSheet.create({
    dimensions: {
      width: cameraSize,
      height: cameraSize,
      zIndex: 100,
      borderRadius,
    },
    marker: {
      top: markerPad,
      left: markerPad,
      right: markerPad,
      bottom: markerPad,
      zIndex: 100,
      position: 'absolute',

      borderRadius,
    },
    markerTopLeft: borderStyleProps({
      top: '2.5%',
      left: '2.5%',
    }),
    markerTopRight: borderStyleProps({
      top: '2.5%',
      right: '2.5%',
    }),
    markerBottomLeft: borderStyleProps({
      left: '2.5%',
      bottom: '2.5%',
    }),
    markerBottomRight: borderStyleProps({
      right: '2.5%',
      bottom: '2.5%',
    }),
  });
};

export type QRScannerProps = RNQRCodeScannerProps & {
  backgroundColor?: string;
};

// eslint-disable-next-line react/display-name
const QRScanner: React.FC<QRScannerProps> = props => {
  const styles = useStyles();
  const {backgroundColor, ...restProps} = props;

  return (
    <QRCodeScanner
      reactivate
      reactivateTimeout={10000}
      showMarker={true}
      customMarker={
        <>
          <View style={styles.marker}>
            <View style={styles.markerTopLeft} />
            <View style={styles.markerTopRight} />
            <View style={styles.markerBottomLeft} />
            <View style={styles.markerBottomRight} />
          </View>
          {(Platform.OS === 'android' && (
            <>
              <Box
                zIndex={50}
                top={-toDpFromPixel(40)}
                height={toDpFromPixel(43)}
                left={0}
                right={0}
                position="absolute"
                backgroundColor={backgroundColor}
              />
              <Box
                zIndex={50}
                bottom={-toDpFromPixel(40)}
                height={toDpFromPixel(43)}
                left={0}
                right={0}
                position="absolute"
                backgroundColor={backgroundColor}
              />
            </>
          )) ||
            null}
        </>
      }
      cameraStyle={styles.dimensions}
      topViewStyle={styles.dimensions}
      containerStyle={styles.dimensions}
      {...restProps}
    />
  );
};

export default QRScanner;
