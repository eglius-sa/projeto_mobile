import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LivroListScreen from "./src/screens/LivroListScreen";
import LivroFormScreen from "./src/screens/LivroFormScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LivroList"
        screenOptions={{
          headerStyle: { backgroundColor: "#1A237E" },
          headerTintColor: "#FFF",
          headerTitleStyle: { fontWeight: "600" },
        }}
      >
        <Stack.Screen
          name="LivroList"
          component={LivroListScreen}
          options={{ title: "Gerenciamento de Clientes" }}
        />
        <Stack.Screen
          name="LivroForm"
          component={LivroFormScreen}
          options={{ title: "Gerenciamento de Clientes" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
