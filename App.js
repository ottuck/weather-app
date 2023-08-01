import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import * as Location from 'expo-location';

const SCREEN_WIDTH = Dimensions.get('window').width;
const API_KEY = "1ba034e87a2f15fff303204ff1e25580";

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const ask = async() => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords:{latitude, longitude}
     } = await Location.getCurrentPositionAsync({accuracy: 5});
       
    const location = await Location.reverseGeocodeAsync(
      {latitude, longitude}, 
      {useGoogleMaps:false}
      );
    console.log(location[0].city);  
    setCity(location[0].city);
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}')
    const json = await response.json();
    console.log(json);
  };

  useEffect(()=>{
    ask();
  }, []);

  return <View style={styles.container}>
    <View style={styles.city}>
      <Text style={styles.cityName}>{city}</Text>
    </View>
    <ScrollView 
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      horizontal
      contentContainerStyle={styles.weather}
    >
      <View style={styles.day}>
        <Text style={styles.temperature}>27</Text>
        <Text style={styles.description}>sunny </Text>
      </View>
      <View style={styles.day}>
        <Text style={styles.temperature}>27</Text>
        <Text style={styles.description}>sunny </Text>
      </View>
      <View style={styles.day}>
        <Text style={styles.temperature}>27</Text>
        <Text style={styles.description}>sunny </Text>
      </View>
      <View style={styles.day}>
        <Text style={styles.temperature}>27</Text>
        <Text style={styles.description}>sunny </Text>
      </View>
    </ScrollView>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },
  weather: {

  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temperature: {
    fontSize: 178,
    marginTop: 50,
  },
  description: {
    fontSize: 60,
    marginTop: -30,
  }
});
