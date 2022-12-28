import React, { useState, useRef, useEffect } from 'react'
import { 
    View, 
    Text, 
    Image, 
    TextInput, 
    SafeAreaView, 
    ScrollView, 
    TouchableOpacity, 
    StyleSheet
} from 'react-native';
import logo from '../../assets/Chikitsa_Logo.png'
import * as logI from '../../services/api/auth';
// import firebase from '../../firebase';
// import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import PhoneInput from 'react-native-phone-number-input';
import SelectDropdown from 'react-native-select-dropdown';
import { ToggleButton } from 'react-native-paper';
import * as Storage from '../../services/local_storage/storage';

const  LoginScreen = ({navigation, route}) => {
    const isMounted = useRef(true);
    const [phoneNumber, setPhoneNumber] = useState("");
    const recaptchaVerifier = useRef(null);
    const phoneInput = useRef(null);
    const [phonecode, setCode] = useState('');
    
    const [user_type, setUsertype] = useState('patient');
    
    const [btn_bg, setBtnBg] = useState('#3AAD94');
    const [btn_color, setBtnColor] = useState('#fff');
    
    const [btn_bg_doc, setBtnBgDoc] = useState('#ffffff');
    const [btn_color_doc, setBtnColorDoc] = useState('#000');

    const [btn_bg_nurse, setBtnBgNurse] = useState('#ffffff');
    const [btn_color_nurse, setBtnColorNurse] = useState('#000');

    // useEffect(() => {
    //     if(isMounted) {
    //         sendVerification();
    //     }
    //     return () => {
    //         isMounted.current = false
    //     }
    // }, [])

    const sendVerification = async() => {
        if(isMounted) {
            console.log("HIIIIIIIIIIIIIIIIIIiiii")
            let status = await logI.BackendLogin(phonecode, user_type)
            
            console.log('user_type',status);
            if(status.code === 200){
                navigation.navigate("OtpScreen", { status, phonecode, user_type });
                // await Storage.save('user_role', user_type)
                // console.log(type)
            }
        }
    };


    return (
        <SafeAreaView style={{
            flex:1,
            // justifyContent:'center',
            // alignItems:'center',
            // flexDirection:'column',
            backgroundColor:'#FFFFFF',
            }}>
            <ScrollView>
                <View style={{
                    padding:10
                }}>
                    <View style={{marginVertical:10, alignItems:'center'}}>
                        <Image source={logo} style={{ width: 140, height: 140}}
                                resizeMode={'contain'}/>
                    </View>
                    <Text style={{
                        fontSize:18, 
                        fontWeight:'bold', 
                        textAlign:'center',
                        color:'#4A4B4D'
                        }}>LOGIN
                    </Text>
                    <View style={{marginVertical:20}}> 
                        
                        <Text style={{
                            fontSize:14, 
                            fontWeight:'400', 
                            textAlign:'center',
                            color:'#7C7D7E',
                            // marginVertical:10
                            }}>Enter phone number and continue
                        </Text>
                        <View style={{
                            justifyContent:'center',
                            alignItems:'center',
                            marginTop:5
                        }}>
                            {/* <SelectDropdown
                                defaultButtonText='Login as'
                                buttonStyle={{width:'60%',borderRadius:100/2}}
                                buttonTextStyle={{fontSize:14,fontWeight:"bold",color:'#3AAD94'}}
                                // data={schedule_data?.data[0]?.slots}
                                data={['Doctor', 'Patient']}
                                onSelect={(selectedItem, index) => {
                                    setUsertype(selectedItem)
                                    // console.log(selectedItem, index)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item
                                }}
                            /> */}
                            <Text style={{
                                fontSize:14,
                                fontWeight:'bold',
                                padding:5,
                                marginVertical:8
                            }}>Login as</Text>
                            
                            <ToggleButton.Row 
                                onValueChange={value => {
                                    setUsertype(value)
                                    console.log(value);
                                    if(value === "patient") {
                                        setBtnBg('#3AAD94');
                                        setBtnColor('#fff')
                                        
                                        setBtnBgDoc('#ffffff');
                                        setBtnBgNurse('#ffffff');

                                        setBtnColorDoc('#000');
                                        setBtnColorNurse('#000')
                                    } else if(value === "doctor"){
                                        setBtnBg('#ffffff');
                                        setBtnColor('#000')

                                        setBtnBgDoc('#3AAD94');
                                        setBtnColorDoc('#fff')
                                        
                                        setBtnBgNurse('#ffffff');
                                        setBtnColorNurse('#000')

                                    }else if(value === "nurse"){
                                        setBtnBg('#ffffff');
                                        setBtnColor('#000')

                                        setBtnBgDoc('#ffffff');
                                        setBtnColorDoc('#000');

                                        setBtnBgNurse('#3AAD94');
                                        setBtnColorNurse('#fff')

                                    }
                                }} 
                                value={user_type}
                                // style={{
                                    
                                // }}
                                
                            >
                                
                                <ToggleButton 
                                    
                                    style={{minWidth:100,marginHorizontal:3,backgroundColor : btn_bg }}
                                    icon={()=>
                                        <View>
                                            <Text style={{color: btn_color,fontSize:12,fontWeight:'bold'}}>Patient</Text>
                                        </View>} value="patient" 
                                />

                                <ToggleButton 
                                    style={{minWidth:100,marginHorizontal:3, borderLeftWidth:.3, backgroundColor : btn_bg_doc}}
                                    icon={()=>
                                        <View>
                                            <Text style={{color: btn_color_doc,fontSize:12,fontWeight:'bold'}}>Doctor</Text>
                                        </View>
                                    } value="doctor" 
                                />

                                <ToggleButton 
                                    style={{minWidth:100,marginHorizontal:3, borderLeftWidth:.3,backgroundColor : btn_bg_nurse }}
                                    icon={()=>
                                        <View>
                                            <Text style={{color: btn_color_nurse,fontSize:12,fontWeight:'bold'}}>Med. Assistant</Text>
                                        </View>
                                    } value="nurse" 
                                />

                            </ToggleButton.Row>
                        </View>

                        <View style={{
                            marginVertical:7,
                            marginHorizontal:20
                        }}>

                            <View style={{
                                marginVertical:12
                            }}>
                                <PhoneInput
                                    ref={phoneInput}
                                    defaultValue={phonecode}
                                    defaultCode="BD"
                                    layout="first"
                                    autoFocus
                                    onChangeFormattedText={text => {
                                        setCode(text);
                                    }}  
                                    
                                />
                            </View>

                            {/* <TextInput 
                                keyboardType='phone-pad'
                                placeholder='017xxxx' 
                                style={{
                                    padding:4,
                                    borderRadius:100/2,
                                    textAlign:'center',
                                    backgroundColor:'#F2F2F2'
                                }} 
                                onChangeText={setPhoneNumber} 
                                value={phoneNumber}
                            /> */}
                            <TouchableOpacity 
                                onPress={sendVerification}
                                style={{
                                    backgroundColor:'#3AAD94',
                                    borderRadius:100/2,
                                    padding:12,
                                    marginVertical:10
                                }}
                            >
                                <Text style={{
                                    textAlign:'center',
                                    padding:3,
                                    color:'#fff',
                                    fontWeight:'bold'
                                }}>Continue</Text>
                            </TouchableOpacity>
                            <View style={{marginVertical:15}}>
                                {/* <TouchableOpacity 
                                    style={{
                                        backgroundColor:'#367FC0',
                                        borderRadius:100/2,
                                        padding:7,
                                        marginVertical:5,
                                    }}
                                >
                                    <Text style={{
                                        textAlign:'center',
                                        padding:3,
                                        color:'#fff',
                                        fontWeight:'bold'
                                    }}>Login with Facebook</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{
                                        backgroundColor:'#DD4B39',
                                        borderRadius:100/2,
                                        padding:7,
                                        marginVertical:5
                                    }}
                                >
                                    <Text style={{
                                        textAlign:'center',
                                        padding:3,
                                        color:'#fff',
                                        fontWeight:'bold'
                                    }}>Login with Google</Text>
                                </TouchableOpacity> */}
                                {/* <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebase.app().options} /> */}
                            </View>
                        </View>
                            
                    </View>
                </View>
                
            </ScrollView>
            
            
        </SafeAreaView>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    
})
