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

const ImpressumScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text>ImpressumScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default ImpressumScreen;
