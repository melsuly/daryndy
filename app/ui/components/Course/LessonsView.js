import { StyleSheet, View } from 'react-native'
import LessonCard from './LessonCard'

const LessonsView = (props) => {
    const lessons = props.lessons

    return (
        <View style={styles.view}>
            {lessons.map((lesson, index) => (
                <LessonCard key={lesson.title} index={index} lesson={lesson} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        borderLeftColor: '#8E8E93',
        borderLeftWidth: 2,

        paddingLeft: 16,
    },
})

export default LessonsView
