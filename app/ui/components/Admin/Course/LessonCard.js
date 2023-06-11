import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const LessonCard = (props) => {
    const navigation = useNavigation()

    const lesson = props.lesson
    const index = props.index + 1

    const pressedAction = () => {
        navigation.navigate('ManageLesson', {
            id: lesson._id,
        })
    }

    return (
        <TouchableOpacity onPress={pressedAction}>
            <View style={styles.viewPoint} />
            <View style={styles.view}>
                <Text style={styles.textTitle}>{lesson.title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    viewPoint: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 4,

        left: -21,
        top: 22,

        backgroundColor: '#008454',
    },

    view: {
        paddingVertical: 16,
    },
    textTitle: {
        fontFamily: 'Regular',
        fontSize: 16,
    },
})

export default LessonCard
