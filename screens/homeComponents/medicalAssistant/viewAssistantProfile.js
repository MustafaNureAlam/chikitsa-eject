import React, {useEffect, useState, useCallback, useRef} from 'react'
import { 
    View, 
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    FlatList,
    Image
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
    Feather,
  } from '@expo/vector-icons';

import * as patientEnd from '../../../services/api/patientEnd';
import Loader from '../../modules/loader';
import {useFocusEffect} from '@react-navigation/native';
import token from '../../../services/local_storage/storage';
import config from '../../../services/config';
import { Avatar, RadioButton, TextInput ,Searchbar  } from 'react-native-paper';

export default function ViewAssistantProfileScreen({navigation, route}) {

    const [route_data, setRouteData] = useState(route.params);

    const isMounted = useRef(true);
    const [imgBaseUrl, setImageBaseUrl] = useState(config.baseUrl+"uploades/reg_mats/");

    console.log(route_data)

    // useEffect(() => {
    //     if(isMounted){
    //         // console.log(route_data.reg_type)
    //         if(route_data.reg_type === "mats"){
    //             setImageBaseUrl(config.baseUrl+"uploades/reg_doctors/")
    //         }else{
    //             setImageBaseUrl(config.baseUrl+"uploades/reg_dental/")
    //         }
    //     }
    //     return () => {
    //         isMounted.current = false;
    //     }
    // }, []);
    
    return (
        <SafeAreaView style={{flex:1 , backgroundColor:'#fafafa', padding:8}}>
            <StatusBar backgroundColor={'#075141'} />
            
            <ScrollView style={{marginTop:12}}>

                <View style={{
                    flex:1,
                    padding:12,
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center',
                    // borderWidth:1,
                    borderRadius:6,
                    // borderColor:'#70707B',
                    backgroundColor:'#fff',
                    elevation:.3
                }}>

                    <View style={{
                        // flex:
                        // backgroundColor:"#004032"
                    }}>
                        <Image 
                            source={{uri : imgBaseUrl + route_data?.reg_no+'.png'}}
                            // resizeMode="contain" 
                            style={{
                                height:120,
                                width:120
                            }}
                        />
                    </View>
                    
                    <View style={{
                        flex:.9
                    }}>
                        
                        <Text style={{
                            fontSize:20,
                            fontWeight:'bold',
                        }}>
                            {route_data?.name ? route_data?.name : 'N/A'}
                        </Text>
                        
                    </View>
                    
                </View>

                <View 
                    style={{
                        flex:1,
                        paddingHorizontal:24,
                        paddingVertical:12,
                        // borderWidth:1,
                        elevation:.3,
                        backgroundColor:'#fff',
                        marginVertical:8,
                        borderRadius:6
                    }}
                >

                    <View style={{
                        flexDirection:'row',
                        flex:1
                    }}>
                        
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',
                            padding:4
                        }}>Reg. Type : </Text>
                            <Text style={{
                                fontSize:16,
                                fontWeight:'bold',
                                padding:4
                        }}>{route_data?.reg_type.toUpperCase()}</Text>
                    </View>
                    
                        
                    

                    <View style={{
                        flexDirection:'row',
                        flex:1
                    }}>
                        
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',padding:4
                        }}>Reg. No : </Text>
                            <Text style={{
                            fontSize:16,
                            fontWeight:'bold',padding:4
                        }}>{route_data?.reg_no ? route_data?.reg_no : 'N/A'}</Text>
                    </View>

                    <View style={{
                        flexDirection:'row',
                        flex:1
                    }}>
                        
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',padding:4
                        }}>Father's Name : </Text>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',padding:4
                        }}>{route_data?.father_name ? route_data?.father_name : "N/A"}</Text>
                    </View>
                    
                    <View style={{
                        flexDirection:'row',
                        flex:1
                    }}>

                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',padding:4,
                        }}>Address : </Text>
                        <Text style={{
                            fontSize:16,padding:4,flex:1
                        }}>{route_data?.address ? route_data?.address : "N/A"}</Text>
                    </View>
                </View>

            </ScrollView>
        
        </SafeAreaView>
    )
}
