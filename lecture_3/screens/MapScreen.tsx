import React, { useState } from "react";
import { useEffect } from "react";
import * as axios from 'axios';
import { Button, Dimensions, SafeAreaView, StyleSheet, Text , ScrollView} from "react-native";
import { useRoute } from "@react-navigation/native";
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';



const SearchResults = (props: NavProps) => {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();
  const { term } = route.params;

  const [country, setCountry] = useState<GeocodeResult>();
  const [universities, setUniversity] = useState<University[]>();
  const [_, setViewport] = useState<Region>();

  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  let latitudeDelta, longitudeDelta;
  if (country) {
    latitudeDelta = country.geometry.bounds.northeast.latitude - country.geometry.bounds.northeast.longitude;
    longitudeDelta = latitudeDelta * ASPECT_RATIO;
  }

  useEffect(() => {
    Promise.all([
      axios.default.get(`http://192.168.56.1:3000/locations/${term}`),
      axios.default.get(`http://192.168.56.1:3000/universities/${term}`),
    ])
      .then(([{ data: locationResults }, { data: universitiesResults }]) => {
        if (locationResults) setCountry(locationResults);
        if (universitiesResults) setUniversity(universitiesResults);
      });
  }, []);

  return (
    <SafeAreaView>
      <Button
       onPress={() => term && navigation.navigate("List" as never, {
        term: term,
      } as never)}
        title="List Universities"
        color="#841584"
      />

      {country && term && latitudeDelta && longitudeDelta &&
        <MapView
          style={styles.map}
          zoomControlEnabled={true}
          provider='google'
          onRegionChange={(region) => setViewport({ region })}
          initialRegion={{
            latitude: country.geometry.location.latitude,
            longitude: country.geometry.location.longitude,
            latitudeDelta, // delta between origin bounds and client viewport
            longitudeDelta, // delta between origin bounds and client viewport
          }}
        >
          {
            universities?.map((marker: University, index: number) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.lat,
                  longitude: marker.lng,
                }}
                title={Marker.name}
                description={Marker.name}>
              </Marker>
            ))
          }
        </MapView>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

type RouteParams = {
  term: string;
};

type RouteProps = {
  params: RouteParams
  name: string;
  key: string;
};

type GeometryCoordinates = {
  latitude: number;
  longitude: number;
}
type GeometryBounds = {
  northeast: GeometryCoordinates;
  southwest: GeometryCoordinates;
}
type GeometryResult = {
  bounds: GeometryBounds;
  location: GeometryCoordinates;
}
type GeocodeResult = {
  geometry: GeometryResult;
}

type RegionCoordinates = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}
type Region = {
  region: RegionCoordinates;
}
type University = {
  name: string;
  lat: number;
  lng: number;
}
type NavProps = {
  term: string;
}
export default SearchResults