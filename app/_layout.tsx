import { Stack } from "expo-router";
import Header from "../components/Header";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="index"
        options={{ header: () => <Header text="Mini-Yahtzee" /> }}
      />
    </Stack>
  );
}
