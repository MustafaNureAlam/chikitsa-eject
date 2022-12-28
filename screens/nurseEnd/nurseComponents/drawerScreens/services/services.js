import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StatusBar } from 'react-native'
import { 
    Ionicons,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Octicons,
    Entypo,
    Fontisto 
} from '@expo/vector-icons';

export default function ServicesScreen({navigation}) {
    return (
        <SafeAreaView style={{flex:1, backgroundColor:"#fff",justifyContent:'center'}}>
            <StatusBar backgroundColor={'#075141'} />
            

            <View style={{
                marginHorizontal:20,
                marginVertical:20
            }}>

                <TouchableOpacity 
                    style={{
                        paddingVertical:15,
                        paddingHorizontal:25,
                        backgroundColor:'#3AAD94',
                        borderRadius:100/2,
                        marginVertical:7,
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}

                    onPress={() => navigation.navigate('NurseVoiceCallServiceScreen')}
                >
                    <Text style={{
                        fontSize:16,
                        fontWeight:'bold',
                        textAlign:'center',
                        color:'#fff'
                    }}>Voice Call Service</Text>

                    <Text>
                        <MaterialCommunityIcons name='arrow-right' color={'#fff'} size={24} />
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{
                        paddingVertical:15,
                        paddingHorizontal:25,
                        backgroundColor:'#3AAD94',
                        // backgroundColor:'#ccc',
                        borderRadius:100/2,
                        marginVertical:7,
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}
                    // disabled={true}
                    onPress={() => navigation.navigate('NurseVideoCallServiceScreen')}
                >
                    <Text style={{
                        fontSize:16,
                        fontWeight:'bold',
                        textAlign:'center',
                        color:'#fff'
                    }}>Video Call Service</Text>

                    <Text>
                        <MaterialCommunityIcons name='arrow-right' color={'#fff'} size={24} />
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{
                        paddingVertical:15,
                        paddingHorizontal:25,
                        backgroundColor:'#3AAD94',
                        // backgroundColor:'#ccc',
                        borderRadius:100/2,
                        marginVertical:7,
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}
                    // disabled={true}
                    onPress={() => navigation.navigate('NurseChatServiceScreen')}
                >
                    <Text style={{
                        fontSize:16,
                        fontWeight:'bold',
                        textAlign:'center',
                        color:'#fff'
                    }}>Chat Service</Text>

                    <Text>
                        <MaterialCommunityIcons name='arrow-right' color={'#fff'} size={24} />
                    </Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}
