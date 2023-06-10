import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

const LoadFonts = ({ children }) => {
    const [fontsLoaded] = useFonts({
        Light: require('@fonts/Rubik/Rubik-Light.ttf'),
        LightItalic: require('@fonts/Rubik/Rubik-LightItalic.ttf'),
        Regular: require('@fonts/Rubik/Rubik-Regular.ttf'),
        RegularItalic: require('@fonts/Rubik/Rubik-Italic.ttf'),
        Medium: require('@fonts/Rubik/Rubik-Medium.ttf'),
        MediumItalic: require('@fonts/Rubik/Rubik-MediumItalic.ttf'),
        SemiBold: require('@fonts/Rubik/Rubik-SemiBold.ttf'),
        SemiBoldItalic: require('@fonts/Rubik/Rubik-SemiBoldItalic.ttf'),
        Bold: require('@fonts/Rubik/Rubik-Bold.ttf'),
        BoldItalic: require('@fonts/Rubik/Rubik-BoldItalic.ttf'),
        Black: require('@fonts/Rubik/Rubik-Black.ttf'),
        BlackItalic: require('@fonts/Rubik/Rubik-BlackItalic.ttf'),
    })

    if (!fontsLoaded) return null

    SplashScreen.hideAsync()

    return children
}

export default LoadFonts
