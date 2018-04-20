import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { authLogout } from '../../store/actions';
import styles from './SideDrawer.styles';

class SideDrawer extends Component {
  render() {
    return (
      <View style={[styles.container, { width: Dimensions.get('window').width * 0.8 }]}>
        <TouchableOpacity onPress={this.props.onLogout}>
          <View style={styles.drawerItem}>
            <Icon
              name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
              size={30}
              color="#aaa"
              style={styles.drawerItemIcon}
            />
            <Text>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   onLogout: () => dispatch(authLogout()),
// });

// export default connect(null, mapDispatchToProps)(SideDrawer);
export default connect(null, { onLogout: authLogout })(SideDrawer);
