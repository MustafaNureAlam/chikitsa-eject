import React, { useState } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    StatusBar
} from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DocSettingsScreen({navigation}) {
    return (
        <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
            <StatusBar backgroundColor={'#075141'} />
            <View style={{
                flex: 1,
                marginHorizontal: 24,
                justifyContent:'center'
                // marginTop: '25%'
            }}>
                <TouchableOpacity 
                    style={{
                        backgroundColor:'#3AAD94',
                        paddingVertical:15,
                        paddingHorizontal:20,
                        borderRadius: 50,
                        marginVertical: 10,
                        flexDirection:'row',
                        justifyContent:"space-between",
                        alignItems:'center'
                    }}

                    onPress={() => navigation.navigate('ManageServiceScreen')}
                >
                    <Text style={{
                        fontSize:16,
                        fontWeight:'bold',
                        padding:3,
                        textAlign:'center',
                        color:'#fff'
                    }}>
                        Manage Service
                    </Text>

                    <Text>
                        <MaterialCommunityIcons name='arrow-right' color={'#fff'} size={24} />
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={{
                        // backgroundColor:'#3AAD94',
                        backgroundColor:'#ccc',
                        paddingVertical:15,
                        paddingHorizontal:20,
                        borderRadius: 50,
                        marginVertical: 10,
                        flexDirection:'row',
                        justifyContent:"space-between",
                        alignItems:'center'
                    }}
                    disabled={true}
                >
                    <Text style={{
                        fontSize:16,
                        fontWeight:'bold',
                        padding:3,
                        textAlign:'center',
                        color:'#fff'
                    }}>
                        User Settings
                    </Text>

                    <Text>
                        <MaterialCommunityIcons name='arrow-right' color={'#fff'} size={24} />
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
