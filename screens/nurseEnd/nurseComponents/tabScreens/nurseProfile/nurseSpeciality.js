import React, {useCallback, useState, useRef} from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    FlatList
} from 'react-native';

import config from '../../../../../services/config';
import token from '../../../../../services/local_storage/storage';
import {useFocusEffect} from '@react-navigation/native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function NurseSpecialityScreen({navigation, route}) {

    const isMounted = useRef(true);
    const [is_loading, setLoading] = useState(false);
    const [special_data, setDocSpecial] = useState(null);
    // console.log('=====api_data====',api_data);

    async function getDoctorSpecialization() {
        
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "nurse/specializations", requestOptions)
        .then(response => response.text())
        .then(result => {
            let doc_special_data = JSON.parse(result);
            if(isMounted){
                // console.log('-----doc_special_data-----',doc_special_data)
                setDocSpecial(doc_special_data);
            }
        })
        .catch(error => console.log('error', error));
    }

    useFocusEffect(
        useCallback(() => {
            if(isMounted){
                setLoading(true);
                getDoctorSpecialization()
                setLoading(false);
            }

            return() => {
                isMounted.current = false;
            }
        }, [navigation, route]),
    );

    
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            
            {
                is_loading ? (
                    null
                ) : (
                    <View style={{}}>

                        
                        <FlatList 
                            showsVerticalScrollIndicator={false}
                            data={special_data?.data}
                            renderItem={({ item, index }) => (
                                
                                <View style={{
                                    marginHorizontal:15,
                                    marginVertical:5,
                                    flexDirection: 'row',
                                    paddingVertical: 10,
                                    justifyContent: 'space-between',
                                    paddingHorizontal: 10,
                                    // borderWidth:.3,
                                    borderRadius:5,
                                    backgroundColor:'#ECECEC'
                                }}>
                                    <View style={{
                                        flex: 1
                                    }}>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            fontSize: 14,
                                            color: '#3AAD94',
                                            padding:5
                                        }}>{item.name}</Text>

                                    </View>

                                    <View style={{
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}>
                                        {/* <TouchableOpacity>
                                            <Feather onPress={() => membership_update(item)} name="edit" size={24} color="#707070" />
                                        </TouchableOpacity> */}
                                    </View>
                                    

                                </View>
                            )}
                            numColumns={1}
                            keyExtractor={(item, index) => index.toString()}
                            ListHeaderComponent={
                                <View style={{
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    marginTop:20,
                                    marginBottom:10,
                                }}>
                                    
                                    <View style={{
                                        marginHorizontal:10,
                                        // marginTop:10
                                    }}>
                                        <Text style={{
                                            fontSize:17,
                                            fontWeight:'bold',
                                            color:'#000',
                                            textAlign:'left',
                                            padding:5
                                        }}>My Speciality</Text>
                                    </View>

                                    <View style={{
                                        justifyContent:'center',
                                        alignItems:'flex-end',
                                        // marginVertical:15
                                        marginBottom:10
                                    }}>
                                        <TouchableOpacity 
                                            style={{
                                                flexDirection: 'row',
                                                backgroundColor: '#3AAD94',
                                                paddingHorizontal:10,
                                                paddingVertical: 5,
                                                borderTopLeftRadius:100/2,
                                                borderBottomLeftRadius:100/2,
                                                alignItems:'center'
                                            }}
                                            onPress={() => navigation.navigate('CreateNurseSpecialityScreen')}
                                        >
            
                                            <MaterialIcons name="add-circle" size={16} color="#FFF" />
                                            <Text style={{
                                                color: '#FFF',
                                                marginLeft: 5
                                            }} >Create</Text>
            
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                
                            }
                        />
                    </View>
                )
            }
            

        </SafeAreaView>
    )
}
