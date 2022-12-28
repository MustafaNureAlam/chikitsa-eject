import React, {
    useState, 
    useEffect, 
    useCallback, 
    useRef,
    useLayoutEffect
} from 'react';
import { 
    View, 
    Text, 
    ScrollView, 
    SafeAreaView, 
    StatusBar, 
    Image, 
    FlatList, 
    TouchableOpacity,
    DeviceEventEmitter,
    Alert,
    RefreshControl
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import SugarFree from '../../assets/medicine-bottle-mockup.png';
import config from '../../services/config';
import token from '../../services/local_storage/storage';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../modules/loader';
export default function OrderScreen({navigation}) {
    
    const isMounted = useRef(true);
    
    const [checked, setChecked] = useState(false);
    const [is_loading, setLoading] = useState(false);
    const [api_data, setApidata] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        if(isMounted){
            setRefreshing(true);
            getOrederTracking();
            setRefreshing(false);
        }

        return() => {
            isMounted.current = false;
        } 
    }, []);

    async function getOrederTracking() {

        setLoading(true)
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);

        // var raw = "";
        
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        // body: raw,
        redirect: 'follow'
        };
        
        await fetch( config.baseUrl + "medicine/order_tracking", requestOptions)
        .then(response => response.text())
        .then(result => {
            let order_data = JSON.parse(result);

            setApidata(order_data?.data);
            setLoading(false)
            console.log('%%%%%%%%%%%order_data%%%%%%%%%%%%%%%')
            console.log(order_data)
            console.log('%%%%%%%%%%%order_data%%%%%%%%%%%%%%%')

        })
        .catch(error => console.log('error', error));

    }


    // useEffect(() => {
        
    //     if(isMounted) {
    //         setLoading(true)
    //         getOrederTracking();
    //         setLoading(false)
    //     }
    //     return () => {
    //         isMounted.current = false;
    //     }

    // }, [])

    useFocusEffect(
        useCallback(() => {
            
            if(isMounted) {
                setLoading(true)
                getOrederTracking();
                setLoading(false);  
            }

            return() => {
                isMounted.current = false;
            }
        }, []),
    );
    
    return (
        <SafeAreaView style={{flex:1, padding:12}}>
            
            <StatusBar backgroundColor={'#075141'}/>

            {
                is_loading ? (
                    <Loader/>
                ) : (
                    <View style={{flex:1}}>
                        <FlatList
                            refreshControl={
                                <RefreshControl 
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            }
                            showsVerticalScrollIndicator={false}
                            data={api_data}
                            renderItem={({item, index}) => (

                                <View style={{flex:1}}>
                                    <TouchableOpacity 
                                        onPress={()=> {
                                            navigation.navigate('OrderDetailsScreen', item)
                                        }}
                                    >

                                        <View style={{
                                            flex:1,
                                            paddingVertical:8,
                                            paddingHorizontal:8,
                                            backgroundColor:'#fff',
                                            borderRadius:6,
                                            elevation:.3,
                                            margin:4,
                                        }}>
                        
                                            <Text style={{
                                                fontSize:18,
                                                fontWeight:'bold',
                                                textAlign:'left',
                                                paddingVertical:8,
                                                paddingHorizontal:8,
                                                color:'#7C7D7E'
                                            }}>
                                                Order id : #{item?.item?.unique_order_id}
                                            </Text>
                        
                                            <View style={{
                                                flex:1,
                                                flexDirection:'row',
                                                justifyContent:'flex-start',
                                                alignItems:'center',
                                                padding:8,
                                            }}>
                        
                                                <Image source={SugarFree} />
                                                
                                                <View style={{
                                                    paddingHorizontal:12,
                                                    flex:1
                                                }}>
                                                    
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'700',
                                                        color:'#3AAD94',
                                                    }}>
                                                        Product name : Test
                                                    </Text>
                                                    
                                                    <Text style={{
                                                        fontSize:14,
                                                        fontWeight:'700',
                                                        color:'#707070'
                                                    }}>
                                                        Pharmacy : ph 01
                                                    </Text>
                        
                                                    <View>
                                                
                                                        <Text style={{
                                                            fontSize:14,
                                                            fontWeight:'700',
                                                            color:'#707070'
                                                        }}>
                                                            Price : {item?.item?.total_price} ৳
                                                        </Text>
                                                        
                                                        <Text style={{
                                                            fontSize:14,
                                                            fontWeight:'700',
                                                            color:'#707070'
                                                        }}>
                                                            Delivery cost : {item?.item?.shipping_charge} ৳ 
                                                        </Text>
                        
                                                    </View>
                        
                                                </View>
                        
                                            </View>
                        
                                            <View style={{
                                                paddingVertical:8,
                                                borderTopWidth:.3,
                                                marginHorizontal:8
                                            }}>
                                                <Text style={{
                                                    fontSize:14,
                                                    fontWeight:'bold',
                                                    fontStyle:'italic',
                                                    color:'#3AAD94'
                                                }}>
                                                    {item?.status?.tracking[0]?.message_en}
                                                </Text>
                        
                                                <Text style={{
                                                    fontSize:14,
                                                    fontWeight:'bold',
                                                    fontStyle:'italic',
                                                    color:'#707070'
                                                }}>
                                                    Estimated delivery date : {item?.status?.tracking[0]?.time.slice(0,10)}
                                                </Text>

                                                <Text style={{
                                                    fontSize:14,
                                                    fontWeight:'bold',
                                                    // fontStyle:'italic',
                                                    color:'#277BC0'
                                                }}>
                                                    Payment status : {item?.item?.payment_status}
                                                </Text>
                                                <Text style={{
                                                    fontSize:14,
                                                    fontWeight:'bold',
                                                    // fontStyle:'italic',
                                                    color:'#707070'
                                                }}>
                                                    Payment type : {item?.item?.payment_type}
                                                </Text>
                                            </View>
                        
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