import {StyleSheet, View, Text} from 'react-native';
import React from 'react';

const Screen1 = () => {
  return (
    <View style={styles.container}>
      <Text>Screen 1</Text>
    </View>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
