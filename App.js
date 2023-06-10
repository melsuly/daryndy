import LoadFonts from './app/utils/LoadFonts'
import ElementsTheme from './app/ui/ElementsTheme'
import Navigation from './app/navigation'

const App = () => {
    return (
        <LoadFonts>
            <ElementsTheme>
                <Navigation />
            </ElementsTheme>
        </LoadFonts>
    )
}

export default App
