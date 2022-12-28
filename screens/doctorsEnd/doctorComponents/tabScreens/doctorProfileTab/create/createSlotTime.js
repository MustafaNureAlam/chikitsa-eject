import React, {useCallback, useState, useEffect} from 'react'
import { 
    View, 
    Text, 
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Platform,
    Image,
    Alert
} from 'react-native';
import { TextInput, RadioButton } from 'react-native-paper';
import user_id from '../../../../../../services/local_storage/storage';
import token from '../../../../../../services/local_storage/storage';
import * as ImagePicker from "expo-image-picker";
import app_config from '../../../../../../services/config'
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function CreateSlotTimeScreen({navigation, route}) {

    const [member_from, setMemberFrom] = useState("");
    const [membership_name, setMemberName] = useState("");
    const [org_name, setOrg] = useState("");
    const [doctor_id, setDoctorId] = useState("");
    const [birthday, setBirthday] = useState("");

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (time) => {
        var newstr = time.toString();
        console.log('str',newstr)

        var newdate = newstr.substr(8, 13);
        console.log("new"+ newdate);
        // // setDate(date)
        setBirthday(newdate);
        // console.log("A date has been picked=========: ", time);
        // hideDatePicker();
    };

    // useEffect(async() => {
    //     let doc_id = await user_id.getItem("user_id");
    //     setDoctorId(doc_id);
    //     // console.log('=====user_id=====',doc_id);
    // }, [])



    // async function createMembership() {
        
    //     let user_token = await token.getItem("token");


    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", "Bearer " + user_token);
    //     myHeaders.append("Content-Type", "application/json");

    //     var raw = JSON.stringify({
    //         "doctor_user_id" : doctor_id,
    //         "member_from" : member_from,
    //         "membership_name" : membership_name
    //     });

    //     var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    //     };

    //     let user_data_response = [];

    //     await fetch( app_config.baseUrl + "doctor/memberships_store", requestOptions)
    //     .then(response => response.text())
    //     .then(result => {
    //         user_data_response = JSON.parse(result)
    //         // console.log('===========fsffsfsfs=====',user_data_response)

    //         if(user_data_response.code == 200) {
    //             navigation.navigate('DoctorProfileScreen')
    //             // console.log('us====',user_data_response)
    //         } 
            
    //         else{
    //             Alert.alert("ALert!", "not ok?", [
    //                 {
    //                 text: "Cancel",
    //                 onPress: () => null,
    //                 style: "cancel"
    //                 },
    //                 // { text: "YES", onPress: () => BackHandler.exitApp() }
    //             ]);
    //         }
    //     })
    //     .catch(error => console.log('error', error));
    // }

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{marginHorizontal:20,marginVertical:10}} >
                        
                        <View style={{marginVertical:7}}>
                            <TextInput
                                label="Membership name"
                                value={membership_name}
                                onChangeText={name => setMemberName(name)}
                                mode={'flat'}
                                activeUnderlineColor={'#3AAD94'}
                                keyboardType='ascii-capable'
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
                                        {birthday ? birthday : 'Select time'}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                    </View>

                    <View style={{
                        marginVertical:30,
                        marginHorizontal:20
                    }}>
                        <TouchableOpacity 
                            style={{
                                backgroundColor:'#3AAD94',
                                padding:12,
                                borderRadius:100/2
                            }}

                            onPress={()=> console.log('hello')}
                        >
                            <Text style={{
                                fontSize:16,
                                fontWeight:'bold',
                                color:'#fff',
                                textAlign:'center'
                            }}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            <View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    is24Hour={false}
                    // display={"default"}
                    
                    
                />
            </View>

        </SafeAreaView>
    )
}


