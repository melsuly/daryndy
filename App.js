import LoadFonts from './app/utils/LoadFonts'
import ElementsTheme from './app/ui/ElementsTheme'
import AuthProvider from './app/providers/AuthProvider'
import Navigation from './app/navigation'

const App = () => {
    return (
        <LoadFonts>
            <ElementsTheme>
                <AuthProvider>
                    <Navigation />
                </AuthProvider>
            </ElementsTheme>
        </LoadFonts>
    )
}

export default App
