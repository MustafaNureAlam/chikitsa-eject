import React from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    FlatList
} from 'react-native'
import UserAvatar from '../../assets/user_avatar.png';
import { Avatar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

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
                        flex: 1,
                        flexDirection: 'row',
                        marginVertical: 10
                    }}>
                        <Text style={{
                            width: '50%'
                        }}>Location</Text>
                        <Text style={{
                            width: '50%',
                            color: '#3AAD94',
                            fontWeight: 'bold'
                        }}>House 16, Road 15, Syedabad, Dhaka</Text>
                    </View>
                    
                    <Text style={{
                        marginVertical: 10
                    }}>
                        Allergies
                    </Text>


                    <FlatList 
                        data={[
                            { testName: 'Dust', key: '1' },
                            { testName: 'Water', key: '2' }
                        ]}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Text style={{ 
                                    flex:1,
                                    paddingVertical: 5, 
                                    paddingHorizontal: 20,
                                    marginRight: 5,
                                    borderColor: '#3AAD94',
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
                    
                    <Text style={{
                        marginVertical: 10
                    }}>
                        Current Medication:
                    </Text>


                    <FlatList 
                        data={[
                            { testName: 'Diabetes', key: '1' },
                            { testName: 'Kidney', key: '2' },
                            { testName: 'Thyroid', key: '3' }
                        ]}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Text style={{ 
                                    flex:1,
                                    paddingVertical: 5, 
                                    paddingHorizontal: 20,
                                    marginRight: 5,
                                    borderColor: '#3AAD94',
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
                    
                    <Text style={{
                        marginVertical: 10
                    }}>
                        Past Medication:
                    </Text>

                    <FlatList 
                        data={[
                            { testName: 'Diabetes', key: '1' },
                            { testName: 'Kidney', key: '2' },
                            { testName: 'Thyroid', key: '3' }
                        ]}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <Text style={{ 
                                    flex:1,
                                    paddingVertical: 5, 
                                    paddingHorizontal: 20,
                                    marginRight: 5,
                                    borderColor: '#3AAD94',
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

                    <Text style={{
                        marginVertical: 10
                    }}>
                        Injuries
                    </Text>
                    
                    <Text style={{
                        marginVertical: 10
                    }}>
                        Surgeries
                    </Text>
                </View>
            </ScrollView> */}
            <Text>
                COMING SOON!
            </Text>
        </SafeAreaView>
    )
}