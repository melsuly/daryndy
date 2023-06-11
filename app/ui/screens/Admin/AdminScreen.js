import React, { useContext, useEffect, useState } from 'react'
import { FlatList, View } from 'react-native'
import { Text, Button, Icon, Card, FAB } from '@rneui/themed'
import LoadingScreen from '@screens/LoadingScreen'
import axios from '../../../axios'
import { AuthContext } from '../../../providers/AuthProvider'
import CourseCard from '../../components/Admin/CourseCard'

const AdminScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [courses, setCourses] = useState([])
    const { token } = useContext(AuthContext)

    const loadCourses = () => {
        setIsLoading(true)
        axios
            .get('/courses', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setCourses(res.data)
            })
            .catch((err) => {
                console.warn(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        loadCourses()
    }, [])

    if (isLoading) return <LoadingScreen />

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={courses}
                renderItem={({ item }) => (
                    <CourseCard course={item} navigation={navigation} />
                )}
            />

            <FAB
                onPress={() => {
                    navigation.navigate('CreateCourse', { loadCourses })
                }}
                visible={true}
                placement="right"
                style={{ marginBottom: 24 }}
                icon={{ type: 'octicon', name: 'plus', color: 'white' }}
                color="#008454"
            />
        </View>
    )
}

export default AdminScreen
