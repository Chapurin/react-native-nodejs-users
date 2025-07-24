import { View, Text } from "react-native";

interface AuthScreenLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerActionText: string;
  onFooterAction: () => void;
}

const AuthScreenLayout = ({
  title,
  subtitle,
  children,
  footerText,
  footerActionText,
  onFooterAction,
}: AuthScreenLayoutProps) => {
  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <View className="flex-1 px-6 pt-12">
        <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </Text>
        <Text className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          {subtitle}
        </Text>

        {children}
      </View>

      <View className="pb-8 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Text className="text-center text-gray-600 dark:text-gray-300">
          {footerText}{" "}
          <Text
            className="text-blue-500 dark:text-blue-400 font-medium"
            onPress={onFooterAction}
          >
            {footerActionText}
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default AuthScreenLayout;
