import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '@screens/Auth/LoginScreen'

const AuthStack = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack
