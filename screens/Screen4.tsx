import {StyleSheet, View, Text} from 'react-native';
import React from 'react';

const Screen4 = () => {
  return (
    <View style={styles.container}>
      <Text>Screen 4</Text>
    </View>
  );
};

export default Screen4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
