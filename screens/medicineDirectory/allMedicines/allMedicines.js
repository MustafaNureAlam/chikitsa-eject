import React, {useCallback, useEffect, useRef, useState} from 'react'
import { View, Text, StatusBar, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';

import { 
    Ionicons,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Octicons,
    Entypo,
    Fontisto ,
    MaterialIcons,
    FontAwesome 
} from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import token from '../../../services/local_storage/storage';
import Loader from '../../modules/loader';
import config from '../../../services/config';

export default function AllMedicinesScreen({navigation, route}) {

    const isMounted = useRef(true);

    const [api_data, setApiData] = useState([]);
    const [is_loading, setLoading] = useState(false);
    
    const [text, setSearchText] = useState("");
    const [range_from, setSetRAngeFrom] = useState(0);
    const [range_to, setRangeTo] = useState(10);


    async function getAllMedicine(range_from, range_to) {

        setLoading(true);

        let user_token = await token.getItem("token");
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "name": text,
        "range_from" : range_from,
        "range_to" : range_to
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "medicine/all_medicine", requestOptions)
        .then(response => response.text())
        .then(result => {
            let api_response = JSON.parse(result);
            
            // console.log('============all_medicine=========')
            // console.log(api_response)
            // console.log('============all_medicine=========')

            if(api_response.code == 200) {
                setApiData(api_response);
                setLoading(false);
            }
            // console.log('88888888888888888888888888888888')
            // console.log(range_from , range_to)

            // console.log('888888888888888888888888888888888')

            // console.log(api_data);
            // console.log('=========================');
            // console.log(api_response);
            // console.log('============search data-=========')

            // if(isMounted){

            // }
            
        })
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
        if(isMounted){
            setLoading(true);
            getAllMedicine(range_from, range_to);
            setLoading(false);     
        }

        return () => {
            isMounted.current = false;
        }
    }, [text]);

    function loadMoreData() {

        let array_length =  api_data.data?.length;
        setSetRAngeFrom(array_length)
        setRangeTo(array_length + 10)
        // console.log('=========arraayfhsnvisv s')
        // console.log(array_length)
        // console.log('=========arraayfhsnvisv s')
        getAllMedicine(range_from, array_length + 10)

    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff',paddingHorizontal:16,paddingVertical:16}} >
            
            <StatusBar backgroundColor={'#075141'}/>

            {
                is_loading ? (
                    <Loader/>
                ) : (

                    <View style={{
                        // alignItems:'center'
                        flex:1
                    }}>
                        
                        <View style={{
                            paddingVertical:24,
                            alignItems:'center'
                        }}>
                            
                            <View style={{
                                width:'100%',
                                flexDirection:'row',
                                alignItems:'center',
                                backgroundColor:'#5ED4BA',
                                borderRadius:100/2,
                                
                                }}>
                                
                                <TextInput 
                                    value={text}
                                    onChangeText={(search) => setSearchText(search)}
                                    placeholder='Find medicine'
                                    style={{
                                        // borderWidth:1,
                                        width:'85%',
                                        borderRadius:100/2,
                                        paddingHorizontal:10,
                                        paddingVertical:3,
                                        backgroundColor:'#F2F2F2',
                                        height:50,
                                        fontSize:14,
                                        fontWeight:'bold',
                                        // borderWidth:.1,
                                    }}
                                    keyboardType="ascii-capable"
                                    
                                />
                                
                                <TouchableOpacity 
                                    style={{
                                    
                                    }}>
                                    <Ionicons style={{
                                        marginLeft:5
                                    }} name='mic-outline' size={24} color={'#fff'} />
                                </TouchableOpacity>

                            </View>

                        </View>

                        <View style={{paddingBottom:100}}>

                            {
                                api_data?.data?.length > 0 ? (

                                    <View>
                                        
                                        <FlatList 
                                            // initialNumToRender={5}
                                            showsVerticalScrollIndicator={false}
                                            data={api_data?.data}
                                            renderItem={ ({item, index}) => (
                                                <View style={{}}>
            
                                                    {
                                                        api_data?.data.length > 0 && (
            
                                                            <TouchableOpacity 
                                                                style={{
                                                                    flexDirection:'row',
                                                                    justifyContent:'space-between',
                                                                    alignItems:'center',
                                                                    backgroundColor:'#EEEEEE',
                                                                    paddingHorizontal:24,
                                                                    paddingVertical:16,
                                                                    borderRadius:5,
                                                                    marginTop:8
                                                                }}
                                                                onPress={() => navigation.navigate('MedicineDetailsScreen',{ title : item?.name, data : item, path : "allMedicine" })}
                                                            >
                                                                <View>
                                                                    
                                                                    <Text style={{
                                                                        color:'#000',
                                                                        fontSize:14,
                                                                        fontWeight:'bold',
                                                                        textAlign:'left',
                                                                        padding:4
                                                                    }}>{item?.name}</Text>
                                                                    
                                                                    <Text 
                                                                        style={{
                                                                            color:'#808080',
                                                                            fontSize:12,
                                                                            fontWeight:'bold',
                                                                            textAlign:'left',
                                                                            padding:4
                                                                        }}>Type : {item?.medicine_type}
                                                                    </Text>
                                                                    
                                                                    <Text 
                                                                        style={{
                                                                            color:'#808080',
                                                                            fontSize:12,
                                                                            fontWeight:'bold',
                                                                            textAlign:'left',
                                                                            padding:4
                                                                        }}>Power : {item?.power ? item?.power : "N/A"}
                                                                    </Text>
                                                                    
                                                                    <Text 
                                                                        style={{
                                                                            color:'#3AAD94',
                                                                            fontSize:12,
                                                                            fontWeight:'bold',
                                                                            textAlign:'left',
                                                                            padding:4
                                                                        }}>Price : {item?.price ? item?.price : "N/A"}
                                                                    </Text>
                                                                </View>
                                                                
                                                                <View>
                                                                    <FontAwesome5 name="chevron-right" size={24} color="#808080" />
                                                                </View>
            
                                                            </TouchableOpacity>
                                                        )
                                                    }
                                                </View>
                                            )}
                                            keyExtractor={(item, index) => index.toString()}
                                            ListFooterComponent={
                                                <TouchableOpacity 
                                                    style={{
                                                        backgroundColor:'#3AAD94',
                                                        paddingVertical:8,
                                                        paddingHorizontal:16,
                                                        // justifyContent:'center',
                                                    }}
                                                    onPress={() => loadMoreData()}
                                                >
                                                    <Text style={{
                                                        color:'#fff',
                                                        textAlign:'center',
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>Load more</Text>
                                                </TouchableOpacity>
                                            }
                                        />
                                        
                                    </View>

                                    
                                ) : (
                                    <View style={{
                                        justifyContent:"center",
                                        alignItems:'center',
                                        height:'80%'
                                    }}>
                                        <Text style={{
                                            color:'#000',
                                            fontSize:20,
                                            fontWeight:'bold'
                                        }}>No medicine available !</Text>
                                    </View>
                                )
                            }

                            


                        </View>

                    </View>
                )
            }
            

        </SafeAreaView>
    )
}
