import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainTabs from './MainTabs'

const UserStack = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainTabs"
                component={MainTabs}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default UserStack
