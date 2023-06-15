import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import LoadingScreen from '@screens/LoadingScreen'
import CourseCard from '@components/Course/CourseCard'
import { AuthContext } from '../../../providers/AuthProvider'
import axios from '../../../axios'

const HomeScreen = (props) => {
    const navigation = props.navigation || null
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
        <View style={{ paddingHorizontal: 16, paddingTop: 24 }}>
            <FlatList
                data={courses}
                renderItem={({ item }) => (
                    <CourseCard course={item} navigation={navigation} />
                )}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
