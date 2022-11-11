import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from './src/components/LoginPage';
import SignUpPage from "./src/components/SignUpPage"
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilePage from "./src/components/ProfilePage"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}  >
      <Stack.Screen name="Signin" component={LoginPage} />
      <Stack.Screen name="Signup" component={SignUpPage} />
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
    </Stack.Navigator>

  </NavigationContainer>
  );
}

