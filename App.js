import LoginPage from "./src/pages/LoginPage";
import SignUpPage from "./src/pages/SignUpPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabStack from "./src/components/TabStack";
import ListPage from "./src/pages/ListPage";
import { NativeBaseProvider, Box } from "native-base";
const Stack = createNativeStackNavigator();

// /* cetini18 entered the */
export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Signin" component={LoginPage} />
          <Stack.Screen name="Signup" component={SignUpPage} />
          <Stack.Screen name="TabStack" component={TabStack} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
