import { Text, View, StyleSheet, ScrollView } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT } from "../utilities/constants"
import Button from "./Button";
import Header from "./Header";
const Rules = ({ route, navigation }) => {
    const name = route.params.name
    const navigate = () => {
        navigation.navigate("Game")
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <Ionicons name="information-circle" size={100} color="#3293a8" />
                <Text style={styles.header}>Rules of the Game</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        THE GAME: Upper section of the classic Yahtzee
                        dice game. You have {NBR_OF_DICES} dices and
                        for the every dice you have {NBR_OF_THROWS}
                        throws. After each throw you can keep dices in
                        order to get same dice spot counts as many as
                        possible. In the end of the turn you must select
                        your points from {MIN_SPOT} to {MAX_SPOT}.
                        Game ends when all points have been selected.
                        The order for selecting those is free.
                    </Text>
                    <Text style={styles.text}>
                        POINTS: After each turn game calculates the sum
                        for the dices you selected. Only the dices having
                        the same spot count are calculated. Inside the
                        game you can not select same points from
                        {' ' + MIN_SPOT} to {MAX_SPOT} again.
                    </Text>
                    <Text style={styles.text}>
                        GOAL: To get points as much as possible.
                        {BONUS_POINTS_LIMIT} points is the limit of
                        getting bonus which gives you {BONUS_POINTS + ' '}
                        points more.</Text>
                    <Text style={styles.luck}>Good luck, {name}</Text>
                </View>
                <Button title="Play" onPress={navigate} />
                <Header text='Author: Rojhat' style={{ marginTop: 8 }} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        flexDirection: 'column',
        display: 'flex',
    },
    textContainer: {
        gap: 8,
        alignItems: 'center',
        padding: 8
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        fontWeight: '400'
    },
    luck: {
        fontWeight: '700',
        fontSize: 18
    },
})
export default Rules