import { StyleSheet, View, ScrollView, ImageBackground } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../axios'
import LoadingScreen from '@screens/LoadingScreen'
import { AuthContext } from '../../../providers/AuthProvider'
import { Text, Button, Icon, Card, FAB } from '@rneui/themed'
import ModulesView from '../../components/Admin/Course/ModulesView'

const CourseScreen = ({ navigation, route }) => {
    const [course, setCourse] = useState({})
    const { token } = useContext(AuthContext)
    const { id } = route.params

    const [isLoading, setIsLoading] = useState(true)

    const bgImage = {
        uri: 'https://www.de.digital/DIGITAL/Redaktion/EN/Bilder/Dossiers/digital-summit.jpg?__blob=normal&v=1&size=1900w',
    }

    const loadCourse = () => {
        setIsLoading(true)
        axios
            .get(`/courses/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setCourse(res.data)
            })
            .catch((err) => {
                console.warn(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(loadCourse, [])

    if (isLoading) return <LoadingScreen />

    return (
        <>
            <ScrollView style={styles.scrollView}>
                <ImageBackground
                    style={styles.imageBackground}
                    source={bgImage}
                >
                    <View style={styles.colorOverlay} />
                    <View>
                        {/* <NavigationBar
                        title="Курс туралы"
                        rightButton={{
                            icon: 'share',
                            action: () => console.log('Share'),
                        }}
                        light
                        goBack={goBack}
                    /> */}
                        <View style={styles.horizontalContainer}>
                            <View style={styles.infoView}>
                                <Text style={styles.textTitle}>
                                    {course.title}
                                </Text>

                                <Text style={styles.textDescription}>
                                    {course.description}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                <View>
                    <View style={styles.horizontalContainer}>
                        <Text style={styles.textSectionTitle}>
                            Курс мазмұны
                        </Text>

                        <ModulesView navigation={navigation} modules={course.modules} />
                    </View>
                </View>
            </ScrollView>
            <FAB
                onPress={() => {
                    navigation.navigate('CreateModule', {
                        loadCourse,
                        courseID: course._id,
                    })
                }}
                visible={true}
                placement="right"
                style={{ marginBottom: 24 }}
                icon={{ type: 'octicon', name: 'plus', color: 'white' }}
                color="#008454"
            />
        </>
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