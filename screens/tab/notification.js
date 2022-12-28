import React, {useCallback,useState,useEffect,useRef} from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    StyleSheet,
    Dimensions,
    FlatList,
    BackHandler, 
    Alert,
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
import {useFocusEffect} from '@react-navigation/native';
import config from '../../services/config';
import token from '../../services/local_storage/storage';

export default function NotificationScreen({navigation}) {

    const [api_data, setApidata] = useState(null);
    const [is_loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const isMounted = useRef(true);

    // const onRefresh = useCallback(() => {
    //     setRefreshing(true);
    //     getAllPrescriptions();
    //     setRefreshing(false);

    //     return() => {
    //         isMounted.current = false;
    //     } 
    // }, []);


    async function getAllPrescriptions(){

    
        let user_token = await token.getItem("token");
        // console.log('doctor_token=======',user_token);
    
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
    
        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };
    
        await fetch( config.baseUrl + "prescription/get/34", requestOptions)
        .then(response => response.text())
        .then(result => {
            
            if(isMounted.current){

                let doctor_response = JSON.parse(result)

                setApidata(doctor_response);
                // console.log('======prescription data======');
                // console.log(doctor_response.data);
                // console.log('======prescription data======');
            }
        })
        .catch(error => console.log('error', error));
    }

    // useFocusEffect(
    //     useCallback(() => {

    //         setTimeout(() => {
    //             setLoading(true)
    //             getAllPrescriptions();
    //             setLoading(false);  
    //         }, 1000);

    //         return() => {
    //             isMounted.current = false;
    //         }
    //     }, []),
    // );
    return (
        <SafeAreaView style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:18,fontWeight:'bold',color:'#3AAD94'}}>Coming soon!</Text>
            {/* <ScrollView>
                <View>
                    <View style={styles.containerStyle}>
                        <View style={{flex:.3,alignItems:'center'}}>
                            <Text>
                                <MaterialCommunityIcons name="calendar-clock" size={30} color="#129C7E" />
                            </Text>
                        </View>
                        <View style={{flex:.7}}>
                            <Text style={styles.textStyle}>You have an appointment at 8 pm</Text>
                            <Text style={{fontSize:12,color:'#83C8B9'}}>15mins to go</Text>
                        </View>
                    </View>
                    <View style={styles.containerStyle}>
                        <View style={{flex:.3,alignItems:'center'}}>
                            <Text>
                                <MaterialCommunityIcons name="shield-check-outline" size={30} color="#129C7E" />
                            </Text>
                        </View>
                        <View style={{flex:.7}}>
                            <Text style={styles.textStyle}>Your lab test reports are ready!</Text>
                            <Text style={{fontSize:12,color:'#83C8B9'}}>15mins to go</Text>
                        </View>
                    </View>
                    <View style={styles.containerStyle}>
                        <View style={{flex:.3,alignItems:'center'}}>
                            <Text>
                                <MaterialCommunityIcons name="calendar-account-outline" size={30} color="#129C7E" />
                            </Text>
                        </View>
                        <View style={{flex:.7}}>
                            <Text style={styles.textStyle}>You have an appointment at 8 pm</Text>
                            <Text style={{fontSize:12,color:'#83C8B9'}}>15mins to go</Text>
                        </View>
                    </View>
                </View>
            </ScrollView> */}
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    textStyle:{
        fontSize:14,
        color:'#3AAD94',
        fontWeight:'400'
    },
    containerStyle:{
        flexDirection:'row',
        padding:20,
        backgroundColor:'#DCEBE8',
        marginVertical:5,
    }
});
