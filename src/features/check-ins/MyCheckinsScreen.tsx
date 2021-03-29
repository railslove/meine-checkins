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

const MyCheckInsScreen: React.FC = () => {
  const navigate = useNavigation();

  const goFAQ = () => navigate.navigate(CheckInsRoutes.FAQ);
  const goImpressum = () => navigate.navigate(CheckInsRoutes.Impressum);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>MyCheckInsScreen</Text>
        <Button title="FAQ" onPress={goFAQ} />
        <Button title="Impressum" onPress={goImpressum} />
      </View>
    </SafeAreaView>
  );
};

export default MyCheckInsScreen;
