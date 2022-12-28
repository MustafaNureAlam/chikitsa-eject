import React, {useEffect, useState, useCallback, useRef} from 'react'
import { 
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
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
    Fontisto,
    MaterialIcons,
    Feather,
    Image
  } from '@expo/vector-icons';

import * as patientEnd from '../../../../services/api/patientEnd';
import Loader from '../../../modules/loader';
import {useFocusEffect} from '@react-navigation/native';
import token from '../../../../services/local_storage/storage';
import config from '../../../../services/config';
import { Avatar } from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function HealthConcernScreen({navigation, route}) {

    const isMounted = useRef(true);
    const [is_loading, setLoading] = useState(false)

    const [api_data, setApidata] = useState([]);
    const [search_data, setSearchData] = useState([]);
    const [text, setText] = useState("");
    const [is_visible, setVisible] = useState(false);

    useFocusEffect(
        useCallback(() => {

            // const abortControl = new AbortController();
            // const signal_option = { signal : abortControl.signal}

            if(isMounted) {
                setLoading(true);
                allConcernList();
                setLoading(false);
            }

            return() => {
                isMounted.current = false;
                // abortControl.abort();
            }
        }, [navigation, route]),
    );

    async function allConcernList() {
        if(isMounted){
            setLoading(true);
            let concerns_data = await patientEnd.concern()
            setApidata(concerns_data)
            setLoading(false);
            // console.log('=======concerns_data======');
            // console.log(concerns_data);
            // console.log('=======concerns_data=======');
        }
        // setLoading(false);

    }

    function selected_ids(doctor_id) {
        // console.log('item', doctor_id)
        navigation.navigate('DocListByConcernScreen',doctor_id);
    }


    async function searchDoctor() {
        
        let user_token = await token.getItem("token");
        let myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "search_text": text
        });

        // console.log('============search_generic-=========')
        // console.log(text);
        // console.log('============search_generic-=========')
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch( config.baseUrl + "patient/search_doctor", requestOptions)
        .then(response => response.text())
        .then(result => {
            let search_data = JSON.parse(result);

            // if(search_data.status == 200) {
            //     setVisible(true)
            // }
            setSearchData(search_data)

            // if(isMounted) {
                
            // }
            // console.log('============search_doctor-=========')
            // console.log(search_data);
            // console.log('============search_doctor-=========')
        })
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
        if(isMounted){

            // console.log('============search_generic-=========')
            // console.log(text);
            // console.log('============search_generic-=========')
            if(text != null) {
                setLoading(true);
                searchDoctor()
                setLoading(false);
            }
        }
        return () => {
            isMounted.current = false;
        }
    }, [text])

    function goToDocDetails(details) {
        navigation.navigate('ConcernDocDetailsScreen', details)
    }


    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor={'#075141'} />
            {
                is_loading ? (
                    <Loader/>
                ) : (
                        <View style={{flex:1}}>
                            <View style={{
                                flexDirection:'row',
                                alignItems:'center',
                                backgroundColor:'#5ED4BA',
                                borderRadius:100/2,
                                marginHorizontal:20,
                                marginVertical:20
                                }}
                            >
                                <TextInput 
                                    value={text}
                                    onChangeText={(text) => setText(text)}
                                    placeholder='Search doctor'
                                    style={{
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
                                    
                                    }}
                                    onPress={() => {
                                        Toast.show({
                                            type: 'success',
                                            text1: 'New feature!',
                                            text2: 'Voice search is coming soon'
                                        });
                                    }}    
                                >
                                    <Ionicons style={{
                                        marginLeft:5
                                    }} name='mic-outline' size={24} color={'#fff'} />
                                </TouchableOpacity>
                            </View>

                            <View style={{
                                marginTop:10
                            }}>
                                {
                                    search_data.data?.length != null && (

                                        <FlatList
                                            showsVerticalScrollIndicator={false}
                                            data={search_data?.data}
                                            renderItem={({item, index}) => (
                                                <View>
                                                    <TouchableOpacity 
                                                        onPress={()=>{
                                                            // showBookModal(item)
                                                            goToDocDetails(item)
                                                        }}
                                                        style={{
                                                            // elevation:.5,
                                                            borderRadius:10,
                                                            marginHorizontal:20,
                                                            marginVertical:7,
                                                            flexDirection:'row',
                                                            justifyContent:'space-between',
                                                            backgroundColor:'#c6f5eb',
                                                            paddingHorizontal:10,
                                                            paddingVertical:7
                                                        }}
                                                    >
                                                        <View style={{
                                                            flex:.3,
                                                            justifyContent:'center',
                                                            paddingHorizontal:7
                                                        }}>
                                                            <Avatar.Image 
                                                                size={65} 
                                                                style={{backgroundColor:'#fff', borderWidth:.3,borderColor:'#70707B'}} 
                                                                source={{uri : config.baseUrl + 'uploades/' + item?.user_pic}} 
                                                            />
                                                        </View>
        
                                                        <View style={{
                                                            flex:.7,
                                                            // flexDirection:'row',
                                                            // justifyContent:'space-around',
                                                            // backgroundColor:'#D6D6D6',
                                                            alignItems:'flex-start',
                                                            marginHorizontal:15,
                                                            padding:5,
                                                            marginVertical:5,
                                                            // elevation:1
                                                        }}>
                                                            
                                
                                                            <View style={{
                                                                // flexDirection:'row',
                                                                // alignItems:'center',
                                                                // justifyContent:'space-between'
                                                                }}>
                                                                <View>
                                                                    <Text style={{
                                                                        paddingVertical:5,
                                                                        fontWeight:'bold',
                                                                        fontSize:14,
                                                                        color:'#000'
                                                                    }}>{item?.name.toUpperCase()}</Text>
                                                                     <Text style={{
                                                                        paddingVertical:5,
                                                                        fontWeight:'bold',
                                                                        fontSize:12,
                                                                        color:'#000'
                                                                    }}>{item?.gender.toUpperCase()}</Text>
        
                                                                    {/* <FlatList
                                                                        showsVerticalScrollIndicator={false}
                                                                        data={item?.doctors_education}
                                                                        renderItem={({item, index}) =>(
                                                                            <View style={{}}>
                                                                                <Text style={{
                                                                                fontSize:12,
                                                                                fontWeight:'400',
                                                                                color:'#000'
                                                                            }}>{item?.deg_name.toUpperCase()}</Text>
                                                                            </View>
                                                                        )}
                                                                        keyExtractor={(item, index_deg)=>index_deg.toString()}
                                                                        key={index}
                                                                        listKey={(item, index) => 'A' + index.toString()}
                                                                    /> */}
                                    
                                                                </View>
                                
                                                            </View>
        
                                                            {/* <View style={{
                                                                flex:1,
                                                                // justifyContent:'center',
                                                            }}>
                                                                <Text style={{
                                                                    fontSize:14,
                                                                    fontWeight:'700',
                                                                    // textAlign:'center'
                                                                    color:'#70707B'
                                                                }}>Speciality</Text>
                                                                <FlatList
                                                                    showsVerticalScrollIndicator={false}
                                                                    showsHorizontalScrollIndicator={false}
                                                                    data={item?.specializations}
                                                                    renderItem={({item, index}) =>(
                                                                        <View style={{
                                                                            flex:1,
                                                                            // alignItems:'center',
                                                                            // justifyContent:'center'
                                                                            }}
                                                                        >
                                                                            
                                                                            <Text style={{
                                                                            color:'#70707B',
                                                                            fontSize:11,
                                                                            fontWeight:'400',
                                                                            // paddingVertical:5,
                                                                        }}>{item?.name ? item?.name : 'specializations : N/A'}</Text>
                                                                        </View>
                                                                    )}
                                                                    keyExtractor={(item, index_name)=>index_name.toString()}
                                                                    listKey={(item, index) => 'D' + index.toString()}
                                                                    key={index}
                                                                    horizontal={true}
                                                                    ItemSeparatorComponent={() => <Text style={{color:'#70707B'}}> , </Text>}
                                                                />
                                                            </View> */}
                                
                                                        </View>
        
                                                        <View style={{
                                                            justifyContent:'center',
                                                            alignItems:'center'
                                                        }}>
                                                            <MaterialCommunityIcons  
                                                                name='chevron-right'
                                                                color={'#70707B'}
                                                                size={30}
                                                            />
                                                        </View>
        
                                                    </TouchableOpacity>
                                                </View>
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                        />

                                    )
                                }
                            </View>

                            {
                                api_data?.data && (
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={api_data?.data[0]}
                                        renderItem={({item, index}) => (
                                            <View style={{
                                                flex:1,
                                                marginVertical:3
                                            }}>
                                                <TouchableOpacity 
                                                    style={{
                                                        flex:1,
                                                        backgroundColor:'#fff',
                                                        padding:10,
                                                        marginHorizontal:20,
                                                        borderRadius:5,
                                                    }}
                                                    onPress={()=>selected_ids(item.id)}
                                                >
                                                    <View style={{
                                                        justifyContent:'space-between',
                                                        flexDirection:'row',
                                                        alignItems:'center'
                                                    }}> 
                                                        <Text style={{}} >
                                                            <Entypo name="circle" size={24} color="#3AAD94" />
                                                        </Text> 
                                                        <Text 
                                                            style={{
                                                                fontWeight:'bold',
                                                                fontSize:14,
                                                                color:'#000',
                                                                flexWrap:'wrap',
                                                                flex:1,
                                                                textAlign:'center'
                                                            }}
                                                        >
                                                            {item.name} 
                                                        </Text>
                                                        <Text>
                                                            <Entypo name="chevron-right" size={24} color="black" />
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                {/* <TouchableOpacity 
                                                    style={{
                                                        flex:1,
                                                        backgroundColor:'#fff',
                                                        padding:10,
                                                        marginHorizontal:20,
                                                        borderRadius:5
                                                    }}
                                                >
                                                    <View style={{justifyContent:'space-around',flexDirection:'row',alignItems:'center'}}> 
                                                        <Text style={{}} >
                                                            <Entypo name="circle" size={24} color="#3AAD94" />
                                                        </Text> 
                                                        <Text style={{fontWeight:'bold',fontSize:14}} >
                                                            Search result 
                                                        </Text>
                                                        <Text>
                                                            <Entypo name="chevron-right" size={24} color="black" />
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity> */}
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                )
                            }

                            {/* {
                                search_data.data?.length == 0 && (

                                )
                            } */}


                            
                        </View>
                )
            }
            
            
        </SafeAreaView>
        
    )
}
