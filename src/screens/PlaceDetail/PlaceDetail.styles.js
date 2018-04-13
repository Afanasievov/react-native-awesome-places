import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 22,
    flex: 1,
  },
  portraitContainer: {
    flexDirection: 'column',
  },
  landscapeContainer: {
    flexDirection: 'row',
  },
  placeDetailContainer: {
    flex: 2,
  },
  placeImage: {
    width: '100%',
    height: '100%',
  },
  placeName: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 28,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  deleteButton: {
    alignItems: 'center',
  },
  subContainer: {
    flex: 1,
  },
});

export default styles;
