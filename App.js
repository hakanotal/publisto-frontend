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

const Stack = createNativeStackNavigator();

// /* cetini18 entered the */
export default function App() {
  const [fontsLoaded] = useFonts({
    KantumruyPro: require("./assets/fonts/KantumruyPro-Regular.ttf"),
    KantumruyProBold: require("./assets/fonts/KantumruyPro-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Lists" component={ListsPage} />
          <Stack.Screen name="Signin" component={LoginPage} />
          <Stack.Screen name="Signup" component={SignUpPage} />
          <Stack.Screen name="List" component={ListPage} />
          <Stack.Screen name="ProfilePage" component={ProfilePage} />
          <Stack.Screen name="TabStack" component={TabStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
