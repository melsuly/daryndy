import { useContext, useEffect, useState } from 'react'
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationBar from '@components/NavigationBar'
import { StatusBar } from 'expo-status-bar'
import { Octicons } from '@expo/vector-icons'
import ProgressView from '@components/Course/ProgressView'
import RenderLesson from '../../components/Lesson/RenderLesson'
import LoadingScreen from '@screens/LoadingScreen'
import axios from '../../../axios'
import { AuthContext } from '../../../providers/AuthProvider'

const LessonScreen = (props) => {
    const navigation = props.navigation

    const [isBackShowed, setIsBackShowed] = useState(true)

    const { index } = props.route.params
    const lessonID = props.route.params.lesson._id

    const [lesson, setLesson] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const [taskCount, setTaskCount] = useState(0)
    const [currentTask, setCurrentTask] = useState(0)
    const [taskStates, setTaskStates] = useState([])

    const saveTaskState = (state) => {
        const globalState = [...taskStates]

        globalState[currentTask] = state

        setTaskStates(globalState)
    }

    const getTaskState = () => {
        return taskStates[currentTask]
    }

    const { user, token } = useContext(AuthContext)

    const styles = createStyles()

    const nextTask = () => {
        if (currentTask < taskCount - 1) {
            setCurrentTask(currentTask + 1)

            setIsBackShowed(
                lesson.contents[currentTask].category != 'quiz' &&
                    lesson.contents[currentTask].category != 'playground'
            )
        }
    }

    const prevTask = () => {
        if (currentTask > 0) {
            setIsBackShowed(
                lesson.contents[currentTask - 1].category != 'quiz' &&
                    lesson.contents[currentTask - 1].category != 'playground'
            )

            setCurrentTask(currentTask - 1)
        }
    }

    const finishLesson = () => {
        navigation.replace('LessonResult', { lesson, taskStates })
    }

    const showStats = () => {
        navigation.navigate('LessonStats')
    }

    const checkTask = () => {
        Alert.alert('Тапсырма қорытындысы', 'Жауап дұрыс!')
    }

    useEffect(() => {
        const fetchLesson = async () => {
            axios
                .get(`/lessons/${lessonID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setLesson(res.data)
                    setTaskCount(res.data.contents.length)
                })
                .catch((err) => {
                    console.log('Lesson error: ', err)
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
        fetchLesson()
    }, [])

    if (isLoading) return <LoadingScreen />

    if (taskCount < 1) {
        Alert.alert('LESSON CONTENT NOT FOUND ERROR!')
        return navigation.goBack()
    }

    return (
        <>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                style={styles.scrollView}
            >
                <SafeAreaView>
                    <NavigationBar
                        title={'Сабақ №' + index}
                        rightButton={
                            user.role == 'admin'
                                ? {
                                      icon: 'graph',
                                      action: showStats,
                                  }
                                : null
                        }
                        goBack={navigation.goBack}
                    />
                </SafeAreaView>

                <View style={styles.horizontalContainer}>
                    <View style={styles.viewHeader}>
                        <Text style={styles.textTitle}>{lesson.title}</Text>
                    </View>
                </View>

                <ProgressView taskCount={taskCount} currentTask={currentTask} />

                <View style={styles.viewLessonContent}>
                    <RenderLesson
                        getTaskState={getTaskState}
                        saveTaskState={saveTaskState}
                        lesson={lesson}
                        currentTask={currentTask}
                    />
                </View>
            </ScrollView>

            <SafeAreaView edges={['bottom']} style={styles.viewControls}>
                <TouchableOpacity
                    onPress={prevTask}
                    style={styles.buttonControl}
                >
                    <Octicons
                        name="arrow-left"
                        style={styles.buttonControlIcon}
                    />
                    <Text style={styles.buttonControlText}>Артқа</Text>
                </TouchableOpacity>

                {currentTask < taskCount - 1 && (
                    <TouchableOpacity
                        onPress={nextTask}
                        style={styles.buttonControl}
                    >
                        <Text style={styles.buttonControlText}>Келесі</Text>
                        <Octicons
                            name="arrow-right"
                            style={styles.buttonControlIcon}
                        />
                    </TouchableOpacity>
                )}
                {currentTask == taskCount - 1 && (
                    <TouchableOpacity
                        onPress={finishLesson}
                        style={styles.buttonControl}
                    >
                        <Text style={styles.buttonControlText}>Аяқтау</Text>
                        <Octicons
                            name="rocket"
                            style={styles.buttonControlIcon}
                        />
                    </TouchableOpacity>
                )}
            </SafeAreaView>
            <StatusBar style="dark" />
        </>
    )
}

const createStyles = () => {
    return StyleSheet.create({
        horizontalContainer: {
            paddingHorizontal: 16,
        },
        viewHeader: {},
        textTitle: {
            fontFamily: 'Bold',
            fontSize: 22,

            color: '#1F1F21',

            marginBottom: 24,
        },

        scrollView: {
            flex: 1,
        },

        viewControls: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,

            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

            paddingHorizontal: 16,

            backgroundColor: '#008454',
        },
        buttonControl: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',

            paddingVertical: 16,
        },
        buttonControlIcon: {
            fontSize: 24,
            marginHorizontal: 5,
            color: '#F7F7F7',
        },
        buttonControlText: {
            fontFamily: 'Regular',
            fontSize: 20,

            marginHorizontal: 5,

            color: '#F7F7F7',
        },

        viewLessonContent: {
            paddingBottom: 64,
        },
    })
}

export default LessonScreen
