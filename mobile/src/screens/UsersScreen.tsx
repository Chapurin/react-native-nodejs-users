import React, { useEffect, useState } from "react";
import { View, Text, FlatList, RefreshControl, Image } from "react-native";
import { useAppDispatch, useAppSelector } from "../store";
import { fetchUsers } from "../features/users/usersSlice";
import { useLogout } from "../features/auth/useLogout";
import Avatar from "../components/Avatar";

const UsersScreen = () => {
  const dispatch = useAppDispatch();
  const { users, status, error } = useAppSelector((state) => state.users);
  const [refreshing, setRefreshing] = useState(false);
  useLogout();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchUsers());
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View className="flex-1">
      <FlatList
        data={users}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <View className="p-4 border-b flex-row content-center items-center gap-3">
            <Avatar name={item.email} />
            <Text>{item.email}</Text>
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#3b82f6"]} // Цвет для Android
            tintColor="#3b82f6" // Цвет для iOS
            progressBackgroundColor="#ffffff"
          />
        }
      />
    </View>
  );
};

export default UsersScreen;
