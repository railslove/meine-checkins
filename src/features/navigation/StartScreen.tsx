import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {MainStacRoutes} from 'src/features/navigation/MainStackNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    marginHorizontal: 12,
  },
});

const StartScreen: React.FC = () => {
  const navigation = useNavigation();
  const goNext = () => {
    navigation.navigate(MainStacRoutes.MainNavigation);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>StartScreen</Text>
        <Button title="Profile" onPress={goNext} />
      </View>
    </SafeAreaView>
  );
};

export default StartScreen;
