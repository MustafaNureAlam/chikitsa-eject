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
import { Toast } from 'react-native-toast-message/lib/src/Toast';
export default function NursePaymentMethodScreen({navigation}) {
    return (
        <SafeAreaView style={{
            flex:1,backgroundColor:'#fff'
            }}>
            <StatusBar backgroundColor={
                '#075141'
                }/>
            <ScrollView>
                <View style={{
                    marginBottom: 50
                    }}>

                    <View style={{
                        flex: 1,marginTop:10
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
                            marginTop: 40
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
                                renderItem={({ item }) => (

                                    <TouchableOpacity 
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            paddingVertical: 10
                                        }}
                                        onPress={() => {
                                            Toast.show({
                                                type : "success",
                                                text1 : "coming soon!"
                                            })
                                        }}
                                    >
                                        <View     
                                        >
                                            <Image source={item.img} />
                                        </View>
                                    </TouchableOpacity>
                                )}
                                numColumns={3}
                                horizontal={false}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
