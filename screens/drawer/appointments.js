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
    BackHandler, 
    Alert,
    FlatList, 
    RefreshControl
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {useFocusEffect} from '@react-navigation/native';
import token from '../../services/local_storage/storage';
import * as SecureStore from 'expo-secure-store';
import config from '../../services/config';
import Loader from '../modules/loader';
import patientEnd from '../../services/api/patientEnd';
import { Avatar, Button } from 'react-native-paper';
const moment = require('moment');
export default function AppointmentScreen({navigation}) {
    
    const isMounted = useRef(true);
    const [api_data, setApidata] = useState(null);
    const [is_loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {

        if(isMounted) {
            setRefreshing(true);
            getAppointData();
            setRefreshing(false);
        }

        // console.log('=====onRefresh=======')
        // console.log(api_data)
        // console.log('=====onRefresh=======')

        return() => {
            isMounted.current = false;
        }
    }, []);

    async function getAppointData() {
        await SecureStore.getItemAsync("token").then(async(token) => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow', 
            };

            
            await fetch( config.baseUrl + "patient/my_upcoming_appointments", requestOptions)
            .then(response => response.text())
            .then(result => {
                // console.log(result)
                let appoint_api_data = JSON.parse(result)
                console.log('-----=====appoint_api_data_dashboard=======------')
                console.log(appoint_api_data)
                console.log('-----=====appoint_api_data_dashboard=======------')

                setApidata(appoint_api_data);
            })
            .catch(error => {
                console.log('error', error)
            });
        })

    }

    async function joinRoom(appointment){

        // console.log('===========join room========')
        // console.log(appointment.id)
        // console.log('===========join room========')
        const call_abort = new AbortController();
        const call_sinal = { signal : call_abort.signal}
        const room = await patientEnd.joinRoom(appointment.id, call_sinal)
        console.log('room', room);
        if(room.code === 200){
            navigation.navigate('VideoScreen', room)
        }else if(room.code === 404){
            console.log(room)
            alert(room.meet_room);
        }
    }

    useFocusEffect(
        useCallback(() => {

            if(isMounted) {
                setLoading(true);
                getAppointData();
                setLoading(false);
            }
            
        
            return () => {
                // Once the Screen gets blur Remove Event Listener
               console.log('appoint_freturned')
               isMounted.current = false;
            };
        }, []),
    );
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'}/>

            <View style={{
                flex:1
            }}>
                {
                    is_loading ? (
                        <Loader/>
                    ) : (
                        
                        <View style={{flex:1}}>
                            {
                                api_data?.data ? api_data?.data.length > 0 &&  (
                                    
                                    <View style={{flex:1,marginVertical:4}}>
                                        <FlatList 

                                            refreshControl={
                                                <RefreshControl
                                                    refreshing={refreshing}
                                                    onRefresh={onRefresh}
                                                />
                                            }
                                            data={api_data?.data}
                                            renderItem={({ item, index }) => (
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    }}
                                                >
                                                    {item?.type === 'doctor' &&(
                                                        // <TouchableOpacity 
                                                        //     onPress={() => {
                                                        //         joinRoom(item)
                                                        //     }}
                                                        // >
                                                        <View
                                                            style={{
                                                                flexDirection: 'row',
                                                                borderWidth:.5,
                                                                borderColor:'#70707B',
                                                                margin: 10,
                                                                padding: 10
                                                            }}
                                                        >

                                                            <View
                                                                style={{
                                                                    flex: .3
                                                                }}
                                                            >
                                                                <Image
                                                                    style={{
                                                                        backgroundColor:'#fff',
                                                                        borderWidth:.5,
                                                                        borderColor:'#70707B',
                                                                        height: 80,
                                                                        // margin: 10,
                                                                        width:80,
                                                                        borderRadius:4,
                                                                    }} 
                                                                    resizeMode="cover"
                                                                    source={{uri: config.baseUrl + 'uploades/' + item?.doctor_info?.user_pic }} 
                                                                />
                                                            </View>
                                                            <View
                                                                style={{
                                                                    flex: .5,
                                                                    alignItems: 'flex-start',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                <Text style={{ 
                                                                    color: "#0B1509",
                                                                    fontWeight: "bold",
                                                                    fontSize: 14,
                                                                    flex:1
                                                                    }}>
                                                                    {item?.doctor_info?.name}
                                                                </Text>
                                                                
                                                                <Text style={{ 
                                                                    color: "#0B1509",
                                                                    fontSize:12,
                                                                    flex:1,
                                                                    fontWeight:'bold'
                                                                    }}>
                                                                    {item?.doctor_info?.gender}
                                                                </Text>
                                                                
                                                                
                                                                <Text style={{ 
                                                                    color: "#0B1509" ,
                                                                    fontSize:12,
                                                                    flex:1,
                                                                    fontWeight:'bold'
                                                                    }}
                                                                >
                                                                    {moment(Date.parse(item?.appointment_date)).format('DD-MM-YYYY')}
                                                                </Text>
                                                                
                                                                <Text style={{ 
                                                                        color: (item?.status === "success" ? "#46bcaa" : (item?.status === "pending" ? "#4d69fa" : "#ffcf52")),
                                                                        fontSize:12,
                                                                        flex:1,
                                                                        fontWeight:'bold'
                                                                    }}
                                                                >
                                                                    {item?.status}
                                                                </Text>
                                                            </View>

                                                            <View
                                                                style={{
                                                                    flex: .2,
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-between',
                                                                }}
                                                            >
                                                                    <Button
                                                                        onPress={() => {
                                                                            joinRoom(item)
                                                                        }}
                                                                    >
                                                                        {/* Join Room */}
                                                                        <Entypo name="chevron-right" size={28} color="#3AAD94" />
                                                                    </Button>
                                                            </View>

                                                        </View>
                                                    )}
                                                </View>
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>

                                ) : (
                                    
                                    <View style={{
                                        flex:1,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        // height:'100%'
                                    }}>
                                        <Text style={{
                                            fontSize:18,
                                            fontWeight:'bold',
                                            color:'#3AAD94',
                                        }}>
                                            No appointment !
                                        </Text>
                                    </View>
                                )
                            }
                        </View>
                        
                        
                    )
                }
            </View>
                
        </SafeAreaView>
    )
}