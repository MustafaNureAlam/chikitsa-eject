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
import { MaterialIcons } from '@expo/vector-icons';


export default function DocFeedbackScreen({navigation}) {
    return (
        <SafeAreaView style={{
            flex:1,justifyContent:'center',alignItems:'center'
            }}>
            <StatusBar backgroundColor={
                '#075141'
                }/>
            {/* <ScrollView>
                <View style={{
                    marginHorizontal: 15,
                    marginBottom: 50,marginTop:10
                    }}>
                    
                    <Text style={{
                        marginVertical: 10,
                        fontWeight: 'bold',
                        color: '#4A4B4D',
                        fontSize: 14
                    }}>
                        Reviews
                    </Text>
                    <FlatList 
                        data={[
                            { type: 'All', key: '1' },
                            { type: 'Negative', key: '2' },
                            { type: 'Positive', key: '3' },
                            { type: 'Neutral', key: '4' },
                            { type: 'Highlights', key: '5' }
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
                                        {item.type}
                                </Text>
                            </TouchableOpacity>
                        )}
                        horizontal={true}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    
                    <FlatList 
                        data={[
                            { img: UserAvatar, name: 'Dan Wells', details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took", type: 'Possitive', key: '1' },
                            { img: UserAvatar, name: 'Dan Wells', details: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took", type: 'Possitive', key: '2' },
                        ]}
                        renderItem={({ item }) => (
                            
                            <View style={{
                                padding: 10,
                                justifyContent: 'space-between',
                                backgroundColor: '#F9F9F9',
                                marginBottom: 5,
                                borderRadius: 15,
                                paddingHorizontal: 24
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginVertical: 5
                                }}>
                                    <Avatar.Image size={50} source={item.img} />
                                    <View style={{
                                        marginLeft: 10
                                    }}>
                                        <Text style={{
                                            color: '#3AAD94',
                                            fontWeight: 'bold',
                                            marginBottom: 2,
                                            fontSize: 14
                                        }}>{item.name}</Text>
                                        <Text style={{
                                            paddingVertical: 3, 
                                            paddingHorizontal: 10,
                                            backgroundColor: '#3AAD94',
                                            borderRadius: 50,
                                            fontWeight: 'bold',
                                            marginBottom: 10,
                                            color: '#FFFFFF',
                                            fontSize: 10
                                        }}>{item.type}</Text>
                                    </View>
                                </View>
                                <View style={{
                                }}>
                                    <Text style={{
                                        color: '#707070',
                                        fontWeight: 'bold',
                                        marginBottom: 2,
                                        fontSize: 10,
                                        color: '#B6B7B7'
                                    }}>{item.details}</Text>
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
