import React, { useState, useEffect, useCallback, useRef } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    Pressable,
    StatusBar,
    ScrollView
} from 'react-native';

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

export default function MedicineHomeScreen({navigation, route}) {
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}} >
            
            <StatusBar backgroundColor={'#075141'}/>

            <View style={{
                flex:1,
                marginVertical:16,
                marginHorizontal:24
            }}>

                <ScrollView>

                <TouchableOpacity 
                        style={{
                            backgroundColor:'#3AAD94',
                            paddingHorizontal:24,
                            paddingVertical:16,
                            marginTop:12,
                            borderRadius:10,
                            flexDirection:'row',
                            justifyContent:'space-between',
                            minHeight:120,
                            alignItems:'center'
                        }}
                        onPress={ () => navigation.navigate('AllMedicinesScreen')}
                    >
                        <FontAwesome5 name="book-medical" size={36} color="#fff" />
                        <Text style={{
                            color:'#fff',
                            fontSize:20,
                            fontWeight:'bold',
                            textAlign:'center',
                            padding:5
                        }}>
                            Medicines
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#3AAD94',
                            paddingHorizontal:24,
                            paddingVertical:16,
                            marginTop:12,
                            borderRadius:10,
                            flexDirection:'row',
                            justifyContent:'space-between',
                            minHeight:120,
                            alignItems:'center'
                        }}
                        onPress={ () => navigation.navigate('MedicineGenericScreen')}
                    >
                        <Fontisto name="snowflake-6" size={36} color="#fff" />
                        <Text style={{
                            color:'#fff',
                            fontSize:20,
                            fontWeight:'bold',
                            textAlign:'center',
                            padding:5
                        }}>
                            Generic
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#3AAD94',
                            paddingHorizontal:24,
                            paddingVertical:16,
                            marginTop:12,
                            borderRadius:10,
                            flexDirection:'row',
                            justifyContent:'space-between',
                            minHeight:120,
                            alignItems:'center'
                        }}
                        onPress={ () => navigation.navigate('DrugClassesScreen')}
                    >
                        <FontAwesome5 name="codepen" size={36} color="#fff" />
                        <Text style={{
                            color:'#fff',
                            fontSize:20,
                            fontWeight:'bold',
                            textAlign:'center',
                            padding:5
                        }}>
                            Drug Classes
                        </Text>
                    </TouchableOpacity>


                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#3AAD94',
                            paddingHorizontal:24,
                            paddingVertical:16,
                            marginTop:12,
                            borderRadius:10,
                            flexDirection:'row',
                            justifyContent:'space-between',
                            minHeight:120,
                            alignItems:'center'
                        }}
                        onPress={ () => navigation.navigate('BrandNamesScreen')}
                    >
                        <FontAwesome5 name="hands" size={36} color="#fff" />
                        <Text style={{
                            color:'#fff',
                            fontSize:20,
                            fontWeight:'bold',
                            textAlign:'center',
                            padding:5
                        }}>
                            Brand Names
                        </Text>
                    </TouchableOpacity>
                    
                    
                    


                    {/* <TouchableOpacity 
                        style={{
                            backgroundColor:'#3AAD94',
                            paddingHorizontal:24,
                            paddingVertical:16,
                            marginTop:8,
                            borderRadius:10,
                            flexDirection:'row',
                            justifyContent:'space-between',
                            minHeight:100,
                            alignItems:'center'
                        }}
                        onPress={ () => navigation.navigate('DosageFormScreen')}
                    >
                        <FontAwesome5 name="eye-dropper" size={32} color="#fff" />
                        <Text style={{
                            color:'#fff',
                            fontSize:18,
                            fontWeight:'bold',
                            textAlign:'center',
                            padding:5
                        }}>
                            Dosage Forms
                        </Text>
                    </TouchableOpacity> */}
                    
                </ScrollView>

            </View>

        </SafeAreaView>
    )
}
