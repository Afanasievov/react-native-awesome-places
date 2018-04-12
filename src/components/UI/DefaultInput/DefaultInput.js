import React from 'react';
import { TextInput } from 'react-native';

import styles from './DefaultInput.styles';

const defaultInput = (props) => (
  <TextInput
    underlineColorAndroid="transparent"
    {...props}
    style={[styles.input, props.style, !props.valid && props.touched ? styles.invalid : null]}
  />
);

export default defaultInput;
