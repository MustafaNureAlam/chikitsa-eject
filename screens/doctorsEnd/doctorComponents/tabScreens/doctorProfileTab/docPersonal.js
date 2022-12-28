import React, {useEffect, useState, useCallback, useRef} from 'react'
import { 
    View, 
    Text, 
    SafeAreaView,
    TouchableOpacity,
    FlatList,
    ScrollView

} from 'react-native';

import {MaterialIcons} from '@expo/vector-icons';

import { 
    Avatar,
    Modal, 
    Portal, 
    Provider,
    RadioButton,
    Switch,
    Dialog  
} from 'react-native-paper';
import * as doctorEnd from '../../../../../services/api/doctorEnd';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../../modules/loader';
import token from '../../../../../services/local_storage/storage';
import config from '../../../../../services/config';

export default function DocPersonalScreen({navigation}) {

    const isMounted = useRef(true);
    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', paddingVertical: 20};

    const [docProfile, setDocProfile] = useState(null);
    const [doc_slots, setDocSlots] = useState(null);
    const [is_loading, setLoading] = useState(true);
    const [dr_modal_data, setDrModaldata] = useState(null)

    


    async function getDoctorProfileData() {
        let doctor_profile = await doctorEnd.getDoctorProfile();
        setDocProfile(doctor_profile);
        setLoading(false);
        
        // console.log('==============getDoctorEndProfile========================');
        // console.log(doctor_profile);
        // console.log('==============getDoctorEndProfile========================');
    }

    async function getDoctorCreatedslots() {
        
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "doctor/my_slots", requestOptions)
        .then(response => response.text())
        .then(result => {
            let doctor_slots_created = JSON.parse(result);
            setDocSlots(doctor_slots_created);
            setLoading(false);
            // console.log('=========doctor_slots_created===',doctor_slots_created);
        })
        .catch(error => console.log('error', error));
    }

    useFocusEffect(
        useCallback(() => {

            if(isMounted) {
                setLoading(true);
                getDoctorProfileData();
                // getDoctorCreatedslots();
                setLoading(false);
            }

            return () => {
                isMounted.current = false;
            };
        }, []),
    );

    function updatePersonalDetails() {
        console.log("docProfile#########LLLLLLL$$$")
        console.log(docProfile)
        console.log("docProfile#########LLLLLLL$$$")
        navigation.navigate('UpdateDocPersonalData', docProfile);
    }


    function setSlotTime(time) {
        // console.log('selectedtime=======',time.day.id)
        navigation.navigate('CreateSlotTimeScreen',time)
    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            {
                is_loading ? (
                    <Loader/>
                ) : (
                    <View>
                        <ScrollView showsVerticalScrollIndicator={false} >
                            <View>
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

                                        {/* <View style={{
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
                                            }}>{docProfile?.data?.email ? docProfile?.data?.email : 'N/A'}</Text>
                                        </View> */}

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
                                            }}>{docProfile?.data?.phone}</Text>
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
                                            }}>{docProfile?.data?.gender}</Text>
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
                                            }}>{docProfile?.data?.dob}</Text>
                                        </View>



                                        {/* <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            marginVertical: 10
                                        }}>
                                            <Text style={{
                                                width: '50%'
                                            }}>Qualifications:</Text>
                                            <Text style={{
                                                width: '50%',
                                                color: '#3AAD94',
                                                fontWeight: 'bold'
                                            }}>MBBS, MS - ENT</Text>
                                        </View> */}

                                        {/* <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            marginVertical: 10
                                        }}>
                                            <Text style={{
                                                width: '50%'
                                            }}>Experience::</Text>
                                            <Text style={{
                                                width: '50%',
                                                color: '#3AAD94',
                                                fontWeight: 'bold'
                                            }}>18 years</Text>
                                        </View> */}

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            marginVertical: 10
                                        }}>
                                            <Text style={{
                                                width: '50%'
                                            }}>Licence no :</Text>
                                            <View style={{
                                                width: '50%',
                                            }}>
                                                <Text style={{
                                                    color: '#3AAD94',
                                                    fontWeight: 'bold'
                                                }}>{docProfile?.doctor_info?.license_number ? docProfile?.doctor_info?.license_number : "N/A"}</Text>
                                                {/* <TouchableOpacity>
                                                    <Text style={{
                                                        color: '#36AAD6'
                                                    }}>View in map</Text>
                                                </TouchableOpacity> */}
                                            </View>
                                        </View>

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            marginVertical: 10
                                        }}>
                                            <Text style={{
                                                width: '50%'
                                            }}>Doctor Type:</Text>
                                            <View style={{
                                                width: '50%',
                                            }}>
                                                <Text style={{
                                                    color: '#3AAD94',
                                                    fontWeight: 'bold'
                                                }}>{docProfile?.doctor_info?.doc_type}</Text>
                                            </View>
                                        </View>

                                    </View>

                                    {/* <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        <View style={{
                                            marginHorizontal:15
                                        }}>
                                            <Text style={{
                                                marginVertical: 10,
                                                fontSize:16,
                                                fontWeight:'bold',
                                                padding:5
                                            }}>
                                                My Slots
                                            </Text>
                                        </View>

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
                                                    borderBottomLeftRadius:100/2,
                                                    alignItems:'center'
                                                }}
                                                onPress={() => navigation.navigate('CreateDoctorSlotScreen') }
                                            >

                                                <MaterialIcons name="add-circle-outline" size={16} color="#FFF" />
                                                <Text style={{
                                                    color: '#FFF',
                                                    marginLeft: 5
                                                }} >Add slot</Text>

                                            </TouchableOpacity>
                                        </View>

                                    </View> */}

                                    {/* <View style={{
                                        marginHorizontal:15,
                                        marginVertical:15
                                    }}>
                                        <FlatList 
                                            data={doc_slots?.data}
                                            renderItem={({ item, index }) => (
                                                <View style={{
                                                    flexDirection:'row',
                                                    marginHorizontal:5,
                                                    marginVertical:5
                                                }}>

                                                    <View style={{flex:1}}>
                                                        <TouchableOpacity style={{
                                                            backgroundColor:"#EAEAEA",
                                                            paddingVertical: 5, 
                                                            paddingHorizontal: 20,
                                                            // marginRight: 5,
                                                            borderColor: '#70707B',
                                                            borderTopLeftRadius: 100/2,
                                                            borderBottomLeftRadius:100/2
                                                            // borderWidth: .3,
                                                        }}>
                                                            <Text style={{ 
                                                                
                                                                fontWeight: 'bold',
                                                                color: '#000',
                                                                textAlign:"center"
                                                                }}>
                                                                    {item?.day?.day}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>

                                                    <View>
                                                        <TouchableOpacity 
                                                            style={{
                                                                flexDirection: 'row',
                                                                backgroundColor: '#3AAD94',
                                                                paddingHorizontal:10,
                                                                paddingVertical: 5,
                                                                alignItems:'center',
                                                                borderTopRightRadius:100/2,
                                                                borderBottomRightRadius:100/2
                                                            }}
                                                            onPress={() => setSlotTime(item) }
                                                        >

                                                            <MaterialIcons name="add-circle-outline" size={16} color="#FFF" />
                                                            <Text style={{
                                                                color: '#FFF',
                                                                marginLeft: 5,
                                                                fontSize:14,
                                                                fontWeight:"bold"
                                                            }} >Add Time</Text>

                                                        </TouchableOpacity>
                                                    </View>

                                                </View>
                                            )}
                                            // numColumns={2}
                                            // horizontal={true}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View> */}
                                </View>

                            </View>

                        </ScrollView>

                    </View>
                )
            }
            
            
        </SafeAreaView>
    )
}
