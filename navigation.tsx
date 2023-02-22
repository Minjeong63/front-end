import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ToDoList from "./screens/toDoList";
import SignIn from "./screens/signIn";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="signIn"
      >
        <Stack.Screen name="signIn" component={SignIn} />
        <Stack.Screen name="toDoList" component={ToDoList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
