import React, { useState, useEffect, useCallback, useRef } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    StyleSheet,
    Dimensions,
    FlatList,
    BackHandler, 
    Alert,
    RefreshControl
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
import {useFocusEffect} from '@react-navigation/native';
import config from '../../../../services/config';
import token from '../../../../services/local_storage/storage';
import Loader from '../../../modules/loader';
import { Avatar } from 'react-native-paper';

export default function DocEndPrescriptionScreen({navigation}) {

    const isMounted = useRef(true);
    const [api_data, setApidata] = useState(null);
    const [is_loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        if(isMounted){
            setRefreshing(true);
            getAllPrescriptions();
            setRefreshing(false);
        }

        return() => {
            isMounted.current = false;
        } 
    }, []);


    async function getAllPrescriptions(){

    
        let user_token = await token.getItem("token");
        console.log('doctor_token=======',user_token);
    
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
    
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
    
        await fetch( config.baseUrl + "doctor/my_prescriptions", requestOptions)
        .then(response => response.text())
        .then(result => {
            
            if(isMounted){

                let doctor_response = JSON.parse(result)
                setLoading(true);
                setApidata(doctor_response);
                setLoading(false);
            }
            console.log('======doctorEnd Appoint data======');
            console.log(doctor_response.data);
            console.log('======doctorEnd Appoint data======');
        })
        .catch(error => console.log('error', error));
    }

    useFocusEffect(
        useCallback(() => {
            
            if(isMounted) {
                setLoading(true)
                getAllPrescriptions();
                setLoading(false);  
            }

            return() => {
                isMounted.current = false;
            }
        }, []),
    );

    function goToDetails(details) {
        navigation.navigate('PrescriptionDetailsScreen', details);
    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'}/>
            
            {
                is_loading ? (
                    <Loader/>
                ) : (

                    <View>
                        {
                            api_data?.data ? api_data?.data?.length > 0 && (

                                <View style={{marginVertical:15}}>
                                    <FlatList 
                                        showsVerticalScrollIndicator={false}
                                        refreshControl={
                                            <RefreshControl
                                                refreshing={refreshing}
                                                onRefresh={onRefresh}
                                            />
                                        }
                                        data={api_data?.data}
                                        renderItem={({ item, index }) => (
                                            
                                            <View style={{ 
                                                flex:1,
                                                // backgroundColor: '#D9FFF0', 
                                                // paddingHorizontal: 24,
                                                marginHorizontal:15,
                                                marginVertical:5,
                                                borderRadius:5,
                                                backgroundColor:'#D9FFF0'
                                            }}>
                                                
                                                <TouchableOpacity 
                                                
                                                    style={{ 
                                                        paddingVertical: 15, 
                                                        flex: 1, 
                                                        flexDirection:'row',
                                                        paddingHorizontal:10,
                                                        justifyContent:'space-between',
                                                        alignItems:'center'
                                                    }}

                                                    onPress={() => goToDetails(item)}
                                                >
                                                    
                                                    <View style={{
                                                        flexDirection:'row',
                                                        alignItems: 'center',
                                                        // justifyContent: 'space-between',
                                                    }}>

                                                        <View style={{ paddingHorizontal:10}}>
                                                            <Avatar.Image 
                                                                style={{
                                                                    backgroundColor:'#fff',
                                                                    borderWidth:.5,
                                                                    borderColor:'#70707B'
                                                                }} 
                                                                size={50} 
                                                                source={{uri: config.baseUrl + 'uploades/' + item?.patient?.user_pic }} 
                                                            />
                                                        </View>

                                                        <View style={{padding:5}}>
                                                            <Text style={{ 
                                                                color: "#70707B",
                                                                fontWeight: "bold",
                                                                fontSize: 14,
                                                            }}>
                                                                Patient name : {item?.patient?.name}
                                                            </Text>
                                                            
                                                            <Text style={{ 
                                                                color: "#70707B" ,
                                                                fontWeight: "bold",
                                                            }}>
                                                                Date : {item?.prescribed_date}
                                                            </Text>
                                                        </View>
                                                        
                                                        
                                                    </View>

                                                    <View>
                                                        <Text style={{ 
                                                                color: "#3AAD94",
                                                                fontWeight:'bold',
                                                                fontSize:14
                                                            }}><MaterialIcons name='chevron-right' size={30} color="#70707B" />
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            ) : (
                                <View style={{
                                    height:'100%',
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <Text style={{
                                        color:"#000",
                                        fontSize:18,
                                        fontWeight:'bold'
                                    }}>No prescriptions</Text>
                                </View>
                            )
                        }
                    </View>
                    
                )
            }
            
        </SafeAreaView>
    )
}
