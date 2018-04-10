import React, { Component } from 'react';
import {
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';

import startMainTabs from '../MainTabs/startMainTabs';
import DefaultInput from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../assets/Background.jpg';
import styles from './Auth.styles';
import validate from '../../utility/validation';

class AuthScreen extends Component {
  state = {
    viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
    controls: {
      email: {
        value: '',
        valid: false,
        validationRules: {
          email: true,
        },
      },
      password: {
        value: '',
        valid: false,
        validationRules: {
          minLength: 6,
        },
      },
      confirmPassword: {
        value: '',
        valid: false,
        validationRules: {
          equalTo: 'password',
        },
      },
    },
  };

  constructor(props) {
    super(props);
    Dimensions.addEventListener('change', this.updateStyles);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyles);
  }

  updateStyles = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape',
    });
  };

  loginHandler = () => {
    startMainTabs();
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue,
      };
    }
    if (key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value,
      };
    }
    this.setState(prevState => ({
      controls: {
        ...prevState.controls,
        confirmPassword: {
          ...prevState.controls.confirmPassword,
          valid: key === 'password'
            ? validate(
              prevState.controls.confirmPassword.value,
              prevState.controls.confirmPassword.validationRules,
              connectedValue,
            )
            : prevState.controls.confirmPassword.valid,
        },
        [key]: {
          ...prevState.controls[key],
          value,
          valid: validate(value, prevState.controls[key].validationRules, connectedValue),
        },
      },
    }));
  }

  render() {
    let headingText = null;

    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={styles.container}>
          {headingText}
          <ButtonWithBackground color="#29aaf4" onPress={() => alert('hello')}>
            Switch To Login
          </ButtonWithBackground>
          <View style={styles.inputContainer}>
            <DefaultInput
              placeholder="Your E-Mail Address"
              style={styles.input}
              value={this.state.controls.email.value}
              onChangeText={val => this.updateInputState('email', val)}
            />
            <View
              style={
                this.state.viewMode === 'portrait'
                  ? styles.portraitPasswordContainer
                  : styles.landscapePasswordContainer
              }
            >
              <View
                style={
                  this.state.viewMode === 'portrait'
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput
                  placeholder="Password"
                  style={styles.input}
                  value={this.state.controls.password.value}
                  onChangeText={val => this.updateInputState('password', val)}
                />
              </View>
              <View
                style={
                  this.state.viewMode === 'portrait'
                    ? styles.portraitPasswordWrapper
                    : styles.landscapePasswordWrapper
                }
              >
                <DefaultInput
                  placeholder="Confirm Password"
                  style={styles.input}
                  value={this.state.controls.confirmPassword.value}
                  onChangeText={val => this.updateInputState('confirmPassword', val)}
                />
              </View>
            </View>
          </View>
          <ButtonWithBackground color="#29aaf4" onPress={this.loginHandler}>
            Submit
          </ButtonWithBackground>
        </View>
      </ImageBackground>
    );
  }
}

export default AuthScreen;
