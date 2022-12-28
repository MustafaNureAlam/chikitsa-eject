

import React, {useCallback,useState,useEffect, useRef} from 'react'
import { View, 
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    StatusBar, 
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import config from '../../../../../services/config'
import { 
    Avatar,
    Modal, 
    Portal, 
    Provider,
    RadioButton,
    Switch,
    Dialog  
} from 'react-native-paper';
import { Ionicons,FontAwesome,MaterialIcons   } from '@expo/vector-icons';
import token from '../../../../../services/local_storage/storage'
import {Calendar, CalendarList, Agenda } from 'react-native-calendars';
import userAvatar from '../../../../../assets/user_avatar.png';
import Loader from '../../../../modules/loader';
import * as patientEnd from '../../../../../services/api/patientEnd';
import RBSheet from "react-native-raw-bottom-sheet";

export default function SpecialityDocDetailsScreen({navigation, route}) {

    const isMounted = useRef(true);
    const refRBSheet = useRef();
    let todayDate = new Date().toISOString().slice(0, 10);
    // console.log('============')
    // console.log(route?.params);
    // console.log('============')

    const [doc_details, setDocDetails] = useState(route?.params);
    const [is_loading, setLoading] = useState(false);
    const [marked_date, setMarkedDate] = useState(null);
    const [appointment_date, setAppointment] = useState(null);
    const [schedule_data, setScheduledata] = useState(null);
    const [selectedId, setSelectedId] = useState(null);
    const [appoint_time, setAppointTime] = useState("");
    const [is_slot, setIsSlot] = useState(false);

    const doctor_appoint_props = {
        doctor_user_id : doc_details?.id,
        appointment_date: appointment_date,
        slot_id: selectedId,
        appointment_time : appoint_time,
        type : "doctor"
    }

    function set_selected_slot(slot_id, slot_item) {
        // console.log('set_selected_slot',slot_item.id);
        setSelectedId(slot_item.id);
        setAppointTime(slot_item.time_from);
        
    }


    ///get doctor Schedule api
    async function getDoctorSchedule(signal) {
        if(doctor_appoint_props.doctor_user_id){
            let doctor_schedule_data = await patientEnd.doctorSchedule(doctor_appoint_props, signal)
            setLoading(true);
            setScheduledata(doctor_schedule_data)
            setIsSlot(true);
            setLoading(false);
        }
    }

    // useFocusEffect(
    //     useCallback(() => {

    //         const controller_abort = new AbortController();
    //         const schedule_cancel = {signal : controller_abort.signal}
    //         setLoading(true);
    //         getDoctorSchedule(schedule_cancel);
    //         setLoading(false);
    //         return () => {
    //             controller_abort.abort();
    //             console.log('aborted schedule')
    //         }
    //     }, [appointment_date]),
    // );

    useEffect(() => {
        const controller_abort = new AbortController();
        const schedule_cancel = {signal : controller_abort.signal}
        if(isMounted) {
            setLoading(true);
            getDoctorSchedule(schedule_cancel);
            setLoading(false);
        }
        return () => {
            controller_abort.abort();
            isMounted.current = false;
        }
    }, [appointment_date])


    function select_date(day) {
        // console.log("=========")
        // console.log(day)
        // console.log("=========")
        let ssday = day.dateString;

        setMarkedDate({
            [ssday]: {selected: true, selectedColor: '#3AAD94'}
        });
        setAppointment(day.dateString);
        refRBSheet.current.open();
    }


    ///Navigate to payment screen
    function pay_proceed() {
        navigation.navigate('PaymentScreenStack',{screen: 'PaymentScreen', params: doctor_appoint_props});
        // console.log('=======api_object========',doctor_appoint_props)
    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'} />

        {
            is_loading ? (
                <Loader/>
            ) : (
                <View>

                    <ScrollView>
                        <View style={{}}>

                            <View style={{
                                backgroundColor:'#c6f5eb',
                                padding:12,
                                marginHorizontal:8,
                                marginVertical:8,
                                borderRadius:8,
                                flexDirection:'row',
                                justifyContent:'space-around',
                                alignItems:'center'
                            }}>
                               
                                <View>
                                    <Avatar.Image 
                                        size={80} 
                                        style={{backgroundColor:'#fff', borderWidth:.3,borderColor:'#70707B'}} 
                                        source={{uri : config.baseUrl + 'uploades/' + doc_details?.image}} 
                                    />
                                </View>

                                <View style={{flex:.8}}>
                                    <Text style={{
                                        fontSize:18,
                                        fontWeight:'bold',
                                    }}>{doc_details?.name}</Text>
                                    <View style={{}}>
                                        <FlatList
                                            data={doc_details?.doctors_education}
                                            renderItem={({item, index}) => (
                                                <Text style={{
                                                    fontSize:12,
                                                    fontWeight:'400',
                                                }}> {item?.deg_name} </Text>
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                            horizontal={true}
                                            ItemSeparatorComponent={() =>{return <Text>,</Text>}}
                                        />
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
                                            data={doc_details?.specializations}
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
                                            keyExtractor={(item, index)=>index.toString()}
                                            // listKey={(item, index) => 'D' + index.toString()}
                                            // ItemSeparatorComponent={() => {return<Text style={{color:'#70707B'}}> , </Text>}}
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
                                        minDate={todayDate}
                                        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                                        // maxDate={'2012-05-30'}
                                        // Handler which gets executed on day press. Default = undefined
                                        onDayPress={(day) => { 
                                            select_date(day);
                                            // console.log(day)
                                            // let ssday = day.dateString
                                            // // let date_str = new Date(ssday).toLocaleString('en-us', {weekday:'long'})
                                            // // console.log('new_date...',new Date());
                                            // setMarkedDate({
                                            //     [ssday]: {selected: true, selectedColor: '#3AAD94'}
                                            // });
                                            // setAppointment(day.dateString);
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


                        </View>
                    </ScrollView>
                </View> 
            )
        }

        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
            >
            {/* <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} /> */}
                <RBSheet
                    ref={refRBSheet}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    height={400}
                    customStyles={{
                        wrapper: {
                            backgroundColor: "transparent"
                        },
                        draggableIcon: {
                            backgroundColor: "#ccc",
                            width: 0,
                            height: 0,
                            backgroundColor: "transparent",
                            borderStyle: "solid",
                            borderLeftWidth: 15,
                            borderRightWidth: 15,
                            borderTopWidth:10,
                            borderLeftColor: "transparent",
                            borderRightColor: "transparent",
                            borderTopColor: "#70707B",
                        },
                        container:{
                            backgroundColor:'#f0f0ff'
                        }
                    }}
                    animationType='slide'
                >
                    
                    <View style={{
                        marginTop:30
                    }}>
                        {
                            schedule_data?.data[0]?.slots ? schedule_data?.data[0]?.slots?.length > 0 && (
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
                                    ListFooterComponent={
                                        <View style={{
                                            marginVertical:20,
                                            marginHorizontal:20
                                        }}>
                                            <TouchableOpacity style={{
                                                    backgroundColor:'#3AAD94',
                                                    paddingVertical:10,
                                                    paddingHorizontal:20,
                                                    borderRadius:100/2
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
                                    }
                                />
                                
                            ): (
                                <View style={{justifyContent:'center',alignItems:"center",height:'100%'}}>
                                    <Text style={{
                                        textAlign:'center',
                                        color:'#000',
                                        fontSize:18,
                                        fontWeight:'bold',
                                    }}>
                                        Sorry !
                                    </Text>

                                    <Text style={{
                                        textAlign:'center',
                                        color:'#000',
                                        fontSize:16,
                                        fontWeight:'bold',
                                    }}>
                                        No slot available right now
                                    </Text>
                                </View>
                            )
                        }
                    </View>


                </RBSheet>
            </View>
            
               
        </SafeAreaView>
    )
}

