import { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { ListItem, Avatar } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

const MessangerItem = () => {
    const navigation = useNavigation()
    const styles = createStyles()

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Chat')
            }}
        >
            <ListItem bottomDivider>
                <Avatar
                    rounded
                    title="НҰ"
                    containerStyle={{ backgroundColor: 'grey' }}
                />
                <ListItem.Content>
                    <ListItem.Title>Нұрасыл Мэлсұлы</ListItem.Title>
                    <ListItem.Subtitle>Сәлеметсізбе!</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    )
}

const createStyles = () => {
    return StyleSheet.create({})
}

export default MessangerItem
