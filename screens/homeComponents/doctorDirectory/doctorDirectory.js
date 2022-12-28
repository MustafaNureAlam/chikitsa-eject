import React, {useEffect, useState, useCallback, useRef} from 'react'
import { 
    View, 
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
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
    Feather,
    Image
  } from '@expo/vector-icons';

import * as patientEnd from '../../../services/api/patientEnd';
import Loader from '../../modules/loader';
import {useFocusEffect} from '@react-navigation/native';
import token from '../../../services/local_storage/storage';
import config from '../../../services/config';
import { Avatar, RadioButton, TextInput ,Searchbar  } from 'react-native-paper';

export default function DoctorDirectoryScreen({navigation, route}) {

    const isMounted = useRef(true);
    const [api_data, setApidata] = useState(null);
    const [is_loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    const [reg_type, setRegType] = useState("Medical");
    const [imgBaseUrl, setImageBaseUrl] = useState(config.baseUrl+"uploades/reg_dental/");



    async function searchDoctor() {
        
        let user_token = await token.getItem("token");
        let myHeaders = new Headers();

        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "key": text,
        "reg_type": reg_type
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

        await fetch( config.baseUrl + "medical_staffs", requestOptions)
        .then(response => response.text())
        .then(result => {
            let search_data = JSON.parse(result);

            // if(search_data.status == 200) {
            //     setVisible(true)
            // }
            setApidata(search_data)

            // if(isMounted) {
                
            // }
            // console.log('============medical_staffs-=========')
            // console.log(search_data);
            // console.log('============medical_staffs-=========')
        })
        .catch(error => console.log('error', error));
    }



    useEffect(() => {
        if(isMounted){

            if(text != null) {
                setLoading(true);
                searchDoctor()
                setLoading(false);
                if(reg_type === "Medical"){
                    setImageBaseUrl(config.baseUrl+"uploades/reg_doctors/")
                }else{
                    setImageBaseUrl(config.baseUrl+"uploades/reg_dental/")
                }
            }
        }
        return () => {
            isMounted.current = false;
        }
    }, [text, reg_type]);


    return (
        <SafeAreaView style={{flex:1 , backgroundColor:'#fafafa'}}>
            <StatusBar backgroundColor={'#075141'} />
            {
                is_loading ? (
                    <Loader/>
                ) : (
                    <View style={{flex:1}}>
                        
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            // backgroundColor:'#5ED4BA',
                            borderRadius:100/2,
                            // marginHorizontal:20,
                            marginVertical:20,
                            paddingHorizontal:12
                        }}>

                            
                            
                            <Searchbar 
                                value={text}
                                onChangeText={(text) => setText(text)}
                                placeholder="Name or registration no."
                                iconColor='#3AAD94'
                                // placeholderTextColor={'#3AAD94'}
                                selectionColor='#3AAD94'
                            />
                            
                            {/* <TouchableOpacity 
                                style={{
                                
                                }}>
                                <Ionicons style={{
                                    marginLeft:5
                                }} name='mic-outline' size={24} color={'#fff'} />
                            </TouchableOpacity> */}
                        
                        </View>

                        <View style={{
                            // flex:1,
                            padding:8,
                            elevation:.3,
                            backgroundColor:'#fff',
                            marginHorizontal:12,
                            borderRadius:6
                        }}>

                            <RadioButton.Group 
                                onValueChange={value => setRegType(value)} value={reg_type}
                                
                            >
                                <View style={{
                                    flexDirection:'row',
                                    justifyContent:'space-around',
                                    alignItems:'center'
                                }}>
                                    
                                    <RadioButton.Item 
                                        labelStyle={{fontWeight:'bold'}} 
                                        color="#3AAD94"
                                        mode='ios' 
                                        label="Doctor" 
                                        value="Medical" 
                                    />
                                    
                                    <RadioButton.Item  
                                        labelStyle={{fontWeight:'bold'}} 
                                        color="#3AAD94"
                                        mode='ios' 
                                        label="Dental" 
                                        value="dental" 
                                    />
                                    
                                    {/* <RadioButton.Item  
                                        labelStyle={{fontWeight:'bold'}}
                                        color="#3AAD94" 
                                        mode='ios' 
                                        label="Mats" 
                                        value="mats" 
                                    /> */}

                                </View>

                            </RadioButton.Group>

                        </View>

                        <View style={{
                            marginTop:10
                        }}>

                            {
                                api_data?.data?.length ? api_data?.data?.length > 0 && (

                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={api_data?.data}
                                        renderItem={({item, index}) => (
                                            <View>
        
                                                <TouchableOpacity 
                                                    onPress={()=>{
                                                        navigation.navigate('ViewDoctorProfileScreen', item);
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
                                                            source={{uri : imgBaseUrl + item?.reg_no+'.png'}} 
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
                                                            }}
                                                        >
                                                            <View>
                                                                
                                                                <Text style={{
                                                                    paddingVertical:2,
                                                                    fontWeight:'bold',
                                                                    fontSize:16,
                                                                    color:'#707070'
                                                                }}>{item?.name ? item?.name : 'N/A'}
                                                                </Text>
        
                                                                <View>
                                                                    <Text style={{
                                                                        // paddingVertical:2,
                                                                        fontWeight:'bold',
                                                                        fontSize:14,
                                                                        color:'#3AAD94'
                                                                    }}>Reg. no : {item?.reg_no}</Text>
                                                                </View>
        
                                                                <Text style={{
                                                                    // paddingVertical:2,
                                                                    fontWeight:'bold',
                                                                    fontSize:12,
                                                                    color:'#3AAD94'
                                                                }}>Reg. type : {item?.reg_type.toUpperCase()}
                                                                </Text>
                                
                                                            </View>
                            
                                                        </View>
                            
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

                                ) : (

                                    <View style={{
                                        // flex:1,
                                        alignItems:"center",
                                        // justifyContent:'center'
                                    }}>
                                        <Text style={{
                                            fontSize:16,
                                            padding:8
                                        }}>
                                            No results found !
                                        </Text>
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
