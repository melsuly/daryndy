import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainTabs from './MainTabs'
import ChatScreen from '@screens/ChatScreen'

const UserStack = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="MainTabs"
                    component={MainTabs}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Chat" component={ChatScreen} />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default UserStack
