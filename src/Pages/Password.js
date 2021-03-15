import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';

import logoPass from '../assets/logo.png';

const charLower = 'abcdefghijklmnopqrstuv';
const charUpper = charLower.toUpperCase();
const symbols = ';/!@#$%¨&*()_+{^}`[]~`´';
const numbers = '0123456789';

export default function Password() {
   const [password, setPassword] = useState('');
   const [size, setSize] = useState(5);

   function getRandomNumber(size) {
      return Math.floor(Math.random() * size);
   }

   function generatePass() {
      const passArr = [];

      for(let i = 0; i < size; i++) {
         passArr.push(charLower[getRandomNumber(charLower.length)]);
         passArr.push(charUpper[getRandomNumber(charUpper.length)]);
         passArr.push(symbols[getRandomNumber(symbols.length)]);
         passArr.push(numbers[getRandomNumber(numbers.length)]);
      }

      const pass = passArr.slice(0, size).reverse().join('');

      setPassword(pass);
   }

   function copyPass() {
      Clipboard.setString(password);
      Alert.alert('Generator', 'Senha copiada com sucesso!');
   }

   return(
      <View style={styles.container}>
         <StatusBar style="auto"/>
         <Image 
            source={logoPass}
            style={styles.logo}
         />

         <Text style={styles.title}>12 Caractéres</Text>

         <View style={styles.area}> 
            <Slider 
               style={{ height: 50 }}
               minimumValue={5}
               maximumValue={15}
               minimumTrackTintColor="#ff0000"
               maximumTrackTintColor="#000"
               value={size}
               onValueChange={value => setSize(+value.toFixed(0))}
            />
         </View>

         <TouchableOpacity onPress={generatePass} style={styles.button}>
            <Text style={styles.buttonText}>Gerar senha</Text>
         </TouchableOpacity>

         <View style={styles.area}>
            <Text style={styles.password} onLongPress={copyPass}>{password}</Text>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F3F3FF'
   },
   logo: {
      marginBottom: 60
   },
   title: {
      fontSize: 30,
      fontWeight: 'bold'
   },
   area: {
      marginVertical: 15,
      backgroundColor: '#fff',
      width: '80%',
      borderRadius: 7,
   },
   button: {
      backgroundColor: '#ffa200',
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      borderRadius: 5,
      marginBottom: 25
   },
   buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 20
   },
   password: {
      textAlign: 'center',
      padding: 10,
      fontWeight: 'bold',
      fontSize: 20
   },
});