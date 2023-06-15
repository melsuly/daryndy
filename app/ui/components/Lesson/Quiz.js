import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import CodeEditor, {
    CodeEditorSyntaxStyles,
} from '@rivascva/react-native-code-editor'
import { useEffect, useState } from 'react'
import { Input, Button } from '@rneui/themed'

const Quiz = (props) => {
    const content = props.content

    const styles = createStyles()

    const [selected, setSelected] = useState(null)

    const [value, setValue] = useState('')

    const variantPressed = (index) => {
        setSelected(index)
        props.saveTaskState(index)
    }

    const ansChanged = (val) => {
        setValue(val)
        props.saveTaskState(val)
    }

    useEffect(() => {
        if (content[0].type == 'test') {
            setSelected(props.taskState)
        } else {
            setValue(props.taskState)
        }
    }, [])

    switch (content[0].type) {
        case 'test':
            return (
                <View style={styles.horizontalContainer}>
                    <Text style={styles.textQuestion}>
                        {content[0].question}
                    </Text>

                    {content[0].variants.map((variant, index) => {
                        return (
                            <TouchableOpacity
                                onPress={() => variantPressed(index)}
                                key={variant}
                                style={
                                    index == selected
                                        ? styles.variantSelected
                                        : styles.variant
                                }
                            >
                                <Text style={styles.variantText}>
                                    {variant}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            )
        case 'question':
            return (
                <View style={styles.horizontalContainer}>
                    <Text style={styles.textQuestion}>
                        {content[0].question}
                    </Text>

                    <Input
                        style={{ height: 200 }}
                        placeholder="Сұрақтың жауабы"
                        onChangeText={ansChanged}
                        value={value}
                    />
                </View>
            )
        default:
            break
    }
}

const createStyles = () => {
    return StyleSheet.create({
        horizontalContainer: {
            paddingHorizontal: 16,
        },

        textQuestion: {
            fontFamily: 'SemiBold',
            fontSize: 22,

            marginTop: 24,
            marginBottom: 16,

            textAlign: 'center',
        },

        variant: {
            borderColor: '#C7C7CC',
            borderWidth: 1,
            borderRadius: 10,

            marginVertical: 5,

            paddingVertical: 10,
        },

        variantSelected: {
            borderColor: '#FF9500',
            backgroundColor: '#FFCC00',
            borderWidth: 1,
            borderRadius: 10,

            marginVertical: 5,

            paddingVertical: 10,
        },

        variantText: {
            fontFamily: 'Regular',
            fontSize: 18,

            textAlign: 'center',
        },
    })
}

export default Quiz
