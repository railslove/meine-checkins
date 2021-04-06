import React from 'react';
import {Dimensions, StyleSheet, View, ViewStyle} from 'react-native';
import QRCodeScanner, {RNQRCodeScannerProps} from 'react-native-qrcode-scanner';

const borderStyleProps = ({top, right, bottom, left}: ViewStyle = {}): ViewStyle => {
  const borderWidth = 3;
  const borderRadius = 24;

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
    root: {
      flex: 1,
      height: windowHeight * 0.8,
      display: 'flex',
      position: 'relative',
      alignItems: 'center',
      justifyContent: 'center',
    },
    marker: {
      top: 5,
      zIndex: 100,
      width: windowWidth,
      height: windowWidth,
      padding: 5,
      position: 'absolute',
    },
    markerTopLeft: borderStyleProps({
      top: '15%',
      left: '15%',
    }),
    markerTopRight: borderStyleProps({
      top: '15%',
      right: '15%',
    }),
    markerBottomLeft: borderStyleProps({
      left: '15%',
      bottom: '15%',
    }),
    markerBottomRight: borderStyleProps({
      right: '15%',
      bottom: '15%',
    }),
  });
};

export type QRScannerProps = RNQRCodeScannerProps;

// eslint-disable-next-line react/display-name
const QRScanner: React.FC<QRScannerProps> = props => {
  const styles = useStyles();

  return (
    <View style={styles.root}>
      <QRCodeScanner
        showMarker={true}
        customMarker={
          <View style={styles.marker}>
            <View style={styles.markerTopLeft} />
            <View style={styles.markerTopRight} />
            <View style={styles.markerBottomLeft} />
            <View style={styles.markerBottomRight} />
          </View>
        }
        {...props}
      />
    </View>
  );
};

export default QRScanner;
