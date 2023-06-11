import React from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Header, Text, Input, Button } from '@rneui/themed'
import Octicons from '@expo/vector-icons/Octicons'

const ChatScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1 }}>
            <Header
                barStyle="light-content"
                centerContainerStyle={{
                    justifyContent: 'center',
                }}
                leftComponent={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Octicons name="chevron-left" size={35} color="white" />
                    </TouchableOpacity>
                }
                rightContainerStyle={{ justifyContent: 'center' }}
                rightComponent={
                    <TouchableOpacity>
                        <Octicons name="info" size={25} color="white" />
                    </TouchableOpacity>
                }
                centerComponent={
                    <Text
                        style={{
                            color: '#fff',
                            fontFamily: 'Medium',
                            fontSize: 18,
                        }}
                    >
                        Нұрасыл Мэлсұлы
                    </Text>
                }
            />

            <FlatList style={{ flex: 1 }} />

            <View style={{ height: 72, backgroundColor: '#C7C7CC' }}>
                <SafeAreaView
                    style={{ flexDirection: 'row' }}
                    edges={['bottom']}
                >
                    <Input
                        autoCapitalize="none"
                        placeholder="Хабарлама мәтіні..."
                        placeholderTextColor="#1F1F21"
                        style={{ color: '#1F1F21' }}
                        containerStyle={{ paddingRight: 50 }}
                    />
                    <Button
                        icon={{
                            name: 'chevron-right',
                            type: 'octicon',
                            size: 15,
                            color: 'white',
                        }}
                        iconContainerStyle={{ marginRight: 10 }}
                        titleStyle={{ fontWeight: '700' }}
                        buttonStyle={{
                            backgroundColor: 'rgba(90, 154, 230, 1)',
                            borderColor: 'transparent',
                            borderWidth: 0,
                            borderRadius: 10,
                        }}
                        containerStyle={{
                            width: 20,
                        }}
                    />
                </SafeAreaView>
            </View>
        </View>
    )
}

export default ChatScreen
