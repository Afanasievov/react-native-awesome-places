import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Text, View, Platform } from 'react-native';
import styles from './ButtonWitBackground.styles';

const buttonWithBackground = (props) => {
  const content = (
    <View
      style={[
        styles.button,
        { backgroundColor: props.color },
        props.disabled ? styles.disabled : null,
      ]}
    >
      <Text style={props.disabled ? styles.disabled : null}>{props.children}</Text>
    </View>
  );

  if (props.disabled) {
    return content;
  }
  if (Platform.OS === 'android') {
    return <TouchableNativeFeedback onPress={props.onPress}>{content}</TouchableNativeFeedback>;
  }
  return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>;
};

export default buttonWithBackground;
