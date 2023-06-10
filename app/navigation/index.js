import { useContext } from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import AuthStack from './AuthStack'
import UserStack from './UserStack'
import { AuthContext } from '../providers/AuthProvider'
import LoadingScreen from '@screens/LoadingScreen'

const Navigation = () => {
    const { isLoading, token } = useContext(AuthContext)

    const CustomTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'white',
        },
    }

    if (isLoading) return <LoadingScreen />

    return (
        <NavigationContainer theme={CustomTheme}>
            {token != null ? <UserStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Navigation
