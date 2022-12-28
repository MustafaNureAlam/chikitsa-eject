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
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../../../modules/loader';
import RNPickerSelect from 'react-native-picker-select';
import { Root, Popup } from 'popup-ui'

export default function CreateDocSpecialityScreen({navigation}) {


    const [doc_concern, setConcern] = useState("");
    const [api_data, setApidata] = useState([]);
    const [is_loading, setLoading] = useState(true);
    // console.log('=====api_data_concerns=======', api_data)

    async function getDoctorSpeciality() {
        
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        await fetch( app_config.baseUrl + "specialization/all", requestOptions)
        .then(response => response.text())
        .then(result => {
        
            // console.log(result)
            let doctor_specialization = JSON.parse(result);
            let specialization = [];
            // console.log('=====doctor_specialization=======', doctor_specialization)
            doctor_specialization.data[0].map((item) => {
                let data_obj = {
                    "label" : item.name,
                    "value" : item.id
                }
                console.log('item', data_obj)
                specialization.push(data_obj)
            })
            // console.log('specialization', specialization)
            setApidata(specialization);
        
        })
        .catch(error => console.log('error', error));
    }

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            getDoctorSpeciality()
            setLoading(false);
        }, []),
    );


    async function createSpeciality() {
        
        console.log('hello', doc_concern)
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "specialization_id": doc_concern,
        /////temporary doctor_id value
        "doctor_user_id" : '6'
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch( app_config.baseUrl + "doctor/specializations_store", requestOptions)
        .then(response => response.text())
        .then(result => {
            let special_list = JSON.parse(result)
            // console.log('====result====',special_list)

            if(special_list.code == 200) {
                Popup.show({
                    type: 'Success',
                    title: 'Speciality created',
                    button: true,
                    textBody: 'Congrats! successfully selected Speciality',
                    buttonText: 'Ok',
                    // autoClose: true,
                    callback: () => {
                        Popup.hide()
                        navigation.navigate('DoctorProfileScreen')
                    },
                    
                })
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
        })
        .catch(error => console.log('error', error));
    }

    // useEffect(async() => {
    //     let doc_id = await user_id.getItem("user_id");
    //     setDoctorId(doc_id);
    //     // console.log('=====user_id=====',doc_id);
    // }, [])

    return (
        <Root>
            <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
                <StatusBar backgroundColor={'#075141'} />

                {
                    is_loading ? (
                        <Loader/>
                    ) : (
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View>
                                
                                <View style={{marginHorizontal:20,marginTop:40}} >
                                    
                                    <Text style={{
                                        fontSize:18,
                                        fontWeight:'bold',
                                        textAlign:'center',
                                        padding:5,
                                        marginVertical:10
                                    }}>Select Speciality</Text>

                                    {
                                        api_data && (
                                            <View style={{borderWidth:.3,padding:3,borderRadius:5}}>
                                                <RNPickerSelect
                                                onValueChange={(concern_id) => setConcern(concern_id)}
                                                items={api_data}
                                                value={doc_concern}
                                                useNativeAndroidPickerStyle={true}
                                                style={{ inputAndroid: { color: 'black' } }}
                                                />
                                            </View>
                                        )
                                    }


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

                                        onPress={()=> createSpeciality()}
                                    >
                                        <Text style={{
                                            fontSize:16,
                                            fontWeight:'bold',
                                            color:'#fff',
                                            textAlign:'center'
                                        }}>Done</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    )
                }
                
            </SafeAreaView>
        </Root>
    )
}