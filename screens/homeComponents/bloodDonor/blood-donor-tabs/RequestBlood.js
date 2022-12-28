import React, {useState, useEffect, useRef, useCallback} from 'react'
import { 
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image,
    Picker,
    Alert,
    FlatList
} from 'react-native';
import { 
    Ionicons,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Octicons,
    Entypo,
    Fontisto,
    MaterialIcons,
    Feather
} from '@expo/vector-icons';
import { RadioButton, Avatar } from 'react-native-paper';
import UserAvatar from '../../../../assets/user_avatar.png';
import * as blood_donor from '../../../../services/api/blood_donor';
import config from '../../../../services/config';
import location from '../../../../services/api/location';
import localStorage from '../../../../services/local_storage/storage';
import SelectDropdown from 'react-native-select-dropdown'
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../../modules/loader';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';


export default function RequestBlood({navigation, route}) {

    console.log(route.params)
    const isMounted = useRef(true);
    const [group, setGroup] = useState('A');
    const [rhD, setRhd] = useState('+');
    const [amount, setAmount] = useState(1);
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [address, setAddress] = useState('');
    const [btnName, setBtnName] = useState('Request');

    const [myLocation, setMyLocation] = useState([]);
    const [bloodRequestLocation, setBloodRequestLocation] = useState({});
    

    const [selectedLocation, setSelectedLocation] = useState();
    const [is_loading, setLoading] = useState(false);
    const [requestesd_date, setRequestedDate] = useState(undefined);
    const [requestesd_time, setRequestedTime] = useState("");


    // useEffect(async() => {
    //     if(isMounted){
    //         const my_saved_location = await location.mySavedLocation();
           
    //         setMyLocation(my_saved_location.data);
    //     }
    //     return () => {
    //         isMounted.current = false;
    //     }
    // }, [])

    async function mapData() {
        const my_saved_location = await location.mySavedLocation();
            
        setMyLocation(my_saved_location.data);
        let BloodRequestLocation = await localStorage.getItem('blood_request_location');
        let JsonBloodRequestLocation = JSON.parse(BloodRequestLocation);
        setBloodRequestLocation(JsonBloodRequestLocation)
        // console.log('=========my_saved_location=========')
        // console.log(my_saved_location)
        // console.log('=========my_saved_location=========')
    }

    useFocusEffect(
        useCallback(() => {

                if(isMounted){
                    setLoading(true)
                    mapData();
                    setLoading(false)
                }
            

            return () => {
                isMounted.current = false;
            }
        }, []),
    );

    async function RequestSubmit(){

        // let lastExecutionTime = moment().utc().format();
        let lastExecutionTime = await localStorage.getItem('last_blood_req_time');
        // let lastExecutionTime = "2022-10-10T13:39:00Z";
        
        let canExecuteNow = true
        if(lastExecutionTime){
            let nextHour = moment(lastExecutionTime).add(1,'hour').utc().format();
            let currentTime = moment().utc().format();
            canExecuteNow = moment(currentTime).isSameOrAfter(nextHour);
        }else{
            canExecuteNow = true
        }

        if(canExecuteNow){

            if(!(selectedLocation.latitude) || !(selectedLocation.longitude)){
                console.log('hello')
                
                Alert.alert("Failed", "Location Not Found!", [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                    {
                        text: "Add New",
                        onPress: () => {
                            // navigation.navigate('MapScreen')
                            navigation.navigate('MapScreen', {params:"blooddonor"})
                        },
                        style: "default"
                    }
                ]);
            }else {
                
                let user_token = await localStorage.getItem("token");
        
                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + user_token);
                myHeaders.append("Content-Type", "application/json");
        
                var raw = JSON.stringify({
                    "requested_by_user_id": "1",
                    "blood_group": group,
                    "blood_rhd": rhD,
                    "bag_required": amount,
                    "phone_number": phone,
                    "requested_date": requestesd_date,
                    "requested_time": requestesd_time,
                    "address": bloodRequestLocation.address,
                    "latitude": bloodRequestLocation.latitude,
                    "longitude": bloodRequestLocation.longitude,
                    "status": "1"
                });
    
                // console.log('=========RequestSubmit========')
                // console.log(raw)
                // console.log('=========RequestSubmit========')
        
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
        
                await fetch(config.baseUrl + "blood_donor/request/add", requestOptions)
                    .then(response => response.text())
                    .then(async(result) => { 
                        const result_data = JSON.parse(result)
    
                        console.log(result_data)
                        // setBtnName('Success!')
                        if(result_data.code == 200) {
                            
                            let currentTime = moment().utc().format();
                            await localStorage.save('last_blood_req_time', currentTime);

                            Alert.alert("Success", result_data.message, [
                                {
                                    text: "ok",
                                    onPress: () => null,
                                    style: "cancel"
                                },
                            ]);
    
                            // console.log("==========donation=======")
                            // console.log(result_data)
                            // console.log("==========donation=======")
                        } 
                        
                        else{
                            Alert.alert("Failed", result_data.message, [
                                {
                                    text: "ok",
                                    onPress: () => null,
                                    style: "cancel"
                                },
                                // { text: "YES", onPress: () => BackHandler.exitApp() }
                            ]);
                        }
                    })
                    .catch(error => {
                        Alert.alert("Failed!", error, [
                            {
                                text: "ok",
                                onPress: () => null,
                                style: "cancel"
                            },
                            // { text: "YES", onPress: () => BackHandler.exitApp() }
                        ]);
                    });
            }
        }else{
            Alert.alert("Failed", "Can't Execute Before One Hour", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                }
            ]);
        }
    }

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        var newstr = date.toString();
        // console.log('str',newstr)

        var newdate = newstr.substr(4, 12);
        setRequestedDate(newdate);
        // console.log("A date has been picked=========: ", date);
        hideDatePicker();
    };

    const handleConfirmTime = (time) => {
        var newstr = time.toString();
        let utc_time = moment(time).format("hh:mm a")
        // let final_time = moment().format("ddd, hA")
        
        // var newdate = utc_time.substr(18, 5);
        console.log('st---------------------r',utc_time)
        console.log('st---------------------r',newstr)
        setRequestedTime(utc_time);
        // console.log("A date has been picked=========: ", newdate);
        hideTimePicker();
    };

    

    return(
        <SafeAreaView style={{
            flex:1,
            backgroundColor:'#fff'
        }}>
            
            <ScrollView>

                <View style={{
                    flex:1
                }}>

                        {
                            is_loading ? (
                                <Loader/>
                            ) : (

                                <View style={{backgroundColor:'#fff'}}>

                                    <View style={{
                                        marginVertical:20,
                                        marginHorizontal:10
                                    }}>
                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'space-between',
                                            alignItems:'center'
                                        }}>
                                            <Text style={styles.checkItemStyle}>Group</Text>
                                            <RadioButton.Group  onValueChange={newValue => setGroup(newValue)} value={group}>
                                                <View style={{flexDirection:'row'}}>
                                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                                        <RadioButton value="A" />
                                                        <Text style={styles.radioTxtStyle}>A</Text>
                                                    </View>
                                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                                        <RadioButton value="B" />
                                                        <Text style={styles.radioTxtStyle}>B</Text>
                                                    </View>
                                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                                        <RadioButton value="AB" />
                                                        <Text style={styles.radioTxtStyle}>AB</Text>
                                                    </View>
                                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                                        <RadioButton value="O" />
                                                        <Text style={styles.radioTxtStyle}>O</Text>
                                                    </View>
                                                </View>
                                            </RadioButton.Group>
                                        </View>

                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'space-between',
                                            alignItems:'center'
                                        }}>
                                            <Text style={styles.checkItemStyle}>RhD</Text>
                                            <RadioButton.Group  onValueChange={newValue => setRhd(newValue)} value={rhD}>
                                                <View style={{flexDirection:'row'}}>
                                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                                        <RadioButton value="+" />
                                                        <Text style={styles.radioTxtStyle}>+ ve</Text>
                                                    </View>
                                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                                        <RadioButton value="-" />
                                                        <Text style={styles.radioTxtStyle}>- ve</Text>
                                                    </View>
                                                </View>
                                            </RadioButton.Group>
                                        </View>

                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'space-between'
                                        }}>
                                            <Text style={styles.checkItemStyle}>Amount</Text>
                                            <View style={{
                                                flexDirection:'row',
                                                alignItems:'center'
                                            }}>
                                                <TouchableOpacity onPress={() => {
                                                    if(amount > 1){
                                                        setAmount(amount - 1)
                                                    }
                                                }}>
                                                    <AntDesign name="minuscircleo" size={25} color="#3AAD94" />
                                                </TouchableOpacity>
                                                <Text style={{padding:5,fontWeight:'bold',fontSize:15,marginHorizontal:5}}>{amount}</Text>
                                                <TouchableOpacity onPress={() => {
                                                    setAmount(amount + 1)
                                                }}>
                                                    <AntDesign name="pluscircleo" size={25} color="#3AAD94" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                            justifyContent:'space-between'
                                        }}>
                                            <Text style={styles.checkItemStyle}>Phone Number</Text>
                                            <TextInput 
                                                placeholder='01675******'
                                                style={{
                                                    borderBottomWidth:.5,
                                                    borderBottomColor:'#3AAD94',
                                                    padding:5,
                                                    marginHorizontal:20,
                                                    width:'50%',
                                                    color:'#70707B'
                                                }}
                                                keyboardType="phone-pad"
                                                onChangeText={(text) => setPhone(text)}
                                            />
                                        </View>

                                        <View style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                            justifyContent:'space-between'
                                        }}>
                                            <Text style={styles.checkItemStyle}>Needed Date</Text>
                                            <View style={{
                                                flex:.7
                                            }}>
                                                <TouchableOpacity 
                                                    style={{
                                                        borderWidth:.5,
                                                        paddingHorizontal:10,
                                                        paddingVertical:7,
                                                        borderRadius:3,
                                                        borderColor:'#3AAD94',
                                                        marginHorizontal:20,
                                                        marginVertical:10
                                                    }}
                                                    onPress={showDatePicker}
                                                >
                                                    <Text style={{
                                                        color:'#707070',
                                                        fontSize:16,
                                                        fontWeight:'500'
                                                    }}>
                                                        {requestesd_date ? requestesd_date : 'select date'}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        <View style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                            justifyContent:'space-between'
                                        }}>
                                            <Text style={styles.checkItemStyle}>Needed time</Text>
                                            <View style={{
                                                flex:.7
                                            }}>
                                                <TouchableOpacity 
                                                    style={{
                                                        borderWidth:.5,
                                                        paddingHorizontal:10,
                                                        paddingVertical:7,
                                                        borderRadius:3,
                                                        borderColor:'#3AAD94',
                                                        marginHorizontal:20,
                                                        marginVertical:10
                                                    }}
                                                    onPress={showTimePicker}
                                                >
                                                    <Text style={{
                                                        color:'#707070',
                                                        fontSize:16,
                                                        fontWeight:'500'
                                                    }}>
                                                        {requestesd_time ? requestesd_time : 'select time'}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>

                                        
                                        {/* <View style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                            justifyContent:'space-between'
                                        }}>
                                            <Text style={styles.checkItemStyle}>Address</Text>
                                            <TextInput 
                                                placeholder='Address'
                                                style={{
                                                    borderBottomWidth:.5,
                                                    borderBottomColor:'#3AAD94',
                                                    padding:5,
                                                    marginHorizontal:20,
                                                    width:'50%',
                                                    color:'#70707B'
                                                }}
                                                onChangeText={(text) => setAddress(text)}
                                            />
                                            
                                        </View> */}
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            paddingVertical:10,
                                            paddingHorizontal:15,
                                        }}>
                                            <View style={{
                                                flex: 8
                                            }}>
                                                <Text>
                                                    {bloodRequestLocation?.address ? bloodRequestLocation?.address : "Set Location"}
                                                </Text>
                                            </View>

                                            <View style={{
                                                flex: 2,
                                                flexDirection: 'row'
                                            }}>
                                                <TouchableOpacity 
                                                    style={{
                                                        flexDirection: 'row'
                                                    }}
                                                    onPress={() => navigation.navigate('MapScreen', {params:"blooddonor"})} 
                                                >
                                                    <Ionicons name="add" size={24} color="black" />
                                                    <Text>Add</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        {/* <View>
                                            <Text style={styles.checkItemStyle}>Location</Text>
                                            
                                            <View style={{
                                                marginHorizontal:5,
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
                                                    
                                                    onPress={() => navigation.navigate('MapScreen', {params:"blooddonor"})} 
                                                >
                                                    <Text style={{
                                                        color:'#fff',
                                                        fontSize:14,
                                                        fontWeight:'bold',
                                                        textAlign:'center',
                                                        padding:5
                                                    }}>
                                                        Add new location d
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View> */}
                                        
                                    </View>


                                    <View style={{
                                        marginVertical:15,
                                        marginHorizontal:20
                                    }}>
                                        <TouchableOpacity 
                                            style={{
                                                backgroundColor:'#3AAD94',
                                                paddingVertical:10,
                                                paddingHorizontal:15,
                                                borderRadius:100/2
                                            }}
                                            onPress={() => {
                                                RequestSubmit()
                                            }}
                                        >
                                            <Text style={{
                                                color:'#fff',
                                                fontSize:16,
                                                fontWeight:'bold',
                                                textAlign:'center'
                                            }}>{btnName}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    {/* <Text style={{
                                        fontWeight:'bold',
                                        fontSize:13,
                                        color:'#7B93A4',
                                        padding:10,
                                        marginHorizontal:10
                                    }}>Today's feed</Text>
                                    <View style={{
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        marginHorizontal:10,
                                        padding:5,
                                        marginVertical:10
                                    }}>
                                        
                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'space-around'
                                        }}>
                                            <View style={{

                                            }}>
                                                <Avatar.Image size={40} source={UserAvatar} />
                                            </View>
                                            <View style={{
                                                justifyContent:'center',
                                                alignItems:'flex-start',
                                                marginHorizontal:10
                                            }}>
                                                <Text style={{
                                                    fontSize:14,
                                                    fontWeight:'bold'
                                                }}>Azmain Hossain</Text>
                                                <Text style={{
                                                    fontSize:12,
                                                    fontWeight:'400',
                                                    color:'#7B93A4'
                                                }}>Requested for operation</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Text 
                                                style={{
                                                    fontSize:14,
                                                    fontWeight:'bold',
                                                    color:'#008A2E'
                                                }}>B + ve</Text>
                                            <Text style={{
                                                    fontSize:12,
                                                    fontWeight:'400',
                                                    color:'#7B93A4'
                                                }}>12:05 pm</Text>
                                        </View>
                                    </View>


                                    <View style={{
                                        flexDirection:'row',
                                        justifyContent:'space-between',
                                        marginHorizontal:10,
                                        padding:5,
                                        marginVertical:10
                                    }}>
                                        
                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'space-around'
                                        }}>
                                            <View style={{

                                            }}>
                                                <Avatar.Image size={40} source={UserAvatar} />
                                            </View>
                                            <View style={{
                                                justifyContent:'center',
                                                alignItems:'flex-start',
                                                marginHorizontal:10
                                            }}>
                                                <Text style={{
                                                    fontSize:14,
                                                    fontWeight:'bold'
                                                }}>Azmain Hossain</Text>
                                                <Text style={{
                                                    fontSize:12,
                                                    fontWeight:'400',
                                                    color:'#7B93A4'
                                                }}>Requested for operation</Text>
                                            </View>
                                        </View>
                                        <View>
                                            <Text 
                                                style={{
                                                    fontSize:14,
                                                    fontWeight:'bold',
                                                    color:'#E40404'
                                                }}>B - ve</Text>
                                            <Text style={{
                                                    fontSize:12,
                                                    fontWeight:'400',
                                                    color:'#7B93A4'
                                                }}>12:05 pm</Text>
                                        </View>
                                    </View> */}

                                    
                                </View>
                            )
                        }

                    <View>
                        {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            // date={last_donate}
                        />
                    </View>

                    <View>
                        {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
                        <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            onConfirm={handleConfirmTime}
                            onCancel={hideTimePicker}
                        />
                    </View>
                </View>

            </ScrollView>
            

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    checkItemStyle:{
        padding:5,
        fontWeight:'bold',
        fontSize:14,
    },
    radioTxtStyle:{
        fontSize:12,
        fontWeight:'bold',
        color:'#7E7E7E'
    }
});