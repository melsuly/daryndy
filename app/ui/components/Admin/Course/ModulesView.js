import { StyleSheet, View } from 'react-native'
import ModuleCard from './ModuleCard'

const ModulesView = (props) => {
    const modules = props.modules || []
    const navigation = props.navigation

    return (
        <View style={styles.view}>
            {modules.map((module, index) => (
                <ModuleCard
                    navigation={navigation}
                    key={module.title}
                    module={module}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        marginBottom: 24,

        borderRadius: 10,
        borderColor: '#C7C7CC',
        borderWidth: 1,
    },
})

export default ModulesView
