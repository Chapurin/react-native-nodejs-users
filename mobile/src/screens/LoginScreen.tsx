import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../store";
import { login } from "../features/auth/authSlice";
import AuthForm from "../components/AuthForm";
import { RootStackParamList } from "../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import AuthScreenLayout from "../components/AuthScreenLayout";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (data: { email: string; password: string }) => {
    await dispatch(login(data));
  };

  return (
    <AuthScreenLayout
      title="Welcome Back"
      subtitle="Sign in to continue to your account"
      footerText="Don't have an account?"
      footerActionText="Sign Up"
      onFooterAction={() => navigation.navigate("Register")}
    >
      <AuthForm
        onSubmit={handleLogin}
        isLoading={status === "loading"}
        error={error}
      />
    </AuthScreenLayout>
  );
};

export default LoginScreen;
