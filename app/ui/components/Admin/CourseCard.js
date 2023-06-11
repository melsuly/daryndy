import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Text, Button, Icon, Card, FAB } from '@rneui/themed'

const CourseCard = ({ course, navigation }) => {
    return (
        <Card>
            <Card.Title>{course.title}</Card.Title>
            <Card.Divider />
            {/* <Card.Image
                style={{ padding: 0 }}
                borderRadius={8}
                source={{
                    uri: 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                }}
            /> */}
            <Text style={{ marginBottom: 16 }}>{course.description}</Text>
            <Button
                onPress={() => {
                    navigation.navigate('ManageCourse', { id: course._id })
                }}
                icon={
                    <Icon
                        name="arrow-right"
                        type="octicon"
                        color="#ffffff"
                        iconStyle={{ marginRight: 10 }}
                    />
                }
                buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                }}
                title="ТОЛЫҒЫРАҚ"
            />
        </Card>
    )
}

export default CourseCard
