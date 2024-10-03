import { Pressable, StyleSheet, Text } from "react-native"

const Button = ({ title, onPress, color }) => {
    return (
        <Pressable onPress={onPress} style={[styles.container, { backgroundColor: color || '#3293a8' }]}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    container: {
        minWidth: 120,
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 14,
        padding: 35
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
    }
})
export default Button