import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Octicons } from '@expo/vector-icons'
const ModuleCard = (props) => {
    const module = props.module || {}
    const isLast = props.last ? true : false
    const navigation = props.navigation

    const pressedAction = () => {
        navigation.navigate('ManageModule', { id: module._id })
    }

    return (
        <TouchableOpacity onPress={pressedAction}>
            <View style={isLast ? null : styles.viewBorder}>
                <View style={styles.view}>
                    <View style={styles.moduleView}>
                        <Text style={styles.textTitle}>{module.title}</Text>

                        <Octicons
                            style={styles.iconFold}
                            name={'chevron-right'}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 16,
    },

    moduleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingVertical: 16,
    },

    viewBorder: {
        borderBottomColor: '#C7C7CC',
        borderBottomWidth: 1,
    },

    textTitle: {
        fontFamily: 'Regular',
        fontSize: 16,
    },

    iconFold: {
        fontSize: 24,
    },
})

export default ModuleCard
