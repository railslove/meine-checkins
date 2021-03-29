import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {CheckInsRoutes} from 'src/features/check-ins/CheckInsNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    marginHorizontal: 12,
  },
});

const CheckOutFormScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const goCheckIn = () => navigate(CheckInsRoutes.MyCheckIns);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>CheckOutFormScreen</Text>
        <Button title="CheckOut" onPress={goCheckIn} />
      </View>
    </SafeAreaView>
  );
};

export default CheckOutFormScreen;
