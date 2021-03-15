import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Conditions from '../Conditions';

export default function CityInfo({ data }) {
   const colors = data.currently === 'noite' ? ['#0c3741', '#0f2f61'] : ['#1ed6ff', '#97c1ff'];

   return(
      <LinearGradient style={styles.container} colors={colors}>
         <Text style={styles.date}>{data.date}</Text>
         <Text style={styles.city}>{data.city_name}</Text>
         <Text style={styles.temp}>{data.condition_code}º</Text>
         <Conditions 
            humidity={data.humidity}
            sunset={data.sunset}
            wind={data.wind_speedy}
            sunrise={data.sunrise}
         />
      </LinearGradient>
   );
}  

const styles = StyleSheet.create({
   container: {
      marginTop: 20,
      width: '85%',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 8,
      paddingVertical: 30
   },
   date: {
      color: '#fff',
      fontSize: 16,
   },
   city: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
   },
   temp: {
      color: '#fff',
      fontSize: 80,
      fontWeight: 'bold'
   }
});