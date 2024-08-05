import { FAB, useTheme } from "react-native-paper"
import { globalTheme } from "../../../config/theme/global-theme"
import { useNavigation } from "@react-navigation/native";


export const FABButtonBack = () => {

    const theme = useTheme();
    const navigation = useNavigation();


    return (
        <FAB icon="arrow-back-outline"
                style={[globalTheme.fabTR, { backgroundColor: theme.colors.primary, zIndex: 999 }]}
                color={theme.dark? 'black': 'white'}
                onPress={() => navigation.goBack()} />
    )
}
