import React, { Component } from 'react';
import { View, Button, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { addPlace } from '../../store/actions/index';
import PlaceInput from '../../components/PlaceInput/PlaceInput';
import MainText from '../../components/UI/MainText/MainText';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';
import styles from './SharePlace.styles';
import validate from '../../utility/validation';

class SharePlaceScreen extends Component {
  static navigatorStyle = {
    navBarButtonColor: 'orange',
  };

  state = {
    controls: {
      placeName: {
        value: '',
        valid: false,
        touched: false,
        validationRules: {
          notEmpty: true,
        },
      },
      location: {
        value: null,
        valid: false,
      },
      image: {
        value: null,
        valid: false,
      },
    },
  };

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
  };

  placeChangedHandler = (val) => {
    this.setState((prevState) => ({
      controls: {
        ...prevState.controls,
        placeName: {
          ...prevState.controls.placeName,
          value: val,
          valid: validate(val, prevState.controls.placeName.validationRules),
          touched: true,
        },
      },
    }));
  };

  locationPickedHandler = (location) => {
    this.setState((prevState) => ({
      controls: {
        ...prevState.controls,
        location: {
          value: location,
          valid: true,
        },
      },
    }));
  };

  imagePickedHandler = (image) => {
    this.setState((prevState) => ({
      controls: {
        ...prevState.controls,
        image: {
          value: image,
          valid: true,
        },
      },
    }));
  };

  placeAddedHandler = () => {
    this.props.onAddPlace(
      this.state.controls.placeName.value,
      this.state.controls.location.value,
      this.state.controls.image.value,
    );
  };

  render() {
    let submitButton = (
      <Button
        title="Share the Place!"
        onPress={this.placeAddedHandler}
        disabled={
          !this.state.controls.placeName.valid ||
          !this.state.controls.location.valid ||
          !this.state.controls.image.valid
        }
      />
    );

    if (this.props.isLoading) {
      submitButton = <ActivityIndicator />;
    }
    return (
      <ScrollView>
        <View style={styles.container}>
          <MainText>
            <HeadingText>Share a place with us!</HeadingText>
          </MainText>
          <PickImage onImagePicked={this.imagePickedHandler} />
          <PickLocation onLocationPick={this.locationPickedHandler} />
          <PlaceInput
            placeData={this.state.controls.placeName}
            onChangeText={this.placeChangedHandler}
          />
          <View style={styles.button}>{submitButton}</View>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.ui.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
