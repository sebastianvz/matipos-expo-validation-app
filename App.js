import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ConfigScreen from "./components/ConfigScreen";
import ValidateScreen from "./components/ValidateEntry";
import StatusScreen from "./components/StatusScreen";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="config" component={ConfigScreen}></Stack.Screen>
        <Stack.Screen name="validate" component={ValidateScreen}></Stack.Screen>
        <Stack.Screen name="status" component={StatusScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
