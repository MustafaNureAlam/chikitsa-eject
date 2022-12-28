import React, { useState } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    StatusBar
} from 'react-native';

export default function NurseAddNewPatient({navigation}) {

    
  const [text, setText] = React.useState("");
  const [age, setAge] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [number, setNumber] = React.useState("");
    return (
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <StatusBar backgroundColor={'#075141'} />
            {/* <View style={{
                flex: 1,
                marginHorizontal: 24
            }}>
                <View style={{
                    marginTop: 50
                }}>
                    <TextInput
                        placeholder='Name'
                        placeholderTextColor={'#3AAD94'}
                        value={text}
                        style={{
                            fontWeight: 'bold',
                            color: '#3AAD94',
                            fontSize: 18,
                            paddingHorizontal: 10,
                            borderBottomColor: '#3AAD94',
                            paddingVertical: 5,
                            borderBottomWidth: 2
                        }}
                        onChangeText={text => setText(text)}
                    />
                    <View style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginVertical: 20
                    }}>
                        <TextInput
                            placeholder='Age'
                            placeholderTextColor={'#3AAD94'}
                            value={age}
                            style={{
                                fontWeight: 'bold',
                                width: '45%',
                                color: '#3AAD94',
                                fontSize: 18,
                                paddingHorizontal: 10,
                                borderBottomColor: '#3AAD94',
                                paddingVertical: 5,
                                borderBottomWidth: 2
                            }}
                            onChangeText={age => setAge(age)}
                        />
                        <TextInput
                            placeholder='Gender'
                            placeholderTextColor={'#3AAD94'}
                            value={gender}
                            style={{
                                fontWeight: 'bold',
                                width: '45%',
                                color: '#3AAD94',
                                fontSize: 18,
                                paddingHorizontal: 10,
                                borderBottomColor: '#3AAD94',
                                paddingVertical: 5,
                                borderBottomWidth: 2
                            }}
                            onChangeText={gender => setGender(gender)}
                        />
                    </View>
                    <TextInput
                        placeholder='Contacts Number'
                        placeholderTextColor={'#3AAD94'}
                        value={number}
                        style={{
                            fontWeight: 'bold',
                            color: '#3AAD94',
                            fontSize: 18,
                            paddingHorizontal: 10,
                            borderBottomColor: '#3AAD94',
                            paddingVertical: 5,
                            borderBottomWidth: 2
                        }}
                        onChangeText={number => setNumber(number)}
                    />
                    
                    <TouchableOpacity style={{
                        backgroundColor:'#3AAD94',
                        paddingVertical:10,
                        paddingHorizontal:20,
                        borderRadius: 50,
                        marginTop: 50
                        }}>
                        <Text style={{
                            fontSize:14,
                            fontWeight:'bold',
                            padding:3,
                            textAlign:'center',
                            color:'#fff'
                        }}>
                            Done
                        </Text>
                    </TouchableOpacity>
                </View>
            </View> */}
            <Text>
                COMING SOON!
            </Text>
        </SafeAreaView>
    )
}