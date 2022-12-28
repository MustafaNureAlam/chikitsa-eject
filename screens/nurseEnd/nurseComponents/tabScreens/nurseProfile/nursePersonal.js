import React, {useEffect, useState, useRef, useCallback} from 'react'
import { 
    View, 
    Text, 
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    ScrollView

} from 'react-native';

import {MaterialIcons} from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

import { 
    Avatar,
    Modal, 
    Portal, 
    Provider,
    RadioButton,
    Switch,
    Dialog  
} from 'react-native-paper';
import Loader from '../../../../modules/loader';
import * as nurseEnd from '../../../../../services/api/nurseEnd';

export default function NursePersonalScreen({navigation, route}) {

    
    const isMounted = useRef(true);

    const [is_loading, setLoading] = useState(false);
    const [nurse_profile, setProfile] = useState(null);

    useFocusEffect(
        useCallback(() => {

            if(isMounted){
                setLoading(true);
                getNurseProfileData();
                setLoading(false);
            }

            return() => {
                isMounted.current = false;
            }
        }, [navigation, route]),
    );

    function updatePersonalDetails() {
        navigation.navigate('UpdateNursePersonalScreen', nurse_profile);
    }

    async function getNurseProfileData() {
        setLoading(true);
        let nurse_profile = await nurseEnd.getNurseProfile();
        if(isMounted) {
            setProfile(nurse_profile);
            // console.log('========nurseEndProfile========');
            // console.log(nurse_profile);
            // console.log('========nurseEndProfile======');
        }
        setLoading(false);
        
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            {
                is_loading ? (
                    <View style={{flex:1}}>
                        <Loader/>
                    </View>
                ) : (
                    <View style={{flex:1}}>
                        <ScrollView showsVerticalScrollIndicator={false} >
                            <View style={{flex:1}}>
                                <View style={{
                                    // flex: 1,
                                    marginVertical:10,
                                    // marginHorizontal:10
                                }}>

                                    <View style={{
                                        justifyContent:'center',
                                        alignItems:'flex-end'
                                    }}>
                                        <TouchableOpacity 
                                            style={{
                                                flexDirection: 'row',
                                                backgroundColor: '#3AAD94',
                                                paddingHorizontal:10,
                                                paddingVertical: 5,
                                                borderTopLeftRadius:100/2,
                                                borderBottomLeftRadius:100/2
                                            }}
                                            onPress={() => updatePersonalDetails() }
                                        >

                                            <MaterialIcons name="edit" size={16} color="#FFF" />
                                            <Text style={{
                                                color: '#FFF',
                                                marginLeft: 5
                                            }} >Edit</Text>

                                        </TouchableOpacity>
                                    </View>

                                    <View style={{marginHorizontal:20}}>
                                        {/* <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            marginTop: 40,
                                        }}>
                                            <Text style={{
                                                width: '50%'
                                            }}>Specialization Sector:</Text>
                                            <Text style={{
                                                width: '50%',
                                                color: '#3AAD94',
                                                fontWeight: 'bold'
                                            }}> {docProfile?.doctor_informations?.specializations[0]?.name} </Text>
                                        </View> */}

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            marginVertical: 10
                                        }}>
                                            <Text style={{
                                                width: '50%'
                                            }}>Email :</Text>
                                            <Text style={{
                                                width: '50%',
                                                color: '#3AAD94',
                                                fontWeight: 'bold'
                                            }}>{ nurse_profile?.data?.email}</Text>
                                        </View>

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            marginVertical: 10
                                        }}>
                                            <Text style={{
                                                width: '50%'
                                            }}>Phone :</Text>
                                            <Text style={{
                                                width: '50%',
                                                color: '#3AAD94',
                                                fontWeight: 'bold'
                                            }}>{nurse_profile?.data?.phone}</Text>
                                        </View>

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            marginVertical: 10
                                        }}>
                                            <Text style={{
                                                width: '50%'
                                            }}>Gender :</Text>
                                            <Text style={{
                                                width: '50%',
                                                color: '#3AAD94',
                                                fontWeight: 'bold'
                                            }}>{nurse_profile?.data?.gender}</Text>
                                        </View>


                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            marginVertical: 10
                                        }}>
                                            <Text style={{
                                                width: '50%'
                                            }}>Date of birth :</Text>
                                            <Text style={{
                                                width: '50%',
                                                color: '#3AAD94',
                                                fontWeight: 'bold'
                                            }}>{nurse_profile?.data?.dob}</Text>
                                        </View>

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            marginVertical: 10
                                        }}>
                                            <Text style={{
                                                width: '50%'
                                            }}>Reg no :</Text>
                                            <Text style={{
                                                width: '50%',
                                                color: '#3AAD94',
                                                fontWeight: 'bold'
                                            }}>{nurse_profile?.nurse_info?.license_number ? nurse_profile?.nurse_info?.license_number : 'N/A'}</Text>
                                        </View>


                                        {/* <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            marginVertical: 10
                                        }}>
                                            <Text style={{
                                                width: '50%'
                                            }}>Clinic Address:</Text>
                                            <View style={{
                                                width: '50%',
                                            }}>
                                                <Text style={{
                                                    color: '#3AAD94',
                                                    fontWeight: 'bold'
                                                }}>House 14, Road 15
                                                Sonargaon road,
                                                Dhaka 1230</Text>
                                                <TouchableOpacity>
                                                    <Text style={{
                                                        color: '#36AAD6'
                                                    }}>View in map</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View> */}

                                    </View>

                                    
                                </View>

                            </View>

                        </ScrollView>

                    </View>
                )
            }
            
            
        </SafeAreaView>
    )
}
