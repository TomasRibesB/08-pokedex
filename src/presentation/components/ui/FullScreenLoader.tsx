
import { View } from "react-native"
import { useTheme } from "react-native-paper"
import LoaderKit from 'react-native-loader-kit'

export const FullScreenLoader = () => {

    const { colors } = useTheme();

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.background
        }}>
            <LoaderKit
                style={{ width: 50, height: 50 }}
                name={'BallZigZag'}
                color={colors.primary}
            />
        </View>
    )
}
