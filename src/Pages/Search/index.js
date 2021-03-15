import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Keyboard, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { getServiceWithCityURL } from '../../services/api';
import CityInfo from '../../components/CityInfo';

export default function Search() {
   const [input, setInput] = useState('');
   const [error, setError] = useState(false);
   const [city, setCity] = useState(null);
   const [loading, setLoading] = useState(false);

   const navigation = useNavigation();

   async function handleSearch() {
      if(!input) {
         setError(true);
         setCity(null);
         return;
      }

      Keyboard.dismiss();
      setLoading(true);

      const request = await fetch(getServiceWithCityURL(input));
      const response = await request.json();
      
      if(response.by === 'default') {
         setError('Hummm, cidade não encontrada!');
         setInput('');
         setCity(null);
         setLoading(false);
         return;
      }

      setCity(response.results);
      setLoading(false);
   } 

   useEffect(() => {
      if(error && input) {
         setError(false);
      }
   }, [input]);

   return(
      <SafeAreaView style={styles.container}>
         <TouchableOpacity style={styles.button} onPress={navigation.goBack}>
            <Feather name="chevron-left" size={32} color="#000"/>
            <Text style={styles.buttonText}>Voltar</Text>
         </TouchableOpacity>

         <View style={styles.block}>
            <TextInput 
               value={input}
               onChangeText={setInput}
               style={styles.input}
               placeholder="Exemplo: Osaco, SP"
               autoCapitalize="words"
               autoCompleteType="street-address"
               returnKeyType="done"
               onEndEditing={handleSearch}
            />
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
               <Feather name="search" size={22} color="#fff" />
            </TouchableOpacity>
         </View>
         {loading && <ActivityIndicator color="#1ed6ff" size="small" style={{ marginTop: 20 }}/>}
         {error && <Text style={styles.error}>Por favor preencha o campo para buscar!</Text>}
         {city && <CityInfo data={city}/>}
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#e8f0ff',
      paddingTop: '10%'
   },
   button: {
      flexDirection: 'row',
      marginLeft: 15,
      alignSelf: 'flex-start',
      alignItems: 'center',
      marginBottom: 10
   },
   buttonText: {
      fontSize: 22,
   },
   block: {
      alignItems: 'center',
      backgroundColor: '#ddd',
      flexDirection: 'row',
      width: '90%',
      height: 50,
      borderRadius: 8,
      alignItems: 'center'
   },
   input: {
      flex: 1,
      height: 50,
      backgroundColor: '#fff',
      borderBottomLeftRadius: 8,
      borderTopLeftRadius: 8,
      padding: 10,
   },
   searchButton: {
      backgroundColor: '#1ed6ff',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8
   },
   error: {
      alignSelf: 'flex-start',
      marginLeft: 20,
      marginTop: 10,
      color: '#f34'
   }
});
