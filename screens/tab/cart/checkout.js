import React, {
    useCallback, 
    useState, 
    useRef, 
    useEffect
} from 'react'
import { 
    View, 
    Text, 
    ScrollView, 
    SafeAreaView, 
    Pressable, 
    StatusBar, 
    Image, 
    FlatList, 
    TouchableOpacity,
    TouchableWithoutFeedback,
    Button,
    Alert
} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Card, RadioButton } from 'react-native-paper';
import { WebView } from 'react-native-webview';

import RBSheet from "react-native-raw-bottom-sheet";


import masterCardLogo from '../../../assets/master.png';
import token from '../../../services/local_storage/storage';
import config from '../../../services/config';
import payment from '../../../services/api/payment';
import Loader from '../../modules/loader';
import { Root, Popup } from 'popup-ui';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import default_image from "../../../assets/user_avatar.png";

export default function CheckoutScreen({navigation, route}) {

    const isMounted = useRef(true);
    const refRBSheet = useRef();
    const [is_loading, setLoading] = useState(false);

    const [checked, setChecked] = useState('first');

    const [payMethod, setPayMethod] = useState("");
    const [webRedirect, setWebRedirect] = useState(false);
    const [myLocation, setMySavedLocation] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [user_address, setUserAddress] = useState(null);
    const [payable, setPayable] = useState(route.params);
    const [bank, setBank] = useState([]);
    const [mobile, setMobile] = useState([]);

    const [order_id, setOrderId] = useState([]);

    const [getwayUrl, setGetwayURL] = useState("");
    const [is_visible, setVisible] = useState(false);
    const [unique_order, setUniqueOrder] = useState("");

    // console.log('======checkout====')
    // console.log(route.params)
    // console.log('====checkout======')
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };


    async function getUserLocation() {

        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
    
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");
    
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    
        let location_data = [];
    
        await fetch( config.baseUrl + "location/my_locations", requestOptions)
        .then(response => response.text())
        .then(result => {
            location_data = JSON.parse(result);
            setMySavedLocation(location_data)
            // console.log('===============setMySavedLocation========')
            // console.log(location_data)
            // console.log('===============setMySavedLocation========')
        })
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
        if(isMounted) {
            setLoading(true)
            getUserLocation()
            setLoading(false)
        }
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {
        if(isMounted) {
            setLoading(true)
            getPaymentMethodData()
            setLoading(false)
        }
        return () => {
            isMounted.current = false;
        }
    }, [payMethod])

    async function getPaymentMethodData() {
        setLoading(true)

        let user_token = await token.getItem("token");
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "pharmacy_id": "1",
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "pharmacy/acceptable_payment_method", requestOptions)
        .then(response => response.text())
        .then(async(result) => {
            let order_confirm = JSON.parse(result);
            // setLoading(true);
            // setCategoryList(order_confirm);
            // setPharmacyList(order_confirm?.pharmacy_data);
            // setLoading(false);
            // console.log('=====order_confirm=======', )
            // console.log(order_confirm)
            // console.log('=====order_confirm=======', )
            
            let bank_arr = [];
            let mob_arr = [];
            order_confirm.data.forEach(element => {
                if(element.method_type == "bank") {
                    // console.log('eeee',element)
                    bank_arr.push(element)
                    // setBank(bank_arr)
                } else if(element.method_type == "mobile") {
                    // setMobile(element)
                    mob_arr.push(element)
                }
            });

            setBank(bank_arr);
            setMobile(mob_arr);
            // console.log('bank array')
            // console.log(bank_arr)
            // console.log('bank array')



            if(order_confirm.status == 200) {
                // setOrderId(order_confirm.data);

                await AsyncStorage.removeItem('cart_item');
                await AsyncStorage.removeItem('count');

                Popup.show({
                    type: 'Success',
                    title: 'Order completed',
                    button: true,
                    textBody: 'Congrats! Your order successfully placed',
                    buttonText: 'Ok',
                    callback: () => {
                        Popup.hide();
                        navigation.navigate('CartScreen')
                    }
                })
            }
            
            setLoading(false);
        })
        .catch(error => console.log('error', error));
    }

    function openBottomSheet(payment) {
        if(payment != "cash") {
            refRBSheet.current.open();
        }
    }


    function set_selected_address(index, item) {
        setSelectedId(item.id);

        setUserAddress(item);
        setVisible(true);
        // console.log('caccacacac')
        // console.log(item)
        // console.log('caccacacac')
    }

    async function makePayment() {
        try{

            let user_token = await token.getItem("token");
            let cart_items = await AsyncStorage.getItem("cart_item");
            
            var myHeaders = new Headers({
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' +user_token
            });
            
            let formData = new FormData();
    
            let localUri;
            let filename;
            let match;
            let type;
    
            if(route.params?.prescription_image != null){
                localUri = route.params?.prescription_image;
    
                filename = localUri.split('/').pop();
                
                match = /\.(\w+)$/.exec(filename);
                type = match ? `image/${match[1]}` : `image`;
                formData.append('prescription_image', { uri: route.params?.prescription_image, name: filename, type });
            }
    
            formData.append('delivery_location_id',  user_address?.id);
            formData.append('payment_type',  payMethod);
            formData.append('payment_status',  "cash_on_delivery");
            formData.append('total_price',  payable.taka);
            formData.append('shipping_charge',  69);
            formData.append('cart_items',  cart_items);
            formData.append('save_pharmacy',  route.params.save_pharmacy);
    
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formData,
                redirect: 'follow'
            };
            
            await fetch( config.baseUrl + "medicine/confirm_order", requestOptions)
            .then(response => response.text())
            .then(async(result) => {
                let order_confirm = JSON.parse(result);

                // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$hello world$$$$$$$$$$$$$$$$$$$$$$$')
                // console.log(order_confirm)
                // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$hello world$$$$$$$$$$$$$$$$$$$$$$$')
                if(order_confirm.status == 200) {
    
                    await setOrderId(order_confirm.data.unique_order_id);
                    await setUniqueOrder(order_confirm.data.unique_order_id)
                    await AsyncStorage.setItem('unique_order_id',order_confirm.data.unique_order_id)
    
                    if(payMethod == "cash"){
                        await AsyncStorage.removeItem('cart_item');
                        await AsyncStorage.removeItem('count');
                        
                        Popup.show({
                            type: 'Success',
                            title: 'Order confirmed',
                            button: true,
                            textBody: 'Congrats! Your order successfully placed',
                            buttonText: 'Ok',
                            callback: () => {
                                Popup.hide();
                                navigation.navigate('DrawerHome', {screen : 'DrawerHomeScreen'})
                            }
                        })
                    }
    
                }
            })
            .catch(error => console.log('error', error));
        } catch (error) {
            console.error(error);
        }
    }
    async function redirect_to_getway() {
        await makePayment().then(async(result)=>{
            setModalVisible(true);
            // await makePayment().then();
            await AsyncStorage.getItem('unique_order_id').then(async(res) => {
                // console.log('uuuuuuuuuuuuuuuunique_orderuuuuuuuuuuuuuuuuu')
                // console.log(res)
                // console.log('uuuuuuuuuuuuuuuunique_orderuuuuuuuuuuuuuuuuu')

                let unique_order_id = JSON.stringify(res)

                let user_token = await token.getItem("token");
                var myHeaders = new Headers();
                
                myHeaders.append("Authorization", "Bearer " + user_token);
                myHeaders.append("Content-Type", "application/json");
        
                var raw = JSON.stringify({
                    "total_amount": payable?.taka,
                    "trans_id": unique_order_id,
                });
                // setLoading(false);
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
                
                await fetch(config.baseUrl + "doctor/payment", requestOptions)
                .then(response => response.text())
                .then(async(result) => {
                    let api_response = JSON.parse(result)

                    // console.log('hello world==============')
                    // console.log(api_response)
                    // console.log('hello world==============')
                    
                    if(api_response.code == 200 && (api_response.session_url)){
                        setWebRedirect(true)
                        setGetwayURL(api_response.session_url);
                        // await makePayment()
                    }
                })
                .catch(error => console.log('error', error));
            })
            // setLoading(true);
            
            

            
        })
    }

    

    async function order_update(){
        try {
            let user_token = await token.getItem("token");
            
            let myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + user_token);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "order_id": unique_order,
                "delivery_location_id": user_address?.id,
                "payment_type": payMethod,
                "payment_status": "paid",
                "total_price": payable.taka,
                "shipping_charge": 69,
                "pharmacy_id": route.params?.pharmacy_id,
                "cart_items": cart_items_json,
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            await fetch( config.baseUrl + "medicine/order_update", requestOptions)
            .then(response => response.text())
            .then(async(result) => {
                // navigation.navigate('DrawerHomeScreen',api_data);
                navigation.navigate('DrawerHome', {screen : 'DrawerHomeScreen'})
            })
            .catch(error => console.log('error', error));
        } catch (error) {
            console.log('error', error)
        }
    }

    const onNavigationStateChange = (webViewState) => {
        // console.log("------onNavigationStateChange-----")
        // console.log(webViewState.url)
        // console.log("-----onNavigationStateChange------")
        // if(webViewState.url.includes(config.baseUrl+'doctor/ssl-commerz-success')) {
        if(webViewState.url.includes( config.baseUrl + 'doctor/ssl-commerz-success')) {
            refRBSheet.current.close();
            setModalVisible(false);
            Popup.show({
                type: 'Success',
                title: 'Order Confirmend',
                button: true,
                textBody: 'Congrats! successfully confirmed order',
                buttonText: 'Ok',
                callback: async() => {
                    setLoading(true)
                    setWebRedirect(false)
                    await order_update()
                    await AsyncStorage.removeItem('cart_item');
                    await AsyncStorage.removeItem('count');
                    await AsyncStorage.removeItem('unique_order_id');
                    Popup.hide()
                    // refRBSheet.current.close();
                    setLoading(false)
                    navigation.navigate('DrawerHome', {screen : 'DrawerHomeScreen'})
                },
                
            })
        }
        
        if(webViewState.url.includes(config.baseUrl+'doctor/ssl-commerz-fail')) {
            // remove_appointment()
            // refRBSheet.current.close();
            setModalVisible(false);
            Popup.show({
                type: 'Danger',
                title: 'Failed!',
                button: true,
                textBody: 'Please try again!',
                buttonText: 'Ok',
                callback: () => {
                    Popup.hide()
                },
                
            })
        }
        
        if(webViewState.url.includes(config.baseUrl+'doctor/ssl-commerz-cancel')) {
            // remove_appointment()
            // refRBSheet.current.close();
            setModalVisible(false);
            Popup.show({
                type: 'Danger',
                title: 'Canceled!',
                button: true,
                textBody: 'Please try again!',
                buttonText: 'Ok',
                callback: () => {
                    Popup.hide()
                },
                
            })
        }
    };

    // async function callModal(value) {
    //     setModalVisible(true);
    //     // await makePayment();
    //     await redirect_to_getway();
    // }
    
    return (
        <Root>
            
            <SafeAreaView style={{flex:1, backgroundColor:'#fff',}}>

                <StatusBar backgroundColor={'#075141'}/>

                {
                    is_loading ? (
                        <Loader/>
                    ) : (
                        <View style={{flex:1}}>

                            <View style={{
                                flex: 1, 
                                paddingHorizontal: 8
                            }}>
                                
                                
                                <FlatList 

                                    showsVerticalScrollIndicator={false}
                                    // data={[
                                    //     { locationType: 'Current Location', contactNumber: '(+88) 018790-31684', addressDetails: 'Banani road 8 house 9', key: '1' },
                                    //     { locationType: 'X Home', contactNumber: '(+88) 018790-31684', addressDetails: 'Uttara sector 1, road 8 house 7', key: '2' },
                                    // ]}
                                    data={myLocation?.data}
                                    renderItem={({ item, index }) => (

                                        <View>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    console.log(item)
                                                    set_selected_address(index, item)
                                                }}

                                                style={{
                                                    backgroundColor:selectedId === item.id ? '#3AAD94' : '#EEEEEE',
                                                    marginHorizontal:8,
                                                    borderRadius:6,
                                                    marginVertical:6,
                                                    paddingHorizontal:8
                                                    // borderWidth:1,
                                                    // borderColor:'#3AAD94'
                                                }}
                                            >
                                                
                                                <View 
                                                    style={{ 
                                                        flex:1,
                                                        // borderWidth: .3,
                                                        // borderColor: '#737373', 
                                                        // borderRadius: 8,
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        padding: 8,
                                                        marginVertical: 4,
                                                        minHeight:80,
                                                        alignItems:'center'
                                                    }}
                                                >
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        flex:.8,
                                                    }}>
                                                        {/* <RadioButton
                                                        value="second"
                                                        status={ checked === 'second' ? 'checked' : 'unchecked' }
                                                        onPress={() => setChecked('second')}
                                                        /> */}
                                                        <View style={{
                                                            // marginLeft: 10,
                                                        }}>
                                                            <Text style={{
                                                                fontSize: 14,
                                                                fontWeight:'bold',
                                                                color: selectedId === item.id ? '#fff' : '#000',
                                                            }}>{item?.location_name ? item?.location_name : 'name not found'}</Text>
                                                            
                                                            <Text style={{
                                                                fontSize:12,
                                                                fontWeight:'bold',
                                                                color: selectedId === item.id ? '#fff' : '#000',
                                                            }}>{item?.address ? item?.address : "address not found"} {item?.postal_code ? item?.postal_code : "| postal_code not found"}</Text>

                                                            <Text style={{
                                                                fontSize:12,
                                                                fontWeight:'bold',
                                                                color: selectedId === item.id ? '#fff' : '#000',
                                                            }}>Contact : {item?.location_mobile ? item?.location_mobile : "N/A"}</Text>
                                                            {/* <Text style={{
                                                                color: '#737373'
                                                            }}>{item.addressDetails}</Text> */}
                                                        </View>
                                                    </View>

                                                    <View style={{flex:.1}}>
                                                        <AntDesign name="edit" size={24} color={selectedId === item.id ? '#fff' : '#000'} />
                                                    </View>
                                                </View>

                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    // numColumns={1}
                                    keyExtractor={(item, index) => index.toString()}
                                    extraData={selectedId}

                                    ListHeaderComponent={

                                        <View style={{paddingHorizontal:8}}>

                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                marginTop: 20
                                            }}>
                                                <Text style={{fontSize:14,fontWeight:'bold'}}>{payable?.item} Items in your cart</Text>
                                                <View style={{
                                                    alignItems: 'flex-end'
                                                }}>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        fontWeight:'bold'
                                                    }}>Total</Text>
                                                    <Text style={{
                                                        fontSize: 16,
                                                        fontWeight:'bold'
                                                    }}>BDT {payable?.taka}</Text>
                                                </View>
                                            </View>
                                
                                            <Text style={{
                                                fontSize: 16,
                                                marginBottom: 15,
                                                fontWeight:'bold'
                                            }}>Delivery Address</Text>

                                        </View>

                                    }

                                    ListFooterComponent={

                                        <View>

                                            {
                                                is_visible == true && (
                                                    <View>

                                                        {/* <TouchableOpacity
                                                            // onPress={() => {
                                                            //     navigation.navigate('DrawerHome', {screen:'MapScreen'})
                                                            // }}
                                                        >
                                                            <View style={{
                                                                flex: 1,
                                                                justifyContent: 'flex-end',
                                                                flexDirection: 'row',
                                                                alignItems: 'center'
                                                            }}>
                                                                <AntDesign name="pluscircle" size={18} color="#3AAD94" />
                                                                <Text style={{
                                                                    fontSize: 16,
                                                                    color: '#3AAD94',
                                                                    paddingHorizontal:4
                                                                }}>Add more</Text>
                                                            </View>
                                                        </TouchableOpacity> */}
                                                                        
                                                        <View style={{flex:1,padding:8}}>
                                                            
                                                            <Text style={{
                                                                fontSize: 16,
                                                                // marginBottom: 15,
                                                                fontWeight:'bold',
                                                                paddingVertical:4
                                                            }}>Payment method</Text>
                                                                            
                                                            <View style={{
                                                                
                                                                // borderWidth: 1,
                                                                // borderColor: '#3AAD94',
                                                                borderRadius: 4, 
                                                                backgroundColor:'#EEEEEE',
                                                                marginVertical:8
                                                            }}>
                                                                
                                                                

                                                                <RadioButton.Group 
                                                                    onValueChange={value => {
                                                                        setPayMethod(value);
                                                                        openBottomSheet(value);
                                                                    }} 
                                                                    value={payMethod}
                                                                >
                                                                    <View style={{
                                                                        // flexDirection:'row',
                                                                        // justifyContent:'space-between'
                                                                    }}>

                                                                        <RadioButton.Item 
                                                                            labelStyle={{
                                                                                fontWeight:'bold',
                                                                                fontSize:14
                                                                            }} 
                                                                            label="Cash on delivery" 
                                                                            value="cash" 
                                                                            style={{borderBottomWidth:1,borderBottomColor:'#ccc'}}
                                                                        />

                                                                        <RadioButton.Item 
                                                                            labelStyle={{
                                                                                fontWeight:'bold',
                                                                                fontSize:14
                                                                            }} 
                                                                            label="Card" 
                                                                            value="card"
                                                                            style={{borderBottomWidth:1,borderBottomColor:'#ccc'}} 
                                                                        />

                                                                    </View>
                                                                    <RadioButton.Item 
                                                                        labelStyle={{
                                                                            fontWeight:'bold',
                                                                            fontSize:14
                                                                        }} 
                                                                        label="Mobile Payment" 
                                                                        value="mobile" 
                                                                    />
                                                                </RadioButton.Group>
                                                            </View>
                                                        </View>


                                                        {
                                                            payMethod == "cash" && (

                                                                <TouchableOpacity
                                                                    style={{
                                                                        backgroundColor: '#3AAD94',
                                                                        borderRadius:100/2,
                                                                        marginHorizontal:24,
                                                                        marginVertical:18,
                                                                        padding:12
                                                                    }}

                                                                    onPress={ () => {
                                                                        makePayment()
                                                                    }}
                                                                >
                                                                    
                                                                    <Text style={{
                                                                        color: '#FFF',
                                                                        textAlign: 'center',
                                                                        fontSize: 16,
                                                                        fontWeight:'bold'
                                                                    }}>
                                                                        Confirm order BDT {payable?.taka}
                                                                    </Text>

                                                                </TouchableOpacity>
                                                            )
                                                        }

                                                    </View>
                                                )
                                            }

                                            




                                        </View>                        

                                    }
                                />
                                
                                
                            </View>

                            <RBSheet
                                ref={refRBSheet}
                                closeOnDragDown={true}
                                closeOnPressMask={false}
                                customStyles={{
                                    wrapper: {
                                        backgroundColor: "transparent",
                                    },
                                    draggableIcon: {
                                        backgroundColor: "#000"
                                    },
                                    container:{
                                        backgroundColor:'#ddd',
                                        overflow:'scroll'
                                    }
                                }}
                                height={200}
                            >
                                <TouchableWithoutFeedback>
                                    <View  style={{
                                        padding:8,
                                        flex: 1
                                    }}>
                                        {
                                            payMethod === "card" && (
                                                
                                                <View style={{}}>
                                                    <View>

                                                        <FlatList 
                                                            data={bank}
                                                            renderItem={({ item }) => (
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        // console.log('item=======', item)
                                                                        // setPayMethod("web")
                                                                        redirect_to_getway()
                                                                        // makePayment()
                                                                        // setWebRedirect(true)
                                                                        // goToPayment(item)
                                                                        // callModal(item)
                                                                    }}
                                                                >
                                                                    <View style={{ flex:1,
                                                                        flexDirection: 'row',
                                                                        justifyContent: 'space-between',
                                                                        padding: 15,
                                                                        alignItems: 'center',
                                                                        }}
                                                                    >
                                                                        <View style={{
                                                                            flex: 1,
                                                                            flexDirection: 'row',
                                                                            alignItems: 'center'
                                                                        }}>
                                                                            <Image source={masterCardLogo} />
                                                                            <Text style={{
                                                                                fontSize: 14,
                                                                                marginLeft: 15,
                                                                                fontWeight:'bold'
                                                                            }}>{item.method_name.toUpperCase()}</Text>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            )}
                                                            // numColumns={1}
                                                            keyExtractor={(item, index) => index.toString()}
                                                        />
                                                        
                                                        
                                                    </View>
                                                </View>

                                            )
                                        }
                                        
                                        {
                                            payMethod === "mobile" && (
                                                
                                                <View>
                                                    <View>

                                                        <FlatList 
                                                            data={mobile}
                                                            renderItem={({ item }) => (
                                                                <TouchableOpacity
                                                                    onPress={() => {
                                                                        redirect_to_getway()
                                                                        // makePayment()
                                                                        // callModal(item)
                                                                    }}
                                                                >
                                                                    <View style={{ flex:1,
                                                                        flexDirection: 'row',
                                                                        justifyContent: 'space-between',
                                                                        padding: 15,
                                                                        alignItems: 'center',
                                                                        }}
                                                                    >
                                                                        <View style={{
                                                                            flex: 1,
                                                                            flexDirection: 'row',
                                                                            alignItems: 'center'
                                                                        }}>
                                                                            {/* <Image source={masterCardLogo} /> */}
                                                                            <Text style={{
                                                                                fontSize: 14,
                                                                                marginLeft: 15,
                                                                                fontWeight:'bold'
                                                                            }}>{item.method_name.toUpperCase()}</Text>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            )}
                                                            // numColumns={1}
                                                            keyExtractor={(item, index) => index.toString()}
                                                        />


                                                    </View>
                                                </View>

                                            )
                                        }

                                        {/* {
                                            webRedirect == true && (
                                                
                                                <View style={{ flex:1, flexDirection:"column"}}>
                                                    <ScrollView contentContainerStyle={{alignItems:'stretch', flex:1}}>
                                                        <Pressable style={{flex:1}}>
                                                            <WebView 
                                                                source={{ uri: getwayUrl }} 
                                                                // source={{ uri: "https://www.google.com/" }} 
                                                                onNavigationStateChange={onNavigationStateChange}
                                                                javaScriptEnabled
                                                                domStorageEnabled
                                                                startInLoadingState={false}
                                                                style={{ flex: 1 }}
                                                            />
                                                        </Pressable>
                                                    </ScrollView>
                                                </View>

                                            )
                                        } */}




                                    </View>
                                </TouchableWithoutFeedback>

                            </RBSheet>

                        </View>
                    )
                }
                
                
                
                
            </SafeAreaView>

            <Modal 
                isVisible={isModalVisible}
                animationIn="slideInUp"
                animationInTiming={500}
                animationOutTiming={500}
                avoidKeyboard
                onBackButtonPress={() => {
                    Alert.alert(
                        "CANCEL",
                        "are you sure you want to cancel?",
                        [
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            {   text: "yes", 
                                onPress: () => 
                                {
                                    setModalVisible(false)
                                } 
                            }
                        ]
                    );
                }}  
                // onBackdropPress={() => {}}
                // hideModalContentWhileAnimating
            >
                <View 
                    style={{ 
                        flex: 1,
                        backgroundColor:'#fff',
                        // marginHorizontal:4,
                        borderRadius:4,
                        padding:12 
                    }}>
                        
                        <Pressable style={{flex:1}} >
                            <View>
                                <Text style={{
                                    padding:4,
                                    color:'#3AAD94',
                                    fontWeight:'bold'
                                }}>CONFIRM PAYMENT</Text>
                            </View>

                            <View style={{flex:1}}>
                            {
                                webRedirect == true && (
                                    
                                    <Pressable style={{ flex:1, flexDirection:"column"}}>
                                        <ScrollView contentContainerStyle={{alignItems:'stretch', flex:1}}>
                                            <Pressable style={{flex:1}}>
                                                <WebView 
                                                    source={{ uri: getwayUrl }} 
                                                    // source={{ uri: "https://www.google.com/" }} 
                                                    onNavigationStateChange={onNavigationStateChange}
                                                    javaScriptEnabled
                                                    domStorageEnabled
                                                    startInLoadingState={false}
                                                    style={{ flex: 1 }}
                                                    containerStyle={{flex:1}}
                                                    scrollEnabled={true}
                                                    nestedScrollEnabled
                                                />
                                            </Pressable>
                                        </ScrollView>
                                    </Pressable>

                                )
                            }
                            </View>
                        </Pressable>

                    {/* <Button title="Hide modal" onPress={toggleModal} /> */}
                </View>
            </Modal>
        
        </Root>
    )
}
