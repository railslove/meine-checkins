import React from 'react';
import {Dimensions, StyleSheet, View, ViewStyle} from 'react-native';
import QRCodeScanner, {RNQRCodeScannerProps} from 'react-native-qrcode-scanner';
import {toDpFromPixel} from 'src/shared/theme/util';

const borderWidth = toDpFromPixel(3);
const borderRadius = toDpFromPixel(24);

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
  const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

  return StyleSheet.create({
    dimensions: {
      width: windowWidth * 0.6,
      height: windowWidth * 0.6,
      position: 'relative',
      borderRadius,
    },
    marker: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 100,
      position: 'absolute',
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

export type QRScannerProps = RNQRCodeScannerProps;

// eslint-disable-next-line react/display-name
const QRScanner: React.FC<QRScannerProps> = props => {
  const styles = useStyles();

  return (
    <QRCodeScanner
      reactivate
      reactivateTimeout={10000}
      showMarker={true}
      customMarker={
        <View style={styles.marker}>
          <View style={styles.markerTopLeft} />
          <View style={styles.markerTopRight} />
          <View style={styles.markerBottomLeft} />
          <View style={styles.markerBottomRight} />
        </View>
      }
      cameraStyle={styles.dimensions}
      topViewStyle={styles.dimensions}
      containerStyle={styles.dimensions}
      {...props}
    />
  );
};

export default QRScanner;
