/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createStackNavigator} from '@react-navigation/stack';
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Splash from './src/screens/Splash';

import {Provider} from 'react-redux';
import configureStore from './src/redux/store';
import VideoDisplay from './src/screens/VideoDisplay';

const Stack = createStackNavigator();
const store = configureStore();
const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <Provider store={store}>
      <SafeAreaView style={[backgroundStyle, styles.sectionContainer]}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Splash" component={Splash} />
           
            <Stack.Screen name="VideoDisplay" component={VideoDisplay} />

          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1
  },
});

export default App;
