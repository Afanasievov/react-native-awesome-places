import React from 'react';
import { FlatList } from 'react-native';

import ListItem from '../ListItem/ListItem';
import styles from './PlaceList.styles';

const PlaceList = props => (
  <FlatList
    style={styles.listContainer}
    data={props.places}
    renderItem={info => (
      <ListItem
        placeName={info.item.name}
        placeImage={info.item.image}
        onItemPressed={() => props.onItemSelected(info.item.key)}
      />
    )}
  />
);

export default PlaceList;
