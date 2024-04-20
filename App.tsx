/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import Home from './Home';
import Show from './Show';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Update from './Update';

const App = (): React.JSX.Element => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
        />
         <Stack.Screen
          name="Show"
          component={Show}
        />
         <Stack.Screen
          name="Update"
          component={Update}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
