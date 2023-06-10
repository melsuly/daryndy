import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '@screens/Main/HomeScreen'

const MainTabs = () => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
        </Tab.Navigator>
    )
}

export default MainTabs
