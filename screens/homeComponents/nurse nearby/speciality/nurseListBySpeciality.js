import React, { useState, useEffect, useCallback, useRef } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    StatusBar,
} from 'react-native';

import { 
    Avatar,
    Modal, 
    Portal, 
    Provider,
    RadioButton,
    Switch,
    Dialog  
} from 'react-native-paper';

// import userAvatar from '../../../../../assets/user_avatar.png';
import { Ionicons,FontAwesome,MaterialIcons , MaterialCommunityIcons   } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Calendar, CalendarList, Agenda } from 'react-native-calendars';
import * as patientEnd from '../../../../services/api/patientEnd';
import Loader from '../../../modules/loader';
import SelectDropdown from 'react-native-select-dropdown'
import {useFocusEffect} from '@react-navigation/native';
import config from '../../../../services/config';
import token from '../../../../services/local_storage/storage'

export default function NurseListBySpeciality({navigation, route}) {

    const isMounted = useRef(true);

    const concernId = route.params;

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', paddingVertical: 20};
    const [gender, setGender] = useState('male');
    const [chamber, setChamber] = useState('clinic');
    const [doc_exp, setDocexp] = useState(null);
    const [doc_charge, setDocCharge] = useState(null);
    const [time_select, setTime] = useState(null);
    const [appointment_date, setAppointment] = useState(null);

    const [video, setVideo] = useState(false);

    const onToggleSwitch = () => setVideo(!video);

    const [api_data, setApidata] = useState(null);
    const [schedule_data, setScheduledata] = useState(null);
    const [is_loading, setLoading] = useState(true);
    const [slot_time_array, setSlotarray] = useState([]);
    const [slot_time_end, setSlotEnd] = useState([]);
    const [is_slot, setIsSlot] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [appoint_time, setAppointTime] = useState("");


    useFocusEffect(

        
        useCallback(() => {

            if(isMounted){
                setLoading(true);
                getNurseByConcern();
                setLoading(false);
            }

            return () => {
                console.log('cleanUp returned')
                isMounted.current = false;
            }
        }, []),
        
    );
    async function getNurseByConcern() {
        let user_token = await token.getItem("token");
        // console.log('response_id',concernId);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        await fetch( config.baseUrl + "specialization_by_nurses/" + concernId, requestOptions)
        .then(response => response.text())
        .then(result => {
            let nurse_list_data = JSON.parse(result)
            if(isMounted){
                setApidata(nurse_list_data);
                // console.log('======NURSE======')
                // console.log(nurse_list_data)
                // console.log('======NURSE======')
            }
            
        })
        .catch(error => {
            console.log('error', error)
        });
    }

    function goToDocDetails(details) {
        navigation.navigate('NurseDetailsBySpecialityScreen', details)
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fafefe'}}>
            <StatusBar backgroundColor={'#075141'} />
            {
                is_loading ? (
                    <Loader/>
                ) : (
                    <View style={{}}>

                        {
                            api_data?.data?.length > 0 ? (
                                <View style={{paddingVertical:20}}>

                                    <View style={{
                                        marginTop:10
                                    }}>
                                        <FlatList
                                            data={api_data?.data}
                                            renderItem={({item, index}) => (
                                                <View>
                                                    <TouchableOpacity 
                                                        onPress={()=>{
                                                            // showBookModal(item)
                                                            goToDocDetails(item)
                                                        }}
                                                        style={{
                                                            // elevation:.5,
                                                            borderRadius:10,
                                                            marginHorizontal:20,
                                                            marginVertical:7,
                                                            flexDirection:'row',
                                                            justifyContent:'space-between',
                                                            backgroundColor:'#c6f5eb',
                                                            paddingHorizontal:10,
                                                            paddingVertical:7
                                                        }}
                                                    >
                                                        <View style={{
                                                            flex:.3,
                                                            justifyContent:'center',
                                                            paddingHorizontal:7
                                                        }}>
                                                            <Avatar.Image 
                                                                size={65} 
                                                                style={{backgroundColor:'#fff', borderWidth:.3,borderColor:'#70707B'}} 
                                                                source={{uri : config.baseUrl + 'uploades/' + item?.iamge}} 
                                                            />
                                                        </View>

                                                        <View style={{
                                                            flex:.7,
                                                            // flexDirection:'row',
                                                            // justifyContent:'space-around',
                                                            // backgroundColor:'#D6D6D6',
                                                            alignItems:'flex-start',
                                                            marginHorizontal:15,
                                                            padding:5,
                                                            marginVertical:5,
                                                            // elevation:1
                                                        }}>
                                                            
                                
                                                            <View style={{
                                                                // flexDirection:'row',
                                                                // alignItems:'center',
                                                                // justifyContent:'space-between'
                                                                }}>
                                                                <View>
                                                                    <Text style={{
                                                                        paddingVertical:5,
                                                                        fontWeight:'bold',
                                                                        fontSize:16
                                                                    }}>{item.name.toUpperCase()}</Text>

                                                                    <FlatList
                                                                        showsVerticalScrollIndicator={false}
                                                                        data={item?.doctors_education}
                                                                        renderItem={({item, index_deg}) =>(
                                                                            <View style={{}}>
                                                                                <Text style={{
                                                                                fontSize:12,
                                                                                fontWeight:'400',
                                                                            }}>{item?.deg_name.toUpperCase()}</Text>
                                                                            </View>
                                                                        )}
                                                                        // keyExtractor={(item, index_deg)=>index_deg.toString()}
                                                                        // key={0}
                                                                        listKey={(item, index) => 'A' + index.toString()}
                                                                    />
                                    
                                                                </View>
                                
                                                            </View>

                                                            <View style={{
                                                                flex:1,
                                                                // justifyContent:'center',
                                                            }}>
                                                                <Text style={{
                                                                    fontSize:14,
                                                                    fontWeight:'700',
                                                                    // textAlign:'center'
                                                                    color:'#70707B'
                                                                }}>Speciality</Text>
                                                                <FlatList
                                                                    showsVerticalScrollIndicator={false}
                                                                    showsHorizontalScrollIndicator={false}
                                                                    data={item?.specializations}
                                                                    renderItem={({item, index_name}) =>(
                                                                        <View style={{
                                                                            flex:1,
                                                                            // alignItems:'center',
                                                                            // justifyContent:'center'
                                                                            }}
                                                                        >
                                                                            
                                                                            <Text style={{
                                                                            color:'#70707B',
                                                                            fontSize:11,
                                                                            fontWeight:'400',
                                                                            // paddingVertical:5,
                                                                        }}>{item?.name ? item?.name : 'specializations : N/A'}</Text>
                                                                        </View>
                                                                    )}
                                                                    // keyExtractor={(item, index_name)=>index_name.toString()}
                                                                    listKey={(item, index) => 'D' + index.toString()}
                                                                    // key={1}
                                                                    horizontal={true}
                                                                    ItemSeparatorComponent={() => <Text style={{color:'#70707B'}}> , </Text>}
                                                                />
                                                            </View>
                                
                                                        </View>

                                                        <View style={{
                                                            justifyContent:'center',
                                                            alignItems:'center'
                                                        }}>
                                                            <MaterialCommunityIcons  
                                                                name='chevron-right'
                                                                color={'#70707B'}
                                                                size={30}
                                                            />
                                                        </View>

                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                                    </View>

                                </View>
                                
                            ) : (
                                <View style={{
                                    justifyContent:'center',
                                    alignItems:'center',
                                    height:'100%'
                                }}>
                                    <Text style={{
                                        fontSize:16,
                                        fontWeight:'bold'
                                    }}>No Nurse Available</Text>
                                </View>
                            )
                        }   
                        
                    </View>
                )
            }


        </SafeAreaView>
    )
}
