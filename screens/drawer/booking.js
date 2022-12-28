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
import { 
    Ionicons,
  } from '@expo/vector-icons';

export default function BookingScreen({navigation}) {
    
    const [checked, setChecked] = React.useState('first');

    return (
        <SafeAreaView style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <StatusBar backgroundColor={'#075141'} />
            {/* <ScrollView>
                <View style={{
                    flex:1,
                    marginHorizontal: 15
                }}>
                    
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: '#5ED4BA',
                        borderRadius: 50,
                        marginVertical: 15
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
                        <TouchableOpacity 
                            style={{
                            
                            }}>
                            <Ionicons style={{
                                marginLeft:5
                            }} name='mic-outline' size={24} color={'#fff'} />
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 15
                    }}>Top Booked Diagnostic tests</Text>

                    
                    <FlatList 
                        data={[
                            { testName: 'Blood Test', key: '1' },
                            { testName: 'Urine Test', key: '2' }
                        ]}
                        renderItem={({ item }) => (
                            <Text style={{ 
                                flex:1,
                                paddingVertical: 15,
                                paddingHorizontal: 20,
                                marginBottom: 5,
                                fontWeight: 'bold',
                                backgroundColor: '#D9FFF0',
                                borderRadius: 8,
                                color: '#3AAD94'
                                }}>
                                    {item.testName}
                            </Text>
                        )}
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginTop: 20,
                        marginBottom: 15
                    }}>Health Checkup {'&'} Screening</Text>

                    
                    <FlatList 
                        data={[
                            { testName: 'Fever', key: '1' },
                            { testName: 'Diabetes', key: '2' },
                            { testName: 'Kidney', key: '3' },
                            { testName: 'Urine Test', key: '4' }
                        ]}
                        renderItem={({ item }) => (
                            <Text style={{ 
                                flex:1,
                                paddingVertical: 10, 
                                paddingHorizontal: 25,
                                marginRight: 5,
                                borderColor: '#9CC2BA',
                                borderRadius: 8,
                                fontWeight: 'bold',
                                borderWidth: 1,
                                marginBottom: 20,
                                color: '#3AAD94'
                                }}>
                                    {item.testName}
                            </Text>
                        )}
                        // numColumns={3}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginBottom: 15
                    }}>Top Booked Diagnostic tests</Text>

                    
                    <FlatList 
                        data={[
                            { testName: 'Blood Test', key: '1' },
                            { testName: 'Urine Test', key: '2' }
                        ]}
                        renderItem={({ item }) => (
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: 5,
                                backgroundColor: '#D9FFF0',
                                borderRadius: 8,
                                paddingHorizontal: 20,
                                alignItems: 'center'
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
                                color: '#3AAD94',
                                marginLeft: 10
                                }}>
                                    {item.testName}
                            </Text>
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