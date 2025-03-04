import { Stack } from "expo-router";

const ActsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Disable default header
      }}
    />
  );
};

export default ActsLayout;
