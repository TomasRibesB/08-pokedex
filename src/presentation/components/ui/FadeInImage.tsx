import { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Animated,
    ImageStyle,
    StyleProp,
    Text,
    View,
} from 'react-native';
import { useAnimation } from '../../hooks/useAnimation';
import LoaderKit from 'react-native-loader-kit'
import { useTheme } from 'react-native-paper';
interface Props {
    uri: string;
    style?: StyleProp<ImageStyle>;
}

export const FadeInImage = ({ uri, style }: Props) => {
    const { animatedOpacity, fadeIn } = useAnimation();
    const [isLoading, setIsLoading] = useState(true);

    const isDisposed = useRef(false);

    const theme = useTheme();

    useEffect(() => {
        return () => {
            isDisposed.current = true;
        }
    }, [])

    const onLoadEnd = () => {
        if (isDisposed.current) return;
        fadeIn({});
        setIsLoading(false);
    };


    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {isLoading && (
                <LoaderKit
                    style={{ width: 50, height: 50, position: 'absolute' }}
                    name={'BallZigZagDeflect'}
                    color={theme.colors.primary}
                />
            )}

            <Animated.Image
                source={{ uri }}
                onLoadEnd={onLoadEnd}
                style={[style, { opacity: animatedOpacity, resizeMode: 'contain' }]}
            />
        </View>
    );
};