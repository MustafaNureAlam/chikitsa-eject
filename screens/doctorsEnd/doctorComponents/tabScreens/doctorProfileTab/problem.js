import React, {useEffect, useState, useRef, useCallback} from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    Pressable,
    Picker,
    FlatList
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { 
    MaterialCommunityIcons,
    AntDesign,
    MaterialIcons,
    FontAwesome,
    Entypo,
    FontAwesome5,
    Ionicons  
} from '@expo/vector-icons';

import config from '../../../../../services/config';
import token from '../../../../../services/local_storage/storage';
import Loader from '../../../../modules/loader';

export default function ProblemScreen({navigation, route}) {

    const isMounted = useRef(true);    
    const [is_loading, setLoading] = useState(false);
    const [concern_data, setConcernData] = useState(null);
    // console.log('=====api_data====',api_data);

    async function getDoctorConcernsList() {
        
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "doctor/doctor_selected_symptom", requestOptions)
        .then(response => response.text())
        .then(result => {
            let doc_concern_list = JSON.parse(result);
            console.log('-----doc_concern_list-----')
            console.log(doc_concern_list)
            console.log('-----doc_concern_list-----')
            setLoading(true);
            setConcernData(doc_concern_list);
            setLoading(false);
        })
        .catch(error => console.log('error', error));
    }

    useFocusEffect(
        useCallback(() => {
            if(isMounted) {
                setLoading(true);
                getDoctorConcernsList()
                setLoading(false);
            }

            return () => {
                isMounted.current = false;
            };
        }, []),
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
                            data={concern_data?.data}
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
                                        }}>{item?.symptom_name}</Text>

                                    </View>

                                    <View style={{
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}>
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
                                        }}>Symptoms</Text>
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
                                            onPress={() => navigation.navigate('CreateDocSymptoms')}
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
