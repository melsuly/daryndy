import { ThemeProvider, createTheme } from '@rneui/themed'

const ElementsTheme = ({ children }) => {
    const theme = createTheme({
        lightColors: {
            primary: '#008454',
            secondary: '#007AFF',
            error: '#FF3B30',
            success: '#008454',
        },

        components: {
            Button: {
                titleStyle: {
                    fontFamily: 'Regular',
                },
            },
            ButtonGroup: {
                textStyle: {
                    fontFamily: 'Regular',
                }
            },
            Text: {
                style: {
                    fontFamily: 'Regular',
                    fontSize: 16,
                },
            },
            Input: {
                style: {
                    fontFamily: 'Regular',
                    color: '#1F1F21',
                },
                containerStyle: {
                    paddingHorizontal: 16,
                },
                labelStyle: {
                    fontFamily: 'Medium',
                },
                leftIconContainerStyle: {
                    marginLeft: 10,
                    marginRight: 10,
                },
            },
        },
    })

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ElementsTheme
