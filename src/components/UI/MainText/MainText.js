import React from 'react';
import { Text } from 'react-native';

import styles from './MainText.styles';

const mainText = (props) => <Text style={[styles.mainText, props.style]}>{props.children}</Text>;

export default mainText;
