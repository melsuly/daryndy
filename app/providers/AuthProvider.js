import { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    const authorize = async (user) => {
        setUser(user)
        setToken(user.token)

        await AsyncStorage.setItem('user', JSON.stringify(user))
        await AsyncStorage.setItem('token', user.token)
    }

    const logout = () => {
        setToken(null)
        AsyncStorage.removeItem('token')
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)

            let token = await AsyncStorage.getItem('token')
            let user = await AsyncStorage.getItem('user')

            user = JSON.parse(user)

            if (user && token) {
                setToken(token)
                setUser(user)
            }

            setIsLoading(false)
        } catch (err) {
            console.warn('Error in AsyncStorage:', err)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])

    return (
        <AuthContext.Provider
            value={{ token, authorize, logout, isLoading, user }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
