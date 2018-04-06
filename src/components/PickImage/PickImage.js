import React, { Component } from 'react';
import { View, Image, Button } from 'react-native';

import ImagePlaceholder from '../../assets/beautiful-place.jpg';
import styles from './PickImage.styles';

class PickImage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={ImagePlaceholder} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={() => alert('Pick Image')} />
        </View>
      </View>
    );
  }
}

export default PickImage;
