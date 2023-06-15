import React, { useState } from 'react'
import { View } from 'react-native'
import { Card, Text, Button, Icon, ListItem } from '@rneui/themed'

const LessonResultScreen = (props) => {
    const params = props.route.params

    const [correctCount, setCorrectCount] = useState(0)

    const emojiSource = require(`@assets/emoji/4.png`)

    return (
        <View>
            <Card>
                <Card.Title>{params.lesson.title}</Card.Title>
                <Card.Divider />
                <Card.Image
                    resizeMode="contain"
                    style={{ padding: 0 }}
                    source={emojiSource}
                />
                <Text style={{ marginVertical: 24 }}>
                    Cіз осы сабақ бойынша керемет нәтиже көрсеттіңіз!
                </Text>

                {params.lesson.contents.map((task, index) => {
                    let isCheck = false

                    if (
                        task.category == 'lecture' ||
                        params.taskStates[index] != undefined
                    ) {
                        isCheck = true
                    }

                    if (task.category == 'quiz') {
                        if (params.taskStates[index] && task.content) {
                            if (
                                params.taskStates[index] ===
                                task.content[0].answer
                            ) {
                                isCheck = true
                            }
                        } else {
                            isCheck = false
                        }
                    }
                    return (
                        <ListItem>
                            <Icon
                                name="label-important-outline"
                                type="material"
                            />
                            <ListItem.Content>
                                <ListItem.Title>
                                    {index + 1}-тапсырма
                                </ListItem.Title>
                            </ListItem.Content>
                            <Icon name={isCheck ? 'check' : 'cancel'} />
                        </ListItem>
                    )
                })}
            </Card>
        </View>
    )
}

export default LessonResultScreen
