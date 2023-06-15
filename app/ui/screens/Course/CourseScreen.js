import { StatusBar } from 'expo-status-bar'
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavigationBar from '@components/NavigationBar'
import ModulesView from '@components/Course/ModulesView'
import { useContext, useEffect, useState } from 'react'
import axios from '../../../axios'
import LoadingScreen from '@screens/LoadingScreen'
import { AuthContext } from '../../../providers/AuthProvider'

const CourseScreen = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [course, setCourse] = useState({})
    const { token } = useContext(AuthContext)
    const { id } = props.route.params

    const bgImage = {
        uri: 'https://www.de.digital/DIGITAL/Redaktion/EN/Bilder/Dossiers/digital-summit.jpg?__blob=normal&v=1&size=1900w',
    }

    const navigation = props.navigation

    const goBack = () => {
        navigation.goBack()
    }

    useEffect(() => {
        axios
            .get(`/courses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setCourse(res.data)
                console.log(course)
            })
            .catch((err) => {
                console.log('Login error: ', err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return <LoadingScreen />
    }

    return (
        <ScrollView style={styles.scrollView}>
            <ImageBackground style={styles.imageBackground} source={bgImage}>
                <View style={styles.colorOverlay} />
                <SafeAreaView>
                    <NavigationBar
                        title="Курс туралы"
                        rightButton={{
                            icon: 'share',
                            action: () => console.log('Share'),
                        }}
                        light
                        goBack={goBack}
                    />
                    <View style={styles.horizontalContainer}>
                        <View style={styles.infoView}>
                            <Text style={styles.textTitle}>{course.title}</Text>

                            <Text style={styles.textDescription}>
                                {course.description}
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>

            <View>
                <View style={styles.horizontalContainer}>
                    <Text style={styles.textSectionTitle}>Курс мазмұны</Text>

                    <ModulesView modules={course.modules} />
                </View>
            </View>
            <StatusBar style="light" />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    horizontalContainer: {
        paddingHorizontal: 16,
    },
    imageBackground: {
        position: 'relative',
    },
    colorOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

        backgroundColor: '#000',
        opacity: 0.8,
    },

    infoView: {
        marginVertical: 24,
    },

    textTitle: {
        fontFamily: 'Bold',
        fontSize: 22,

        color: '#FFF',

        marginBottom: 24,
    },
    textDescription: {
        fontFamily: 'Regular',
        fontSize: 16,

        lineHeight: 24,

        color: '#fff',
    },

    textSectionTitle: {
        fontFamily: 'Bold',
        fontSize: 22,

        marginTop: 36,
        marginBottom: 24,
    },
})

export default CourseScreen
