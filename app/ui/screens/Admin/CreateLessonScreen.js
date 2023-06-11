import React, { useState, useEffect, useContext } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { Input, Button, Icon, Overlay } from '@rneui/themed'
import axios from '../../../axios'
import { AuthContext } from '../../../providers/AuthProvider'

const CreateLessonScreen = ({ navigation, route }) => {
    const { token } = useContext(AuthContext)

    const [isLoading, setIsLoading] = useState(false)

    const [title, setTitle] = useState('')

    const [isValidated, setIsValidated] = useState(false)

    const { loadModule, moduleID } = route.params

    useEffect(() => {
        if (title.length > 5) {
            return setIsValidated(true)
        }
        setIsValidated(false)
    }, [title])

    const createPressed = () => {
        const data = {
            title,
            contents: [],
        }

        axios
            .post(`/modules/${moduleID}/lessons`, data, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                navigation.goBack()
            })
            .catch((err) => {
                console.warn(err)
            })
            .finally(() => {
                loadModule()
                setIsLoading(false)
            })
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Overlay isVisible={isLoading}>
                <ActivityIndicator size="large" />
                <Text>Өңдеу...</Text>
            </Overlay>
            <Input
                label="Тақырып"
                placeholder="Сабақ тақырыбы"
                autoCapitalize="none"
                onChangeText={setTitle}
                value={title}
                leftIcon={
                    <Icon
                        type="octicon"
                        name="code"
                        size={20}
                        color="#1F1F21"
                    />
                }
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

export default CreateLessonScreen
