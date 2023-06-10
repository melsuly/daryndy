import { useState, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
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

const RegisterScreen = () => {
    const [isLoading, setIsLoading] = useState(false)

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('male')

    const [isValidated, setIsValidated] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setError(null)

        if (name.length >= 2) {
            if (surname.length >= 2) {
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
            }
        }
        setIsValidated(false)
    }, [name, surname, email, password])

    const styles = createStyles()

    const logo = require('@assets/icon.png')

    const registerPressed = () => {
        const data = {
            name,
            surname,
            gender,
            email,
            password,
        }

        console.log(data)

        setIsLoading(true)

        axios
            .post('/auth/register', data)
            .then((res) => {
                // ToDo: Authorize user
            })
            .catch((err) => {
                setError('Бұл Email базада тіркелген!')
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
                        label="Есім"
                        placeholder="Сіздің есіміңіз"
                        autoCapitalize="none"
                        onChangeText={setName}
                        value={name}
                        leftIcon={
                            <Icon
                                type="octicon"
                                name="person"
                                size={20}
                                color="#1F1F21"
                            />
                        }
                    />

                    <Input
                        label="Тегі"
                        placeholder="Сіздің тегіңіз"
                        autoCapitalize="none"
                        onChangeText={setSurname}
                        value={surname}
                        leftIcon={
                            <Icon
                                type="octicon"
                                name="person"
                                size={20}
                                color="#1F1F21"
                            />
                        }
                    />

                    <ButtonGroup
                        buttons={['Ер', 'Әйел']}
                        selectedIndex={gender == 'male' ? 0 : 1}
                        onPress={(value) => {
                            setGender(value == 0 ? 'male' : 'female')
                        }}
                        containerStyle={{ marginBottom: 20 }}
                    />

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
                        <View style={{ paddingHorizontal: 16 }}>
                            <Text style={{ color: '#FF3B30' }}>{error}</Text>
                        </View>
                    )}
                </View>

                <View style={{ paddingHorizontal: 16 }}>
                    <Button
                        disabled={!isValidated}
                        onPress={registerPressed}
                        radius={10}
                        size="lg"
                        title="Тіркелу"
                    />
                </View>
            </View>
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

export default RegisterScreen
