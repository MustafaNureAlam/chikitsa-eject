import React, {useState, useCallback, useRef} from 'react'
import { 
    View, 
    Text, 
    ScrollView, 
    SafeAreaView, 
    StatusBar, 
    Image, 
    TouchableOpacity,
    Alert,
    BackHandler
} from 'react-native'
import { AntDesign, FontAwesome  } from '@expo/vector-icons';
import masterCardLogo from '../../assets/master.png';
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import token from '../../services/local_storage/storage';
import Loader from '../modules/loader';
import config from '../../services/config';
import { Modal, Portal, Button, Provider, RadioButton } from 'react-native-paper';
import { Root, Popup } from 'popup-ui'
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';

export default function PaymentScreen({navigation, route}) {

    const isMounted = useRef(true);
    const [disable_cod, seDisableCod] = useState(false);
    const [disable_card, seDisableCard] = useState(false);
    const [payment, setPayment] = useState("");


    // console.log('============from checkout----=============')
    // console.log(route)
    // console.log('============from checkout----=============')
 

    useFocusEffect(
        useCallback(() => {
            console.log("%%%%%%%%%%%%%%%%%%%%%%%")
            console.log(route?.params)
            console.log("%%%%%%%%%%%%%%%%%%%%%%%")
            if(isMounted.current){
                setIsPay(false)
                if(route?.params?.minimum_advance > 0 ) {
                    seDisableCard(false);
                    seDisableCod(true);
                    setPayment("card");
                } else{
                    seDisableCard(true);
                    seDisableCod(false);
                    setPayment("cod");
                }
            }

            const onBackPress = () => {
                Alert.alert("CANCEL!", "Are you sure you want to cancel ?", [
                    {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                    },
                    { text: "YES", onPress: () => navigation.navigate('DrawerHomeScreen') }
                ]);
                return true;
            };
        
            // Add Event Listener for hardwareBackPress
            BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return() => {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    onBackPress
                );

                console.log('payment_returned')
                isMounted.current = false;
            }
          
        }, [])
    );

    

    

    const [visible, setVisible] = useState(false);
    const [mob_visible, setMobVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    const showMobileModal = () => setMobVisible(true);
    const hideMobileModal = () => setMobVisible(false);
    const mobileContainerStyle = {backgroundColor: 'white', padding: 20};

      
    const appoint_object = route.params;
    // console.log('payment----===========');
    // console.log('payment----===========',appoint_object);
    // console.log('payment----===========');
    
    const [api_data, setApidata] = useState(null);
    const [is_loading, setLoading] = useState(false);
    const [checked, setChecked] = useState('current');
    
    const [getwayUrl, setGetwayURL] = useState("");
    const [isPay, setIsPay] = useState(false);
    const [appointmentId, SetAppointmentId] = useState("");
    

    

    console.log(route.params?.type)
    
    async function transfer_money_call() {

        // console.log("MAMAMAMAMA")
        let end_point;
        let raw;
        if(route.params?.type === "nurse") {
            end_point = config.baseUrl + "nurse_appointment_create"

            raw = JSON.stringify({
                "patient_user_id": "1",
                "nurse_user_id": appoint_object?.doctor_user_id,
                "slot_id": route.params.slot_id,
                "appointment_date": appoint_object?.appointment_date,
                "appointment_time": appoint_object?.appointment_time,
                "appointment_type": "conselt",
                "patient_alert_by": "push_notification"
            });
        } else if(route.params?.type === "doctor") {
            end_point = config.baseUrl + "doctor_appointment_create"

            raw = JSON.stringify({
                "patient_user_id": "1",
                "doctor_user_id": appoint_object?.doctor_user_id,
                "slot_id": route.params.slot_id,
                "appointment_date": appoint_object?.appointment_date,
                "appointment_time": appoint_object?.appointment_time,
                "appointment_type": "conselt",
                "patient_alert_by": "push_notification"
            });

        }
        // console.log('api_response', route);
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        console.log(end_point)
        await fetch( end_point, requestOptions)
        .then(response => response.text())
        .then(result => {

            let api_response = JSON.parse(result)
            console.log("&*&*&*&*&*&*&")
            console.log(api_response)
            console.log("&*&*&*&*&*&*&")
            if(api_response.data.status == "pending"){
                SetAppointmentId(api_response.data.id)
                if(payment === 'card') {

                    redirect_to_getway()
                }else{
                    Popup.show({
                        type: 'Success',
                        title: 'Appointment created',
                        button: true,
                        textBody: 'Congrats! successfully created Appointment',
                        buttonText: 'Ok',
                        callback: () => {
                            Popup.hide()

                            navigation.navigate('DrawerHomeScreen',api_response);
                        },
                        
                    })
                    
                }
            }
            if(api_response.status == 200) {
                console.log("######################")
                console.log(api_response)
                SetAppointmentId(api_response.data.id)
                console.log("######################")
                if(payment === 'card') {

                    redirect_to_getway()
                }else{
                    Popup.show({
                        type: 'Success',
                        title: 'Appointment created',
                        button: true,
                        textBody: 'Congrats! successfully created Appointment',
                        buttonText: 'Ok',
                        callback: () => {
                            Popup.hide();
                            navigation.dispatch(
                                CommonActions.navigate({
                                  name: 'DrawerHomeScreen',
                                  params: api_response
                                })
                            );
                            // navigation.navigate('DrawerHomeScreen',api_response);
                        },
                        
                    })
                    
                }
                console.log(api_response)
            }else{
                Popup.show({
                    type: 'Danger',
                    title: 'Failed to create',
                    textBody:
                        'Sorry! can not complete your request right now. Please try after a while.',
                    buttontext: 'Try again',
                    callback: () => Popup.hide(),
                })
            }
            setLoading(true)
            setApidata(api_response);
            // navigation.navigate('DrawerHomeScreen',api_response);
            setLoading(false);
        })
        .catch(error => console.log('error', error));
    }
    

    async function remove_appointment() {
        let results = [];
        let end_point;

        if(route.params?.type === "nurse") {
            end_point = config.baseUrl + "patient/nurse_appointment_delete"
        }else if(route.params?.type === "doctor") {
            end_point = config.baseUrl + "patient/doctor_appointment_delete"
        }

        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        raw = JSON.stringify({
            "appointment_id": appointmentId,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(end_point, requestOptions)
            .then(response => response.text())
            .then(result => {
                let api_response = JSON.parse(result)
                results.push(api_response);
            })
            .catch(error => {
                console.log('error', error);
                results.push(error);
            });

        return results;
    }
    
    
    async function redirect_to_getway() {
        // console.log('api_response', route);
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        let end_point;
        
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "total_amount": route?.params?.minimum_advance,
            "trans_id": "appointment_id"+appointmentId,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        

        if(route.params?.type === "nurse") {
            end_point = config.baseUrl + "nurse/payment"
        }else if(route.params?.type === "doctor"){
            end_point = config.baseUrl + "doctor/payment"
        }
        
        await fetch(end_point, requestOptions)
        .then(response => response.text())
        .then(async(result) => {
            let api_response = JSON.parse(result)
            console.log("api_response")
            console.log(api_response)
            console.log("api_response")
            setIsPay(true);
            // await WebBrowser.openBrowserAsync(api_response.session_url);
            setGetwayURL(api_response.session_url);
        })
        .catch(error => console.log('error', error));
    }

    
    function payment_method(pay_type) {
        setPayment(pay_type)
        console.log('pay_type', pay_type)

        if(pay_type === 'card') {
            setVisible(true)
        } else if(pay_type === 'mobile') {
            setMobVisible(true)
        }
    }

    const onNavigationStateChange = (webViewState) => {
        console.log("-----------")
        console.log("-----------")
        console.log(webViewState.url)
        console.log("-----------")
        if(webViewState.url.includes(config.baseUrl+'doctor/ssl-commerz-success')) {
            Popup.show({
                type: 'Success',
                title: 'Appointment created',
                button: true,
                textBody: 'Congrats! successfully created Appointment',
                buttonText: 'Ok',
                callback: () => {
                    Popup.hide();
                    setIsPay(false);
                    navigation.dispatch(
                        CommonActions.navigate({
                          name: 'DrawerHomeScreen',
                          params: api_data
                        })
                    );
                    // navigation.dispatch(
                    //     CommonActions.navigate({
                    //       index: 1,
                    //       routes: [
                    //         { name: 'DrawerHomeScreen' }
                    //       ],
                    //     })
                    // );
                    // navigation.navigate('DrawerHomeScreen',api_data);
                },
                
            })
        }
        
        if(webViewState.url.includes(config.baseUrl+'doctor/ssl-commerz-fail')) {
            remove_appointment()
            Popup.show({
                type: 'Danger',
                title: 'Failed!',
                button: true,
                textBody: 'Please try again!',
                buttonText: 'Ok',
                callback: () => {
                    Popup.hide();
                    setIsPay(false);
                    navigation.dispatch(
                        CommonActions.navigate({
                          name: 'DrawerHomeScreen',
                          params: api_data
                        })
                    );
                    // navigation.navigate('DrawerHomeScreen',api_data);
                },
                
            })
        }
        
        if(webViewState.url.includes(config.baseUrl+'doctor/ssl-commerz-cancel')) {
            remove_appointment()
            Popup.show({
                type: 'Danger',
                title: 'Canceled!',
                button: true,
                textBody: 'Please try again!',
                buttonText: 'Ok',
                callback: () => {
                    Popup.hide();
                    setIsPay(false);
                    navigation.dispatch(
                        CommonActions.navigate({
                          name: 'DrawerHomeScreen',
                          params: api_data
                        })
                    );
                    // navigation.navigate('DrawerHomeScreen',api_data);
                },
                
            })
        }
    };

    

    return (
        <Root>
            {
                isPay ? (
                    <WebView 
                        source={{ uri: getwayUrl }}
                        onNavigationStateChange={onNavigationStateChange}
                        javaScriptEnabled
                        domStorageEnabled
                        startInLoadingState={false}
                        style={{ flex: 1 }}
                        scrollEnabled
                        nestedScrollEnabled
                    />
                ) : (
                    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
                        <StatusBar backgroundColor={'#075141'}/>
                            {
                                is_loading ? (
                                    <Loader/>
                                ) : (
                                    <ScrollView 
                                        showsVerticalScrollIndicator={false}
                                    >
                                        <View style={{
                                            flex: 1, 
                                            marginHorizontal:15
                                        }}>
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                marginTop: 20,
                                                alignItems:'center'
                                            }}>
                                                {/* <Text style={{
                                                    fontWeight:'bold',
                                                    fontSize:14,
                                                    color:'#737373'
                                                }}>2 reports for delivery</Text>
                                                    <View style={{
                                                        alignItems: 'flex-end'
                                                    }}>
                                                        <Text style={{
                                                            fontSize:14,
                                                            fontWeight:'bold',
                                                            color:'#737373'
                                                        }}>TOTAL</Text>
                                                        <Text style={{
                                                            fontSize: 16
                                                        }}>BDT 400.00</Text>
                                                    </View> */}
                                            </View>
                                            
                                            {/* <View>
                                                <Text style={{
                                                    fontSize: 16,
                                                    marginBottom: 15,
                                                    fontWeight:'bold'
                                                }}>Delivery Address</Text>

                                                <View style={{ flex:1,
                                                    borderWidth: .5,
                                                    borderColor: '#737373', 
                                                    borderRadius: 8,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    padding: 15,
                                                    marginBottom: 10
                                                    }}>
                                                    <View style={{
                                                        flexDirection: 'row'
                                                    }}>
                                                        <View style={{alignItems:'center',justifyContent:"center"}}>
                                                            <RadioButton
                                                                value="current"
                                                                status={ checked === 'current' ? 'checked' : 'unchecked' }
                                                                onPress={() => setChecked('current')}
                                                            />
                                                        </View>
                                                        <View style={{
                                                            marginLeft: 10 
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 16,
                                                                fontWeight:'bold',
                                                                paddingVertical:5
                                                            }}>Current Location</Text>
                                                            <Text style={{
                                                                color: '#737373',
                                                                fontSize:13,
                                                            }}>(+88) 018790-31684</Text>
                                                            <Text style={{
                                                                color: '#737373',
                                                                fontSize:13,
                                                                paddingVertical:3
                                                            }}>Banani road 8 house 9</Text>
                                                        </View>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity>
                                                            <AntDesign name="edit" size={24} color="#737373" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>

                                                <View style={{ flex:1,
                                                    borderWidth: .5,
                                                    borderColor: '#737373', 
                                                    borderRadius: 8,
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    padding: 15,
                                                    marginBottom: 10
                                                    }}>
                                                    <View style={{
                                                        flexDirection: 'row'
                                                    }}>
                                                        <View  style={{alignItems:'center',justifyContent:"center"}}> 

                                                            <RadioButton
                                                            value="home"
                                                            status={ checked === 'home' ? 'checked' : 'unchecked' }
                                                            onPress={() => setChecked('home')}
                                                            />
                                                        </View>
                                                        <View style={{
                                                            marginLeft: 10 
                                                        }}>
                                                            <Text style={{
                                                                fontSize:16,
                                                                paddingVertical:5,
                                                                fontWeight:"bold"
                                                            }}>Home</Text>
                                                            <Text style={{
                                                                color: '#737373',
                                                                fontSize:13,
                                                            }}>(+88) 018790-31684</Text>
                                                            <Text style={{
                                                                color: '#737373',
                                                                fontSize:13,
                                                                paddingVertical:3
                                                            }}>Uttara sector 1, road 8 house 7</Text>
                                                        </View>
                                                    </View>
                                                    <View>
                                                        <TouchableOpacity>
                                                            <AntDesign name="edit" size={24} color="#737373" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>

                                                <TouchableOpacity>
                                                    <View style={{
                                                        flex: 1,
                                                        justifyContent: 'flex-end',
                                                        flexDirection: 'row',
                                                        alignItems: 'center'
                                                    }}>
                                                        <Text style={{
                                                            marginHorizontal:3,
                                                            alignItems:'center'
                                                        }}>
                                                            <FontAwesome name="plus" size={18} color="#3AAD94" />
                                                        </Text>
                                                        <Text style={{
                                                            fontSize: 16,
                                                            color: '#3AAD94',
                                                            fontWeight:'bold'
                                                        }}>Add more</Text>
                                                    </View>
                                                </TouchableOpacity>

                                            </View> */}
                                            
                                            
                                            
                                            <View>
                                                <Text style={{
                                                    fontSize: 16,
                                                    marginBottom: 15,
                                                    fontWeight:'bold'
                                                }}>Payment method</Text>
                                                

                                                <View style={{flex:1}}>
                                                    <RadioButton.Group 
                                                        onValueChange={(pay_value) => {
                                                            console.log(pay_value)
                                                            setPayment(pay_value)
                                                            // payment_method(pay_value)

                                                        }} 
                                                        value={payment}
                                                    >
                                                        
                                                        <View style={{
                                                            flexDirection:'row',
                                                            justifyContent:'space-between',
                                                            backgroundColor:'#ECECEC',
                                                            alignItems:'center',
                                                            padding:5,
                                                            borderRadius:5
                                                        }}>
                                                            <Text style={{
                                                                color:'#737373',
                                                                fontWeight:'bold',
                                                                fontSize:14,
                                                                padding:5
                                                            }}>Cash on delivery</Text>
                                                            <RadioButton 
                                                                value="cod"
                                                                disabled={disable_cod}
                                                            />
                                                        </View>
                                                        
                                                        <View style={{
                                                            flexDirection:'row',
                                                            justifyContent:'space-between',
                                                            alignItems:'center',
                                                            padding:5,
                                                            borderRadius:5,
                                                            marginTop:7,
                                                            backgroundColor:'#ECECEC',
                                                        }}>
                                                            <Text style={{
                                                                color:'#737373',
                                                                fontWeight:'bold',
                                                                fontSize:14,
                                                                padding:5
                                                            }}>Pay Now</Text>
                                                            <RadioButton value="card" disabled={disable_card} />
                                                        </View>
                                                        
                                                        {/* <View style={{
                                                            flexDirection:'row',
                                                            justifyContent:'space-between',
                                                            alignItems:'center',
                                                            padding:5,
                                                            borderRadius:5,
                                                            marginTop:7,
                                                            backgroundColor:'#ECECEC',
                                                        }}>
                                                            <Text style={{
                                                                color:'#737373',
                                                                fontWeight:'bold',
                                                                fontSize:14,
                                                                padding:5
                                                            }}>Mobile payment</Text>
                                                            <RadioButton value="mobile" />
                                                        </View> */}

                                                    </RadioButton.Group>
                                                </View>
                                            </View>

                                            <View style={{
                                                // justifyContent:'center',
                                                // alignItems:'center',
                                                marginVertical:20,
                                            }}>
                                                <TouchableOpacity
                                                    style={{
                                                        backgroundColor: '#3AAD94',
                                                        paddingHorizontal:25,
                                                        paddingVertical:10,
                                                        borderRadius:100/2
                                                    }}
                                                    onPress={() => 
                                                        {
                                                            transfer_money_call()
                                                            // console.log('payment_method',payment)
                                                        }
                                                    }
                                                >
                                                    <Text 
                                                        style={{
                                                            color: '#FFF',
                                                            textAlign: 'center',
                                                            fontSize: 16,
                                                            fontWeight:'bold',
                                                        }}>
                                                        Next
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </ScrollView>
                                )
                            }
                        
                        {/* card payment */}
                        <Provider>
                            <Portal>
                                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                    <View style={{}}>
                                        <TouchableOpacity>
                                            <Image source={masterCardLogo} resizeMode="contain" />
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </Portal>
                        </Provider>

                        {/* mobile payment */}
                        <Provider>
                            <Portal>
                                <Modal visible={mob_visible} onDismiss={hideMobileModal} contentContainerStyle={mobileContainerStyle}>
                                <Text>Mobile modal</Text>
                                </Modal>
                            </Portal>
                        </Provider>
                    </SafeAreaView>
                )
            }
        </Root>
    )
}