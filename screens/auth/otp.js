import React, {useState, useRef, useEffect} from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    StyleSheet, 
    TextInput,
    TouchableOpacity,
    Button
} from 'react-native'

import * as logI from '../../services/api/auth';
import CountDown from 'react-native-countdown-component';
// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
// import firebase from '../../firebase';
import Loader from '../modules/loader';
import * as Storage from '../../services/local_storage/storage';
const OtpScreen = ({navigation, route}) => {

    const isMounted = useRef(true);
    
    const userRole = route.params.user_type;
    const phone_number = route.params.phonecode;
    const [is_loading, setLoading] = useState(false);
    
    // console.log('route_params_from_login', route.params);

    const [code, setCode] = useState("");
    const [time, setTime] = useState(60);
    const recaptchaVerifier = useRef(null);
    const confirmCode = async() => {
        if(isMounted) {
            // setLoading(true)
            let status = await logI.MatchVarificationCode(route.params.status.result, code, route.params.phonecode, route.params.user_type)
            
            let user_data =  await Storage.getItem('user_res');
            let data_from_local = JSON.parse(user_data);
            // console.log('data',data_from_local)
            console.log('stsatatat', status);
            if (status[0].code == 200){
                
                if(userRole === "doctor" && data_from_local.user_type === "old") {
                    navigation.navigate('DoctorTabNavigationRoutes',{screen:'DoctorHome'})
                }
                if (userRole === "doctor" && data_from_local.user_type === "new") {
                    // navigation.navigate('DoctorTabNavigationRoutes',{screen:'DoctorHome'})
                    navigation.navigate('Auth',{screen:'RegisterScreen', params: userRole});
                }
    
                if (userRole === "nurse" && data_from_local.user_type === "new") {
                    // navigation.navigate('NurseTabNavigationRoutes',{screen:'NurseHome'})
                    navigation.navigate('Auth',{screen:'RegisterScreen', params: userRole});
                }
                if (userRole === "nurse" && data_from_local.user_type === "old") {
                    navigation.navigate('NurseTabNavigationRoutes',{screen:'NurseHome'})
                }
    
                if(userRole === "patient" && data_from_local.user_type === "old") {
                    navigation.navigate('Tab',{screen:'DrawerNavigationRoutes'})
                }
                if (userRole === "patient" && data_from_local.user_type === "new") {
                    navigation.navigate('Auth',{screen:'RegisterScreen', params: userRole});
                }
                
                //  if (userRole === "patient") {
                //     navigation.navigate('Tab',{screen:'DrawerNavigationRoutes'})
                // }
                // navigation.navigate('Tab',{screen:'DrawerNavigationRoutes'})
                // navigation.navigate('Auth',{screen:'RegisterScreen'});
            }
            // setLoading(false)
        }
    };

    const sendVerification = async() => {
        if(isMounted) {
            let status = await logI.SendVarificationCode(phone_number)
            // console.log('sttnadadxana=============',status);
            
            if(status.code === 200){
                // navigation.navigate("OtpScreen", { status, phonecode, user_type });
                console.log('phone_number',phone_number)
            }
        }
    };

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#ffffff'}}>
            {
                is_loading ? (
                    <Loader/>
                ) : (
                    
                    <View style={{
                        flex:1,
                        marginVertical:10,
                        marginHorizontal:25,
                        alignItems:'center',
                        justifyContent:'center'
                    }}>
                        <View style={{
                            marginVertical:20,
                            alignItems:'center'
                        }}>
                            <Text style={{
                                fontSize:16,
                                fontWeight:'bold',
                                padding:3
                            }}>
                                We have sent an OTP to
                                your Mobile
                            </Text>
                            <Text style={{
                                fontSize:12,
                                fontWeight:'400',
                                color:'#7C7D7E'
                            }}>
                                Please check your mobile number {phone_number} 
                            </Text>
                        </View>
                        <View style={{
                            marginVertical:20,
                            width:'100%',
                        }}>
                            <TextInput 
                                autoComplete='sms-otp'
                                keyboardType='phone-pad'
                                onChangeText={setCode}
                                placeholder='* * * *'
                                style={{
                                    borderRadius:100/2,
                                    backgroundColor:'#F2F2F2',
                                    padding:5,
                                    textAlign:'center'
                                }}
                            />
                        </View>
                        <View style={{
                            width:'100%'
                        }}>
                            <TouchableOpacity
                                onPress={confirmCode}
                                style={{
                                    backgroundColor:'#3AAD94',
                                    borderRadius:100/2,
                                    padding:10
                                }}
                            >
                                <Text style={{
                                    color:'#fff',
                                    fontWeight:'bold',
                                    fontSize:14,
                                    textAlign:'center'
                                }}>Verify</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginVertical:30}}>
                            
                            {time == 0 ? (
                                <Button
                                    title="Resend"
                                    color="#3AAD94"
                                    onPress={() => {
                                        setTime(60), sendVerification();
                                    }}
                                />
                            ) : (
                                <View>
                                    <Text style={{fontSize:14, fontWeight:'bold',textAlign:'center'}}>
                                        Resend OTP in
                                    </Text>
                                    <CountDown
                                        until={time}
                                        size={12}
                                        onFinish={() => {
                                            setTime(0);
                                        }}
                                        digitStyle={{ backgroundColor: "#FFF" }}
                                        digitTxtStyle={{ color: "#A1A1A1" }}
                                        timeToShow={["M", "S"]}
                                        timeLabels={{ m: "", s: "" }}
                                        showSeparator={true}
                                    />
                                </View>
                            )}
                            {/* <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebase.app().options} /> */}

                            {/* <Text style={{color:'#707070',textAlign:'center',fontWeight:'bold'}}>00 : 15</Text>
                            <Text style={{color:'#707070',textAlign:'center', marginVertical:5}}>
                                Didn't Receive? 
                                <Text style={{color:'#3AAD94',fontWeight:'bold'}}>Resend OTP</Text>
                            </Text> */}
                        </View>
                        
                    </View>
                    
                )
            }
            
        </SafeAreaView>
    )
}

export default OtpScreen;
