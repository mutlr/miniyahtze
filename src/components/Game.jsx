import { Text, View, StyleSheet, Pressable, FlatList } from "react-native"
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Button from "./Button";
import { act, useContext, useState } from "react";
import GameContext from "../context/gameContext";
const Dice = ({ number, size = 40, disabled = false, onPress }) => {
    const [active, setActive] = useState(false)
    const changeActive = () => {
        onPress()
        setActive(!active)
    }
    return (
        <Pressable
            disabled={disabled}
            onPress={changeActive}
        >
            <MaterialCommunityIcons
                name={`dice-${number}`}
                size={size}
                color={active ? 'blue' : 'black'} />
        </Pressable>
    )
}

const Game = ({ route }) => {
    const { throwDices, dices, setValue, throws, gameState, handleSelect, error } = useContext(GameContext)
    const name = route.params.name
    const changeActive = (index) => {
        setValue(index)
    }
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                {dices.length === 0 ?
                    <MaterialCommunityIcons name="dice-multiple" size={100} color="blue" /> :
                    <FlatList
                        data={dices}
                        horizontal={true}
                        contentContainerStyle={{ alignItems: 'center', gap: 8, }}
                        //style={{ borderColor: 'red', borderWidth: 4, }}
                        renderItem={({ item, index }) => (
                            <Dice key={index} number={item.value} size={52} disabled={false} onPress={() => changeActive(index)} />
                        )}
                        keyExtractor={(item, index) => index}
                    />}
                {error && <Text>{error}</Text>}
                {throws === 0 ?
                    <>
                        <Text>Select your dices</Text>
                        <Button title='Select' onPress={handleSelect} />
                    </> :
                    <>
                        <Text style={styles.regularText}>Throws left: {throws}</Text>
                        <Text style={styles.regularText}>Throw dices.</Text>
                        <Button title='Throw dices' onPress={throwDices} />
                    </>}
                <Text style={styles.bigText}>Total: 0</Text>
                <Text style={styles.regularText}>You are 63 points away from bonus!</Text>

            </View>
            <View style={styles.diceContainer}>
                <FlatList
                    data={Object.keys(gameState)}
                    contentContainerStyle={{ flexDirection: 'row', display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}
                    renderItem={({ item, index }) => {
                        const diceValue = item
                        const points = gameState[item]
                        return (
                            <View style={{ alignItems: 'center' }}>
                                <Text>{points}</Text>
                                <Dice number={diceValue} size={48} disabled={true} />
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index}
                />
            </View>
            <Text style={[styles.regularText, styles.player]}>Player: {name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        gap: 16,
        width: '100%'
    },
    player: {
        marginBottom: 16,
        fontSize: 24
    },
    bigText: {
        fontSize: 32,
        fontWeight: '700',
    },
    regularText: {
        fontSize: 16,
        fontWeight: '450'
    },
    diceContainer: {
        flexDirection: 'row',
        gap: 16
    }
})

export default Game