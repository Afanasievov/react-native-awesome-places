import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

import styles from './PickLocation.styles';

class PickLocation extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Text>Map</Text>
        </View>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={() => alert('Pick Location')} />
        </View>
      </View>
    );
  }
}

export default PickLocation;
