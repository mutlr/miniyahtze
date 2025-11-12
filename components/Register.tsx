import Ionicons from "@expo/vector-icons/Ionicons";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput } from "react-native";
import Button from "./Button";

interface Props {
  setName: (name: string) => void;
}

const Register = ({ setName }: Props) => {
  const [text, onChangeText] = useState("");
  const ref = useRef<TextInput | null>(null);

  const onSubmit = () => {
    if (text === "") {
      return;
    }
    setName(text);
  };
  return (
    <ScrollView
      style={styles.main}
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <Ionicons name="information-circle" size={100} color="lightblue" />
      <Text style={[styles.text, { fontSize: 24, color: "black" }]}>
        For scoreboard enter your name
      </Text>
      <TextInput
        ref={ref}
        style={styles.input}
        onChangeText={onChangeText}
        onLayout={() => ref.current?.focus()}
        cursorColor={"black"}
      />

      <Button title="OK" onPress={onSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flexGrow: 1,
    display: "flex",
    width: "100%",
    gap: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: "black",
    maxWidth: "80%",
    width: "100%",
    height: 48,
    textAlignVertical: "center",
    paddingLeft: 8,
    marginBottom: 12,
  },
  text: {
    fontSize: 24,
    fontWeight: "500",
    color: "white",
  },
});
export default Register;
