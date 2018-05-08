import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import HeadingText from '../HeadingText/HeadingText';
import MainText from '../MainText/MainText';
import styles from './AppNotification.styles';
import { UNEXPECTED_ERROR } from '../../../constants/messages';

export default class AppNotification extends Component {
  closeNotification = () => this.props.navigator.dismissInAppNotification();

  render() {
    return (
      <View style={styles.screen}>
        <View style={[styles.container, styles[this.props.type]]}>
          <View style={styles.headingContainer}>
            <HeadingText style={styles.headingText}>{this.props.heading}</HeadingText>
            <TouchableOpacity onPress={this.closeNotification}>
              <Icon size={30} name="md-close-circle" color="#fff" />
            </TouchableOpacity>
          </View>
          <MainText style={styles.message}>{this.props.message || UNEXPECTED_ERROR}</MainText>
        </View>
      </View>
    );
  }
}
