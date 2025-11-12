import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { randomUUID } from "expo-crypto";
import { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
  BONUS_POINTS,
  NBR_OF_DICES,
  NBR_OF_THROWS,
  SCOREBOARD_KEY,
} from "../utilities/constants";
import Button from "./Button";
import Header from "./Header";
type DiceProps = {
  number: number | string;
  size?: number;
  onPress?: () => void;
  active?: boolean;
};

const Dice = ({ number, size = 40, onPress, active }: DiceProps) => {
  return (
    <Pressable onPress={onPress}>
      <MaterialCommunityIcons
        name={`dice-${number}`}
        size={size}
        color={active ? "#3293a8" : "black"}
      />
    </Pressable>
  );
};

interface Props {
  name: string;
}

type DiceState = { value: number; active: boolean };

const Gameboard = ({ name }: Props) => {
  const [dices, setDices] = useState<DiceState[]>([]);
  const [throws, setThrows] = useState<number>(NBR_OF_THROWS);
  const [gameState, setGameState] = useState<Record<number, number>>(
    initializeGamestate()
  );
  const [error, setError] = useState<string | null>(null);
  const [choose, setChoose] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  useEffect(() => {
    if (!checkGameOver()) {
      saveGame()
        .then(() => console.log("Game saved!"))
        .catch((error) => console.error("Game not saved: ", error));
    } else if (throws === 0) {
      setChoose(true);
    }
  }, [throws]);
  function initializeGamestate() {
    return {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
    } as Record<number, number>;
  }
  const totalPoints = () => {
    return Object.values(gameState).reduce((acc, curr) => acc + curr, 0);
  };
  const changeActive = (index: number) => {
    setDices(
      dices.map((dice, i) =>
        index === i ? { ...dice, active: !dice.active } : dice
      )
    );
  };
  const throwDices = () => {
    if (choose) {
      setError("Choose your points before throwing again!");
      return;
    }
    const list: DiceState[] = [];
    if (throws === 0) {
      for (let i = 0; i < 5; i++) {
        list.push({
          value: Math.floor(Math.random() * 6) + 1,
          active: false,
        });
      }
      setThrows(3);
    } else {
      for (let i = 0; i < NBR_OF_DICES; i++) {
        if (dices[i] && dices[i].active) {
          list.push({
            ...dices[i],
            active: true,
          });
        } else {
          list.push({
            value: Math.floor(Math.random() * 6) + 1,
            active: false,
          });
        }
      }
    }
    setDices(list);
    setThrows((prevState) => prevState - 1);
    setError(null);
  };
  const checkGameOver = () => {
    for (const [key, value] of Object.entries(gameState)) {
      if (value === 0) {
        return true;
      }
    }
    for (const { value } of dices) {
      if (gameState[value] === 0) {
        return true;
      }
    }
    setGameOver(true);
    setError(null);
    return false;
  };
  const pickPoints = (value: number) => {
    if (throws !== 0) {
      setError(`Throw ${throws} more times to select points`);
      return;
    } else if (gameState[value] !== 0) {
      setError(`You have already used number ${value}`);
      return;
    }
    const points =
      dices.filter((dice) => Number(dice.value) === Number(value)).length *
      Number(value);
    setGameState((prevState) => ({
      ...prevState,
      [Number(value)]: points,
    }));
    setChoose(false);
  };

  const saveGame = async () => {
    try {
      const result = {
        name,
        points: totalPoints(),
        date: new Date(),
        id: randomUUID(),
      };
      const storedGames = await AsyncStorage.getItem(SCOREBOARD_KEY);
      const parsedGames = storedGames ? JSON.parse(storedGames) : [];
      await AsyncStorage.setItem(
        SCOREBOARD_KEY,
        JSON.stringify([...parsedGames, result])
      );
    } catch (error) {
      console.error("Error adding game result to storage", error);
    }
  };

  const initializeNewGame = () => {
    setDices([]);
    setGameOver(false);
    setThrows(NBR_OF_THROWS);
    setGameState(initializeGamestate());
    setError(null);
    setChoose(false);
  };
  const points = totalPoints();
  return (
    <View style={styles.container}>
      <View style={[styles.container, styles.rollingDiceContainer]}>
        {dices.length === 0 || gameOver ? (
          <MaterialCommunityIcons
            name="dice-multiple"
            size={100}
            color="#3293a8"
          />
        ) : (
          <FlatList
            data={dices}
            horizontal={true}
            contentContainerStyle={{ alignItems: "center", gap: 8 }}
            //style={{ borderColor: 'red', borderWidth: 4, }}
            renderItem={({ item, index }) => (
              <Dice
                key={index}
                number={item.value}
                size={52}
                active={item.active}
                onPress={() => changeActive(index)}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        )}
        <View style={{ alignItems: "center", gap: 16 }}>
          <Text>{error || ""}</Text>
          {gameOver ? (
            <Button title="New Game" onPress={initializeNewGame} />
          ) : (
            <>
              <Text style={styles.regularText}>Throws left: {throws}</Text>
              <Button title="Throw dices" onPress={throwDices} />
              <Text style={styles.bigText}>Total: {points}</Text>
              {points < 63 ? (
                <Text style={styles.regularText}>
                  You are {63 - points} points away from bonus!
                </Text>
              ) : (
                <Text>Congrats! Bonus points ({BONUS_POINTS}) added!</Text>
              )}
            </>
          )}
        </View>
      </View>
      <View style={styles.diceContainer}>
        <View>
          <FlatList
            data={Object.keys(gameState)}
            contentContainerStyle={{
              flexDirection: "row",
              display: "flex",
              alignItems: "center",
              gap: 8,
              justifyContent: "center",
            }}
            renderItem={({ item, index }) => {
              const diceValue = item;
              const points = gameState[
                Number(item) as keyof typeof gameState
              ] as number;
              return (
                <View style={{ alignItems: "center" }}>
                  <Text>{points}</Text>
                  <Dice
                    number={diceValue}
                    size={48}
                    onPress={() => pickPoints(Number(diceValue))}
                    active={points > 0}
                  />
                </View>
              );
            }}
            keyExtractor={(_, index) => index.toString()}
          />
          <Text
            style={[styles.regularText, styles.player, { alignSelf: "center" }]}
          >
            Player: {name}
          </Text>
        </View>
      </View>
      <Header text="Author: Rojhat" style={{ marginTop: 8 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "center",
    gap: 16,
    width: "100%",
    flex: 1,
  },
  rollingDiceContainer: {
    height: "50%",
    flex: 0,
  },
  player: {
    marginBottom: 16,
    fontSize: 24,
    textAlign: "center",
  },
  bigText: {
    fontSize: 32,
    fontWeight: "700",
  },
  regularText: {
    fontSize: 16,
    fontWeight: "500",
  },
  diceContainer: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 16,
  },
});

export default Gameboard;
