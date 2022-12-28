import React, {useEffect, useState} from 'react'
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
import token from '../../../services/local_storage/storage';
import app_config from '../../../services/config';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectDropdown from 'react-native-select-dropdown'

export default function UpdatePersonalData({navigation, route}) {
    
    console.log('route_params_upfate',route)
    const [patientName, setPatientName] = useState(route?.params?.user?.name);
    const [emergency_number, setEmergencyNumber] = useState(route?.params?.personal_info?.emergency_contact);
    const [email, setEmail] = useState(route.params?.user?.email);
    const [marital_status, setMaritalStatus] = useState(route?.params?.personal_info?.marital_status);
    const [birthday, setBirthday] = useState(route?.params?.user?.dob);
    const [profession, setProfession] = useState(route?.params?.user?.profession);
    const [gender, setGender] = useState(route?.params?.user?.gender);
    const [image, setImage] = useState(null);
    const [height, setHeight] = useState(route?.params?.personal_info?.height);
    const [weight, setWeight] = useState(route?.params?.personal_info?.weight);
    const [smoking, setSmoking] = useState(route?.params?.personal_info?.smoking);
    const [alcohol, setAlcohol] = useState(route?.params?.personal_info?.alcohol);
    const [activity, setActivity] = useState(route?.params?.personal_info?.activity);
    const [food, setFood] = useState(route?.params?.personal_info?.food_preference);
    

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
        // console.log("A date has been picked=========: ", typeof(date));
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
        profession: profession,
        user_pic: image,
        email : email,
        marital_status : marital_status,
        height : height,
        weight : weight,
        emergency_contact : emergency_number,
        smoking : smoking,
        alcohol : alcohol
    }

    async function updateProfileData() {
        
        let user_token = await token.getItem("token");
        var myHeaders = new Headers({
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' +user_token
        });
        console.log(myHeaders);
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
        formData.append('profession',  profession );
        formData.append('height',  height );
        formData.append('weight',  weight );
        formData.append('email',  email );
        formData.append('marital_status',  marital_status );
        formData.append('emergency_contact',  emergency_number );
        formData.append('smoking',  smoking );
        formData.append('alcohol',  alcohol );
        formData.append('license_number',  "0123" );
        formData.append('user_pic', { uri: localUri, name: filename, type });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
        };
        
        await fetch( app_config.baseUrl + "doctor/profile_update", requestOptions)
        .then(response => response.text())
        .then(result => {

            let user_data_response = JSON.parse(result);
            console.log('++++++++++++++++++++++')
            console.log(user_data_response)
            console.log('++++++++++++++++++++++++++++++++++')

            if(user_data_response.code == 200) {
                navigation.navigate('ProfileScreen')
            } 
            
            else{
                Alert.alert("ALert!", "not ok?", [
                    {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                    },
                    // { text: "YES", onPress: () => BackHandler.exitApp() }
                ]);
            }
        })
        .catch(error => console.log(error));
    }
    
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <View>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                >
                    <View style={{marginHorizontal:20,marginVertical:20}}>
                        <View>
                            
                            <View style={{marginTop:7}}>
                                <TextInput
                                    label="Name"
                                    value={patientName}
                                    onChangeText={user_name => setPatientName(user_name)}
                                    mode={'flat'}
                                    activeUnderlineColor={'#3AAD94'}
                                />
                            </View>

                            <View style={{marginTop:7}}>
                                <TextInput
                                    label="Emergency Number"
                                    value={emergency_number}
                                    onChangeText={number => setEmergencyNumber(number)}
                                    mode={'flat'}
                                    activeUnderlineColor={'#3AAD94'}
                                    keyboardType="phone-pad"
                                />
                            </View>

                            <View style={{marginVertical:7}}>
                                <TextInput 
                                    label={"Email"}
                                    value={email}
                                    mode={'flat'}
                                    onChangeText={(mail) => setEmail(mail)}
                                    keyboardType="email-address"
                                    autoCapitalize='none'
                                    activeUnderlineColor={'#3AAD94'}
                                />
                            </View>

                            <View style={{marginTop:7}}>
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
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            

                            <View style={{
                                flexDirection:'row',
                                alignItems:"center",
                                justifyContent:'space-between',
                                marginTop:14,
                                borderWidth:1,
                                borderColor:'#707070',
                                paddingHorizontal:10,
                                paddingVertical:10,
                                borderRadius:3
                            }}>
                                <Text style={{
                                    fontSize:16,
                                    // fontWeight:'bold',
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

                            <View style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
                                // paddingHorizontal:5,
                                marginVertical:7,
                                // marginHorizontal:5
                            }}>
                                <TextInput
                                    label={'Height'}
                                    style={{
                                        fontSize:14,
                                        flex:.5,
                                        marginRight:3,
                                        textAlign:'center'
                                    }}
                                    value={height}
                                    onChangeText={(height) => setHeight(height)}
                                    keyboardType="ascii-capable"
                                    mode={'flat'}
                                    activeUnderlineColor={'#3AAD94'}
                                />
                                <TextInput
                                    label={'Weight'}
                                    value={weight}
                                    style={{
                                        fontSize:14,
                                        flex:.5,
                                        marginLeft:3,
                                        textAlign:'center',
                                    }}
                                    onChangeText={(weight) => setWeight(weight)}
                                    keyboardType="ascii-capable"
                                    mode={'flat'}
                                    activeUnderlineColor={'#3AAD94'}
                                />
                            </View>

                            <View style={{
                                flexDirection:'row',
                                alignItems:"center",
                                justifyContent:'space-between',
                                marginTop:7,
                                borderWidth:1,
                                borderColor:'#707070',
                                paddingHorizontal:10,
                                paddingVertical:10,
                                borderRadius:3
                            }}>
                                <Text style={{ fontSize:16,
                                    color:'#70707b'}}>Marital status</Text>
                                
                                <RadioButton.Group  onValueChange={newValue => setMaritalStatus(newValue)} value={marital_status}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="married" />
                                            <Text style={styles.radioTxtStyle}>Married</Text>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="single" />
                                            <Text style={styles.radioTxtStyle}>Single</Text>
                                        </View>
                                    </View>
                                </RadioButton.Group>
                            </View>

                            <View style={{
                                flexDirection:'row',
                                alignItems:"center",
                                justifyContent:'space-between',
                                marginTop:7,
                                borderWidth:1,
                                borderColor:'#707070',
                                paddingHorizontal:10,
                                paddingVertical:10,
                                borderRadius:3
                            }}>
                                <Text style={{ fontSize:16,
                                    color:'#70707b'}}>Smoking</Text>
                                
                                <RadioButton.Group  onValueChange={smok => setSmoking(smok)} value={smoking}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="Yes" />
                                            <Text style={styles.radioTxtStyle}>Yes</Text>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="No" />
                                            <Text style={styles.radioTxtStyle}>No</Text>
                                        </View>
                                    </View>
                                </RadioButton.Group>
                            </View>


                            <View style={{
                                flexDirection:'row',
                                alignItems:"center",
                                justifyContent:'space-between',
                                marginTop:7,
                                borderWidth:1,
                                borderColor:'#707070',
                                paddingHorizontal:10,
                                paddingVertical:10,
                                borderRadius:3
                            }}>
                                <Text style={{ fontSize:16,
                                    color:'#70707b'}}>Alcohol</Text>
                                
                                <RadioButton.Group  onValueChange={alc => setAlcohol(alc)} value={alcohol}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="Yes" />
                                            <Text style={styles.radioTxtStyle}>Yes</Text>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="No" />
                                            <Text style={styles.radioTxtStyle}>No</Text>
                                        </View>
                                    </View>
                                </RadioButton.Group>
                            </View>

                            <View style={{
                                flexDirection:'row',
                                alignItems:"center",
                                justifyContent:'space-between',
                                marginTop:7,
                                borderWidth:1,
                                borderColor:'#707070',
                                paddingHorizontal:10,
                                paddingVertical:10,
                                borderRadius:3
                            }}>
                                <Text style={{ fontSize:16,
                                    color:'#70707b'}}>Activity</Text>
                                
                                <RadioButton.Group  onValueChange={activ => setActivity(activ)} value={activity}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="high" />
                                            <Text style={styles.radioTxtStyle}>High</Text>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="mid" />
                                            <Text style={styles.radioTxtStyle}>Mid</Text>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="low" />
                                            <Text style={styles.radioTxtStyle}>Low</Text>
                                        </View>
                                    </View>
                                </RadioButton.Group>
                            </View>


                            <View style={{marginTop:7}}>
                                <SelectDropdown
                                    defaultValue={food}
                                    defaultButtonText='Select food'
                                    buttonStyle={{width:'100%',borderColor:'70707B', borderWidth:.5,borderRadius:5,}}
                                    buttonTextStyle={{fontSize:16, color:'#70707B'}}
                                    data={['Junk', 'Healthy', 'Vegeterian']}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index)
                                        setFood(selectedItem)
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
                                />
                            </View>


                            <View style={{marginTop:7}}>
                                <TextInput
                                    label="Profession"
                                    value={profession}
                                    onChangeText={profess => setProfession(profess)}
                                    mode={'flat'}
                                    activeUnderlineColor={'#3AAD94'}
                                />
                            </View>

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
        fontWeight:'bold',
        color:'#70707B'
    }
});
