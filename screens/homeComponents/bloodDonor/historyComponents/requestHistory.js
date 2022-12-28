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
import { RadioButton, Avatar, List } from 'react-native-paper';
import config from '../../../../services/config';
import token from '../../../../services/local_storage/storage';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../../../modules/loader';
import { Root, Popup } from 'popup-ui'

export default function RequestHistoryScreen({navigation}) {

    const isMounted = useRef(true);
    const [api_data, setApiData] = useState([]);
    const [is_loading, setLoading] = useState(true);

    const [expanded, setExpanded] = useState(true);
    const [btn_visible, setBtnVisible] = useState(false);

    const handlePress = () => setExpanded(!expanded);

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

        await fetch(config.baseUrl + "blood_donor/request_history", requestOptions)
        .then(response => response.text())
        .then(result => {
            const data = JSON.parse(result)
            setApiData(data)
            console.log('====apidta=======blood_donor/request_history')
            console.log(data)
            console.log('=====apidta======blood_donor/request_history')
        })
        .catch(error => console.log('error', error));
    }

    ////cancel request api 
    async function cancel_request(status, request_id) {

        if(status == 2) {
            Popup.show({
                type: 'Success',
                title: 'Completed request!',
                textBody:
                    'Successfully completed your request ?',
                buttontext: 'ok',
                callback: async() => {
                    
                    let user_token = await token.getItem("token");
                    console.log(status)
    
                    var myHeaders = new Headers();
                    myHeaders.append("Authorization", "Bearer " + user_token);
                    myHeaders.append("Content-Type", "application/json");
    
                    var raw = JSON.stringify({"status" : status, "req_id" : request_id});
    
                    var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow",
                    };
    
                    await fetch(config.baseUrl + "blood_donor/request_status_update", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        const data = JSON.parse(result)
                        if(data.code == 200) {
                            setLoading(true);
                            getApiData();
                            setLoading(false);
                        }
                    })
                    .catch(error => console.log('error', error));
                    
                    Popup.hide()
                },
            })
        } else if(status == 3) {

            Popup.show({
                type: 'Danger',
                title: 'Cancel request!',
                textBody:
                    'Are you sure! want to cancel request?',
                buttontext: 'yes',
                callback: async() => {
                    
                    let user_token = await token.getItem("token");
                    console.log(status)
    
                    var myHeaders = new Headers();
                    myHeaders.append("Authorization", "Bearer " + user_token);
                    myHeaders.append("Content-Type", "application/json");
    
                    var raw = JSON.stringify({"status" : status, "req_id" : request_id});
    
                    var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow",
                    };
    
                    await fetch(config.baseUrl + "blood_donor/request_status_update", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        const data = JSON.parse(result)
                        if(data.code == 200) {
                            setLoading(true);
                            getApiData();
                            setLoading(false);
                        }
                    })
                    .catch(error => console.log('error', error));
                    
                    Popup.hide()
                },
            })
        }

        
    }

    async function accept_request(item) {

        let user_token = await token.getItem("token");
        console.log("item")
        console.log(item)
        console.log("item")

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({"status" : "3", "req_id" : item?.request_id});

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        await fetch(config.baseUrl + "blood_donor/donation_status_update", requestOptions)
        .then(response => response.text())
        .then(result => {
            const data = JSON.parse(result)
            if(data.code == 200) {
                setLoading(true);
                getApiData();
                setBtnVisible(true);
                setLoading(false);
            }
            // console.log(data)
        })
        .catch(error => console.log('error', error));
    }

    return (
        <Root>
            <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>

                {
                    is_loading ? (
                        <Loader/>
                    ) : (

                        <View style={{
                            paddingBottom:30
                        }}>

                            {/* <Text style={{
                                color:'#7B93A4',
                                fontSize:16,
                                fontWeight:'bold',
                                paddingVertical:5,
                                marginHorizontal:20,
                                marginTop:5
                            }}>Active request</Text> */}
                            
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={api_data?.data}
                                renderItem={({item, index}) => (
                                    <View style={{
                                        // marginVertical:3
                                    }}>

                                        {
                                            item?.request_detailes?.status == 1 &&(

                                                <List.Section 
                                                    title="Active request"
                                                    titleStyle={{fontSize:16,fontWeight:'bold', color:'#548CFF'}}
                                                    style={{marginHorizontal:10}}
                                                >
                                                    <List.Accordion
                                                        title={item?.request_detailes?.blood_group + item?.request_detailes?.blood_rhd}
                                                        description={item?.request_detailes?.address + " , " + " " + item?.request_detailes?.requested_date.substring(0,10) +" "+ item?.request_detailes?.requested_time}
                                                        descriptionStyle={{}}
                                                        titleStyle={{color:'#000', fontWeight:'bold'}}
                                                        // style={{backgroundColor:'#fff'}}
                                                        // left={props => <FontAwesome5  name="user-clock" size={24} color="#3AAD94" />}
                                                    >
                                                        {/* <List.Item title="First item" />
                                                        <List.Item title="Second item" /> */}
                                                        <View style={{
                                                            paddingHorizontal:10,
                                                            // marginHorizontal:10,
                                                            backgroundColor:'#FBF8F1',
                                                            paddingVertical:7
                                                        }}>
                                                            <View style={{
                                                                marginVertical:10,
                                                                marginHorizontal:20,
                                                                backgroundColor:'#EEEDDE',
                                                                    borderRadius:5,
                                                                    marginBottom:7
                                                            }}>

                                                                <View style={{
                                                                    flexDirection:'row',
                                                                    justifyContent:'space-evenly',
                                                                    padding:5,
                                                                    
                                                                }}>
                                                                    
                                                                    <View style={{}}>
                                                                        <Text style={{
                                                                            fontSize:14,
                                                                            fontWeight:'700',
                                                                            padding:3
                                                                        }}>{item?.request_detailes?.blood_group + item?.request_detailes?.blood_rhd}</Text>
                                                                        
                                                                        <Text style={{
                                                                            fontSize:14,
                                                                            fontWeight:'700',
                                                                            padding:3
                                                                        }}>{item?.request_detailes?.bag_required} bags</Text>
                                                                        
                                                                        <Text style={{
                                                                            fontSize:14,
                                                                            fontWeight:'700',
                                                                            padding:3
                                                                        }}>{item?.request_detailes?.note ? item?.request_detailes?.note : 'Purpose - N/A'}</Text>
                                                                    </View>
                                                                    
                                                                    <View>
                                                                        <Text style={{
                                                                            fontSize:14,
                                                                            fontWeight:'700',
                                                                            padding:3
                                                                        }}>{item?.request_detailes?.phone_number}</Text>
                                                                        
                                                                        <Text style={{
                                                                            fontSize:14,
                                                                            fontWeight:'700',
                                                                            padding:3
                                                                        }}>{item?.request_detailes?.requested_date.substring(0,10)} {'\n'} {item?.request_detailes?.requested_time}</Text>
                                                                    </View>

                                                                </View>


                                                                <View style={{
                                                                    flexDirection:'row',
                                                                    justifyContent:'space-evenly',
                                                                    paddingBottom:10
                                                                }}>
                                                                    
                                                                    <TouchableOpacity 
                                                                        style={{
                                                                            backgroundColor:'#EB5757',
                                                                            paddingHorizontal:10,
                                                                            paddingVertical:5,
                                                                            borderRadius:5,
                                                                            flexDirection:'row',
                                                                            alignItems:'center',
                                                                            justifyContent:'space-around'
                                                                        }}
                                                                        onPress={() => cancel_request(3, item?.request_detailes?.id)}
                                                                    
                                                                    >
                                                                        <Feather style={{paddingRight:5}} name="user-x" size={20} color="#fff" />
                                                                        <Text style={{
                                                                            color:'#fff',
                                                                            fontSize:12,
                                                                            fontWeight:'bold',
                                                                            textAlign:'center'
                                                                        }}>Cancel request</Text>

                                                                    </TouchableOpacity>
                                                                    
                                                                    <TouchableOpacity 
                                                                        style={{
                                                                            backgroundColor:'#3AAD94',
                                                                            paddingHorizontal:10,
                                                                            paddingVertical:5,
                                                                            borderRadius:5,
                                                                            flexDirection:'row',
                                                                            alignItems:'center',
                                                                            justifyContent:'space-around'
                                                                        }}
                                                                        onPress={() => cancel_request(2, item?.request_detailes?.id)}
                                                                    >
                                                                        <Feather style={{paddingRight:5}} name="user-check" size={20} color="#fff" />
                                                                        <Text style={{
                                                                            color:'#fff',
                                                                            fontSize:12,
                                                                            fontWeight:'bold',
                                                                            textAlign:'center'
                                                                        }}>Completed</Text>

                                                                    </TouchableOpacity>

                                                                </View>

                                                            </View>
                                                            
                                                            <FlatList
                                                                data={item?.donor_detailes}
                                                                renderItem={({item, index}) => (
                                                                    
                                                                    <View style={{
                                                                        paddingVertical:10,
                                                                        borderBottomWidth:.2
                                                                    }}>
                                                                        <View style={{
                                                                            flexDirection:'row',
                                                                            alignItems:'center',
                                                                            justifyContent:'space-between'
                                                                        }}>
                                                                            
                                                                            <TouchableOpacity 
                                                                                style={{
                                                                                    flexDirection:'row',
                                                                                    alignItems:'center',
                                                                                }}
                                                                                onPress={() => {
                                                                                    Linking.openURL(`tel:${item?.phone}`)
                                                                                }}
                                                                            >

                                                                                <Avatar.Image 
                                                                                    style={{
                                                                                        backgroundColor:'#fff',
                                                                                        borderWidth:.5,
                                                                                        borderColor:'#70707B',
                                                                                        marginHorizontal:5
                                                                                    }} 
                                                                                    size={40} 
                                                                                    source={{uri: config.baseUrl + 'uploades/' + item?.user_pic }} 
                                                                                />
                                                                                
                                                                                <Text style={{
                                                                                    color:'#000',
                                                                                    fontSize:14,
                                                                                    fontWeight:'bold'
                                                                                }}>{item?.name}{"\n"}{"Click to call Donor."}</Text>
                                                                            </TouchableOpacity>

                                                                            
                                                                            <View style={{
                                                                                flexDirection:'row',
                                                                                justifyContent:'space-around'
                                                                            }}>

                                                                                {
                                                                                    btn_visible && (
                                                                                        <TouchableOpacity 
                                                                                            style={{
                                                                                                backgroundColor:'#3AAD94',
                                                                                                paddingVertical:5,
                                                                                                paddingHorizontal:15,
                                                                                                borderRadius:5,
                                                                                                marginRight:5
                                                                                            }}
                                                                                            // onPress={() => accept_request(item)}
                                                                                        >
                                                                                            <Text style={{
                                                                                                color:'#fff',
                                                                                                fontSize:12,
                                                                                                fontWeight:'bold',
                                                                                                textAlign:'center'
                                                                                            }}>
                                                                                                Accepted
                                                                                            </Text>
                                                                                        </TouchableOpacity>
                                                                                    )
                                                                                }
                                                                                
                                                                                {
                                                                                    !btn_visible &&(
                                                                                        <TouchableOpacity 
                                                                                            style={{
                                                                                                backgroundColor:'#8BCFC0',
                                                                                                paddingVertical:5,
                                                                                                paddingHorizontal:15,
                                                                                                borderRadius:5,
                                                                                            }}
                                                                                            onPress={() => accept_request(item)}
                                                                                        >
                                                                                            <Text style={{
                                                                                                color:'#090F47',
                                                                                                fontSize:12,
                                                                                                fontWeight:'bold',
                                                                                                textAlign:'center'
                                                                                            }}>
                                                                                                Accept
                                                                                            </Text>
                                                                                        </TouchableOpacity>
                                                                                    )
                                                                                }
                                                                                

                                                                            </View>

                                                                        </View>

                                                                    </View>
                                                                )}
                                                                keyExtractor={(item, indexChild) => indexChild.toString()}
                                                            />

                                                            
                                                        </View>

                                                    </List.Accordion>

                                                </List.Section>
                                            )
                                        }


                                    </View>
                                )}
                                extraData={api_data?.data}
                                keyExtractor={(item, index) => index.toString()}
                                ListFooterComponent={
                                    <View style={{
                                        marginVertical:20,
                                        // marginHorizontal:15,
                                        // backgroundColor:'#ccc'
                                    }}>
                                        {/* <Text style={{
                                            color:'#7B93A4',
                                            fontSize:16,
                                            fontWeight:'bold',
                                            paddingVertical:5,
                                            marginHorizontal:20,
                                            marginTop:5
                                        }}>Cancelled requests</Text> */}
                                        
                                        <FlatList 
                                            data={api_data?.data}
                                            renderItem={({item, index}) => (
                                                <View>

                                                    {
                                                        item?.request_detailes?.status == 3 &&(

                                                            <List.Section 
                                                                title="Cancelled request"
                                                                titleStyle={{fontSize:16,fontWeight:'bold', color:'#FF1700'}}
                                                                style={{marginHorizontal:10}}
                                                            >
                                                                <List.Accordion
                                                                    title={item?.request_detailes?.blood_group + item?.request_detailes?.blood_rhd}
                                                                    description={item?.request_detailes?.address + " , " + " " + item?.request_detailes?.requested_date.substring(0,10) + " "+ item?.request_detailes?.requested_time}
                                                                    descriptionStyle={{}}
                                                                    titleStyle={{color:'#000', fontWeight:'bold'}}
                                                                    // style={{backgroundColor:'#fff'}}
                                                                    // left={props => <FontAwesome5  name="user-clock" size={24} color="#3AAD94" />}
                                                                >
                                                                    {/* <List.Item title="First item" />
                                                                    <List.Item title="Second item" /> */}
                                                                    <View style={{
                                                                        paddingHorizontal:10,
                                                                        marginHorizontal:10,
                                                                        backgroundColor:'#fafefe',
                                                                        paddingVertical:7
                                                                    }}>
                                                                        <View style={{
                                                                            marginVertical:10,
                                                                            marginHorizontal:20,
                                                                        }}>

                                                                            <View style={{
                                                                                flexDirection:'row',
                                                                                justifyContent:'space-evenly',
                                                                                padding:5
                                                                            }}>
                                                                                
                                                                                <View>
                                                                                    <Text style={{
                                                                                        fontSize:14,
                                                                                        fontWeight:'700',
                                                                                        padding:3
                                                                                    }}>{item?.request_detailes?.blood_group + item?.request_detailes?.blood_rhd}</Text>
                                                                                    
                                                                                    <Text style={{
                                                                                        fontSize:14,
                                                                                        fontWeight:'700',
                                                                                        padding:3
                                                                                    }}>{item?.request_detailes?.bag_required} bags</Text>
                                                                                    
                                                                                    <Text style={{
                                                                                        fontSize:14,
                                                                                        fontWeight:'700',
                                                                                        padding:3
                                                                                    }}>{item?.request_detailes?.note ? item?.request_detailes?.note : 'Purpose - N/A'}</Text>
                                                                                </View>
                                                                                
                                                                                <View>
                                                                                    <Text style={{
                                                                                        fontSize:14,
                                                                                        fontWeight:'700',
                                                                                        padding:3
                                                                                    }}>{item?.request_detailes?.phone_number}</Text>
                                                                                    
                                                                                    <Text style={{
                                                                                        fontSize:14,
                                                                                        fontWeight:'700',
                                                                                        padding:3
                                                                                    }}>{item?.request_detailes?.requested_date.substring(0,10)} {'\n'} {item?.request_detailes?.requested_time}</Text>
                                                                                </View>

                                                                            </View>


                                                                        </View>
                                                                        
                                                                        <FlatList
                                                                            data={item?.donor_detailes}
                                                                            renderItem={({item, index}) => (
                                                                                
                                                                                <View style={{
                                                                                    paddingVertical:10,
                                                                                    borderBottomWidth:.2
                                                                                }}>
                                                                                    <View style={{
                                                                                        flexDirection:'row',
                                                                                        alignItems:'center',
                                                                                        justifyContent:'space-between'
                                                                                    }}>
                                                                                        
                                                                                        <View style={{
                                                                                            flexDirection:'row',
                                                                                            alignItems:'center',
                                                                                        }}>
                                                                                            
                                                                                            <Avatar.Image 
                                                                                                style={{
                                                                                                    backgroundColor:'#fff',
                                                                                                    borderWidth:.5,
                                                                                                    borderColor:'#70707B',
                                                                                                    marginHorizontal:5
                                                                                                }} 
                                                                                                size={40} 
                                                                                                source={{uri: config.baseUrl + 'uploades/' + item?.user_pic }} 
                                                                                            />
                                                                                            
                                                                                            <Text style={{
                                                                                                color:'#000',
                                                                                                fontSize:14,
                                                                                                fontWeight:'bold'
                                                                                            }}>{item?.name}</Text>

                                                                                        </View>
                                                                                        
                                                                                        <View>
                                                                                            
                                                                                            <TouchableOpacity style={{
                                                                                                backgroundColor:'#8BCFC0',
                                                                                                paddingVertical:5,
                                                                                                paddingHorizontal:15,
                                                                                                borderRadius:5,
                                                                                            }}>
                                                                                                <Text style={{
                                                                                                    color:'#090F47',
                                                                                                    fontSize:12,
                                                                                                    fontWeight:'bold',
                                                                                                    textAlign:'center'
                                                                                                }}>
                                                                                                    Accept
                                                                                                </Text>
                                                                                            </TouchableOpacity>

                                                                                        </View>

                                                                                    </View>

                                                                                </View>
                                                                            )}
                                                                            keyExtractor={(item, indexChild) => indexChild.toString()}
                                                                        />

                                                                        
                                                                    </View>

                                                                </List.Accordion>

                                                            </List.Section>
                                                        )
                                                    }

                                                    <View>
                                                        {
                                                            item?.request_detailes?.status == 2 &&(

                                                                <List.Section 
                                                                    title="Completed"
                                                                    titleStyle={{fontSize:16,fontWeight:'bold', color:'#3AAD94'}}
                                                                    style={{marginHorizontal:10}}
                                                                >
                                                                    <List.Accordion
                                                                        title={item?.request_detailes?.blood_group + item?.request_detailes?.blood_rhd}
                                                                        description={item?.request_detailes?.address + " , " + " " + item?.request_detailes?.requested_date.substring(0,10) + " " + item?.request_detailes?.requested_time}
                                                                        descriptionStyle={{}}
                                                                        titleStyle={{color:'#000', fontWeight:'bold'}}
                                                                        // style={{backgroundColor:'#fff'}}
                                                                        // left={props => <FontAwesome5  name="user-clock" size={24} color="#3AAD94" />}
                                                                    >
                                                                        <View style={{
                                                                            paddingHorizontal:10,
                                                                            marginHorizontal:10,
                                                                            backgroundColor:'#fafefe',
                                                                            paddingVertical:7
                                                                        }}>
                                                                            <View style={{
                                                                                marginVertical:10,
                                                                                marginHorizontal:20,
                                                                            }}>

                                                                                <View style={{
                                                                                    flexDirection:'row',
                                                                                    justifyContent:'space-evenly',
                                                                                    padding:5
                                                                                }}>
                                                                                    
                                                                                    <View>
                                                                                        <Text style={{
                                                                                            fontSize:14,
                                                                                            fontWeight:'700',
                                                                                            padding:3
                                                                                        }}>{item?.request_detailes?.blood_group + item?.request_detailes?.blood_rhd}</Text>
                                                                                        
                                                                                        <Text style={{
                                                                                            fontSize:14,
                                                                                            fontWeight:'700',
                                                                                            padding:3
                                                                                        }}>{item?.request_detailes?.bag_required} bags</Text>
                                                                                        
                                                                                        <Text style={{
                                                                                            fontSize:14,
                                                                                            fontWeight:'700',
                                                                                            padding:3
                                                                                        }}>{item?.request_detailes?.note ? item?.request_detailes?.note : 'Purpose - N/A'}</Text>
                                                                                    </View>
                                                                                    
                                                                                    <View>
                                                                                        <Text style={{
                                                                                            fontSize:14,
                                                                                            fontWeight:'700',
                                                                                            padding:3
                                                                                        }}>{item?.request_detailes?.phone_number}</Text>
                                                                                        
                                                                                        <Text style={{
                                                                                            fontSize:14,
                                                                                            fontWeight:'700',
                                                                                            padding:3
                                                                                        }}>{item?.request_detailes?.requested_date.substring(0,10)} {'\n'} {item?.request_detailes?.requested_time}</Text>
                                                                                    </View>

                                                                                </View>


                                                                                

                                                                            </View>
                                                                            
                                                                            <FlatList
                                                                                data={item?.donor_detailes}
                                                                                renderItem={({item, index}) => (
                                                                                    
                                                                                    <View style={{
                                                                                        paddingVertical:10,
                                                                                        borderBottomWidth:.2
                                                                                    }}>
                                                                                        <View style={{
                                                                                            flexDirection:'row',
                                                                                            alignItems:'center',
                                                                                            justifyContent:'space-between'
                                                                                        }}>
                                                                                            
                                                                                            <View style={{
                                                                                                flexDirection:'row',
                                                                                                alignItems:'center',
                                                                                            }}>
                                                                                                
                                                                                                <Avatar.Image 
                                                                                                    style={{
                                                                                                        backgroundColor:'#fff',
                                                                                                        borderWidth:.5,
                                                                                                        borderColor:'#70707B',
                                                                                                        marginHorizontal:5
                                                                                                    }} 
                                                                                                    size={40} 
                                                                                                    source={{uri: config.baseUrl + 'uploades/' + item?.user_pic }} 
                                                                                                />
                                                                                                
                                                                                                <Text style={{
                                                                                                    color:'#000',
                                                                                                    fontSize:14,
                                                                                                    fontWeight:'bold'
                                                                                                }}>{item?.name}</Text>

                                                                                            </View>
                                                                                            
                                                                                            <View>
                                                                                                
                                                                                                <TouchableOpacity style={{
                                                                                                    backgroundColor:'#8BCFC0',
                                                                                                    paddingVertical:5,
                                                                                                    paddingHorizontal:15,
                                                                                                    borderRadius:5,
                                                                                                }}>
                                                                                                    <Text style={{
                                                                                                        color:'#090F47',
                                                                                                        fontSize:12,
                                                                                                        fontWeight:'bold',
                                                                                                        textAlign:'center'
                                                                                                    }}>
                                                                                                        Accept
                                                                                                    </Text>
                                                                                                </TouchableOpacity>

                                                                                            </View>

                                                                                        </View>

                                                                                    </View>
                                                                                )}
                                                                                keyExtractor={(item, indexChild) => indexChild.toString()}
                                                                            />

                                                                            
                                                                        </View>

                                                                    </List.Accordion>

                                                                </List.Section>
                                                            )
                                                        }
                                                    </View>
                                                </View>
                                            )}
                                            keyExtractor={(item, indexList) => indexList.toString()}
                                        />
                                        
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
