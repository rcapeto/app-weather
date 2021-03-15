import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Menu() {
   const navigation = useNavigation();

   function openMenu() {
      navigation.openDrawer();
   }

   return(
     <TouchableOpacity onPress={openMenu} style={styles.container}>
        <Feather name="menu" size={36} color="#373737"/>
     </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   container: {
      backgroundColor: '#fff',
      position: 'absolute',
      zIndex: 100,
      width: 70,
      height: 70,
      alignItems: 'center',
      justifyContent: 'center',
      left: 10,
      top: 40,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.2,
      shadowOffset: {
         height: 3,
         width: 1
      }
   }
});