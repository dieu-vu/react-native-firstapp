import React, {useState, useRef, useEffect} from 'react';
import MapView, {Callout, Circle, Marker, Polyline} from 'react-native-maps';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import {getDistance} from 'geolib';

const Map = ({navigation}) => {
  const [region, setRegion] = useState({
    latitude: 60.168415993,
    longitude: 24.9333962664,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
  const markers = [
    {
      callout: "I'm here",
      coordinates: {latitude: 60.168415993, longitude: 24.9333962664},
    },
    {
      callout: `Destination`,
      coordinates: {latitude: 60.175006036, longitude: 24.9165095607},
    },
  ];
  const coords = markers.map((marker) => marker.coordinates);
  console.log(coords);

  const mapMarkers = () => {
    return markers.map((marker, index) => (
      <Marker
        key={index}
        identifier={marker.index}
        coordinate={marker.coordinates}
        pinColor="red"
        showCallout
      >
        <Callout>
          <Text>{marker.callout}</Text>
        </Callout>
      </Marker>
    ));
  };

  const mapRef = useRef();

  // Call fitToSuppliedMarkers() method on the MapView after markers get updated
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.fitToSuppliedMarkers(
        markers.map((marker) => marker.index)
      );
    }
  }, [markers]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        region={region}
      >
        {mapMarkers()}
        {/* This is shown as straight line as we dont have google API yet */}
        <Polyline
          coordinates={coords}
          strokeColor="red"
          strokeWidth={3}
        ></Polyline>
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.bubble, styles.button]}>
          <Text style={styles.buttonText}>
            Distance:{' '}
            {getDistance(markers[0].coordinates, markers[1].coordinates) / 1000}{' '}
            km
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
  },
});

Map.propTypes = {
  navigation: PropTypes.object,
};

export default Map;
