import { StyleSheet, View, Text } from 'react-native'

const ProgressView = (props) => {
    const tasks = Array.from(Array(props.taskCount).keys())
    const currentTask = props.currentTask

    const styles = createStyles()

    return (
        <View style={styles.view}>
            {tasks.map((task, index) => (
                <ProgressItem key={index} past={index < currentTask} active={index == currentTask} />
            ))}
        </View>
    )
}

const ProgressItem = (props) => {
    const itemState = props.active ? 'active' : props.past ? 'past' : 'none'
    const styles = createStyles(itemState)

    return <View style={styles.progressItem}></View>
}

const createStyles = (itemState = 'none') => {
    return StyleSheet.create({
        view: {
            flexDirection: 'row',
            justifyContent: 'center',

            marginVertical: 10,
        },

        progressItem: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor:
                itemState == 'active'
                    ? '#008454'
                    : itemState == 'past'
                    ? '#FFCC00'
                    : '#8E8E93',
            marginHorizontal: 5,
        },
    })
}

export default ProgressView
