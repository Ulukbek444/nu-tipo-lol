
import axios from "axios";

export const Api = async () => {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon');

    const detailedPocemons = await Promise.all(
        data.results.map(async (pokemon) => {
            const res = await axios.get(pokemon.url);
            return res.data;
        })
    );

    return detailedPocemons;
};