import React from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    FlatList
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import { Entypo } from '@expo/vector-icons';
import { 
    Ionicons,
  } from '@expo/vector-icons';

export default function DrawerHomeScreen({navigation}) {

    const [checked, setChecked] = React.useState('first');

    return (
        <SafeAreaView style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <StatusBar backgroundColor={'#075141'} />
            {/* <ScrollView>
                <View style={{
                    flex:1,
                    marginHorizontal: 15,
                    paddingBottom: 50
                }}>
                    <View style={{
                        // backgroundColor: '#E6E6E6',
                        marginVertical: 15,
                        borderTopEndRadius: 25,
                        borderTopStartRadius: 25,
                        borderBottomEndRadius: 8,
                        borderBottomStartRadius: 8
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#5ED4BA',
                            borderRadius: 50,
                            marginBottom: 20
                        }}>
                            <TextInput 
                                
                                placeholder='Search'
                                style={{
                                    // borderWidth:1,
                                    width:'85%',
                                    borderRadius:100/2,
                                    paddingHorizontal:10,
                                    paddingVertical:3,
                                    backgroundColor:'#fff',
                                    height:50,
                                    fontSize:14,
                                    fontWeight:'bold'
                                }}
                            />
                            <TouchableOpacity>
                                <Ionicons style={{
                                    marginLeft:5
                                }} name='mic-outline' size={24} color={'#fff'} />
                            </TouchableOpacity>
                            
                        </View>
                    
                        <FlatList 
                            data={[
                                { testName: 'Piles Surgery', key: '1' },
                                { testName: 'Hair Loss', key: '2' },
                                { testName: 'Ear Wax', key: '3' },
                                { testName: 'Cold & Cough', key: '4' },
                                { testName: 'Sexual Health', key: '5' },
                                { testName: 'Stomach pain', key: '6' }
                            ]}
                            renderItem={({ item }) => (
                                <View style={{
                                    flex: 1,
                                    marginBottom: 5,
                                    backgroundColor: '#fff',
                                    marginHorizontal: 5,
                                    paddingHorizontal: 10,
                                }}>
                                        
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            flex: 1,
                                        }}>
                                            
                                            <RadioButton
                                            value="second"
                                            status={ checked === 'second' ? 'checked' : 'unchecked' }
                                            onPress={() => setChecked('second')}
                                            />
                                                
                                            <Text style={{ 
                                                flex:1,
                                                fontWeight: 'bold',
                                                paddingVertical: 15,
                                                color: '#808080',
                                                marginLeft: 10
                                                }}>
                                                    {item.testName}
                                            </Text>
                                        </View>
                                        <View style={{
                                            flex: 1,
                                            alignItems: 'flex-end'
                                        }}>
                                            <Entypo name="chevron-thin-right" size={24} color="black" />
                                        </View>
                                    </View>
                                </View>
                            )}
                            numColumns={1}
                            keyExtractor={(item, index) => index.toString()}
                        />

                        <Text style={{
                            textAlign: 'center',
                            color: '#808080',
                            marginBottom: 40,
                            marginTop: 10
                        }}>
                            End of results
                        </Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={{
                            backgroundColor: '#3AAD94',
                            color: '#FFF',
                            borderRadius: 50,
                            paddingVertical: 15,
                            textAlign: 'center',
                            marginHorizontal: 10,
                            fontSize: 18
                        }}>Search</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView> */}
            <Text>
                COMING SOON!
            </Text>
        </SafeAreaView>
    )
}