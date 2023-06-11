import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../providers/AuthProvider'
import { TouchableOpacity, View } from 'react-native'
import { Avatar, Text, ListItem, Icon, Dialog } from '@rneui/themed'

const ProfileScreen = () => {
    const [signoutModalVisible, setSignoutModalVisible] = useState(false)

    const { user, logout } = useContext(AuthContext)
    const roles = {
        student: 'Оқушы',
        teacher: 'Мұғалім',
        admin: 'Админ',
    }

    const signoutModalToggle = () => {
        setSignoutModalVisible(!signoutModalVisible)
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingVertical: 24,
            }}
        >
            <View style={{ alignItems: 'center' }}>
                <Avatar
                    size={72}
                    rounded
                    title={`${user.name[0]}${user.surname[0]}`}
                    containerStyle={{ backgroundColor: 'grey' }}
                >
                    <Avatar.Accessory size={25} />
                </Avatar>
                <Text style={{ fontFamily: 'Medium', marginTop: 16 }}>
                    {user.name} {user.surname}
                </Text>
                <Text
                    style={{ fontFamily: 'Light', fontSize: 14, marginTop: 8 }}
                >
                    {roles[user.role]}
                </Text>
            </View>

            <View>
                {user.role == 'admin' && (
                    <TouchableOpacity>
                        <ListItem>
                            <Icon name="cpu" type="octicon" color="black" />
                            <ListItem.Content>
                                <ListItem.Title>Курстар</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron />
                        </ListItem>
                    </TouchableOpacity>
                )}
                <TouchableOpacity>
                    <ListItem>
                        <Icon name="gear" type="octicon" color="black" />
                        <ListItem.Content>
                            <ListItem.Title>Бұғаттаулар</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>
                <TouchableOpacity onPress={signoutModalToggle}>
                    <ListItem>
                        <Icon name="sign-out" type="octicon" color="red" />
                        <ListItem.Content>
                            <ListItem.Title>Шығу</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                </TouchableOpacity>
            </View>

            <Dialog
                isVisible={signoutModalVisible}
                onBackdropPress={signoutModalToggle}
            >
                <Dialog.Title title="Растау" />
                <Text>Аккаунтан шығуды қалайсызба?</Text>
                <Dialog.Actions>
                    <Dialog.Button title="ШЫҒУ" onPress={logout} />
                    <Dialog.Button title="ЖАБУ" onPress={signoutModalToggle} />
                </Dialog.Actions>
            </Dialog>
        </View>
    )
}

export default ProfileScreen
