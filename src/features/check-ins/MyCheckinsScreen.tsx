import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    marginHorizontal: 12,
  },
});

const MyCheckInsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>MyCheckInsScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default MyCheckInsScreen;
