import { useState } from "react"
const useError = () => {
    const [error, setError] = useState(null)

    const setErrorMessage = (message) => {
        setError(message)
        setTimeout(() => {
            setError(null)
        }, 10000);
    }
    return [error, setErrorMessage]
}

export default useError