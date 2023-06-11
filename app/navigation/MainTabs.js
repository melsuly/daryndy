import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Octicons from '@expo/vector-icons/Octicons'

import HomeScreen from '@screens/Main/HomeScreen'
import MessangerScreen from '@screens/Main/MessangerScreen'
import ProfileScreen from '@screens/Main/ProfileScreen'

const MainTabs = () => {
    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => {
                return {
                    headerTitleStyle: {
                        fontFamily: 'Medium',
                    },
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName = 'dependabot'

                        switch (route.name) {
                            case 'Home':
                                iconName = 'home'
                                break
                            case 'Messanger':
                                iconName = 'comment-discussion'
                                break
                            case 'Profile':
                                iconName = 'person'
                                break
                        }

                        return (
                            <Octicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        )
                    },
                    tabBarActiveTintColor: '#008454',
                    tabBarInactiveTintColor: '#1F1F21',
                }
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen
                name="Messanger"
                component={MessangerScreen}
                options={{ title: 'Мессенджер' }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Профиль',
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTabs
