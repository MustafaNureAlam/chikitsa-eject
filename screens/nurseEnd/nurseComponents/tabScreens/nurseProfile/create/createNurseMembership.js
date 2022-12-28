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
import { Root, Popup } from 'popup-ui'

export default function CreateNurseMembershipScreen({navigation}) {

    const [member_from, setMemberFrom] = useState("");
    const [membership_name, setMemberName] = useState("");
    const [org_name, setOrg] = useState("");
    const [doctor_id, setDoctorId] = useState("");

    useEffect(async() => {
        let doc_id = await user_id.getItem("user_id");
        setDoctorId(doc_id);
        // console.log('=====user_id=====',doc_id);
    }, [])



    async function createMembership() {
        
        let user_token = await token.getItem("token");


        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "doctor_user_id" : doctor_id,
            "member_from" : member_from,
            "membership_name" : membership_name
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        let user_data_response = [];

        await fetch( app_config.baseUrl + "nurse/memberships_store", requestOptions)
        .then(response => response.text())
        .then(result => {
            user_data_response = JSON.parse(result)
            // console.log('===========fsffsfsfs=====',user_data_response)

            if(user_data_response.code == 200) {
                Popup.show({
                    type: 'Success',
                    title: 'Membership added',
                    button: true,
                    textBody: 'Congrats! successfully added membership',
                    buttonText: 'Ok',
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
                                    label="Membership name"
                                    value={membership_name}
                                    onChangeText={name => setMemberName(name)}
                                    mode={'flat'}
                                    activeUnderlineColor={'#3AAD94'}
                                    keyboardType='ascii-capable'
                                />
                            </View>

                            <View style={{marginVertical:7}}>
                                <TextInput
                                    label="From year"
                                    value={member_from}
                                    onChangeText={year => setMemberFrom(year)}
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

                                onPress={()=> createMembership()}
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
        </Root>
    )
}
