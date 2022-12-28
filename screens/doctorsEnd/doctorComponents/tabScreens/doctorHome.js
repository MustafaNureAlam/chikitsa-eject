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
import UserAvatar from '../../../../assets/user_avatar.png';
import { Avatar } from 'react-native-paper';
import bbcBg from '../../../../assets/bbcImg.png';
import heartRate from '../../../../assets/heartRate.png';
import bloodPressure from '../../../../assets/bloodPressure.png';
import * as doctorEnd from '../../../../services/api/doctorEnd';
import * as SecureStore from 'expo-secure-store';
import {useFocusEffect} from '@react-navigation/native';
import config from '../../../../services/config'

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
import NavigationDrawerHeader from '../../../modules/navigationDrawerHeader';
import Loader from '../../../modules/loader';


export default function DoctorHomeScreen({navigation}) {

    const isMounted = useRef(true);
    const [api_data, setApidata] = useState(null);
    const [docProfile, setDocProfile] = useState(null);
    const [is_loading, setLoading] = useState(true);
    const [marked_date, setMarkedDate] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
   

    //////// Refresh dashboard
    const onRefresh = useCallback(() => {


        setRefreshing(true);
        setLoading(true);
        getDoctorEndAppointment();
        getDoctorProfileData();
        setLoading(false);
        setRefreshing(false);

        // console.log('=====onRefresh=======')
        // console.log(api_data)
        // console.log('=====onRefresh=======')

        return() => {
            isMounted.current = false;
        }
    }, []);

    ///////////api call when renders
    useFocusEffect(
        useCallback(() => {
            
            if(isMounted) {
                setLoading(true);
                getDoctorEndAppointment();
                getDoctorProfileData();
                setLoading(false);
            }
            const onBackPress = () => {
                Alert.alert("EXIT!", "Are you sure you want to exit app?", [
                    {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                    },
                    { text: "YES", onPress: () => BackHandler.exitApp() }
                ]);
                // Return true to stop default back navigaton
                // Return false to keep default back navigaton
                return true;
            };
        
            // Add Event Listener for hardwareBackPress
            BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );
        
            return () => {
                // Once the Screen gets blur Remove Event Listener
                BackHandler.removeEventListener(
                'hardwareBackPress',
                onBackPress
                );

                isMounted.current = false;
            };
        }, []),
    );

    useEffect(() => {
        setLoading(true);
        getDoctorEndAppointment();
        getDoctorProfileData();
        setLoading(false);
        return () => {
            isMounted.current = false;
        }
    }, []);


    async function CreateRoom(item){
        // console.log("Create Room");
        let createRoom = await doctorEnd.createRoom(item.id);
        console.log("-----------------lsls")
        console.log(createRoom)
        console.log("-----------------s")
        let patient_data = {
            patient_user_id: item.patient_user_id,
        }
        navigation.navigate('DoctorVideoScreen', { createRoom, api_data, patient_data });
    }


    async function getDoctorEndAppointment() {
        let doctor_appoint_data = await doctorEnd.getDoctorEndAppointmentData();

        let appoint_array = []
        doctor_appoint_data.data.map((dat)  => {
            appoint_array.push(dat.appointment_date)
        })
        var obj = {};
        
        for(let i=0;i<appoint_array.length;i++){
            Object.assign(obj, {[appoint_array[i]]: {selected: true, marked: true, selectedColor: '#3AAD94'}})
        }

        if(isMounted) {

            setMarkedDate(obj)
            setApidata(doctor_appoint_data);
            // setLoading(false);
        }
        // console.log('getDoctorEndAppointmentData',doctor_appoint_data);
    }

    async function getDoctorProfileData() {
        let doctor_profile = await doctorEnd.getDoctorProfile();
        if(isMounted) {

            setDocProfile(doctor_profile);
            // setLoading(false);
        }
        
        // console.log('getDoctorEndProfile',doctor_profile);
    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'} />

            {
                is_loading ? (
                    <Loader/>
                ) : (
                    
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            />
                        }
                    >
                        
                        <View style={{flex:1}}>
                            
                            <View 
                                style={{
                                    flex:1,
                                    justifyContent:'center', 
                                    alignItems:'center',
                                    backgroundColor:'#3AAD94',
                                    borderBottomEndRadius:100/2,
                                    borderBottomStartRadius:100/2,
                                    height:160
                                }}
                            >
                                
                                <View style={{
                                    height:300,
                                    width:300,
                                    backgroundColor:'#fff',
                                    opacity:.1,
                                    position:'absolute',
                                    left:-120,
                                    top:60,
                                    borderRadius:300/2,
                                    zIndex:-1
                                }}>
                                    
                                </View>
                                
                                <View style={{
                                    position:'absolute',
                                    top:40, 
                                    flexDirection:'row',
                                    flex:1,
                                    justifyContent:'space-between',
                                    width:'100%',
                                    paddingHorizontal:20
                                    }}>
                                    <View style={{
                                        flex:.7
                                    }}>
                                        <NavigationDrawerHeader navigationProps={navigation}/>
                                    </View>
                                    <View style={{
                                        flex:.3,
                                        flexDirection:'row',
                                        justifyContent:'space-around'
                                    }}>
                                        {/* <TouchableOpacity style={{marginHorizontal:3}}>
                                            <MaterialIcons name="notification-important" size={22} color={'#fff'} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{marginHorizontal:3}}>
                                            <Feather  name="inbox" size={20} color={'#fff'} />
                                        </TouchableOpacity> */}
                                    </View>
                                </View>
                                
                                <View style={{marginVertical:7}}>
                                    <Avatar.Image 
                                        style={{
                                            backgroundColor:'#fff',
                                            borderWidth:.5,
                                            borderColor:'#70707B'
                                        }} 
                                        size={40} 
                                        source={{uri: config.baseUrl + 'uploades/' +  docProfile?.data?.user_pic}} 
                                    />
                                </View>
                                
                                <Text style={{
                                    fontSize:18,
                                    fontWeight:'bold',
                                    color:'#fff',
                                    marginVertical:3
                                }}>{docProfile?.data?.name}</Text>
                                <Text style={{
                                    fontSize:13,
                                    color:'#fff',
                                    fontWeight:'400'
                                }}>Welcome to Chikitsha</Text>

                            </View>

                            {/* <Text style={{
                                fontSize: 16,
                                color: '#090F47',
                                marginHorizontal: 20,
                                marginVertical: 15,
                                fontWeight:'bold'
                            }}>Clinic List</Text>

                            <FlatList 
                                data={[
                                    { clintName: 'Ibn Sina', key: '1' },
                                    { clintName: 'Ibn Sina', key: '2' }
                                ]}
                                renderItem={({ item }) => (
                                    
                                    <View style={{ flex:1,
                                        backgroundColor: '#D9FFF0', 
                                        marginHorizontal:20,
                                        }}>
                                        <TouchableOpacity style={{ 
                                            paddingVertical: 20, 
                                            flex: 1, 
                                            flexDirection:'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            paddingHorizontal:15
                                            }}>
                                            <Text style={{ 
                                                color: "#3AAD94",
                                                fontWeight: "bold",
                                                fontSize: 14,
                                                }}>
                                                {item.clintName}
                                            </Text>
                                        </TouchableOpacity>
                                        <View style={{
                                            borderWidth: .3, 
                                            borderColor: '#DEDFE0'
                                            }}>
                                        </View>
                                    </View>
                                )}
                                numColumns={1}
                                keyExtractor={(item, index) => index.toString()}
                            /> */}

                            <Text style={{
                                fontSize: 18,
                                color: '#090F47',
                                marginHorizontal: 20,
                                marginVertical: 15,
                                fontWeight:'bold'
                            }}>Ongoing Appointment List</Text>

                            <FlatList 
                                data={api_data?.data}
                                renderItem={({ item, index }) => (
                                    
                                    <View 
                                        style={{ 
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
                                            onPress={ () => { CreateRoom(item) } }    
                                        >
                                            <View style={{flex:.9,paddingRight:8}}>
                                                <Text 
                                                    style={{ 
                                                        color: "#3AAD94",
                                                        fontWeight: "bold",
                                                        fontSize: 16,
                                                        flex:.3
                                                    }}
                                                >
                                                    {item?.patient_info?.name.toUpperCase()}
                                                </Text>

                                                <Text style={{ 
                                                        color: "#3AAD94",
                                                        flex:.2,
                                                        fontSize:14,
                                                        fontWeight:'bold'
                                                    }}
                                                >
                                                    Gender : {item?.patient_info?.gender}
                                                </Text>

                                                <Text style={{ 
                                                        color: "#3AAD94",
                                                        flex:.3,
                                                        fontSize:14,
                                                        fontStyle:'italic',
                                                        fontWeight:'bold'
                                                    }}
                                                >
                                                   Date : {item?.appointment_date}
                                                </Text>
                                                
                                            </View>

                                            <View style={{flex:.1}}>
                                                <Ionicons 
                                                    style={{
                                                        flex:.2
                                                    }} 
                                                    name="videocam-outline" 
                                                    size={24} 
                                                    color="#3AAD94" 
                                                />
                                            </View>
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

                            {/* <View style={{
                                flex:1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginHorizontal: 12,
                            }}>
                                <Text style={{
                                    fontSize: 16,
                                    color: '#090F47',
                                    marginVertical: 15,
                                    fontWeight:'bold'
                                }}>Patient EHR</Text>
                                <TouchableOpacity>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: '#3AAD94'
                                        }}>+ </Text>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: 'bold',
                                            color: '#3AAD94'
                                        }}>Create</Text>
                                    </View>
                                </TouchableOpacity>
                            </View> */}

                            {/* <View style={{
                                marginHorizontal: 12,
                                backgroundColor: '#F5F5F5',
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                                borderRadius: 15,
                                marginBottom: 10
                            }}>
                                <TouchableOpacity>
                                    <Text style={{
                                        fontSize: 14,
                                        fontWeight: 'bold',
                                        color: '#3AAD94',
                                        textAlign: 'right',
                                        marginHorizontal: 15
                                    }}>Edit</Text>
                                </TouchableOpacity>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginHorizontal: 15,
                                    marginBottom: 10
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        
                                        <Avatar.Image size={50} source={UserAvatar} />
                                        <Text style={{
                                            fontSize: 16,
                                            color: '#646D82',
                                            marginLeft: 20
                                        }}>Ingredia Nutrisha</Text>
                                    </View>
                                    <Text style={{
                                        fontSize: 16,
                                        color: '#A6B1C2',
                                        marginVertical: 15
                                    }}>05 Min</Text>
                                </View>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#040E28',
                                    marginHorizontal: 15,
                                    marginBottom: 10
                                }}>Symptoms</Text>
                                <Text style={{
                                    fontSize: 14,
                                    color: '#A6B1C2',
                                    marginHorizontal: 15,
                                    marginBottom: 20
                                }}>A small river named Duden flows by their place and supplies it with the necessary regelialia is a paradisematic country, in which roasted parts of sentences fly into your mouth.Even the all-powerful Pointing has no control about the …</Text>
                                
                                <FlatList 
                                    data={[
                                        { img: heartRate, testName: 'Heart Rate', testCondition: 'Above the Norn', testResult: '112', resultType: 'Beats per Min', backgroundColor: '#FFF4F6', key: '1' },
                                        { img: bloodPressure, testName: 'Blood Pressure', testCondition: 'In the Norm', testResult: '120/89', resultType: 'mm/Hg', backgroundColor: '#FFFBF0', key: '2' }
                                    ]}
                                    renderItem={({ item }) => (
                                        <View style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            marginHorizontal: 5,
                                            backgroundColor: item.backgroundColor,
                                            borderRadius: 12,
                                            marginBottom: 10,
                                            overflow: 'hidden',
                                            paddingHorizontal: 15,
                                            paddingVertical: 20
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start',
                                                marginBottom: 20
                                            }}>
                                                <View style={{
                                                    marginRight: 40
                                                }}>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        color: '#646D82',
                                                        textTransform: 'uppercase'
                                                    }}>{item.testName}</Text>
                                                    <Text style={{
                                                        fontSize: 10,
                                                        color: '#4B4A4A',
                                                    }}>{item.testCondition}</Text>
                                                </View>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'flex-end'
                                                }}>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        color: '#4B4A4A',
                                                        marginRight: 10
                                                    }}>{item.testResult}</Text>
                                                    <Text style={{
                                                        fontSize: 10,
                                                        color: '#4B4A4A',
                                                    }}>{item.resultType}</Text>
                                                </View>
                                            </View>
                                            <Image source={item.img} />
                                        </View>
                                    )}
                                    // numColumns={3}
                                    horizontal={true}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View> */}

                            {/* <View style={{
                                marginHorizontal:15
                            }}>
                                <FlatList 
                                    showsHorizontalScrollIndicator={false}
                                    data={[
                                        { img: bbcBg, newsTitle: 'News Headline', newsContent: 'Lorem Ipsum Dolor\nLorem Lorem',  margin: 24, key: '1' },
                                        { img: bbcBg, newsTitle: 'News Headline', newsContent: 'Lorem Ipsum Dolor\nLorem Lorem', key: '2' }
                                    ]}
                                    renderItem={({ item }) => (
                                        <View style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                            marginHorizontal: 5,
                                            backgroundColor: '#DDF5F9',
                                            borderRadius: 12,
                                            marginBottom: 10,
                                            overflow: 'hidden'
                                        }}>
                                            <View style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                marginHorizontal: 10,
                                            }}>
                                                <Text style={{ 
                                                    color: '#567277',
                                                    fontSize: 12
                                                }}>
                                                        {item.newsTitle}
                                                </Text>
                                                <Text style={{ 
                                                    color: '#567277',
                                                    fontSize: 12
                                                }}>
                                                        {item.newsContent}
                                                </Text>
                                            </View>
                                            <Image size={50} source={item.img} style={{marginVertical: 0}} />
                                        </View>
                                    )}
                                    // numColumns={3}
                                    horizontal={true}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View> */}

                            <View style={{
                                flex:1,
                                marginVertical:8,
                                backgroundColor:'#D9FFF0',
                            }}>
                                <Text style={{
                                    marginTop:10,
                                    marginHorizontal:20,
                                    fontWeight:'bold',
                                    fontSize:18,
                                    paddingHorizontal:10,
                                    textAlign:'center',
                                    color:'#000'
                                }}>Upcoming appointments</Text>
                                
                                <Calendar
                                    // Initially visible month. Default = now
                                    // current={'2021-12-26'}
                                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                                    // minDate={'2012-05-10'}
                                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                                    // maxDate={'2012-05-30'}
                                    // Handler which gets executed on day press. Default = undefined
                                    onDayPress={(day) => {console.log('selected day', day)}}
                                    // Handler which gets executed on day long press. Default = undefined

                                    markedDates={
                                        marked_date
                                    } 
                                    
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
                            
                            <View style={{
                                backgroundColor:'#3AAD94',
                                borderTopLeftRadius:100/2,
                                borderTopRightRadius:100/2,
                                flex:1,
                                // flexDirection:'row',
                                alignItems:'center',
                                // justifyContent:'space-around',
                                padding:20
                            }}>
                                <Text style={{
                                    color:'#fff',
                                    fontSize:18,
                                    fontWeight:'bold',
                                    padding:5
                                    }}>Appointment schedule
                                </Text>
                                
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    data={api_data?.data}
                                    renderItem={({item, index}) => (

                                        <View style={{
                                            backgroundColor:'#B9DBC8',
                                            flex:.6,
                                            // padding:10,
                                            borderRadius:5,
                                            marginHorizontal:5,
                                            minWidth:200,
                                            marginTop:5
                                        }}>
                                            <TouchableOpacity
                                                onPress={()=> {
                                                    joinRoom(item)
                                                }}
                                            >
                                                <View>
                                                    
                                                    {/* <View style={{
                                                        flexDirection:'row',
                                                        justifyContent:'space-between',
                                                        alignItems:'center',
                                                        backgroundColor:'#a7c4b4',
                                                        borderTopLeftRadius:5,
                                                        borderTopRightRadius:5,
                                                        paddingVertical:3,
                                                        paddingHorizontal:10
                                                    }}>
                                                        <Fontisto name="person" size={18} color="#3AAD94" />
                                                        <Text style={{
                                                            color:'#1C6353',
                                                            fontSize:18,
                                                            // marginHorizontal:5
                                                        }}>
                                                            Patient
                                                        </Text>
                                                    </View> */}

                                                    <View style={{
                                                        padding:10
                                                    }}>
                                                        <Text style={{
                                                            color:'#1C6353',
                                                            fontWeight:'bold',
                                                            marginVertical:5,
                                                            fontSize:16
                                                            }}>{item?.patient_info?.name}
                                                        </Text>
                                                        
                                                        <Text style={{
                                                            color:'#1C6353',
                                                            fontSize:13,
                                                            fontWeight:'bold'
                                                            }}>Date : {item?.appointment_date}
                                                        </Text>
                                                        
                                                        <Text style={{
                                                            color:'#1C6353',
                                                            marginTop:5,
                                                            fontSize:13,
                                                            fontWeight:'bold'
                                                            }}>Time : {item?.appointment_time}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal={true}
                                />
                            </View>

                            

                        </View>
                    </ScrollView>
                )
            }
            
            
        </SafeAreaView>
    )
}
