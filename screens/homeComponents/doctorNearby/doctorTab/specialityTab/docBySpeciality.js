
import React, { useState, useEffect, useCallback } from 'react'
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

import userAvatar from '../../../../../assets/user_avatar.png';
import { Ionicons,FontAwesome,MaterialIcons,MaterialCommunityIcons   } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Calendar, CalendarList, Agenda } from 'react-native-calendars';
import * as patientEnd from '../../../../../services/api/patientEnd';
import Loader from '../../../../modules/loader';
import {useFocusEffect} from '@react-navigation/native';
import config from '../../../../../services/config';


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

export default function DocBySpecialityScreen({navigation, route}) {

    // console.log('route_params', route.params)

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

    const [video, setVideo] = useState(false);

    const onToggleSwitch = () => setVideo(!video);

    ///book appointment

    const [bookModal, setBookModal] = useState(false);
    const [dr_modal_data, setDrModaldata] = useState(null);

    const [appointment_date, setAppointment] = useState(null);
    const [marked_date, setMarkedDate] = useState(null);

    const [schedule_data, setScheduledata] = useState(null);
    const [slot_time_array, setSlotarray] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    // console.log('dr_details_modal.........',dr_modal_data)

    function showBookModal(obj) {

        // console.log('======================itelfwsv', obj);
        
        setBookModal(true)
        
        let dr_details = {
            id: obj.id,
            dr_name : obj.name,
            dr_deg : obj.degrees
        }
        // console.log('modal_params', dr_details);
        setDrModaldata(dr_details)
    };
    const hideBookModal = () => setBookModal(false);
    const bookcontainerStyle = {backgroundColor: 'white', paddingVertical: 10};

    const [api_data, setApidata] = useState(null);
    const [is_loading, setLoading] = useState(true);
    const [appoint_time, setAppointTime] = useState("");
    // console.log('api_data...........................................');
    // console.log('==========',api_data?.data);
    // console.log('api_data.........................................');

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
    }

    // console.log('doctor_appoint_props=========', doctor_appoint_props)

    function getAppointTime(e) {
        console.log('value',e);
    }

    function saveFilter() {
        console.log('data_obj',doctor_filter_props);
    }

    useFocusEffect(
        useCallback(() => {

            const abortControl = new AbortController();
            const signal_cancel = {signal : abortControl.signal}
            setLoading(true);
            doctorByspeciality(signal_cancel);
            setLoading(false);
            return() => {
                abortControl.abort();
                console.log('clen doctorByspeciality')
            }
        }, []),
    );

    useFocusEffect(
        useCallback(() => {

            const schedule_cancel = new AbortController();
            const schedule_signal = { signal : schedule_cancel.signal}
            getDoctorSchedule(schedule_signal);
            return () => {
                schedule_cancel.abort();
                console.log('clen docSchedule')
            }
        }, [appointment_date]),
    );

    // useEffect(() => {
    //     doctorByspeciality()
    //     // return () => {
    //     //     setApidata(null);
    //     // }
    // }, [])

    // useEffect(() => {
    //     const schedule_cancel = new AbortController();
    //     const schedule_signal = { signal : schedule_cancel.signal}
    //     getDoctorSchedule(schedule_signal);
    //     return () => {
    //         schedule_cancel.abort();
    //         console.log('clen docSchedule')
    //     }
    // }, [appointment_date])

    async function doctorByspeciality(signal) {
        let doctors_by_speciality = await patientEnd.getDoctorBySpeciality(concernId, signal)
        console.log('=======doctors_by_speciality======',doctors_by_speciality);
        setApidata(doctors_by_speciality)
        // setLoading(false);

    }

    async function getDoctorSchedule(signal) {
        if(doctor_appoint_props.doctor_user_id){
            let doctor_schedule_data = await patientEnd.doctorSchedule(doctor_appoint_props, signal)
            setLoading(true);
            setScheduledata(doctor_schedule_data)
            setLoading(false);    
        }
    }

    function set_selected_slot(slot_id, slot_item) {
        console.log('set_selected_slot',slot_item.id);
        setSelectedId(slot_item.id);
        setAppointTime(slot_item.time_from);
        
    }


    ///Navigate to payment screen
    function pay_proceed() {
        setBookModal(false);
        navigation.navigate('PaymentScreenStack',{screen: 'PaymentScreen', params: doctor_appoint_props});
        // console.log('api_object',doctor_appoint_props)
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
        console.log('docExperience',experience);
        setDocexp(experience);
    }
    function docChargeBdt(rate) {
        console.log('docrate',rate);
        setDocCharge(rate);
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
                            api_data?.data ? api_data?.data.length > 0 && (
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
                                                            navigation.navigate('SpecialityDocDetailsScreen', item)  
                                                            // showBookModal(item)
                                                        }}
                                                        style={{
                                                            borderRadius:10,
                                                            marginHorizontal:20,
                                                            marginVertical:7,
                                                            flexDirection:'row',
                                                            justifyContent:'space-between',
                                                            backgroundColor:'#c6f5eb',
                                                            paddingHorizontal:10
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
                                                            // backgroundColor:'#fff',
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
                                                                                // color:'#000',
                                                                                fontSize:12,
                                                                                fontWeight:'400',
                                                                                // paddingVertical:5,
                                                                            }}>{item?.deg_name.toUpperCase()}</Text>
                                                                            </View>
                                                                        )}
                                                                        // keyExtractor={(item, index_deg)=>index_deg.toString()}
                                                                        // key={0}
                                                                        listKey={(item, index) => 'A' + index.toString()}
                                                                    />
                                    
                                                                    {/* <Text style={{
                                                                        padding:5,
                                                                        fontWeight:'400',
                                                                        fontSize:14
                                                                    }}>MBBS, MS - ENT</Text> */}
                                    
                                                                    {/* <TouchableOpacity
                                                                        style={{
                                                                            backgroundColor:'#3AAD94',
                                                                            padding:5,
                                                                            borderRadius:5,
                                                                            marginVertical:5
                                                                        }}
                                                                        // onPress={()=>showBookModal(item)}
                                                                    >
                                                                        <Text style={{
                                                                            color:'#fff',
                                                                            fontSize:14,
                                                                            fontWeight:'bold',
                                                                        }}>Book Appointment</Text>
                                                                    </TouchableOpacity> */}
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

            {/* bookModal */}

            <Provider>
                <Portal>
                    <Modal visible={bookModal} onDismiss={hideBookModal} contentContainerStyle={bookcontainerStyle} >
                        <View style={{alignItems:'flex-end'}}>
                            <TouchableOpacity style={{
                                padding:5,
                                marginHorizontal:5
                            }}
                                onPress={hideBookModal}
                            >
                                <MaterialIcons name="cancel" size={24} color="red" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            <View style={{flex:1}}>

                                <View style={{
                                    justifyContent:'center',
                                    alignItems:'center',
                                    backgroundColor:'#9CF3E1',
                                    padding:20,
                                    marginHorizontal:20,
                                    marginVertical:10,
                                    borderRadius:10
                                }}>
                                    <Avatar.Image size={45} source={userAvatar} />
                                    <View style={{alignItems:'center',marginTop:10}}>
                                        <Text style={{
                                            fontSize:18,
                                            fontWeight:'bold'
                                        }}>{dr_modal_data?.dr_name}</Text>
                                        {/* <Text style={{
                                            fontSize:16,
                                            fontWeight:'bold'
                                        }}>(18 years)</Text> */}
                                        <View style={{height:50}}>
                                            <FlatList
                                                data={dr_modal_data?.dr_deg}
                                                renderItem={({item, dr_index}) => (
                                                    <Text style={{
                                                        fontSize:12,
                                                        fontWeight:'400'
                                                    }}> {item.degree_name} </Text>
                                                )}
                                                keyExtractor={(item, dr_index) => dr_index.toString()}
                                            />
                                        </View>
                                        
                                    </View>
                                </View>

                                <View style={{
                                    // alignItems:'center',
                                    // justifyContent:'center'
                                    padding:10
                                }}>
                                    <Text style={{
                                        fontSize:16,
                                        fontWeight:'bold',
                                        textAlign:'center',
                                        padding:5
                                    }}>Select preferred date & time</Text>

                                    <View style={{
                                        // flex:1,
                                        // marginVertical:30,
                                        backgroundColor:'#D9FFF0',
                                    }}>
                                        <Calendar
                                            // Initially visible month. Default = now
                                            // current={'2021-12-26'}
                                            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                                            // minDate={'2012-05-10'}
                                            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                                            // maxDate={'2012-05-30'}
                                            // Handler which gets executed on day press. Default = undefined
                                            onDayPress={(day) => { 
                                                // console.log(day)
                                                let ssday = day.dateString
                                                // let date_str = new Date(ssday).toLocaleString('en-us', {weekday:'long'})
                                                // console.log('new_date...',new Date());
                                                setMarkedDate({
                                                    [ssday]: {selected: true, selectedColor: '#3AAD94'}
                                                });
                                                setAppointment(day.dateString);
                                            }}

                                            markedDates={
                                                marked_date
                                            }                                            
                                            // Handler which gets executed on day long press. Default = undefined
                                            onDayLongPress={(day) => {console.log('selected day', day)}}
                                            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                                            monthFormat={'yyyy MM'}
                                            // Handler which gets executed when visible month changes in calendar. Default = undefined
                                            onMonthChange={(month) => {console.log('month changed', month)}}
                                            // Hide month navigation arrows. Default = false
                                            hideArrows={false}
                                            // Replace default arrows with custom ones (direction can be 'left' or 'right')
                                            renderArrow={(direction) => { if(direction == 'left') {
                                                    return(
                                                        <Ionicons name='arrow-back' color={'#ccc'} size={22} />
                                                    )
                                                    } else if(direction == 'right') {
                                                    return(
                                                            <Ionicons name='arrow-forward' color={'#ccc'} size={22} />
                                                        )
                                                    }}
                                            }
                                            // Do not show days of other months in month page. Default = false
                                            hideExtraDays={true}
                                            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
                                            // day from another month that is visible in calendar page. Default = false
                                            disableMonthChange={true}
                                            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
                                            firstDay={1}
                                            // Hide day names. Default = false
                                            hideDayNames={false}
                                            // Show week numbers to the left. Default = false
                                            showWeekNumbers={false}
                                            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                                            onPressArrowLeft={subtractMonth => subtractMonth()}
                                            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                                            onPressArrowRight={addMonth => addMonth()}
                                            // Disable left arrow. Default = false
                                            disableArrowLeft={false}
                                            // Disable right arrow. Default = false
                                            disableArrowRight={false}
                                            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
                                            disableAllTouchEventsForDisabledDays={true}
                                            // Replace default month and year title with custom one. the function receive a date as parameter
                                            renderHeader={(date) => {return(<Text style={{fontSize:20,fontWeight:'bold',color:'#3AAD94'}}>{date.toDateString()}</Text>)}}
                                            // Enable the option to swipe between months. Default = false
                                            enableSwipeMonths={true}
                                            style={{}}
                                            theme={{
                                                // backgroundColor:'#fff',
                                                calendarBackground: '#D9FFF0',

                                            }}
                                            
                                            
                                        />
                                    </View>
                                </View>

                                {
                                    schedule_data?.data[0]?.slots?.length > 0 ? (
                                        <FlatList
                                            data={schedule_data?.data[0]?.slots}
                                            renderItem={({item, index}) => (
                                                <View>
                                                    
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            // console.log(item)
                                                            set_selected_slot(index, item)
                                                        }}
                                                        style={{
                                                            backgroundColor:selectedId === item.id ? '#3AAD94' : '#fff',
                                                            marginHorizontal:15,
                                                            borderRadius:10,
                                                            marginVertical:7,
                                                            borderWidth:.3,
                                                            borderColor:'#70707B'
                                                        }}
                                                    >
                                                        <View style={{
                                                            backgroundColor:'#3AAD94',
                                                            borderTopLeftRadius:10,
                                                            borderTopRightRadius:10,
                                                            flexDirection:'row',
                                                            justifyContent:'space-between',
                                                            alignItems:'center',
                                                            paddingHorizontal:10,
                                                            paddingVertical:7
                                                        }}>
                                                            <Text style={{
                                                                    color:'#fff',
                                                                    fontSize:16,
                                                                    textAlign:'left',
                                                                    // paddingVertical:5,
                                                                    // paddingHorizontal:15,
                                                                    fontWeight:'bold'
                                                                }}>Doctor's slot {index + 1}
                                                            </Text>

                                                            {
                                                                selectedId === item.id && (
                                                                    <Text>
                                                                        <FontAwesome 
                                                                            name="check" 
                                                                            size={24} 
                                                                            color="#fff"
                                                                        />
                                                                    </Text>
                                                                )   
                                                            }
                                                            
                                                        </View>

                                                        <View style={{
                                                            paddingHorizontal:10,
                                                            paddingVertical:5,
                                                            justifyContent:'center',
                                                            alignItems:'center'
                                                        }}>
                                                            <Text 
                                                                style={{
                                                                    fontSize:14,
                                                                    fontWeight:'700',
                                                                    color: selectedId === item.id ? '#fff' : '#000',
                                                                    // textAlign:'center'
                                                                }}>
                                                                Slot name : {item?.slot_name}
                                                            </Text>
                                                            
                                                            <Text 
                                                                style={{
                                                                    fontSize:14,
                                                                    fontWeight:'700',
                                                                    color: selectedId === item.id ? '#fff' : '#000',
                                                                    // textAlign:'center'
                                                                }}>
                                                                Price : {item?.price}
                                                            </Text>
                                                        </View>

                                                        <View style={{
                                                            flexDirection:'row',
                                                            justifyContent:'space-around',
                                                            // alignItems:'center',
                                                            marginHorizontal:10,
                                                            marginVertical:10
                                                        }}>
                                                            <View style={{
                                                                backgroundColor:'#fff',
                                                                padding:10,
                                                                borderRadius:10,
                                                                elevation:3
                                                            }}>
                                                                <Text style={{
                                                                    fontSize:14,
                                                                    fontWeight:'bold',
                                                                    color:'#3AAD94',
                                                                    textAlign:'center'
                                                                }}>From</Text>
                                                                <Text style={{
                                                                    fontSize:12,
                                                                    fontWeight:'400',
                                                                    textAlign:'center',
                                                                    color:'#000'
                                                                }}>{item?.time_from}</Text>
                                                                
                                                            </View>
                                                            <View>
                                                                <Text>
                                                                    <FontAwesome 
                                                                        name="minus" 
                                                                        size={24} 
                                                                        color= {selectedId === item.id ? '#fff' : '#3AAD94'} 
                                                                    />
                                                                </Text>
                                                            </View>
                                                            <View style={{
                                                                backgroundColor:'#fff',
                                                                padding:10,
                                                                borderRadius:10,
                                                                elevation:3
                                                            }}>
                                                                <Text style={{
                                                                    fontSize:14,
                                                                    fontWeight:'bold',
                                                                    color:'#3AAD94',
                                                                    textAlign:'center'
                                                                }}>To</Text>
                                                                <Text style={{
                                                                    fontSize:12,
                                                                    fontWeight:'400',
                                                                    textAlign:'center',
                                                                    color:'#000'
                                                                }}>{item?.time_to}</Text>
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                                
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                            extraData={selectedId}
                                        />
                                        
                                    ): (
                                        null
                                    )
                                }


                                

                                <View>
                                    <TouchableOpacity style={{
                                            backgroundColor:'#3AAD94',
                                            paddingVertical:10,
                                            paddingHorizontal:20
                                        }}
                                        onPress={() => pay_proceed()}
                                    >
                                        <Text style={{
                                            fontSize:14,
                                            fontWeight:'bold',
                                            padding:3,
                                            textAlign:'center',
                                            color:'#fff'
                                        }}>
                                            Proceed to payment
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </ScrollView>
                    </Modal>
                </Portal>
            </Provider>

            {/* bookModal */}

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
