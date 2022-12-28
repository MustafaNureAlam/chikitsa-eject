
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
    Picker
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
import { RadioButton } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import local_storage from '../../../../services/local_storage/storage'
import * as SecureStore from 'expo-secure-store';
import token from '../../../../services/local_storage/storage';
import { useFocusEffect } from '@react-navigation/native';
import config from '../../../../services/config';
import location from '../../../../services/api/location';





export default function InterestedDonorBlood({navigation}) {

    const [gender, setGender] = useState('Male');
    const [maritalStatus, setMaritalStatus] = useState('Married');
    const [donorGroup, setDonorGroup] = useState('A');
    const [donorRhd, setDonorRhd] = useState('+ve');
    const [donor_number, setDonorNumber] = useState(null);
    const [donor_mail, setDonorMail] = useState(null);
    const [donor_address, setAddress] = useState(null);
    const [last_donate, setLastDonateDate] = useState(undefined);
    const [donor_height, setDonorHeight] = useState(null);
    const [donor_weight, setDonorWeight] = useState(null);
    const [donor_User_id, setUserId] = useState(null);

    const [myLocation, setMyLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState();
    const [active_location, setActiveLocation] = useState([]);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    
    const isMounted = useRef(true);

    async function init_fn(){
        if(isMounted){
            const user_id = await local_storage.getItem('user_id')
            setUserId(user_id);
            mapData();
            getApiData()
        }
    }

    useFocusEffect(
        useCallback(() => {
            init_fn()

            return () => {
                isMounted.current = false;
            }
        }, []),
    );


    async function mapData() {
        const my_saved_location = await location.mySavedLocation();
        setMyLocation(my_saved_location.data);
    }

    async function getApiData(){
        // personal_detailes
        let user_token = await token.getItem("token");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        let response = []
        await fetch( config.baseUrl + "blood_donor/personal_detailes", requestOptions)
            .then(response => response.text())
            .then(result => {
                response = JSON.parse(result)
                console.log(response)
                setDonorGroup(response?.data[0]?.blood_group)
                setDonorRhd(response?.data[0]?.blood_rhd)
                setDonorNumber(response?.data[0]?.phone_number)
                setDonorMail(response?.data[0]?.mail)
                setAddress(response?.data[0]?.address)
                setDonorHeight(response?.data[0]?.height)
                setDonorWeight(response?.data[0]?.weight)
                setMaritalStatus(response?.data[0]?.marital_status)
                setLastDonateDate(response?.data[0]?.last_donate)
            })
            .catch(error => console.log('error Interested blood donor', error));
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        var newstr = date.toString();
        // console.log('str',newstr)

        var newdate = newstr.substr(4, 12);
        setLastDonateDate(newdate);
        // console.log("A date has been picked=========: ", date);
        hideDatePicker();
    };


    const donor_data_obj = {
        donor_user_id : donor_User_id,
        blood_group : donorGroup,
        blood_rhd : donorRhd,
        phone_number : donor_number,
        address : donor_address,
        mail : donor_mail,
        marital_status : maritalStatus,
        height : donor_height,
        weight : donor_weight,
        last_donate : last_donate,
        longitude: active_location.latitude,
        longitude: active_location.longitude
    }

    // console.log(active_location.latitude)
    // console.log(active_location.longitude)

    async function storeBloodDonorData() {
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(donor_data_obj);

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        console.log(donor_data_obj)
        await fetch( config.baseUrl + "blood_donor/store", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
        })
        .catch(error => console.log('error', error));
    }

    function setDonorData() {
        storeBloodDonorData();
        // console.log('donor_data_obj', donor_data_obj)
        navigation.navigate('BloodDonorStack',{ screen: 'UpdateBloodDonorScreen'})
    }

    

    return(
        <SafeAreaView>
            <StatusBar backgroundColor={'#075141'} />
            <ScrollView>
                <View style={{backgroundColor:'#fff'}}>
                    
                    <View style={{
                        marginVertical:10
                    }}>
                        <Text style={{
                            textAlign:'center',
                            padding:5,
                            fontSize:16,
                            fontWeight:'bold'
                        }}>Personal Details</Text>
                        
                        {/* <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            paddingHorizontal:5,
                            marginVertical:10,
                            marginHorizontal:5
                        }}>
                            <TextInput
                                keyboardType='phone-pad'
                                placeholder='01675******'
                                style={{
                                    fontSize:12,
                                    fontWeight:'bold',
                                    borderWidth:.3,
                                    borderColor:'#70707B',
                                    borderRadius:100/2,
                                    paddingHorizontal:5,
                                    flex:.5,
                                    marginHorizontal:3,
                                    textAlign:'center'
                                }}
                            />
                            <TextInput
                                autoCapitalize='none'
                                keyboardType='email-address'
                                placeholder='example@mail.com'
                                style={{
                                    fontSize:12,
                                    fontWeight:'bold',
                                    borderWidth:.3,
                                    borderColor:'#70707B',
                                    borderRadius:100/2,
                                    paddingHorizontal:5,
                                    flex:.5,
                                    marginHorizontal:3,
                                    textAlign:'center'
                                }}
                            />
                        </View> */}

                        <View style={{
                            marginVertical:5,
                            marginHorizontal:10
                        }}>
                            <View style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'center'
                            }}>
                                {/* <Text style={styles.checkItemStyle}>Gender</Text>
                                <RadioButton.Group  onValueChange={newValue => setGender(newValue)} value={gender}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="Male" />
                                            <Text style={styles.radioTxtStyle}>Male</Text>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="Female" />
                                            <Text style={styles.radioTxtStyle}>Female</Text>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="Other" />
                                            <Text style={styles.radioTxtStyle}>Other</Text>
                                        </View>
                                    </View>
                                </RadioButton.Group> */}
                            </View>

                            <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            alignItems:'center'
                        }}>
                            <Text style={styles.checkItemStyle}>Group</Text>
                            <RadioButton.Group  onValueChange={newValue => setDonorGroup(newValue)} value={donorGroup}>
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
                                <RadioButton.Group  onValueChange={newValue => setDonorRhd(newValue)} value={donorRhd}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="+ve" />
                                            <Text style={styles.radioTxtStyle}>+ ve</Text>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="-ve" />
                                            <Text style={styles.radioTxtStyle}>- ve</Text>
                                        </View>
                                    </View>
                                </RadioButton.Group>
                            </View>

                            <View style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between'
                            }}>
                                <Text style={styles.checkItemStyle}>Phone Number</Text>
                                <TextInput 
                                    placeholder='01675******'
                                    value={donor_number}
                                    style={{
                                        borderBottomWidth:.5,
                                        borderBottomColor:'#3AAD94',
                                        padding:5,
                                        marginHorizontal:20,
                                        width:'50%',
                                        color:'#70707B'
                                    }}
                                    onChangeText={(number) => setDonorNumber(number)}
                                    keyboardType="phone-pad"
                                />
                            </View>

                            <View style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between'
                            }}>
                                <Text style={styles.checkItemStyle}>Email</Text>
                                <TextInput 
                                    value={donor_mail}
                                    placeholder='example@mail.com'
                                    style={{
                                        borderBottomWidth:.5,
                                        borderBottomColor:'#3AAD94',
                                        padding:5,
                                        marginHorizontal:20,
                                        width:'50%',
                                        color:'#70707B'
                                    }}
                                    onChangeText={(mail) => setDonorMail(mail)}
                                    keyboardType="email-address"
                                    autoCapitalize='none'
                                />
                            </View>

                            <View style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between'
                            }}>
                                <View style={{flex:.5}}>
                                    <Text style={styles.checkItemStyle}>Last Donate</Text>
                                </View>
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
                                            {last_donate ? last_donate : 'select date'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>


                            












                            <View style={{
                                            // flexDirection:'row',
                                            // alignItems:'center',
                                            // justifyContent:'space-between'
                            }}>
                                <Text style={styles.checkItemStyle}>Address</Text>
                                
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
                                        
                                        onPress={() => navigation.navigate('MapScreen', {params:"blooddonor"})} 
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
                            
                            {/* <View style={{
                                flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between'
                            }}>
                                <Text style={styles.checkItemStyle}>Address</Text>
                                <TextInput 
                                    placeholder='Address'
                                    value={donor_address}
                                    style={{
                                        borderBottomWidth:.5,
                                        borderBottomColor:'#3AAD94',
                                        padding:5,
                                        marginHorizontal:20,
                                        width:'50%',
                                        color:'#70707B'
                                    }}
                                    onChangeText={(address) => setAddress(address)}
                                />
                            </View> */}

                            <View style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
                                paddingHorizontal:5,
                                marginVertical:10,
                                marginHorizontal:5
                            }}>
                                <TextInput
                                    placeholder='Height'
                                    value={donor_height}
                                    style={{
                                        fontSize:12,
                                        fontWeight:'bold',
                                        borderWidth:.3,
                                        borderColor:'#70707B',
                                        borderRadius:100/2,
                                        paddingHorizontal:5,
                                        flex:.5,
                                        marginHorizontal:3,
                                        textAlign:'center'
                                    }}
                                    onChangeText={(height) => setDonorHeight(height)}
                                    keyboardType="ascii-capable"
                                />
                                <TextInput
                                    placeholder='Weight'
                                    value={donor_weight}
                                    style={{
                                        fontSize:12,
                                        fontWeight:'bold',
                                        borderWidth:.3,
                                        borderColor:'#70707B',
                                        borderRadius:100/2,
                                        paddingHorizontal:5,
                                        flex:.5,
                                        marginHorizontal:3,
                                        textAlign:'center'
                                    }}
                                    onChangeText={(weight) => setDonorWeight(weight)}
                                    keyboardType="ascii-capable"
                                />
                            </View>

                            <View style={{
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'center'
                            }}>
                                <Text style={styles.checkItemStyle}>Marital status</Text>
                                
                                <RadioButton.Group  onValueChange={newValue => setMaritalStatus(newValue)} value={maritalStatus}>
                                    <View style={{flexDirection:'row'}}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="Married" />
                                            <Text style={styles.radioTxtStyle}>Married</Text>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <RadioButton value="Single" />
                                            <Text style={styles.radioTxtStyle}>Single</Text>
                                        </View>
                                    </View>
                                </RadioButton.Group>
                            </View>
                            
                        </View>

                        

                    </View>

                    {/* <View style={{
                        marginHorizontal:10
                    }}>
                        <Text style={{
                            textAlign:'center',
                            padding:5,
                            fontSize:16,
                            fontWeight:'bold'
                        }}>Medical Details</Text>


                        <View style={{
                            flexDirection:'row',
                        }}>
                            <Text style={styles.checkItemStyle}>Amount</Text>
                            <View style={{
                                flexDirection:'row',
                                marginHorizontal:24,
                                alignItems:'center'
                            }}>
                                <TouchableOpacity>
                                    <AntDesign name="minuscircleo" size={22} color="#3AAD94" />
                                </TouchableOpacity>
                                <Text style={{padding:5,fontWeight:'bold',fontSize:14,marginHorizontal:5}}>1</Text>
                                <TouchableOpacity>
                                    <AntDesign name="pluscircleo" size={22} color="#3AAD94" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{paddingVertical:10}}>
                            <Text style={styles.checkItemStyle}>Allergies</Text>
                            <View style={{
                                flexDirection:'row',
                                marginVertical:10
                            }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor:'#fefefe',
                                        borderWidth:1,
                                        borderColor:'#3AAD94',
                                        borderRadius:100/2,
                                        paddingVertical:5,
                                        paddingHorizontal:10,
                                        marginHorizontal:5
                                    }}
                                >
                                    <Text style={{
                                        fontSize:12,
                                        fontWeight:'bold',
                                        textAlign:'center'
                                    }}>Allergy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor:'#fefefe',
                                        borderWidth:1,
                                        borderColor:'#3AAD94',
                                        borderRadius:100/2,
                                        paddingVertical:5,
                                        paddingHorizontal:10
                                    }}
                                >
                                    <Text style={{
                                        fontSize:12,
                                        fontWeight:'bold',
                                        textAlign:'center'
                                    }}>Allergy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{paddingVertical:10}}>
                            <Text style={styles.checkItemStyle}>Current Medications</Text>
                            <View style={{
                                flexDirection:'row',
                                marginVertical:10
                            }}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor:'#fefefe',
                                        borderWidth:1,
                                        borderColor:'#3AAD94',
                                        borderRadius:100/2,
                                        paddingVertical:5,
                                        paddingHorizontal:10,
                                        marginHorizontal:5
                                    }}
                                >
                                    <Text style={{
                                        fontSize:12,
                                        fontWeight:'bold',
                                        textAlign:'center'
                                    }}>Diabetes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor:'#fefefe',
                                        borderWidth:1,
                                        borderColor:'#3AAD94',
                                        borderRadius:100/2,
                                        paddingVertical:5,
                                        paddingHorizontal:10
                                    }}
                                >
                                    <Text style={{
                                        fontSize:12,
                                        fontWeight:'bold',
                                        textAlign:'center'
                                    }}>Kidney</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View> */}

                    <View style={{
                        // alignItems:'center',
                        marginVertical:20,
                        marginHorizontal:20,
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor:'#3AAD94',
                            paddingVertical:10,
                            paddingHorizontal:20,
                            borderRadius:100/2
                        }}
                        onPress={() => setDonorData()}
                        >
                            <Text style={{
                                fontSize:16,
                                fontWeight:'bold',
                                textAlign:'center',
                                color:'#fff'
                            }}>Continue</Text>
                        </TouchableOpacity>
                    </View>

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