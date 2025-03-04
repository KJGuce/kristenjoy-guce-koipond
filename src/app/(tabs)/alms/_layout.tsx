import { Stack } from "expo-router";

const AlmsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // Disable default header
      }}
    />
  );
};

export default AlmsLayout;
