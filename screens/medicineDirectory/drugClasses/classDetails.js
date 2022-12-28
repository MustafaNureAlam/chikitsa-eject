import React, {useState, useRef, useCallback, useEffect} from 'react'
import { 
    View, 
    Text, 
    StatusBar, 
    SafeAreaView, 
    TextInput, 
    TouchableOpacity, 
    FlatList 
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

import token from '../../../services/local_storage/storage';
import Loader from '../../../screens/modules/loader';
import config from '../../../services/config';
import { useFocusEffect } from '@react-navigation/native';


export default function ClassDetailsScreen({navigation, route}) {

    const isMounted = useRef(true);

    const route_params = route.params?.data;
    const [api_data, setApiData] = useState([]);
    const [is_loading, setLoading] = useState(false);

    
    // console.log('===========route generic list========')
    // console.log(route_params.id)
    // console.log('===========route generic list========')
    

    async function getGenericNames() {


        let user_token = await token.getItem("token");
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "drug_class_sub_child_id": route_params?.id
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "medicine/generic_list", requestOptions)
        .then(response => response.text())
        .then(result => {
            let api_response = JSON.parse(result);
            
            setApiData(api_response);
            // console.log('============search data-=========')
            // console.log(api_response);
            // console.log('============search data-=========')
        })
        .catch(error => console.log('error', error));
    }


    useFocusEffect(
        useCallback(() => {

            if(isMounted) {
                setLoading(true);
                getGenericNames();
                setLoading(false);
            }
            
        
            return () => {
                // Once the Screen gets blur Remove Event Listener
               isMounted.current = false;
            };
        }, []),
    );



    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff', paddingHorizontal:16}} >
            
            <StatusBar backgroundColor={'#075141'}/>

            {
                is_loading ? (
                    <Loader/>
                ) : (

                    <View>
                        
                        {/* <View style={{
                            paddingVertical:8
                        }}>
                            <TouchableOpacity 
                                style={{
                                    backgroundColor:'#EEEEEE',
                                    paddingHorizontal:24,
                                    paddingVertical:16,
                                    borderRadius:5,
                                    marginTop:8
                                }}
                                onPress={() => 
                                    navigation.navigate('GenericMedicineName',{title : route.params.title, data : route_params })
                                    // console.log(item)
                                }
                            >
                                <View style={{
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        marginRight:8
                                    }}>
                                        <Text style={{
                                            color:'#808080',
                                            fontSize:16,
                                            fontWeight:'bold',
                                            textAlign:'left',
                                            // padding:4
                                        }}>
                                            {route.params.title}
                                        </Text>
                                    </View>
                                    <View>
                                        <FontAwesome5 name="chevron-right" size={24} color="#808080" />
                                    </View>
                                </View>

                                <Text style={{
                                    color:'#808080'
                                }}>
                                    Adjunctive use in the management of 
                                    cardiac arrest. It is used in cardiopulmonary 
                                    resuscitation. Intracardiac puncture and 
                                    intramyocardial injection of adrenaline maybe 
                                    effective when external cardiac ...
                                </Text>

                            </TouchableOpacity>
                        </View> */}

                        <View style={{marginTop:16}}>

                            <FlatList 
                                showsVerticalScrollIndicator={false}
                                data={api_data?.data}
                                renderItem={ ({item, index}) => (
                                    <View style={{}}>

                                        {
                                            api_data?.data.length > 0 ? (

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
                                                    onPress={() => navigation.navigate('GenericMedicineName',{ title : item?.name, data : item, path : "class" })}
                                                >
                                                    <View>
                                                        <Text style={{
                                                            color:'#808080',
                                                            fontSize:14,
                                                            fontWeight:'bold',
                                                            textAlign:'left',
                                                            padding:4
                                                        }}>{item?.name}</Text>
                                                        {/* <Text style={{
                                                            color:'#B4B4B4',
                                                            fontSize:12,
                                                            fontWeight:'bold',
                                                            textAlign:'left',
                                                            padding:4
                                                        }}>1 available Brand</Text> */}
                                                    </View>
                                                    <View>
                                                        <FontAwesome5 name="chevron-right" size={24} color="#808080" />
                                                    </View>

                                                </TouchableOpacity>
                                            ) : (
                                                <View style={{
                                                    
                                                }}>
                                                    <Text style={{
                                                        color:'#000',
                                                        textAlign:'center',
                                                        fontSize:16
                                                    }}>Not available</Text>
                                                </View>
                                            )
                                        }
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />

                            

                        </View>
                        
                    </View>
                )
            }


        </SafeAreaView>
    )
}