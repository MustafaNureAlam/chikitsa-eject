import React, {useState, useEffect, useCallback, useRef} from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image,
    FlatList
} from 'react-native'
import { Avatar } from 'react-native-paper';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import token from '../../../../../services/local_storage/storage';
import Loader from '../../../../modules/loader';
import config from '../../../../../services/config';
import {useFocusEffect} from '@react-navigation/native';
export default function MembershipScreen({navigation}) {

    const isMounted = useRef(true);
    const [doc_member, setDocMember] = useState(null);
    const [is_loading, setLoading] = useState(true);

    async function getDoctorMembership() {

        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "doctor/doctor_memberships", requestOptions)
        .then(response => response.text())
        .then(result => {
            let membership_data = JSON.parse(result);
            setLoading(true);
            setDocMember(membership_data);
            setLoading(false);
            // console.log('===membership_data====', membership_data)
        })
        .catch(error => console.log('error', error));
    }

    useFocusEffect(
        useCallback(() => {
            if(isMounted) {
                setLoading(true);
                getDoctorMembership()
                setLoading(false);
            }

            return () => {
                isMounted.current = false;
            };
            
        }, []),
    );

    function membership_update(item) {
        // console.log('=-====itemmmmmmmm=========',item.id)
        navigation.navigate('UpdateDocMembershipScreen',item);
    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'}/>

            {
                is_loading ? (
                    null
                ) : (
                    <View style={{}}>
                        <View style={{}}>
                            

                            <View style={{}}>
                                <FlatList 
                                    showsVerticalScrollIndicator={false}
                                    data={doc_member?.data}
                                    renderItem={({ item }) => (
                                        
                                        <View style={{
                                            marginHorizontal:12,
                                            marginVertical:5,
                                            flexDirection: 'row',
                                            paddingVertical: 10,
                                            justifyContent: 'space-between',
                                            paddingHorizontal: 12,
                                            borderRadius:6,
                                            flex:1,
                                            backgroundColor:'#ECECEC'
                                        }}>
                                            <View style={{
                                                flex: 1
                                            }}>
                                                <Text style={{
                                                    color: '#707070',
                                                    fontWeight: 'bold',
                                                    marginBottom: 2,
                                                    fontSize: 14
                                                }}>{item.membership_name}</Text>
                                                {/* <Text style={{
                                                    color: '#707070',
                                                    fontSize: 12,
                                                }}>{item.org_location}</Text> */}
                                                <Text style={{
                                                fontWeight: 'bold',
                                                fontSize: 14,
                                                color: '#3AAD94'
                                            }}>Since {item.member_from}</Text>
                                            </View>

                                            <View style={{
                                                alignItems:'center',
                                                justifyContent:'center'
                                            }}>
                                                <TouchableOpacity>
                                                    <Feather onPress={() => membership_update(item)} name="edit" size={24} color="#707070" />
                                                </TouchableOpacity>
                                            </View>
                                            

                                        </View>
                                    )}
                                    numColumns={1}
                                    keyExtractor={(item, index) => index.toString()}
                                    ListHeaderComponent={
                                        <View style={{
                                            justifyContent:'center',
                                            alignItems:'flex-end',
                                            marginVertical:15
                                        }}>
                                            <TouchableOpacity 
                                                style={{
                                                    flexDirection: 'row',
                                                    backgroundColor: '#3AAD94',
                                                    paddingHorizontal:10,
                                                    paddingVertical: 5,
                                                    borderTopLeftRadius:100/2,
                                                    borderBottomLeftRadius:100/2,
                                                    alignItems:'center'
                                                }}
                                                onPress={() => navigation.navigate('CreateDocMembershipScreen')}
                                            >
        
                                                <MaterialIcons name="add-circle" size={16} color="#FFF" />
                                                <Text style={{
                                                    color: '#FFF',
                                                    marginLeft: 5
                                                }} >Create</Text>
        
                                            </TouchableOpacity>
                                        </View>
                                    }
                                />
                            </View>
                        </View>
                    </View>
                )
            }
        </SafeAreaView>
    )
}
