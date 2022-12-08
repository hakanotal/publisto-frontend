import LoginPage from "./src/pages/LoginPage";
import SignUpPage from "./src/pages/SignUpPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabStack from "./src/components/TabStack";
import ListPage from "./src/components/ListPage";
import ListsPage from "./src/pages/ListsPage";
import { NativeBaseProvider, Box } from "native-base";
import { useFonts } from "expo-font";
import ProfilePage from "./src/pages/ProfilePage";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

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
    })();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName={auth ? "TabStack" : "Signin"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Signin" component={LoginPage} />
          <Stack.Screen name="Signup" component={SignUpPage} />
          <Stack.Screen name="List" component={ListPage} />
          <Stack.Screen name="Lists" component={ListsPage} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
          <Stack.Screen name="TabStack" component={TabStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
