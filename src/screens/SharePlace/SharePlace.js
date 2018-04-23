import React, { Component } from 'react';
import { View, Button, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { addPlace, startAddPlace } from '../../store/actions/index';
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

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  reset = () =>
    this.setState({
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
    });

  componentWillMount() {
    this.reset();
  }

  componentDidUpdate() {
    if (this.props.placeAdded) {
      this.props.navigator.switchToTab({ tabIndex: 0 });
      // this.props.onAddPlace()
    }
  }
  onNavigatorEvent = (event) => {
    if (event.type === 'ScreenChangedEvent') {
      if (event.id === 'willAppear') {
        this.props.onStartAddPlace();
      }
    }
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
    this.reset();
    this.imagePicker.reset();
    this.locationPicker.reset();
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
          <PickImage
            onImagePicked={this.imagePickedHandler}
            ref={(ref) => {
              this.imagePicker = ref;
            }}
          />
          <PickLocation
            onLocationPick={this.locationPickedHandler}
            ref={(ref) => {
              this.locationPicker = ref;
            }}
          />
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
  placeAdded: state.places.placeAdded,
});

const mapDispatchToProps = (dispatch) => ({
  onAddPlace: (placeName, location, image) => dispatch(addPlace(placeName, location, image)),
  onStartAddPlace: () => dispatch(startAddPlace()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SharePlaceScreen);
