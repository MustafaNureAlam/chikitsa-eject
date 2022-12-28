
import React, {useEffect, useState, useCallback, useRef} from 'react'
import { 
    View, 
    Text,
    TextInput,
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
    Feather
  } from '@expo/vector-icons';

import * as patientEnd from '../../../../services/api/patientEnd';
import Loader from '../../../modules/loader';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function NurseSpecialityScreen({navigation, route}) {

    const isMounted = useRef(true);
    const [api_data, setApidata] = useState(null);
    const [is_loading, setLoading] = useState(false)
    // console.log('api_data',api_data?.data);

    useFocusEffect(
        useCallback(() => {
            const abortController = new AbortController();
            const cls_concern = { signal : abortController.signal}

            if(isMounted) {
                setLoading(true);
                allSpecialityList(cls_concern);
                setLoading(false);
            }

            return () => {
                isMounted.current = false;
            }
        }, [navigation, route]),
    );


    async function allSpecialityList(signal) {
        setLoading(true);
        let speciality_data = await patientEnd.nurse_speciality(signal)
        setApidata(speciality_data)
        setLoading(false);

        // console.log('data',speciality_data);
    }

    function selected_ids(nurse_id) {
        // console.log('item', nurse_id)
        navigation.navigate('NurseListBySpeciality',nurse_id);
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
                                }}>
                                <TextInput 
                                    placeholder='Search'
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

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={api_data?.data}
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
                                                <Text style={{fontWeight:'bold',fontSize:14,color:'#000'}} >
                                                    {item.name} 
                                                </Text>
                                                <Text>
                                                    <Entypo name="chevron-right" size={24} color="black" />
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                )
            }
            
            
        </SafeAreaView>
        
    )
}

