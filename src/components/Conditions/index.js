import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Conditions({ wind, sunrise, sunset, humidity}) {
   return(
      <View style={styles.container}>

         <View style={styles.condition}>
            <Feather name="wind" size={23} color="#1ed6ff"/>
            <Text style={styles.text}>{wind}</Text>
         </View>

         <View style={styles.condition}>
            <MaterialCommunityIcons name="weather-sunset-up" size={23} color="#1ed6ff"/>
            <Text style={styles.text}>{sunrise}</Text>
         </View>

         <View style={styles.condition}>
            <MaterialCommunityIcons name="weather-sunset-down" size={23} color="#1ed6ff"/>
            <Text style={styles.text}>{sunset}</Text>
         </View>

         <View style={styles.condition}>
            <Feather name="droplet" size={23} color="#1ed6ff"/>
            <Text style={styles.text}>{humidity}</Text>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'row',
      marginTop: 15,
      padding: 10,
      backgroundColor: '#fff',
      width: '95%',
      alignItems: 'center',
      justifyContent: 'space-around',
      borderRadius: 8
   },
   condition: {
      alignItems: 'center',
      justifyContent: 'center'
   }
});