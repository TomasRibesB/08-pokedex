
import { FlatList, StyleSheet, useWindowDimensions, View } from "react-native"
import { globalTheme } from "../../../config/theme/global-theme"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ActivityIndicator, Text, TextInput, useTheme } from "react-native-paper";
import { Pokemon } from "../../../domain/entities/pokemon";
import { PokemonCard } from "../../components/pokemons/PokemonCard";
import { useQuery } from "@tanstack/react-query";
import { getPokemonNamesWithId, getPokemonsByIds } from "../../../actions/pokemons";
import { useMemo, useState } from "react";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { useDebounceValue } from "../../hooks/useDebounceValue";
import LoaderKit from 'react-native-loader-kit'
import { PokedexBg } from "../../components/ui/PokeDexBg";
import { FABButtonBack } from "../../components/ui/FABButtonBack";

export const SearchScreen = () => {
    const [term, setterm] = useState('')

    const debouncedValue = useDebounceValue(term);

    const { top } = useSafeAreaInsets();
    const { width, height } = useWindowDimensions();

    const theme = useTheme();

    const { isLoading, data: pokemonNameList = [] } = useQuery({
        queryKey: ['pokemon', 'all'],
        queryFn: () => getPokemonNamesWithId()
    });

    // Todo: Aplicar debounce
    const pokemonNameIdList = useMemo(() => {
        if (!isNaN(Number(debouncedValue))) {
            // Buscar por ID
            const pokemon = pokemonNameList.find(pokemon => pokemon.id === Number(debouncedValue));
            return pokemon ? [pokemon] : [] as Pokemon[];
        }
        if (debouncedValue.length === 0) return [] as Pokemon[];
        if (debouncedValue.length < 3) return [] as Pokemon[];
        return pokemonNameList.filter(pokemon => pokemon.name.includes(debouncedValue.toLocaleLowerCase()));

    }, [debouncedValue])

    const { isLoading: isLoadingPokemons, data: pokemons = [] } = useQuery({
        queryKey: ['pokemon', 'by', pokemonNameIdList],
        queryFn: () => getPokemonsByIds(pokemonNameIdList.map(pokemon => pokemon.id)),
        staleTime: 1000 * 60 * 5
    })

    if (isLoading) {
        return (
            <FullScreenLoader />
        )
    }

    return (
        <View style={[globalTheme.globalMargin, { paddingTop: top + 20 }]}>
            <PokedexBg style={{
                position: 'absolute',
                top: height * -0.2,
                right: -width * 0.2,
                width: width * 1.3,
                height: width * 1.3,
                transform: [{ rotate: '180deg' }]
            }} />
            <TextInput
                placeholder="Buscar Pokémon"
                mode="outlined"
                autoFocus
                autoCorrect={false}
                onChangeText={setterm}
                value={term}
                style={{ width: width - width*0.2}}
            />

            {isLoadingPokemons && <LoaderKit
                style={{ width: 50, height: 50, marginTop: 20, alignSelf: 'center' }}
                name={'BallZigZagDeflect'}
                color={theme.colors.primary}
            />}


            <FlatList
                data={pokemons}
                keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
                numColumns={2}
                style={{ paddingTop: top + 20 }}
                renderItem={({ item }) => (
                    <PokemonCard pokemon={item} />
                )}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{ height: 150 }} />}
            />

            <FABButtonBack />


        </View>
    )
}
