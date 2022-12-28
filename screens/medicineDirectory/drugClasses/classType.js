import React, {useCallback, useEffect, useRef, useState} from 'react'
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, FlatList } from 'react-native';

import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

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

import { useFocusEffect } from '@react-navigation/native';

import token from '../../../services/local_storage/storage';
import Loader from '../../modules/loader';
import config from '../../../services/config';


export default function ClassTypeScreen({navigation, route}) {

    const class_id = route.params?.data?.id;

    const isMounted = useRef(true);

    const [api_data, setApiData] = useState([]);
    const [is_loading, setLoading] = useState(true);
    
    const [select_data, setSelectData] = useState([]);
    const [select_id, setSelectId] = useState("");
    const [sub_child, setSubChild] = useState([]);


    
    
    

    async function getClassNamesById() {

        let user_token = await token.getItem("token");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch( config.baseUrl +  "medicine/get_child_by_drug_class_id/" + class_id, requestOptions)
        .then(response => response.text())
        .then(result => {
            let api_response = JSON.parse(result);
            
            
            // console.log('class list==============');
            // console.log(api_response);
            // console.log('class list==============');

            // setSelectData([]);
            let data_arr = [];
            api_response?.data.map((item, index) => {
                let select_value = {
                    label : item.name,
                    id : item.id,
                    data : item.sub_child
                }
                data_arr.push(select_value);
                
                if(index+1 === api_response?.data.length ) {
                    setSelectData(data_arr);
                    setApiData(api_response);
                    setSubChild(api_response.data[0]?.sub_child);
                }
                // console.log('=========')
                // console.log(item?.name)
                // console.log('=========')
            })

            // console.log('===============class data========')
            // console.log(select_data)
            // console.log('===============class data========')
            

        })
        .catch(error => console.log('error', error));
    }


    useFocusEffect(
        useCallback(() => {

            if(isMounted) {
                setLoading(true);
                getClassNamesById();
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
                            
                        
                        <View style={{
                            marginVertical:16
                        }}>

                            {
                                api_data.data?.length > 0 && (

                                    <FlatList 
                                        data={sub_child}
                                        renderItem={({ item, index }) => (
                                            <View>
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
                                                    onPress={() => 
                                                        navigation.navigate('ClassDetailsScreen',{title : item?.name, data : item})
                                                        // console.log(item)
                                                    }
                                                >
                                                    <View style={{
                                                        marginRight:8
                                                    }}>
                                                        <Text style={{
                                                            color:'#808080',
                                                            fontSize:14,
                                                            fontWeight:'bold',
                                                            textAlign:'left',
                                                            padding:4
                                                        }}>{item?.name}</Text>
                                                    </View>
                                                    <View>
                                                        <FontAwesome5 name="chevron-right" size={24} color="#808080" />
                                                    </View>
        
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                        ListHeaderComponent={
                                            <View>
                                            
                                                <RadioButtonRN
                                                    data={select_data}
                                                    selectedBtn={(e) => {
                                                        setSelectId(e?.id);
                                                        setSubChild(e?.data);
                                                    }}
                                                    icon={
                                                        <Icon
                                                            name="check-circle"
                                                            size={25}
                                                            color="#3AAD94"
                                                        />
                                                    }
                                                    activeColor="#3AAD94"
                                                    // initial={1}

                                                />

                                            </View>
                                        }
                                    />
                                )
                            }


                        </View>

                    </View>

                )
            }


        </SafeAreaView>
    )
}
