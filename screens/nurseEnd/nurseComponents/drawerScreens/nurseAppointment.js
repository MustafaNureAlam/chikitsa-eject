import React, { useState, useCallback, useRef } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    BackHandler,
    StatusBar,
    StyleSheet,
    Dimensions,
    FlatList,
    RefreshControl,
    Alert
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
import {Calendar, CalendarList, Agenda } from 'react-native-calendars';
import * as nurseEnd from '../../../../services/api/nurseEnd';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../modules/loader';
import config from '../../../../services/config';

export default function NurseAppointmentScreen({navigation, route}) {

    const isMounted = useRef(true);
    const [api_data, setApidata] = useState(null);
    const [docProfile, setDocProfile] = useState(null);
    const [is_loading, setLoading] = useState(true);

    async function getNurseEndAppointment() {
        let nurse_appoint_data = await nurseEnd.getNurseEndAppointmentData();
        setApidata(nurse_appoint_data);
        // console.log('==============appoint-------------=')
        // console.log(nurse_appoint_data)
        // console.log('==============appoint-------------=')
    }

    useFocusEffect(
        useCallback(() => {

            if(isMounted) {
                setLoading(true);
                getNurseEndAppointment();
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

            <View style={{flex:1,paddingTop:12}}>
                <FlatList 
                    data={api_data?.data}
                    renderItem={({ item, index }) => (
                        
                        <View style={{ 
                            flex:1,
                            backgroundColor: '#D9FFF0', 
                            marginHorizontal:12,
                            borderRadius:4,
                            marginBottom:4
                        }}
                    >
                        <TouchableOpacity 
                            style={{ 
                                paddingVertical: 16, 
                                flex: 1, 
                                flexDirection:'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                paddingHorizontal:12,
                            }}
                            // onPress={ () => { CreateRoom(item) } }    
                        >

                            <View style={{flex:2,paddingRight:8}}>
                                <Text 
                                    style={{ 
                                        color: "#3AAD94",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        flex:.3
                                    }}
                                >{item?.patient_info.name?.toUpperCase()}
                                </Text>

                                <Text style={{ 
                                        color: "#3AAD94",
                                        flex:.2,
                                        fontSize:12,
                                        fontWeight:'bold'
                                    }}
                                >
                                    Birthday : {item.patient_info.dob ? item.patient_info.dob : 'N/A'}
                                </Text>

                                <Text style={{ 
                                        color: "#3AAD94",
                                        flex:.2,
                                        fontSize:12,
                                        fontWeight:'bold'
                                    }}
                                >
                                    Gender : {item.patient_info.gender}
                                </Text>
                                
                                <Text style={{ 
                                        color: "#3AAD94",
                                        flex:.2,
                                        fontSize:12,
                                        fontWeight:'bold',
                                        fontStyle:'italic'
                                    }}
                                >
                                    Contact : {item.patient_info.phone ? item.patient_info.phone : 'N/A'}
                                </Text>
                                
                                <Text style={{ 
                                        color: "#3AAD94",
                                        flex:.2,
                                        fontSize:12,
                                        fontWeight:'bold',
                                        fontStyle:'italic'
                                    }}
                                >
                                    Profession : {item.patient_info.profession ? item.patient_info.profession : 'N/A'}
                                </Text>

                            
                                
                            </View>

                            <View style={{
                                flex:1,
                                alignItems:'center',
                            }}>
                                <Text style={{ 
                                        color: "#3AAD94",
                                        flex:.2,
                                        fontSize:14,
                                        fontWeight:'bold',
                                        textAlign:'center'
                                    }}
                                >
                                    Date : {item.appointment_date}
                                </Text>
                                <Text style={{ 
                                        color: "#3AAD94",
                                        flex:.2,
                                        fontSize:14,
                                        fontWeight:'bold',
                                        textAlign:'center'
                                    }}
                                >
                                    App. type : {item.appointment_type}
                                </Text>
                            </View>
                            {/* <Entypo name="chevron-right" size={22} color="#3AAD94" /> */}
                        </TouchableOpacity>
                        {/* <View style={{
                            borderWidth: .3, 
                            borderColor: '#DEDFE0'
                        }}>
                        </View> */}
                    </View>
                    )}
                    numColumns={1}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    )
}
