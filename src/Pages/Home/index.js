import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

import Menu from '../../components/Menu';
import Header from '../../components/Header';
import Conditions from '../../components/Conditions';
import Forcast from '../../components/Forcast';
import { getServiceURL } from '../../services/api';

export default function Home() {
   const [errorMessage, setErrorMessage] = useState('');
   const [loading, setLoading] = useState(false);
   const [tempData, setTempData] = useState({});
   const [icon, setIcon] = useState({ name: 'cloud', color: '#fff' });
   const [background, setBackground] = useState(['#1ed6ff', '#97c1ff']);
   const [forecast, setForecast] = useState([]);

   async function askPermission() {
      setLoading(true);
      const { granted } = await Location.requestPermissionsAsync();

      if(!granted) {
         setErrorMessage('Permissão negada para acessar localização.');
         setLoading(false);
         return;
      }
      
      setErrorMessage('');
      await getCurrentPosition();
   }

   async function getCurrentPosition() {
      setLoading(true);
      const { status } = await Location.getPermissionsAsync();

      if(status !== 'granted') {
         setErrorMessage('Permissão negada para acessar localização.');
         setLoading(false);
         return;
      }

      const { coords } = await Location.getCurrentPositionAsync();
      const { latitude, longitude } = coords;

      const request = await fetch(getServiceURL(latitude, longitude));
      const response = await request.json();

      if(response.results.currently === 'noite') {
         setBackground(['#0c3741', '#0f2f61']);
      }

      switch(response.results.condition_slug) {
         case 'clear_day':
            setIcon({ name: 'partly-sunny', color: '#ffb300' });
            break;
         case 'rain':
            setIcon({ name: 'rainy', color: '#fff' });
            break;
         case 'storm':
            setIcon({ name: 'rainy', color: '#fff' });
            break;
         default:
            break;
      }

      setTempData(response.results);
      setForecast(response.results.forecast);
      setLoading(false);
   }

   useEffect(() => {
      getCurrentPosition();
   }, []);

   if(errorMessage !== '') {
      return(
         <View style={styles.container}>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TouchableOpacity style={styles.buttonError} onPress={askPermission}>
               <Text style={styles.buttonErrorText}>Pedir Localização</Text>
            </TouchableOpacity>
         </View>
      );
   }

   if(loading) {
      return(
         <View style={styles.container}>
            <ActivityIndicator color="#1ed6ff" size="large" style={styles.loading} />
            <Text style={styles.loadingText}>Carregando...</Text>
         </View>
      );
   }

   return(
      <SafeAreaView style={styles.container}>
         <Menu />
         <Header 
            city={tempData.city} 
            date={tempData.date} 
            temp={tempData.condition_code}
            icon={icon}
            background={background}
         />
         <Conditions 
            wind={tempData.wind_speedy}
            sunrise={tempData.sunrise}
            sunset={tempData.sunset}
            humidity={tempData.humidity}
         />
         <FlatList 
            style={styles.list}
            data={forecast}
            keyExtractor={item => item.date}
            renderItem={({ item }) => <Forcast item={item}/>}
            horizontal
            contentContainerStyle={{ paddingBottom: '5%', height: 180 }}
            showsHorizontalScrollIndicator={false}
         />
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '10%'
   },
   list: {
      marginTop: 10,
      marginLeft: 10,
      maxHeight: 200
   },
   loading: {
      height: 30,
      width: 30
   },
   loadingText: {
      marginTop: 20,
      fontSize: 20,
      color: '#1ed6ff',
      fontWeight: 'bold'
   },
   errorMessage: {
      fontSize: 16
   },
   buttonError: {
      backgroundColor: '#1ed6ff',
      padding: 12,
      marginTop: 15,
      borderRadius: 10
   },
   buttonErrorText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 18
   }
});
