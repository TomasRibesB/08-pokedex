
import { StackScreenProps } from "@react-navigation/stack"
import { FlatList, Image, ScrollView, StyleSheet, View } from "react-native"
import { RootStackParam } from "../../navigator/StackNavigator"
import { getPokemonById } from "../../../actions/pokemons";
import { useQuery } from "@tanstack/react-query";
import { Button, Chip, FAB, Text } from "react-native-paper";
import { FullScreenLoader } from "../../components/ui/FullScreenLoader";
import { Formatter } from "../../../config/helpers/formatters";
import { FadeInImage } from "../../components/ui/FadeInImage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Icon from 'react-native-vector-icons/Ionicons';
import { globalTheme } from "../../../config/theme/global-theme";
import { FABButtonBack } from "../../components/ui/FABButtonBack";
import { ValueChip } from "../../components/ui/ValueChip";

interface Props extends StackScreenProps<RootStackParam, 'PokemonScreen'> { }

export const PokemonScreen = ({ navigation, route }: Props) => {

    const { pokemonId } = route.params;

    const { isDark } = useContext(ThemeContext);

    const pokeballImg = isDark
        ? require('../../../assets/pokeball-light.png')
        : require('../../../assets/pokeball-dark.png');

    const { top } = useSafeAreaInsets();

    const { isLoading, data: pokemon } = useQuery({
        queryKey: ['pokemon', pokemonId],
        queryFn: () => getPokemonById(pokemonId),
        staleTime: 1000 * 60 * 60,
    })

    if (!pokemon) {
        return (
            <FullScreenLoader />
        )
    }

    return (
        <ScrollView
            style={{ flex: 1, backgroundColor: pokemon.color }}
            bounces={false}
            showsVerticalScrollIndicator={false}>
            {/* Header Container */}
            <View style={styles.headerContainer}>
                {/* Nombre del Pokemon */}
                <Text
                    style={{
                        ...styles.pokemonName,
                        top: top + 5,
                    }}>
                    {Formatter.capitalize(pokemon.name) + '\n'}#{pokemon.id}
                </Text>

                {/* Pokeball */}
                <Image source={pokeballImg} style={styles.pokeball} />

                <FadeInImage uri={pokemon.avatar} style={styles.pokemonImage} />
            </View>

            {/* Types */}
            <View
                style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, justifyContent: 'center' }}>
                {pokemon.types.map(type => (
                    <Chip
                        key={type}
                        mode="flat"
                        selectedColor={pokemon.color}
                        style={{ marginLeft: 10, backgroundColor: pokemon.textColor }}>
                        {type}
                    </Chip>
                ))}
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>

                <FAB icon="chevron-forward"
                    style={[globalTheme.fab, { backgroundColor: pokemon.textColor, flexDirection: 'row-reverse' }]}
                    color={pokemon.color}
                    onPress={() => navigation.navigate('PokemonScreen', { pokemonId: pokemon.id + 1 })} />

                <FAB icon="chevron-back"
                    style={[globalTheme.fabL, { backgroundColor: pokemon.textColor }]}
                    color={pokemon.color}
                    onPress={() => navigation.navigate('PokemonScreen', { pokemonId: pokemon.id - 1 })} />

            </View>

            {/* Sprites */}
            <FlatList
                data={pokemon.sprites}
                horizontal
                keyExtractor={item => item}
                showsHorizontalScrollIndicator={false}
                centerContent
                style={{
                    marginTop: 20,
                    height: 100,
                }}
                renderItem={({ item }) => (
                    <FadeInImage
                        uri={item}
                        style={{ width: 100, height: 100, marginHorizontal: 5 }}
                    />
                )}
            />

            {/* abilities */}
            <Text style={[styles.subTitle, { color: pokemon.textColor }]}>Abilities</Text>
            <FlatList
                data={pokemon.abilities}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Chip
                        key={item}
                        mode="outlined"
                        selectedColor={pokemon.textColor}
                        style={{ marginLeft: 10 }}>
                        {Formatter.capitalize(item)}
                    </Chip>
                )}
            />

            {/* Stats */}
            <Text style={[styles.subTitle, { color: pokemon.textColor }]}>Stats</Text>
            <FlatList
                data={pokemon.stats}
                keyExtractor={item => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (

                    <ValueChip
                        selectedColor={pokemon.textColor}
                        margin={true}
                        label={Formatter.capitalize(item.name)}
                        value={item.value.toString()}
                    />
                )}
            />

            {/* Moves */}
            <Text style={[styles.subTitle, { color: pokemon.textColor }]}>Moves</Text>
            <FlatList
                horizontal
                data={pokemon.moves}
                keyExtractor={item => item.name}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ValueChip
                        selectedColor={pokemon.textColor}
                        margin={true}
                        label={Formatter.capitalize(item.name)}
                        value={'lv' + item.level.toString()}
                    />
                )}
            />

            {/* Games */}
            <Text style={[styles.subTitle, { color: pokemon.textColor }]}>Games</Text>
            <FlatList
                data={pokemon.games}
                keyExtractor={item => item}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Chip
                        key={item}
                        mode="outlined"
                        selectedColor={pokemon.textColor}
                        style={{ marginLeft: 10 }}>
                        {Formatter.capitalize(item)}
                    </Chip>
                )}
            />

            <FABButtonBack />

            {/* <Button onPress={() => navigation.navigate('HomeScreen')} mode="contained-tonal"
            style={styles.buttonHome} buttonColor={pokemon.textColor}>
                Home
            </Button> */}


            <View style={{ height: 100 }} />
        </ScrollView>

    )

}

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        alignItems: 'center',
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    pokemonName: {
        color: 'white',
        fontSize: 40,
        alignSelf: 'flex-start',
        left: 20,
    },
    pokeball: {
        width: 250,
        height: 250,
        bottom: -20,
        opacity: 0.7,
    },
    pokemonImage: {
        width: 240,
        height: 240,
        position: 'absolute',
        bottom: -40,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginTop: 20,
    },
    statsContainer: {
        flexDirection: 'column',
        marginHorizontal: 20,
        alignItems: 'center',
    },
});