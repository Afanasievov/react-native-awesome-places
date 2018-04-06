import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import PlaceList from '../../components/PlaceList/PlaceList';
import styles from './FindPlace.styles';

class FindPlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange',
  }

  state = {
    placesLoaded: false,
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'sideDrawerToggle') {
        this.props.navigator.toggleDrawer({
          side: 'left',
        });
      }
    }
  }

  placesSearchHandler = () => {
    this.setState({
      placesLoaded: true,
    });
  }
  itemSelectedHandler = (key) => {
    const selPlace = this.props.places.find(place => place.key === key);
    this.props.navigator.push({
      screen: 'awesome-places.PlaceDetailScreen',
      title: selPlace.name,
      passProps: {
        selectedPlace: selPlace,
      },
    });
  }

  render() {
    let content = (
      <TouchableOpacity onPress={this.placesSearchHandler}>
        <View style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Find Places</Text>
        </View>
      </TouchableOpacity>
    );

    if (this.state.placesLoaded) {
      content = (
        <PlaceList places={this.props.places} onItemSelected={this.itemSelectedHandler} />
      );
    }

    return (
      <View>
        {content}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  places: state.places.places,
});

export default connect(mapStateToProps)(FindPlaceScreen);
