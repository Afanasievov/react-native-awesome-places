import { Navigation } from 'react-native-navigation';

import { DISMISS_NOTIFICATION_SEC } from '../constants/values';

export default (props = {}, timer = DISMISS_NOTIFICATION_SEC) =>
  Navigation.showInAppNotification({
    screen: 'awesome-places.AppNotification',
    passProps: props,
    autoDismissTimerSec: timer,
  });
