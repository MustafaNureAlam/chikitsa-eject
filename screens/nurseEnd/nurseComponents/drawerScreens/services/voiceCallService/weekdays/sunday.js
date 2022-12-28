
import React, {useCallback, useEffect, useState, useRef} from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Alert
} from 'react-native';
import { 
    Ionicons,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Octicons,
    Entypo,
    Fontisto 
} from '@expo/vector-icons';
import { IconButton, Colors, FAB  } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import token from '../../../../../../../services/local_storage/storage';
import app_config from '../../../../../../../services/config'
import Loader from '../../../../../../modules/loader';
import Toast from 'react-native-toast-message';

export default function NurseSunday({navigation, route}) {

    const isMounted = useRef(true);
    const [day_id, setDayId] = useState('7');
    const [is_loading, setLoading] = useState(false);
    const [api_data, setApiData] = useState(null);

    useFocusEffect(
        useCallback(() => {
            if(isMounted) {
                setLoading(true);
                getDoctorSlots()
                setLoading(false);
            }

            return() => {
                isMounted.current = false
                console.log('sunday_returned')
            }
        }, [navigation, route]),
    );

    function create_slot() {
        navigation.navigate('CreateNurseCallServiceScreen',day_id)
    }


    async function getDoctorSlots() {
        
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        await fetch( app_config.baseUrl + "nurse/my_slots/7", requestOptions)
        .then(response => response.text())
        .then(result => {
            let doctor_slot_data = JSON.parse(result);
            if(isMounted) {

                setApiData(doctor_slot_data);
            }
            console.log('=====doctor_slot_data=====', doctor_slot_data)
        })
        .catch(error => console.log('error', error));
    }
    

    async function removeSlot(slot_index) {

        Alert.alert(
            "Remove Slot",
            "Are you sure, want to remove slot?",
            [
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { 
                text: "Yes", onPress: async() => 
                
                    {
                        let user_token = await token.getItem("token");
                        var myHeaders = new Headers();
                        myHeaders.append("Authorization", "Bearer " + user_token);
                        myHeaders.append("Content-Type", "application/json");

                        var raw = JSON.stringify({
                        "slot_time_id": slot_index
                        });

                        var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                        };

                        await fetch( app_config.baseUrl + "nurse/slot_remove", requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            console.log(result)
                            let removed = JSON.parse(result);
                            if(removed.code == 200) {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Slot removed',
                                    text2: 'Successfully revomed Slot!'
                                });
                                getDoctorSlots();
                            }
                        })
                        .catch(error => console.log('error', error));
                    }
                }
            ]
        );

        
    }

    return (
        <SafeAreaView style={{ flex:1}}>
            <StatusBar backgroundColor={'#075141'} />
            {
                is_loading ? (
                    <Loader/>
                ) : (

                    <View>
                        {
                            api_data?.data.length > 0 ? (
                                <FlatList 
                                    data={api_data?.data}
                                    renderItem={({item, index}) => (
                                        <View>
                                            {
                                                item?.type === "audio" && (
                                                    <View style={{
                                                        marginHorizontal:10,
                                                        flex:1,
                                                        marginTop:7
                                                    }}>
                                                        <View style={{
                                                            backgroundColor:'#C2F2E8',
                                                            // flex:.5,
                                                            marginHorizontal:5,
                                                            padding:5,
                                                            borderRadius:10,
                                                            marginVertical:7
                                                        }}>
                                                                <View style={{
                                                                    flexDirection:'row',
                                                                    justifyContent:'space-between',
                                                                    paddingHorizontal:7,
                                                                    paddingVertical:5,
                                                                    alignItems:'flex-end'
                                                                }}>
                                                                    <Text style={{
                                                                        textAlign:'center',
                                                                        fontSize:16,
                                                                        fontWeight:'bold',
                                                                        color:'#000',
                                                                        paddingHorizontal:10
                                                                    }}>{item?.slot_name}</Text>
                                                                    
                                                                    <View style={{
                                                                        flexDirection:'row'
                                                                    }}>
                                                                        
                                                                        <TouchableOpacity style={{
                                                                                backgroundColor:'#3AAD94',
                                                                                padding:5,
                                                                                borderRadius:5,
                                                                                marginHorizontal:3
                                                                            }}
                                                                            onPress={() => {
                                                                                navigation.navigate('CreateNurseCallServiceScreen',{data : item, from : 'update'})
                                                                            }}
                                                                        >
                                                                            <MaterialCommunityIcons 
                                                                                name="circle-edit-outline"
                                                                                size={24}
                                                                                color={'#fff'}
                                                                            />
                                                                        </TouchableOpacity>
                                    
                                                                        <TouchableOpacity style={{
                                                                                backgroundColor:'#D22C2C',
                                                                                padding:5,
                                                                                borderRadius:5,
                                                                                marginHorizontal:3
                                                                            }}
                                                                            onPress={()=> {
                                                                                removeSlot(item?.id)
                                                                            }}
                                                                        >
                                                                            <MaterialCommunityIcons 
                                                                                name="close-circle"
                                                                                size={24}
                                                                                color={'#fff'}
                                                                            />
                                                                        </TouchableOpacity>
                                    
                                                                    </View>
                                                                </View>
                                    
                                                                <View style={{
                                                                    marginHorizontal:15,
                                                                    paddingVertical:5
                                                                }}>
                                                                    
                                                                    <View style={{
                                                                        flexDirection:'row',
                                                                        alignItems:'center',
                                                                        justifyContent:'space-between',
                                                                        marginVertical:5,
                                                                    }}>
                                                                        
                                                                        <View style={{
                                                                            alignItems:'center',
                                                                            backgroundColor:'#fff',
                                                                            paddingVertical:10,
                                                                            borderRadius:10,
                                                                            paddingHorizontal:20
                                                                        }}>
                                                                            <Text style={{
                                                                                fontSize:14,
                                                                                fontWeight:'bold'
                                                                            }}>From</Text>
                                                                            <Text style={{
                                                                                fontSize:11,
                                                                                fontWeight:'bold'
                                                                            }}>{item?.time_from}</Text>
                                                                        </View>
                                    
                                                                        <Text style={{}}>
                                                                            <MaterialCommunityIcons 
                                                                                name="minus"
                                                                                size={24}
                                                                                color={'#3AAD94'}
                                                                            />
                                                                        </Text>
                                    
                                                                        <View style={{
                                                                            alignItems:'center',
                                                                            backgroundColor:'#fff',
                                                                            paddingVertical:10,
                                                                            borderRadius:10,
                                                                            paddingHorizontal:20
                                                                        }}>
                                                                            <Text style={{
                                                                                fontSize:14,
                                                                                fontWeight:'bold'
                                                                            }}>To</Text>
                                                                            <Text style={{
                                                                                fontSize:11,
                                                                                fontWeight:'bold'
                                                                            }}>{item?.time_to}</Text>
                                                                        </View>
                                                                    </View>
                                                                    
                                                                    <View style={{
                                                                        flexDirection:'row',
                                                                        justifyContent:'space-around',
                                                                        alignItems:'center',
                                                                        marginVertical:7,
                                                                        backgroundColor:'#3AAD94',
                                                                        borderRadius:10,
                                                                        paddingVertical:7,
                                                                        paddingHorizontal:10
                                                                    }}>
                                                                        
                                                                        <Text style={{
                                                                            fontSize:16,
                                                                            fontWeight:'bold',
                                                                            color:'#fff'
                                                                        }}>{item?.slot_name}</Text>
                                    
                                                                        <Text style={{
                                                                            fontSize:16,
                                                                            fontWeight:'bold',
                                                                            color:'#fff'
                                                                        }}>{item?.price} BDT</Text>
                                                                    </View>
                                                                </View>
                                                            
                                    
                                                        </View>
                                    
                                                    </View>
                                                )
                                            }
                                        </View>
                                    )}
                                    showsVerticalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            ) : (
                                <View style={{
                                    height:'100%',
                                    justifyContent:'center'
                                }}>
                                    <Text style={{
                                        fontSize:16,
                                        fontWeight:'bold',
                                        textAlign:'center',
                                        padding:5,color:'#000'
                                    }}>No Slots Available</Text>
                                </View>
                            )
                        }
                    </View>
                    
                )
            }
            
                

            <FAB
                style={{
                    position: 'absolute',
                    margin: 16,
                    right: 0,
                    bottom: 0,
                    backgroundColor:'#fff'
                }}
                small={false}
                icon="plus"
                onPress={() => create_slot()}
                animated={true}
                color='#000'
            />
        
        </SafeAreaView>
    )
}

