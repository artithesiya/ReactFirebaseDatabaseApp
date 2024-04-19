/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import Home from './HomeScreen/Home';
import Show from './HomeScreen/Show';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
