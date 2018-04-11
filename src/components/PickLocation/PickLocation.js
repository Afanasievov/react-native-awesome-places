import React, { Component } from 'react';
import { View, Button, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

import styles from './PickLocation.styles';

class PickLocation extends Component {
  state = {
    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta:
        (Dimensions.get('window').width /
        Dimensions.get('window').height) *
        0.0122,
    },
  }
  render() {
    return (
      <View style={styles.container}>
        <MapView
          region={this.state.focusedLocation}
          style={styles.map}
        />
        <View style={styles.button}>
          <Button title="Locate Me" onPress={() => alert('Pick Location')} />
        </View>
      </View>
    );
  }
}

export default PickLocation;
