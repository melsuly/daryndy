import {
    StyleSheet,
    View,
    ScrollView,
    ImageBackground,
    FlatList,
} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from '../../../axios'
import LoadingScreen from '@screens/LoadingScreen'
import { AuthContext } from '../../../providers/AuthProvider'
import { Text, Button, Icon, Card, FAB, ListItem } from '@rneui/themed'

const LessonScreen = ({ navigation, route }) => {
    const [lesson, setLesson] = useState({})
    const { token } = useContext(AuthContext)
    const { id } = route.params

    const [isLoading, setIsLoading] = useState(true)

    const bgImage = {
        uri: 'https://www.de.digital/DIGITAL/Redaktion/EN/Bilder/Dossiers/digital-summit.jpg?__blob=normal&v=1&size=1900w',
    }

    const loadLesson = () => {
        setIsLoading(true)
        axios
            .get(`/lessons/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setLesson(res.data)
            })
            .catch((err) => {
                console.warn(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(loadLesson, [])

    if (isLoading) return <LoadingScreen />

    return (
        <>
            <View style={styles.scrollView}>
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
                                    {lesson.title}
                                </Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>

                <View>
                    <View style={styles.horizontalContainer}>
                        <Text style={styles.textSectionTitle}>
                            Сабақ мазмұны
                        </Text>

                        <FlatList
                            data={lesson.contents}
                            renderItem={TaskItem}
                            keyExtractor={(item, index) =>
                                item.category + index
                            }
                        />
                    </View>
                </View>
            </View>
            <FAB
                onPress={() => {
                    navigation.navigate('CreateTask', {
                        loadLesson,
                        lessonID: lesson._id,
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

const TaskItem = ({ item }) => {
    const categories = {
        lecture: 'Лекция',
        playground: 'Практика',
        quiz: 'Квиз',
    }

    return (
        <ListItem>
            <Icon name="label-important-outline" type="material" />
            <ListItem.Content>
                <ListItem.Title>{categories[item.category]}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
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

export default LessonScreen
