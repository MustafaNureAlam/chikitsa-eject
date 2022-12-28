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

export default function UpdateDocMembershipScreen({navigation, route}) {

    // console.log('route',route)
    const member_card_id = route.params.id
    const [membership_name, setMembershipName] = useState(route.params?.membership_name);
    const [memberbership_year, setMembershipYear] = useState(route.params?.member_from);
    const [doctor_id, setDoctorId] = useState("");

    useEffect(async() => {
        let doc_id = await user_id.getItem("user_id");
        setDoctorId(doc_id);
        // console.log('=====user_id=====',doc_id);
    }, [])

    async function updateDoctorMembership() {

        let user_token = await token.getItem("token");

        // console.log(user_token)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "member_from": memberbership_year,
        "membership_name": membership_name
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        let memberUpdated_data = [];

        await fetch( app_config.baseUrl + "doctor/memberships_update/" + member_card_id , requestOptions)
        .then(response => response.text())
        .then(result => {
            memberUpdated_data = JSON.parse(result)
            // console.log('===========fsffsfsfs=====',memberUpdated_data)
            if(memberUpdated_data.code == 200) {
                navigation.navigate('DoctorProfileScreen')
            } 
            
            else{
                Alert.alert("ALert!", "not ok?", [
                    {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                    },
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
                                label="Membership Name"
                                value={membership_name}
                                onChangeText={member => setMembershipName(member)}
                                mode={'flat'}
                                activeUnderlineColor={'#3AAD94'}
                                keyboardType='ascii-capable'
                            />
                        </View>

                        <View style={{marginVertical:7}}>
                            <TextInput
                                label="Year"
                                value={memberbership_year}
                                onChangeText={year => setMembershipYear(year)}
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

                            onPress={()=> updateDoctorMembership()}
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
    )
}
