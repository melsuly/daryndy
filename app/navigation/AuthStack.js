import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from '@screens/Auth/RegisterScreen'
import LoginScreen from '@screens/Auth/LoginScreen'

const AuthStack = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
    )
}

export default AuthStack
