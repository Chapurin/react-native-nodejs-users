import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import UsersScreen from "../screens/UsersScreen";
import { useAppDispatch, useAppSelector } from "../store";
import { checkAuth, clearAuthError } from "../features/auth/authSlice";

const Stack = createStackNavigator();

export default function AppNavigation() {
  const dispatch = useAppDispatch();
  const { token, status } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <NavigationContainer
      onStateChange={(state) => {
        const currentRoute = state?.routes[state.index];
        if (
          currentRoute?.name === "Login" ||
          currentRoute?.name === "Register"
        ) {
          dispatch(clearAuthError());
        }
      }}
    >
      <Stack.Navigator>
        {token ? (
          <Stack.Screen name="Users" component={UsersScreen} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
