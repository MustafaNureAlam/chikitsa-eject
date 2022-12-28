import React, { useState } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    StyleSheet,
    Dimensions,
    FlatList
} from 'react-native';

import doctorProfile from '../../../../assets/doctorProfile.png';
import badge from '../../../../assets/badge.png';
import badgeIcon from '../../../../assets/badgeIcon.png';
import uplodIcon from '../../../../assets/uplodIcon.png';
import phoneIcon from '../../../../assets/phoneIcon.png';
import messageIcon from '../../../../assets/messageIcon.png';

import { 
    Feather,
    FontAwesome5,
    FontAwesome,
    EvilIcons,
    Entypo,
    MaterialCommunityIcons
} from '@expo/vector-icons';

import {Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Button } from 'react-native-paper';

export default function MyPatientsScreen(navigation) {

    const [text, setText] = React.useState("");

    return (
        <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <StatusBar backgroundColor={'#075141'} />
            <Text>Coming soon !</Text>
                {/* <View style={{flex:1, marginHorizontal: 24, marginTop: 50}}>
                    
                    <FlatList 
                        data={[
                            { img: doctorProfile, name: 'Kudrat e Khuda', bloodAndAge: 'B+ ve 18 years', gender: 'Male', degree: 'MBBS, MS - ENT', badge: badge, key: '1' },
                            { img: doctorProfile, name: 'Kudrat e Khuda', bloodAndAge: 'B+ ve 18 years', gender: 'Male', degree: 'MBBS, MS - ENT', badge: badge, key: '2' }
                        ]}
                        renderItem={({ item }) => (
                            
                            <View style={{ flex:1,
                                flexDirection: 'row',
                                paddingVertical: 5,
                                marginBottom: 5,
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                backgroundColor: '#EDF8F5',
                                padding: 10,
                                borderRadius: 15
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <View style={{
                                        alignItems: 'center'
                                    }}>
                                        <Image source={item.img} />
                                        <Text style={{
                                            color: '#091C3F',
                                            fontWeight: 'bold',
                                            fontSize: 12
                                        }}>Status</Text>
                                        <TouchableOpacity>
                                            <Text style={{
                                                color: '#FFFFFF',
                                                backgroundColor: '#3AAD94',
                                                fontSize: 14,
                                                paddingHorizontal: 10,
                                                paddingVertical: 5,
                                                borderRadius: 8,
                                            }}>Ongoing</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        marginLeft: 10,
                                        alignItems: 'flex-start'
                                    }}>
                                        <View style={{
                                            flexDirection: 'row'
                                        }}>
                                            <Text style={{
                                                color: '#091C3F',
                                                fontWeight: 'bold',
                                                marginBottom: 2,
                                                fontSize: 14
                                            }}>{item.name}</Text>
                                            <Text style={{
                                                color: '#8493A2',
                                                fontWeight: 'bold',
                                                marginBottom: 2,
                                                fontSize: 14
                                            }}> -{item.gender}</Text>
                                        </View>
                                        <Text style={{
                                            color: '#8493A2',
                                            fontWeight: 'bold',
                                            marginBottom: 2,
                                            fontSize: 14
                                        }}>{item.bloodAndAge}</Text>
                                        <Text style={{
                                            color: '#091C3F',
                                            marginBottom: 2,
                                            fontSize: 12
                                        }}>{item.degree}</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            marginVertical: 5
                                        }}>
                                            <TouchableOpacity>
                                                <Text style={{
                                                    color: '#FFFFFF',
                                                    backgroundColor: '#3AAD94',
                                                    marginBottom: 2,
                                                    fontSize: 14,
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 5,
                                                    borderRadius: 8,
                                                    marginRight: 5
                                                }}>Set Reminder</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity>
                                                <Text style={{
                                                    color: '#FFFFFF',
                                                    backgroundColor: '#3AAD94',
                                                    marginBottom: 2,
                                                    fontSize: 12,
                                                    paddingHorizontal: 10,
                                                    paddingVertical: 5,
                                                    borderRadius: 8,
                                                }}>View EHR</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row'
                                        }}>
                                            <TouchableOpacity style={{
                                                marginRight: 5
                                            }}>
                                                <Image source={uplodIcon} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{
                                                marginRight: 5
                                            }}>
                                                <Image source={messageIcon} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{
                                                marginRight: 5
                                            }}>
                                                <Image source={phoneIcon} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{
                                                marginRight: 5
                                            }}>
                                                <Image source={badgeIcon} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                        numColumns={1}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View> */}
        </SafeAreaView>
    )
}
