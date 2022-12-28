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
    TextInput,
    ScrollView,
    StatusBar,
    Image,ProgressBarAndroid,
    ImageBackground,
    useWindowDimensions,
    DeviceEventEmitter,
    Alert
} from 'react-native';

import { Avatar, List } from 'react-native-paper';
import { 
    Entypo,
    Feather,
    Ionicons,
    AntDesign,
    MaterialIcons,
    FontAwesome 
} from '@expo/vector-icons';
import RenderHTML from "react-native-render-html";
import medecinePharmacy from '../../../../assets/medicine-bottle-fharmacy.png';
import medecinebottle from '../../../../assets/medicine-bottle-mockup.png';
import UserAvatar from '../../../../assets/user_avatar.png';
import fifillBg from '../../../../assets/rifillBg.png';
import pharmacyImg from '../../../../assets/farmImg.png';
import pharmacyProfile from '../../../../assets/pharmacyProfile.png';
import token from '../../../../services/local_storage/storage'
import config from '../../../../services/config';
import Loader from '../../../modules/loader';
import { useScrollToTop } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import RBSheet from "react-native-raw-bottom-sheet";


export default function MedicineDetailsPharm({navigation, route}) {

    const isMounted = useRef(true);
    const ref = useRef(null);
    const refRBSheet = useRef();
    // useScrollToTop(ref);

    const { width } = useWindowDimensions();
    const [routeData, setRouteData] = useState(route.params.data);
    const [pharmacyId, setPharmacyId] = useState(route.params.pharmacyId);
    const [pharmacy_name, setPharmacyName] = useState(route.params.pharmacy_name);
    const [is_loading, setLoading] = useState(true);
    const [api_data, setApidata] = useState([]);

    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);

    const [expanded_main, setExpandedMain] = useState(false);
    const handlePressMain = () => setExpandedMain(!expanded_main);

    const [visible, setVisible] = useState(true);

    const [cache, setCache] = useState([]);
    const [cart_count_item, setCartCountItem] = useState(parseInt(1));

    // console.log('======routeData=====')
    // console.log(routeData);
    // console.log('======routeData=====')

    async function getAlternateMedicine() {

        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        // console.log('===routeDatamedicine=====')
        // console.log(routeData)
        // console.log('=====routeDatamedicine===')

        await fetch( config.baseUrl + "pharmacy/alternative_medicine" , requestOptions)
        .then(response => response.text())
        .then(result => {
            let alternate_medicine = JSON.parse(result);
            setApidata(alternate_medicine);
            
            // console.log('=====alternate_medicine=======', )
            // console.log(alternate_medicine )
            // console.log('=====alternate_medicine=======', )
            
        })
        .catch(error => console.log('error', error));

    }


    

    function updateData(item) {
        setLoading(true);
        setRouteData(item);
        setLoading(false);
        ref.current?.scrollTo({
            y: 0,
            animated: true,
        });
    }


    useEffect(() => {
        
        if(isMounted) {
            setLoading(true);
            getAlternateMedicine();
            setLoading(false);
        }

        return () => {
            isMounted.current = false;
        }
    }, [])


    async function storeData(value) {
        // console.log("Calling store","44444444444444444444444444444444444444")
        // console.log(value)
        // console.log("Calling store","44444444444444444444444444444444444444")
        let dataArr = [];
        let count = 0;
          
        let local_data = {
            medicine_name : value?.medicine_name,
            medicine_id : value?.medicine_id,
            // price : 100,
            // total_val : 100,
            price : value?.price,
            total_val : value?.price * cart_count_item,
            item_count : cart_count_item,
            pharmacy_id : pharmacyId,
            pharmacy_name : pharmacy_name,
            prescription_required : value?.prescription_required
        }

        // console.log('=========baraf==========')
        // console.log(local_data)
        // console.log('=========baraf==========')
        try {
            await AsyncStorage.getItem('cart_item').then(async(res) => {

                let data = JSON.parse(res)

                
                if(data?.length>0){

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
                        setCartCountItem(1);
                        DeviceEventEmitter.emit("ADD_COUNT");
                        Toast.show({
                            type: 'success',
                            text1: 'Added to cart',
                            text2: local_data.medicine_name + 'was successfully added to cart'
                        });
                    }else{
                        

                        Alert.alert(
                            "Clear cart!",
                            "Already have items from another pharmacy",
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
                                    Toast.show({
                                        type: 'error',
                                        text1: 'Removed items',
                                        text2: 'Your items was successfully removed from cart.'
                                    });
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
                }

                

                // await AsyncStorage.removeItem('cart_item');
                // await AsyncStorage.removeItem('count');

            })
            
        } catch(e) {
            console.log(e);
        }

        
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


    async function getAlternativeBrands() {

        let user_token = await token.getItem("token");
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "medicine_id": routeData?.medicine_id
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

        await fetch( config.baseUrl + "medicine/alternative_brands", requestOptions)
        .then(response => response.text())
        .then(result => {
            setLoading(true);
            let alternative_medicine = JSON.parse(result);            
            setLoading(false);

            // console.log('====alternative_medicine======')
            // console.log(alternative_medicine)
            // console.log('====alternative_medicine======')
        })
        .catch(error => console.log('error', error));

    }
    


    return (
        <SafeAreaView>

            {
                is_loading ? (
                    <Loader/>
                ) : (
            
                    <ScrollView showsVerticalScrollIndicator={false} ref={ref} >
                                    
                        <View style={{flex:1}}>
                            
                            <View style={{
                                flexDirection:'row',
                                alignItems:'center',
                                // justifyContent:'space-between',
                                // margin: 10
                                paddingHorizontal:16,
                                paddingVertical:8,
                                flex:1
                                }}>
                                    <Image 
                                        source={medecinebottle} 
                                        // resizeMode="center"
                                        resizeMethod='auto'  
                                        // style={{
                                        //     height:60,
                                        //     Width:120
                                        // }}  
                                    />
                                    <View style={{
                                        marginHorizontal: 24,
                                    }}>
                                        
                                        <Text style={{
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            color: '#000'
                                        }}>
                                            {routeData?.medicine_name}
                                        </Text>
                                        
                                        <Text style={{
                                            fontSize: 12,
                                            color: '#090F47',
                                            fontWeight: 'bold',
                                        }}>
                                            {routeData?.medicine_power ? routeData?.medicine_power : "N/A"}
                                        </Text>
                                        <Text style={{
                                            fontSize: 12,
                                            color: '#090F47',
                                            fontWeight: 'bold',
                                        }}>
                                            {routeData?.medicine_type ? routeData?.medicine_type : "N/A"}
                                        </Text>
                                    
                                    </View>

                            </View>

                            <View style={{
                                flex: 1,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                marginHorizontal: 20,
                                alignItems: 'center',
                                borderBottomWidth: .5,
                                borderBottomColor: '#8B8B8B',
                                // paddingBottom: 10
                            }}> 
                                
                                <View style={{
                                    flex:1,
                                    paddingHorizontal:8
                                }}>
                                    
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>     
                                        {/* <Text style={{
                                            color: '#000',
                                            fontSize: 20
                                        }}>{'\u09F3'}</Text>    */}
                                        <Text style={{ 
                                            color: '#000',
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            paddingHorizontal:4
                                        }}>{routeData?.mrp}</Text> 
                                    </View>    
                                    
                                    <Text style={{
                                        color: '#8B8B8B',
                                        textAlign: 'left',
                                        fontSize: 12
                                    }}>
                                        MRP {'\u09F3'} {routeData?.price}
                                    </Text> 
                                    
                                    <Text style={{
                                        color: '#3AAD94',
                                        textAlign: 'left',
                                        fontSize: 12,
                                        // marginTop: 5,
                                        fontWeight:'bold'
                                    }}>20% Off</Text>
                                </View>

                                <View style={{
                                }}>
                                    
                                    <TouchableOpacity 
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent:'center',
                                            borderWidth:1,
                                            padding:4,
                                            borderRadius:4,
                                            borderColor:'#3AAD94',
                                            backgroundColor:"#3AAD94"
                                        }}
                                        
                                        onPress={() => {
                                                refRBSheet.current.open()
                                                // storeData(routeData);
                                                // Toast.show({
                                                //     type: 'success',
                                                //     text1: 'Added to cart',
                                                //     text2: 'Your item was successfully added to cart'
                                                // });

                                            }   
                                            
                                        }
                                        // disabled={visible}
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
                                    
                                    <TouchableOpacity 
                                        style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'flex-end',
                                            borderWidth:1,
                                            marginVertical:4,
                                            padding:4,
                                            borderColor:'#3AAD94',
                                            borderRadius:4
                                        }}
                                        onPress={() => {
                                            Toast.show({
                                                type: 'info',
                                                text1: 'Coming soon!'
                                            });
                                        }}
                                    >
                                        <Entypo name="add-to-list" size={22} color="#3AAD94" />
                                        <Text style={{
                                            fontSize: 14,
                                            color: '#3AAD94',
                                            marginVertical: 5,
                                            marginLeft: 10
                                        }}>
                                            Add to Wishlist
                                        </Text>
                                    </TouchableOpacity>

                                </View>

                            </View>
                            
                            <View>

                                {
                                    routeData?.medicine_manual?.length > 0 && (
                                
                                        <View>

                                            <List.Section title="">

                                                <List.Accordion
                                                    title="Instructions"
                                                    titleStyle={{
                                                        fontSize:18,
                                                        fontWeight:'bold',
                                                    }}

                                                    // left={props => <List.Icon {...props} icon="folder" />}
                                                    expanded={expanded_main}
                                                    onPress={handlePressMain}>

                                                    <View style={{
                                                        paddingHorizontal:8
                                                    }}>

                                                        <FlatList 
                                                            showsVerticalScrollIndicator={false}
                                                            data={routeData?.medicine_manual}
                                                            renderItem={ ({item, index}) => (
                                                                
                                                                <List.AccordionGroup 
                                                                    title="" 
                                                                    titleStyle={{fontSize:18, color:'#000'}}

                                                                >
                                                                    
                                                                    <View style={{
                                                                        marginHorizontal:8
                                                                    }}>
                                                                        
                                                                        <List.Accordion
                                                                            id={index + 1}
                                                                            title={item?.title}
                                                                            description=""
                                                                            titleStyle={{
                                                                                fontWeight:'bold'
                                                                            }}
                                                                            style={{
                                                                                borderBottomWidth:.3,
                                                                                borderBottomColor:'#ccc'
                                                                            }}
                                                                            onPress={handlePress}
                                                                            expanded={expanded}
                                                                            // left={props => <List.Icon {...props} icon="folder" />}
                                                                        >
                                                                            <View style={{padding:4}}>
                                                                                <RenderHTML contentWidth={width} source={{html: item?.body}} />
                                                                            </View>
                                                                        </List.Accordion>


                                                                    </View>
                                                                </List.AccordionGroup>

                                                                

                                                                    
                                                                // <View style={{}}>

                                                                // </View>
                                                            )}
                                                            keyExtractor={(item, index) => index.toString()}

                                                        />

                                                    </View>

                                            
                                                </List.Accordion>

                                            </List.Section>

                                        </View>

                                    )
                                }


                            </View>
                            
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding:8,
                                marginHorizontal:4
                            }}>
                                <TouchableOpacity style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex:.5,
                                    paddingVertical: 4,
                                    borderRadius: 100/2,
                                    backgroundColor: '#3AAD94',
                                    marginHorizontal:4
                                }}>
                                    <Text style={{
                                        color: '#FFF',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        fontSize:12
                                    }}>
                                        Chat with us
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex:.5,
                                    padding: 8,
                                    borderRadius: 100/2,
                                    backgroundColor: '#3AAD94',
                                    marginHorizontal:4
                                }}>
                                    <Text style={{
                                        color: '#FFF',
                                        fontWeight: 'bold',
                                        textAlign: 'center',
                                        fontSize:12
                                    }}>
                                        Subscribe to{'\n'}regular delivery
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View style={{
                                marginVertical: 10,
                                paddingLeft: 10,
                                paddingRight: 5
                            }}>
                                <Text style={{
                                    marginHorizontal: 10,
                                    marginBottom: 10,
                                    fontSize: 16,
                                    fontWeight:'bold'
                                }}>
                                    Alternative medicine
                                </Text>
                                
                                <View style={{
                                    paddingHorizontal:8
                                }}>
                                    
                                    <FlatList 
                                        data={api_data?.data}
                                        renderItem={({ item, index }) => (
                                            <View style={{
                                                flex:1
                                            }}>

                                                <TouchableOpacity 
                                                    onPress={() => {
                                                        updateData(item);
                                                    }}
                                                >

                                                    <View style={{
                                                        flex: 1,
                                                        justifyContent: 'center',
                                                        marginRight: 5,
                                                        borderWidth: .5,
                                                        borderColor: '#87B2A9',
                                                        borderRadius: 12,
                                                        marginBottom: 10,
                                                        overflow: 'hidden'
                                                    }}>
                                                        <Image size={20} source={medecinebottle} style={{width: '100%'}} resizeMode="cover" />
                                                        <View style={{
                                                            flex: 1,
                                                            flexDirection: 'row',
                                                            // alignItems: 'center',
                                                            padding: 5
                                                        }}>
                                                            <View>
                                                                <Text style={{ 
                                                                    // flex: 1,
                                                                    fontSize: 12,
                                                                    color: '#090F47',
                                                                    fontWeight:'bold'
                                                                }}>
                                                                    {item?.medicine_name}
                                                                </Text>

                                                                <Text style={{ 
                                                                    // flex: 1,
                                                                    fontSize: 10,
                                                                    color: '#090F47'
                                                                }}>
                                                                    {item?.medicine_type}
                                                                </Text>
                                                            </View>
                                                            <View style={{
                                                                // alignItems: 'flex-end',
                                                                flex:1
                                                            }}>
                                                                <View style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'flex-end'
                                                                }}>     
                                                                    {/* <Text style={{
                                                                        color: '#000',
                                                                        fontSize: 10,
                                                                        fontWeight: 'bold'
                                                                    }}>{'\u09F3'}</Text>    */}
                                                                    <Text style={{ 
                                                                        color: '#000',
                                                                        fontWeight: 'bold',
                                                                        fontSize: 8
                                                                    }}>{item?.price.split('৳')[1]}</Text> 
                                                                </View>    
                                                                {/* <Text style={{
                                                                    color: '#8B8B8B',
                                                                    textAlign: 'right',
                                                                    fontSize: 8
                                                                }}>
                                                                    MRP {'\u09F3'} 180
                                                                </Text>  */}
                                                                <Text style={{
                                                                    color: '#3AAD94',
                                                                    textAlign: 'right',
                                                                    fontSize: 10,
                                                                    // marginTop: 5
                                                                }}>20% Off</Text>
                                                            </View>
                                                        </View>
                                                        <Text style={{
                                                            position: 'absolute',
                                                            top: 0,
                                                            backgroundColor: '#EB503F',
                                                            color: '#FFF',
                                                            fontSize: 8,
                                                            paddingHorizontal: 10,
                                                            paddingVertical: 4,
                                                            borderBottomRightRadius: 10
                                                        }}>
                                                            Sale
                                                        </Text>
                                                    </View>

                                                </TouchableOpacity>

                                            </View>
                                        )}
                                        numColumns={2}
                                        keyExtractor={(item, index) => index.toString()}
                                    />

                                </View>
                                
                            </View>
                            
                            
                            
                            <View style={{
                                marginVertical: 10,
                            }}>
                                <Text style={{
                                    marginHorizontal: 20,
                                    // marginBottom: 10,
                                    marginTop: 20,
                                    fontSize: 18,
                                    fontWeight:'bold'
                                }}>
                                    Alternative Pharmacy
                                </Text>
                                <Text style={{
                                    marginHorizontal: 20,
                                    marginBottom: 10,
                                    marginTop: 12,
                                    fontSize: 14
                                }}>
                                    Coming soon !
                                </Text>
                                {/* <FlatList 
                                    data={[
                                        { img: pharmacyImg, pharmacyName: 'D+ Pharma', margin: 10, key: '1' },
                                        { img: pharmacyImg, pharmacyName: 'D+ Pharma', key: '2' },
                                        { img: pharmacyImg, pharmacyName: 'D+ Pharma', key: '3' },
                                        { img: pharmacyImg, pharmacyName: 'D+ Pharma', key: '4' }
                                    ]}
                                    renderItem={({ item }) => (
                                        <View style={{
                                            flex: 1,
                                            width: '60%',
                                            marginLeft: item.margin,
                                            marginRight: 5,
                                            borderWidth: .5,
                                            borderColor: '#87B2A9',
                                            borderRadius: 12,
                                            marginBottom: 10,
                                            overflow: 'hidden'
                                        }}>
                                            <Image size={50} source={item.img} style={{width: '100%'}} />
                                            <View style={{
                                                width: 150,
                                                flex: 1,
                                                alignItems: 'flex-end'
                                            }}>
                                                <Text style={{ 
                                                    flex: 1,
                                                    width: '100%',
                                                    fontSize: 12,
                                                    marginRight: 4,
                                                    color: '#090F47',
                                                    textAlign: 'center',
                                                    marginTop: 10
                                                }}>
                                                        {item.pharmacyName}
                                                </Text>
                                                <View style={{
                                                    justifyContent: 'flex-end',
                                                    alignItems: 'center',
                                                    backgroundColor: '#FFC000',
                                                    flexDirection: 'row',
                                                    borderTopLeftRadius: 50,
                                                    borderBottomLeftRadius: 50,
                                                    paddingHorizontal: 10,
                                                    marginVertical: 10
                                                }}>
                                                    <Ionicons name="star-sharp" size={16} color="#FFF" />
                                                    <Text style={{
                                                        color: '#FFF'
                                                    }}>
                                                        4.2
                                                    </Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                    horizontal={true}
                                    keyExtractor={(item, index) => index.toString()}
                                /> */}
                            </View>
                        </View>

                    </ScrollView>

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
                        flexDirection:'row'
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                setCartCountItem(cart_count_item -1);
                            }}
                            style={{
                                backgroundColor:'#D2001A',
                                borderRadius:4,
                                padding:4
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
                                padding:6,
                                borderRadius:6,
                                elevation:.3,
                                marginHorizontal:4,
                                fontWeight:'bold',
                                fontSize:14,
                            }}
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
                                padding:4
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
                            storeData(routeData)
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
    )
}
