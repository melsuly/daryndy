import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainTabs from './MainTabs'
import ChatScreen from '@screens/ChatScreen'
import AdminScreen from '@screens/Admin/AdminScreen'
import CreateCourseScreen from '@screens/Admin/CreateCourseScreen'
import CreateModuleScreen from '@screens/Admin/CreateModuleScreen'
import СreateLessonScreen from '@screens/Admin/CreateLessonScreen'
import CreateTaskScreen from '@screens/Admin/CreateTaskScreen'
import ManageCourseScreen from '@screens/Admin/CourseScreen'
import ManageModuleScreen from '@screens/Admin/ModuleScreen'
import ManageLessonScreen from '@screens/Admin/LessonScreen'

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
            <Stack.Group>
                <Stack.Screen
                    name="Admin"
                    component={AdminScreen}
                    options={{ title: 'Курстар' }}
                />
                <Stack.Screen
                    name="CreateCourse"
                    component={CreateCourseScreen}
                    options={{ title: 'Жаңа курс' }}
                />
                <Stack.Screen
                    name="ManageCourse"
                    component={ManageCourseScreen}
                    options={{ title: 'Курс параметрлері' }}
                />
                <Stack.Screen
                    name="ManageModule"
                    component={ManageModuleScreen}
                    options={{ title: 'Бөлім параметрлері' }}
                />
                <Stack.Screen
                    name="CreateModule"
                    component={CreateModuleScreen}
                    options={{ title: 'Жаңа бөлім' }}
                />
                <Stack.Screen
                    name="CreateLesson"
                    component={СreateLessonScreen}
                    options={{ title: 'Жаңа сабақ' }}
                />
                <Stack.Screen
                    name="CreateTask"
                    component={CreateTaskScreen}
                    options={{ title: 'Жаңа тапсырма' }}
                />

                <Stack.Screen
                    name="ManageLesson"
                    component={ManageLessonScreen}
                    options={{ title: 'Сабақ параметрлері' }}
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default UserStack
