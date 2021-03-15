import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import Home from './Pages/Home';
import Search from './Pages/Search';

const { Navigator, Screen } = createDrawerNavigator();

export default function Routes() {
   return(
      <NavigationContainer>
         <StatusBar  style="dark" />
         <Navigator>
            <Screen component={Home} name="Home" options={{ title: 'Minha Cidade '}}/>
            <Screen component={Search} name="Search" options={{ title: 'Procurar' }}/>
         </Navigator>
      </NavigationContainer>
   );
}