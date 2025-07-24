import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../store";
import { register } from "../features/auth/authSlice";
import AuthForm from "../components/AuthForm";
import { RootStackParamList } from "../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import AuthScreenLayout from "../components/AuthScreenLayout";

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Register"
>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const handleRegister = async (data: { email: string; password: string }) => {
    await dispatch(register(data));
  };

  return (
    <AuthScreenLayout
      title="Create Account"
      subtitle="Get started with your new account"
      footerText="Already have an account?"
      footerActionText="Sign In"
      onFooterAction={() => navigation.navigate("Login")}
    >
      <AuthForm
        onSubmit={handleRegister}
        isLoading={status === "loading"}
        error={error}
        isRegister={true}
      />
    </AuthScreenLayout>
  );
};

export default RegisterScreen;
