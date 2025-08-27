

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CarListScreen from '/home/user/Car-Library-App/CarLibraryApp/src/screens/CarListScreen';
import CarDetailScreen from '/home/user/Car-Library-App/CarLibraryApp/src/screens/CarDetailScreen';
import AddCarScreen from '/home/user/Car-Library-App/CarLibraryApp/src/screens/AddCarScreen';
import { StyleSheet } from 'react-native/types';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CarList">
        <Stack.Screen
          name="CarList"
          component={CarListScreen}
          options={{ title: 'Car Library' }}
        />
        <Stack.Screen name="CarDetail" component={CarDetailScreen} />
        <Stack.Screen name="AddCar" component={AddCarScreen} options={{ title: 'Add New Car' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

