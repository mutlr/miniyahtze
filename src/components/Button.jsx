import { Pressable, StyleSheet, Text } from "react-native"

const Button = ({ title, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'blue',
        minWidth: 120,
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 14
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
})
export default Button