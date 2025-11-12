import { useLocalSearchParams, useRouter } from "expo-router";
import Gameboard from "../../components/Gameboard";
import Register from "../../components/Register";

export default function GameScreen() {
  const { name } = useLocalSearchParams<{ name?: string }>();
  const router = useRouter();
  const displayName = typeof name === "string" ? name : "";

  if (!displayName) {
    return (
      <Register
        setName={(n: string) =>
          router.replace(`/game?name=${encodeURIComponent(n)}`)
        }
      />
    );
  }

  return <Gameboard name={displayName} />;
}
