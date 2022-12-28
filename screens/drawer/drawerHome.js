import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react'
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
    RefreshControl,
    Share,
    Linking,
    Button
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import UserAvatar from '../../assets/user_avatar.png';
import { Avatar } from 'react-native-paper';
import NavigationDrawerHeader from '../modules/navigationDrawerHeader';
import Toast from 'react-native-toast-message';
import { 
    Ionicons,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Octicons,
    Entypo,
    Fontisto,
    MaterialIcons,
    Feather,
    FontAwesome
} from '@expo/vector-icons';
import {Calendar, CalendarList, Agenda } from 'react-native-calendars';
import {useFocusEffect} from '@react-navigation/native';
import * as patientEnd from '../../services/api/patientEnd';
import token from '../../services/local_storage/storage';
import * as SecureStore from 'expo-secure-store';
import config from '../../services/config';
import Loader from '../modules/loader';
import NetworkImg from '../../assets/network.png'
import AvatarSample from '../../assets/user_avatar.png'
import RBSheet from "react-native-raw-bottom-sheet";
import location from '../../services/api/location';
import * as Storage from '../../services/local_storage/storage';

export default function DrawerHomeScreen({navigation, route}) {

    // navigation.setOptions({ tabBarVisible: false })
    const isMounted = useRef(true);

    const appoint_data = route.params;
    // console.log('appointment_data from pay',appoint_data?.data?.appointment_date);
    const [api_data, setApidata] = useState(null);
    const [nurse_data, setNurseData] = useState(null);
    const [profile, setProfile] = useState(null);
    const [doc_suggest, setDocSuggest] = useState(null);
    const [is_loading, setLoading] = useState(true);
    const [marked_date, setMarkedDate] = useState(null);
    const [nurse_date, setNurseMarkedDate] = useState(null);
    const [search_text, setSearchText] = useState('');
    const [symptom_list, setSymptomsList] = useState([]);
    
    
    const [refreshing, setRefreshing] = useState(false);
    
    const refRBSheet = React.useRef();
    const [myLocation, setMySavedLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState();
    const [active_location, setActiveLocation] = useState([]);

    //////// Refresh dashboard
    const onRefresh = useCallback(() => {

        const abort_control = new AbortController();
        const cln = {signal: abort_control.signal}

        setRefreshing(true);
        setLoading(true);
        getApiData(cln);
        getPatientProfileData(cln);
        getDoctorSuggestion(cln)
        setLoading(false);
        setRefreshing(false);

        return () => {
            console.log('refresControl_return');
            abort_control.abort();
            isMounted.current = false;
        }
    }, []);


    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'Stay healthy with the Chikitsa App and get all your Healthcare Solution in a single platform. Get the App from: ' 
              + 'https://play.google.com/store/apps/details?id=xyz.chikitsa'
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    };

    // function helpLineCall() {
    //     Linking.openURL(`tel:${phoneNumber}`)
    // }

    async function joinRoom(appointment){

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



    async function searchDashboard(signal) {
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "search_text": search_text,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "patient/search_doctor", requestOptions, signal)
        .then(response => response.text())
        .then(result => {
            let search_data = JSON.parse(result)
            // console.log("search_data", search_data)
        })
        .catch(error => {
            if (error.name == 'AbortError') {
                console.log('request was cancelled');
            }
            console.log('error', error)
        });
    }


    


    async function getApiData(signal) {
        await SecureStore.getItemAsync("token").then(async(token) => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow', 
            };

            // console.log('==========')
            // console.log(signal);
            // console.log('==========')
            let response = [];
            await fetch( config.baseUrl + "patient/my_upcoming_appointments", requestOptions, signal)
            .then(response => response.text())
            .then(async(result) => {
                // console.log(result)
                if(isMounted) {

                    let appoint_api_data = JSON.parse(result)
                    // console.log('-----=====appoint_api_data_dashboard=======------',appoint_api_data)
                    let doctor_array = []
    
                    appoint_api_data.data.map((dat)  => {
                        let doc_app = {
                            "appointment_date" : dat.appointment_date,
                            "type" : dat.type
                        }
    
                        doctor_array.push(doc_app)
                        // console.log('=======data=====',dat.type)
                    })
                    // console.log('doctor_array', doctor_array)
                    var obj = {};
                    
                    for(let i=0;i<doctor_array.length;i++){
                        // console.log('doctoe+++++socjijcsov', doctor_array[i])
                        // console.log('======appoint_api_data_dashboard=======')
                        // console.log(doctor_array[i].appointment_date)
                        // console.log(doctor_array[i].type)
                        // console.log('======appoint_api_data_dashboard=======')
                        if(doctor_array[i].type === "doctor") {
    
                            Object.assign(obj, {[doctor_array[i].appointment_date]: {selected: true, marked: true, selectedColor: '#3AAD94'}})
                        
                        } else{
                        
                            Object.assign(obj, {[doctor_array[i].appointment_date]: {selected: true, marked: true, selectedColor: '#5D8BF4'}})
                            // console.log('hello world')
                        }
                    }
                    
                    // console.log(obj)
                    setMarkedDate(obj)
                    
                    setApidata(appoint_api_data);
    
                    await Storage.getItem('active_location').then(res => {
                        if(res == null){
                            refRBSheet.current.open();
                        }else {
                            const data = JSON.parse(res)
                            setActiveLocation(data)
                        }
                    })
                    
                    const my_saved_location = await location.mySavedLocation();
               
                    setMySavedLocation(my_saved_location.data);
                }
                
            })
            .catch(error => {
                if (error.name == 'AbortError') {
                    console.log('request was cancelled');
                }
                console.log('error', error)
            
            });
        })

    }



    async function getDoctorSuggestion(signal) {
        await SecureStore.getItemAsync("token").then(async(token) => {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + token);
            
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let response = [];

            await fetch( config.baseUrl + "patient/get_suggestions", requestOptions, signal)
            .then(response => response.text())
            .then(result => {
                let doctor_list_suggest = JSON.parse(result)
                if(isMounted) {
                    // console.log(result)
                    // console.log('=========Home=========',)
                    // console.log(doctor_list_suggest)
                    // console.log('==========Home========',)
                    setDocSuggest(doctor_list_suggest);
                }
                
            })
            .catch(error => console.log('error', error));
        })

    }

    async function getPatientProfileData(signal) {
        let patient_profile_data = await patientEnd.getPatientProfile(signal)
        if(isMounted){
            setProfile(patient_profile_data)
        }
        // setLoading(false);

        // console.log('patient_profile_data',patient_profile_data);
    }
    
    async function getSymptomsList() {
        let user_token = await token.getItem("token");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        // let response = []
        await fetch( config.baseUrl + "doctor/symptom_list" , requestOptions)
            .then(response => response.text())
            .then(result => {
                let doctor_list_data = JSON.parse(result)
                setSymptomsList(doctor_list_data);
                // console.log('55555555555555555555555555555555555555555555555')
                // console.log(doctor_list_data)
                // console.log('55555555555555555555555555555555555555555555555')
            })
            .catch(error => {
                // if (error.name == 'AbortError') {
                //     console.log('request was cancelled');
                // }
                console.log('error', error)
            });
    }

    useFocusEffect(
        useCallback(() => {

            const abortControl = new AbortController();
            const opts = { signal : abortControl.signal };
            if(isMounted){
                setLoading(true);
                getApiData(opts);
                getPatientProfileData(opts);
                searchDashboard(opts);
                getDoctorSuggestion(opts);
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
                console.log('home_Returned');
                abortControl.abort();
                isMounted.current = false;
            };
        }, [search_text]),
    );

    useLayoutEffect(() => {
        if(isMounted) {
            setLoading(true);
            getSymptomsList();
            setLoading(false);
        }
        return () => {
            isMounted.current = false;
        };
    }, [])


    async function CurrentLocationUpdate(location){
        await Storage.remove('active_location')
        
        await Storage.save('active_location', JSON.stringify(location)).then(save_res => {
            const data = JSON.parse(save_res)
            setActiveLocation(data)
        })
        refRBSheet.current.close();
        // console.log("============")
        // console.log(active_location.location_name)
        // console.log("============")
    }

    async function locationRemove(location_id, selected_index){

        
        let user_token = await SecureStore.getItemAsync("token");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);

        var requestOptions = {
            method: 'delete',
            headers: myHeaders,
            redirect: 'follow'
        };

        console.log(requestOptions)
        // let response = []
        await fetch( config.baseUrl+"users_locations/delete/"+location_id , requestOptions)
            .then(response => response.text())
            .then(result => {
                let json_result = JSON.parse(result)

                
                console.log(myLocation)
                myLocation.splice(myLocation.indexOf(selected_index+1), 1)
                setMySavedLocation(() => [...myLocation])
                // setMySavedLocation(myLocation)
                console.log(json_result)
            })
            .catch(error => {
                console.log('ee error', error)
            });
    }


    return (
        <SafeAreaView style={{flex:1,}}>
            <StatusBar backgroundColor={'#075141'} />
            {
                is_loading ? (
                    <Loader />
                ) : (
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            />
                        }
                        showsVerticalScrollIndicator={false}
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
                                        justifyContent:'flex-end'
                                    }}>
                                        {/* <TouchableOpacity style={{marginHorizontal:3}}>
                                            <MaterialIcons name="notification-important" size={22} color={'#fff'} />
                                        </TouchableOpacity> */}
                                        <TouchableOpacity style={{marginHorizontal:3}}>
                                            {/* <Feather  name="inbox" size={20} color={'#fff'} /> */}
                                            {/* <FontAwesome5 name="cart-plus" size={20} color={'#fff'} /> */}
                                        </TouchableOpacity>

                                    </View>

                                </View>

                                <View style={{}}>
                                    <Avatar.Image 
                                        style={{
                                            backgroundColor:'#fff',
                                            borderWidth:.5,
                                            borderColor:'#70707B'
                                        }} size={40} source={{uri: config.baseUrl + 'uploades/' + profile?.user?.user_pic }} 
                                    />
                                </View>

                                <Text style={{
                                    fontSize:18,
                                    fontWeight:'bold',
                                    color:'#fff',
                                    // marginVertical:3
                                }}>{profile?.user?.name}</Text>

                                <Text style={{
                                    fontSize:13,
                                    color:'#fff',
                                    fontWeight:'400'
                                }}>Welcome to Chikitsa</Text>

                                <View style={{
                                    position:'absolute',
                                    bottom:-20, 
                                    width:'80%',
                                    flexDirection:'row',
                                    alignItems:'center',
                                    backgroundColor:'#5ED4BA',
                                    borderRadius:100/2,
                                }}>
                                    
                                    <TextInput 
                                        onChangeText={(search) => setSearchText(search)}
                                        placeholder='Search'
                                        style={{
                                            // borderWidth:1,
                                            width:'85%',
                                            borderRadius:100/2,
                                            paddingHorizontal:10,
                                            paddingVertical:3,
                                            backgroundColor:'#fff',
                                            height:50,
                                            fontSize:14,
                                            fontWeight:'bold'
                                        }}
                                    />

                                    <TouchableOpacity 
                                        style={{
                                        
                                        }}
                                        onPress={() => {
                                            Toast.show({
                                                type: 'success',
                                                text1: 'New feature!',
                                                text2: 'Voice search is coming soon'
                                            });
                                        }}
                                    >
                                        <Ionicons style={{
                                            marginLeft:5
                                        }} name='mic-outline' size={24} color={'#fff'} />
                                    </TouchableOpacity>

                                </View>

                            </View>
                            
                            <View style={{
                                flex:1,
                                marginTop:15,
                                marginHorizontal:12,
                                padding:10
                            }}>
                                <Text style={{
                                    fontWeight:'700',
                                    fontSize:16,
                                    color:'#B6B7B7'
                                }}>Delivering to</Text>

                                <TouchableOpacity 
                                    onPress={() => refRBSheet.current.open()}
                                    style={{
                                        // borderWidth:1,
                                        borderColor:'#3AAD94',
                                        padding:8,
                                        backgroundColor:'#fff',
                                        marginVertical:4,
                                        borderRadius:4,
                                        flex:1,
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        alignItems:'center'
                                    }}
                                >
                                    <View>

                                        <Text style={{
                                            fontSize:14,
                                            fontWeight:'bold',
                                            color:'#7C7D7E'
                                            }}
                                            
                                            >{active_location.location_name}
                                                {/* <Text>
                                                    <Ionicons name="chevron-down" size={22} color="black" />
                                                </Text> */}
                                        </Text>

                                        <Text style={{
                                            fontSize:12,
                                            fontWeight:'bold',
                                            color:'#7C7D7E'
                                            }}
                                            
                                            >{
                                                active_location?.thana + ", " + active_location?.district 
                                                + "-" + active_location?.postal_code
                                            }
                                        </Text>

                                    </View>

                                    <View>
                                        <Ionicons name="chevron-forward" size={24} color="#7C7D7E" />
                                    </View>
                                    
                                </TouchableOpacity>

                            </View>

                            <View style={{
                                flex:1,
                                flexDirection:'row',
                                justifyContent:'space-around',
                                marginHorizontal:15
                            }}>
                                
                                <TouchableOpacity 
                                    style={styles.featureItemStyle}
                                    onPress={() => navigation.navigate('DoctorNearbyScreenStack')}
                                >
                                    {/* <Avatar.Image size={45} source={UserAvatar} /> */}
                                    <Text style={{
                                        backgroundColor:'#FF9598',
                                        padding:7,
                                        borderRadius:100/2
                                    }}>
                                        <Fontisto name="doctor" size={24} color="#fff" />
                                    </Text>
                                    
                                    <Text style={{
                                        textAlign:'center',
                                        fontSize:10,
                                        fontWeight:'bold',
                                        color:'#090F47'
                                    }}>Doctor</Text>

                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.featureItemStyle}
                                    onPress={() => navigation.navigate('NurseNearbyScreenStack')}
                                >
                                    {/* <Avatar.Image size={45} source={UserAvatar} /> */}
                                    <Text style={{
                                        backgroundColor:'#6A5495',
                                        padding:7,
                                        borderRadius:100/2
                                    }}>
                                        <FontAwesome5 name="user-nurse" size={24} color="#fff" />
                                    </Text>

                                    <Text style={{
                                        textAlign:'center',
                                        fontSize:10,
                                        fontWeight:'bold',
                                        color:'#090F47'
                                    }}>Medical Assistant</Text>

                                </TouchableOpacity>   

                                <TouchableOpacity 
                                    style={styles.featureItemStyle}
                                    onPress={() => navigation.navigate('PharmacyScreenStack')}
                                >
                                    
                                    <Text style={{
                                        backgroundColor:'#3AAD94',
                                        padding:7,
                                        borderRadius:100/2
                                    }}>
                                        <Fontisto name="shopping-store" size={24} color="#fff" />
                                        {/* <MaterialCommunityIcons name="pharmacy" size={24} /> */}
                                    </Text>

                                    <Text style={{
                                        textAlign:'center',
                                        fontSize:10,
                                        fontWeight:'bold',
                                        color:'#090F47'
                                    }}>Pharmacy</Text>

                                </TouchableOpacity> 

                                
                                {/* <TouchableOpacity 
                                    style={styles.featureItemStyle}
                                    onPress={() => navigation.navigate('InstantVideoConsultScreen')}
                                >
                                    <Text style={{
                                        backgroundColor:'#FF793A',
                                        padding:7,
                                        borderRadius:100/2
                                    }}>
                                        <Entypo name="video-camera" size={24} color="#fff" />
                                    </Text>
                                    <Text style={{
                                        textAlign:'center',
                                        fontSize:10,
                                        fontWeight:'bold',
                                        color:'#090F47'
                                    }}>Instant video consult</Text>
                                </TouchableOpacity> */}

                            </View>

                            <View style={{
                                flex:1,
                                flexDirection:'row',
                                justifyContent:'space-around',
                                marginTop:20,
                                marginHorizontal:15
                            }}>

                                <TouchableOpacity 
                                    style={styles.featureItemStyle}
                                    onPress={() => navigation.navigate('DoctorDirectoryStack')}
                                >
                                    
                                    <Text style={{
                                        backgroundColor:'#3AAD94',
                                        padding:7,
                                        borderRadius:100/2
                                    }}>
                                        <FontAwesome5 name="book-medical" size={22} color="#fff" />
                                    </Text>

                                    <Text style={{
                                        textAlign:'center',
                                        fontSize:10,
                                        fontWeight:'bold',
                                        color:'#090F47'
                                    }}>Doctor Directory</Text>

                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.featureItemStyle}
                                    onPress={() => navigation.navigate('AssistantDirectoryStack')}
                                >
                                    
                                    <Text style={{
                                        backgroundColor:'#783EFF',
                                        padding:7,
                                        borderRadius:100/2
                                    }}>
                                        <Fontisto name="nurse" size={24} color="#fff" />
                                    </Text>

                                    <Text style={{
                                        textAlign:'center',
                                        fontSize:10,
                                        fontWeight:'bold',
                                        color:'#090F47'
                                    }}>Medical Assistant Directory</Text>

                                </TouchableOpacity>

                                <TouchableOpacity 
                                    style={styles.featureItemStyle}
                                    onPress={() => navigation.navigate('MedicineRoutes')}
                                >
                                    
                                    <Text style={{
                                        backgroundColor:'#171717',
                                        padding:7,
                                        borderRadius:100/2
                                    }}>
                                        <MaterialCommunityIcons name="pharmacy" size={24} color="#fff" />
                                    </Text>

                                    <Text style={{
                                        textAlign:'center',
                                        fontSize:10,
                                        fontWeight:'bold',
                                        color:'#090F47'
                                    }}>Medicine Directory</Text>

                                </TouchableOpacity>


                                

                                {/* <TouchableOpacity
                                    style={styles.featureItemStyle}
                                    onPress={() => navigation.navigate('OrganDonorScreen')}
                                >
                                    <Text style={{
                                        backgroundColor:'#7E370C',
                                        padding:7,
                                        borderRadius:100/2
                                    }}>
                                        <FontAwesome5 name="heartbeat" size={24} color="#fff" />
                                    </Text>
                                    <Text style={{
                                        textAlign:'center',
                                        fontSize:10,
                                        fontWeight:'bold',
                                        color:'#090F47'
                                    }}>Organ Donor</Text>
                                </TouchableOpacity> */}

                                {/* <TouchableOpacity 
                                    style={styles.featureItemStyle}
                                    onPress={() => navigation.navigate('BloodDonorStack')}
                                >
                                    <Text style={{
                                        backgroundColor:'#F90716',
                                        padding:7,
                                        borderRadius:100/2
                                    }}>
                                        <MaterialCommunityIcons name="blood-bag" size={24} color="#fff" />
                                    </Text>
                                    <Text style={{
                                        textAlign:'center',
                                        fontSize:10,
                                        fontWeight:'bold',
                                        color:'#090F47'
                                    }}>Blood Donor</Text>
                                </TouchableOpacity> */}

                                {/* <TouchableOpacity 
                                    style={styles.featureItemStyle}
                                    onPress={() => navigation.navigate('ClinicNearbyScreenStack')}
                                >
                                    <Text style={{
                                        backgroundColor:'#3E7DFF',
                                        padding:7,
                                        borderRadius:100/2
                                    }}>
                                        <Entypo name="network" size={24} color="#fff" />
                                    </Text>
                                    <Text style={{
                                        textAlign:'center',
                                        fontSize:10,
                                        fontWeight:'bold',
                                        color:'#090F47'
                                    }}>Clinic nearby</Text>
                                </TouchableOpacity> */}
                                
                            </View>


                            <View style={{
                                flex:1,
                                flexDirection:'row',
                                justifyContent:'space-around',
                                marginTop:20,
                                marginHorizontal:15
                            }}>

                                <TouchableOpacity 
                                    style={styles.featureItemStyle}
                                    onPress={() => navigation.navigate('BloodDonorStack')}
                                >
                                    <Text style={{
                                        backgroundColor:'#F90716',
                                        padding:7,
                                        borderRadius:100/2
                                    }}>
                                        <MaterialCommunityIcons name="blood-bag" size={24} color="#fff" />
                                    </Text>

                                    <Text style={{
                                        textAlign:'center',
                                        fontSize:10,
                                        fontWeight:'bold',
                                        color:'#090F47'
                                    }}>Blood Donor</Text>

                                </TouchableOpacity>

                                

                                <TouchableOpacity 
                                    style={styles.featureItemStyle}
                                    onPress={() => navigation.navigate('AutoAppointmentScreen')}
                                    >
                                    <Text style={{
                                        backgroundColor:'#19E5A5',
                                        padding:7,
                                        borderRadius:100/2
                                    }}>
                                        <Fontisto name="player-settings" size={24} color="#fff" />
                                    </Text>
                                    <Text style={{
                                        textAlign:'center',
                                        fontSize:10,
                                        fontWeight:'bold',
                                        color:'#090F47'
                                    }}>Auto Appointment</Text>
                                </TouchableOpacity>

                            </View>

                            {/* <View style={{
                                flex:1,
                                flexDirection:'row',
                                justifyContent:'space-evenly',
                                marginTop:20
                            }}>

                                <TouchableOpacity 
                                    style={styles.featureItemStyle}
                                    onPress={() => navigation.navigate('ReportDeliveryScreen')}
                                >
                                    <Text style={{
                                        backgroundColor:'#FF7F3F',
                                        padding:7,
                                        borderRadius:100/2
                                    }}>
                                        <FontAwesome5 name="file-medical-alt" size={24} color="#fff" />
                                    </Text>
                                    <Text style={{
                                        textAlign:'center',
                                        fontSize:10,
                                        fontWeight:'bold',
                                        color:'#090F47'
                                    }}>Report delivery</Text>
                                </TouchableOpacity>
                                
                            </View>

                            {/* Suggession Slider Start */}
                            <View style={{marginTop:10}}>
                                
                                <Text style={{
                                    fontSize:18,
                                    fontWeight:'bold',
                                    color:'#000',
                                    textAlign:'center',
                                    padding:5,
                                }}>Popular doctor</Text>

                                <View style={{
                                    flex:1,
                                    flexDirection:'row',
                                    justifyContent:'space-evenly',
                                    // marginTop:15,
                                    marginBottom:15,
                                    // backgroundColor:'#fff',
                                }}>
                                    {
                                        doc_suggest?.data ? doc_suggest?.data.length > 0 && (
       
                                            <View style={{
                                                marginHorizontal:10,
                                                marginTop:7
                                            }}>
                
                                                <FlatList
                                                    showsHorizontalScrollIndicator={false}
                                                    data={doc_suggest?.data}
                                                    renderItem={({item, index}) => (
                                                        
                                                        <View>
                                                            {
                                                                doc_suggest?.data[index].type === 'doctor' && (
                                                                    
                                                                    <View style={{
                                                                        // backgroundColor:'#B9DBC8',
                                                                        backgroundColor:'#D9FFF0',
                                                                        flex:.6,
                                                                        // padding:10,
                                                                        borderRadius:5,
                                                                        marginHorizontal:5,
                                                                        minWidth:140,
                                                                        minHeight:140
                                                                    }}>
                                                                        
                                                                        <TouchableOpacity
                                                                            onPress={()=> {
                                                                                navigation.navigate('DoctorNearbyScreenStack',{screen: 'ConcernDocDetailsScreen',params:item} )
                                                                            }}
                                                                        >
                                                                            
                                                                            <View>
                                                                                
                                                                                <View style={{
                                                                                    flexDirection:'row',
                                                                                    // justifyContent:'space-between',
                                                                                    alignItems:'center',
                                                                                    backgroundColor:'#3AAD94',
                                                                                    borderTopLeftRadius:5,
                                                                                    borderTopRightRadius:5,
                                                                                    paddingVertical:3,
                                                                                    paddingHorizontal:10
                                                                                }}>
                                                                                    
                                                                                    <Fontisto name="doctor" size={16} color="#fff" />
                                                                                    <Text style={{
                                                                                        color:'#fff',
                                                                                        fontSize:16,
                                                                                        textAlign:"left",
                                                                                        marginHorizontal:5,
                                                                                        // fontWeight:'bold'
                                                                                    }}>
                                                                                        Doctor
                                                                                    </Text>

                                                                                </View>

                                                                                <View style={{
                                                                                    padding:10,
                                                                                    alignItems:'center'
                                                                                }}>

                                                                                    <View>
                                                                                        <Avatar.Image 
                                                                                            style={{
                                                                                                backgroundColor:'#fff',
                                                                                                borderWidth:.5,
                                                                                                borderColor:'#70707B'
                                                                                            }} size={70} source={{uri: config.baseUrl + 'uploades/' + item?.image }} 
                                                                                        />
                                                                                    </View>

                                                                                    <Text style={{
                                                                                        color:'#1C6353',
                                                                                        fontWeight:'bold',
                                                                                        marginVertical:5,
                                                                                        fontSize:16
                                                                                        }}>{item?.name}
                                                                                    </Text>

                                                                                </View>

                                                                            </View>

                                                                        </TouchableOpacity>

                                                                    </View>
                                                                )
                                                            }

                                                            {/* {
                                                                doc_suggest?.data[index].type === 'nurse' && (
                                                                    <View style={{
                                                                        backgroundColor:'#9ADCFF',
                                                                        flex:.6,
                                                                        borderRadius:5,
                                                                        marginHorizontal:5,
                                                                        minWidth:120,
                                                                    }}>
                                                                        <TouchableOpacity>
                                                                            <View>

                                                                                <View style={{
                                                                                    flexDirection:'row',
                                                                                    justifyContent:'space-between',
                                                                                    alignItems:'center',
                                                                                    backgroundColor:'#83b7d6',
                                                                                    borderTopLeftRadius:5,
                                                                                    borderTopRightRadius:5,
                                                                                    paddingVertical:3,
                                                                                    paddingHorizontal:10
                                                                                }}>
                                                                                
                                                                                    <Fontisto name="nurse" size={20} color="#548CFF" />
                                                                                    <Text style={{
                                                                                        color:'#1C6353',
                                                                                        fontSize:18,
                                                                                    }}>
                                                                                        NURSE
                                                                                    </Text>
                                                                                </View>

                                                                                <View style={{
                                                                                    padding:10
                                                                                }}>
                                                                                    <Text style={{
                                                                                        color:'#1C6353',
                                                                                        fontWeight:'bold',
                                                                                        marginVertical:5,
                                                                                        fontSize:16
                                                                                        }}>
                                                                                        {item?.nurse_info?.name ? item?.nurse_info?.name : 'N/A'}
                                                                                    </Text>
                                                                                    
                                                                                    <Text style={
                                                                                        {color:'#1C6353',
                                                                                        fontSize:13,
                                                                                        fontWeight:'bold'
                                                                                        }}>Date : {item?.appointment_date} 
                                                                                    </Text>
                                                                                    
                                                                                    <Text style={{
                                                                                        color:'#1C6353',
                                                                                        marginTop:5,
                                                                                        fontSize:13,
                                                                                        fontWeight:'bold'}}>Time : {item?.appointment_time}
                                                                                    </Text>
                                                                                </View>
                                                                            </View>
                                                                        </TouchableOpacity>
                                                                    </View>
                                                                )
                                                            } */}
                                                        </View>
                                                        
                                                    )}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    horizontal={true}
                                                />
                                            </View>
                                            
                                        ) : (
                                            <View>
                                                <Text style={{
                                                    fontSize:16,
                                                    fontWeight:'bold',
                                                    textAlign:'center',
                                                    padding:5
                                                }}>No Doctor Available</Text>
                                            </View>
                                        )
                                    }
                                </View>
                            </View>
                            {/* Suggession Slider End */}

                            {/* symptoms */}
                            <View style={{
                                paddingHorizontal:8
                            }}>
                                
                                <Text style={{
                                    fontSize:18,
                                    fontWeight:'bold',
                                    textAlign:'left'
                                }}>
                                    What are your symptoms?
                                </Text>

                                <FlatList
                                    data={symptom_list?.data}
                                    renderItem={({item, index}) => (
                                        <View 
                                            style={{
                                                marginVertical:8
                                            }}
                                        >
                                            <TouchableOpacity style={{
                                                backgroundColor:'#CFE4FF',
                                                paddingHorizontal:10,
                                                paddingVertical:10,
                                                flexDirection:'row',
                                                alignItems:'center',
                                                justifyContent:"space-between",
                                                marginHorizontal:5,
                                                borderRadius:5
                                            }}
                                            onPress={() => {
                                                // console.log(item)
                                                navigation.navigate('SymptomsScreen',{data : item, title:item?.name})
                                            }}
                                            >
                                                {/* <FontAwesome5 name="temperature-high" size={22} color="#EF1C25" /> */}
                                                <Text style={{
                                                    color:'#3AAD94',
                                                    fontSize:16,
                                                    fontWeight:'700',
                                                    paddingHorizontal:12,
                                                    paddingVertical:8
                                                }}>
                                                    {item?.name}
                                                </Text>

                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                    horizontal

                                />

                            </View>
                            {/* symptoms */}

                            {/* starter plan */}
                            {/* <View style={{
                                backgroundColor:'#3AAD94',
                                paddingHorizontal:15,
                                paddingVertical:10,
                                marginHorizontal:15,
                                borderRadius:10,
                                flexDirection:'row',
                                justifyContent:'space-between',
                                marginTop:5
                            }}>
                                <View style={{
                                    justifyContent:'center'
                                }}>
                                    <Text style={{
                                        fontSize:16,
                                        fontWeight:'bold',
                                        color:'#fff'
                                    }}>Starter Plan</Text>
                                    
                                    <Text style={{
                                        fontSize:12,
                                        fontWeight:'bold',
                                        color:'#fff'
                                    }}>
                                        <Text>৳</Text> 80/month
                                    </Text>

                                    <TouchableOpacity style={{
                                        backgroundColor:'#fff',
                                        borderRadius:100/2,
                                        paddingHorizontal:10,
                                        paddingVertical:5,
                                        marginTop:7
                                    }}>
                                        <Text style={{
                                            color:'#3AAD94',
                                            fontWeight:'bold',
                                            fontSize:12
                                        }}>
                                            Subscribe Now
                                        </Text>
                                    </TouchableOpacity>

                                </View>
                                
                                <View style={{
                                    backgroundColor:'#8BCFC0',
                                    paddingHorizontal:10,
                                    paddingVertical:10,
                                    alignItems:'flex-start',
                                    borderRadius:5,
                                    flex:.8
                                }}>
                                    <View style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                    }}>
                                        <FontAwesome style={{marginRight:3}} name="circle" size={12} color="#164E41" />
                                        <Text style={{
                                            fontSize:12,
                                            fontWeight:'bold',
                                            color:'#164E41'
                                        }}>
                                            Some details
                                        </Text>
                                    </View>
                                    
                                    <View style={{
                                        flexDirection:'row',
                                        alignItems:'center'
                                    }}>
                                        <FontAwesome style={{marginRight:3}} name="circle" size={12} color="#164E41" />
                                        <Text style={{
                                            fontSize:12,
                                            fontWeight:'bold',
                                            color:'#164E41'
                                        }}>
                                            Some more details
                                        </Text>
                                    </View>
                                    
                                    <View style={{
                                        flexDirection:'row',
                                        alignItems:'center'
                                    }}>
                                        <FontAwesome style={{marginRight:3}} name="circle" size={12} color="#164E41" />
                                        <Text style={{
                                            fontSize:12,
                                            fontWeight:'bold',
                                            color:'#164E41'
                                        }}>
                                            Some details
                                        </Text>
                                    </View>
                                    
                                    <View style={{
                                        flexDirection:'row',
                                        alignItems:'center'
                                    }}>
                                        <FontAwesome style={{marginRight:3}} name="circle" size={12} color="#164E41" />
                                        <Text style={{
                                            fontSize:12,
                                            fontWeight:'bold',
                                            color:'#164E41'
                                        }}>
                                            Some details
                                        </Text>
                                    </View>
                                    
                                    <View style={{
                                        flexDirection:'row',
                                        alignItems:'center'
                                    }}>
                                        <FontAwesome style={{marginRight:3}} name="circle" size={12} color="#164E41" />
                                        <Text style={{
                                            fontSize:12,
                                            fontWeight:'bold',
                                            color:'#164E41'
                                        }}>
                                            Some details
                                        </Text>
                                    </View>

                                </View>

                            </View> */}
                            {/* starter plan */}
                            
                            {/* recomended plan */}
                            {/* <View style={{position:'relative', top:-10}}>
                                <View style={{
                                    position:'relative',
                                    top:20,
                                    padding:7,
                                    alignItems:'center'
                                }}>
                                    <Text style={{
                                        color:'#fff',
                                        backgroundColor:'#0E8267',
                                        paddingHorizontal:10,
                                        paddingVertical:5,
                                        borderRadius:5,
                                        fontSize:12,
                                        fontWeight:'bold'
                                    }}>Recommended Plan</Text>
                                </View>
                                <View style={{
                                    backgroundColor:'#3AAD94',
                                    paddingHorizontal:15,
                                    paddingVertical:10,
                                    marginHorizontal:15,
                                    borderRadius:10,
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    marginTop:10
                                }}>
                                    <View style={{
                                        justifyContent:'center'
                                    }}>
                                        <Text style={{
                                            fontSize:16,
                                            fontWeight:'bold',
                                            color:'#fff'
                                        }}>Pro Plan</Text>
                                        
                                        <Text style={{
                                            fontSize:12,
                                            fontWeight:'bold',
                                            color:'#fff'
                                        }}>
                                            <Text>৳</Text> 200/month
                                        </Text>

                                        <TouchableOpacity style={{
                                            backgroundColor:'#fff',
                                            borderRadius:100/2,
                                            paddingHorizontal:10,
                                            paddingVertical:5,
                                            marginTop:7
                                        }}>
                                            <Text style={{
                                                color:'#3AAD94',
                                                fontWeight:'bold',
                                                fontSize:12
                                            }}>
                                                Subscribe Now
                                            </Text>
                                        </TouchableOpacity>

                                    </View>
                                    
                                    <View style={{
                                        backgroundColor:'#8BCFC0',
                                        paddingHorizontal:10,
                                        paddingVertical:10,
                                        alignItems:'flex-start',
                                        borderRadius:5,
                                        flex:.8
                                    }}>
                                        <View style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                        }}>
                                            <FontAwesome style={{marginRight:3}} name="circle" size={12} color="#164E41" />
                                            <Text style={{
                                                fontSize:12,
                                                fontWeight:'bold',
                                                color:'#164E41'
                                            }}>
                                                Some details
                                            </Text>
                                        </View>
                                        
                                        <View style={{
                                            flexDirection:'row',
                                            alignItems:'center'
                                        }}>
                                            <FontAwesome style={{marginRight:3}} name="circle" size={12} color="#164E41" />
                                            <Text style={{
                                                fontSize:12,
                                                fontWeight:'bold',
                                                color:'#164E41'
                                            }}>
                                                Some more details
                                            </Text>
                                        </View>
                                        
                                        <View style={{
                                            flexDirection:'row',
                                            alignItems:'center'
                                        }}>
                                            <FontAwesome style={{marginRight:3}} name="circle" size={12} color="#164E41" />
                                            <Text style={{
                                                fontSize:12,
                                                fontWeight:'bold',
                                                color:'#164E41'
                                            }}>
                                                Some details
                                            </Text>
                                        </View>
                                        
                                        <View style={{
                                            flexDirection:'row',
                                            alignItems:'center'
                                        }}>
                                            <FontAwesome style={{marginRight:3}} name="circle" size={12} color="#164E41" />
                                            <Text style={{
                                                fontSize:12,
                                                fontWeight:'bold',
                                                color:'#164E41'
                                            }}>
                                                Some details
                                            </Text>
                                        </View>
                                        
                                        <View style={{
                                            flexDirection:'row',
                                            alignItems:'center'
                                        }}>
                                            <FontAwesome style={{marginRight:3}} name="circle" size={12} color="#164E41" />
                                            <Text style={{
                                                fontSize:12,
                                                fontWeight:'bold',
                                                color:'#164E41'
                                            }}>
                                                Some details
                                            </Text>
                                        </View>

                                    </View>

                                </View>
                            </View> */}
                            {/* recomended plan */}
                            
                            
                            {/* quick test */}
                            {/* <View style={{
                                // backgroundColor:'#ccc'
                            }}>
                                <Text style={{
                                    paddingHorizontal:15,
                                    paddingVertical:5,
                                    fontSize:16,
                                    fontWeight:'bold'
                                }}>Quick tests</Text>

                                <View style={{
                                    flexDirection:'row',
                                    paddingHorizontal:10,
                                    paddingVertical:5,
                                    justifyContent:'space-around'
                                }}>
                                    <TouchableOpacity style={{
                                        backgroundColor:'#fff',
                                        borderRadius:100/2,
                                        height:80,
                                        width:80,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        // borderWidth:.3,
                                        elevation:1
                                    }}>
                                        <MaterialCommunityIcons name="cup-water" size={20} color="#FF8D29" />
                                        <Text style={{
                                            color:'#816E6E',
                                            fontSize:12,
                                            fontWeight:'bold'
                                        }}>Urine test</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        backgroundColor:'#fff',
                                        borderRadius:100/2,
                                        height:80,
                                        width:80,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        elevation:1
                                    }}>
                                        <Fontisto name="test-tube" size={20} color="#205375" />
                                        <Text style={{
                                            color:'#816E6E',
                                            fontSize:12,
                                            fontWeight:'bold'
                                        }}>PCR test</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{
                                        backgroundColor:'#fff',
                                        borderRadius:100/2,
                                        height:80,
                                        width:80,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        elevation:1
                                    }}>
                                        <Fontisto name="blood-test" size={20} color="#FF4949" />
                                        <Text style={{
                                            color:'#816E6E',
                                            fontSize:12,
                                            fontWeight:'bold'
                                        }}>Blood test</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <TouchableOpacity style={{
                                        paddingHorizontal:20,
                                        paddingVertical:7,
                                        borderRadius:100/2,
                                        marginVertical:15,
                                        backgroundColor:"#3AAD94",
                                        flexDirection:'row',
                                        alignItems:'center'
                                    }}>
                                        <Text style={{
                                            color:'#fff',
                                            fontSize:16,
                                            fontWeight:'bold',
                                            textAlign:'center',
                                            paddingHorizontal:5
                                        }}>
                                            Show more
                                        </Text>
                                        
                                        <Text>
                                            <Entypo name="chevron-down" size={22} color="#fff" />
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View> */}
                            {/* quick test */}
                            
                            
                            {/* share section */}
                            <View style={{
                                backgroundColor:'#1EC68F',
                                padding:15,
                                opacity:.6,
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <View>
                                    <Image 
                                        source={NetworkImg} 
                                        // resizeMethod="auto" 
                                        resizeMode='contain' 
                                        style={{height:80, width:80}} 
                                    />
                                </View>

                                <View style={{
                                    flexDirection:'row',
                                    alignItems:'center'
                                }}>
                                    <Ionicons name="arrow-redo" size={30} color="#296E5F" />
                                    <Text style={{
                                        textAlign:'center',
                                        color:'#296E5F',
                                        fontSize:18,
                                        fontWeight:'bold'
                                    }}>
                                        Share app with{'\n'}who you care now!
                                    </Text>
                                </View>

                                <View style={{
                                    marginTop:10
                                }}>
                                    <TouchableOpacity 
                                        style={{
                                            backgroundColor:'#fff',
                                            borderRadius:7,
                                            paddingHorizontal:15,
                                            paddingVertical:7
                                        }}
                                        onPress={onShare}
                                    >
                                        <Text style={{
                                            color:'#296E5F',
                                            fontSize:18,
                                            fontWeight:'bold',
                                            textAlign:'center'
                                        }}>
                                            SHARE
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            {/* share section */}
                            
                            
                            {/* call for support */}
                            <View style={{
                                flexDirection:'row',
                                justifyContent:'space-around',
                                backgroundColor:'#fff',
                                paddingVertical:15,
                                paddingHorizontal:10,
                                alignItems:'center'
                            }}>
                                <View>
                                    <Avatar.Image 
                                        source={AvatarSample} 
                                        size={80}
                                        style={{backgroundColor:'#fff'}}    
                                    />
                                </View>
                                
                                <View style={{
                                    flex:.8
                                }}>
                                    
                                    <View>
                                        
                                        <Text style={{
                                            color:'#2F806E',
                                            fontSize:18,
                                            fontWeight:'bold',
                                            padding:3
                                        }}>Call For Support</Text>
                                        
                                        <Text style={{
                                            color:'#004032',
                                            fontSize:14,
                                            fontWeight:'500',
                                            padding:3
                                        }}>Health Medical Executive</Text>
                                        
                                        <Text style={{
                                            color:'#2F806E',
                                            fontSize:14,
                                            fontWeight:'bold',
                                            padding:3
                                        }}>09639400600</Text>

                                    </View>

                                    <View style={{
                                        alignItems:'flex-start',
                                        marginTop:5
                                    }}>
                                        <TouchableOpacity style={{
                                                backgroundColor:'#3AAD94',
                                                paddingHorizontal:15,
                                                paddingVertical:5,
                                                borderRadius:100/2,
                                                marginHorizontal:15
                                            }}
                                            onPress={()=> Linking.openURL(`tel:${+8809639400600}`)}
                                        >
                                            <Text style={{
                                                color:'#fff',
                                                fontSize:14,
                                                fontWeight:'bold',
                                                textAlign:'center'
                                            }}>Call Now</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </View>
                            {/* call for support */}

                            <View style={{
                                flex:1,
                                // marginTop:10,
                                backgroundColor:'#D9FFF0',
                            }}>
                                <Text style={{
                                    marginTop:10,
                                    marginHorizontal:20,
                                    fontWeight:'bold',
                                    fontSize:18,
                                    paddingHorizontal:10,
                                    textAlign:'center'
                                }}>Upcoming appointments</Text>
                                <Calendar
                                    // Initially visible month. Default = now
                                    // current={'2021-12-26'}
                                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                                    // minDate={'2012-05-10'}
                                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                                    // maxDate={'2012-05-30'}
                                    // Handler which gets executed on day press. Default = undefined

                                    onDayPress={(day) => { 
                                        let fixed_day = day.dateString
                                        console.log('Fixed_date',fixed_day)
                                        // let date_str = new Date(ssday).toLocaleString('en-us', {weekday:'long'})
                                        // console.log('new_date...',new Date());
                                        
                                    }}
                                    
                                    // markingType={'multi-dot'}
                                    
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

                            {
                                api_data?.data ? api_data?.data.length > 0 && (

                                    <View style={{
                                        backgroundColor:'#3AAD94',
                                        borderTopLeftRadius:100/2,
                                        borderTopRightRadius:100/2,
                                        flex:1,
                                        flexDirection:'row',
                                        alignItems:'center',
                                        justifyContent:'space-around',
                                        padding:20,
                                    }}>
                                        

                                        <View>
                                            
                                            <Text style={{
                                                color:'#fff',
                                                fontSize:18,
                                                fontWeight:'bold',
                                                textAlign:"center",
                                                marginBottom:10
                                            }}>Scheduled Doctor</Text>
                                            
                                            <FlatList
                                                showsHorizontalScrollIndicator={false}
                                                data={api_data?.data}
                                                renderItem={({item, index}) => (
                                                    
                                                    <View>
                                                        {
                                                            api_data?.data[index].type === 'doctor' && (
                                                                
                                                                <View style={{
                                                                    backgroundColor:'#fff',
                                                                    flex:.6,
                                                                    // padding:10,
                                                                    borderRadius:5,
                                                                    marginHorizontal:5,
                                                                    minWidth:200
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
                                                                                backgroundColor:'#fff',
                                                                                borderTopLeftRadius:5,
                                                                                borderTopRightRadius:5,
                                                                                paddingVertical:3,
                                                                                paddingHorizontal:10
                                                                            }}>
                                                                                <Fontisto name="doctor" size={18} color="#3AAD94" />
                                                                                <Text style={{
                                                                                    color:'#1C6353',
                                                                                    fontSize:18,
                                                                                    // marginHorizontal:5
                                                                                }}>
                                                                                    DOCTOR
                                                                                </Text>
                                                                            </View> */}

                                                                            <View style={{
                                                                                paddingHorizontal:10,
                                                                                paddingVertical:7
                                                                            }}>
                                                                                <Text style={{
                                                                                    color:'#1C6353',
                                                                                    fontWeight:'bold',
                                                                                    marginVertical:5,
                                                                                    fontSize:16
                                                                                    }}>{item?.doctor_info?.name}
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
                                                            )
                                                        }

                                                        {
                                                            api_data?.data[index].type === 'nurse' && (
                                                                
                                                                <View style={{
                                                                    backgroundColor:'#fff',
                                                                    flex:.6,
                                                                    // padding:10,
                                                                    borderRadius:5,
                                                                    marginHorizontal:5,
                                                                    minWidth:200
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
                                                                                backgroundColor:'#83b7d6',
                                                                                borderTopLeftRadius:5,
                                                                                borderTopRightRadius:5,
                                                                                paddingVertical:3,
                                                                                paddingHorizontal:10
                                                                            }}>
                                                                            
                                                                                <Fontisto name="nurse" size={20} color="#548CFF" />
                                                                                <Text style={{
                                                                                    color:'#1C6353',
                                                                                    fontSize:18,
                                                                                }}>
                                                                                    NURSE
                                                                                </Text>
                                                                            </View> */}

                                                                            <View style={{
                                                                                paddingHorizontal:10,
                                                                                paddingVertical:7
                                                                            }}>
                                                                                <Text style={{
                                                                                    color:'#1C6353',
                                                                                    fontWeight:'bold',
                                                                                    marginVertical:5,
                                                                                    fontSize:16
                                                                                    }}>
                                                                                    {item?.nurse_info?.name ? item?.nurse_info?.name : 'N/A'}
                                                                                </Text>
                                                                                
                                                                                <Text style={
                                                                                    {color:'#1C6353',
                                                                                    fontSize:13,
                                                                                    fontWeight:'bold'
                                                                                    }}>Date : {item?.appointment_date} 
                                                                                </Text>
                                                                                
                                                                                <Text style={{
                                                                                    color:'#1C6353',
                                                                                    marginTop:5,
                                                                                    fontSize:13,
                                                                                    fontWeight:'bold'}}>Time : {item?.appointment_time}
                                                                                </Text>

                                                                            </View>

                                                                        </View>

                                                                    </TouchableOpacity>

                                                                </View>
                                                            )
                                                        }
                                                    </View>
                                                    
                                                )}
                                                keyExtractor={(item, index) => index.toString()}
                                                horizontal={true}
                                            />
                                        </View>
                                    </View>
                                    
                                ) : (
                                    <View>
                                        <Text style={{
                                            fontSize:16,
                                            fontWeight:'bold',
                                            textAlign:'center',
                                            padding:5
                                        }}>No Appointment Available</Text>
                                    </View>
                                )
                            }     

                            <RBSheet
                                // myLocation
                                ref={refRBSheet}
                                height={450}
                                closeOnDragDown={true}
                                closeOnPressMask={false}
                                customStyles={{
                                    wrapper: {
                                        // backgroundColor: "transparent"
                                    },
                                    draggableIcon: {
                                        // backgroundColor: "#000"
                                    }
                                }}
                            >
                                
                                <View style={{
                                    paddingVertical:10
                                }}>
                                    
                                    <View>
                                        <Text style={{
                                            textAlign:"center",
                                            fontSize:18,
                                            fontWeight:'bold',
                                            padding:7
                                        }}>Select Current Location</Text>
                                    </View>
                                    
                                    <FlatList
                                        data={myLocation}
                                        renderItem={({item, index}) => (
                                            
                                            <View
                                                style={{
                                                    flex: 1,
                                                    // backgroundColor: "#ccc",
                                                    paddingHorizontal: 12,
                                                    paddingVertical: 12
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center'
                                                    }}
                                                >

                                                    <View
                                                        style={{
                                                            flex: .75
                                                        }}
                                                    >
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                console.log(item)
                                                                CurrentLocationUpdate(item)
                                                            }}
                                                        >
                                                            <Text style={{
                                                                fontSize: 14,
                                                                fontWeight:'bold',
                                                                color:'#7C7D7E'
                                                            }}>{item?.location_name}</Text>
                                                            
                                                            <Text style={{
                                                                fontSize:12,
                                                                fontWeight:'bold',
                                                                color:'#7C7D7E'
                                                            }}>
                                                                {
                                                                    item?.thana + ", " + item?.district 
                                                                    + "-" + item?.postal_code
                                                                }
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    <View
                                                        style={{
                                                            flex: .25,
                                                            flexDirection: 'row',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between',
                                                        }}
                                                    >
                                                        <TouchableOpacity
                                                            style={{
                                                                borderRadius:4,
                                                                borderWidth:.5,
                                                                borderColor:'#46bcaa',
                                                                width: 45,
                                                                alignItems: 'center'
                                                            }}
                                                            onPress={() => {
                                                                refRBSheet.current.close();
                                                                navigation.navigate('MapScreen', {params:"drawerHome", item: item, action_type:"update"})
                                                            }}
                                                        >
                                                            <FontAwesome name="edit" size={30} color="#46bcaa" />
                                                        </TouchableOpacity>
                                                        <TouchableOpacity
                                                            style={{
                                                                borderRadius:4,
                                                                borderWidth:.5,
                                                                borderColor:'#f35421',
                                                                width: 45,
                                                                alignItems: 'center'
                                                            }}
                                                            onPress={() => {
                                                                Alert.alert("Remove!", "Are you sure?", [
                                                                    {
                                                                    text: "Cancel",
                                                                    onPress: () => null,
                                                                    style: "cancel"
                                                                    },
                                                                    { text: "YES", onPress: () => locationRemove(item.id, index) }
                                                                ]);
                                                            }}
                                                        >
                                                            <FontAwesome name="remove" size={30} color="#f35421" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                            
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                        extraData={"selectedId"}
                                        ListFooterComponent={
                                            
                                            <View style={{
                                                marginVertical:20,
                                                marginHorizontal:20,
                                                paddingBottom:60
                                            }}>
                                                
                                                <TouchableOpacity 
                                                    style={{
                                                    backgroundColor:'#3AAD94',
                                                    paddingVertical:10,
                                                    paddingHorizontal:20,
                                                    borderRadius:100/2
                                                }}
                                                    onPress={() => {
                                                        refRBSheet.current.close();
                                                        navigation.navigate('MapScreen', {params:"drawerHome"})
                                                    }}
                                                >
                                                    
                                                    <Text style={{
                                                        fontSize:14,
                                                        fontWeight:'bold',
                                                        padding:3,
                                                        textAlign:'center',
                                                        color:'#fff'
                                                    }}>
                                                        Add New
                                                    </Text>

                                                </TouchableOpacity>

                                            </View>
                                        }
                                    />
                                            
                                        
                                </View>

                            </RBSheet>

                        </View>
                        
                    </ScrollView>
                )
            }
            
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    featureItemStyle:{
        backgroundColor:'#FFFFFF',
        width:80,
        height:110,
        borderRadius:10,
        padding:10,
        justifyContent:'space-around',
        alignItems:'center',
        elevation:1
    },
});