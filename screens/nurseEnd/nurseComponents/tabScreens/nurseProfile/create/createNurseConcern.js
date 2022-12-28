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
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../../../modules/loader';
import RNPickerSelect from 'react-native-picker-select';
import { Root, Popup } from 'popup-ui'

export default function CreateNurseConcernScreen({navigation}) {

    // const [member_from, setMemberFrom] = useState("");
    // const [membership_name, setMemberName] = useState("");
    // const [org_name, setOrg] = useState("");
    // const [doctor_id, setDoctorId] = useState("");

    const isMounted = useRef(true);
    const [doc_concern, setConcern] = useState("");
    const [api_data, setApidata] = useState([]);
    const [is_loading, setLoading] = useState(true);
    // console.log('=====api_data_concerns=======', api_data)

    async function getDoctorConcerns() {
        
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        await fetch( app_config.baseUrl + "concern/nurse", requestOptions)
        .then(response => response.text())
        .then(result => {
        
            // console.log(result)
            let doctor_concern_data = JSON.parse(result);
            let concern_txt_array = [];
            // console.log('=====doctor_concern_data=======', doctor_concern_data)
            doctor_concern_data.data[0].map((item) => {
                let data_obj = {
                    "label" : item.name,
                    "value" : item.id
                }
                // console.log('item', data_obj)
                concern_txt_array.push(data_obj)
            })
            // console.log('concern_txt_array', concern_txt_array)
            setApidata(concern_txt_array);
        
        })
        .catch(error => console.log('error', error));
    }

    useFocusEffect(
        useCallback(() => {
            if(isMounted){
                setLoading(true);
                getDoctorConcerns()
                setLoading(false);
            }

            return() => {
                isMounted.current = false;
            }
        }, []),
    );


    async function createConcern() {
        
        // console.log('hello', doc_concern)
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "concern_id": doc_concern
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        // console.log('requestOptions', requestOptions)

        await fetch( app_config.baseUrl + "nurse/select_nurse_concern", requestOptions)
        .then(response => response.text())
        .then(result => {
            let concern_list = JSON.parse(result)

            if(concern_list.code == 200) {
                Popup.show({
                    type: 'Success',
                    title: 'Concern created',
                    button: true,
                    textBody: 'Congrats! successfully selected concern',
                    buttonText: 'Ok',
                    // autoClose: true,
                    callback: () => {
                        Popup.hide()
                        navigation.navigate('NurseProfileScreen')
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
                                    }}>Select Concern</Text>

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

                                        onPress={()=> createConcern()}
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
