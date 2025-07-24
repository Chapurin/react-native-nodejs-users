import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Users: undefined;
};

export type StackNavigation = StackNavigationProp<RootStackParamList>;
