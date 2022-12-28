
import React, {
    useRef, 
    useState, 
    useCallback, 
    useEffect
} from 'react'

import { 
    View, 
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image,
    useWindowDimensions,
    DeviceEventEmitter,
    Alert,
    RefreshControl
} from 'react-native';
import pharmacyProfile from '../../../../assets/pharmacyProfile.png';
import medecinePharmacy from '../../../../assets/medicine-bottle-fharmacy.png';
import medecinebottle from '../../../../assets/medicine-bottle-mockup.png';
import fifillBg from '../../../../assets/rifillBg.png';
import pharmacyImg from '../../../../assets/farmImg.png';
import UserAvatar from '../../../../assets/user_avatar.png';
import { Avatar, TextInput, ProgressBar, MD3Colors, Badge, Searchbar  } from 'react-native-paper';
import { 
    Entypo,
    Feather,
    Ionicons,
    AntDesign,
    MaterialIcons,
    FontAwesome 
} from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import token from '../../../../services/local_storage/storage';
import config from '../../../../services/config';
import Loader from '../../../modules/loader';
import { List } from 'react-native-paper';
import RenderHTML from "react-native-render-html";
import { Rating, AirbnbRating,  } from 'react-native-ratings';
import { Root, Popup } from 'popup-ui'
import Toast from 'react-native-toast-message'
import { useFocusEffect } from '@react-navigation/native';
import RBSheet from "react-native-raw-bottom-sheet";

export default function SinglePharmacyScreen({navigation, route}) {

    const isMounted = useRef(true);
    const refRBSheet = useRef();

    const { width } = useWindowDimensions();
    const [api_data, setApidata] = useState([]);
    const [is_loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);

    const [route_data, setRouteData] = useState(route.params);
    const [feedback_data, setFeedback] = useState([]);
    const [rate_app, setRetApp] = useState([]);

    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [text, setText] = useState("");
    const [disable_input, setDisableInput] = useState(true);

    const [cache, setCache] = useState([]);

    const [refreshing, setRefreshing] = useState(false);
    const [cart_count_item, setCartCountItem] = useState(parseInt(1));
    const [cart_add, setCartAdd] = useState(undefined);

    const [searchQuery, setSearchQuery] = useState('');
    
    const onChangeSearch = query => {

        if(query == "") {
            setLoading(true);
            getPharmacyDetails();
            setLoading(false);
        } else {
            setSearchQuery(query);
            setLoading(true);
            callSearchModule();
            setLoading(false);
        }

        return() => {
            isMounted.current = false;
        }
    }

    const onRefresh = useCallback(() => {
        if(isMounted){
            setRefreshing(true);
            getPharmacyDetails();
            getPharmacyReview();
            setRefreshing(false);
        }

        return() => {
            isMounted.current = false;
        } 
    }, []);

    // console.log('======cache=======')
    // console.log(cache)
    // console.log('======cache=======')

    async function callSearchModule() {
        
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "pharmacy_id": route_data?.id,
        "medicine_name": searchQuery
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "pharmacy/medicines/search/", requestOptions)
        .then(response => response.text())
        .then(async(result) => {
            let pharmacy_details_data = JSON.parse(result);
            // console.log('$$$$$$$$$$$$$$search result$$$$$$$$$$$$$$')
            // console.log(search_data)
            // console.log('$$$$$$$$$$$$$$search result$$$$$$$$$$$$$$')

            let med_data_arr = [];
            let empty_arr = [];

            await AsyncStorage.getItem('cart_item').then(res => {
                if(res?.length > 0){
                    let med_data_final = JSON.parse(res)
                    // setCache(JSON.parse(res))
                    // console.log('&&&&&&&&&&&&&&')
                    // console.log(med_data_final)
                    // console.log('&&&&&&&&&&&&&&')

                    med_data_final.forEach((value,id) => {
                        med_data_arr.push({
                            medicine_id : value.medicine_id,
                            count : value.item_count
                        })
                    })

                }
            })

            

            // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%local data%%%%%%%%%%%%%%%%%%%%%%%%%%')
            // console.log(med_data_arr)
            // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%local data%%%%%%%%%%%%%%%%%%%%%%%%%%')
            
            pharmacy_details_data.data.map((item, index) => {
                let med_id_count = med_data_arr.filter(x => {
                    
                    let val = 0;
                    if(x.medicine_id === item.medicine_id){
                        val = x.count;
                    }
                    return val
                })

                if(med_id_count?.length > 0){
                    item['cart_count']=med_id_count[0]?.count;
                }else{
                    item['cart_count']=0;
                }
                
                empty_arr.push(item);
            })

            setApidata(empty_arr);
        })
        .catch(error => console.log('error', error));
    }

    

    useEffect(async() => {
        await AsyncStorage.getItem('cart_item').then(res => {
            if(res?.length > 0){
                setCache(JSON.parse(res))
            }
        })
        return () => {
            isMounted.current = false;
        }
    }, [])

    async function getPharmacyDetails() {

        // setLoading(true);
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        // console.log('========')
        // console.log(route_data?.id)
        // console.log('========')

        await fetch( config.baseUrl + "pharmacy/stock/" + route_data?.id, requestOptions)
        .then(response => response.text())
        .then(async(result) => {
            let pharmacy_details_data = JSON.parse(result);
            let med_data_arr = [];
            let empty_arr = [];

            await AsyncStorage.getItem('cart_item').then(res => {
                if(res?.length > 0){
                    let med_data_final = JSON.parse(res)
                    // setCache(JSON.parse(res))
                    // console.log('&&&&&&&&&&&&&&')
                    // console.log(med_data_final)
                    // console.log('&&&&&&&&&&&&&&')

                    med_data_final.forEach((value,id) => {
                        med_data_arr.push({
                            medicine_id : value.medicine_id,
                            count : value.item_count
                        })
                    })

                }
            })

            

            // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%local data%%%%%%%%%%%%%%%%%%%%%%%%%%')
            // console.log(med_data_arr)
            // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%local data%%%%%%%%%%%%%%%%%%%%%%%%%%')
            
            pharmacy_details_data.data.map((item, index) => {
                let med_id_count = med_data_arr.filter(x => {
                    
                    let val = 0;
                    if(x.medicine_id === item.medicine_id){
                        val = x.count;
                    }
                    return val
                })

                if(med_id_count?.length > 0){
                    item['cart_count']=med_id_count[0]?.count;
                }else{
                    item['cart_count']=0;
                }
                
                empty_arr.push(item);
            })

            setApidata(empty_arr);

            
            // setApidata(pharmacy_details_data);
            // setLoading(false);
            // console.log('=====pharmacy_details_data=======', )
            // console.log(api_data )
            // console.log('=====pharmacy_details_data=======', )
            
        })
        .catch(error => console.log('error', error));

    }


    async function getPharmacyReview() {

        setLoading(true);
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        // console.log('=====idddddddddddddddd===')
        // console.log(route_data?.id)
        // console.log('====iiiiiiiiiiiiiiii====')
        let temp_arr = [];

        await fetch( config.baseUrl + "pharmacy/reating_and_reviews/pharmacy_id=" + route_data?.id , requestOptions)
        .then(response => response.text())
        .then(result => {
            let user_feedback_data = JSON.parse(result);
            setFeedback(user_feedback_data);
            setLoading(false);
            // temp_arr = JSON.parse(result);

            const modifiedReview = user_feedback_data?.data.reduce((acc, obj) => {
                let found = false;
                for (let i = 0; i < acc.length; i++) {
                   if (acc[i].count === obj.count) {
                      found = true;
                      acc[i].count++;
                   };
                }
                if (!found) {
                   obj.count = 1;
                   acc.push(obj);
                }
                return acc;
             }, []);
            // console.log('=====user_feedback_data=======', )
            // console.log(user_feedback_data?.data)
            // console.log('=====user_feedback_data=======', )
            setRetApp(modifiedReview);
            
        })
        .catch(error => console.log('error', error));

    }

    useFocusEffect(
        useCallback(() => {

            if(isMounted) {
                setLoading(true);
                getPharmacyDetails();
                setLoading(false);
            }
        
            return () => {
                isMounted.current = false;
            };
        }, []),
    );

    // useEffect(() => {
        
    //     if(isMounted) {
    //         setLoading(true);
    //         getPharmacyDetails();
    //         setLoading(false);
    //     }

    //     return () => {
    //         isMounted.current = false;
    //     }
    // }, [])


    useEffect(() => {
        
        if(isMounted) {
            setLoading(true);
            getPharmacyReview();
            setLoading(false);
        }

        return () => {
            isMounted.current = false;
        }
    }, [])


    async function storeData(value) {
        
        let dataArr = [];
        let count = 0;
          
        let local_data = {
            medicine_name : value?.medicine_name,
            medicine_id : value?.medicine_id,
            price : value?.price,
            total_val : value?.price * cart_count_item,
            // price : value.price,
            // total_val : value.price,
            item_count : cart_count_item,
            pharmacy_id : route_data?.id,
            pharmacy_name : route_data?.name,
            prescription_required : value?.prescription_required
        }

        console.log("Calling store","44444444444444444444444444444444444444")
        console.log(local_data)
        console.log("Calling store","44444444444444444444444444444444444444")
        try {
            await AsyncStorage.getItem('cart_item').then(async(res) => {

                let data = JSON.parse(res)

                


                if(data?.length>0){

                    // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
                    // console.log(typeof(data[0].pharmacy_id) )
                    // console.log(typeof(local_data.pharmacy_id) )
                    // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
                    if(data[0]?.pharmacy_id === local_data.pharmacy_id) {

                        for(let i in data) {
                            if(data[i].medicine_id == local_data.medicine_id) {
                                local_data.item_count = data[i].item_count+1
                                local_data.total_val = data[i].total_val*local_data.item_count
                            }else{
                                dataArr.push(data[i]);
                                count+=1;
                            }
                        } 

                        dataArr.push(local_data)
                        count +=1

                        await AsyncStorage.setItem('cart_item', JSON.stringify(dataArr));
                        await AsyncStorage.setItem('count', JSON.stringify( count));
                        setCache(dataArr);
                        
                        refRBSheet.current.close();
                        setCartCountItem(1)

                        DeviceEventEmitter.emit("ADD_COUNT");
                        Toast.show({
                            type: 'success',
                            text1: 'Added to cart',
                            text2: local_data.medicine_name +'successfully added to cart'
                        });
                        getPharmacyDetails();

                    }else{

                        Alert.alert(
                            "Clear cart!",
                            "You have items from another pharmacy.Would you like to remove items?",
                            [
                              {
                                text: "No",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                              },
                              { text: "Yes", style: "default", onPress: async() => 
                                
                                {
                                    await AsyncStorage.removeItem("cart_item");
                                    await AsyncStorage.setItem('count',JSON.stringify(0));

                                    DeviceEventEmitter.emit("REDUCE_COUNT");
                                    refRBSheet.current.close();
                                    
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Removed items',
                                        text2: 'Your items was successfully removed from cart.'
                                    });
                                    getPharmacyDetails();
                                }
                              }
                            ]
                        );
                    }
                    
                }else{
                    dataArr.push(local_data)
                    count +=1

                    await AsyncStorage.setItem('cart_item', JSON.stringify(dataArr));
                    await AsyncStorage.setItem('count', JSON.stringify( count));
                    
                    setCache(dataArr);
                    refRBSheet.current.close();
                    setCartCountItem(1);
                    DeviceEventEmitter.emit("ADD_COUNT");

                    Toast.show({
                        type: 'success',
                        text1: 'Added to cart',
                        text2: 'Your item was successfully added to cart'
                    });
                    getPharmacyDetails();
                }

                

                // await AsyncStorage.removeItem('cart_item');
                // await AsyncStorage.removeItem('count');

            })
            
        } catch(e) {
            // isItemAlreadyFound = false;
            console.log('err',e)
        }
        
    }

    async function submitPharmacyReview() {

        let user_token = await token.getItem("token");
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "pharmacy_id": route_data?.id,
            "review": review,
            "star": rating,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        // console.log('=====list_cat=======', )
        // console.log(list_cat)
        // console.log('=====list_cat=======', )

        await fetch( config.baseUrl + "pharmacy/add_review", requestOptions)
        .then(response => response.text())
        .then(result => {
            setLoading(true);
            
            let review_data_submit = JSON.parse(result);
            
            if( review_data_submit.code == 200 ) {


                Popup.show({
                    type: 'Success',
                    title: 'Review submitted',
                    button: true,
                    textBody: 'Thanks for your feedback!',
                    buttonText: 'Ok',
                    // autoClose: true,
                    callback: () => {
                        setLoading(true)
                        getPharmacyReview();
                        setRating(null)
                        setReview("")
                        Popup.hide();
                        setLoading(false)
                    },
                    
                })

            }
            setLoading(false);
        })
        .catch(error => console.log('error', error));

    }

    function ratingCompleted(rate) {
        console.log("Rating is: " + rate)
        if(isMounted) {
            setLoading(true)
            setRating(rate);
            setDisableInput(false);
            setLoading(false)
        }
    }


    return (
        <Root>
            
            <SafeAreaView style={{flex:1, backgroundColor:'#fff',paddingVertical:12}}>
                <StatusBar backgroundColor={'#075141'} />

                {
                    is_loading ? (
                        <Loader/>
                    ) : (


                        <View style={{
                            flex:1,
                            // marginBottom:24
                        }}>
                            <View style={{
                                // flexDirection:'row',
                                // alignItems:'center',
                                // backgroundColor:'#ooo',
                                margin: 8,
                                // flex:1
                                }}
                            >
                                <Searchbar
                                    placeholder="Search medicine"
                                    onChangeText={onChangeSearch}
                                    value={searchQuery}
                                    // underlineColorAndroid="#3AAD94"
                                    cursorColor="#3AAD94"
                                    // onTouchCancel={() => {
                                    //     setLoading(true);
                                    //     console.log('hi')
                                    //     getPharmacyDetails()
                                    //     setLoading(false);
                                    // }}

                                />
                            </View>

                            <FlatList 
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={onRefresh}
                                    />
                                }
                                extraData={cache}
                                showsVerticalScrollIndicator={false}
                                data={api_data}
                                renderItem={ ({item, index}) => (
                                        
                                    <View style={{
                                        flex:1,
                                        borderWidth:1,
                                        marginHorizontal:12,
                                        marginVertical:4,
                                        borderRadius:6,
                                        backgroundColor:'#fefefe',
                                        borderColor:'#3AAD94'
                                    }}>
                                        <View style={{
                                            justifyContent:'flex-end',
                                            position:'absolute',
                                            right:-6,
                                            top:-6,
                                            zIndex:9
                                        }}>
                                            {
                                                item?.cart_count > 0 && (
                                                    <Badge 
                                                        style={{
                                                            borderRadius:8,
                                                            backgroundColor:"#3AAD94",
                                                            color:'#fff',
                                                            fontWeight:"bold"
                                                        }} 
                                                        size={24}
                                                    >{item?.cart_count}
                                                    </Badge>
                                                )
                                            }
                                            
                                        </View>

                                        <TouchableOpacity 
                                            style={{
                                                // borderWidth:.3,
                                                borderRadius:6,
                                                paddingHorizontal:16,
                                                paddingVertical:8,
                                                marginHorizontal:16,
                                                marginVertical:4,
                                                backgroundColor:'#fff',
                                                flex:1
                                            }}

                                            onPress={ () => {
                                                navigation.navigate('MedicineDetailsPharm', { 
                                                    data : item, 
                                                    pharmacyId : route_data?.id,
                                                    pharmacy_name : route_data?.name
                                                })
                                            }}
                                        >
                                            
                                        
                                            <View style={{
                                                flexDirection:'row',
                                                alignItems:'center',
                                                justifyContent:'space-between',
                                                // margin: 10
                                                // paddingHorizontal:16,
                                                // paddingVertical:8,
                                                flex:1
                                                }}
                                            >
                                                <Image source={pharmacyProfile}/>
                                                <View style={{
                                                    marginHorizontal:8,
                                                    flex:1
                                                }}>
                                                    {/* <Text>
                                                        {
                                                            item?.cart_count > 0 && (
                                                                <Text>
                                                                    {item?.cart_count}
                                                                </Text>
                                                            )
                                                        }
                                                    </Text> */}

                                                    <View style={{flex:1,marginHorizontal:4}}>
                                                        <Text style={{
                                                            fontWeight: 'bold',
                                                            fontSize: 16,
                                                            color: '#000'
                                                        }}>
                                                            {item?.medicine_name}
                                                        </Text>

                                                        <Text style={{
                                                            fontSize: 14,
                                                            color: '#000'
                                                        }}>
                                                            {item?.medicine_type}
                                                        </Text>

                                                        <Text style={{
                                                            fontSize: 14,
                                                            color: '#000'
                                                        }}>
                                                        {item?.medicine_power}
                                                        </Text>

                                                        <Text style={{
                                                            fontSize: 14,
                                                            color: '#000',
                                                            fontWeight:'bold'
                                                        }}>
                                                            Price : {item?.price} TK
                                                        </Text>
                                                    </View>

                                                    {
                                                        item?.prescription_required == 1 && (
                                                            
                                                            <View style={{
                                                                flex:1,
                                                                flexDirection:'row',
                                                                alignItems:'center',
                                                                marginVertical:4,
                                                                // paddingHorizontal:4
                                                            }}>
                                                                
                                                                <MaterialIcons 
                                                                    // style={{position:'relative', top:24}} 
                                                                    name="assignment" 
                                                                    size={26} 
                                                                    color="#EB1D36"
                                                                />
                                                                <Text style={{fontSize:10,fontWeight:'bold', color:'#EB1D36',flex:1}}>
                                                                    Prescription required!
                                                                </Text>
                                                            </View>

                                                        )
                                                    }

                                                </View>

                                            </View>

                                        </TouchableOpacity>

                                        <View
                                            style={{
                                                marginHorizontal:16,
                                                marginBottom:12,
                                                // padding:8,
                                                flex:1,
                                                flexDirection:'row',
                                                // justifyContent:'space-between'
                                            }}
                                        >

                                            <TouchableOpacity 
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent:'center',
                                                    borderWidth:1,
                                                    padding:4,
                                                    borderRadius:4,
                                                    borderColor:'#3AAD94',
                                                    backgroundColor:"#3AAD94",
                                                    flex:1,
                                                    marginRight:4
                                                }}
                                                
                                                onPress={() => {
                                                    setCartAdd(item);
                                                    refRBSheet.current.open();
                                                    // storeData(item);
                                                    // Toast.show({
                                                    //     type: 'success',
                                                    //     text1: 'Added to cart',
                                                    //     text2: 'Your item was successfully added to cart'
                                                    // });
                                                }
                                                    
                                                }
                                                // disabled={visible}
                                            >
                                                
                                                <FontAwesome name="cart-plus"  size={24} color="#fff" />
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: '#fff',
                                                    // marginVertical: 5,
                                                    marginLeft: 10,
                                                    fontWeight:'bold'
                                                }}>
                                                    Add to cart
                                                </Text>
                                            </TouchableOpacity>
                                            
                                            <TouchableOpacity 
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderWidth:1,
                                                    // marginVertical:4,
                                                    padding:4,
                                                    borderColor:'#3AAD94',
                                                    borderRadius:4,
                                                    flex:1,
                                                }}onPress={() => {
                                                    Toast.show({
                                                        type: 'info',
                                                        text1: 'Coming soon!'
                                                    });
                                                }}
                                            >
                                                <Entypo name="add-to-list" size={22} color="#3AAD94" />
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: '#3AAD94',
                                                    marginVertical: 5,
                                                    marginLeft: 10
                                                }}>
                                                    Add to Wishlist
                                                </Text>
                                            </TouchableOpacity>

                                        </View>


                                    </View>

                                )}
                                keyExtractor={(item, index) => index.toString()}
                                removeClippedSubviews={true}
                                ListHeaderComponent={
                                    <View 
                                        style={{
                                            flexDirection:'row',
                                            alignItems:'center',
                                            justifyContent:'space-between',
                                            // margin: 10
                                            paddingHorizontal:16,
                                            paddingVertical:8,
                                            flex:1,
                                            marginBottom:12
                                        }}
                                    >
                                            <View style={{
                                                // marginLeft: 20
                                                flex:1
                                            }}>
                                                <Image source={pharmacyProfile}/>
                                            </View>
                                            <View style={{
                                                // marginLeft: 20
                                                flex:1
                                            }}>
                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    fontSize: 18,
                                                    color: '#000'
                                                }}>
                                                    {route_data?.name.toUpperCase()}
                                                </Text>
                                                {/* <Text style={{
                                                    fontSize: 12,
                                                    color: '#090F47'
                                                }}>
                                                    Etiam mollis metus non purus
                                                </Text> */}
                                            </View>
                                    </View>
                                }

                                ListFooterComponent={

                                    <View style={{flex:1}}>

                                        

                                        {
                                            feedback_data?.data?.length > 0 && (
                                                
                                                <View>

                                                    <Text style={{
                                                        fontSize:18,
                                                        fontWeight:'bold',
                                                        textAlign:'left',
                                                        paddingVertical:8,
                                                        paddingHorizontal:12
                                                    }}>
                                                        Ratings
                                                    </Text>
                                                    
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        marginHorizontal: 12,
                                                        paddingHorizontal:8,
                                                        paddingBottom:8
                                                    }}>

                                                    
                                                        
                                                        <View style={{
                                                            // justifyContent: 'space-between',
                                                            borderRightWidth: .5,
                                                            // paddingRight: 20,
                                                            borderRightColor: '#8B8B8B',
                                                            flex:1
                                                        }}>
                                                            
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center'
                                                            }}>
                                                                
                                                                <Text style={{
                                                                    fontSize: 24,
                                                                    fontWeight: 'bold'
                                                                }}>
                                                                    {feedback_data?.avg_rating?.toFixed(1)}
                                                                </Text>


                                                                <Entypo name="star" size={24} color="#FFC000" />

                                                            </View>

                                                            
                                                            <View style={{

                                                            }}>
                                                                
                                                                <Text style={{
                                                                    fontSize: 16,
                                                                    color: '#090F47',
                                                                    fontWeight: 'bold'
                                                                }}>
                                                                    {feedback_data?.total_rating_count} Ratings
                                                                </Text>
                                                                
                                                                <Text style={{
                                                                    fontSize: 16,
                                                                    color: '#090F47',
                                                                    fontWeight: 'bold'
                                                                }}>
                                                                    {feedback_data?.total_rating_count} Reviews
                                                                </Text>

                                                            </View>

                                                        </View>

                                                        <View style={{
                                                            flex:1
                                                        }}>
                                                            
                                                            <FlatList 
                                                                data={rate_app}
                                                                renderItem={({item, index}) => (
                                                                    
                                                                    <View style={{
                                                                        marginLeft: 10
                                                                    }}>

                                                                        {
                                                                            item?.star !== null && (

                                                                                <View style={{
                                                                                    flex: 1,
                                                                                    flexDirection: 'row',
                                                                                    alignItems: 'center'
                                                                                }}>
                                                                                    
                                                                                    <Text style={{
                                                                                        color: '#090F47',
                                                                                        fontWeight: 'bold'
                                                                                    }}>
                                                                                        {parseInt(item?.star).toFixed(1)}
                                                                                    </Text>
                                    
                                                                                    <AntDesign name="star" size={18} color="#FFC000" style={{ marginHorizontal: 5 }} />
                                    
                                                                                    <View style={{
                                                                                        width: '40%',
                                                                                        marginHorizontal: 5
                                                                                    }}>
                                                                                        
                                                                                        {/* <ProgressBarAndroid
                                                                                        styleAttr="Horizontal"
                                                                                        indeterminate={false}
                                                                                        progress={(item?.count / feedback_data?.total_rating_count)}
                                                                                        /> */}

                                                                                        <ProgressBar 
                                                                                            progress={(item?.count / feedback_data?.total_rating_count)} 
                                                                                            color={"#3AAD94"} 
                                                                                        />
                                    
                                                                                    </View>
                                    
                                                                                    <Text style={{
                                                                                        color: '#090F47',
                                                                                        fontWeight: 'bold',
                                                                                        alignItems: 'flex-end'
                                                                                    }}>
                                                                                        {((item?.count / feedback_data?.total_rating_count) * 100).toFixed(1) } % 
                                                                                    </Text>
                                    
                                                                                </View>

                                                                            )
                                                                        }
                                                                        
                            
                                                                    </View>
                                                                )}

                                                                keyExtractor={(item, index) => index.toString()}
                                                                listKey={(item, index) => 'D' + index.toString()}
                                                            />
                                                        </View>

                                                        
                                                        

                                                    </View>

                                                    
                                                    <View style={{
                                                        marginVertical: 10,
                                                        marginHorizontal: 20,
                                                        backgroundColor:'#fafefe'
                                                    }}>
                                                        
                                                        <FlatList 
                                                            data={feedback_data?.pharmacy_review}
                                                            
                                                            renderItem={({ item, index }) => (

                                                                <View style={{
                                                                    marginVertical:4,
                                                                    borderWidth:1,
                                                                    borderColor:'#3AAD94',
                                                                    borderRadius:6,
                                                                    padding:8
                                                                }}>

                                                                    <View style={{
                                                                        flexDirection: 'row',
                                                                        marginHorizontal: 20,
                                                                        alignItems: 'center',
                                                                        justifyContent:'space-between'
                                                                    }}>
                                                                        <Avatar.Image size={50} source={UserAvatar} />
                                                                        
                                                                        <View style={{
                                                                            marginLeft: 20,
                                                                            alignItems:"flex-end"
                                                                        }}>
                                                                            
                                                                            <Text style={{
                                                                                color: '#3AAD94',
                                                                                fontWeight: 'bold',
                                                                                fontSize: 16
                                                                            }}>
                                                                                {item?.user}
                                                                            </Text>
                                                                            
                                                                            <View style={{
                                                                                alignItems: 'flex-start'
                                                                            }}>
                                                                                
                                                                                <Text style={{ 
                                                                                    paddingVertical: 6, 
                                                                                    paddingHorizontal: 12,
                                                                                    borderColor: '#3AAD94',
                                                                                    borderRadius: 100/2,
                                                                                    // borderWidth: 1,
                                                                                    backgroundColor: '#3AAD94',
                                                                                    color: '#FFF',
                                                                                    alignItems: 'center',
                                                                                    fontWeight:"bold",
                                                                                    marginTop:4
                                                                                    }}>
                                                                                        {item?.sentiment}
                                                                                </Text>

                                                                            </View>

                                                                        </View>

                                                                    </View>

                                                                    <Text style={{
                                                                        fontSize: 14,
                                                                        color: '#3AAD94',
                                                                        marginHorizontal: 24,
                                                                        fontWeight:'bold'
                                                                        // marginVertical: 10
                                                                    }}>
                                                                        {item?.review} 
                                                                    </Text>

                                                                </View>

                                                                
                                                            )}
                                                            // numColumns={3}
                                                            keyExtractor={(item, index) => index.toString()}
                                                        />

                                                    </View>

                                                </View>
                                                
                                            )
                                        }

                                        

                                        

                                        <View style={{
                                            // marginBottom:30
                                            flex:1
                                        }}>

                                            {
                                                feedback_data?.data?.length > 0 && (
                                                    <View style={{
                                                        // marginBottom:30
                                                        flex:1,
                                                    }}>

                                                        <AirbnbRating
                                                            count={5}
                                                            reviews={["Terrible", "Bad", "Good", "Very Good", "Amazing",]}
                                                            defaultRating={5}
                                                            size={24}
                                                            onFinishRating={(rate) => ratingCompleted(rate)}
                                                        />

                                                        <View>

                                                            <TextInput
                                                                disabled={disable_input}
                                                                value={review}
                                                                placeholder='Write a review'
                                                                keyboardType='ascii-capable'
                                                                mode='flat'
                                                                activeUnderlineColor='#3AAD94'
                                                                onChangeText={(text) => setReview(text)}
                                                                style={{backgroundColor:'#fff'}}
                                                            />

                                                        </View>

                                                        <View 
                                                            style={{
                                                                paddingHorizontal:24,
                                                            }} 
                                                        >

                                                            <TouchableOpacity
                                                                style={{
                                                                    paddingVertical:6,
                                                                    paddingHorizontal:12,
                                                                    backgroundColor:'#3AAD94',
                                                                    alignItems:"center",
                                                                    justifyContent:'center',
                                                                    marginVertical:4,
                                                                    borderRadius:100/2
                                                                }}

                                                                disabled={disable_input}

                                                                onPress={() => {
                                                                    submitPharmacyReview();
                                                                }}
                                                                
                                                            >
                                                                <Text style={{
                                                                    fontSize:16,
                                                                    fontWeight:'bold',
                                                                    padding:6,
                                                                    color:'#fff',
                                                                    textAlign:'center'
                                                                }}>
                                                                    Submit 
                                                                </Text>
                                                            </TouchableOpacity>

                                                        </View>

                                                    </View>
                                                )
                                            }


                                            

                                        </View>

                                    </View>

                                }

                            />


                        </View>


                    )
                }

            <RBSheet
                height={160}
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    },
                    container: {
                        backgroundColor:'#fafefe'
                    }
                }}
            >
                <View style={{
                    flex:1,
                    justifyContent:'space-around',
                    alignItems:'center',
                    padding:8,
                    flexDirection:'row'
                }}>
                    <View style={{
                        flexDirection:'row',
                        alignItems:'center'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setCartCountItem(cart_count_item -1);
                            }}
                            style={{
                                backgroundColor:'#D2001A',
                                borderRadius:4,
                                padding:4,
                                // height:40
                            }}
                        >
                            {/* <AntDesign 
                                name="minuscircle" 
                                size={28} 
                                color="#D2001A" 
                            /> */}
                            <Entypo name="minus" size={28} color="#fff" />
                        </TouchableOpacity>
                        <TextInput
                            
                            value={cart_count_item.toString()}
                            placeholder='Set'
                            keyboardType='number-pad'
                            style={{
                                backgroundColor:'#F0EBE3',
                                width:'30%',
                                padding:2,
                                borderRadius:6,
                                // elevation:.3,
                                marginHorizontal:4,
                                height:40,
                                fontSize:14,
                                fontWeight:'bold'
                            }}
                            underlineColor="#3AAD94"
                            activeUnderlineColor='#3AAD94'
                            onChangeText={(value) => {
                                // console.log(typeof(cart_count_item))
                                if(value) {
                                    setCartCountItem(parseInt(value));
                                } else {
                                    setCartCountItem(parseInt(1));
                                }
                            }}
                        />

                        <TouchableOpacity
                            onPress={() => {
                                console.log('cnskcnskcnskcnsvcns', cart_count_item)
                                setCartCountItem(cart_count_item + 1);
                            }} 
                            style={{
                                backgroundColor:'#3AAD94',
                                borderRadius:4,
                                padding:4,
                                // height:40
                            }}
                        >
                            <Entypo name="plus" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity 
                        style={{
                            backgroundColor:'#3AAD94',
                            padding:8,
                            borderRadius:4,
                            marginHorizontal:4,
                            minHeight:48,
                            minWidth:100,
                            flex:1,
                            flexDirection:'row',
                            alignItems:'center'
                        }}
                        onPress={()=>{
                            storeData(cart_add);
                            setCartCountItem(0)
                        }}
                    >
                        <FontAwesome name="cart-plus" size={24} color="#fff" />
                        <Text style={{
                            fontSize: 14,
                            color: '#fff',
                            marginVertical: 5,
                            marginLeft: 10,
                            fontWeight:'bold'
                        }}>
                            Add to cart
                        </Text>
                    </TouchableOpacity>

                </View>
            </RBSheet>
                
                
            </SafeAreaView>

        </Root>
    )
}

