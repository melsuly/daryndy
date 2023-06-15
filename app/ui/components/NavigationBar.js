import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Octicons } from '@expo/vector-icons'

const NavigationBar = (props) => {
    const title = props.title
    const goBack = props.goBack || null
    const rightButton = props.rightButton || null

    const isLight = props.light ? true : false
    const styles = createStyles(isLight)

    return (
        <View style={styles.navigationBar}>
            <View style={styles.leftBar}>
                {goBack != null && (
                    <TouchableOpacity
                        onPress={goBack}
                        style={styles.backButton}
                    >
                        <Octicons
                            style={styles.backButtonIcon}
                            name="chevron-left"
                        />
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.titleBar}>
                <Text style={styles.titleBarText}>{title}</Text>
            </View>
            <View style={styles.rightBar}>
                {rightButton && (
                    <TouchableOpacity onPress={rightButton.action} style={styles.barItemButton}>
                        <Octicons
                            style={styles.barItemIcon}
                            name={rightButton.icon}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const createStyles = (isLight) => {
    return StyleSheet.create({
        navigationBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',

            paddingVertical: 10,
            paddingHorizontal: 16,
        },

        leftBar: {},

        titleBar: {},

        titleBarText: {
            fontFamily: 'Bold',
            fontSize: 18,

            color: isLight ? '#F7F7F7' : '#1F1F21',
        },

        rightBar: {},

        backButton: {},

        backButtonIcon: {
            fontSize: 36,

            color: isLight ? '#F7F7F7' : '#1F1F21',
        },

        barItemButton: {},

        barItemIcon: {
            fontSize: 24,

            color: isLight ? '#F7F7F7' : '#1F1F21',
        },
    })
}

export default NavigationBar
