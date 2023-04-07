import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {
  Circle,
  Text as SvgText,
  TextPath,
  TSpan,
  G,
  Svg,
} from 'react-native-svg';

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
    backgroundColor: '#F1F1F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
