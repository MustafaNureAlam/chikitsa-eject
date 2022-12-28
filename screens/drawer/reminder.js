import React from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    FlatList,
    Image
} from 'react-native'
import UserAvatar from '../../assets/user_avatar.png';
import { Avatar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import SugarFree from '../../assets/medicine-bottle-mockup.png';

export default function MedicalReportScreen({navigation}) {
    return (
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <StatusBar backgroundColor={'#075141'}/>
            {/* <ScrollView>
                <View style={{
                    flex:1,
                    marginHorizontal: 15
                    }}>
                    <View style={{
                        flex:1,
                        justifyContent:'center', 
                        alignItems:'center',
                        height:200
                        }}>
                        <View style={{
                            marginVertical:7
                            }}>
                            <Avatar.Image size={100} source={UserAvatar} />
                            <View style={{
                                position:'absolute',
                                top:'50%',
                                right: -14,
                                flexDirection:'row',
                                justifyContent:'space-between',
                                transform: [{translateY: -14}],
                                }}>
                                    <TouchableOpacity style={{
                                        backgroundColor: '#3AAD94', 
                                        borderRadius: 50, 
                                        padding: 8 
                                        }}>
                                        <Feather name="camera"  size={20} color={'#fff'} transform={`translateY(20)`} />
                                    </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{
                            fontSize:18,
                            fontWeight:'bold',
                            color:'#000',
                            marginVertical:3
                            }}>
                            Hi, Mahfuz
                        </Text>
                    </View>

                    <View style={{
                        height: 25,
                    }}>
                        <Text style={{
                            position: 'absolute',
                            right: 0,
                            paddingLeft: 10,
                            paddingRight: 20,
                            backgroundColor: '#3AAD94',
                            borderRadius: 8,
                            color: '#FFF',
                            paddingVertical: 3
                        }}>Today</Text>
                    </View>

                    <FlatList 
                        data={[
                            { productName: 'Sugar free gold', productQuantity: 'bottle of 500 pellets', productImage: SugarFree, time: 'Today at 2 PM', key: '1' },
                            { productName: 'Sugar free gold', productQuantity: 'bottle of 500 pellets', productImage: SugarFree, time: 'Tonight at 8 PM', key: '2' },
                        ]}
                        renderItem={({ item }) => (
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                marginBottom: 10,
                            }}>
                                <Image source={item.productImage}/>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    margin: 5
                                }}>
                                    <View>
                                        <Text>{item.productName}</Text>
                                        <Text>{item.productQuantity}</Text>
                                    </View>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                        color: '#217865'
                                    }}>
                                        {item.time}
                                    </Text>
                                </View>
                            </View>
                        )}
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={{
                        height: 25,
                    }}>
                        <Text style={{
                            position: 'absolute',
                            right: 0,
                            paddingLeft: 10,
                            paddingRight: 20,
                            backgroundColor: '#3AAD94',
                            borderRadius: 8,
                            color: '#FFF',
                            paddingVertical: 3
                        }}>Tomorrow</Text>
                    </View>

                    <FlatList 
                        data={[
                            { productName: 'Sugar free gold', productQuantity: 'bottle of 500 pellets', productImage: SugarFree, productPrice: '250 Tk', key: '1' },
                            { productName: 'Sugar free gold', productQuantity: 'bottle of 500 pellets', productImage: SugarFree, productPrice: '180 Tk', key: '2' },
                        ]}
                        renderItem={({ item }) => (
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                marginBottom: 10,
                            }}>
                                <View>
                                    <Image source={item.productImage}/>
                                    <Text style={{
                                        position: 'absolute',
                                        top: '60%',
                                        left: 0,
                                        color: '#fff',
                                        backgroundColor: '#3AAD94',
                                        paddingVertical: 2,
                                        paddingHorizontal: 5,
                                        fontSize: 10,
                                        fontWeight: 'bold',
                                    }}>Refill</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    margin: 5
                                }}>
                                    <View>
                                        <Text>{item.productName}</Text>
                                        <Text>{item.productQuantity}</Text>
                                    </View>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 20,
                                        color: '#000'
                                    }}>
                                        {item.productPrice}
                                    </Text>
                                </View>
                            </View>
                        )}
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </View>
            </ScrollView> */}
            <Text>
                COMING SOON!
            </Text>
        </SafeAreaView>
    )
}