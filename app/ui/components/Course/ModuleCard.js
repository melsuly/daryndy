import { useContext, useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Octicons } from '@expo/vector-icons'
import LessonsView from './LessonsView'
import LoadingScreen from '@screens/LoadingScreen'
import axios from '../../../axios'
import { AuthContext } from '../../../providers/AuthProvider'

const ModuleCard = (props) => {
    const [isFolded, setIsFolded] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [lessons, setLessons] = useState([])
    const { token } = useContext(AuthContext)

    const module = props.module || {}
    const isLast = props.last ? true : false

    const pressedAction = () => {
        setIsFolded(!isFolded)
    }

    useEffect(() => {
        const fetchLessons = async () => {
            axios
                .get(`/modules/${module._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res) => {
                    setLessons(res.data.lessons)
                    setIsLoading(false)
                })
                .catch((err) => {
                    console.log('Login error: ', err)
                    setIsLoading(false)
                })
        }
        fetchLessons()
    }, [])

    if (isLoading) return <Text>Loading...</Text>

    return (
        <TouchableOpacity onPress={pressedAction}>
            <View style={isLast ? null : styles.viewBorder}>
                <View style={styles.view}>
                    <View style={styles.moduleView}>
                        <Text style={styles.textTitle}>{module.title}</Text>

                        <Octicons
                            style={styles.iconFold}
                            name={isFolded ? 'chevron-right' : 'chevron-down'}
                        />
                    </View>
                    <View style={styles.lessonsView}>
                        {!isFolded && <LessonsView lessons={lessons} />}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 16,
    },

    moduleView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingVertical: 16,
    },

    lessonsView: {},

    viewBorder: {
        borderBottomColor: '#C7C7CC',
        borderBottomWidth: 1,
    },

    textTitle: {
        fontFamily: 'Regular',
        fontSize: 16,
    },

    iconFold: {
        fontSize: 24,
    },
})

export default ModuleCard
