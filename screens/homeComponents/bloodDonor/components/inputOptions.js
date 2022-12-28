import { View } from 'react-native';
import RadioButtonRN from 'radio-buttons-react-native';
import { Ionicons } from "@expo/vector-icons";

function radioBtnView(storeTo){
    return (
        <View>
            <RadioButtonRN
                data={[
                    {
                        label: 'Yes'
                    },
                    {
                        label: 'No'
                    }
                ]}
                // key={count}
                // initial={initVal}
                selectedBtn={(e) => storeTo(e)}
                activeColor="#3AAD94"
                icon={<Ionicons name="checkmark-circle" size={25} color="#3AAD94" />}
            />
        </View>
    )
}

module.exports = {
    radioBtnView: radioBtnView,
};