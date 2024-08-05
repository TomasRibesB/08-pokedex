
import { useContext } from "react";
import { Image, ImageStyle, StyleProp } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";

interface Props {
    style?: StyleProp<ImageStyle>;
}

export const PokedexBg = ({ style }: Props) => {

    const { isDark } = useContext(ThemeContext);
    const pokeDexImage = isDark ?
        require('../../../assets/pokedex-light-search.png') :
        require('../../../assets/pokedex-dark-search.png');


    return (
        <Image
            source={pokeDexImage}
            style={[
                {
                    width: 500,
                    height: 500,
                    opacity: 0.3,
                },
                style]}
        />
    )
}