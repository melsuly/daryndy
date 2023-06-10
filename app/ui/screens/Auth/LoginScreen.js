import { useState, useEffect, useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, StyleSheet, ActivityIndicator, Pressable } from 'react-native'
import {
    Text,
    Button,
    Icon,
    Input,
    Image,
    ButtonGroup,
    Overlay,
} from '@rneui/themed'
import axios from '../../../axios'
import { AuthContext } from '../../../providers/AuthProvider'

const LoginScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { authorize } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isValidated, setIsValidated] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setError(null)
        if (
            email
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        ) {
            if (password.length >= 8) {
                return setIsValidated(true)
            }
        }
        setIsValidated(false)
    }, [email, password])

    const styles = createStyles()

    const logo = require('@assets/icon.png')

    const loginPressed = () => {
        const data = {
            email,
            password,
        }

        setIsLoading(true)

        axios
            .post('/auth/login', data)
            .then((res) => {
                authorize(res.data)
            })
            .catch((err) => {
                setError('Email немесе құпиясөз қате!')
                setIsValidated(false)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return (
        <>
            <Overlay isVisible={isLoading}>
                <ActivityIndicator size="large" />
                <Text>Өңдеу...</Text>
            </Overlay>
            <SafeAreaView style={{ flex: 1 }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'space-between',
                        marginTop: 16,
                        marginBottom: 32,
                    }}
                >
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            resizeMode="contain"
                            style={styles.logoImage}
                            source={logo}
                            borderRadius={8}
                        />
                    </View>

                    <View>
                        <Input
                            label="Email"
                            placeholder="Сіздің email"
                            autoCapitalize="none"
                            onChangeText={setEmail}
                            value={email}
                            leftIcon={
                                <Icon
                                    type="octicon"
                                    name="mail"
                                    size={20}
                                    color="#1F1F21"
                                />
                            }
                        />

                        <Input
                            label="Құпиясөз"
                            placeholder="Сіздің құпиясөз"
                            autoCapitalize="none"
                            onChangeText={setPassword}
                            leftIcon={
                                <Icon
                                    type="octicon"
                                    name="key"
                                    size={20}
                                    color="#1F1F21"
                                />
                            }
                        />

                        {error != null && (
                            <View
                                style={{
                                    paddingHorizontal: 16,
                                    marginTop: 24,
                                }}
                            >
                                <Text style={{ color: '#FF3B30' }}>
                                    {error}
                                </Text>
                            </View>
                        )}
                    </View>

                    <View style={{ paddingHorizontal: 16 }}>
                        <Button
                            disabled={!isValidated}
                            onPress={loginPressed}
                            radius={10}
                            size="lg"
                            title="Кіру"
                        />
                    </View>

                    <View
                        style={{
                            alignItems: 'center',
                            paddingHorizontal: 16,
                        }}
                    >
                        <Pressable
                            onPress={() => {
                                navigation.navigate('Register')
                            }}
                        >
                            <Text>
                                Аккаунтыңыз жоқпа?{' '}
                                <Text style={{ color: '#008454' }}>
                                    Тіркелу
                                </Text>
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

const createStyles = () => {
    return StyleSheet.create({
        logoImage: {
            height: 100,
            width: 100,
        },
    })
}

export default LoginScreen
