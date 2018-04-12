import React from 'react';
import { Text } from 'react-native';

import styles from './HeadingText.styles';

const headingText = (props) => (
  <Text {...props} style={[styles.textHeading, props.style]}>
    {props.children}
  </Text>
);

export default headingText;
