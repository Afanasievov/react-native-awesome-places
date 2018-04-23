import React, { Component } from 'react';
import { View, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import styles from './PickImage.styles';

class PickImage extends Component {
  reset = () =>
    this.setState({
      pickedImage: null,
    });

  componentWillMount() {
    this.reset();
  }
  pickImageHandler = () => {
    ImagePicker.showImagePicker(
      { title: 'Pick an Image', maxWidth: 500, maxHeight: 500 },
      (res) => {
        if (res.didCancel) {
          console.log('User cancelled!');
        } else if (res.error) {
          console.log('Error', res.error);
        } else {
          this.setState({
            pickedImage: { uri: res.uri },
          });
          this.props.onImagePicked({ uri: res.uri, base64: res.data });
        }
      },
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image source={this.state.pickedImage} style={styles.previewImage} />
        </View>
        <View style={styles.button}>
          <Button title="Pick Image" onPress={this.pickImageHandler} />
        </View>
      </View>
    );
  }
}

export default PickImage;
