import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { condition } from '../../utils/condition';

export default function Forcast({ item }) {
   const icon = condition(item.condition);

   return(
      <View style={styles.container}>
         <Text style={styles.date}>{item.date}</Text>
         <Ionicons name={icon.name} color={icon.color} size={25} />

         <View style={styles.temp}>
            <Text>{item.min}º</Text>
            <Text style={styles.max}>{item.max}º</Text>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      marginLeft: 12,
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 14,
      alignItems: 'center',
      justifyContent: 'space-around',
      borderRadius: 8
   },
   date: {
      fontSize: 14
   },
   temp: {
      alignItems: 'center'
   },
   max: {
      fontSize: 18,
      fontWeight: 'bold'
   }
});