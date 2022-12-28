import React, { useEffect, useCallback, useState, useRef} from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity
} from 'react-native'

import * as patientEnd from '../../../services/api/patientEnd';
import Loader from '../../modules/loader';
import {MaterialIcons} from '@expo/vector-icons';
import {useFocusEffect} from '@react-navigation/native';

export default function PersonalTab({navigation, route}) {

    const isMounted = useRef(true);
    const [profile, setProfile] = useState(null);
    const [is_loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {

            if(isMounted) {
                setLoading(true);
                getPatientProfileData();
                setLoading(false);
            }

            return () => {
                isMounted.current = false;
            }
        }, [navigation, route]),
    );

    // useEffect(() => {
    //     getPatientProfileData();
    //     setLoading(false);
    //     // return () => {
    //     //     cleanup
    //     // }
    // }, [])



    async function getPatientProfileData() {
        if(isMounted) {
            setLoading(true);
            let patient_profile_data = await patientEnd.getPatientProfile()
            setProfile(patient_profile_data)
            setLoading(false);
            console.log('patient_profile_data_from_component',patient_profile_data);
        }

    }

    function updatePersonalInfo() {
        navigation.navigate('UpdatePersonalData', profile)
    }


    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{
                flex:1,
                backgroundColor:'#fff'
            }}>
                {
                    is_loading ? (
                        <Loader/>
                    ) : (
                        <ScrollView>
                            <View>
                                <View style={{
                                    justifyContent:'center',
                                    alignItems:'flex-end',marginTop:10
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
                                        onPress={() => updatePersonalInfo()}
                                    >

                                        <MaterialIcons name="edit" size={16} color="#FFF" />
                                        <Text style={{
                                            color: '#FFF',
                                            marginLeft: 5
                                        }} >Edit</Text>

                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    flex:1,
                                    padding:15
                                }}>
                                    <View style={styles.detailsContainerTxt}>
                                        <Text style={styles.infoTxt}>Contact Number :</Text>
                                        <Text style={styles.detailsTxt}> {profile?.user?.phone} </Text>
                                    </View>
                                    <View style={styles.detailsContainerTxt}>
                                        <Text style={styles.infoTxt}>Email :</Text>
                                        <Text style={styles.detailsTxt}>{profile?.user?.email ? profile?.user?.email : 'N/A' }</Text>
                                    </View>
                                    <View style={styles.detailsContainerTxt}>
                                        <Text style={styles.infoTxt}>Gender :</Text>
                                        <Text style={styles.detailsTxt}>{profile?.user?.gender}</Text>
                                    </View>
                                    <View style={styles.detailsContainerTxt}>
                                        <Text style={styles.infoTxt}>Date of Birth :</Text>
                                        <Text style={styles.detailsTxt}>{profile?.user?.dob}</Text>
                                    </View>
                                    <View style={styles.detailsContainerTxt}>
                                        <Text style={styles.infoTxt}>Marital Status :</Text>
                                        <Text style={styles.detailsTxt}>{profile?.personal_info?.marital_status}</Text>
                                    </View>
                                    <View style={styles.detailsContainerTxt}>
                                        <Text style={styles.infoTxt}>Height :</Text>
                                        <Text style={styles.detailsTxt}>{profile?.personal_info?.height} </Text>
                                    </View>
                                    <View style={styles.detailsContainerTxt}>
                                        <Text style={styles.infoTxt}>Weight :</Text>
                                        <Text style={styles.detailsTxt}>{profile?.personal_info?.weight}</Text>
                                    </View>
                                    <View style={styles.detailsContainerTxt}>
                                        <Text style={styles.infoTxt}>Emergency contact :</Text>
                                        <Text style={styles.detailsTxt}>{profile?.personal_info?.emergency_contact}</Text>
                                    </View>
                                    {/* <View style={styles.detailsContainerTxt}>
                                        <Text style={styles.infoTxt}>Location</Text>
                                        <Text style={styles.detailsTxt}></Text>
                                    </View> */}
                                    {/* <View style={styles.detailsContainerTxt}>
                                        <Text style={styles.infoTxt}>Admission date :</Text>
                                        <Text style={styles.detailsTxt}>26 Oct 2011</Text>
                                    </View> */}

                                    {/* <View style={{
                                        marginHorizontal:3,
                                    }}>
                                        <Text style={styles.infoTxt}>Patient history:</Text>
                                        <View style={{
                                            flexDirection:'row',
                                            marginVertical:10
                                        }}>
                                            <Text style={styles.patientHistoryTxtStyle}>Typhoid</Text>
                                            <Text style={styles.patientHistoryTxtStyle}>19 Dec 2010</Text>
                                        </View>
                                    </View>

                                    <View style={{marginHorizontal:3}}>
                                        <Text style={styles.infoTxt}>Medication lists:</Text>
                                        <View style={{
                                            flex:1,
                                            flexDirection:'row',
                                            // justifyContent:'space-between'
                                            marginVertical:10
                                        }}>
                                            <TouchableOpacity style={styles.medicationBtnStyle}>
                                                <Text style={styles.medicationTxt}>Diabetes</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.medicationBtnStyle}>
                                                <Text style={styles.medicationTxt}>Kidney</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.medicationBtnStyle}>
                                                <Text style={styles.medicationTxt}>Thyroid</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{
                                        marginHorizontal:3,
                                    }}>
                                        <Text style={styles.infoTxt}>
                                            Integrated lab and radiology results:
                                        </Text>

                                        <View style={{
                                            marginVertical:10
                                        }}>
                                            <View style={{
                                                flexDirection:'row',
                                                // marginVertical:10
                                            }}>
                                                <Text style={styles.patientHistoryTxtStyle}>Blood test</Text>
                                                <Text style={styles.patientHistoryTxtStyle}>29 Nov 2021</Text>
                                                <Text style={styles.patientHistoryTxtStyle}>Report</Text>
                                            </View>

                                            <View style={{
                                                flexDirection:'row',
                                                // marginVertical:10
                                            }}>
                                                <Text style={styles.patientHistoryTxtStyle}>Diabetes test</Text>
                                                <Text style={styles.patientHistoryTxtStyle}>28 Nov 2021</Text>
                                                <Text style={styles.patientHistoryTxtStyle}><Text style={{color:'#ccc'}}>Pending</Text></Text>
                                            </View>
                                        </View>

                                    </View> */}

                                </View>
                            </View>
                        </ScrollView>
                    )
                }
                
            </View>
        </SafeAreaView>
    )
        
}

const styles = StyleSheet.create({
    detailsContainerTxt:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:3
    },
    detailsTxt:{
        color:'#3AAD94',
        fontWeight:'bold',
        fontSize:14
    },
    infoTxt:{
        fontSize:15,
        fontWeight:'bold'
    },
    patientHistoryTxtStyle:{
        borderWidth:.5,
        flex:.5,
        textAlign:'center',
        padding:5,
        color:'#3AAD94',
        fontSize:14,
        fontWeight:'bold'
    },
    medicationBtnStyle:{
        paddingVertical:5,
        paddingHorizontal:10,
        borderWidth:.5,
        borderColor:'#3AAD94',
        borderRadius:100/2,
        marginHorizontal:5
    },
    medicationTxt:{
        fontSize:14,
        color:'#3AAD94'
    }
});
