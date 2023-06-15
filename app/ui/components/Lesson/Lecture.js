import React, { useState, useCallback, useRef } from 'react'
import { StyleSheet, View, Text, Image, Button } from 'react-native'
import CodeEditor, {
    CodeEditorSyntaxStyles,
} from '@rivascva/react-native-code-editor'
import YoutubePlayer from 'react-native-youtube-iframe'

const Lecture = (props) => {
    const content = props.content

    const styles = createStyles()

    const [playing, setPlaying] = useState(false)

    const onStateChange = useCallback((state) => {
        if (state === 'ended') {
            setPlaying(false)
            Alert.alert('video has finished playing!')
        }
    }, [])

    const togglePlaying = useCallback(() => {
        setPlaying((prev) => !prev)
    }, [])

    return (
        <View style={styles.horizontalContainer}>
            {content.map((item, index) => {
                switch (item.element) {
                    case 'paragraph':
                        return (
                            <Text
                                key={item.value + index}
                                style={styles.paragraph}
                            >
                                &emsp;
                                {item.value}
                            </Text>
                        )
                    case 'image':
                        return (
                            <Image
                                key={item.value + index}
                                source={{ uri: item.value }}
                                resizeMode="contain"
                                style={styles.image}
                            />
                        )
                    case 'code':
                        return (
                            <CodeEditor
                                style={{
                                    fontSize: 20,
                                    inputLineHeight: 26,
                                    highlighterLineHeight: 26,
                                    fontFamily: 'Mono',
                                    height: 200,
                                }}
                                key={item.value}
                                initialValue={item.value}
                                language="python"
                                readOnly
                                syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
                                showLineNumbers
                            />
                        )
                    case 'video':
                        return (
                            <View style={{ marginVertical: 16 }}>
                                <YoutubePlayer
                                    height={350}
                                    play={playing}
                                    videoId={item.value}
                                    onChangeState={onStateChange}
                                />
                            </View>
                        )
                    default:
                        return (
                            <Text
                                key={item.value + index}
                                style={styles.paragraph}
                            >
                                {item.value}
                            </Text>
                        )
                }
            })}
        </View>
    )
}

const createStyles = () => {
    return StyleSheet.create({
        horizontalContainer: {
            paddingHorizontal: 16,
        },

        paragraph: {
            fontFamily: 'Regular',
            fontSize: 18,

            marginBottom: 5,
        },

        image: {
            marginVertical: 10,
            width: '100%',
            height: 300,
        },
    })
}

export default Lecture
