import { StyleSheet, Text, View } from "react-native"
const Header = ({ text, style }) => {
    return (
        <View style={[styles.header, style]}>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: 'lightblue',
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: '450',
        color: 'white'
    }
})
export default Header