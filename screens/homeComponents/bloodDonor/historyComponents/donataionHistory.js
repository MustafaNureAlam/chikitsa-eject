import React, {useState, useCallback, useRef} from 'react'
import { 
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image,
    FlatList,
    Linking
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
import { RadioButton, Avatar } from 'react-native-paper';
import config from '../../../../services/config';
import token from '../../../../services/local_storage/storage';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../../modules/loader';

export default function DonataionHistoryScreen({navigation}) {

    const isMounted = useRef(true);
    const [api_data, setApiData] = useState([]);
    const [is_loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {

            if(isMounted){
                setLoading(true);
                getApiData();
                setLoading(false);
            }
        
            return () => {
                isMounted.current = false;
                console.log('home_Returned');
            };
        }, []),
    );


    async function getApiData(){
        let user_token = await token.getItem("token");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch(config.baseUrl + "blood_donor/my_donation_history", requestOptions)
        .then(response => response.text())
        .then(result => {
            const data = JSON.parse(result)
            setApiData(data)
            console.log('====apidta=======my_donation_history')
            console.log(data)
            console.log('=====apidta======my_donation_history')
        })
        .catch(error => console.log('error', error));
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>

            {
                is_loading ? (
                    <Loader/>
                ) : (

                    <View style={{
                        flex:1,
                        paddingVertical:8
                    }}>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={api_data?.data}
                            renderItem={({item, index}) => (
                                <View style={{
                                    marginVertical:3,
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    alignItems:'center',
                                    borderWidth:.3,
                                    marginHorizontal:12,
                                    borderRadius:6,
                                    backgroundColor:'#fff',
                                    padding:8,
                                    flex:1
                                }}>
                                    <View style={{
                                        flexDirection:'row',
                                        // justifyContent:'space-between',
                                        // backgroundColor:'#fff',
                                        alignItems:'center',
                                        // marginHorizontal:15,
                                        // paddingVertical:7,
                                        // marginVertical:5,
                                        // elevation:1,
                                        // paddingHorizontal:10
                                    }}>
        
                                        <View style={{
                                            // paddingHorizontal:10,
                                            // flexDirection:'row',
                                            // alignItems:'center'
                                        }}>
                                            <Avatar.Image 
                                                style={{
                                                    backgroundColor:'#fff',
                                                    borderWidth:.5,
                                                    borderColor:'#70707B',
                                                    marginHorizontal:5
                                                }} 
                                                size={40} 
                                                source={{uri: config.baseUrl + 'uploades/' + item?.requested_by_user?.user_pic }} 
                                            />

                                            <View style={{
                                                padding:6
                                            }}>
                                                <Text style={{
                                                    color:'#E83A14',
                                                    fontSize:14,
                                                    fontWeight:'700'
                                                }}>{item?.request_detailes?.blood_group} {item?.request_detailes?.blood_rhd} ve</Text>
                                                {/* <Text style={{
                                                    color:'#000',
                                                    fontSize:14,
                                                    fontWeight:'500'
                                                }}>{item?.request_detailes?.createdAt}</Text> */}
                                            </View>
        
                                        </View>
                                                
                                        
                                        <View style={{paddingHorizontal:12, flex:1}}>
                                            <Text style={{
                                                color:'#000',
                                                fontSize:14,
                                                fontWeight:'700'
                                            }}>{item?.requested_by_user?.name}</Text>
                                            <Text style={{
                                                color:'#70707B',
                                                fontSize:12,
                                                fontWeight:'700'
                                            }}>{item?.request_detailes?.address}</Text>
                                            <Text style={{
                                                color:'#70707B',
                                                fontSize:12,
                                                fontWeight:'700'
                                            }}>{item?.request_detailes?.phone_number}</Text>
                                            <Text style={{
                                                color:'#70707B',
                                                fontSize:12,
                                                fontWeight:'700'
                                            }}>{item?.request_detailes?.requested_date} {item?.request_detailes?.requested_time}</Text>
                                        </View>
                                        
                                        
                                        
                                        
                                        <View style={{}}>
                                            <TouchableOpacity 
                                                style={{
                                                    backgroundColor:'#3AAD94',
                                                    padding:10,
                                                    borderRadius:10,
                                                    // marginTop:10
                                                }}
                                                onPress={() => {
                                                    Linking.openURL(`tel:${item?.request_detailes?.phone_number}`)
                                                }}
                                            >
                                                <Text 
                                                    style={{
                                                        textAlign:'center',
                                                        fontSize:14,
                                                        color:'#fff',
                                                        fontWeight:'bold'
                                                    }}
                                                >Call Now</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
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
