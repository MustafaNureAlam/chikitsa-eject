import React, { useEffect, useState, useCallback} from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image,
    FlatList
} from 'react-native'
import UserAvatar from '../../../../assets/user_avatar.png';
import { Avatar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import docBg from '../../../../assets/docBg.png';
import { MaterialIcons } from '@expo/vector-icons';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DocPersonalScreen from './doctorProfileTab/docPersonal';
import DocEducationScreen from './doctorProfileTab/docEducation';
import DocCertificateScreen from './doctorProfileTab/docCertificates';
import DocAwardsScreen from './doctorProfileTab/docAwards';
import DocWalletScreen from './doctorProfileTab/wallet';
import MembershipScreen from './doctorProfileTab/membership';
import DocPaymentMethodScreen from './doctorProfileTab/docPaymentMethod';
import DocFeedbackScreen from './doctorProfileTab/docFeedback';

import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../modules/loader';
import * as doctorEnd from '../../../../services/api/doctorEnd';
import config from '../../../../services/config';
import DocConcernsScreen from './doctorProfileTab/docConcerns';
import DocSpecialityScreen from './doctorProfileTab/docSpeciality';

import banner_logo from '../../../../assets/rifillBg.png'
import ProblemScreen from './doctorProfileTab/problem';

const DoctorprofileTab = createMaterialTopTabNavigator();

export default function DoctorProfileScreen({navigation, route}) {

    const [docProfile, setDocProfile] = useState(null);
    const [is_loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {

            setLoading(true);
            getDoctorProfileData();
            setLoading(false);
        }, [navigation, route]),
    );


    async function getDoctorProfileData() {
        let doctor_profile = await doctorEnd.getDoctorProfile();
        setDocProfile(doctor_profile);
        setLoading(false);
        
        // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$getDoctorEndProfile');
        // console.log(doctor_profile);
        // console.log('getDoctorEndProfile$$$$$$$$$$$$$$$$$$$$$$$');
    }

    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'}/>
            {
                is_loading ? (
                    <Loader/>
                ) : (
                    <View style={{
                        flex:1,
                        // marginHorizontal: 15,
                        // marginBottom: 50
                        }}>
                        <View style={{
                            // flex:1,
                            // justifyContent:'center', 
                            // alignItems:'center',
                            // backgroundColor:'#ccc'
                            }}>
                            <View style={{
                            // flex:1,
                            justifyContent:'center', 
                            alignItems:'center',
                            }}>
                                <View style={{
                                    position: 'absolute',
                                    top: 0,
                                }}>
                                    <Image 
                                        source={banner_logo} 
                                        resizeMode="cover" 
                                        resizeMethod='auto'
                                        // style={{
                                        //     height:80,
                                        //     width:180
                                        // }}
                                    />
                                </View>
                                <View style={{
                                    marginTop:40
                                    }}>
                                    <Avatar.Image style={{backgroundColor:'#fff'}} size={50} source={{uri : config.baseUrl + 'uploades/' + docProfile?.data?.user_pic}} />
                                </View>
                                <Text style={{
                                    fontSize:18,
                                    fontWeight:'bold',
                                    color:'#000',
                                    marginVertical:3
                                    }}>
                                    {docProfile?.data?.name}
                                </Text>
                            </View>
                        </View>
    
                        <View style={{flex:1}}>
                            <DoctorprofileTab.Navigator
                                screenOptions={{
                                    tabBarLabelStyle: { fontSize: 12, fontWeight:'bold' },
                                    // tabBarItemStyle: { width: 100 },
                                    tabBarActiveTintColor:'#3AAD94',
                                    tabBarInactiveTintColor:'#ccc',
                                    tabBarScrollEnabled:true,
                                    tabBarIndicatorStyle:{backgroundColor:'#3AAD94'}
                                }}
                            >
                                <DoctorprofileTab.Screen name="DocPersonalTab" component={DocPersonalScreen} options={{ tabBarLabel:'personal'}} />
                                <DoctorprofileTab.Screen name="DocConcernsTab" component={DocConcernsScreen} options={{ tabBarLabel:'concerns'}} />
                                <DoctorprofileTab.Screen name="DocSpecialityTab" component={DocSpecialityScreen} options={{ tabBarLabel:'speciality'}} />
                                <DoctorprofileTab.Screen name="ProblemTab" component={ProblemScreen} options={{ tabBarLabel:'problem'}} />
                                <DoctorprofileTab.Screen name="DocEducationTab" component={DocEducationScreen} options={{ tabBarLabel:'education'}} />
                                <DoctorprofileTab.Screen name="DocCertificateTab" component={DocCertificateScreen} options={{ tabBarLabel:'certificate'}} />
                                <DoctorprofileTab.Screen name="DocAwardsTab" component={DocAwardsScreen} options={{ tabBarLabel:'awards'}} />
                                <DoctorprofileTab.Screen name="MembershipTab" component={MembershipScreen} options={{ tabBarLabel:'memberships'}} />
                                <DoctorprofileTab.Screen name="DocPaymentMethodTab" component={DocPaymentMethodScreen} options={{ tabBarLabel:'accepted payment method'}} />
                                {/* <DoctorprofileTab.Screen name="DocWalletTab" component={DocWalletScreen} options={{ tabBarLabel:'wallet & transactions'}} /> */}
                                <DoctorprofileTab.Screen name="DocFeedbackTab" component={DocFeedbackScreen} options={{ tabBarLabel:'feedback'}} />
                            </DoctorprofileTab.Navigator>
                        </View>
    
                        
                    </View>
                )
            }
                
        </SafeAreaView>
    )
}
