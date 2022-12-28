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
import config from '../../../services/config';
import token from '../../../services/local_storage/storage';
import Loader from '../../modules/loader';
import { Avatar } from 'react-native-paper';

export default function PatientPrescriptionDetailsScreen({ navigation, route}) {

    const [prescriptionDetails, settPrescription] = useState(route?.params);
    console.log('===prescriptionDetails==')
    console.log(prescriptionDetails);
    console.log('===prescriptionDetails==')
    return (
        <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
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
                                source={{uri: config.baseUrl + 'uploades/' + prescriptionDetails?.doctor_info?.image }} 
                            />
                        </View>
                        
                        <View style={{padding:5,alignItems:'center'}}>
                            
                            <Text style={{
                                fontSize:16,
                                fontWeight:'500',
                                color:'#70707B'
                            }}>
                                Doctor : {prescriptionDetails?.doctor_info?.name}
                            </Text>
                            
                            <Text style={{
                                fontSize:14,
                                fontWeight:'500',
                                color:'#70707B'
                            }}>
                                Gender : {prescriptionDetails?.doctor_info?.gender}
                            </Text>
                            
                            {/* <Text style={{
                                fontSize:14,
                                fontWeight:'500',
                                color:'#70707B'
                            }}>
                                Date of birth : {prescriptionDetails?.doctor_info?.dob}
                            </Text> */}
                            
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

                        <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            paddingHorizontal:10
                        }}>
                            
                            <Text style={{ 
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: 16,
                            }}>
                                <MaterialIcons name="report-problem" size={26} color="#70707B" />
                            </Text>

                            <Text style={{
                                fontSize:16,
                                fontWeight:'bold',
                                color:'#70707B',
                                textAlign:'center',
                                padding:5
                            }}>
                                Patient Problems
                            </Text>
                        </View>

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
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            paddingHorizontal:10
                        }}>
                            
                            <Text style={{ 
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: 16,
                            }}>
                                <MaterialIcons name="speaker-notes" size={26} color="#70707B" />
                            </Text>

                            <Text style={{
                                fontSize:16,
                                fontWeight:'bold',
                                color:'#70707B',
                                textAlign:'center',
                                padding:5
                            }}>
                                Suggessions
                            </Text>
                        </View>

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
                        

                        <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            paddingHorizontal:10
                        }}>
                            
                            <Text style={{ 
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: 16,
                            }}>
                                <FontAwesome5 name="capsules" size={26} color="#70707B" />
                            </Text>

                            <Text style={{
                                fontSize:16,
                                fontWeight:'bold',
                                color:'#70707B',
                                textAlign:'center',
                                padding:5
                            }}>
                                Patient medicines
                            </Text>
                        </View>

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
                        <View style={{
                            flexDirection:'row',
                            alignItems:'center',
                            paddingHorizontal:10
                        }}>

                            <Text style={{ 
                                color: "#fff",
                                fontWeight: "bold",
                                fontSize: 16,
                            }}>
                                <Fontisto name="test-tube" size={26} color="#70707B" />
                            </Text>
                            
                            <Text style={{ 
                                color: "#70707B",
                                fontWeight: "bold",
                                fontSize: 16,
                                paddingHorizontal:10
                            }}>
                                Tests required
                            </Text>
                        </View>

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
