import React from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { 
    Ionicons,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Octicons,
    Entypo,
    Fontisto 
} from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { IconButton, Colors } from 'react-native-paper';

const SlotTab = createMaterialTopTabNavigator();
const VideoTab = createMaterialTopTabNavigator();
const ChatTab = createMaterialTopTabNavigator();

function Saturday({ navigation }) {
    return (
      <View style={{ flex:1}}>
        
        <View style={{
            marginHorizontal:5,
            flex:1,
            marginTop:20
        }}>
            <View style={{
                backgroundColor:'#C2F2E8',
                // flex:.5,
                marginHorizontal:5,
                padding:5,
                borderRadius:10,
                marginVertical:5
            }}>
                <Text style={{
                    textAlign:'center',
                    fontSize:14,
                    fontWeight:'bold',
                    color:'#3AAD94'
                }}>Time Slot -01</Text>

                    <View>
                        
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-evenly',
                            marginVertical:5
                        }}>
                            <Text>
                                <MaterialCommunityIcons 
                                    name="close-circle"
                                    size={20}
                                    color={'#D22C2C'}
                                />
                            </Text>
                            
                            <View style={{
                                alignItems:'center',
                                backgroundColor:'#fff',
                                padding:3,
                                borderRadius:7
                            }}>
                                <Text style={{
                                    fontSize:11,
                                    fontWeight:'bold'
                                }}>From</Text>
                                <Text style={{
                                    fontSize:11,
                                    fontWeight:'bold'
                                }}>10 am</Text>
                            </View>

                            <Text style={{}}>
                                <MaterialCommunityIcons 
                                    name="minus"
                                    size={20}
                                    color={'#3AAD94'}
                                />
                            </Text>

                            <View style={{
                                alignItems:'center',
                                backgroundColor:'#fff',
                                padding:3,
                                borderRadius:7
                            }}>
                                <Text style={{
                                    fontSize:11,
                                    fontWeight:'bold'
                                }}>To</Text>
                                <Text style={{
                                    fontSize:11,
                                    fontWeight:'bold'
                                }}>12 pm</Text>
                            </View>
                        </View>
                        
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-evenly',
                            alignItems:'center',
                            marginVertical:5
                        }}>
                            <Text>
                                <MaterialCommunityIcons 
                                name="close-circle"
                                size={20}
                                color={'#D22C2C'}
                                />
                            </Text>
                            <Text style={{
                                fontSize:12,
                                fontWeight:'bold',
                                color:'#3AAD94'
                            }}>05 min</Text>

                            <Text style={{
                                fontSize:14,
                                fontWeight:'bold',
                                color:'#3AAD94'
                            }}>100 BDT</Text>

                            <Text>
                                <MaterialCommunityIcons 
                                name="circle-edit-outline"
                                size={20}
                                color={'#000'}
                                />
                            </Text>
                        </View>
                    </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 2, backgroundColor: '#3AAD94'}} />
                        
                        <View>
                            <Text style={{ textAlign: 'center'}}>
                                <IconButton
                                    icon="plus-circle"
                                    color={"#3AAD94"}
                                    size={28}
                                    onPress={() => console.log('Pressed')}
                                />
                            </Text>
                        </View>

                    <View style={{flex: 1, height: 2, backgroundColor: '#3AAD94'}} />
                </View>
                

            </View>
            
            <View style={{
                backgroundColor:'#C2F2E8',
                // flex:.5,
                marginHorizontal:5,
                padding:5,
                borderRadius:10
            }}>
                <Text style={{
                    textAlign:'center',
                    fontSize:14,
                    fontWeight:'bold',
                    color:'#3AAD94'
                }}>Time Slot -01</Text>

                    <View>
                        
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-evenly',
                            marginVertical:5
                        }}>
                            <Text>
                                <MaterialCommunityIcons 
                                    name="close-circle"
                                    size={20}
                                    color={'#D22C2C'}
                                />
                            </Text>
                            
                            <View style={{
                                alignItems:'center',
                                backgroundColor:'#fff',
                                padding:3,
                                borderRadius:7
                            }}>
                                <Text style={{
                                    fontSize:11,
                                    fontWeight:'bold'
                                }}>From</Text>
                                <Text style={{
                                    fontSize:11,
                                    fontWeight:'bold'
                                }}>10 am</Text>
                            </View>

                            <Text style={{}}>
                                <MaterialCommunityIcons 
                                    name="minus"
                                    size={20}
                                    color={'#3AAD94'}
                                />
                            </Text>

                            <View style={{
                                alignItems:'center',
                                backgroundColor:'#fff',
                                padding:3,
                                borderRadius:7
                            }}>
                                <Text style={{
                                    fontSize:11,
                                    fontWeight:'bold'
                                }}>To</Text>
                                <Text style={{
                                    fontSize:11,
                                    fontWeight:'bold'
                                }}>12 pm</Text>
                            </View>
                        </View>
                        
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-evenly',
                            alignItems:'center',
                            marginVertical:5
                        }}>
                            <Text>
                                <MaterialCommunityIcons 
                                name="close-circle"
                                size={20}
                                color={'#D22C2C'}
                                />
                            </Text>
                            <Text style={{
                                fontSize:12,
                                fontWeight:'bold',
                                color:'#3AAD94'
                            }}>05 min</Text>

                            <Text style={{
                                fontSize:14,
                                fontWeight:'bold',
                                color:'#3AAD94'
                            }}>100 BDT</Text>

                            <Text>
                                <MaterialCommunityIcons 
                                name="circle-edit-outline"
                                size={20}
                                color={'#000'}
                                />
                            </Text>
                        </View>
                    </View>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 1, height: 2, backgroundColor: '#3AAD94'}} />
                        
                        <View>
                            <Text style={{ textAlign: 'center'}}>
                                <IconButton
                                    icon="plus-circle"
                                    color={"#3AAD94"}
                                    size={28}
                                    onPress={() => console.log('Pressed')}
                                />
                            </Text>
                        </View>

                    <View style={{flex: 1, height: 2, backgroundColor: '#3AAD94'}} />
                </View>
                

            </View>
        </View>
        
      </View>
    );
}
function Sunday({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Sunday</Text>
        
      </View>
    );
}
function Monday({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Monday</Text>
        
      </View>
    );
}
function Tuesday({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Tuesday</Text>
        
      </View>
    );
}
function Wednesday({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Wednesday</Text>
        
      </View>
    );
}
function Thursday({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Thursday</Text>
        
      </View>
    );
}
function Friday({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Friday</Text>
        
      </View>
    );
}

export default function ManageServiceScreen({navigation}) {
    return (
        <SafeAreaView style={{flex:1, backgroundColor:"#fff",justifyContent:'center'}}>
            <StatusBar backgroundColor={'#075141'} />
            

            <View style={{
                marginHorizontal:20,
                marginVertical:20
            }}>

                <TouchableOpacity 
                    style={{
                        paddingVertical:15,
                        paddingHorizontal:25,
                        backgroundColor:'#3AAD94',
                        borderRadius:100/2,
                        marginVertical:7,
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}

                    onPress={() => navigation.navigate('VoiceCallServiceScreen')}
                >
                    <Text style={{
                        fontSize:16,
                        fontWeight:'bold',
                        textAlign:'center',
                        color:'#fff'
                    }}>Voice Call Service</Text>

                    <Text>
                        <MaterialCommunityIcons name='arrow-right' color={'#fff'} size={24} />
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{
                        paddingVertical:15,
                        paddingHorizontal:25,
                        backgroundColor:'#3AAD94',
                        borderRadius:100/2,
                        marginVertical:7,
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}
                    onPress={() => navigation.navigate('VideoCallServiceScreen')}
                >
                    <Text style={{
                        fontSize:16,
                        fontWeight:'bold',
                        textAlign:'center',
                        color:'#fff'
                    }}>Video Call Service</Text>

                    <Text>
                        <MaterialCommunityIcons name='arrow-right' color={'#fff'} size={24} />
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{
                        paddingVertical:15,
                        paddingHorizontal:25,
                        backgroundColor:'#3AAD94',
                        borderRadius:100/2,
                        marginVertical:7,
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}
                    onPress={() => navigation.navigate('ChatServiceScreen')}
                >
                    <Text style={{
                        fontSize:16,
                        fontWeight:'bold',
                        textAlign:'center',
                        color:'#fff'
                    }}>Chat Service</Text>

                    <Text>
                        <MaterialCommunityIcons name='arrow-right' color={'#fff'} size={24} />
                    </Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}
