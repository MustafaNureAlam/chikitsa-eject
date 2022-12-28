import React, {useState, useRef, useCallback, useEffect} from 'react'
import { 
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    FlatList,
    Image,
    Modal,
    Pressable,
    RefreshControl
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
import UserAvatar from '../../../../assets/user_avatar.png';
import * as blood_donor from '../../../../services/api/blood_donor';
import config from '../../../../services/config';
import token from '../../../../services/local_storage/storage';
import Loader from '../../../modules/loader';

export default function RequestList({navigation, route}) {

    const isMounted = useRef(true);
    const [blood, setBlood] = useState('A');
    const [rhD, setRhd] = useState('Positive');
    const [api_data, setApiData] = useState([]);
    const [is_loading, setLoading] = useState(true);
    const [stateStatus, setStateStatus] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [modal_data, setModalData] = useState(null);
    const [donor_item, setDonorItem] = useState(null);

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {

        setRefreshing(true);
        getApiData();
        setRefreshing(false);

        // console.log('=====onRefresh=======')
        // console.log(api_data)
        // console.log('=====onRefresh=======')

        return() => {
            isMounted.current = false;
        }
    }, []);


    useEffect(() => {
        if(isMounted) {
            setLoading(true);
            getApiData()
            setLoading(true);
        }
    
        return () => {
            isMounted.current = false;
        }
    }, [navigation, route]);
    
    useEffect(() => {
        if(isMounted) {
            setLoading(true);
            getApiData()
            setLoading(true);
        }
    
        return () => {
            isMounted.current = false;
        }
    }, [stateStatus,navigation, route]);

    async function donate(item){
        // donate
        console.log('item', item)
        setDonorItem(item);
        let user_token = await token.getItem("token");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "status": "1"
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch(config.baseUrl + "blood_donor/donate/"+item.id, requestOptions)
            .then(response => response.text())
            .then(result => { 
                setStateStatus(stateStatus+1);
                let user_data = JSON.parse(result);
                console.log("user_data");
                console.log(user_data);
                console.log("user_data");
                setModalData(user_data)

            })
            .catch(error => console.log('error', error));
    }

    async function getApiData(){

        await token.getItem('active_location').then(async(res) => {
            if(res == null){
                // alert("Location Not Found")
                navigation.navigate('MapScreen', {params:"blooddonor"})
            }else {
                const data = JSON.parse(res)
                // setActiveLocation(data)
                // console.log("++++++++++++++++++")
                // // console.log(data)
                // console.log(data.latitude)
                // console.log(data.longitude)
                // console.log("++++++++++++++++++")

                let user_token = await token.getItem("token");

                var myHeaders = new Headers();
                myHeaders.append("Authorization", "Bearer " + user_token);
                myHeaders.append("Content-Type", "application/json");

                const donor_data_obj = {
                    latitude:data.latitude,
                    longitude:data.longitude,
                    distance:"500" // IN K.M
                }
                var raw = JSON.stringify(donor_data_obj);
        
                var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: raw,
                    redirect: 'follow'
                };
        
                await fetch( config.baseUrl + "blood_donor/nearest_requests", requestOptions)
                .then(response => response.text())
                .then(result => {
                    setLoading(true);
                    const data = JSON.parse(result)
                    console.log('======nearest_requests======')
                    console.log(data)
                    console.log('======nearest_requests======')
                    setApiData(data);
                    setLoading(false);
                })
                .catch(error => console.log('error', error));
            }
        })
        
    }



    return(
        <SafeAreaView style={{backgroundColor:'#fff', flex:1}}>
            {
                is_loading ? (
                    null
                ) : (
                    <View>

                        {
                            api_data?.data?.length > 0 ? (

                                <View style={{
                                    marginTop:10
                                }}>
                                    <FlatList

                                        refreshControl={
                                            <RefreshControl
                                            refreshing={refreshing}
                                            onRefresh={onRefresh}
                                            />
                                        }
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
                                                paddingHorizontal:8,
                                                flex:1
                                            }}>
                                                <View style={{
                                                    // flexDirection:'row',
                                                    // justifyContent:'space-around',
                                                    // backgroundColor:'#fff',
                                                    // alignItems:'center',
                                                    // marginHorizontal:15,
                                                    paddingVertical:7,
                                                    marginVertical:5,
                                                    flex:1,
                                                    paddingHorizontal:8
                                                }}>
                                                    <View>
                                                        <Text style={{
                                                            color:'#FF1818',
                                                            fontSize:16,
                                                            fontWeight:'bold'
                                                        }}>{item?.request?.blood_group}{item?.request?.blood_rhd}</Text>
                                                        <Text style={{
                                                            color:'#000',
                                                            fontSize:14,
                                                            fontWeight:'bold'
                                                        }}>{item?.request?.bag_required} Bag</Text>
                                                    </View>
                                                    
                                                    <View>
                                                        <Text style={{
                                                            color:'#808080',
                                                            fontSize:12,
                                                            fontWeight:'700'
                                                        }}>{item?.user_info?.name}</Text>
                                                    </View>
                                                    <View>
                                                        <Text style={{
                                                            color:'#808080',
                                                            fontSize:12,
                                                            fontWeight:'700'
                                                        }}>{item?.request?.requested_date} {item?.request?.requested_time}</Text>
                                                    </View>

                                                    <View>
                                                        <Text style={{
                                                            color:'#808080',
                                                            fontSize:12,
                                                            fontWeight:'700'
                                                        }}>{item?.request?.address}  ({item?.request?.distance.toFixed(2)} K.M)</Text>
                                                    </View>
                                                    
                                                </View>
                                                    
                                                <View style={{paddingHorizontal:4}}>
                                                {
                                                    item?.my_interest && item?.my_interest.length? (
                                                        <View style={{
                                                            // backgroundColor:'#3AAD94',
                                                            // padding:10,
                                                            // borderRadius:6,
                                                        }}>
                                                            <Text style={{
                                                                fontSize:14,
                                                                fontWeight:'bold',
                                                                textAlign:'center',
                                                                color:'#4D96FF'
                                                            }}>{"Pending!"}</Text>
                                                        </View>
                                                    ):(
                                                        <TouchableOpacity 
                                                            style={{
                                                                backgroundColor:'#3AAD94',
                                                                padding:10,
                                                                borderRadius:6,
                                                                // marginTop:10
                                                            }}
                                                            onPress={() => {
                                                                setModalVisible(true)
                                                                donate(item.request)
                                                            }}
                                                        >
                                                            <Text 
                                                                style={{
                                                                    textAlign:'center',
                                                                    fontSize:12,
                                                                    color:'#fff',
                                                                    fontWeight:'bold'
                                                                }}
                                                            >Donate</Text>
                                                        </TouchableOpacity>
                                                    )
                                                }
                                                    
                                                </View>

                                            </View>
                                        )}
                                        ListFooterComponent={
                                            <View style={styles.centeredView}>
                                            <Modal
                                                animationType="slide"
                                                transparent={true}
                                                visible={modalVisible}
                                                onRequestClose={() => {
                                                    setModalVisible(!modalVisible);
                                                }}
                                            >
                                                <View style={styles.centeredView}>
                                                    
                                                    <View style={styles.modalView}>

                                                        <View style={{
                                                            flexDirection:'row',
                                                            justifyContent:'space-between'
                                                        }}>
                                                            <View style={{
                                                                paddingHorizontal:10
                                                            }}>
                                                                <Avatar.Image 
                                                                    style={{
                                                                        backgroundColor:'#fff',
                                                                        borderWidth:.5,
                                                                        borderColor:'#70707B'
                                                                    }} size={50} source={{uri: config.baseUrl + 'uploades/' + modal_data?.donore_info?.user_pic }} 
                                                                />
                                                            </View>

                                                            <View style={{
                                                                paddingHorizontal:7
                                                            }}>
                                                                <Text style={{
                                                                    color:'#000',
                                                                    fontSize:16,
                                                                    fontWeight:'bold',
                                                                    textAlign:'left'
                                                                }}>{modal_data?.donore_info?.name}</Text>
                                                                <Text style={{
                                                                    color:'#70707B',
                                                                    fontSize:14,
                                                                    fontWeight:'bold',
                                                                    textAlign:'left'
                                                                }}>Requested for operation</Text>  
                                                            </View>
                                                        </View>

                                                        <View style={{
                                                            paddingVertical:10,
                                                            paddingHorizontal:7
                                                        }}>
                                                            <Text style={{
                                                                fontSize:14,
                                                                color:'#000',
                                                                fontWeight:'bold'
                                                            }}>Requirement : {donor_item?.blood_group} {donor_item?.blood_rhd}</Text>
                                                            
                                                            <Text style={{
                                                                fontSize:14,
                                                                color:'#000',
                                                                fontWeight:'bold'
                                                            }}>Number of bags : {donor_item?.bag_required} </Text>
                                                            
                                                            <Text style={{
                                                                fontSize:14,
                                                                color:'#000',
                                                                fontWeight:'bold'
                                                            }}>Address : {donor_item?.address} </Text>
                                                        </View>
                                                        {/* <View style={{marginHorizontal:3}}>
                                                            <Pressable style={[styles.button, styles.buttonOpen]}>
                                                                <Text style={styles.textStyle}>Edit</Text>
                                                            </Pressable>
                                                        </View> */}
                                                        <View style={{marginHorizontal:3}}>
                                                            <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(!modalVisible)}>
                                                                <Text style={styles.textStyle}>Confirm Donation</Text>
                                                            </Pressable>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>
                                        }
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            ) : (
                                <View style={{justifyContent:'center',alignItems:'center',height:'100%'}}>
                                    <Text style={{fontSize:16,fontWeight:'bold'}}>
                                        No requests!
                                    </Text>
                                </View>
                            )
                        }
                    </View>
                )
            }
        
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    checkItemStyle:{
        padding:5,
        fontWeight:'bold',
        fontSize:14,
    },
    radioTxtStyle:{
        fontSize:12,
        fontWeight:'bold',
        color:'#7E7E7E'
    },
    boxShadow: {
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.7,
        shadowRadius: 1.41,
        elevation: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        // flexDirection:'row',
        justifyContent:'space-around'
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#3AAD94",
    },
    buttonClose: {
        backgroundColor: "#F31554",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});