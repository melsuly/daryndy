import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Lecture from './Lecture'
import Playground from './Playground'
import Quiz from './Quiz'

const RenderLesson = (props) => {
    const lesson = props.lesson

    const task = lesson.contents[props.currentTask]

    const taskState = props.getTaskState()

    switch (task.category) {
        case 'lecture':
            return (
                <Lecture
                    key={JSON.stringify(task) + props.currentTask}
                    taskNumber={props.currentTask}
                    taskState={taskState}
                    saveTaskState={props.saveTaskState}
                    content={task.content}
                />
            )
            break
        case 'playground':
            return (
                <Playground
                    key={JSON.stringify(task) + props.currentTask}
                    taskNumber={props.currentTask}
                    taskState={taskState}
                    saveTaskState={props.saveTaskState}
                    content={task.content}
                />
            )
            break
        case 'quiz':
            return (
                <Quiz
                    key={JSON.stringify(task) + props.currentTask}
                    taskNumber={props.currentTask}
                    taskState={taskState}
                    saveTaskState={props.saveTaskState}
                    content={task.content}
                />
            )
            break
    }
}

export default RenderLesson

const styles = StyleSheet.create({})
