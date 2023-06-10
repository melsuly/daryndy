import React from 'react'
import { View } from 'react-native'
import { Text, LinearProgress } from '@rneui/themed'

const LoadingScreen = () => {
    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <LinearProgress color="#008454" />
            <Text style={{ marginTop: 10 }}>Жүктеу...</Text>
        </View>
    )
}

export default LoadingScreen
