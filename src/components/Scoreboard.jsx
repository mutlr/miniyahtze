import { FlatList, StyleSheet, Text, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCOREBOARD_KEY } from "../utilities/constants";
import Button from "./Button";
import { useIsFocused } from '@react-navigation/native';
const games = [
    {
        points: 50,
        date: new Date(),
        id: 1
    },
    {
        points: 60,
        date: new Date(),
        id: 2
    },
    {
        points: 40,
        date: new Date(),
        id: 3
    },
    {
        points: 700,
        date: new Date(),
        id: 4
    },
    {
        points: 90,
        date: new Date(),
        id: 5
    },
    {
        points: 120,
        date: new Date(),
        id: 6
    },
    {
        points: 30,
        date: new Date(),
        id: 7
    },
    {
        points: 450,
        date: new Date(),
        id: 8
    },
    {
        points: 320,
        date: new Date(),
        id: 9
    },
    {
        points: 110,
        date: new Date(),
        id: 10
    },
    {
        points: 150,
        date: new Date(),
        id: 11
    },
    {
        points: 200,
        date: new Date(),
        id: 12
    },
    {
        points: 250,
        date: new Date(),
        id: 13
    },
    {
        points: 300,
        date: new Date(),
        id: 14
    },
    {
        points: 500,
        date: new Date(),
        id: 15
    },
    {
        points: 400,
        date: new Date(),
        id: 16
    },
    {
        points: 275,
        date: new Date(),
        id: 17
    },
    {
        points: 600,
        date: new Date(),
        id: 18
    },
    {
        points: 750,
        date: new Date(),
        id: 19
    },
    {
        points: 65,
        date: new Date(),
        id: 20
    },
    {
        points: 85,
        date: new Date(),
        id: 21
    },
    {
        points: 95,
        date: new Date(),
        id: 22
    },
    {
        points: 170,
        date: new Date(),
        id: 23
    },
    {
        points: 220,
        date: new Date(),
        id: 24
    }
];

const formatDate = (date) => {
    const tempDate = new Date(date)
    const day = String(tempDate.getDate()).padStart(2, '0');
    const month = String(tempDate.getMonth() + 1).padStart(2, '0');
    const year = tempDate.getFullYear();

    return `${day}.${month}.${year}`;
};
const Scoreboard = ({ route }) => {
    const [scoreboard, setScoreboard] = useState(games)
    const isFocused = useIsFocused();
    const name = route.params.name
    /*useEffect(() => {
        AsyncStorage.getItem(SCOREBOARD_KEY)
            .then(result => {
                const res = JSON.parse(result)
                if (res) {
                    setScoreboard(res.sort((a, b) => b.points - a.points));
                }
            })
            .catch(err => console.error(`Error from scoreboard ${err}`))
    }, [isFocused])*/

    const clearScoreboard = async () => {
        try {
            await AsyncStorage.removeItem(SCOREBOARD_KEY)
            setScoreboard([])
            console.info("Scoreboard cleared")
        } catch (error) {
            console.error("Error clearing scoreboard", error)
        }
    }
    return (
        <View style={styles.container}>
            <AntDesign style={styles.icon} name="dashboard" size={100} color="#3293a8" />
            <Text style={styles.header}>Top Seven</Text>
            {scoreboard.length === 0 ?
                <Text style={{ fontSize: 24, fontWeight: 400 }}>Scoreboard is empty</Text> :
                <FlatList
                    data={scoreboard}
                    style={{ width: '100%', marginTop: 24 }}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{ gap: 16, }}
                    renderItem={({ item, index }) => (
                        <View style={styles.scoreContainer}>
                            <Text style={styles.scoreText}>{index + 1}.   {name}</Text>
                            <Text style={styles.scoreText}>{formatDate(item.date)}</Text>
                            <Text style={[styles.scoreText, { fontWeight: 700 }]}>{item.points}</Text>
                        </View>
                    )}
                />}
            {scoreboard.length !== 0 && <View style={{ marginTop: 30 }}>
                <Button title='Clear scoreboard' color='red' onPress={clearScoreboard} />
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 8
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 300,
    },
    icon: {
        marginTop: 32,
        marginBottom: 32
    },
    scoreContainer: {
        paddingBottom: 6,
        borderBottomWidth: 2,
        borderColor: 'black',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    scoreText: {
        fontSize: 18
    }
})
export default Scoreboard