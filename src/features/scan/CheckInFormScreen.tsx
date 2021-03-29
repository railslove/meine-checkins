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

const CheckInFormScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const goCheckIn = () => navigate(ScanRoutes.CheckOutForm);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>CheckInFormScreen</Text>
        <Button title="CheckOut" onPress={goCheckIn} />
      </View>
    </SafeAreaView>
  );
};

export default CheckInFormScreen;
