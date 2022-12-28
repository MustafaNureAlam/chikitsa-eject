import React from 'react'
import { 
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image
} from 'react-native';
import { 
    Ionicons,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Octicons,
    Entypo,
    Fontisto,
    MaterialIcons,
    Feather
} from '@expo/vector-icons';

export default function ReportDeliveryScreen({navigation}) {
    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor={'#075141'} />
            <ScrollView>
                <View style={{flex:1}}>
                    <Text>Coming Soon</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
