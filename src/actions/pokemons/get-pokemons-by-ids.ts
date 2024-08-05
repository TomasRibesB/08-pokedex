import { Pokemon } from "../../domain/entities/pokemon";
import { getPokemonById } from "./get-pokemon-by-id";



export const getPokemonsByIds = async (ids: number[]): Promise<Pokemon[]> => {
    try {

        const promises: Promise<Pokemon>[] = ids.map(id => {
            return getPokemonById(id);
        });

        return await Promise.all(promises);

    } catch (error) {
        throw new Error('Error getting pokemons by ids:' + ids)
    }
}