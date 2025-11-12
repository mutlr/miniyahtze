import { useRouter } from "expo-router";
import Register from "../components/Register";

export default function Index() {
  const router = useRouter();
  return (
    <Register
      setName={(name: string) => {
        router.push(`/rules`);
      }}
    />
  );
}
