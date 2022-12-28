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
    Alert,
    FlatList
} from 'react-native';
import { TextInput, RadioButton, Checkbox } from 'react-native-paper';
import user_id from '../../../../../../services/local_storage/storage';
import token from '../../../../../../services/local_storage/storage';
import * as ImagePicker from "expo-image-picker";
import app_config from '../../../../../../services/config'
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../../../../modules/loader';
import RNPickerSelect from 'react-native-picker-select';
import { Root, Popup } from 'popup-ui';

const select_day_array = [
    { testName: 'Sunday', key: 1, checked: false },
    { testName: 'Monday', key: 2, checked: false },
    { testName: 'Tuesday', key: 3, checked: false },
    { testName: 'Wednesday', key: 4, checked: false },
    { testName: 'Thursday', key: 5, checked: false },
    { testName: 'Friday', key: 6, checked: false },
    { testName: 'Saturday', key: 7, checked: false }
]

export default function CreateDoctorSlotScreen({navigation}) {


    // const [doc_concern, setConcern] = useState("");
    // const [api_data, setApidata] = useState([]);
    const [doc_id, setDoctorId] = useState(null);
    const [slot_day, setSlotDay] = useState('');
    const [is_loading, setLoading] = useState(false);

    const [checked, setChecked] = useState(false);
    const [data_array, setDataArray] = useState(select_day_array);
    const [new_array, setNewArray] = useState([]);
    // console.log('=====api_data_concerns=======', api_data)



    useEffect(async() => {
        let doc_id = await user_id.getItem("user_id");
        setDoctorId(doc_id);
        // console.log('=====user_id=====',doc_id);
    }, [])


    function getSelected(index, item) {

        
        const check_val = [...data_array];
        check_val[index].checked = !check_val[index].checked;
        setDataArray(check_val);

        let slots_data = [];
        // console.log('====data_array=======',data_array)
        data_array.map((item) => {
            // console.log('item', item)
            if(item.checked == true) {
                // console.log('item======',item.testName)
                let days_obj = {
                    "doctor_user_id" : doc_id,
                    "day" : item.testName
                }
                slots_data.push(days_obj)
            }
        })

        // console.log('slots_data',slots_data);
        setNewArray(slots_data);
    }


    async function setDaysSlot() {
        
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(new_array);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch( app_config.baseUrl + "doctor/day_book", requestOptions)
        .then(response => response.text())
        .then(result => {
            let response_slots = JSON.parse(result)
            console.log('success-----',response_slots)

            if(response_slots.status == 200) {
                Popup.show({
                    type: 'Success',
                    title: 'Slot created',
                    button: true,
                    textBody: 'Congrats! successfully created slots',
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
                            <View>
                                
                                <View style={{marginTop:20}} >
                                    

                                    <View>
                                        <FlatList 
                                            showsVerticalScrollIndicator={false}    
                                            data={data_array}
                                            renderItem={({ item, index }) => (
                                                <View style={{
                                                    marginVertical:3,
                                                    marginHorizontal:15
                                                }}>
                                                    <Checkbox.Item 
                                                        onPress={() => {
                                                            getSelected(index, item)
                                                        }} 

                                                        label={item.testName} 
                                                        status={item.checked ? 'checked' : 'unchecked'} 
                                                        style={{
                                                            borderWidth:.3,
                                                            borderColor:'#70707B',
                                                            borderRadius:5,
                                                        }}
                                                        labelStyle={{fontSize:16,fontWeight:'bold'}}
                                                    />
                                                </View>
                                            )}
                                            // numColumns={2}
                                            // horizontal={true}
                                            keyExtractor={(item, index) => index.toString()}
                                            ListFooterComponent={
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
                
                                                        onPress={()=> setDaysSlot()}
                                                    >
                                                        <Text style={{
                                                            fontSize:16,
                                                            fontWeight:'bold',
                                                            color:'#fff',
                                                            textAlign:'center'
                                                        }}>Done</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            }
                                        /> 
                                        
                                    </View>
                                </View>

                                
                            </View>
                    )
                }
                
            </SafeAreaView>
        </Root>
    )
}
