import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screen/HomeScreen';
import Clock from './src/screen/Clock';
import Example from './src/screen/example';
import CustomClock from './src/components/CustomModal';


const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Clock" component={Clock}/>
        <Stack.Screen name="Example" component={Example} />
        <Stack.Screen name="Modal" component={CustomClock} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App; 