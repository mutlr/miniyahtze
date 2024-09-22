import { createContext, useRef, useState } from "react";
import useError from "../hooks/useError";
const GameContext = createContext()

export const GameProvider = ({ children }) => {
    const [dices, setDices] = useState([])
    const [throws, setThrows] = useState(3)
    const [error, setErrorMessage] = useError()
    const [gameState, setGameState] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0
    })

    const setValue = (index) => {
        if (dices[index]) {
            const newDice = {
                value: dices[index].value,
                active: !dices[index].active,
            };
            setDices(dices.map((dice, i) => (i === index ? newDice : dice)));
        }
    }

    const handleSelect = () => {
        const reduced = dices.reduce((accumulator, item) => {
            const index = item.value
            if (!accumulator[index]) {
                accumulator[index] = 0
            }
            accumulator[index] += 1
            return accumulator
        }, {})
        Object.entries(reduced).map(([index, value]) => {
            if (gameState[index] === 0) {
                gameState[index] = index * value
            } else {
                setErrorMessage(`You already have used number ${index}`)
                return
            }
        })
        setThrows(3)
    }
    const checkIfThrowsLeft = () => {
        for (const [key, dice] of Object.entries(gameState)) {
            console.log("Dice: ", dice)
            if (dice === 0) return true
        }
        return false
    }

    const throwDices = () => {
        if (checkIfThrowsLeft()) {
            setThrows(throws - 1)
        }
        if (dices.length === 0) {
            const diceList = []
            for (let i = 0; i < 6; i++) {
                diceList.push({
                    value: Math.floor(Math.random() * 6) + 1,
                    active: false,
                })
            }
            setDices(diceList)
        } else {
            setDices(dices.map((dice, i) => {
                if (dice && dice.active) {
                    return dice;
                }
                return {
                    value: Math.floor(Math.random() * 6) + 1,
                    active: false,
                }
            }))
        }
    }
    return (
        <GameContext.Provider
            value={{
                dices,
                throwDices,
                setValue,
                throws,
                gameState,
                handleSelect,
                error
            }}
        >
            {children}
        </GameContext.Provider>
    )
}

export default GameContext