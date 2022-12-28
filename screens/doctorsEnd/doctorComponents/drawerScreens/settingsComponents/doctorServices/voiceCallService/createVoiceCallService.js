import React, {useCallback, useState, useEffect,useRef} from 'react'
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
import { TextInput, RadioButton, Checkbox  } from 'react-native-paper';
import user_id from '../../../../../../../services/local_storage/storage';
import token from '../../../../../../../services/local_storage/storage';
import app_config from '../../../../../../../services/config'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { Root, Popup } from 'popup-ui';
import RNPickerSelect from 'react-native-picker-select';
import location from '../../../../../../../services/api/location';
import { useFocusEffect } from '@react-navigation/native';

export default function CreateVoiceCallServiceScreen({navigation, route}) {

    
    const isMounted = useRef(true);
    const [time_from, setTimeFrom] = useState("");
    const [time_to, setTimeTo] = useState("");
    const [slot_name, setSlotName] = useState("");
    const [slot_duration, setSlotDuration] = useState("");
    const [slot_type, setSlotType] = useState("");
    const [cash, setCash] = useState("");
    const [minimum_advance, setMininumAdv] = useState("");
    const [day_id, setDayId] = useState(route.params);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [timeToPickerVisible, setTimeToPickerVisibility] = useState(false);

    const [selectedLocation, setSelectedLocation] = useState();
    const [myLocation, setMyLocation] = useState([]);
    const [is_loading, setLoading] = useState(true);


    const type_check_data = [
        {
            "label" : "Audio",
            "value" : "audio"
        },
        {
            "label" : "Video",
            "value" : "video"
        },
        {
            "label" : "Chat",
            "value" : "chat"
        },
        {
            "label" : "In Chamber",
            "value" : "chamber"
        },
    ]

    const [checked, setChecked] = useState(true);
    const [isUnPaidVoluntary, setUnpaidVol] = useState(false);
    const [for_all, setForALl] = useState(false);
    const [for_specific, setSpecific] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (time) => {
        var newstr = time.toString();
        // console.log('str',newstr)
        let time_constant = moment(newstr).format('h:mm a');
        // var new_time = newstr.substr(8, 13);
        // console.log("new"+ time_constant);
        setTimeFrom(time_constant)
        setDatePickerVisibility(false);
    };

    const showToPicker = () => {
        setTimeToPickerVisibility(true);
    };

    const hideToPicker = () => {
        setTimeToPickerVisibility(false);
    };

    const handleConfirmTimeTo = (time) => {
        var time_to_new = time.toString();
        // console.log('str',time_to_new)
        let to_constant = moment(time_to_new).format('h:mm a');
        // var new_time = newstr.substr(8, 13);
        // console.log("to_constant"+ to_constant);
        setTimeTo(to_constant)
        setTimeToPickerVisibility(false);
    };


    async function mapData() {
        const my_saved_location = await location.mySavedLocation();
            
        setMyLocation(my_saved_location.data);
        // console.log('=========my_saved_location=========')
        // console.log(my_saved_location)
        // console.log('=========my_saved_location=========')
    }

    async function createService() {

        console.log('----------cjsncsnc')
        let user_token = await token.getItem("token");


        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify([{
            "slot_name" : slot_name,
            "time_from" : time_from,
            "time_to" : time_to,
            "price" : cash,
            "required_advance_payment" : checked,
            "minimum_advance" : minimum_advance,
            "type" : slot_type,
            "slot_duration" : slot_duration,
        }]);

        console.log('datadtatat',raw)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        let user_data_response = [];

        await fetch( app_config.baseUrl + "doctor/book_time_in_day/" + day_id, requestOptions)
        .then(response => response.text())
        .then(result => {
            user_data_response = JSON.parse(result)
            console.log('===========user_data_response=====')
            console.log(user_data_response)
            console.log('===========user_data_response=====')

            if(user_data_response.status == 200) {
                Popup.show({
                    type: 'Success',
                    title: 'Slot created',
                    button: true,
                    textBody: 'Congrats! successfully created slots',
                    buttonText: 'Ok',
                    // autoClose: true,
                    callback: () => {
                        Popup.hide()
                        navigation.navigate('VoiceCallServiceScreen')
                    },
                    
                })
                // console.log('us====',user_data_response)
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

    async function updateService() {

        // console.log('----------cjsncsnc')
        let user_token = await token.getItem("token");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "slot_name": slot_name,
        "time_from": time_from,
        "time_to": time_to,
        "price": cash,
        "required_advance_payment": checked,
        "minimum_advance": minimum_advance,
        "type": slot_type,
        "slot_duration": slot_duration,
        "slot_time_id": day_id?.data?.id
        });


        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch( app_config.baseUrl + "doctor/slot_update", requestOptions)
        .then(response => response.text())
        .then(result => {
            let update_data = JSON.parse(result);
            
            if(update_data.status == 200) {
                Popup.show({
                    type: 'Success',
                    title: 'Slot created',
                    button: true,
                    textBody: 'Congrats! successfully updated slots',
                    buttonText: 'Ok',
                    // autoClose: true,
                    callback: () => {
                        Popup.hide()
                        navigation.navigate('VoiceCallServiceScreen')
                    },
                    
                })
                // console.log('us====',user_data_response)
            } 
            
            else{
                Popup.show({
                    type: 'Danger',
                    title: 'Failed to create',
                    textBody:
                        'Sorry! can not complete your request right now. Please try after a while.',
                    buttontext: 'Try again',
                    callback: () => 
                        {
                            Popup.hide()
                            navigation.navigate('VoiceCallServiceScreen')
                        }
                })
            }
        })
        .catch(error => console.log('error', error));
    }


    useFocusEffect(
        useCallback(() => {

                if(isMounted){
                    setLoading(true)
                    mapData();
                    setLoading(false)
                }
                // console.log('77777777777777day_id7777777777777')
                // console.log(day_id)
                // console.log('777777777777day_id777777777777777')

            return () => {
                isMounted.current = false;
            }
        }, []),
    );

    return (
        <Root>
            <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
                <StatusBar backgroundColor={'#075141'} />
                <View>
                    <View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={{marginHorizontal:20,marginVertical:10}} >
                                

                                <View style={{
                                        marginVertical:7,
                                        flexDirection:'row',
                                    }}>
                                        
                                    <View style={{
                                        flex:1,marginHorizontal:3
                                    }}>
                                        <Text style={{
                                            marginVertical:5,
                                            fontSize:18,
                                            fontWeight:"bold",
                                        }}>From</Text>    
                                        <TouchableOpacity 
                                            style={{
                                                // borderWidth:1,
                                                paddingHorizontal:10,
                                                paddingVertical:16,
                                                borderRadius:3,
                                                backgroundColor:'#D8D9DD'
                                            }}
                                            onPress={showDatePicker}
                                        >
                                            <Text style={{
                                                color:'#707070',
                                                fontSize:16,
                                                fontWeight:'700'
                                            }}>
                                                {time_from ? time_from : 'Select time'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{
                                        flex:1,marginHorizontal:3
                                    }}>
                                        <Text style={{
                                            marginVertical:5,
                                            fontSize:18,
                                            fontWeight:"bold"
                                        }}>To</Text>    
                                        <TouchableOpacity 
                                            style={{
                                                paddingHorizontal:10,
                                                paddingVertical:16,
                                                borderRadius:3,
                                                backgroundColor:'#D8D9DD'
                                            }}
                                            onPress={showToPicker}
                                        >
                                            <Text style={{
                                                color:'#707070',
                                                fontSize:16,
                                                fontWeight:'700'
                                            }}>
                                                {time_to ? time_to : 'Select time'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{
                                    borderWidth:1,
                                    borderRadius:5,
                                    marginHorizontal:3,
                                    marginTop:10,
                                    // backgroundColor:"#D8D9DD"
                                    borderColor:'#70707B'
                                    }}>
                                    <RNPickerSelect
                                        onValueChange={(type) => setSlotType(type)}
                                        items={type_check_data}
                                        value={slot_type}
                                        useNativeAndroidPickerStyle={true}
                                        style={{ inputAndroid: { color: '#707070',fontWeight:'bold' } }}
                                        placeholder={{ label: "Appointment type", value: "", color:'#ccc' }}
                                    />
                                </View>

                                <View style={{marginTop:10,marginHorizontal:3}}>
                                    <TextInput
                                        label="Slot name"
                                        value={slot_name}
                                        onChangeText={slot => setSlotName(slot)}
                                        mode={'flat'}
                                        activeUnderlineColor={'#3AAD94'}
                                        keyboardType='ascii-capable'
                                    />
                                </View>

                                <View style={{marginTop:10,marginHorizontal:3}}>
                                    <TextInput
                                        label="Slot duration"
                                        value={slot_duration}
                                        onChangeText={dur => setSlotDuration(dur)}
                                        mode={'flat'}
                                        activeUnderlineColor={'#3AAD94'}
                                        keyboardType='phone-pad'
                                    />
                                </View>

                                <View style={{marginTop:10,marginHorizontal:3}}>
                                    <TextInput
                                        label="Set cost"
                                        value={cash}
                                        onChangeText={doller => {
                                            setCash(doller)
                                            setMininumAdv(doller)
                                        }}
                                        mode={'flat'}
                                        activeUnderlineColor={'#3AAD94'}
                                        keyboardType='number-pad'
                                    />
                                </View>

                                <View style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                    alignItems:"center",
                                    marginVertical:10
                                }}>
                                    <Text style={{
                                        padding:5,
                                        fontSize:16,
                                        fontWeight:"bold"
                                    }}>Advance payment required!</Text>
                                    <Checkbox
                                        status={checked ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setChecked(!checked);
                                            console.log('value',checked)
                                        }}
                                        disabled
                                    />
                                </View>

                                

                                {
                                    checked == true && (
                                        <View style={{marginHorizontal:3}}>
                                            <TextInput
                                                label="Set miminum advance"
                                                value={minimum_advance}
                                                onChangeText={adv => setMininumAdv(adv)}
                                                mode={'flat'}
                                                activeUnderlineColor={'#3AAD94'}
                                                keyboardType='number-pad'
                                                disabled
                                            />
                                        </View>
                                    )
                                }

                                <View style={{
                                    flexDirection:"row",
                                    justifyContent:"space-between",
                                    alignItems:"center",
                                    marginVertical:10
                                }}>
                                    <Text style={{
                                        padding:5,
                                        fontSize:16,
                                        fontWeight:"bold"
                                    }}>Is unpaid voluntary</Text>
                                    <Checkbox
                                        disabled
                                        status={isUnPaidVoluntary ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setUnpaidVol(!isUnPaidVoluntary);
                                            console.log('isUnPaidVoluntary',isUnPaidVoluntary)
                                        }}
                                    />
                                </View>

                                {
                                    isUnPaidVoluntary == true && (
                                        <View style={{
                                            marginHorizontal:3,
                                            paddingHorizontal:8,
                                            borderWidth:.1,
                                            borderRadius:2,
                                            backgroundColor:'#fafefe',
                                        }}>
                                            
                                            <View style={{
                                                flexDirection:"row",
                                                justifyContent:"space-between",
                                                alignItems:"center",
                                                marginVertical:10
                                            }}>
                                                <Text style={{
                                                    padding:5,
                                                    fontSize:14,
                                                    fontWeight:"500"
                                                }}>For all</Text>
                                                <Checkbox
                                                    status={for_all ? 'checked' : 'unchecked'}
                                                    onPress={() => {
                                                        setForALl(!for_all);
                                                        // console.log('value',checked)
                                                    }}
                                                />
                                            </View>

                                            <View style={{
                                                flexDirection:"row",
                                                justifyContent:"space-between",
                                                alignItems:"center",
                                                marginVertical:10
                                            }}>
                                                <Text style={{
                                                    padding:5,
                                                    fontSize:14,
                                                    fontWeight:"500"
                                                }}>For Specific Location</Text>
                                                <Checkbox
                                                    status={for_specific ? 'checked' : 'unchecked'}
                                                    onPress={() => {
                                                        setSpecific(!for_specific);
                                                        // console.log('value',checked)
                                                    }}
                                                />
                                            </View>

                                            <View style={{
                                                    flex:1
                                                }}>
                                                    {
                                                        for_specific == true && (
                                                            <View style={{
                                                                // flexDirection:'row',
                                                                // alignItems:'center',
                                                                // justifyContent:'space-between'
                                                                paddingHorizontal:8,
                                                                paddingVertical:8
                                                            }}>
                                                                <Text style={{
                                                                    fontSize:16,
                                                                    fontWeight:'bold',
                                                                    padding:4
                                                                    }}>Location</Text>
                                                                
                                                                <View style={{
                                                                    borderWidth:.3,
                                                                    marginHorizontal:5,
                                                                    borderRadius:5
                                                                }}>
                                                                    
                                                                    <Picker
                                                                        selectedValue={selectedLocation}
                                                                        onValueChange={(itemValue, itemIndex) =>
                                                                            setSelectedLocation(itemValue)
                                                                        }
                                                                    >

                                                                        {
                                                                            myLocation.map((item, index) => {
                                                                                return(
                                                                                    <Picker.Item key={index} label={item.location_name} value={item} />
                                                                                )
                                                                            })
                                                                        }
                                                                        
                                                                    </Picker>

                                                                </View>

                                                                <View style={{
                                                                    marginHorizontal:30,
                                                                    marginVertical:20
                                                                }}>
                                                                    <TouchableOpacity 
                                                                        style={{
                                                                            backgroundColor:'#3AAD94',
                                                                            paddingVertical:7,
                                                                            paddingHorizontal:10,
                                                                            borderRadius:100/2
                                                                        }}
                                                                        
                                                                        onPress={() => navigation.navigate('MapDirectory', {doctor_service : "doctor_Voice_service"})} 
                                                                    >
                                                                        <Text style={{
                                                                            color:'#fff',
                                                                            fontSize:14,
                                                                            fontWeight:'bold',
                                                                            textAlign:'center',
                                                                            padding:5
                                                                        }}>
                                                                            Add new location
                                                                        </Text>
                                                                    </TouchableOpacity>
                                                                </View>

                                                            </View>
                                                        )
                                                    }
                                            </View>

                                            
                                        </View>

                                        
                                    )
                                }

                                            


                            </View>

                            

                            <View style={{
                                marginVertical:30,
                                marginHorizontal:20
                            }}>

                                {
                                    day_id.from === "update" && (
                                        <TouchableOpacity 
                                            style={{
                                                backgroundColor:'#3AAD94',
                                                padding:12,
                                                borderRadius:100/2
                                            }}

                                            onPress={()=> {
                                                updateService();
                                            }}
                                        >
                                            <Text style={{
                                                fontSize:16,
                                                fontWeight:'bold',
                                                color:'#fff',
                                                textAlign:'center'
                                            }}>Update</Text>
                                        </TouchableOpacity>
                                    )
                                }

                                {
                                    day_id.from !== "update" && (

                                        <TouchableOpacity 
                                            style={{
                                                backgroundColor:'#3AAD94',
                                                padding:12,
                                                borderRadius:100/2
                                            }}

                                            onPress={()=> {
                                                
                                                createService();
                                            }}
                                        >
                                            <Text style={{
                                                fontSize:16,
                                                fontWeight:'bold',
                                                color:'#fff',
                                                textAlign:'center'
                                            }}>Create</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            </View>

                        </ScrollView>
                    </View>
                </View>

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

                <View>
                    <DateTimePickerModal
                        isVisible={timeToPickerVisible}
                        mode="time"
                        onConfirm={handleConfirmTimeTo}
                        onCancel={hideToPicker}
                        is24Hour={false}
                        // display={"default"}
                        
                        
                    />
                </View>
            </SafeAreaView>
        </Root>
    )
}
