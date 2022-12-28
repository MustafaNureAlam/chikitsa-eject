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
    Platform,
    RefreshControl
} from 'react-native';

import { AntDesign, Feather, Fontisto, FontAwesome, MaterialIcons  } from '@expo/vector-icons';
import { Checkbox, TextInput, Button  } from 'react-native-paper';


import SugarFree from '../../../assets/medicine-bottle-mockup.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../modules/loader';

import { Root, Popup } from 'popup-ui';
import Toast from 'react-native-toast-message';
import * as Storage from '../../../services/local_storage/storage';
import token from '../../../services/local_storage/storage';
import config from '../../../services/config';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from "expo-image-picker";


export default function CartScreen({navigation, route}) {

    const isMounted = useRef(true);

    
    const [checked, setChecked] = useState(false);
    const [cart, setCart] = useState([]);
    const [cart_items, setItems] = useState([]);
    const [is_loading, setLoading] = useState(false);
    const [count, setCount] = useState(1);
    const [disable, setDisable] = useState(false);
    const [totalOrderValue, setTotalOrderValue] = useState(0);
    const [pharmacy_id, setPharmacyId] = useState(null);
    const [order_details, setOrderDetails] = useState([]);
    const [coupon, setCoupon] = useState("");
    const [coupon_visible, setCouponVisible] = useState(false);
    const [coupon_data, setCouponData] = useState([]);
    const [is_mandatory, setMandatory] = useState(false);
    const [attached_file, setAttachedFile] = useState(false);
    const [image, setImage] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getCart()
        setRefreshing(false);

        return () => {
            isMounted.current = false;
        }
    }, []);


    // const pickDocument = async () => {
    //     let result = await DocumentPicker.getDocumentAsync({
    //         type:'*/*',
    //         copyToCacheDirectory: false,
    //     });
    //     console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    //     // console.log(result.uri);
    //     console.log(result);
    //     console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
    //     setAttachedFile(result);
    // };

    const pickImage = async () => {
        
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need storage permissions to make this work!');
            } else{
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });

                console.log(result);

                if (!result.cancelled) {
                    setImage(result.uri);
                    setAttachedFile(true)
                } else {
                    setAttachedFile(false)
                }
            }
        }  
    };

    


    

    async function getCart(){
        // setLoading(true)
        try {
          const jsonValue = await AsyncStorage.getItem('cart_item').then(res => {
            let local_data = JSON.parse(res);
            setCart(local_data);
            setPharmacyId(local_data[0]?.pharmacy_id)

            local_data.forEach((element, index) => {
                
                console.log('============local_data========')
                console.log(element)
                // console.log('index', index)
                console.log('============local_data end========')
                if(element.prescription_required == 1) {
                    console.log('hello')
                    setMandatory(true)
                } else{
                    console.log('else block')
                    setMandatory(false)
                }
            
            });

            let total_order_value = local_data.reduce((accumulator, current) => accumulator + parseFloat(current.total_val), 0);
            setTotalOrderValue(total_order_value)
          })
          return jsonValue != null ? JSON.parse(jsonValue) : null;
          
        } catch(e) {
          // error reading value
        } 
    }

    async function valueCalculat(item, index, count, query_type){
        let filterd_data;
        if(query_type=="increment"){
            cart[index]["item_count"] = count+1;
            cart[index]["total_val"] = (count+1)*cart[index]['price'];
            
            filterd_data = JSON.stringify(cart);
        }else if(query_type=="decrement"){

            if(cart[index]["item_count"] > 1){
                cart[index]["total_val"] = (cart[index]["total_val"] - cart[index]['price']);
                cart[index]["item_count"] = count-1;
            }
            
            filterd_data = JSON.stringify(cart);
        }
        let total_order_value = cart.reduce((accumulator, current) => accumulator + parseFloat(current.total_val), 0);
        setTotalOrderValue(total_order_value)   
        await AsyncStorage.setItem('cart_item',filterd_data)
    }

    useFocusEffect(
        useCallback(() => {

            if(isMounted){
                setLoading(true);
                getCart();
                setLoading(false);
            }

            // async()=> {
            //   try {
            //     await AsyncStorage.removeItem('cart_item')
            //   } catch(e) {
            //     // remove error
            //   }
            // }
        
            return () => {
                isMounted.current = false;
            };
        }, []),
    );

    async function removeCartItem(item, data_index) {

        Alert.alert(
            "Remove Item",
            "Are you sure, want to remove item?",
            [
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Yes", onPress: async() => 
                
                {

                    try {
                        await AsyncStorage.getItem('cart_item').then(async(res) => {
                            
                            let data = JSON.parse(res)
                            let filteredArray = data.filter((value, index) => index !== data_index);
                            
                            setLoading(true);
                            setCart(filteredArray);
                            let total_order_value = filteredArray.reduce((accumulator, current) => accumulator + parseFloat(current.total_val), 0);
                            setTotalOrderValue(total_order_value) 
                            setLoading(false);
                            
                            await AsyncStorage.setItem('cart_item',JSON.stringify(filteredArray));
                            if (filteredArray.length>=0){
                                await AsyncStorage.setItem('count',JSON.stringify(filteredArray.length));
                                setLoading(true);
                                getCart();
                                setLoading(false);
                                // console.log("Baaaaaaaaaaaaaaler baaaal",filteredArray.length);
            
                            }else{
                                await AsyncStorage.setItem('count',JSON.stringify(0));
                                setLoading(true);
                                getCart();
                                setLoading(false);
                            }

                            DeviceEventEmitter.emit("REDUCE_COUNT");
                            
                            Toast.show({
                                type: 'error',
                                text1: 'Item removed',
                                text2: 'Successfully revomed item!'
                            });
            
                            
                        })
                    } catch(e) {
                        // remove error
                    }

                }
              }
            ]
        );


        
    }

    async function goToCheckout() {

        if(!attached_file && is_mandatory) {
            
            Alert.alert("Alert!", "Please upload your prescription to buy this medicine!", [              
                { text: "ok", onPress: () => null }
            ]);

        } else{

            if(coupon_visible == true) {
    
                navigation.navigate('CheckoutScreen', { 
                    taka: coupon_data?.discounted_price, 
                    item : cart?.length, 
                    pharmacy_id : pharmacy_id, 
                    save_pharmacy : checked,
                    coupon_id : coupon_data?.coupon_id,
                    prescription_image : image
                });
    
                setTotalOrderValue(0);
                setCouponVisible(false)
            } else{
                navigation.navigate('CheckoutScreen', { 
                    taka: totalOrderValue, 
                    item : cart?.length, 
                    pharmacy_id : pharmacy_id, 
                    save_pharmacy : checked,
                    prescription_image : image
                });
                setTotalOrderValue(0);
            }
    
            
            if(checked == true) {
                navigation.navigate('CheckoutScreen', { 
                    taka: totalOrderValue, 
                    item : cart?.length, 
                    pharmacy_id : pharmacy_id, 
                    save_pharmacy : checked,
                    prescription_image : image
                });
                setTotalOrderValue(0)
    
            } else{
                console.log('totalOrderValue')
                console.log(totalOrderValue)
                console.log('totalOrderValue')
                // navigation.navigate('CheckoutScreen', { taka: totalOrderValue, item : cart?.length, pharmacy_id : pharmacy_id, save_pharmacy : checked});
                // setTotalOrderValue(0);
            }
        }

        
    }

    async function callCouponEnd() {
        var myHeaders = new Headers();
        let user_token = await token.getItem("token");
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "coupon_code": coupon,
        "pharmacy_id": pharmacy_id,
        "order_amount": totalOrderValue
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "medicine/apply_coupon", requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result);

            if(data.code == 200) {
                setCouponData(data);
                setCouponVisible(true);
            } else{
                Alert.alert(
                    "Not valid!",
                    "The coupon you used is not valid!",
                    [
                    //   {
                    //     text: "Cancel",
                    //     onPress: () => console.log("Cancel Pressed"),
                    //     style: "cancel"
                    //   },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
            // console.log('============setCouponData==========')
            // console.log(data)
            // console.log('============setCouponData==========')
        })
        .catch(error => console.log('error', error));
    }


    async function applyCoupon() {
        

        // console.log('%%%%%%%%%%%%%%')
        // console.log(coupon)
        // console.log('%%%%%%%%%%%%%%')
        if(coupon == "") {
            Alert.alert(
                "Not valid!",
                "Use valid coupon.",
                [
                //   {
                //     text: "Cancel",
                //     onPress: () => console.log("Cancel Pressed"),
                //     style: "cancel"
                //   },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        } else{
            console.log('else====',coupon)
            callCouponEnd();
        }
        
    }
    


    return (
        <Root>
            <SafeAreaView style={{flex:1, backgroundColor:'#fff',padding:8}}>
                <StatusBar backgroundColor={'#075141'}/>

                {
                    is_loading ? (
                        <Loader/>
                    ) : (
                            
                            <View style={{flex: 1, paddingHorizontal: 8}}>
                                

                                <FlatList 
                                    refreshControl={
                                        <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh}
                                        />
                                    }
                                    showsVerticalScrollIndicator={false}
                                    data={cart}
                                    renderItem={({ item, index }) => (
                                        
                                        <View 
                                            style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                borderBottomWidth: 1,
                                                paddingBottom: 12,
                                                marginTop: 12,
                                                borderBottomColor: '#ccc',
                                                alignSelf:'center'
                                            }}
                                        >
                                            <Image source={SugarFree}/>
                                            
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                marginHorizontal: 8
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    flex:1
                                                }}>
                                                    
                                                    <View style={{flex:1}}>
                                                        <Text style={{
                                                            fontSize:16,
                                                            fontWeight:'bold'
                                                        }}>{item?.medicine_name}</Text>
                                                        <Text style={{
                                                            fontSize:12,
                                                            fontWeight:'bold'
                                                        }}>{item?.price} TK</Text>

                                                        <Text style={{
                                                            fontSize:12,
                                                            fontWeight:'bold'
                                                        }}>Total:{item?.total_val} TK</Text>
                                                    </View>

                                                    {
                                                        coupon_visible != true && (

                                                            <View style={{
                                                                flexDirection:'column',
                                                                justifyContent:'space-between',
                                                                // flexGrow:1
                                                            }}>

                                                                <TouchableOpacity 
                                                                    onPress={() => removeCartItem(item, index)}
                                                                    // onPress={() => console.log(item)}
                                                                >
                                                                    <AntDesign name="closecircleo" size={24} color="#EB1D36" />
                                                                </TouchableOpacity>
                                                                
                                                                {
                                                                    item?.prescription_required == 1 && (
                                                                        <MaterialIcons 
                                                                            style={{position:'relative', top:24}} 
                                                                            name="assignment" 
                                                                            size={26} 
                                                                            color="#EB1D36" 
                                                                            onPress={() => {
                                                                                Toast.show({
                                                                                    type:'error',
                                                                                    text1:'Prescription is required to buy ' + item?.medicine_name,
                                                                                    text2 : 'Please upload your prescription'
                                                                                })
                                                                            }}
                                                                        />
                                                                    )
                                                                }
                                                                
                                                            </View>


                                                        )
                                                    }

                                                
                                                </View>

                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'flex-end'
                                                }}>
                                                    {/* <Text style={{
                                                        fontWeight: 'bold',
                                                        fontSize: 20
                                                    }}>
                                                        {item.productPrice}
                                                    </Text> */}
                                                    <View style={{
                                                        flexWrap: 'wrap',
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-end',
                                                        // backgroundColor: '#F2F4FF'
                                                    }}>
                                                        {
                                                            coupon_visible != true && (

                                                                <TouchableOpacity 
                                                                    style={{
                                                                        backgroundColor: '#3AAD94',
                                                                        borderRadius: 50,
                                                                        padding: 5
                                                                    }}
                                                                    onPress={() => {
                                                                        valueCalculat(item, index, item?.item_count, "decrement")
                                                                    }}    
                                                                >
                                                                    <AntDesign name="minus" size={18} color="#fff" />
                                                                </TouchableOpacity>

                                                            )
                                                        }
                                                        
                                                        <Text style={{
                                                            marginHorizontal: 8,
                                                            fontSize:14,
                                                            fontWeight:"bold"
                                                        }}>
                                                            {item?.item_count}
                                                        </Text>
                                                        
                                                        {
                                                            coupon_visible != true && (

                                                                <TouchableOpacity 
                                                                    style={{
                                                                        backgroundColor: '#3AAD94',
                                                                        borderRadius: 50,
                                                                        padding: 5
                                                                    }}
                                                                    onPress={() => {
                                                                        setCount(count + 1)

                                                                        valueCalculat(item, index, item?.item_count, "increment")
                                                                    }}
                                                                >
                                                                    <AntDesign name="plus" size={18} color="#fff" />
                                                                </TouchableOpacity>

                                                            )
                                                        }
                                                        
                                                    </View>
                                                </View>
                                            </View>

                                        </View>
                                    )}
                                    numColumns={1}
                                    keyExtractor={(item, index) => index.toString()}

                                    ListHeaderComponent={

                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: 20
                                        }}>
                                            <Text style={{
                                                fontSize:14,
                                                fontWeight:'bold'
                                            }}>{cart?.length ? cart?.length : "No"} items in your cart</Text>

                                            {
                                                coupon_visible != true && (

                                                    <TouchableOpacity
                                                        onPress={() =>{
                                                            navigation.navigate('DrawerHome', {screen : 'PharmacyScreenStack'})
                                                        }}
                                                    >
                                                        <View style={{
                                                            flexDirection: 'row',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center'
                                                        }}>
                                                            <Fontisto name="shopping-basket-add" size={24} color="black" />
                                                            <Text style={{
                                                                fontSize:14,
                                                                fontWeight:'bold',
                                                                paddingHorizontal:4
                                                            }}>Add more</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            }
                                        </View>

                                    }

                                    ListFooterComponent={

                                        <View>

                                            <View style={{
                                                marginVertical: 15,
                                                // flexDirection: 'row',
                                                // justifyContent: 'space-between',
                                                // alignItems: 'center',
                                                // borderWidth: 1,
                                                // borderColor: '#ccc',
                                                // padding: 15,
                                                // borderRadius: 8
                                            }}>

                                                {
                                                    is_mandatory == true && cart?.length > 0 && (
                                                        <View style={{
                                                            flex:1,
                                                            // backgroundColor:'#ccc',
                                                            // padding:8
                                                        }}>
                                                            <Button 
                                                                icon="file-upload" 
                                                                mode="contained" 
                                                                onPress={pickImage}
                                                                color='#3AAD94'
                                                                labelStyle={{
                                                                    color:'#fff'
                                                                }}
                                                                style={{
                                                                    padding:8
                                                                }}
                                                            >
                                                                Upload prescription
                                                            </Button>

                                                            <View style={{flex:1, padding:4}}>
                                                            
                                                                {image && (
                                                                    <Image 
                                                                        resizeMethod='auto' 
                                                                        resizeMode='cover' 
                                                                        source={{ uri: image }} 
                                                                        style={{ minWidth: 64, height: 128, borderRadius: 4 }} 
                                                                        on
                                                                    />)
                                                                }

                                                            </View>


                                                        </View>
                                                    )
                                                }
                                            
                                                <View style={{
                                                    flexDirection: 'row',
                                                    marginTop:12
                                                }}>
                                                    {/* <TouchableOpacity>
                                                        <AntDesign name="tago" size={22} color="#090F47" />
                                                    </TouchableOpacity>
                                                    <Text style={{
                                                        marginLeft: 10,
                                                        color: '#27AE60',
                                                        fontSize:14,
                                                        fontWeight:'bold'
                                                    }}>1 Coupon applied</Text> */}

                                                    <View style={{
                                                        flex:.8
                                                    }}>
                                                        <TextInput
                                                            value={coupon}
                                                            onChangeText={(text) => {
                                                                // console.log('text',text)
                                                                setCoupon(text)
                                                            }}
                                                            placeholder='Code here'
                                                            label={"Apply coupon"}
                                                            activeUnderlineColor="#3AAD94"
                                                            keyboardType='ascii-capable'

                                                        />
                                                    </View>
                                                    
                                                    <View style={{
                                                        flex:.2
                                                    }}>
                                                        <TouchableOpacity 
                                                            style={{
                                                                backgroundColor:'#3AAD94',
                                                                flex:1,
                                                                alignItems:"center",
                                                                justifyContent:"center",
                                                                borderTopRightRadius:8,
                                                            }}
                                                            onPress={() => {
                                                                applyCoupon();
                                                            }}
                                                        >
                                                            <FontAwesome name="chevron-right" size={24} color="#fff" />
                                                        </TouchableOpacity>
                                                    </View>

                                                    
                                                </View>
                                            
                                            </View>

                                            {
                                                coupon_visible == true && (

                                                    <View style={{
                                                        flex:1,
                                                        flexDirection:"row",
                                                        borderWidth:2,
                                                        borderColor:'#3AAD94',
                                                        borderRadius:6,
                                                        justifyContent:'space-between',
                                                        paddingHorizontal:12,
                                                        paddingVertical:6,
                                                        alignItems:'center',
                                                        marginVertical:4
                                                    }}>
                                                        <Text style={{
                                                            color:'#3AAD94',
                                                            fontSize:16,
                                                            fontWeight:"bold",
                                                            textAlign:'center'
                                                        }}>
                                                            {coupon.toUpperCase()} <Text style={{color:'#707070'}}>Coupon applied !</Text>
                                                        </Text>
                                                        <MaterialIcons 
                                                            name="cancel" 
                                                            size={26} 
                                                            color="#EB1D36"
                                                            onPress={() => {
                                                                setCoupon("");
                                                                setCouponVisible(false);
                                                            }}
                                                        />
                                                    </View>
                                                )
                                            }

                                            
                                            <View>
                                            
                                                <Text style={{
                                                    color: '#090F47',
                                                    fontSize: 18,
                                                    fontWeight:'bold'
                                                }}>Payment Summary</Text>
                                            
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    marginTop: 10
                                                }}>
                                            
                                                    <Text style={{
                                                        color: '#707070',
                                                        fontWeight:'bold'
                                                    }}>Amount</Text>
                                                    <Text style={{
                                                        color: '#707070',
                                                        fontWeight:"bold",
                                                        fontSize:16,
                                                        // color:'#3AAD94'
                                                    }}>{totalOrderValue}</Text>
                                                </View>
                                                
                                                {
                                                    coupon_visible == true && (
                                                        <View>

                                                            <View style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between',
                                                                marginVertical: 5
                                                            }}>
                                                                <Text style={{
                                                                    color: '#EB1D36',
                                                                    fontSize:14,
                                                                    fontWeight:'bold'
                                                                }}>Coupon Discount</Text>
                                                                <Text style={{
                                                                    color: '#EB1D36',
                                                                    fontWeight:'bold'
                                                                }}>
                                                                    -{(totalOrderValue - coupon_data?.discounted_price).toFixed(2)}
                                                                </Text>
                                                            </View>
                                                        
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                justifyContent: 'space-between',
                                                                marginVertical: 5
                                                            }}>
                                                                <Text style={{
                                                                    color: '#3AAD94',
                                                                    fontWeight:'bold'
                                                                }}>Discounted price</Text>
                                                                <Text style={{
                                                                    color: '#3AAD94',
                                                                    fontWeight:'bold'
                                                                }}>
                                                                    {coupon_data?.discounted_price}
                                                                </Text>
                                                            </View>

                                                        </View>
                                                    )
                                                
                                                }

                                            
                                                
                                            
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    marginVertical: 5
                                                }}>
                                                    <Text style={{
                                                        color: '#707070',
                                                        fontWeight:'bold'
                                                    }}>Shipping</Text>
                                                    <Text style={{
                                                        color: '#707070',
                                                        fontWeight:'bold'
                                                    }}>Free</Text>
                                                </View>
                                            
                                                <View style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between',
                                                    marginVertical: 10,
                                                    paddingTop: 10,
                                                    borderTopWidth: 1,
                                                    borderTopColor: '#737373'
                                                }}>
                                                    <Text style={{
                                                        color: '#090F47',
                                                        fontSize: 16,
                                                        fontWeight:'bold'
                                                    }}>Total</Text>

                                                    {
                                                        coupon_visible ? coupon_visible == true && (
                                                            <Text style={{
                                                                color: '#090F47',
                                                                fontSize: 16,
                                                                fontWeight:'bold'
                                                            }}>BDT. {coupon_data?.discounted_price}</Text>
                                                        ) : (
                                                            <Text style={{
                                                                color: '#090F47',
                                                                fontSize: 16,
                                                                fontWeight:'bold'
                                                            }}>BDT. {totalOrderValue}</Text>
                                                        )
                                                    }
                                                    
                                                </View>
                                            
                                            </View>

                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                // marginBottom: 30,
                                                marginVertical:12
                                            }}>
                                                <Text style={{
                                                    color: '#090F47',
                                                    fontSize: 16,
                                                    fontWeight:'bold'
                                                }}>Save Pharmacy</Text>
                                                
                                                <Checkbox  
                                                    status={checked ? 'checked' : 'unchecked'}
                                                    onPress={() => {
                                                        setChecked(!checked);
                                                    }}
                                                />
                                            </View>
                                            
                                            <TouchableOpacity 
                                                style={{
                                                    backgroundColor: '#3AAD94',
                                                    flex:1,
                                                    borderRadius:100/2,
                                                    marginHorizontal:24,
                                                    alignItems:'center',
                                                    marginVertical:12
                                                }}

                                                onPress={ () => {
                                                    goToCheckout();
                                                }}
                                            >

                                                {
                                                    coupon_visible ? coupon_visible == true && (

                                                        <Text style={{
                                                            borderRadius: 50,
                                                            padding: 12,
                                                            color: '#ffffff',
                                                            fontSize: 14,
                                                            fontWeight:'bold'
                                                        }}>Place Order @ BDT {coupon_data?.discounted_price}</Text>

                                                    ) : (
                                                        
                                                        <Text style={{
                                                            borderRadius: 50,
                                                            padding: 12,
                                                            color: '#ffffff',
                                                            fontSize: 14,
                                                            fontWeight:'bold'
                                                        }}>Place Order @ BDT {totalOrderValue}</Text>

                                                    )
                                                }
                                            
                                                

                                                

                                            </TouchableOpacity>
                                            
                                        </View>

                                    }
                                />

                                
                            </View>

                    )
                }
                
            </SafeAreaView>
        </Root>
    )
}