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
    Alert
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

import userAvatar from '../../../assets/user_avatar.png';
import { Ionicons,FontAwesome,MaterialIcons , MaterialCommunityIcons   } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Calendar, CalendarList, Agenda } from 'react-native-calendars';
import * as patientEnd from '../../../services/api/patientEnd';
import Loader from '../../modules/loader';
import SelectDropdown from 'react-native-select-dropdown'
import {useFocusEffect} from '@react-navigation/native';
import config from '../../../services/config';
import token from '../../../services/local_storage/storage'

const DATA = [
    {
      id: "0",
      title: "ASAP",
    },
    {
      id: "1",
      title: "Anytime",
    },
    {
      id: "2",
      title: "Next 2 hrs",
    },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity 
        onPress={onPress} 
        style={[styles.item, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{item.title}</Text>
    </TouchableOpacity>
    );

export default function SymptomsScreen({navigation, route}) {

    const isMounted = useRef(true);
    const concernId = route.params.data.id;

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

    ///book appointment

    const [bookModal, setBookModal] = useState(false);
    const [dr_modal_data, setDrModaldata] = useState(null)
    // console.log('dr_details_modal.........',appointment_date)

    function showBookModal(obj) {
        
        // console.log('selected doctor', obj)
        setBookModal(true)
        
        let dr_details = {
            id: obj.id,
            dr_name : obj.name,
            dr_deg : obj.doctors_education,
            dr_speciality : obj.specializations,
            dr_image : obj.image
        }
        // console.log('modal_params', dr_details);
        setDrModaldata(dr_details)
    };
    const hideBookModal = () => setBookModal(false);
    const bookcontainerStyle = {backgroundColor: 'white', paddingVertical: 10};

    const [api_data, setApidata] = useState(null);
    const [schedule_data, setScheduledata] = useState(null);
    const [is_loading, setLoading] = useState(true);
    const [slot_time_array, setSlotarray] = useState([]);
    const [slot_time_end, setSlotEnd] = useState([]);
    const [is_slot, setIsSlot] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [appoint_time, setAppointTime] = useState("");
    
    
    const [marked_date, setMarkedDate] = useState(null);
    // console.log('api_data...........................................');
    // // console.log('==========',schedule_data?.data[0].slots[0]);
    // // console.log('==========',schedule_data?.data[0].length);
    // console.log('api_data.........................................');

    // const slot_time_array = [];

    // console.log('new_array', slot_time_array);

    const doctor_filter_props = {
        gender : gender,
        videoCall : video,
        chamber : chamber,
        experience : doc_exp,
        docRate : doc_charge,
        appointment_time: time_select
    }

    const doctor_appoint_props = {
        doctor_user_id : dr_modal_data?.id,
        appointment_date: appointment_date,
        slot_id: selectedId,
        appointment_time : appoint_time
    }

    // console.log('doctor_appoinment_object-------', doctor_appoint_props);
    // function getAppointTime(e) {
    //     console.log('value',e);
    // }

    function saveFilter() {
        // console.log('data_obj',doctor_filter_props);
    }

    useFocusEffect(

        
        useCallback(() => {

            if(isMounted) {
                // console.log('=======mounted====')
                // console.log(isMounted)
                // console.log('=======mounted====')
                setLoading(true);
                getDoctorsByConcern();
                setLoading(false);
            }
            
            return () => {
                // abortController.abort();
                isMounted.current = false
                // console.log('cleanUp returned')
                // console.log(isMounted.current)
                // console.log('cleanUp returned')

            }
        }, []),
        
    );


    

    ////doctor schedule api
    // useEffect(() => {
    //     const controller_abort = new AbortController();
    //     const schedule_cancel = {signal : controller_abort.signal}
    //     setLoading(true);
    //     getDoctorSchedule(schedule_cancel);
    //     setLoading(false);
    //     return () => {
    //         controller_abort.abort();
    //         console.log('aborted schedule')
    //     }
    // }, [appointment_date])

    //doctor list api
    // async function getDoctorsByConcern() {
    //     let doctors_by_concern = await patientEnd.doctorByConcern(concernId)
    //     setApidata(doctors_by_concern)
    //     // setLoading(false);

    //     // console.log('======doctors_by_concern=====',doctors_by_concern);
    // }


    async function getDoctorsByConcern() {
        let user_token = await token.getItem("token");
        console.log('response_id',concernId);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        // let response = []
        await fetch( config.baseUrl + "doctor/symptom_wise/" + concernId, requestOptions)
            .then(response => response.text())
            .then(result => {
                if(isMounted) {
                    setLoading(true);
                    let doctor_list_data = JSON.parse(result)
                    setApidata(doctor_list_data);
                    setLoading(false);
                    
                    // console.log('======doctor_list_data======')
                    // console.log(doctor_list_data)
                    // console.log('======doctor_list_data======')
                }
                
            })
            .catch(error => {
                // if (error.name == 'AbortError') {
                //     console.log('request was cancelled');
                // }
                console.log('error', error)
            });
    }


    const CustomSliderMarkerLeft = () => {
        return(
            <Text style={{
                backgroundColor:'#DCDCDC',
                borderRadius:100/2,
                padding:5,
                elevation:2,
                height:20,
                width:20
            }}></Text>
        )
    }

    const CustomSliderMarkerRight = () => {
        return(
            <Text style={{
                backgroundColor:'#DCDCDC',
                borderRadius:100/2,
                padding:5,
                elevation:2,
                height:20,
                width:20
            }}></Text>
        )
    }

    const FeeSliderMarkerRight = () => {
        return(
            <Text style={{
                backgroundColor:'#DCDCDC',
                borderRadius:100/2,
                padding:5,
                elevation:2,
                height:20,
                width:20
            }}></Text>
        )
    }
    const FeeSliderMarkerLeft = () => {
        return(
            <Text style={{
                backgroundColor:'#DCDCDC',
                borderRadius:100/2,
                padding:5,
                elevation:2,
                height:20,
                width:20
            }}></Text>
        )
    }

    

    

    const renderItem = ({ item }) => {
      const backgroundColor = item.id === time_select ? "#3AAD94" : "#fff";
      const color = item.id === time_select ? 'white' : 'black';
  
      return (
        <Item
          item={item}
          onPress={() => setTime(item.id)}
          backgroundColor={{ backgroundColor }}
          textColor={{ color }}
        />
      );
    };

    function docExperience(experience) {
        // console.log('docExperience',experience);
        setDocexp(experience);
    }
    function docChargeBdt(rate) {
        // console.log('docrate',rate);
        setDocCharge(rate);
    }

    function set_selected_slot(slot_id, slot_item) {
        // console.log('set_selected_slot',slot_item.id);
        setSelectedId(slot_item.id);
        setAppointTime(slot_item.time_from);
        
    }

    function goToDocDetails(details) {

        // console.log('$$$$$$$$$$$$$$$$$$$$doctorDetails$$$$$$$$$$$$$$$$$$$$$$$')
        // console.log(details)
        // console.log('$$$$$$$$$$$$$$$$$$$$doctorDetails$$$$$$$$$$$$$$$$$$$$$$$')
        // navigation.navigate('ConcernDocDetailsScreen', details)
        navigation.navigate('DoctorNearbyScreenStack',{screen: 'ConcernDocDetailsScreen',params : details} )
        // Alert.alert(
        //     "Coming soon!",
        //     "This feature is coming soon.",
        //     [
        //     //   {
        //     //     text: "Cancel",
        //     //     onPress: () => console.log("Cancel Pressed"),
        //     //     style: "cancel"
        //     //   },
        //       { text: "OK", onPress: () => console.log("OK Pressed") }
        //     ]
        // );
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
                            api_data?.data ? api_data?.data?.length > 0 && (
                                <View style={{paddingVertical:20}}>
                                    {/* <View style={{
                                        justifyContent:'center',
                                        alignItems:'center',
                                    }}>
                                        <TouchableOpacity 
                                            style={{
                                                backgroundColor:'#3AAD94',
                                                padding:10,
                                                borderRadius:10,
                                                marginTop:10
                                            }}
                                            onPress={showModal}
                                        >
                                            <Text style={{
                                                textAlign:'center',
                                                fontSize:16,
                                                color:'#fff',
                                                fontWeight:'bold'
                                                }}>Filter <FontAwesome name="filter" size={20} color="#fff" /></Text>
                                        </TouchableOpacity>
                                    </View> */}


                                            


                                    <View style={{
                                        marginTop:10
                                    }}>
                                        <FlatList
                                            showsVerticalScrollIndicator={false}
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
                                                                source={{uri : config.baseUrl + 'uploades/' + item?.image}} 
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
                                                                        fontSize:16,
                                                                        color:'#000'
                                                                    }}>{item.name.toUpperCase()}</Text>

                                                                    <FlatList
                                                                        showsVerticalScrollIndicator={false}
                                                                        data={item?.doctors_education}
                                                                        renderItem={({item, index}) =>(
                                                                            <View style={{}}>
                                                                                <Text style={{
                                                                                fontSize:12,
                                                                                fontWeight:'400',
                                                                                color:'#000'
                                                                            }}>{item?.deg_name.toUpperCase()}</Text>
                                                                            </View>
                                                                        )}
                                                                        keyExtractor={(item, index_deg)=>index_deg.toString()}
                                                                        key={index}
                                                                        listKey={(item, index) => 'A' + index.toString()}
                                                                    />
                                    
                                                                </View>

                                                                {/* <View style={{marginLeft:10}}>
                                                                    <TouchableOpacity 
                                                                        style={{
                                                                            backgroundColor:'#0C89BF',
                                                                            padding:5,
                                                                            borderRadius:100/2
                                                                        }}
                                                                        onPress={() => navigation.navigate('InstantVideoConsultScreen')}
                                                                    >
                                                                        <Text style={{padding:2}}><Ionicons name="videocam-outline" size={24} color="#fff" /></Text>
                                                                    </TouchableOpacity>
                                                                </View> */}
                                
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
                                                                    renderItem={({item, index}) =>(
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
                                                                    keyExtractor={(item, index_name)=>index_name.toString()}
                                                                    listKey={(item, index) => 'D' + index.toString()}
                                                                    key={index}
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
                                    }}>No Doctor Available</Text>
                                </View>
                            )
                        }   
                        
                    </View>
                )
            }
            
            {/* filter */}
            <Provider >
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <View style={{alignItems:'flex-end'}}>
                            <TouchableOpacity style={{
                                padding:5,
                                marginHorizontal:5
                            }}
                                onPress={hideModal}
                            >
                                <MaterialIcons name="cancel" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            <View>
                                <View style={{
                                    marginHorizontal:20
                                }}>
                                    <View>
                                        <Text style={{
                                            fontSize:16
                                        }}>Sort by</Text>

                                        <View style={{
                                            alignItems:'flex-start',
                                        }}>
                                            <TouchableOpacity 
                                                style={{
                                                    backgroundColor:'#3AAD94',
                                                    paddingVertical:5,
                                                    paddingHorizontal:10,
                                                    borderRadius:100/2,
                                                    marginVertical:3
                                                }}
                                            >
                                                <Text style={{
                                                    color:'#fff',
                                                    fontWeight:'bold',
                                                    fontSize:12
                                                }}>
                                                    Consultation Benefits
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={{
                                                    backgroundColor:'#3AAD94',
                                                    paddingVertical:5,
                                                    paddingHorizontal:10,
                                                    borderRadius:100/2,
                                                    marginVertical:3
                                                }}
                                            >
                                                <Text style={{
                                                    color:'#fff',
                                                    fontWeight:'bold',
                                                    fontSize:12
                                                }}>
                                                    Patient Recommendation
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'space-between'
                                    }}>

                                        <Text>Gender</Text>

                                        <View>
                                            <RadioButton.Group onValueChange={newValue => setGender(newValue)} value={gender}>
                                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                                        <RadioButton value="male" />
                                                        <Text>Male</Text>
                                                    </View>
                                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                                        <RadioButton value="female" />
                                                        <Text>Female</Text>
                                                    </View>
                                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                                        <RadioButton value="other" />
                                                        <Text>Other</Text>
                                                    </View>
                                                </View>
                                            </RadioButton.Group>
                                        </View>

                                    </View>

                                    <View style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'space-between'
                                    }}>
                                        <Text>Video Consult</Text>

                                        <View>
                                            <Switch value={video} onValueChange={onToggleSwitch} />
                                        </View>
                                    </View>

                                    <View>
                                        <Text>Now or Later</Text>

                                        {/* <View style={{
                                            flexDirection:'row',
                                            justifyContent:'space-around',
                                            marginVertical:10
                                        }}>
                                            <TouchableOpacity 

                                                style={styles.timeSetBtnStyle}
                                                onPress={($event) =>console.log($event.target.value)}    
                                            >
                                                <Text style={styles.tileTxtColor}>ASAP</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.timeSetBtnStyle}>
                                                <Text style={styles.tileTxtColor}>Anytime</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={styles.timeSetBtnStyle}>
                                                <Text style={styles.tileTxtColor}>Next 2 hrs</Text>
                                            </TouchableOpacity>
                                        </View> */}
                                        <FlatList
                                            data={DATA}
                                            renderItem={renderItem}
                                            keyExtractor={(item) => item.id}
                                            extraData={time_select}
                                            horizontal={true}
                                        />
                                    </View>

                                    <View style={{marginVertical:15}}>
                                        <Text style={{textAlign:"center"}}>
                                            Experience (in years)
                                        </Text>
                                        <View style={{
                                            marginHorizontal:10,
                                            marginTop:-15
                                        }}>
                                            <MultiSlider 
                                                isMarkersSeparated={true}
                                                values={[0,10]}
                                                sliderLength={280}
                                                enabledOne={true}
                                                enabledTwo={true}
                                                min={2}
                                                max={7}
                                                step={1}
                                                onValuesChangeStart={(e)=> console.log('1st one',e)}
                                                onValuesChangeFinish={(e)=> docExperience(e)}
                                                enableLabel={true}
                                                allowOverlap={false}
                                                minMarkerOverlapDistance={1}
                                                showSteps={true}
                                                showStepMarkers={true}
                                                showStepLabels={true}
                                                // valuePrefix='label'
                                                // valueSuffix='fuck'
                                                customMarkerLeft={(e) => {
                                                    return (<CustomSliderMarkerLeft
                                                     currentValue={e.currentValue}/>)
                                                }}
                                                customMarkerRight={(e) => {
                                                    return (<CustomSliderMarkerRight
                                                    currentValue={e.currentValue}/>)
                                                }}

                                            />
                                        </View>
                                    </View>


                                    <View style={{marginVertical:15}}>
                                        <Text style={{textAlign:'center'}}>
                                            Consultation fee (BDT)
                                        </Text>
                                        <View style={{
                                            marginHorizontal:10,
                                            marginTop:-15
                                        }}>
                                            <MultiSlider 
                                                isMarkersSeparated={true}
                                                values={[100,1000]}
                                                sliderLength={280}
                                                enabledOne={true}
                                                enabledTwo={true}
                                                min={100}
                                                max={1000}
                                                step={100}
                                                onValuesChangeStart={(e)=> console.log('1st one',e)}
                                                onValuesChangeFinish={(e)=> docChargeBdt(e)}
                                                enableLabel={true}
                                                allowOverlap={false}
                                                // minMarkerOverlapDistance={100}
                                                showSteps={true}
                                                showStepMarkers={true}
                                                showStepLabels={true}
                                                // valuePrefix='label'
                                                // valueSuffix='fuck'
                                                customMarkerLeft={(e) => {
                                                    return (<FeeSliderMarkerLeft
                                                     currentValue={e.currentValue}/>)
                                                }}
                                                customMarkerRight={(e) => {
                                                    return (<FeeSliderMarkerRight
                                                    currentValue={e.currentValue}/>)
                                                }}

                                            />
                                        </View>
                                    </View>


                                    <View style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'space-between'
                                    }}>

                                        <Text>Meet the doctor at</Text>

                                        <View>
                                            <RadioButton.Group onValueChange={newValue => setChamber(newValue)} value={chamber}>
                                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                                        <RadioButton value="clinic" />
                                                        <Text>Clinic</Text>
                                                    </View>
                                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                                        <RadioButton value="hospital" />
                                                        <Text>Hospital</Text>
                                                    </View>
                                                </View>
                                            </RadioButton.Group>
                                        </View>

                                    </View>

                                    
                                </View>

                                <View style={{
                                    flex:1,
                                    // justifyContent:'center',
                                    // alignItems:'center',
                                    marginTop:10
                                }}>
                                    <TouchableOpacity style={{
                                        backgroundColor:'#3AAD94',
                                        paddingVertical:10,
                                        paddingHorizontal:20,
                                    }}
                                    onPress={()=> saveFilter()}
                                    >
                                        <Text style={{
                                            fontSize:14,
                                            fontWeight:'bold',
                                            textAlign:'center',
                                            color:'#fff'
                                        }}>Save</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </ScrollView>
                    </Modal>
                </Portal>
            </Provider>
            {/* filter */}


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    timeSetBtnStyle:{
        paddingHorizontal:20,
        paddingVertical:7,
        backgroundColor:'#fff',
        borderWidth:.7,
        borderColor:'#3AAD94',
        borderRadius:100/2
    },
    tileTxtColor:{
        color:'#3AAD94',
        fontWeight:'bold',
        fontSize:14
    },
    item:{
        paddingHorizontal:15,
        paddingVertical:5,
        borderWidth:1,
        borderColor:'#3AAD94',
        borderRadius:100/2,
        marginHorizontal:3,
        marginVertical:10
    },
    title: {
        fontSize: 12,
        fontWeight:'bold',
    },
});
