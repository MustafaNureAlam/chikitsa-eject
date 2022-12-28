import React from 'react'
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
import { Feather, FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import UserAvatar from '../../../../../assets/user_avatar.png'

export default function DocWalletScreen({navigation}) {
    return (
        <SafeAreaView style={{
            flex:1, backgroundColor:'#fff'
            }}>
            <StatusBar backgroundColor={
                '#075141'
                }/>
            <ScrollView>
                <View style={{
                    marginBottom: 50,marginTop:10
                    }}>
                    
                    <View style={{
                        justifyContent:'center',
                        alignItems:'flex-end'
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

                    <View style={{
                        flex: 1,marginHorizontal:10
                    }}>
                        <Text style={{
                            color: '#7B93A4',
                            marginHorizontal: 24,
                            fontWeight: 'bold',
                            marginVertical: 10
                        }} >Today</Text>
                        <FlatList 
                            data={[
                                { img: UserAvatar, name: 'Dan Wells', price: '+BDT 500', time: '12:05 PM', wayToTrancefer: 'Money received from NDC Bank', key: '1' },
                                { img: UserAvatar, name: 'Dan Wells', price: '+BDT 500', time: '12:05 PM', wayToTrancefer: 'Money received from NDC Bank', key: '2' },
                            ]}
                            renderItem={({ item }) => (
                                
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingVertical: 5,
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    borderBottomColor: '#D5DCDB',
                                    borderBottomWidth: 1,
                                    paddingHorizontal: 24
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Avatar.Image size={50} source={item.img} />
                                        <View style={{
                                            marginLeft: 10
                                        }}>
                                            <Text style={{
                                                color: '#707070',
                                                fontWeight: 'bold',
                                                marginBottom: 2,
                                                fontSize: 14
                                            }}>{item.name}</Text>
                                            <Text style={{
                                                color: '#707070',
                                                fontSize: 12,
                                                fontWeight: 'bold'
                                            }}>{item.wayToTrancefer}</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                    }}>
                                        <Text style={{
                                            color: '#707070',
                                            fontWeight: 'bold',
                                            marginBottom: 2,
                                            fontSize: 14,
                                            color: '#008A2E'
                                        }}>{item.price}</Text>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            fontSize: 12,
                                            color: '#707070'
                                        }}>{item.time}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            numColumns={1}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        
                        <Text style={{
                            color: '#7B93A4',
                            marginHorizontal: 24,
                            fontWeight: 'bold',
                            marginVertical: 10
                        }} >Yesterday</Text>
                        <FlatList 
                            data={[
                                { img: UserAvatar, name: 'Dan Wells', price: '+BDT 500', time: '12:05 PM', wayToTrancefer: 'Money received from NDC Bank', key: '1' },
                                { img: UserAvatar, name: 'Dan Wells', price: '+BDT 500', time: '12:05 PM', wayToTrancefer: 'Money received from NDC Bank', key: '2' },
                            ]}
                            renderItem={({ item }) => (
                                
                                <TouchableOpacity style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    paddingVertical: 5,
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    backgroundColor: '#EFF9F7',
                                    borderBottomColor: '#D5DCDB',
                                    borderBottomWidth: 1,
                                    paddingHorizontal: 24
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Avatar.Image size={50} source={item.img} />
                                        <View style={{
                                            marginLeft: 10
                                        }}>
                                            <Text style={{
                                                color: '#707070',
                                                fontWeight: 'bold',
                                                marginBottom: 2,
                                                fontSize: 14
                                            }}>{item.name}</Text>
                                            <Text style={{
                                                color: '#707070',
                                                fontSize: 12,
                                                fontWeight: 'bold'
                                            }}>{item.wayToTrancefer}</Text>
                                        </View>
                                    </View>
                                    <View style={{
                                    }}>
                                        <Text style={{
                                            color: '#707070',
                                            fontWeight: 'bold',
                                            marginBottom: 2,
                                            fontSize: 14,
                                            color: '#008A2E'
                                        }}>{item.price}</Text>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            fontSize: 12,
                                            color: '#707070'
                                        }}>{item.time}</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            numColumns={1}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
