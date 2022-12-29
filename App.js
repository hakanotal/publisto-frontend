import LoginPage from "./src/pages/LoginPage";
import SignUpPage from "./src/pages/SignUpPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabStack from "./src/components/TabStack";
import ListPage from "./src/components/ListPage";
import ListsPage from "./src/pages/ListsPage";
import { NativeBaseProvider, Box,Text } from "native-base";
import { useFonts } from "expo-font";
import ProfilePage from "./src/pages/ProfilePage";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { startListeningDb } = require("./src/api/dbListener");
const Stack = createNativeStackNavigator();
const { Notification } = require("./src/api/dbListener");

// /* cetini18 entered the */
export default function App() {
  const [auth, setAuth] = useState(null);
  const [fontsLoaded] = useFonts({
    KantumruyPro: require("./assets/fonts/KantumruyPro-Regular.ttf"),
    KantumruyProBold: require("./assets/fonts/KantumruyPro-Bold.ttf"),
  });

  useEffect(() => {
    (async function () {
      const token = await AsyncStorage.getItem("private_token");
      setAuth(token);
      if (!token) {
        return;
      }
      const userData = await getUserInfo();
      startListeningDb(userData.id, false);
    })();
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  const NotificationUpdate = async () => {
    // calling the forceUpdate() method
    const token = await AsyncStorage.getItem("private_token");
      setAuth(token);
      if (!token) {
        return;
      }
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={auth ? "TabStack" : "Signin"}
          screenOptions={{ headerShown: false }}

        >
          <Stack.Screen name="Signin">
            
           {props => <LoginPage {...props} NotificationUpdate={NotificationUpdate} />}

           </Stack.Screen>
          <Stack.Screen name="Signup" component={SignUpPage} />
          <Stack.Screen name="Lists" component={ListsPage} />
          <Stack.Screen name="List" component={ListPage} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
          <Stack.Screen name="TabStack" component={TabStack} />
        </Stack.Navigator>
       {auth && <Notification auth= {auth}/>}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
