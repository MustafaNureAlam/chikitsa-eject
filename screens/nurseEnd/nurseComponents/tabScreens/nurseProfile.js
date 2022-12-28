import React, {useCallback,useRef, useState,} from 'react'
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
import NursePersonalScreen from './nurseProfile/nursePersonal';
import NurseEducationScreen from './nurseProfile/nurseEducation';
import NurseCertificateScreen from './nurseProfile/nurseCertificate';
import NurseAwardsScreen from './nurseProfile/nurseAwards';
import NurseFeedbackScreen from './nurseProfile/nurseFeedback';
import NurseWalletScreen from './nurseProfile/nurseWallet';
import NurseMembershipScreen from './nurseProfile/nurseMembership';
import NursePaymentMethodScreen from './nurseProfile/nursePayment';
import config from '../../../../services/config';
import { useFocusEffect } from '@react-navigation/native';
import * as nurseEnd from '../../../../services/api/nurseEnd';
import Loader from '../../../modules/loader';
import NurseConcernsScreen from './nurseProfile/nurseConcern';
import NurseSpecialityScreen from './nurseProfile/nurseSpeciality';

const NurseprofileTab = createMaterialTopTabNavigator();

export default function NurseProfileScreen({navigation, route}) {

    const isMounted = useRef(true);
    const [profile_data, setProfile] = useState(null);
    const [is_loading, setLoading] = useState(null);

    

    async function getNurseProfileData() {
        let nurse_profile = await nurseEnd.getNurseProfile();
        if(isMounted) {
            setLoading(true)
            setProfile(nurse_profile);
            setLoading(false)
            // console.log('nurseEndProfile');
            // console.log(nurse_profile);
            // console.log('nurseEndProfile');
        }
        
    }

    useFocusEffect(
        useCallback(() => {

            if(isMounted){
                setLoading(true);
                getNurseProfileData();
                setLoading(false);
            }
        
            return () => {
                isMounted.current = false;
            };
        }, []),
    );
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
                            justifyContent:'center', 
                            alignItems:'center',
                            }}>
                            <View style={{
                                position: 'absolute',
                                top: 0,
                            }}>
                                
                            </View>
                            <View style={{
                                marginTop:20
                                }}>
                                <View style={{}}>
                                    <Avatar.Image 
                                        style={{
                                            backgroundColor:'#fff',
                                            borderWidth:.5,
                                            borderColor:'#70707B'
                                        }} size={40} source={{uri: config.baseUrl + 'uploades/' + profile_data?.data?.user_pic}} />
                                </View>
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
                                            <Feather name="camera"  size={12} color={'#fff'} transform={`translateY(20)`} />
                                        </TouchableOpacity>
                                </View> */}
                            </View>
                            <Text style={{
                                fontSize:18,
                                fontWeight:'bold',
                                color:'#000',
                                marginVertical:3
                                }}>
                                {profile_data?.data?.name}
                            </Text>
                        </View>

                        <View style={{flex:1}}>
                            <NurseprofileTab.Navigator
                                screenOptions={{
                                    tabBarLabelStyle: { fontSize: 12, fontWeight:'bold' },
                                    // tabBarItemStyle: { width: 100 },
                                    tabBarActiveTintColor:'#3AAD94',
                                    tabBarInactiveTintColor:'#ccc',
                                    tabBarScrollEnabled:true,
                                    tabBarIndicatorStyle:{backgroundColor:'#3AAD94'}
                                }}
                            >
                                <NurseprofileTab.Screen name="NursePersonalTab" component={NursePersonalScreen} options={{ tabBarLabel:'personal'}}  />
                                <NurseprofileTab.Screen name="NurseConcernsTab" component={NurseConcernsScreen} options={{ tabBarLabel:'concern'}}  />
                                <NurseprofileTab.Screen name="NurseSpecialityTab" component={NurseSpecialityScreen} options={{ tabBarLabel:'speciality'}}  />
                                <NurseprofileTab.Screen name="NurseEducationTab" component={NurseEducationScreen} options={{ tabBarLabel:'education'}} />
                                <NurseprofileTab.Screen name="NurseCertificateTab" component={NurseCertificateScreen} options={{ tabBarLabel:'certificate'}} />
                                <NurseprofileTab.Screen name="NurseAwardsTab" component={NurseAwardsScreen} options={{ tabBarLabel:'awards'}} />
                                <NurseprofileTab.Screen name="NurseMembershipTab" component={NurseMembershipScreen} options={{ tabBarLabel:'memberships'}} />
                                <NurseprofileTab.Screen name="NursePaymentMethodTab" component={NursePaymentMethodScreen} options={{ tabBarLabel:'accepted payment method'}} />
                                <NurseprofileTab.Screen name="NurseWalletTab" component={NurseWalletScreen} options={{ tabBarLabel:'wallet & transactions'}} />
                                <NurseprofileTab.Screen name="NurseFeedbackTab" component={NurseFeedbackScreen} options={{ tabBarLabel:'feedback'}} />
                            </NurseprofileTab.Navigator>
                        </View>

                        
                    </View>
                )
            }
                
        </SafeAreaView>
    )
}
