import React from 'react';

import {useNavigation} from '@react-navigation/core';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {ScanRoutes} from 'src/features/scan/ScanStackNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    marginHorizontal: 12,
  },
});

const ScanQRCodeScreen: React.FC = () => {
  const navigation = useNavigation();

  const goCheckIn = () => navigation.navigate(ScanRoutes.CheckInForm);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>ScanQRCodeScreen</Text>
        <Button title="CheckIn" onPress={goCheckIn} />
      </View>
    </SafeAreaView>
  );
};

export default ScanQRCodeScreen;
