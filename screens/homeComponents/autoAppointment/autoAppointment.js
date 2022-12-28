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
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image,
    FlatList,
    Platform,
    KeyboardAvoidingView,
    Modal,
    Pressable,
    Alert
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
    Feather,
    FontAwesome
} from '@expo/vector-icons';
import { Avatar } from 'react-native-paper';
import UserAvatar from '../../../assets/user_avatar.png';

import { GiftedChat, Send } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import token from '../../../services/local_storage/storage';
import Loader from '../../modules/loader';
import { WebView } from 'react-native-webview';
import config from '../../../services/config';
import { Root, Popup } from 'popup-ui';
import { CommonActions } from '@react-navigation/native';

export default function AutoAppointmentScreen({navigation}) {

    const isMounted = useRef(true);
    const chat_ref = useRef(null)
    
    const [text, setText] = useState("");
    const [is_loading, setLoading] = useState(false);
    const [is_typing , setTyping] = useState(false);
    const [api_data, setApidata] = useState([]);

    const [messages, setMessages] = useState([]);
    const [local_data, setLocalData] = useState([]);
    const [_id, set_Id] = useState("");
    const [_text, set_Text] = useState("");

    const [modalVisible, setModalVisible] = useState(false);
    const [payment_url, setPaymentUrl] = useState("");
    const [chat_count, setChatCOunt] = useState(0);

    

    

    

    // const onSend = useCallback((messages = []) => {
    //     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // }, [])


    async function getMessagesFromLocal(){
        // setLoading(true)
        try {
            
            await AsyncStorage.getItem('message').then(async(res) => {
                let local_text = JSON.parse(res);

                // await AsyncStorage.setItem('message',JSON.stringify(messages));
                // await AsyncStorage.removeItem('message');
                // console.log('============message========')
                // console.log(local_text)
                // console.log('============message========')

                if(local_text.length > 0) {

                    let new_array_local = local_text;
                    setMessages(new_array_local);
                }
            })
          
        } catch(e) {
          // error reading value
        } 
    }

    useLayoutEffect(() => {
        if(isMounted) {
            getMessagesFromLocal();
        }
        return () => {
            isMounted.current = false;
        };
    }, [])

    const onNavigationStateChange = (webViewState) => {

        console.log('7777777777777777777777777777777777777777777777')
        console.log(webViewState.url)
        console.log('7777777777777777777777777777777777777777777777')
        if(webViewState.url.includes(config.baseUrl+'doctor/ssl-commerz-success')) {

            Alert.alert(
                "Success",
                "Payment successful",
                [
                  
                    { 
                        text: "OK", onPress: () => {
                            setTyping(false)
                            setModalVisible(false);
                        } 
                    
                    }
                ]
            );
            // Popup.show({
            //     type: 'Success',
            //     title: 'Appointment created',
            //     button: true,
            //     textBody: 'Congrats! successfully created Appointment',
            //     buttonText: 'Ok',
            //     callback: () => {
            //         setTyping(false)
            //         setModalVisible(false);
            //         Popup.hide();
            //         navigation.dispatch(
            //             CommonActions.navigate({
            //               name: 'DrawerHomeScreen'
            //             })
            //         );
            //     },
                
            // })
            
        }

        if(webViewState.url.includes(config.baseUrl+'doctor/ssl-commerz-fail')) {
            // remove_appointment()
            Alert.alert(
                "Danger",
                "Action fail",
                [
                  
                    { 
                        text: "OK", onPress: () => {
                            setTyping(false)
                            setModalVisible(false);
                            navigation.dispatch(
                                CommonActions.navigate({
                                  name: 'DrawerHomeScreen'
                                })
                            );
                        } 
                    
                    }
                ]
            );
            // Popup.show({
            //     type: 'Danger',
            //     title: 'Failed!',
            //     button: true,
            //     textBody: 'Please try again!',
            //     buttonText: 'Ok',
            //     callback: () => {
            //         setTyping(false)
            //         setModalVisible(false);
            //         Popup.hide();
            //         navigation.dispatch(
            //             CommonActions.navigate({
            //               name: 'DrawerHomeScreen'
            //             })
            //         );
            //         // navigation.navigate('DrawerHomeScreen',api_data);
            //     },
                
            // })
        }
        
        if(webViewState.url.includes(config.baseUrl+'doctor/ssl-commerz-cancel')) {
            // remove_appointment()
            Alert.alert(
                "Danger",
                "Action fail",
                [
                  
                    { 
                        text: "OK", onPress: () => {
                            setTyping(false)
                            setModalVisible(false);
                            navigation.dispatch(
                                CommonActions.navigate({
                                  name: 'DrawerHomeScreen'
                                })
                            );
                        } 
                    
                    }
                ]
            );
            // Popup.show({
            //     type: 'Danger',
            //     title: 'Canceled!',
            //     button: true,
            //     textBody: 'Please try again!',
            //     buttonText: 'Ok',
            //     callback: () => {
            //         setTyping(false)
            //         setModalVisible(false);
            //         Popup.hide();
            //         navigation.dispatch(
            //             CommonActions.navigate({
            //               name: 'DrawerHomeScreen'
            //             })
            //         );
            //         // navigation.navigate('DrawerHomeScreen',api_data);
            //     },
                
            // })
        }
    };


    async function sendMessage(msg) {

        let user_token = await token.getItem("token");

        // console.log('%%%%%%%%%sendMessage%%%%%%%%%%%%')
        // console.log(msg)
        // console.log('%%%%%%%%%sendMessage%%%%%%%%%%%%')
        setLocalData(prev => [...prev, msg[0]])
        await AsyncStorage.setItem('message',JSON.stringify(messages));

        let send_msg = msg;
        let text = msg[0].text;
        let msg_id = msg[0]._id
        
        // setText("");
        setTyping(true);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain");

        var raw = JSON.stringify({
            "sender" : "Bearer " + user_token,
            "message" : text
        }) 

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        let data_arr = [];

        await fetch("http://chat-bot.socian.ai:9001/webhooks/rest/webhook", requestOptions)
        .then(response => response.text())
        .then(async(result) => {
            let data = JSON.parse(result);

            // console.log('============data=========')
            // console.log(data)
            // console.log('============data=========')

            let final_data = [];

            if(data[0]?.buttons) {

                data[0]?.buttons.forEach(element => {
                    // console.log('=================btn================')
                    // console.log(element)
                    // console.log('===============btn==================')
                    element.value = element.payload;
                    delete element.payload;
                    final_data.push(element)
                });

                setApidata(final_data);

                let create_local_data = {
                    _id: Math.floor(Math.random() * 5657767699),
                    text: data[0]?.text,
                    createdAt: new Date(),
                    user: {
                    _id: 2,
                    name: 'Bot',
                    avatar: 'https://placeimg.com/140/140/any',
                    },
                    quickReplies: {
                        type: 'radio', // or 'checkbox',
                        values: final_data,
                        keepIt: true
                    },
                }

                // console.log('============create_local_data=========')
                // console.log(create_local_data)
                // console.log('============create_local_data=========')

                setMessages(previousMessages => GiftedChat.append(
                    previousMessages,
                    {
                        _id: Math.floor(Math.random() * 787989695),
                        text: data[0]?.text,
                        createdAt: new Date(),
                        user: {
                        _id: 2,
                        name: 'Bot',
                        avatar: 'https://placeimg.com/140/140/any',
                        },
                        quickReplies: {
                            type: 'radio', // or 'checkbox',
                            values: final_data,
                            keepIt: true
                        },
                    },
                ))
                setTyping(false);
                setLocalData(prev => [...prev,create_local_data]);
                await AsyncStorage.setItem('message',JSON.stringify(messages));

            }else {

                setTyping(true);

                let item_data = {
                    _id: Math.floor(Math.random() * 24356586979),
                    text: data[0]?.text,
                    createdAt: new Date(),
                    user: {
                    _id: 2,
                    name: 'Bot',
                    avatar: 'https://placeimg.com/140/140/any',
                    },
                }

                setMessages(previousMessages => GiftedChat.append(
                    previousMessages,
                    {
                        _id: Math.floor(Math.random() * 24356586979),
                        text: data[0]?.text,
                        createdAt: new Date(),
                        user: {
                        _id: 2,
                        name: 'Bot',
                        avatar: 'https://placeimg.com/140/140/any',
                        },
                    }
                ))
                setTyping(false);

                setLocalData(prev => [...prev, item_data]);
                await AsyncStorage.setItem('message', JSON.stringify(messages))
            }



            // let new_obj ={
            //     _id:  Math.floor(Math.random() * 1000),
            //     text: data[0]?.text,
            //     createdAt: new Date(),
            //     user: {
            //     _id: 2,
            //     name: 'Bot',
            //     avatar: 'https://placeimg.com/140/140/any',
            //     },
            // }
        })
        .catch(error => console.log('error', error));
    }

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])


    async function replyChat(text) {
        
        let reply_obj ={
            _id: JSON.stringify(Math.floor(Math.random() * 546576586980765)),
            text: text[0]?.title,
            createdAt: new Date(),
            user: {
                _id: 1,
            },
            // sent: true,
        }


        setMessages(previousMessages => GiftedChat.append(previousMessages, reply_obj));
        // sendMessage(reply_obj);
        setLocalData(prev=> [...prev, reply_obj])
        await AsyncStorage.setItem('message',JSON.stringify(messages));

        
        // console.log('============reply data=========')
        // console.log(reply_obj)
        // console.log('============reply data=========')

        let user_token = await token.getItem("token");

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain");

        var raw = JSON.stringify({
            "sender" : "Bearer " + user_token,
            "message" : text[0]?.value
        }) 

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        setTyping(true);

        let data_arr = [];

        await fetch("http://chat-bot.socian.ai:9001/webhooks/rest/webhook", requestOptions)
        .then(response => response.text())
        .then(async(result) => {
            let data = JSON.parse(result);

            // console.log('============confirm payment=========')
            // console.log(data)
            // console.log('============confirm attachment=========')

            if(data[0]?.buttons) {

                let final_data = [];

                data[0]?.buttons.forEach(element => {
                    
                    element.value = element.payload;
                    delete element.payload;
                    final_data.push(element)
                });

                // console.log('=================btn================')
                // console.log(final_data)
                // console.log('===============btn==================')

                let new_obj ={
                    _id:  Math.floor(Math.random() * 2343435456576587),
                    text: data[0]?.text,
                    createdAt: new Date(),
                    user: {
                    _id: 2,
                    name: 'Bot',
                    avatar: 'https://placeimg.com/140/140/any',
                    },
                }
            
                setTimeout(() => {
                    setMessages(previousMessages => GiftedChat.append(
                        previousMessages, 
                        {
                            _id: Math.floor(Math.random() * 67589706543),
                            text: data[0]?.text,
                            createdAt: new Date(),
                            user: {
                            _id: 2,
                            name: 'Bot',
                            avatar: 'https://placeimg.com/140/140/any',
                            },
                            quickReplies: {
                                type: 'radio',
                                values: final_data,
                                keepIt: true
                            },
                        }
                    ));
                }, 100);

                setTyping(false);

                // console.log('=================new_obj================')
                // console.log(new_obj)
                // console.log('===============new_obj==================')

                setLocalData(prev => [...prev, new_obj]);
                await AsyncStorage.setItem('message', JSON.stringify(messages))
                

            } else {

                setTyping(true);
                let new_obj ={
                    _id:  Math.floor(Math.random() * 234567898765),
                    text: data[0]?.text,
                    createdAt: new Date(),
                    user: {
                    _id: 2,
                    name: 'Bot',
                    avatar: 'https://placeimg.com/140/140/any',
                    },
                }

                setTimeout(() => {
                    setMessages(previousMessages => GiftedChat.append(
                        previousMessages, 
                        {
                            _id: Math.floor(Math.random() * 12456787654),
                            text: data[0]?.text,
                            createdAt: new Date(),
                            user: {
                            _id: 2,
                            name: 'Bot',
                            avatar: 'https://placeimg.com/140/140/any',
                            },
                            // quickReplies: {
                            //     type: 'radio', // or 'checkbox',
                            //     values: final_data,
                            //     keepIt: true
                            // },
                        }
                    ));
                }, 100);
                setTyping(false);

                setLocalData(prev => [...prev, new_obj]);
                await AsyncStorage.setItem('message', JSON.stringify(messages));
                
                if(data[1]?.attachment) {
                    setModalVisible(true);
                    setPaymentUrl(data[1]?.attachment);
                }
            }


        })
        .catch(error => console.log('error', error));

    }

    useEffect(async() => {
        if(isMounted){

            setMessages([
                // {
                //     _id: 1,
                //     text: 'Hello!',
                //     createdAt: new Date(),
                //     user: {
                //     _id: 2,
                //     name: 'bot',
                //     avatar: 'https://placeimg.com/140/140/any',
                //     },
                // },
            ]);

        }

        return() => {
            isMounted.current = false;
        }
    }, []);



    return (
        <Root>
            <SafeAreaView style={{flex:1}}>
                {
                    is_loading ? (
                        <Loader/>
                    ) : (

                        <View style={{
                            flex:1,
                        }}>
                            {/* <View style={{}}>
                                <View style={{
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    paddingVertical:20,
                                    paddingHorizontal:30,
                                    backgroundColor:'#F0F8F7',
                                    height:100,
                                    borderBottomLeftRadius:100/2,
                                    borderBottomRightRadius:100/2,
                                    justifyContent:'center',
                                    alignItems:'center'
                                }}>
                                    <View style={{
                                        flex:1,
                                        flexDirection:'row',
                                        justifyContent:'flex-start'
                                    }}>
                                        <View>
                                            <Avatar.Image size={40} source={UserAvatar} />
                                        </View>
                                        <View style={{
                                            marginHorizontal:5
                                        }}>
                                            <Text style={{
                                                fontSize:18,
                                                fontWeight:'bold',
                                                color:'#707070'
                                            }}>RASA</Text>
                                            <Text style={{
                                                fontSize:12,
                                                fontWeight:'400',
                                                color:'#707070'
                                            }}>Away 10 m</Text>
                                        </View>
                                    </View>

                                    <View style={{
                                        flex:1,
                                        flexDirection:'row',
                                        justifyContent:'flex-end'
                                    }}>
                                        <View style={{
                                            marginHorizontal:10
                                        }}>
                                            <TouchableOpacity>
                                                <Ionicons name='search-outline' size={24} color={'#707070'} />
                                            </TouchableOpacity>
                                            
                                        </View>
                                        <View>
                                            <TouchableOpacity>
                                                <Entypo name="dots-three-vertical" size={22} color="#707070" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View> */}
                            
                            <GiftedChat
                                ref={chat_ref}
                                // isLoadingEarlier={true}
                                // onPress={()=>chat_ref.focusTextInput()}
                                // textInputProps={{autoFocus: true}}
                                // wrapInSafeArea
                                inverted
                                isTyping={is_typing}
                                bottomOffset={20}
                                messages={messages}
                                onSend={messages => {
                                    onSend(messages);
                                    sendMessage(messages);
                                
                                }}
                                user={{
                                    _id: 1,
                                }}
                                renderSend ={ (props) => {
                                        return (
                                            <Send
                                                {...props}
                                                // containerStyle={styles.sendContainer}
                                            >
                                                <View style={{
                                                    position:'relative',
                                                    bottom:8
                                                }}>
                                                    <Ionicons name="send" size={24} color="#3AAD94" />
                                                </View>
                                            </Send>
                                        );
                                    }
                                }
                                
                                // renderQuickReplies
                                onQuickReply={(text) => {
                                    
                                    replyChat(text);
                                    // sendMessage(reply_obj);

                                }}
                            />

                            

                            {/* {
                                Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />
                            } */}


                            {/* <ScrollView>
                                <View style={{
                                    flex:1,
                                    // backgroundColor:'#000',
                                    marginHorizontal:20,
                                    marginVertical:20
                                }}>

                                    <View>
                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'flex-start',
                                            marginVertical:10
                                        }}>
                                            <Text style={{
                                                backgroundColor:'#ADEBBE',
                                                padding:15,
                                                borderRadius:15,
                                                fontSize:14,
                                                lineHeight:20,
                                                color:'#707070',
                                                fontWeight:'500',
                                            }}>
                                                Welcome to Chikitsha. 
                                                Kindly help me with information 
                                                so that I can book an 
                                                appointment for you. 
                                                How old are you?
                                            </Text>
                                        </View>

                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'flex-end',
                                            marginVertical:10
                                        }}>
                                            <Text style={{
                                                backgroundColor:'#ADD0F3',
                                                padding:15,
                                                borderRadius:15,
                                                fontSize:14,
                                                lineHeight:20,
                                                color:'#707070',
                                                fontWeight:'500'
                                            }}>
                                            23 years old
                                            </Text>
                                        </View>
                                    </View>


                                    <View>
                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'flex-start',
                                            marginVertical:10
                                        }}>
                                            <Text style={{
                                                backgroundColor:'#ADEBBE',
                                                padding:15,
                                                borderRadius:15,
                                                fontSize:14,
                                                lineHeight:20,
                                                color:'#707070',
                                                fontWeight:'500'
                                            }}>
                                                What problem are you facing?
                                            </Text>
                                        </View>

                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'flex-end',
                                            marginVertical:10
                                        }}>
                                            <Text style={{
                                                backgroundColor:'#ADD0F3',
                                                padding:15,
                                                borderRadius:15,
                                                fontSize:14,
                                                lineHeight:20,
                                                color:'#707070',
                                                fontWeight:'500'
                                            }}>
                                            I have high fever from two days.
                                            </Text>
                                        </View>
                                    </View>


                                    <View>
                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'flex-start',
                                            marginVertical:10
                                        }}>
                                            <Text style={{
                                                backgroundColor:'#ADEBBE',
                                                padding:15,
                                                borderRadius:15,
                                                fontSize:14,
                                                lineHeight:20,
                                                color:'#707070',
                                                fontWeight:'500'
                                            }}>
                                                Do you have any other symptoms?
                                            </Text>
                                        </View>

                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'flex-end',
                                            marginVertical:10
                                        }}>
                                            <Text style={{
                                                backgroundColor:'#ADD0F3',
                                                padding:15,
                                                borderRadius:15,
                                                fontSize:14,
                                                lineHeight:20,
                                                color:'#707070',
                                                fontWeight:'500'
                                            }}>
                                            No
                                            </Text>
                                        </View>
                                    </View>

                                </View>
                            </ScrollView> */}
                        </View>

                    )
                }
                

                {
                    modalVisible == true && (
                        <Modal
                            animationType="slide"
                            // transparent={true}
                            visible={modalVisible}
                            style={{
                                flex:1,
                                
                            }}
                            presentationStyle='fullScreen'
                        >
                            <View style={{backgroundColor:'#3AAD94',flex:1}}>
                                <WebView 
                                    style={{flex:1}} 
                                    source={{ uri: payment_url }} 
                                    onNavigationStateChange={onNavigationStateChange}
                                />
                            </View>
                        </Modal>
                    )
                }

            </SafeAreaView>
        </Root>
    )
}


const styles = StyleSheet.create({
    centeredView: {
    //   flex: 1,
    },
    modalView: {
    //   margin: 20,
    flex:1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
});
