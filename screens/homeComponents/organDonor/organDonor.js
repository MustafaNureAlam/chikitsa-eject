import React, {useState} from 'react'
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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Avatar } from 'react-native-paper';
import UserAvatar from '../../../assets/user_avatar.png';
import { RadioButton } from 'react-native-paper';
import RequestOrgan from './organ-donor-tabs/RequestOrgan';
import InterestedDonor from './organ-donor-tabs/InterestedDonor';

const Tab = createMaterialTopTabNavigator();

export default function OrganDonorScreen({navigation}) {
    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor={'#075141'} />
            <View>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    backgroundColor:'#5ED4BA',
                    borderRadius:100/2,
                    marginVertical:16,
                    marginHorizontal:20
                    }}>
                    <TextInput 
                        
                        placeholder='Search'
                        style={{
                            // borderWidth:1,
                            width:'85%',
                            borderRadius:100/2,
                            paddingHorizontal:10,
                            paddingVertical:3,
                            backgroundColor:'#fff',
                            height:50,
                            fontSize:14,
                            fontWeight:'bold'
                        }}
                    />
                    <TouchableOpacity 
                        style={{
                        
                        }}>
                        <Ionicons style={{
                            marginLeft:5
                        }} name='mic-outline' size={24} color={'#fff'} />
                    </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal:20}}>
                    <Text style={{
                            fontWeight:'400',
                            fontSize:14,
                            color:'#B6B7B7'
                        }}>Delivering to</Text>
                        <Text style={{
                            fontSize:18,
                            fontWeight:'bold',
                            color:'#7C7D7E'
                        }}>Current Location</Text>
                </View>
            </View>
            <View style={{flex:1,marginTop:20}}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 12, fontWeight:'bold' },
                        // tabBarItemStyle: { width: 100 },
                        tabBarActiveTintColor:'#3AAD94',
                        tabBarInactiveTintColor:'#ccc',
                        // tabBarScrollEnabled:true,
                        tabBarIndicatorStyle:{backgroundColor:'#3AAD94'}
                    }}
                >
                    <Tab.Screen 
                        name="RequestOrgan" 
                        component={RequestOrgan}
                        options={{ tabBarLabel: 'Request Organ' }}
                    />
                    <Tab.Screen 
                        name="InterestedDonor" 
                        component={InterestedDonor} 
                        options={{ tabBarLabel: 'Interested to Donate'}}
                    />
                </Tab.Navigator>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    checkItemStyle:{
        padding:5,
        fontWeight:'bold',
        fontSize:14,
    },
    radioTxtStyle:{
        fontSize:12,
        fontWeight:'bold',
        color:'#7E7E7E'
    }
});
