import { Text, View, StyleSheet } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT } from "../utilities/constants"
import Button from "./Button";
const Rules = ({ route, navigation }) => {
    const name = route.params.name
    const navigate = () => {
        navigation.navigate("Game")
    }
    return (
        <View style={styles.container}>
            <Ionicons name="information-circle" size={100} color="#3293a8" />
            <Text style={styles.header}>Rules of the Game</Text>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    THE GAME: Upper section of the classic Yahtzee
                    dice gam e. You have {NBR_OF_DICES} dices and
                    for the every dice you have {NBR_OF_THROWS}
                    throws. After each throw you can keep dices in
                    order to get sam e dice spot counts as m any as
                    possible. In the end of the turn you m ust select
                    your points from {MIN_SPOT} to {MAX_SPOT}.
                    Game ends when all points have been selected.
                    The order for selecting those is free.
                </Text>
                <Text style={styles.text}>
                    POINTS: After each turn game calculates the sum
                    for the dices you selected. Only the dices having
                    the sam e spot count are calculated. Inside the
                    game you can not select same points from
                    {MIN_SPOT} to {MAX_SPOT} again.
                </Text>
                <Text style={styles.text}>
                    GOAL: To get points as m uch as possible.
                    {BONUS_POINTS_LIMIT} points is the limit of
                    getting bonus which gives you {BONUS_POINTS}
                    points more.</Text>
                <Text style={styles.luck}>Good luck, {name}</Text>
            </View>
            <Button title="Play" onPress={navigate} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
    },
    textContainer: {
        gap: 16,
        alignItems: 'center',
        padding: 16
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
    button: {
        borderRadius: 40
    },
    luck: {
        fontWeight: '700',
        fontSize: 18
    }
})
export default Rules