import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import Register from './src/components/Register';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation/Navigation';
import { GameProvider } from './src/context/gameContext';
export default function App() {
  const [name, setName] = useState('null')
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <GameProvider>
        <View style={styles.container}>
          {name === null ?
            <Register setName={setName} /> :
            <Navigation name={name} />}
        </View>
      </GameProvider>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#fff',
  },
  rulesContainer: {

  }
});
