import { StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { Button, Chip, Icon, Dialog, Divider } from '@rneui/themed'
import CodeEditor, {
    CodeEditorSyntaxStyles,
} from '@rivascva/react-native-code-editor'
import { useState } from 'react'
import axios from 'axios'

const Playground = (props) => {
    const content = props.content

    const styles = createStyles()

    const [modalVisible, setModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [code, setCode] = useState(null)
    const [codeResult, setCodeResult] = useState({})

    const toggleModal = () => {
        if (!isLoading) {
            setModalVisible(!modalVisible)
        }
    }

    const runCode = () => {
        const program = {
            script: code,
            language: 'python3',
            versionIndex: '0',
            clientId: '157c9570f5ff554938aa5d4b148ff781',
            clientSecret:
                'f36f6ca8917f75913b106803141cbd604501c4508eb6033307faf8d20dcdbca5',
        }

        setModalVisible(true)

        setIsLoading(true)

        axios
            .post('https://api.jdoodle.com/v1/execute', program, {
                headers: {
                    'Content-Type': 'application/json',
                    Charset: 'UTF-8',
                },
            })
            .then((res) => {
                setCodeResult(res.data)
            })
            .catch((err) => {
                console.log(err)

                if (err.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(err.response.data)
                    console.log(err.response.status)
                    console.log(err.response.headers)
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <>
            <Dialog isVisible={modalVisible} onBackdropPress={toggleModal}>
                <Dialog.Title title="Программа нәтижесі" />
                {isLoading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <>
                        <Text>{codeResult.cpuTime} секунд</Text>
                        <Divider
                            width={5}
                            color="#000"
                            style={{ marginVertical: 16 }}
                        />
                        <Text>{codeResult.output}</Text>
                    </>
                )}
            </Dialog>

            <View style={styles.horizontalContainer}>
                <Chip
                    title="Python"
                    color="secondary"
                    type="outline"
                    containerStyle={{ marginVertical: 15 }}
                />

                <Text style={styles.paragraph}>{content[0].question}</Text>

                <Button onPress={runCode} title="Орындау" />

                <CodeEditor
                    style={{
                        fontSize: 20,
                        inputLineHeight: 26,
                        highlighterLineHeight: 26,
                    }}
                    onChange={setCode}
                    language="python"
                    syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
                    showLineNumbers
                />
            </View>
        </>
    )
}

const createStyles = () => {
    return StyleSheet.create({
        horizontalContainer: {
            paddingHorizontal: 16,
        },

        paragraph: {
            fontFamily: 'Medium',
            fontSize: 18,

            marginBottom: 24,
        },
    })
}

export default Playground
