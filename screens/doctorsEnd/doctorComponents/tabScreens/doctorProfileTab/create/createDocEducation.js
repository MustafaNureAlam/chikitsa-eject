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

export default function CreateDocEducationScreen({navigation}) {

    const [pass_year, setPassYear] = useState("");
    const [medical_name, setMedicalName] = useState("");
    const [deg_name, setDegreeName] = useState("");
    const [org_name, setOrg] = useState("");
    const [doctor_id, setDoctorId] = useState("");

    useEffect(async() => {
        let doc_id = await user_id.getItem("user_id");
        setDoctorId(doc_id);
        // console.log('=====user_id=====',doc_id);
    }, [])



    async function createEducation() {
        
        let user_token = await token.getItem("token");


        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "medical_name" : medical_name,
            "deg_name" : deg_name,
            "pass_year" : pass_year,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        let user_data_response = [];

        await fetch( app_config.baseUrl + "doctor/education_store", requestOptions)
        .then(response => response.text())
        .then(result => {
            user_data_response = JSON.parse(result)
            // console.log('===========fsffsfsfs=====',user_data_response)

            if(user_data_response.code == 200) {
                navigation.navigate('DoctorProfileScreen')
                // console.log('user_data_response=====',user_data_response)
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
        .catch(error => console.log('error', error));
    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={{marginHorizontal:20,marginVertical:10}} >
                        
                        <View style={{marginVertical:7}}>
                            <TextInput
                                label="Medical name"
                                value={medical_name}
                                onChangeText={name => setMedicalName(name)}
                                mode={'flat'}
                                activeUnderlineColor={'#3AAD94'}
                                keyboardType='ascii-capable'
                            />
                        </View>
                        
                        <View style={{marginVertical:7}}>
                            <TextInput
                                label="Degree name"
                                value={deg_name}
                                onChangeText={d_name => setDegreeName(d_name)}
                                mode={'flat'}
                                activeUnderlineColor={'#3AAD94'}
                                keyboardType='ascii-capable'
                            />
                        </View>

                        <View style={{marginVertical:7}}>
                            <TextInput
                                label="Passing year"
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

                            onPress={()=> createEducation()}
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
        </SafeAreaView>
    )
}
