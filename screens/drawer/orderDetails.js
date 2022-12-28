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
    Alert
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';
import SugarFree from '../../assets/medicine-bottle-mockup.png';
// import config from '../../services/config';
// import token from '../../services/local_storage/storage';
import { useFocusEffect } from '@react-navigation/native';
// import Loader from '../modules/loader';

export default function OrderDetailsScreen({navigation, route}) {

    const [route_data, setRouteData] = useState(route.params);
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&')
    console.log(route_data)
    console.log('&&&&&&&&&&&&&&&&&&&&&&&')
    return (

        <SafeAreaView style={{flex:1,}}>
            <StatusBar backgroundColor={'#075141'}/>

            <ScrollView 
                showsVerticalScrollIndicator={false} 
                style={{
                    padding:12,
                    marginVertical:4
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
                        Order id : #{route_data?.item?.unique_order_id}
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
                            
                            {/* <Text style={{
                                fontSize:16,
                                fontWeight:'700',
                                color:'#3AAD94',
                            }}>
                                Product name : Test
                            </Text> */}
                            
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
                                    Price : {route_data?.item?.total_price} ৳
                                </Text>
                                
                                <Text style={{
                                    fontSize:14,
                                    fontWeight:'700',
                                    color:'#707070'
                                }}>
                                    Delivery cost : {route_data?.item?.shipping_charge} ৳ 
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
                            {route_data?.status?.tracking[0]?.message_en}
                        </Text>

                        <Text style={{
                            fontSize:14,
                            fontWeight:'bold',
                            fontStyle:'italic',
                            color:'#707070'
                        }}>
                            Estimated delivery date : {route_data?.status?.tracking[0]?.time.slice(0,10)}
                        </Text>

                        <Text style={{
                            fontSize:14,
                            fontWeight:'bold',
                            // fontStyle:'italic',
                            color:'#277BC0'
                        }}>
                            Payment status : {route_data?.item?.payment_status}
                        </Text>
                        <Text style={{
                            fontSize:14,
                            fontWeight:'bold',
                            // fontStyle:'italic',
                            color:'#707070'
                        }}>
                            Payment type : {route_data?.item?.payment_type}
                        </Text>
                    </View>

                </View>

                <View style={{
                    flex:1,
                    padding:8,
                    backgroundColor:"#fff",
                    borderRadius:6,
                    marginBottom:12,
                    marginHorizontal:4,
                    marginTop:8
                }}>
                    <Text style={{
                        fontSize:18,
                        fontWeight:'700',
                        color:'#707070',
                        // paddingVertical:4,
                        textAlign:'center',
                    }}>
                        Medicines ordered
                    </Text>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={route_data?.order_detailes}
                        renderItem={({item, index}) => (
                            <View style={{
                                flex:1,
                                backgroundColor:"#EAF6F6",
                                padding:8,
                                marginVertical:4,
                                borderRadius:4,
                                marginHorizontal:8
                                // borderColor:'#3AAD94',
                                // borderWidth:.5
                            }}>
                                <Text style={{
                                    fontSize:16,
                                    fontWeight:'700',
                                    color:'#707070'
                                }}>
                                    Medicine name : {item?.medicine_name}
                                </Text>
                                <Text style={{
                                    fontSize:14,
                                    // fontWeight:'700',
                                    color:'#707070'
                                }}>
                                    Item ordered : {item?.total_order}
                                </Text>
                                <Text style={{
                                    fontSize:14,
                                    // fontWeight:'700',
                                    color:'#707070'
                                }}>
                                    Price : BDT. {item?.price} / item
                                </Text>
                                <Text style={{
                                    fontSize:14,
                                    // fontWeight:'700',
                                    color:'#707070'
                                }}>
                                    Total Price : BDT. {item?.total_price}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    
                    

                </View>

            </ScrollView>

        </SafeAreaView>
    )
}
