import {
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";

interface AuthFormProps {
  onSubmit: (data: { email: string; password: string }) => void;
  isLoading?: boolean;
  isRegister?: boolean;
  error?: string | null;
}

const AuthForm = ({
  onSubmit,
  isLoading,
  isRegister = false,
  error,
}: AuthFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      ...(isRegister && { confirmPassword: "" }),
    },
  });

  return (
    <View className="space-y-4">
      {/* Email Field */}
      <View>
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email Address
        </Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={[
                "bg-gray-50 dark:bg-gray-800 border rounded-lg px-4 py-3 text-gray-900 dark:text-white",
                errors.email
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600",
              ].join(" ")}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.email && (
          <Text className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </Text>
        )}
      </View>

      {/* Password Field */}
      <View>
        <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Password
        </Text>
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className={[
                "bg-gray-50 dark:bg-gray-800 border rounded-lg px-4 py-3 text-gray-900 dark:text-white",
                errors.password
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600",
              ].join(" ")}
              placeholder="Enter your password"
              secureTextEntry
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </Text>
        )}
      </View>

      {/* Confirm Password Field (only for register) */}
      {isRegister && (
        <View>
          <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password
          </Text>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Please confirm your password",
              validate: (value, { password }) =>
                value === password || "Passwords do not match",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className={[
                  "bg-gray-50 dark:bg-gray-800 border rounded-lg px-4 py-3 text-gray-900 dark:text-white",
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600",
                ].join(" ")}
                placeholder="Confirm your password"
                secureTextEntry
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>
      )}

      {/* Server Error Message */}
      {error && (
        <View className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
          <Text className="text-red-600 dark:text-red-400 text-sm">
            {error}
          </Text>
        </View>
      )}

      {/* Submit Button */}
      <TouchableOpacity
        className={[
          "bg-blue-500 dark:bg-blue-600 rounded-lg py-3 mt-2 items-center justify-center",
          isLoading && "opacity-70",
        ].join(" ")}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text className="text-white font-medium text-lg">
            {isRegister ? "Sign Up" : "Sign In"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AuthForm;
