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
import UserAvatar from '../../../../assets/user_avatar.png';
import { Avatar } from 'react-native-paper';
import bbcBg from '../../../../assets/bbcImg.png';
// import heartRate from '../../assets/heartRate.png';
// import bloodPressure from '../../assets/bloodPressure.png';
import doctorProfile from '../../../../assets/doctorProfile.png';
import badge from '../../../../assets/badge.png';
import badgeIcon from '../../../../assets/badgeIcon.png';
import uplodIcon from '../../../../assets/uplodIcon.png';
import phoneIcon from '../../../../assets/phoneIcon.png';
import messageIcon from '../../../../assets/messageIcon.png';
import NavigationDrawerHeader from '../../../modules/navigationDrawerHeader';
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

export default function NurseHomeScreen({navigation, route}) {
    
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
        getNurseEndAppointment();
        getNurseProfileData();
        setLoading(false);
        setRefreshing(false);

        return () => {
            isMounted.current = false;
        }
    }, []);

    async function getNurseProfileData() {
        if(isMounted){
            let nurse_profile = await nurseEnd.getNurseProfile();
            setDocProfile(nurse_profile);
        }
        
        // console.log('nurseEndProfile');
        // console.log(nurse_profile);
        // console.log('nurseEndProfile');
    }

    async function CreateRoom(item){
        // console.log("Create Room");
        if(isMounted) {
            let createRoom = await nurseEnd.createRoom(item.id);
            console.log(createRoom);
            navigation.navigate('NurseVideoScreen', createRoom)
        }
    }


    async function getNurseEndAppointment() {
        let nurse_appoint_data = await nurseEnd.getNurseEndAppointmentData();
        
        let appoint_array = []
        nurse_appoint_data.data.map((dat)  => {
            appoint_array.push(dat.appointment_date)
        })
        // console.log("k")
        var obj = {};
        
        for(let i=0;i<appoint_array.length;i++){
            Object.assign(obj, {[appoint_array[i]]: {selected: true, marked: true, selectedColor: '#3AAD94'}})
        }

        setMarkedDate(obj)
        // console.log("=========")
        // console.log(nurse_appoint_data)
        // console.log("=========x")
        setApidata(nurse_appoint_data);
        setLoading(false);
    }

    ///////////api call when renders
    useFocusEffect(
        useCallback(() => {

            setLoading(true);
            getNurseEndAppointment();
            getNurseProfileData();
            setLoading(false);
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

    // useEffect(() => {
    //     // setLoading(true);
    //     getNurseEndAppointment();
    //     getNurseProfileData();
    //     setLoading(false);
    //     // return () => {
    //     //     cleanup
    //     // }
    // }, []);


    

    

    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
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
                            <View style={{
                                flex:1,
                                justifyContent:'center', 
                                alignItems:'center',
                                backgroundColor:'#3AAD94',
                                borderBottomEndRadius:100/2,
                                borderBottomStartRadius:100/2,
                                height:160
                                }}>
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
                                        justifyContent:'flex-end'
                                    }}>
                                        {/* <TouchableOpacity style={{marginHorizontal:3}}>
                                            <MaterialIcons name="notification-important" size={22} color={'#fff'} />
                                        </TouchableOpacity> */}
                                        {/* <TouchableOpacity style={{marginHorizontal:3}}>
                                            <Feather  name="inbox" size={20} color={'#fff'} />
                                        </TouchableOpacity> */}
                                    </View>
                                </View>
                                <View style={{}}>
                                    <Avatar.Image 
                                        style={{
                                            backgroundColor:'#fff',
                                            borderWidth:.5,
                                            borderColor:'#70707B'
                                        }} size={40} source={{uri: config.baseUrl + 'uploades/' + docProfile?.data?.user_pic}} />
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

                            <View style={{flex:1}}>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#090F47',
                                    marginHorizontal: 12,
                                    marginVertical: 12,
                                    fontWeight:'bold'
                                }}>Appointment List</Text>

                                {
                                     api_data?.data.length > 0 ? (

                                        <View style={{flex:1}}>
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
                                                                >{item?.patient_info.name?.toUpperCase()}
                                                                </Text>

                                                                <Text style={{ 
                                                                        color: "#3AAD94",
                                                                        flex:.2,
                                                                        fontSize:14,
                                                                        fontWeight:'bold'
                                                                    }}
                                                                >
                                                                    Birthday : {item.patient_info.dob ? item.patient_info.dob : 'N/A'}
                                                                </Text>

                                                                <Text style={{ 
                                                                        color: "#3AAD94",
                                                                        flex:.2,
                                                                        fontSize:14,
                                                                        fontWeight:'bold'
                                                                    }}
                                                                >
                                                                    Gender : {item.patient_info.gender}
                                                                </Text>

                                                               
                                                                
                                                            </View>
                                                            <Entypo name="chevron-right" size={22} color="#3AAD94" />
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
                                            />
                                        </View>
                                    ) : (
                                        <View>
                                            <Text style={{
                                                fontSize:16,
                                                textAlign:'center',
                                                padding:5
                                            }}>No Appointment Available</Text>
                                        </View>
                                    )
                                }
                            </View>


                            {/* <View style={{flex:1, marginHorizontal: 24, marginBottom: 30}}>
                                
                                <Text style={{
                                    fontSize: 16,
                                    color: '#090F47',
                                    marginVertical: 15
                                }}>My patient records & history</Text>

                                <FlatList 
                                    data={[
                                        { img: doctorProfile, name: 'Kudrat e Khuda', bloodAndAge: 'B+ ve 18 years', gender: 'Male', degree: 'MBBS, MS - ENT', badge: badge, key: '1' },
                                        { img: doctorProfile, name: 'Kudrat e Khuda', bloodAndAge: 'B+ ve 18 years', gender: 'Male', degree: 'MBBS, MS - ENT', badge: badge, key: '2' }
                                    ]}
                                    renderItem={({ item }) => (
                                        
                                        <View style={{ flex:1,
                                            flexDirection: 'row',
                                            paddingVertical: 5,
                                            marginBottom: 5,
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            backgroundColor: '#EDF8F5',
                                            padding: 10,
                                            borderRadius: 15
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center'
                                            }}>
                                                <View style={{
                                                    alignItems: 'center'
                                                }}>
                                                    <Image source={item.img} />
                                                    <Text style={{
                                                        color: '#091C3F',
                                                        fontWeight: 'bold',
                                                        fontSize: 12
                                                    }}>Status</Text>
                                                    <TouchableOpacity>
                                                        <Text style={{
                                                            color: '#FFFFFF',
                                                            backgroundColor: '#3AAD94',
                                                            fontSize: 14,
                                                            paddingHorizontal: 10,
                                                            paddingVertical: 5,
                                                            borderRadius: 8,
                                                        }}>Ongoing</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{
                                                    marginLeft: 10,
                                                    alignItems: 'flex-start'
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'row'
                                                    }}>
                                                        <Text style={{
                                                            color: '#091C3F',
                                                            fontWeight: 'bold',
                                                            marginBottom: 2,
                                                            fontSize: 14
                                                        }}>{item.name}</Text>
                                                        <Text style={{
                                                            color: '#8493A2',
                                                            fontWeight: 'bold',
                                                            marginBottom: 2,
                                                            fontSize: 14
                                                        }}> -{item.gender}</Text>
                                                    </View>
                                                    <Text style={{
                                                        color: '#8493A2',
                                                        fontWeight: 'bold',
                                                        marginBottom: 2,
                                                        fontSize: 14
                                                    }}>{item.bloodAndAge}</Text>
                                                    <Text style={{
                                                        color: '#091C3F',
                                                        marginBottom: 2,
                                                        fontSize: 12
                                                    }}>{item.degree}</Text>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        marginVertical: 5
                                                    }}>
                                                        <TouchableOpacity>
                                                            <Text style={{
                                                                color: '#FFFFFF',
                                                                backgroundColor: '#3AAD94',
                                                                marginBottom: 2,
                                                                fontSize: 14,
                                                                paddingHorizontal: 10,
                                                                paddingVertical: 5,
                                                                borderRadius: 8,
                                                                marginRight: 5
                                                            }}>Set Reminder</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity>
                                                            <Text style={{
                                                                color: '#FFFFFF',
                                                                backgroundColor: '#3AAD94',
                                                                marginBottom: 2,
                                                                fontSize: 12,
                                                                paddingHorizontal: 10,
                                                                paddingVertical: 5,
                                                                borderRadius: 8,
                                                            }}>View EHR</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'row'
                                                    }}>
                                                        <TouchableOpacity style={{
                                                            marginRight: 5
                                                        }}>
                                                            <Image source={uplodIcon} />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{
                                                            marginRight: 5
                                                        }}>
                                                            <Image source={messageIcon} />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{
                                                            marginRight: 5
                                                        }}>
                                                            <Image source={phoneIcon} />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{
                                                            marginRight: 5
                                                        }}>
                                                            <Image source={badgeIcon} />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                    numColumns={1}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View> */}

                            {/* <FlatList 
                                data={[
                                    { img: bbcBg, newsTitle: 'News Headline', newsContent: 'Lorem Ipsum Dolor\nLorem Lorem',  margin: 24, key: '1' },
                                    { img: bbcBg, newsTitle: 'News Headline', newsContent: 'Lorem Ipsum Dolor\nLorem Lorem', key: '2' }
                                ]}
                                renderItem={({ item }) => (
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        flexDirection: 'row',
                                        marginLeft: item.margin,
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
                            /> */}

                            <View style={{
                                flex:1,
                                marginVertical:30,
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
                            <View style={{
                                backgroundColor:'#3AAD94',
                                borderTopLeftRadius:100/2,
                                borderTopRightRadius:100/2,
                                flex:1,
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-around',
                                padding:20
                            }}>
                                {/* <View style={{
                                    // marginHorizontal:10,
                                    // marginVertical:20
                                }}>
                                    <Text style={{
                                        color:'#B9DBC8',
                                        fontSize:16,
                                        fontWeight:'bold'
                                    }}>10</Text>
                                </View>
                                <View style={{
                                    backgroundColor:'#B9DBC8',
                                    flex:.6,
                                    padding:15,
                                    borderRadius:15
                                }}>
                                    <Text style={{color:'#1C6353',fontWeight:'bold',marginVertical:10}}>Dr. Kudrat-e-kuda</Text>
                                    <Text style={{color:'#1C6353'}}>10:00 - 12:30</Text>
                                    <Text style={{color:'#1C6353',marginTop:5}}>Central Hall</Text>
                                </View> */}
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    data={api_data?.data}
                                    renderItem={({item, index}) => (
                                        <View style={{
                                            backgroundColor:'#B9DBC8',
                                            flex:.6,
                                            padding:10,
                                            borderRadius:5,
                                            marginHorizontal:5
                                        }}>
                                            <View>
                                                <Text style={{color:'#1C6353',fontWeight:'bold',marginVertical:10}}>Patient: {item.patient_info.name}</Text>
                                                <Text style={{color:'#1C6353'}}>Date :{item.appointment_date} </Text>
                                                <Text style={{color:'#1C6353',marginTop:5}}>Time :{item.appointment_time}</Text>
                                                {/* <Text style={{color:'#1C6353',marginTop:5}}>Appointment :{item.appointment_type}</Text> */}
                                            </View>
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
