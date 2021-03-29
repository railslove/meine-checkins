import {useNavigation} from '@react-navigation/core';
import React from 'react';
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

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const goNext = () => navigation.navigate(CheckInsRoutes.MyCheckIns);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>ProfileScreen</Text>
        <Button title="save" onPress={goNext} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
