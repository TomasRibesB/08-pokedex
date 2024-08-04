import 'react-native-gesture-handler';
import { StackNavigator } from './presentation/navigator/StackNavigator';
import { ThemecontextProvider } from './presentation/context/ThemeContext';

export const PokedexApp = () => {
    return (
        <ThemecontextProvider>
                <StackNavigator />
        </ThemecontextProvider>
    )
}
