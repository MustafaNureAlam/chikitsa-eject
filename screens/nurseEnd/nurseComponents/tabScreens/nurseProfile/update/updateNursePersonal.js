import React, {useEffect, useState, useRef} from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity, 
    Image,
    Alert,
    Platform
} from 'react-native'
import { TextInput, RadioButton } from 'react-native-paper';
import * as ImagePicker from "expo-image-picker";
import token from '../../../../../../services/local_storage/storage';
import app_config from '../../../../../../services/config';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Root, Popup } from 'popup-ui'

export default function UpdateNursePersonalScreen({navigation, route}) {

    console.log('routeParams===========', route)
    const [patientName, setPatientName] = useState(route.params?.data?.name);
    const [doc_licence, setLicence] = useState(route.params?.nurse_info?.license_number);
    const [birthday, setBirthday] = useState(route.params?.data?.dob);
    const [profession, setProfession] = useState("");
    const [gender, setGender] = useState(route.params?.data?.gender);
    const [image, setImage] = useState(null);
    // const [date, setDate] = useState(null) 
    // console.log(birthday)
    

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

    ////user profile update obj
    const user_profile_update = {
        name: patientName,
        dob: birthday,
        gender: gender,
        user_pic: image
    }

    async function updateProfileData() {
        
        let user_token = await token.getItem("token");
        var myHeaders = new Headers({
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + user_token
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

        
        formData.append('name',  patientName);
        formData.append('dob',  birthday );
        formData.append('gender',  gender );
        formData.append('license_number',  doc_licence );
        // formData.append('profession',  profession );
        formData.append('user_pic', { uri: localUri, name: filename, type });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
        };

        console.log(requestOptions)
        
        await fetch( app_config.baseUrl + "nurse/profile_update", requestOptions)
        .then(response => response.text())
        .then(result => {

            // console.log('============result=========')
            // console.log(result)
            // console.log('============result=========')
            let user_data_response = JSON.parse(result);

            if(user_data_response.code == 200) {
                Popup.show({
                    type: 'Success',
                    title: 'Profile updated',
                    button: true,
                    // textBody: 'Congrats! successfully selected concern',
                    buttonText: 'Ok',
                    // autoClose: true,
                    callback: () => {
                        Popup.hide()
                        navigation.navigate('NurseProfileScreen')
                    },
                    
                })
                
            } 
            
            else{
                Popup.show({
                    type: 'Danger',
                    title: 'Failed to update',
                    textBody:
                      'Sorry! can not complete your request right now. Please try after a while.',
                    buttontext: 'Try again',
                    callback: () => Popup.hide(),
                  })
            }
        })
        .catch(error => console.log(error));
    }
    return (
        <Root>
            <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
                <View>
                    <ScrollView>
                        <View style={{marginHorizontal:20,marginVertical:20}}>
                            <View>
                                
                                <View style={{marginVertical:7}}>
                                    <TextInput
                                        label="Name"
                                        value={patientName}
                                        onChangeText={user_name => setPatientName(user_name)}
                                        mode={'flat'}
                                        activeUnderlineColor={'#3AAD94'}
                                    />
                                </View>

                                <View style={{marginVertical:7}}>
                                    <TextInput
                                        label="Licence no."
                                        value={doc_licence}
                                        onChangeText={licence => setLicence(licence)}
                                        mode={'flat'}
                                        activeUnderlineColor={'#3AAD94'}
                                    />
                                </View>

                                <View style={{marginVertical:7}}>
                                    {/* <TextInput
                                        label="Date of birth"
                                        value={birthday}
                                        onChangeText={bday => setBirthday(bday)}
                                        mode={'outlined'}
                                        activeOutlineColor={'#3AAD94'}
                                    /> */}
                                    <TouchableOpacity 
                                        style={{
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
                                            {/* date */}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                

                                <View style={{
                                    flexDirection:'row',
                                    alignItems:"center",
                                    justifyContent:'space-between',
                                    marginVertical:14,
                                    borderWidth:1,
                                    borderColor:'#707070',
                                    paddingHorizontal:10,
                                    paddingVertical:10,
                                    borderRadius:3
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

                                {/* <View>
                                    <TextInput
                                        label="Profession"
                                        value={profession}
                                        onChangeText={profess => setProfession(profess)}
                                        mode={'outlined'}
                                        activeOutlineColor={'#3AAD94'}
                                    />
                                </View> */}

                                <View style={styles.SectionStyle}>
                                    
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
                                                    // marginTop:'15%',
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

                                <View style={{
                                    marginTop:20
                                }}>
                                    <TouchableOpacity
                                        style={{
                                            backgroundColor:'#3AAD94',
                                            borderRadius:100/2,
                                            marginHorizontal:20,
                                            marginVertical:20,
                                            paddingHorizontal:20,
                                            paddingVertical:10
                                        }}
                                        onPress={ ()=> updateProfileData()}
                                    >
                                        <Text style={{
                                            textAlign:'center',
                                            color:'#fff',
                                            fontSize:16,
                                            fontWeight:'bold'
                                        }}>Save</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>

                    </ScrollView>

                    <View>
                        {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            // date={birthday}
                        />
                    </View>

                </View>

            </SafeAreaView>
        </Root>
    )
}

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
        height: 40,
        marginTop: 20,
        width: "100%",
        paddingHorizontal: "7%",
    },
    registerArea: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        borderRadius: 15,
        alignSelf: "center",
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
