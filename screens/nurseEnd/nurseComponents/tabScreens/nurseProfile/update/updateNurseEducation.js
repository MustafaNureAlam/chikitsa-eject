import React, {useCallback, useState, useEffect, useRef} from 'react'
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
import { Root, Popup } from 'popup-ui'

export default function UpdateNurseEducationScreen({navigation, route}) {

    // console.log('route',route)
    const isMounted = useRef(true);
    const member_card_id = route.params.id
    const [medical_name, setMedicalName] = useState(route.params?.medical_name);
    const [pass_year, setPassYear] = useState(route.params?.pass_year);
    const [degree_name, setDegree] = useState(route.params?.deg_name);
    const [doctor_id, setDoctorId] = useState("");

    useEffect(async() => {
        let doc_id = await user_id.getItem("user_id");
        if(isMounted){
            setDoctorId(doc_id);
        }
        // console.log('=====user_id=====',doc_id);
        return() => {
            isMounted.current = false;
        }
    }, [])

    async function updateEducationInfo() {

        let user_token = await token.getItem("token");

        // console.log(user_token)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "medical_name": medical_name,
        "deg_name": degree_name,
        "pass_year": pass_year,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        let education_updated_data = [];

        await fetch( app_config.baseUrl + "doctor/education_update/" + member_card_id , requestOptions)
        .then(response => response.text())
        .then(result => {
            education_updated_data = JSON.parse(result)
            
            if(education_updated_data.code == 200) {
                Popup.show({
                    type: 'Success',
                    title: 'Education updated',
                    button: true,
                    textBody: 'Congrats! successfully updated education',
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
                    title: 'Failed to create',
                    textBody:
                      'Sorry! can not complete your request right now. Please try after a while.',
                    buttontext: 'Try again',
                    callback: () => Popup.hide(),
                })
            }
        })
        .catch(error => console.log('error', error));

    }

    

    return (
        <Root>
            <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
                <StatusBar backgroundColor={'#075141'} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={{marginHorizontal:20,marginVertical:10}} >
                            
                            <View style={{marginVertical:7}}>
                                <TextInput
                                    label="Institute Name"
                                    value={medical_name}
                                    onChangeText={medical => setMedicalName(medical)}
                                    mode={'flat'}
                                    activeUnderlineColor={'#3AAD94'}
                                    keyboardType='ascii-capable'
                                />
                            </View>
                            
                            <View style={{marginVertical:7}}>
                                <TextInput
                                    label="Degree Name"
                                    value={degree_name}
                                    onChangeText={deg => setDegree(deg)}
                                    mode={'flat'}
                                    activeUnderlineColor={'#3AAD94'}
                                    keyboardType='ascii-capable'
                                />
                            </View>

                            <View style={{marginVertical:7}}>
                                <TextInput
                                    label="Year"
                                    value={pass_year}
                                    onChangeText={year => setPassYear(year)}
                                    mode={'flat'}
                                    activeUnderlineColor={'#3AAD94'}
                                    keyboardType='phone-pad'
                                />
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

                                onPress={()=> updateEducationInfo()}
                            >
                                <Text style={{
                                    fontSize:16,
                                    fontWeight:'bold',
                                    color:'#fff',
                                    textAlign:'center'
                                }}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Root>
    )
}
