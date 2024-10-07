import { StyleSheet, Text, TextInput, View } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import Button from "./Button";
const Register = ({ setName }) => {
    const [text, onChangeText] = useState('');
    const ref = useRef()

    const onSubmit = () => {
        if (text === '') {
            return
        }
        setName(text)
    }
    return (
        <View style={styles.main}>
            <Header text='Mini-Yahtzee' />
            <Ionicons name="information-circle" size={100} color="lightblue" />
            <Text style={[styles.text, { fontSize: 24, color: 'black' }]}>For scoreboard enter your name</Text>
            <TextInput
                ref={ref}
                style={styles.input}
                onChangeText={onChangeText}
                onLayout={() => ref.current.focus()}
                cursorColor={'black'}
            />
            <Button title="OK" onPress={onSubmit} />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        gap: 16
    },
    header: {
        backgroundColor: 'blue',
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        borderWidth: 2,
        borderColor: 'black',
        maxWidth: '80%',
        width: '100%',
        height: 32,
        textAlignVertical: 'center',
        paddingLeft: 8,
    },
    text: {
        fontSize: 24,
        fontWeight: '450',
        color: 'white'
    }
})
export default Register