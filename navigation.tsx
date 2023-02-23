import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ToDoList from "./screens/toDoList";
import SignIn from "./screens/signIn";
import KakaoLogin from "./screens/kakaoLogin";

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
        <Stack.Screen name="kakaoLogin" component={KakaoLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
