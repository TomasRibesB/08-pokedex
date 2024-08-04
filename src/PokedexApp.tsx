import 'react-native-gesture-handler';
import { StackNavigator } from './presentation/navigator/StackNavigator';
import { ThemecontextProvider } from './presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

export const PokedexApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemecontextProvider>
                <StackNavigator />
            </ThemecontextProvider>
        </QueryClientProvider>
    )
}
