import { useEffect } from "react";
import { Text, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../auth/authSlice";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/types";
import { useAppDispatch } from "../../store";

type UsersScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Users"
>;

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<UsersScreenNavigationProp>();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleLogoutConfirm} className="mr-4">
          <Text className="text-blue-500">Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleLogoutConfirm = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          dispatch(logout());
        },
      },
    ]);
  };
};
