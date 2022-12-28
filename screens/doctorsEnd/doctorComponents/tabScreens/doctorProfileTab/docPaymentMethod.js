import React, {useState, useCallback, useEffect} from 'react'
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
import UserAvatar from '../../../../../assets/user_avatar.png';
import { Avatar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import docBg from '../../../../../assets/docBg.png';
import Component from '../../../../../assets/Component.png'; 
import nogot from '../../../../../assets/nogot.png';
import visa from '../../../../../assets/visa.png';
import BKash from '../../../../../assets/BKash.png';
import americanexpress from '../../../../../assets/americanexpress.png';
import { MaterialIcons } from '@expo/vector-icons';
import token from '../../../../../services/local_storage/storage';
import Loader from '../../../../modules/loader';
import config from '../../../../../services/config';
export default function DocPaymentMethodScreen({navigation}) {

    const [doc_payment, setDocPayment] = useState(null);
    const [is_loading, setLoading] = useState(true);

    async function getDoctorPaymentMethod() {
        let user_token = await token.getItem("token");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "doctor/doctor_acceptable_payment_methods", requestOptions)
        .then(response => response.text())
        .then(result => {
            let doctor_payment_data = JSON.parse(result);
            setDocPayment(doctor_payment_data);
            setLoading(false);
            // console.log('======doctor_payment_data======', doctor_payment_data)
        })
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
        getDoctorPaymentMethod()
    }, [])
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'}/>
                {
                    is_loading ? (
                        <Loader/>
                    ) : (
                        <View style={{
                            // marginBottom: 50
                            }}>
        
                            <View style={{
                                // flex: 1,marginTop:10
                            }}>
                                
        
                                <View style={{
                                    // marginTop: 40
                                }}>
                                    
                                    <FlatList 
                                        data={[
                                            { img: visa, key: '1' },
                                            { img: americanexpress, key: '2' },
                                            { img: Component, key: '3' },
                                            { img: BKash, key: '4' },
                                            { img: nogot, key: '5' },
                                            { key: '6' },
                                        ]}
                                        renderItem={({ item, index }) => (
        
                                            <View style={{
                                                flex: 1,
                                                alignItems: 'center',
                                                paddingVertical: 10
                                            }}>
                                                <Image source={item.img} />
                                            </View>
                                        )}
                                        numColumns={3}
                                        horizontal={false}
                                        keyExtractor={(item, index) => index.toString()}
                                        ListHeaderComponent={
                                            <View>
                                                <View style={{
                                                    justifyContent:'center',
                                                    alignItems:'flex-end',
                                                    marginVertical:10
                                                    }}>
                                                        <TouchableOpacity 
                                                            style={{
                                                                flexDirection: 'row',
                                                                backgroundColor: '#3AAD94',
                                                                paddingHorizontal:10,
                                                                paddingVertical: 5,
                                                                borderTopLeftRadius:100/2,
                                                                borderBottomLeftRadius:100/2
                                                            }}
                                                        >
                        
                                                            <MaterialIcons name="edit" size={16} color="#FFF" />
                                                            <Text style={{
                                                                color: '#FFF',
                                                                marginLeft: 5
                                                            }} >Edit</Text>
                        
                                                        </TouchableOpacity>
                                                </View>

                                                <Text style={{
                                                    fontSize:18,
                                                    fontWeight:'bold',
                                                    textAlign:'center',
                                                    color:'#3AAD94',
                                                    padding:12
                                                }}>Coming soon</Text>

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
