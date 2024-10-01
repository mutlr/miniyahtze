import { FlatList, StyleSheet, Text, View } from "react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCOREBOARD_KEY } from "../utilities/constants";

const Scoreboard = () => {
    const [scoreboard, setScoreboard] = useState([])
    useEffect(() => {
        AsyncStorage.getItem(SCOREBOARD_KEY)
            .then(result => {
                const res = JSON.parse(result)
                console.log(`Result ${res[0]} ${result[0]['id']}`)
                setScoreboard(res)
            })
            .catch(err => console.error(`Error from scoreboard ${err}`))
    }, [])
    return (
        <View style={styles.container}>
            <AntDesign style={styles.icon} name="dashboard" size={100} color="black" />
            <Text style={styles.header}>Top Seven</Text>
            <FlatList
                data={scoreboard}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    console.log(item.points)
                    return (
                        <Text>{item.points}</Text>

                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        marginTop: 32,
        marginBottom: 32
    }
})
export default Scoreboard