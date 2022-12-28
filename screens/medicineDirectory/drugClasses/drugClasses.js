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

export default function DrugClassesScreen({navigation, route}) {

    const isMounted = useRef(true);

    const [api_data, setApiData] = useState([]);
    const [is_loading, setLoading] = useState(true);
    
    const [text, setSearchText] = useState("");


    async function getClassNames() {

        let user_token = await token.getItem("token");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch( config.baseUrl +  "medicine/drug_class_list", requestOptions)
        .then(response => response.text())
        .then(result => {
            let api_response = JSON.parse(result);
            
            setApiData(api_response);
            // console.log('class list==============');
            // console.log(api_response);
            // console.log('class list==============');
            

        })
        .catch(error => console.log('error', error));
    }


    async function searchMedicine() {
        
        let user_token = await token.getItem("token");
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "name": text
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "medicine/search_drug_class", requestOptions)
        .then(response => response.text())
        .then(result => {
            let search_data = JSON.parse(result);

            setApiData(search_data)
            // console.log('============search data-=========')
            // console.log(search_data);
            // console.log('============search data-=========')
        })
        .catch(error => console.log('error', error));
    }


    // useFocusEffect(
    //     useCallback(() => {

            
    //     }, []),
    // );

    useEffect(() => {
        if(isMounted) {
            setLoading(true);
            getClassNames();
            setLoading(false);
        }
        
    
        return () => {
            // Once the Screen gets blur Remove Event Listener
           isMounted.current = false;
        };
    }, [])

    useEffect(() => {
        setLoading(true);
        searchMedicine();
        setLoading(false);

        return () => {
            isMounted.current = false;
        }
    }, [text])

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff', paddingHorizontal:16}} >
            
            <StatusBar backgroundColor={'#075141'}/>

            {
                is_loading ? (
                    <Loader/>
                ) : (

                    <View style={{
                        // alignItems:'center'
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
                                    placeholder='Find class'
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
                                    keyboardAppearance="default"

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

                        <View>
                            {
                                api_data?.data?.length > 0 ? (

                                    <FlatList 
                                        showsVerticalScrollIndicator={false}
                                        data={api_data?.data}
                                        renderItem={({ item, index }) => (
                                            <View>
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
                                                    onPress={() => 
                                                        navigation.navigate('ClassTypeScreen',{title : item.name , data : item})
                                                        // console.log(item)
                                                    }
                                                >
                                                    <View style={{
                                                        marginRight:8
                                                    }}>
                                                        <Text style={{
                                                            color:'#808080',
                                                            fontSize:14,
                                                            fontWeight:'bold',
                                                            textAlign:'left',
                                                            padding:4
                                                        }}>{item?.name}</Text>
                                                    </View>
                                                    <View>
                                                        <FontAwesome5 name="chevron-right" size={24} color="#808080" />
                                                    </View>
            
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
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


                        {/* <View>

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
                            >
                                <View style={{
                                    marginRight:8
                                }}>
                                    <Text style={{
                                        color:'#808080',
                                        fontSize:14,
                                        fontWeight:'bold',
                                        textAlign:'left',
                                        padding:4
                                    }}>Allergy & Immune System</Text>
                                </View>
                                <View>
                                    <FontAwesome5 name="chevron-right" size={24} color="#808080" />
                                </View>

                            </TouchableOpacity>

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
                            >
                                <View style={{
                                    marginRight:8
                                }}>
                                    <Text style={{
                                        color:'#808080',
                                        fontSize:14,
                                        fontWeight:'bold',
                                        textAlign:'left',
                                        padding:4
                                    }}>
                                        Anesthetics & neuromuscular block drugs
                                    </Text>
                                </View>
                                <View>
                                    <FontAwesome5 name="chevron-right" size={24} color="#808080" />
                                </View>

                            </TouchableOpacity>

                        </View> */}

                    </View>

                )
            }
            

        </SafeAreaView>
    )
}
