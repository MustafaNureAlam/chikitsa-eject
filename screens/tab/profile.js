import React, {useEffect, useState, useCallback} from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView
} from 'react-native'
import { Avatar } from 'react-native-paper';
import UserProfileImg from '../../assets/user_avatar.png'; 
import { Feather } from '@expo/vector-icons';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PersonalTab from './profileTabs/personalTab';
import medicalTab from './profileTabs/medicalTab';
import LifestyleTab from './profileTabs/lifestyleTab';
import passwordTab from './profileTabs/passwordTab';
import Loader from '../modules/loader';
import * as patientEnd from '../../services/api/patientEnd';
import {useFocusEffect} from '@react-navigation/native';
import app_config from '../../services/config';

const profileTab = createMaterialTopTabNavigator();

export default function ProfileScreen({navigation}) {

    const [profile, setProfile] = useState(null);
    const [is_loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {

            setLoading(true);
            getPatientProfileData();
            setLoading(false);
        }, []),
    );

    // useEffect(() => {
    //     getPatientProfileData();
    //     setLoading(false);
    //     // return () => {
    //     //     cleanup
    //     // }
    // }, [])



    async function getPatientProfileData() {
        let patient_profile_data = await patientEnd.getPatientProfile()
        setProfile(patient_profile_data)
        setLoading(false);

        // console.log('================================',patient_profile_data);
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>

            {
                is_loading ? (
                    <Loader/>
                ) : (
                    <View style={{flex:1}}>
                        <View style={{
                            justifyContent:'center', 
                            alignItems:'center',
                            marginVertical:10
                            }}>
                            <View style={{
                                marginVertical:7
                                }}>
                                <Avatar.Image style={{backgroundColor:'#fff',borderWidth:.3}} size={45} source={{uri: app_config.baseUrl + 'uploades/' + profile?.user?.user_pic }} />
                                {/* <View style={{
                                    position:'absolute',
                                    top:'50%',
                                    right: -14,
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    transform: [{translateY: -14}],
                                    }}>
                                        <TouchableOpacity style={{
                                            backgroundColor: '#3AAD94', 
                                            borderRadius: 50, 
                                            padding: 8 
                                            }}>
                                            <Feather name="camera"  size={10} color={'#fff'} transform={`translateY(20)`} />
                                        </TouchableOpacity>
                                </View> */}
                            </View>
                            <Text style={{
                                fontSize:18,
                                fontWeight:'bold',
                                color:'#000',
                                marginVertical:3
                                }}>
                                {profile?.user?.name}
                            </Text>
                        </View>

                        <View style={{flex:1}}>
                            <profileTab.Navigator
                                screenOptions={{
                                    tabBarLabelStyle: { fontSize: 12, fontWeight:'bold' },
                                    // tabBarItemStyle: { width: 100 },
                                    tabBarActiveTintColor:'#3AAD94',
                                    tabBarInactiveTintColor:'#ccc',
                                    // tabBarScrollEnabled:true,
                                    tabBarIndicatorStyle:{backgroundColor:'#3AAD94'}
                                }}
                            >
                                <profileTab.Screen name="PersonalTab" component={PersonalTab} options={{ tabBarLabel:'personal'}} />
                                {/* <profileTab.Screen name="medicalTab" component={medicalTab} options={{ tabBarLabel:'medical'}} /> */}
                                <profileTab.Screen name="LifestyleTab" component={LifestyleTab} options={{ tabBarLabel:'lifestyle'}} />
                                {/* <profileTab.Screen name="passwordTab" component={passwordTab} options={{ tabBarLabel:'password'}} /> */}
                            </profileTab.Navigator>
                        </View>


                    </View>
                )
            } 
        </SafeAreaView>
    )
}
