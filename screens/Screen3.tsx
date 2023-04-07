import {StyleSheet, View, Text} from 'react-native';
import React from 'react';

const Screen3 = () => {
  return (
    <View style={styles.container}>
      <Text>Screen 3</Text>
    </View>
  );
};

export default Screen3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
