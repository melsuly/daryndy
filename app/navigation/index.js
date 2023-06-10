import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './AuthStack'
import UserStack from './UserStack'

const Navigation = () => {
    const isAuthorized = false

    return (
        <NavigationContainer>
            {isAuthorized ? <UserStack /> : <AuthStack />}
        </NavigationContainer>
    )
}

export default Navigation
