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
import UserAvatar from '../../assets/user_avatar.png';
import { Avatar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import docBg from '../../assets/docBg.png';
import { MaterialIcons } from '@expo/vector-icons';

export default function MyDoctorScreen({navigation}) {
    return (
        <SafeAreaView style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <StatusBar backgroundColor={'#075141'}/>
            {/* <ScrollView>
                <View style={{
                    marginHorizontal: 15,
                    marginBottom: 50
                    }}>
                    <View style={{
                        flex:1,
                        justifyContent:'center', 
                        alignItems:'center',
                        height:220,
                        marginTop: 15
                        }}>
                        <View style={{
                            position: 'absolute',
                            top: 0,
                        }}>
                            <Image source={docBg} />
                        </View>
                        <View style={{
                            marginVertical:7,
                            marginTop: 50
                            }}>
                            <Avatar.Image size={80} source={UserAvatar} />
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
                                        <Feather name="camera"  size={16} color={'#fff'} transform={`translateY(20)`} />
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
                        flex: 1
                    }}>
                        <View style={{
                            position: 'absolute',
                            right: -40,
                            flexDirection: 'row',
                            backgroundColor: '#3AAD94',
                            borderRadius: 50,
                            paddingLeft: 20,
                            paddingRight: 60,
                            paddingVertical: 5
                        }}>
                            <MaterialIcons name="edit" size={16} color="#FFF" />
                            <Text style={{
                                color: '#FFF',
                                marginLeft: 5
                            }} >Edit</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginTop: 40
                        }}>
                            <Text style={{
                                width: '50%'
                            }}>Specialization Sector:</Text>
                            <Text style={{
                                width: '50%',
                                color: '#3AAD94',
                                fontWeight: 'bold'
                            }}>ENT</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginVertical: 10
                        }}>
                            <Text style={{
                                width: '50%'
                            }}>Qualifications:</Text>
                            <Text style={{
                                width: '50%',
                                color: '#3AAD94',
                                fontWeight: 'bold'
                            }}>MBBS, MS - ENT</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginVertical: 10
                        }}>
                            <Text style={{
                                width: '50%'
                            }}>Experience::</Text>
                            <Text style={{
                                width: '50%',
                                color: '#3AAD94',
                                fontWeight: 'bold'
                            }}>18 years</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            marginVertical: 10
                        }}>
                            <Text style={{
                                width: '50%'
                            }}>Clinic Address:</Text>
                            <View style={{
                                width: '50%',
                            }}>
                                <Text style={{
                                    color: '#3AAD94',
                                    fontWeight: 'bold'
                                }}>House 14, Road 15
                                Sonargaon road,
                                Dhaka 1230</Text>
                                <TouchableOpacity>
                                    <Text style={{
                                        color: '#36AAD6'
                                    }}>View in map</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Text style={{
                        marginVertical: 10
                    }}>
                        In-clinic Appointment (200 BDT):
                    </Text>
                    <FlatList 
                        data={[
                            { testName: 'Sun', key: '1' },
                            { testName: 'Mon', key: '2' },
                            { testName: 'Tue', key: '3' },
                            { testName: 'Wed', key: '4' },
                            { testName: 'Thur', key: '5' },
                            { testName: 'Fri', key: '6' }
                        ]}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Text style={{ 
                                    flex:1,
                                    paddingVertical: 5, 
                                    paddingHorizontal: 20,
                                    marginRight: 5,
                                    borderColor: '#000',
                                    borderRadius: 50,
                                    fontWeight: 'bold',
                                    borderWidth: .5,
                                    marginBottom: 10,
                                    color: '#000'
                                    }}>
                                        {item.testName}
                                </Text>
                            </TouchableOpacity>
                        )}
                        // numColumns={3}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <Text style={{
                        marginVertical: 10
                    }}>
                        Video Consultation (100 BDT):
                    </Text>

                    <FlatList 
                        data={[
                            { testName: 'Today', key: '1' },
                            { testName: 'Tomorrow', key: '2' }
                        ]}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Text style={{ 
                                    flex:1,
                                    paddingVertical: 5, 
                                    paddingHorizontal: 20,
                                    marginRight: 5,
                                    borderColor: '#9CC2BA',
                                    borderRadius: 50,
                                    fontWeight: 'bold',
                                    borderWidth: .5,
                                    marginBottom: 10,
                                    color: '#3AAD94'
                                    }}>
                                        {item.testName}
                                </Text>
                            </TouchableOpacity>
                        )}
                        // numColumns={3}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <View style={{
                        flex: 1,
                        alignItems: 'center'
                    }}>
                        <TouchableOpacity>
                            <Text style={{
                                paddingHorizontal: 40,
                                paddingVertical: 5,
                                marginVertical: 10,
                                color: '#FFF',
                                borderRadius: 50,
                                backgroundColor: '#3AAD94'
                            }}>
                                Edit Slot
                            </Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView> */}
            <Text>
                COMING SOON!
            </Text>
        </SafeAreaView>
    )
}