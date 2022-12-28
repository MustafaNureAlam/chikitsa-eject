import React, { useState, createRef, useEffect } from "react";
import { 
    StyleSheet, 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    ScrollView, 
    SafeAreaView, 
    Switch,
    Platform 
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import app_config from "../../services/config";
import default_image from "../../assets/user_avatar.png";
import token from '../../services/local_storage/storage';
import { RadioButton, TextInput } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const RegisterScreen = ({ navigation, props, route }) => {

    const [image, setImage] = useState(null);
    const check_user = route.params;
    console.log('====================check_user====',typeof(check_user))
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    const [firstName, setFirstName] = useState("");
    const [refferCode, setRefferCode] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [profession, setProfession] = useState("");
    const [gender, setGender] = useState('Male');
    const [resType, setResType] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState("");
    const [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
    const [api_data, setApidata] = useState(null);

    const [doc_licence, setLicence] = useState("");

    const user_profile_data = {
        name: firstName,
        dob: birthday,
        gender: gender,
        profession: profession
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        var newstr = date.toString();
        // console.log('str',newstr)

        var newdate = newstr.substr(4, 12);
        // console.log("new"+ newdate);
        // setDate(date)
        setBirthday(newdate);
        console.log("A date has been picked=========: ", typeof(date));
        hideDatePicker();
    };


    async function registerfn(){
        let user_token = await token.getItem("token");
        // console.log('hihihihih',user_profile_data);
        try{
            await token.getItem("token").then(async (token) => {
                console.log('token from auth', token)
                var myHeaders = new Headers({
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer ' +token
                });

                
                let formData = new FormData();

                let localUri;
                let filename;
                let match;
                let type;

                if(image == null){
                    const image = Image.resolveAssetSource(default_image).uri
                    const myArr = image.split("?");

                    localUri = myArr[0];
                    filename = "user.png";
                    type = "image/png";

                }else{
                    localUri = image;

                    filename = localUri.split('/').pop();
                    
                    match = /\.(\w+)$/.exec(filename);
                    type = match ? `image/${match[1]}` : `image`;
                }
    
                formData.append('name',  firstName);
                // formData.append('refer_code',  refferCode);
                // formData.append('language',  resType );
                // formData.append('login_by',  login_by );
                formData.append('email',  userEmail );
                formData.append('dob',  birthday );
                formData.append('gender',  gender );
                formData.append('profession',  profession );
                formData.append('license_number',  doc_licence );
                formData.append('user_pic', { uri: localUri, name: filename, type });
    
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formData,
                    redirect: 'follow'
                };
                // console.log("sgjhghsjkjx", requestOptions)
                await fetch(app_config.baseUrl+"doctor/profile_update", requestOptions)
                    .then(response => response.text())
                    .then(async(result) => {
                            let user_data_response = JSON.parse(result);
                            setApidata(user_data_response);
                            console.log('user_data_response', user_data_response)
                            if(check_user === "patient") {
                                navigation.navigate('Tab',{screen:'DrawerNavigationRoutes'})
                            } else if(check_user === 'doctor') {
                                navigation.navigate('DoctorTabNavigationRoutes',{screen:'DoctorHome'})
                            } else if(check_user === 'nurse') {
                                navigation.navigate('NurseTabNavigationRoutes',{screen:'NurseHome'})
                            }
                        
                    })
                    .catch(error => console.log('error', error));
            })
        } catch (error) {
            console.error(error);
        }
        


        // var myHeaders = new Headers();
        // myHeaders.append("Authorization", "Bearer " + user_token);
        // myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify(user_profile_data);

        // var requestOptions = {
        // method: 'POST',
        // headers: myHeaders,
        // body: raw,
        // redirect: 'follow'
        // };

        // fetch(app_config.baseUrl + "doctor/profile_update", requestOptions)
        // .then(response => response.text())
        // .then(result => {
        
        // })
        // .catch(error => console.log('error', error));
        
    }
    const emailInputRef = createRef();
    const passwordInputRef = createRef();

    //image picker

    const pickImage = async () => {
        
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need storage permissions to make this work!');
            } else{
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });

                console.log(result);

                if (!result.cancelled) {
                    setImage(result.uri);
                }
            }
          }
       


        
    };

    // const handleSubmitButton = () => {
    //     setErrortext("");
    //     if (!firstName) {
    //         alert("Please fill first Name");
    //         return;
    //     }
    //     if (!lastName) {
    //         alert("Please fill last Name");
    //         return;
    //     }
    //     if (!userEmail) {
    //         alert("Please fill Email");
    //         return;
    //     }
    //     if (!userPassword) {
    //         alert("Please fill Password");
    //         return;
    //     }
    //     //Show Loader
    //     setLoading(true);
    //     
    //     var formBody = [];
    //     for (var key in dataToSend) {
    //         var encodedKey = encodeURIComponent(key);
    //         var encodedValue = encodeURIComponent(dataToSend[key]);
    //         formBody.push(encodedKey + "=" + encodedValue);
    //     }
    //     formBody = formBody.join("&");

    //     fetch("http://localhost:3000/api/user/register", {
    //         method: "POST",
    //         body: formBody,
    //         headers: {
    //             //Header Defination
    //             "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    //         },
    //     })
    //         .then((response) => response.json())
    //         .then((responseJson) => {
    //             //Hide Loader
    //             setLoading(false);
    //             console.log(responseJson);
    //             // If server response message same as Data Matched
    //             if (responseJson.status === "success") {
    //                 setIsRegistraionSuccess(true);
    //                 console.log("Registration Successful. Please Login to proceed");
    //             } else {
    //                 setErrortext(responseJson.msg);
    //             }
    //         })
    //         .catch((error) => {
    //             //Hide Loader
    //             setLoading(false);
    //             console.error(error);
    //         });
    // };
    // if (isRegistraionSuccess) {
    //     return (
    //         <View
    //             style={{
    //                 flex: 1,
    //                 // backgroundColor: '#F9FAFE',
    //                 justifyContent: "center",
    //                 width: 320,
    //                 borderRadius: 10,
    //                 alignSelf: "center",
    //             }}
    //         >
    //             <Text style={styles.successTextStyle}>Registration Successful</Text>
    //             <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5} onPress={() => navigation.navigate("LoginScreen")}>
    //                 <Text style={styles.buttonTextStyle}>Login Now</Text>
    //             </TouchableOpacity>
    //         </View>
    //     );
    // }
    return (
        <SafeAreaView style={styles.mainBody}>
            {/* <Loader loading={loading} /> */}
            <ScrollView style={{ height: "100%" }}>
                <View style={{ justifyContent: "space-between", flex: 1, paddingVertical: 40 }}>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Text style={styles.loginTxt}>Register</Text>
                    </View>
                    <View style={styles.registerArea}>
                        <View style={styles.SectionStyle}>
                            
                            <View style={{ width: "100%" }}>
                                <TextInput
                                    label="Name"
                                    value={firstName}
                                    onChangeText={(firstName) => setFirstName(firstName)}
                                    mode={'flat'}
                                    activeUnderlineColor={'#3AAD94'}
                                    autoCapitalize="sentences"
                                    returnKeyType="next"
                                    onSubmitEditing={() => emailInputRef.current && emailInputRef.current.focus()}
                                    // blurOnSubmit={false}
                                />
                            </View>


                        </View>
                        
                        <View style={styles.SectionStyle}>
                            
                            {
                                check_user === "doctor" && (
                                
                                <View style={{marginVertical:7, width: "100%"}}>
                                    <TextInput
                                        label="Licence no."
                                        value={doc_licence}
                                        onChangeText={licence => setLicence(licence)}
                                        mode={'flat'}
                                        activeUnderlineColor={'#3AAD94'}
                                    />
                                </View>

                                )
                            }


                        </View>

                        <View style={{
                            flexDirection:'row',
                            alignItems:"center",
                            justifyContent:'space-between',
                            marginTop:10,
                            borderWidth:.7,
                            borderColor:'#70707b',
                            paddingHorizontal:15,
                            paddingVertical:10,
                            borderRadius:5,
                            marginBottom:5,
                            // marginHorizontal:10,
                            width:'90%',
                        }}>
                            <Text style={{
                                fontSize:16,
                                fontWeight:'bold',
                                color:'#70707b'
                            }}>Gender</Text>
                            <RadioButton.Group  onValueChange={newValue => setGender(newValue)} value={gender}>
                                <View style={{flexDirection:'row',marginHorizontal:7}}>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <RadioButton value="Male" />
                                        <Text style={styles.radioTxtStyle}>Male</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <RadioButton value="Female" />
                                        <Text style={styles.radioTxtStyle}>Female</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <RadioButton value="Other" />
                                        <Text style={styles.radioTxtStyle}>Other</Text>
                                    </View>
                                </View>
                            </RadioButton.Group>
                        </View>

                        <View style={styles.SectionStyle}>
                            <View style={{width:'100%'}}>
                                <TextInput
                                    label="Profession"
                                    onChangeText={(user_profession) => setProfession(user_profession)}
                                    underlineColorAndroid="#f000"
                                    keyboardType="default"
                                    // ref={emailInputRef}
                                    returnKeyType="next"
                                    mode={'flat'}
                                    activeUnderlineColor={'#3AAD94'}
                                    autoCapitalize="sentences"
                                    // onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                                    // blurOnSubmit={false}
                                />
                            </View>
                        </View>

                        <View style={[styles.SectionStyle,{paddingTop:10}]}>
                            <View style={{ width: "50%", paddingRight: 5, flex: 1, justifyContent: "center" }}>
                                <Text style={styles.textStyle}>Photo</Text>
                            </View>
                            <View style={{ width: "50%", paddingLeft: 5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                                    
                                    <TouchableOpacity
                                        onPress={pickImage}
                                        style={{
                                            backgroundColor: "#F5F6FA",
                                            borderRadius: 10,
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 1,
                                            },
                                            shadowOpacity: 0.7,
                                            shadowRadius: 1.41,
                                            elevation: 1,
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                        }}
                                    >
                                        <Text style={{ color: "#000",fontWeight:'bold' }}>Upload</Text>
                                    </TouchableOpacity>
                                    {image && <Image source={{ uri: image }} style={{ width: 50, height: 50, borderRadius: 25 }} />}
                                </View>
                            </View>
                        </View>

                    </View>

                    <View style={{marginTop:7, flex:1, marginHorizontal:20 }}>
                        <TouchableOpacity 
                            style={{
                                flex: 1,
                                borderWidth:1,
                                paddingHorizontal:10,
                                paddingVertical:16,
                                borderRadius:3,
                                borderColor:'#707070',
                            }}
                            onPress={showDatePicker}
                        >
                            <Text style={{
                                color:'#707070',
                                fontSize:16,
                                fontWeight:'500'
                            }}>
                                {birthday ? birthday : 'Birthday'}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop:20 }}>
                        <TouchableOpacity 
                            style={{
                                backgroundColor:'#3AAD94',
                                padding:10,
                                marginHorizontal:20,
                                borderRadius:10,
                            }} 
                            onPress={() => { registerfn() }}>

                                <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" }}>Next</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            // date={birthday}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
export default RegisterScreen;

const styles = StyleSheet.create({
    mainBody: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        alignContent: "center",
    },
    loginTxt: {
        color: "#3AAD94",
        fontWeight: "bold",
        fontSize: 28,
        marginVertical: 20,
    },
    SectionStyle: {
        flexDirection: "row",
        // height: 40,
        // marginTop: 20,
        // width: "100%",
        paddingHorizontal: 20,
        marginVertical:5
    },
    registerArea: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        // justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        borderRadius: 15,
        // alignSelf: "center",
        // height: "80%",
        // marginTop: 30,
    },

    nextBtn: {
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.7,
        shadowRadius: 1.41,
        elevation: 1,
    },
    textStyle: {
        color: "#8B8B8B",
        fontWeight: "bold",
        fontSize: 16,
        paddingHorizontal:5
    },
    inputStyle: {
        flex: 1,
        paddingLeft: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#CCC',
        backgroundColor:'#fff'
    },
    pickerStyle: {
        width: "100%",
        color: "#000",
    },
    errorTextStyle: {
        color: "red",
        textAlign: "center",
        fontSize: 14,
    },
    successTextStyle: {
        // color: 'white',
        textAlign: "center",
        fontSize: 18,
        padding: 30,
    },
    registerTextStyle: {
        textAlign: "center",
        fontWeight: "500",
        fontSize: 14,
        alignSelf: "center",
        padding: 10,
        color: "#AD7FFB",
    },
    radioTxtStyle:{
        fontSize:14,
        fontWeight:'bold'
    }
});