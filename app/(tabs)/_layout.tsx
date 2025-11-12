import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="rules"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 16 },
        tabBarActiveTintColor: "lightblue",
        tabBarInactiveTintColor: "lightgray",
      }}
    >
      <Tabs.Screen
        name="rules"
        options={{
          title: "Rules",
          tabBarLabel: "Rules",
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name="information-circle"
              size={size}
              color={focused ? color : "lightgray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="game"
        options={{
          title: "Game",
          tabBarLabel: "Game",
          tabBarIcon: ({ size, color, focused }) => (
            <Ionicons
              name="dice-sharp"
              size={size}
              color={focused ? color : "lightgray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="scoreboard"
        options={{
          title: "Scoreboard",
          tabBarLabel: "Scoreboard",
          tabBarIcon: ({ size, color, focused }) => (
            <MaterialCommunityIcons
              name="scoreboard"
              size={size}
              color={focused ? color : "lightgray"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
