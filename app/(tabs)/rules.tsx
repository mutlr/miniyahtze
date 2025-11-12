import { useLocalSearchParams, useRouter } from "expo-router";
import Rules from "../../components/Rules";

export default function RulesScreen() {
  const { name } = useLocalSearchParams<{ name?: string }>();
  const router = useRouter();

  const displayName = typeof name === "string" ? name : "";

  return (
    <Rules
      name={displayName}
      onPlay={() => router.push(`/game?name=${encodeURIComponent(displayName)}`)}
      onOpenScoreboard={() => router.push("/scoreboard")}
    />
  );
}
