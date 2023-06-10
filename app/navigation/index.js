import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import AuthStack from './AuthStack'
import UserStack from './UserStack'

const Navigation = () => {
    const isAuthorized = false

    const CustomTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            background: 'white',
        },
    }

    return (
        <NavigationContainer theme={CustomTheme}>
            {isAuthorized ? <UserStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Navigation
