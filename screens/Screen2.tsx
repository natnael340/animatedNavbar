import {StyleSheet, View, Text} from 'react-native';
import React from 'react';

const Screen2 = () => {
  return (
    <View style={styles.container}>
      <Text>Screen 2</Text>
    </View>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
