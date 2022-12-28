import React, { useState, useEffect, useCallback, useRef } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    StyleSheet,
    Dimensions,
    FlatList,
    BackHandler, 
    Alert,
    RefreshControl
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
import {useFocusEffect} from '@react-navigation/native';
import config from '../../../../services/config';
import * as doctorEnd from '../../../../services/api/doctorEnd';
import Loader from '../../../modules/loader';


export default function DoctorAppointmentScreen({navigation}) {

    const isMounted = useRef(true);
    const [api_data, setApidata] = useState(null);
    const [is_loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getDoctorEndAppointment();
        setRefreshing(false);

        return () => {
            isMounted.current = false;
        }
    }, []);


    async function getDoctorEndAppointment() {
        let doctor_appoint_data = await doctorEnd.getDoctorEndAppointmentData();

        setApidata(doctor_appoint_data);
        // console.log('==========ccccccc========',doctor_appoint_data);
    }

    useFocusEffect(
        useCallback(() => {
            
            if(isMounted) {
                setLoading(true)
                getDoctorEndAppointment();
                setLoading(false);
            }

            return () => {
                isMounted.current = false;
            }
        }, []),
    );


    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'}/>
            {
                is_loading ? (
                    <Loader/>
                ) : (
                    <View style={{marginVertical:15}}>
                        {
                            api_data?.data ? api_data?.data?.length > 0 && (
                                <FlatList 
                                    showsVerticalScrollIndicator={false}
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh}
                                        />
                                    }
                                    data={api_data?.data}
                                    renderItem={({ item, index }) => (
                                        
                                        <View style={{ 
                                            flex:1,
                                            // backgroundColor: '#D9FFF0', 
                                            // paddingHorizontal: 24,
                                            marginHorizontal:15,
                                            marginVertical:5,
                                            borderWidth:.3,
                                            borderColor:'#70707B',
                                            borderRadius:5
                                        }}>
                                            
                                            <TouchableOpacity style={{ 
                                                paddingVertical: 15, 
                                                flex: 1, 
                                                flexDirection:'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                paddingHorizontal:10
                                            }}>
                                                
                                                <Text style={{ 
                                                    color: "#70707B",
                                                    fontWeight: "bold",
                                                    fontSize: 14,
                                                }}>
                                                    {item?.patient_info?.name}
                                                </Text>
                                                
                                                <Text style={{ 
                                                    color: "#70707B" 
                                                }}>
                                                    {item?.patient_info?.gender}
                                                </Text>
                                                
                                                <Text style={{ 
                                                    color: "#3AAD94",
                                                    fontWeight:'bold',
                                                    fontSize:14
                                                }}>
                                                    {item?.appointment_date}
                                                </Text>
                                                {/* <Entypo name="chevron-right" size={22} color="#3AAD94" /> */}
                                            </TouchableOpacity>
                                            
                                            {/* <View style={{
                                                borderWidth: .3, 
                                                borderColor: '#DEDFE0'
                                            }}>
                                            </View> */}
                                        </View>
                                    )}
                                    // numColumns={1}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            ) : (
                                <View style={{
                                    height:'100%',
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <Text style={{
                                        color:"#000",
                                        fontSize:18,
                                        fontWeight:'bold'
                                    }}>No appointments</Text>
                                </View>
                            )
                        }
                    </View>
                )
            }
            
        </SafeAreaView>
    )
}
