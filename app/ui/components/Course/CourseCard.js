import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const CourseCard = (props) => {
    const course = props.course
    const navigation = props.navigation

    const pictureSource = {
        uri: 'https://free.atamura.kz/wp-content/uploads/2020/04/Информатика_7класс_КШ_.jpg',
    }

    const openCourse = () => {
        navigation.navigate('Course', { id: course._id })
    }

    return (
        <TouchableOpacity onPress={openCourse} style={styles.card}>
            <Image
                resizeMode="center"
                style={styles.cardImage}
                source={pictureSource}
            />
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{course.title}</Text>

                <Text style={styles.cardDescription}>{course.description}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CourseCard

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        borderColor: '#C7C7CC',
        borderWidth: 1,

        padding: 10,

        flexDirection: 'row',

        marginBottom: 16,
    },

    cardImage: {
        width: 100,
        height: 100,

        borderRadius: 10,
    },

    cardInfo: {
        marginHorizontal: 10,
        flexShrink: 1,
    },

    cardTitle: {
        fontFamily: 'Regular',
        fontSize: 16,
    },

    cardDescription: {
        fontFamily: 'Regular',
        fontSize: 12,
        color: '#8E8E93',

        marginTop: 10,
    },
})
