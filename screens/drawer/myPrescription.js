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
import config from '../../services/config';
import token from '../../services/local_storage/storage';
import Loader from '../modules/loader';
import { Avatar } from 'react-native-paper';

export default function MyPrescriptionScreen({navigation}) {
    
    const isMounted = useRef(true);
    const [api_data, setApidata] = useState(null);
    const [is_loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        if(isMounted) {
            setLoading(true);
            getPatientPrescription();
            setLoading(false);
        }

        return() => {
            isMounted.current = false;
        } 
    }, []);

    async function getPatientPrescription(){

        setLoading(true);
        let user_token = await token.getItem("token");
        // console.log('doctor_token=======',user_token);
    
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
    
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        await fetch( config.baseUrl + "patient/my_prescriptions", requestOptions)
        .then(response => response.text())
        .then(result => {

            let doctor_response = JSON.parse(result)

            setApidata(doctor_response);
            setLoading(false);
            console.log('======patient pres data======');
            console.log(doctor_response);
            console.log('======patient pres data======');
        })
        .catch(error => console.log('error', error));
    }

    useFocusEffect(
        useCallback(() => {
            if(isMounted) {
                setLoading(true)
                getPatientPrescription();
                setLoading(false); 
            }
            

            return() => {
                isMounted.current = false;
            }
        }, []),
    );

    function goToDetails(details) {
        navigation.navigate('PatientPrescriptionDetailsScreen', details);
    }
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'}/>
            
            <View style={{flex:1}}>
                {
                    is_loading ? (
                        <Loader/>
                    ) : (
                        
                        <View style={{marginVertical:15, flex:1}}>
                            {
                                api_data?.data ? api_data?.data.length > 0 && (
                                    
                                    <View style={{flex:1}}>

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
                                                                    source={{uri: config.baseUrl + 'uploades/' + item?.doctor_info?.image }} 
                                                                />
                                                            </View>
                
                                                            <View style={{paddingHorizontal:5}}>
                                                                <Text style={{ 
                                                                    color: "#70707B",
                                                                    fontWeight: "bold",
                                                                    fontSize: 16,
                                                                    // padding:3
                                                                }}>
                                                                    Doctor  {item?.doctor_info?.name}
                                                                </Text>
                                                                
                                                                <Text style={{ 
                                                                    color: "#70707B" ,
                                                                    fontWeight: "500",
                                                                    fontSize:14,
                                                                    // padding:3
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
                                        flex:1,
                                        justifyContent:'center',
                                        alignItems:'center',
                                        // height:'100%'
                                    }}>
                                        <Text style={{
                                            fontSize:18,
                                            fontWeight:'bold',
                                            color:'#3AAD94',
                                        }}>
                                            No prescription !
                                        </Text>
                                    </View>
                                )
                            }
                        </View>
                    )
                }
            </View>
        </SafeAreaView>
    )
}
