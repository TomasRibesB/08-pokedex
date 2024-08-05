import { Text } from "react-native";
import { Chip } from "react-native-paper"


interface Props {
    selectedColor: string;
    margin?: boolean;
    label: string;
    value: string;
}


export const ValueChip = ({ selectedColor, margin = false, label, value }: Props) => {
    return (
        <Chip
            key={label}
            mode="outlined"
            selectedColor={selectedColor}
            style={margin && { marginLeft: 10 }}>
            <Text
            style={{fontWeight: 'bold', fontSize: 15}}
            >{label} </Text> | <Text> {value} </Text>

        </Chip>
    )

}
