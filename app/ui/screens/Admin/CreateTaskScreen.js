import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Input, Button, ButtonGroup, Icon, Overlay } from '@rneui/themed'
import axios from '../../../axios'
import { AuthContext } from '../../../providers/AuthProvider'
import CodeEditor, {
    CodeEditorSyntaxStyles,
} from '@rivascva/react-native-code-editor'

const CreateTaskScreen = ({ navigation, route }) => {
    const { token } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false)

    const types = ['lecture', 'playground', 'quiz']
    const [selectedType, setSelectedType] = useState(0)
    const [content, setContent] = useState('')

    const [isValidated, setIsValidated] = useState(false)

    const { loadLesson, lessonID } = route.params

    useEffect(() => {
        setIsValidated(true)
    }, [])

    const createPressed = () => {
        const data = {
            category: types[selectedType],
            content,
        }

        axios
            .post(`/lessons/${lessonID}/tasks`, data, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                navigation.goBack()
            })
            .catch((err) => {
                console.warn(err)
            })
            .finally(() => {
                loadLesson()
                setIsLoading(false)
            })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Overlay isVisible={isLoading}>
                <ActivityIndicator size="large" />
                <Text>Өңдеу...</Text>
            </Overlay>
            <ButtonGroup
                buttons={['ЛЕКЦИЯ', 'ПРАКТИКА', 'КВИЗ']}
                selectedIndex={selectedType}
                onPress={(value) => {
                    setSelectedType(value)
                }}
                containerStyle={{ marginBottom: 24 }}
            />

            <CodeEditor
                onChange={setContent}
                style={{
                    fontSize: 20,
                    inputLineHeight: 26,
                    highlighterLineHeight: 26,
                    height: '70%',
                    marginBottom: 24,
                }}
                initialValue="[]"
                language="json"
                syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
                showLineNumbers
            />

            <View style={{ paddingHorizontal: 16 }}>
                <Button
                    disabled={!isValidated}
                    onPress={createPressed}
                    radius={10}
                    size="lg"
                    title="Қосу"
                />
            </View>
        </View>
    )
}

export default CreateTaskScreen
