import { Stack } from "expo-router";

const HomeLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Disable default header
      }}
    />
  );
};

export default HomeLayout;
