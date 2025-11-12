import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

interface Props {
  text: string;
  style?: StyleProp<ViewStyle>;
}
const Header = ({ text, style }: Props) => {
  return (
    <View style={[styles.header, style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: "lightblue",
    width: "100%",
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "400",
    color: "white",
  },
});
export default Header;
