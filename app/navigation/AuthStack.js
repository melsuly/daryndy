import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from '@screens/Auth/RegisterScreen'
import LoginScreen from '@screens/Auth/LoginScreen'

const AuthStack = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
            </Stack.Group>
            
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: 'Тіркелу' }}
            />
        </Stack.Navigator>
    )
}

export default AuthStack
