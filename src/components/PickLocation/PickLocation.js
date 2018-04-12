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
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122,
    },
    locationChosen: false,
  };

  pickLocationHandler = (event) => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    this.setState((prevState) => ({
      focusedLocation: {
        ...prevState.focusedLocation,
        latitude: coords.latitude,
        longitude: coords.longitude,
      },
      locationChosen: true,
    }));
    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coordsEvent = {
          nativeEvent: {
            coordinate: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          },
        };
        this.pickLocationHandler(coordsEvent);
      },
      (err) => {
        console.log(`Error: ${err}`);
      },
    );
  };

  render() {
    let marker = null;
    if (this.state.locationChosen) {
      marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={(ref) => {
            this.map = ref;
          }}
        >
          {marker}
        </MapView>
        <View style={styles.button}>
          <Button title="Locate Me" onPress={this.getLocationHandler} />
        </View>
      </View>
    );
  }
}

export default PickLocation;
