
import { StyleSheet, View } from "react-native"
import { FAB, Text, useTheme } from "react-native-paper"
import { getPokemons } from "../../../actions/pokemons"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { PokeballBg } from "../../components/ui/PokeballBg"
import { FlatList } from "react-native-gesture-handler"
import { globalTheme } from "../../../config/theme/global-theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { PokemonCard } from "../../components/pokemons/PokemonCard"
import { StackScreenProps } from "@react-navigation/stack"
import { RootStackParam } from "../../navigator/StackNavigator"

interface Props extends StackScreenProps<RootStackParam, 'HomeScreen'> { }

export const HomeScreen = ({ navigation }: Props) => {

    const { top } = useSafeAreaInsets();
    const queryClient = useQueryClient();

    const theme = useTheme();

    // Esta es la forma tradicional de una peticion http
    // const { isLoading, data: pokemons = [] } = useQuery({
    //     queryKey: ['pokemons'],
    //     queryFn: () => getPokemons(0),
    //     staleTime: 1000 * 60 * 60,
    // });

    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pokemons', 'infinite'],
        initialPageParam: 0,
        staleTime: 1000 * 60 * 60,
        queryFn: async (params) => {
            const pokemons = await getPokemons(params.pageParam);
            pokemons.forEach(pokemon => {
                queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
            });

            return pokemons;
        },
        getNextPageParam: (lastPage, pages) => pages.length,
    });



    return (
        <View style={globalTheme.globalMargin}>
            <PokeballBg style={styles.imgPossition} />

            <FlatList
                data={data?.pages.flat() ?? []}
                keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                ListHeaderComponent={() => (
                    <Text variant="displayMedium">Pokédex</Text>
                )}
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}
                onEndReachedThreshold={0.6}
                onEndReached={() => fetchNextPage()}
                showsVerticalScrollIndicator={false}
            />

            <FAB 
            icon="search-outline"
            style={[globalTheme.fab, {backgroundColor: theme.colors.primary}]}
            mode="elevated"
            onPress={() => navigation.navigate('SearchScreen')}
            color={theme.dark? 'black': 'white'}
            />


        </View>
    )
}

const styles = StyleSheet.create({

    imgPossition: {
        position: 'absolute',
        top: -100,
        right: -100,
    }


})