import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SCOREBOARD_KEY } from "../utilities/constants";
import Button from "./Button";
import Header from "./Header";
type Score = { id: string; name: string; points: number; date: string | Date };

const formatDate = (date: string | Date) => {
  const tempDate = new Date(date);
  const day = String(tempDate.getDate()).padStart(2, "0");
  const month = String(tempDate.getMonth() + 1).padStart(2, "0");
  const year = tempDate.getFullYear();

  return `${day}.${month}.${year}`;
};
const Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState<Score[]>([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    AsyncStorage.getItem(SCOREBOARD_KEY)
      .then((result) => {
        const res = result ? (JSON.parse(result) as Score[]) : undefined;
        if (res) {
          setScoreboard(res.sort((a, b) => b.points - a.points));
        }
      })
      .catch((err) => console.error(`Error from scoreboard ${err}`));
  }, [isFocused]);

  const clearScoreboard = async () => {
    try {
      await AsyncStorage.removeItem(SCOREBOARD_KEY);
      setScoreboard([]);
      console.info("Scoreboard cleared");
    } catch (error) {
      console.error("Error clearing scoreboard", error);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <AntDesign
          style={styles.icon}
          name="dashboard"
          size={100}
          color="#3293a8"
        />
        <Text style={styles.header}>Top Seven</Text>
        {scoreboard.length === 0 ? (
          <Text style={{ fontSize: 24, fontWeight: "400" }}>
            Scoreboard is empty
          </Text>
        ) : (
          <FlatList
            data={scoreboard}
            style={{ width: "100%", marginTop: 24 }}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ gap: 16 }}
            renderItem={({ item, index }) => (
              <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>
                  {index + 1}. {item.name}
                </Text>
                <Text style={styles.scoreText}>{formatDate(item.date)}</Text>
                <Text style={[styles.scoreText, { fontWeight: "700" }]}>
                  {item.points}
                </Text>
              </View>
            )}
          />
        )}
        {scoreboard.length !== 0 && (
          <View style={{ marginTop: 30 }}>
            <Button
              title="Clear scoreboard"
              color="red"
              onPress={clearScoreboard}
            />
          </View>
        )}
      </View>
      <Header text="Author: Rojhat" style={{ marginTop: 8 }} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 8,
  },
  container: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    flex: 1,
  },
  icon: {
    marginTop: 32,
    marginBottom: 32,
  },
  scoreContainer: {
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  scoreText: {
    fontSize: 18,
  },
});
export default Scoreboard;
