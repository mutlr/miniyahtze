import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Scoreboard from '../components/Scoreboard';
import Header from '../components/Header';
import Rules from '../components/Rules';
import Gameboard from '../components/Gameboard';
const Tab = createBottomTabNavigator();
const options = {
    headerTitleAlign: 'center',
    headerStyle: {
        backgroundColor: 'lightblue',
        height: 60,
    },
    tabBarLabelStyle: {
        fontSize: 16,
        size: 24,
    },
    tabBarActiveTintColor: 'lightblue',
    tabBarInactiveTintColor: 'lightgray',
}
const Navigation = ({ name }) => {
    return (
        <Tab.Navigator initialRouteName='Game'
            screenOptions={{
                header: () => (
                    <Header text='Mini-Yahtzee' />
                ),

            }}
            tabBar={(props) => (
                <>
                    <Header text='Author: Rojhat' />
                    <BottomTabBar {...props} />
                </>
            )}
        >
            <Tab.Screen
                name="Rules"
                component={Rules}
                initialParams={{ name: name }}
                options={{
                    ...options,
                    title: "Rules",
                    tabBarIcon: ({ size, color, focused }) => (
                        <Ionicons name="information-circle" size={size} color={focused ? color : 'lightgray'} />
                    ),
                    tabBarLabel: 'Rules',
                }} />
            <Tab.Screen
                name='Game'
                component={Gameboard}
                initialParams={{ name: name }}
                options={{
                    ...options,
                    title: "Game",
                    tabBarLabel: 'Game',

                    tabBarIcon: ({ size, color, focused }) => (
                        <Ionicons name="dice-sharp" size={size} color={focused ? color : 'lightgray'} />
                    ),
                }}
            />
            <Tab.Screen name='Scoreboard' component={Scoreboard}
                options={{
                    ...options,
                    title: "Scoreboard",
                    tabBarLabel: 'Scoreboard',
                    tabBarIcon: ({ size, color, focused }) => (
                        <MaterialCommunityIcons name="scoreboard" size={size} color={focused ? color : 'lightgray'} />
                    ),
                }}
            />
        </Tab.Navigator >
    );
}

export default Navigation