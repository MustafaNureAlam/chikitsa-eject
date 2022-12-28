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

export default function PrescriptionDetailsScreen({navigation, route}) {

    const [prescriptionDetails, settPrescription] = useState(route?.params);
    console.log('=====')
    console.log(prescriptionDetails);
    console.log('=====')
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'}/>

            <View style={{
                paddingHorizontal:10,
                paddingVertical:10,
                marginHorizontal:5,
                marginVertical:5
            }}>

                <ScrollView showsVerticalScrollIndicator={false}>

                    <View  style={{
                        paddingHorizontal:10,
                        paddingVertical:10,
                        borderRadius:5,
                        backgroundColor:'#e1f0f7',
                        marginTop:7,
                        flexDirection:"row",
                        alignItems:'center',
                        justifyContent:'space-between'
                    }}>
                        
                        <View style={{padding:5}}>
                            <Avatar.Image 
                                style={{
                                    backgroundColor:'#fff',
                                    borderWidth:.5,
                                    borderColor:'#70707B'
                                }} 
                                size={60} 
                                source={{uri: config.baseUrl + 'uploades/' + prescriptionDetails?.patient?.user_pic }} 
                            />
                        </View>
                        
                        <View style={{padding:5, alignItems:'center'}}>
                            
                            <Text style={{
                                fontSize:16,
                                fontWeight:'500',
                                color:'#70707B'
                            }}>
                                Name : {prescriptionDetails?.patient?.name}
                            </Text>
                            
                            <Text style={{
                                fontSize:14,
                                fontWeight:'500',
                                color:'#70707B'
                            }}>
                                Gender : {prescriptionDetails?.patient?.gender}
                            </Text>
                            
                            <Text style={{
                                fontSize:14,
                                fontWeight:'500',
                                color:'#70707B'
                            }}>
                                Date of birth : {prescriptionDetails?.patient?.dob}
                            </Text>
                            
                            <Text style={{
                                fontSize:14,
                                fontWeight:'500',
                                color:'#70707B'
                            }}>
                                <Text style={{fontWeight:'bold'}}>Prescribed at </Text> 
                                {prescriptionDetails?.prescribed_date}
                            </Text>

                        </View>
                    </View>
                
                    <View style={{
                        paddingHorizontal:10,
                        paddingVertical:10,
                        borderRadius:5,
                        backgroundColor:'#ffe6e6',
                        marginTop:7
                    }}>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',
                            color:'#70707B',
                            textAlign:'center',
                            padding:5
                        }}>Patient problems</Text>

                        <FlatList 
                            showsVerticalScrollIndicator={false}
                            data={prescriptionDetails?.prescription_problems}
                            renderItem={({ item, index }) => (
                                
                                <View style={{ 
                                    flex:1,
                                    marginHorizontal:15,
                                    marginVertical:5,
                                    // borderWidth:.3,
                                    backgroundColor:'#fff',
                                    borderRadius:5,
                                    padding:5
                                }}>
                                    
                                    <Text style={{
                                        fontSize:14,
                                        fontWeight:'700',
                                        color:'#70707B'
                                    }}>
                                        {index + 1}. {item?.problem}
                                    </Text>
                                    
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>


                    <View style={{
                        paddingHorizontal:10,
                        paddingVertical:10,
                        borderRadius:5,
                        backgroundColor:'#e1f0f7',
                        marginTop:7
                    }}>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',
                            color:'#70707B',
                            textAlign:'center',
                            padding:5
                        }}>Suggessions</Text>

                        <FlatList 
                            showsVerticalScrollIndicator={false}
                            data={prescriptionDetails?.prescription_suggestions}
                            renderItem={({ item, index }) => (
                                
                                <View style={{ 
                                    flex:1,
                                    marginHorizontal:15,
                                    marginVertical:5,
                                    // borderWidth:.3,
                                    backgroundColor:'#fff',
                                    borderRadius:5,
                                    padding:5
                                }}>
                                    
                                    <Text style={{
                                        fontSize:14,
                                        fontWeight:'700',
                                        color:'#70707B'
                                    }}>
                                        {item?.note}
                                    </Text>
                                    
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                    <View style={{
                        paddingHorizontal:10,
                        paddingVertical:10,
                        borderRadius:5,
                        backgroundColor:'#daf7e0',
                        marginTop:7
                    }}>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',
                            color:'#70707B',
                            textAlign:'center',
                            padding:5
                        }}>Patient medicines</Text>

                        <FlatList 
                            showsVerticalScrollIndicator={false}
                            data={prescriptionDetails?.prescription_medicines}
                            renderItem={({ item, index }) => (
                                
                                <View style={{ 
                                    flex:1,
                                    marginHorizontal:15,
                                    marginVertical:5,
                                    // borderWidth:.3,
                                    backgroundColor:'#fff',
                                    borderRadius:5,
                                    paddingHorizontal:5,
                                    paddingVertical:7
                                }}>
                                    
                                    <Text style={{
                                        fontSize:14,
                                        fontWeight:'700',
                                        color:'#70707B'
                                    }}>
                                        Medicine name : {item?.medicine_name ? item?.medicine_name : 'N/A'}
                                    </Text>
                                    
                                    <Text style={{
                                        fontSize:14,
                                        fontWeight:'700',
                                        color:'#70707B'
                                    }}>
                                    Doses : {item?.dosage} ml/mg
                                    </Text>
                                    
                                    <Text style={{
                                        fontSize:14,
                                        fontWeight:'700',
                                        color:'#70707B'
                                    }}>
                                        Time to take : {item?.frequency}
                                    </Text>
                                    
                                    <Text style={{
                                        fontSize:14,
                                        fontWeight:'700',
                                        color:'#70707B'
                                    }}>
                                    Duration : {item?.duration} days
                                    </Text>
                                    
                                    <Text style={{
                                        fontSize:14,
                                        fontWeight:'700',
                                        color:'#70707B'
                                    }}>
                                    Doctor's note : {item?.note}
                                    </Text>
                                    
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                    <View style={{
                        paddingHorizontal:10,
                        paddingVertical:10,
                        borderRadius:5,
                        backgroundColor:'#fae3fc',
                        marginTop:7
                    }}>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',
                            color:'#70707B',
                            textAlign:'center',
                            padding:5
                        }}>Tests required</Text>

                        <FlatList 
                            showsVerticalScrollIndicator={false}
                            data={prescriptionDetails?.prescription_test}
                            renderItem={({ item, index }) => (
                                
                                <View style={{ 
                                    flex:1,
                                    marginHorizontal:15,
                                    marginVertical:5,
                                    // borderWidth:.3,
                                    backgroundColor:'#fff',
                                    borderRadius:5,
                                    padding:5
                                }}>
                                    
                                    <Text style={{
                                        fontSize:14,
                                        fontWeight:'700',
                                        color:'#70707B'
                                    }}>
                                        {index + 1}. {item?.test_name ? item?.test_name : 'N/A'}
                                    </Text>
                                    
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                </ScrollView>
            </View>

        </SafeAreaView>
    )
}
