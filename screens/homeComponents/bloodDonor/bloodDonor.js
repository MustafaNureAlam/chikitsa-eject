import React, {useState, useCallback} from 'react'
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
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Avatar } from 'react-native-paper';
import UserAvatar from '../../../assets/user_avatar.png';
import { RadioButton } from 'react-native-paper';
import InterestedDonorBlood from './blood-donor-tabs/InterestedDonorBlood';
import RequestBlood from './blood-donor-tabs/RequestBlood';
import RequestList from './blood-donor-tabs/requestList';
import location from '../../../services/api/location';
import {useFocusEffect} from '@react-navigation/native';
import * as Storage from '../../../services/local_storage/storage';
import RBSheet from "react-native-raw-bottom-sheet";
import DonataionHistoryScreen from './historyComponents/donataionHistory';
import ActiveDonationHistoryScreen from './historyComponents/activeDonationHistory';
import RequestHistoryScreen from './historyComponents/requestHistory';


const Tab = createMaterialTopTabNavigator();

export default function BloodDonorScreen({navigation}) {
    
    const isMounted = React.useRef(true);
    const refRBSheet = React.useRef();

    const [myLocation, setMySavedLocation] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState();
    const [active_location, setActiveLocation] = useState([]);

    async function CurrentLocationUpdate(location){
        await Storage.save('active_location', JSON.stringify(location)).then(save_res => {
            const data = JSON.parse(save_res)
            setActiveLocation(data)
        })
        refRBSheet.current.close();
    }

    async function init_fn(){
        if(isMounted) {
            await Storage.getItem('active_location').then(res => {
                if(res == null){
                    refRBSheet.current.open();
                }else {
                    const data = JSON.parse(res)
                    setActiveLocation(data)
                }
            })
            
            const my_saved_location = await location.mySavedLocation();
        
            setMySavedLocation(my_saved_location.data);
        }
    }

    useFocusEffect(
        useCallback(() => {
            
            init_fn();

            return() => {
                isMounted.current = false;
            }
        }, []),
    );

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'} />
            <View>
                {/* <View style={{
                    flexDirection:'row',
                    alignItems:'center',
                    backgroundColor:'#5ED4BA',
                    borderRadius:100/2,
                    marginVertical:10,
                    marginHorizontal:20
                    }}>
                    <TextInput 
                        
                        placeholder='Search'
                        style={{
                            // borderWidth:1,
                            width:'85%',
                            borderRadius:100/2,
                            paddingHorizontal:10,
                            paddingVertical:3,
                            backgroundColor:'#fff',
                            height:50,
                            fontSize:14,
                            fontWeight:'bold'
                        }}
                    />
                    <TouchableOpacity 
                        style={{
                        
                        }}>
                        <Ionicons style={{
                            marginLeft:5
                        }} name='mic-outline' size={24} color={'#fff'} />
                    </TouchableOpacity>
                </View> */}
                <View style={{paddingHorizontal:20, paddingVertical:8}}>
                    <Text style={{
                            fontWeight:'400',
                            fontSize:14,
                            color:'#B6B7B7'
                        }}>Default Location</Text>
                        {/* <Text style={{
                            fontSize:18,
                            fontWeight:'bold',
                            color:'#7C7D7E'
                        }}>Current Location</Text> */}
                        <TouchableOpacity>
                            <Text style={{
                                fontSize:18,
                                fontWeight:'bold',
                                color:'#7C7D7E'
                                }}
                                onPress={() => refRBSheet.current.open()}
                                >{active_location.location_name}
                                    {/* <Text>
                                        <Ionicons name="chevron-down" size={22} color="black" />
                                    </Text> */}
                            </Text>
                        </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:1,marginTop:4}}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 12, fontWeight:'bold' },
                        tabBarActiveTintColor:'#3AAD94',
                        tabBarInactiveTintColor:'#ccc',
                        tabBarScrollEnabled:true,
                        tabBarIndicatorStyle:{backgroundColor:'#3AAD94'}
                    }}
                >
                    
                    <Tab.Screen 
                        options={{ tabBarLabel: 'Request Blood'}}
                        name="RequestBlood" 
                        component={RequestBlood} 
                    />
                    <Tab.Screen 
                        options={{ tabBarLabel: 'Interested to Donate'}}
                        name="InterestedDonorBlood" 
                        component={InterestedDonorBlood} 
                    />

                    <Tab.Screen 
                        options={{ tabBarLabel: 'Donate to Requests'}}
                        name="RequestList" 
                        component={RequestList} 
                    />
                    
                    <Tab.Screen 
                        options={{ tabBarLabel: 'Donataion History'}}
                        name="DonataionHistoryScreen" 
                        component={DonataionHistoryScreen} 
                    />
                    
                    {/* <Tab.Screen 
                        options={{ tabBarLabel: 'Active Donataion'}}
                        name="ActiveDonationHistoryScreen" 
                        component={ActiveDonationHistoryScreen} 
                    /> */}
                    
                    <Tab.Screen 
                        options={{ tabBarLabel: 'Request History'}}
                        name="RequestHistoryScreen" 
                        component={RequestHistoryScreen} 
                    />
                    
                </Tab.Navigator>
                <RBSheet
                    // myLocation
                    ref={refRBSheet}
                    height={450}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    customStyles={{
                    wrapper: {
                        // backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        // backgroundColor: "#000"
                    }
                    }}
                >
                    <View style={{
                        paddingVertical:10
                    }}>
                        <View>
                            <Text style={{
                                textAlign:"center",
                                fontSize:18,
                                fontWeight:'bold',
                                padding:7
                            }}>Select Current Location</Text>
                        </View>
                        
                        <FlatList
                            data={myLocation}
                            renderItem={({item, index}) => (
                                <View style={{ padding: 8 }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            console.log(item)
                                            CurrentLocationUpdate(item)
                                        }}
                                    >

                                        <View style={{ 
                                            flex:1,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            }}>
                                            <View style={{
                                                flexDirection: 'row'
                                            }}>

                                                <View style={{
                                                    marginLeft: 10 
                                                }}>
                                                    <Text style={{
                                                        fontSize: 14,
                                                        fontWeight:'bold'
                                                    }}>{item.location_name}</Text>
                                                    <Text style={{
                                                        color: '#737373',
                                                        fontSize:13,
                                                    }}>{item.location_mobile}</Text>
                                                </View>
                                            </View>
                                            {/* <View>
                                                <TouchableOpacity>
                                                    <AntDesign name="edit" size={24} color="#737373" />
                                                </TouchableOpacity>
                                            </View> */}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={"selectedId"}
                            ListFooterComponent={
                                <View style={{
                                    marginVertical:20,
                                    marginHorizontal:20,
                                    paddingBottom:60
                                }}>
                                    <TouchableOpacity style={{
                                            backgroundColor:'#3AAD94',
                                            paddingVertical:10,
                                            paddingHorizontal:20,
                                            borderRadius:100/2
                                        }}
                                        onPress={() => {
                                            refRBSheet.current.close();
                                            navigation.navigate('MapScreen', {params:"drawerHome"})
                                        }}
                                    >
                                        <Text style={{
                                            fontSize:14,
                                            fontWeight:'bold',
                                            padding:3,
                                            textAlign:'center',
                                            color:'#fff'
                                        }}>
                                            Add New
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        />
                                
                            
                    </View>
                </RBSheet>
            </View>
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
