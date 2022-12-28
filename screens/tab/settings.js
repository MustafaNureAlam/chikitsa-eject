import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import { RadioButton, Checkbox, Switch } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import RNPickerSelect from 'react-native-picker-select';

export default function SettingsScreen({navigation, route}) {

    const isMounted = useRef(true);

    const [value, setValue] = useState('second');
    const [isAlarm, setAlarm] = useState(false);
    const [isNotify, setNotify] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [isAlarmOn, setIsAlarmOn] = useState(false);
    const [pick_lang, setIsLang] = useState("");

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff',paddingHorizontal:4}}>
            <StatusBar backgroundColor={'#075141'}/>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                
                <View style={{flex: 1, paddingHorizontal: 12}}>
                    <View style={{
                        marginTop: 24,
                        flex:1,
                        borderWidth:.5,
                        borderRadius:4
                    }}>
                        <RNPickerSelect
                            onValueChange={(value) => {
                                console.log(value)
                                setIsLang(value)
                                Toast.show({
                                    type: 'success',
                                    text1: 'New feature',
                                    text2: 'Coming soon!'
                                });
                            }}
                            items={[
                                { label: 'Bangla', value: 'bangla' },
                                { label: 'English', value: 'english' },
                            ]}
                            // style={{}}
                            value={pick_lang}
                            useNativeAndroidPickerStyle={true}
                            style={{ inputAndroid: { color: 'black' } }}
                            placeholder={{label: 'Selected language',color:'#ccc',value:""}}
                        />
                    </View>
                    
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginVertical: 8
                    }}>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',
                        }}>
                            Receive push notifications
                        </Text>
                        <Switch 
                            value={isSwitchOn} 
                            // onValueChange={onToggleSwitch} 
                            onChange={() => {
                                Toast.show({
                                    type: 'success',
                                    text1: 'Coming soon!'
                                });
                            }}
                        />
                    </View>

                    

                    <View style={{
                        flex:1,
                        // backgroundColor:'#ccc'
                    }}>
                        <RadioButton.Group 
                            onValueChange={value => setValue(value)} 
                            value={value}
                            
                        >
                            <RadioButton.Item 
                                mode="ios" 
                                color="#3AAD94" 
                                label="Only when screen is 'on'" 
                                value="first" 
                                disabled
                                labelStyle={{fontSize:14,fontWeight:'bold',color:'#ccc'}}
                            />
                            <RadioButton.Item 
                                mode="ios" 
                                color="#3AAD94" 
                                label="Only when screen is 'off'" 
                                value="second"
                                disabled 
                                labelStyle={{fontSize:14,fontWeight:'bold',color:'#ccc'}}
                            />
                            <RadioButton.Item 
                                mode="ios" 
                                color="#3AAD94" 
                                label="Always show popup" 
                                value="third" 
                                disabled
                                labelStyle={{fontSize:14,fontWeight:'bold',color:'#ccc'}}
                            />
                        </RadioButton.Group>
                    </View>
                    
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginVertical: 8
                    }}>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold'
                        }}>
                            Auto alarming
                        </Text>
                        <Switch 
                            value={isAlarmOn} 
                            // onValueChange={onToggleSwitch} 
                            onChange={() => {
                                Toast.show({
                                    type: 'success',
                                    text1: 'Coming soon!'
                                });
                            }}
                        />
                    </View>
                    
                    
                    <TouchableOpacity 
                        style={{
                            backgroundColor: '#3AAD94',
                            borderRadius: 50,
                            paddingVertical: 8,
                            marginVertical: 8
                        }}
                        onPress={() => {
                            Toast.show({
                                type: 'success',
                                text1: 'New feature',
                                text2: 'Coming soon!'
                            });
                        }}
                    >
                        <Text style={{
                            color: '#FFF',
                            textAlign: 'center',
                            fontSize: 18,
                            fontWeight:'bold'
                        }}>
                            Save
                        </Text>
                    </TouchableOpacity>
                    
                    <View style={{
                        marginVertical:4
                    }}>
                        <TouchableOpacity>
                            <Text style={{
                                textAlign: 'center',
                                color: '#3AAD94',
                                fontSize: 14,
                                marginVertical: 4,
                                opacity: .5,
                                fontWeight:'bold'
                            }}>
                                Help {'\u0026'} Support
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{
                                textAlign: 'center',
                                color: '#3AAD94',
                                fontSize: 14,
                                marginVertical: 4,
                                opacity: .5,
                                fontWeight:'bold'
                            }}>
                                Contact Us
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{
                                textAlign: 'center',
                                color: '#3AAD94',
                                fontSize: 14,
                                marginVertical: 4,
                                opacity: .5,
                                fontWeight:'bold'
                            }}>
                                Invite {'\u0026'} Earn
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{
                                textAlign: 'center',
                                color: '#3AAD94',
                                fontSize: 14,
                                marginVertical: 4,
                                opacity: .5,
                                fontWeight:'bold'
                            }}>
                                Feedback
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}