// Note: test renderer must be required after react-native.
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../App';

it('renders correctly', () => {
  // eslint-disable-next-line
  const tree = renderer.create(<App />);
});
