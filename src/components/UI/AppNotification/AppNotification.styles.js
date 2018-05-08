import { StyleSheet } from 'react-native';

import {
  NOTIFICATION_TYPE_ERROR,
  NOTIFICATION_TYPE_SUCCESS,
  BG_COLOR_ERROR,
  BG_COLOR_SUCCESS,
} from '../../../constants/values';

const styles = StyleSheet.create({
  screen: {
    opacity: 1,
    flex: 1,
  },
  [NOTIFICATION_TYPE_ERROR]: {
    backgroundColor: BG_COLOR_ERROR,
  },
  [NOTIFICATION_TYPE_SUCCESS]: {
    backgroundColor: BG_COLOR_SUCCESS,
  },
  container: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#fff',
    padding: 5,
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  headingText: {
    color: '#fff',
  },
  message: {
    fontWeight: 'bold',
    padding: 5,
    color: '#fff',
  },
});

export default styles;
