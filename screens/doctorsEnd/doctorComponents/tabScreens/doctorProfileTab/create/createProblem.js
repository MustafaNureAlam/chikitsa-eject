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
    Alert,
    Picker
} from 'react-native';
import { TextInput, RadioButton } from 'react-native-paper';
import user_id from '../../../../../../services/local_storage/storage';
import token from '../../../../../../services/local_storage/storage';
import * as ImagePicker from "expo-image-picker";
import config from '../../../../../../services/config'
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../../../modules/loader';
import RNPickerSelect from 'react-native-picker-select';
import { Root, Popup } from 'popup-ui'

export default function CreateDocSymptoms({navigation}) {

    // const [member_from, setMemberFrom] = useState("");
    // const [membership_name, setMemberName] = useState("");
    // const [org_name, setOrg] = useState("");
    // const [doctor_id, setDoctorId] = useState("");

    const isMounted = useRef(true);
    const [doc_concern, setConcern] = useState("");
    const [api_data, setApidata] = useState([]);
    const [is_loading, setLoading] = useState(true);
    const [select, setSelect] = useState("");

    async function getProblemData() {
        

        let user_token = await token.getItem("token");
        // console.log('doctor_token=======',user_token);
    
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
    
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
    
        await fetch( config.baseUrl + "doctor/symptom_list", requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log('ncncsoncscnn',result);

            let doctor_response = JSON.parse(result)

            setApidata(doctor_response);
            // console.log('======patient pres data======');
            // console.log(doctor_response);
            // console.log('======patient pres data======');
        })
        .catch(error => console.log('error', error));
    }

    useFocusEffect(
        useCallback(() => {
            
            if(isMounted) {
                setLoading(true);
                getProblemData();
                setLoading(false);
            }
            
        
            return () => {
                isMounted.current = false;
            };
        }, []),
    );

    async function createSymptom() {
        
        console.log('hello', select)
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({
        // "concern_id": doc_concern
        // });

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        // body: raw,
        redirect: 'follow'
        };
        console.log('hello', select, requestOptions)
        await fetch( config.baseUrl + "doctor/doctor_select_symptom/"+select, requestOptions)
        .then(response => response.text())
        .then(result => {
            let problem_data = JSON.parse(result)
            // console.log('====result====')
            // console.log(problem_data)
            // console.log('====result====')

            if(problem_data.code == 200) {
                Popup.show({
                    type: 'Success',
                    title: 'Symptom created',
                    button: true,
                    textBody: 'Congrats! successfully selected symptom',
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

    return (
        <Root>
            <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
                <StatusBar backgroundColor={'#075141'} />

                {
                    is_loading ? (
                        <Loader/>
                    ) : (
                        <View style={{marginHorizontal:20,marginTop:40}} >
                                    
                            <Text style={{
                                fontSize:18,
                                fontWeight:'bold',
                                textAlign:'center',
                                padding:5,
                                marginVertical:10
                            }}>Select symptoms</Text>
                            <View style={{
                                borderWidth:.3,
                                borderRadius:5
                            }}>
                                <Picker
                                
                                        selectedValue={select}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelect(itemValue)
                                        }
                                    >

                                        {
                                            api_data?.data?.map((item, index) => {
                                                return(
                                                    <Picker.Item key={index} label={item?.name} value={item?.id} />
                                                )
                                            })
                                        }
                                        
                                    </Picker>
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

                                    onPress={()=> createSymptom()}
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
                    )
                }
                
            </SafeAreaView>
        </Root>
    )
}
