import React, {useState} from 'react'
import { 
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image
} from 'react-native';
import { 
    Ionicons,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Octicons,
    Entypo,
    Fontisto,
    MaterialIcons,
    Feather
} from '@expo/vector-icons';

import UserAvatar from '../../../../assets/user_avatar.png';
import { RadioButton, Avatar } from 'react-native-paper';

export default function RequestOrgan() {

    const [parts, setParts] = useState('Lungs');
    

    return(
        <ScrollView>
            <View style={{backgroundColor:'#fff'}}>

                <View style={{
                    marginVertical:5,
                    marginHorizontal:10
                }}>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}>
                        <Text style={styles.checkItemStyle}>Group</Text>
                        <RadioButton.Group  onValueChange={newValue => setParts(newValue)} value={parts}>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <RadioButton value="Lungs" />
                                    <Text style={styles.radioTxtStyle}>Lungs</Text>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <RadioButton value="Kidney" />
                                    <Text style={styles.radioTxtStyle}>Kidney</Text>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <RadioButton value="Heart" />
                                    <Text style={styles.radioTxtStyle}>Heart</Text>
                                </View>
                                <View style={{flexDirection:'row',alignItems:'center'}}>
                                    <RadioButton value="Eye" />
                                    <Text style={styles.radioTxtStyle}>Eye</Text>
                                </View>
                            </View>
                        </RadioButton.Group>
                    </View>

                    <View style={{
                        flexDirection:'row',
                    }}>
                        <Text style={styles.checkItemStyle}>Amount</Text>
                        <View style={{
                            flexDirection:'row',
                            marginHorizontal:24,
                            alignItems:'center'
                        }}>
                            <TouchableOpacity>
                                <AntDesign name="minuscircleo" size={22} color="#3AAD94" />
                            </TouchableOpacity>
                            <Text style={{padding:5,fontWeight:'bold',fontSize:14,marginHorizontal:5}}>1</Text>
                            <TouchableOpacity>
                                <AntDesign name="pluscircleo" size={22} color="#3AAD94" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between'
                    }}>
                        <Text style={styles.checkItemStyle}>Phone Number</Text>
                        <TextInput 
                            placeholder='01675******'
                            style={{
                                borderBottomWidth:.5,
                                borderBottomColor:'#3AAD94',
                                padding:5,
                                marginHorizontal:20,
                                width:'50%',
                                color:'#70707B'
                            }}
                        />
                    </View>

                    <View style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between'
                    }}>
                        <Text style={styles.checkItemStyle}>Date</Text>
                        <TextInput 
                            placeholder='DD/MM/YYYY'
                            style={{
                                borderBottomWidth:.5,
                                borderBottomColor:'#3AAD94',
                                padding:5,
                                marginHorizontal:20,
                                width:'50%',
                                color:'#70707B'
                            }}
                        />
                    </View>

                    
                    <View style={{
                        flexDirection:'row',
                        alignItems:'center',
                        justifyContent:'space-between'
                    }}>
                        <Text style={styles.checkItemStyle}>Address</Text>
                        <TextInput 
                            placeholder='Address'
                            style={{
                                borderBottomWidth:.5,
                                borderBottomColor:'#3AAD94',
                                padding:5,
                                marginHorizontal:20,
                                width:'50%',
                                color:'#70707B'
                            }}
                        />
                    </View>
                    
                </View>


                <View style={{
                    marginVertical:15,
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                    <TouchableOpacity style={{
                        backgroundColor:'#3AAD94',
                        paddingVertical:10,
                        paddingHorizontal:15,
                        borderRadius:10
                    }}>
                        <Text style={{
                            color:'#fff',
                            fontSize:16,
                            fontWeight:'bold',
                            textAlign:'center'
                        }}>Request</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{
                    fontWeight:'bold',
                    fontSize:13,
                    color:'#7B93A4',
                    padding:10,
                    marginHorizontal:10
                }}>Today's feed</Text>
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    marginHorizontal:10,
                    padding:5,
                    marginVertical:10
                }}>
                    
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-around'
                    }}>
                        <View style={{

                        }}>
                            <Avatar.Image size={40} source={UserAvatar} />
                        </View>
                        <View style={{
                            justifyContent:'center',
                            alignItems:'flex-start',
                            marginHorizontal:10
                        }}>
                            <Text style={{
                                fontSize:14,
                                fontWeight:'bold'
                            }}>Azmain Hossain</Text>
                            <Text style={{
                                fontSize:12,
                                fontWeight:'400',
                                color:'#7B93A4'
                            }}>Requested for operation</Text>
                        </View>
                    </View>
                    <View>
                        <Text 
                            style={{
                                fontSize:14,
                                fontWeight:'bold',
                                color:'#008A2E'
                            }}>B + ve</Text>
                        <Text style={{
                                fontSize:12,
                                fontWeight:'400',
                                color:'#7B93A4'
                            }}>12:05 pm</Text>
                    </View>
                </View>


                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    marginHorizontal:10,
                    padding:5,
                    marginVertical:10
                }}>
                    
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-around'
                    }}>
                        <View style={{

                        }}>
                            <Avatar.Image size={40} source={UserAvatar} />
                        </View>
                        <View style={{
                            justifyContent:'center',
                            alignItems:'flex-start',
                            marginHorizontal:10
                        }}>
                            <Text style={{
                                fontSize:14,
                                fontWeight:'bold'
                            }}>Azmain Hossain</Text>
                            <Text style={{
                                fontSize:12,
                                fontWeight:'400',
                                color:'#7B93A4'
                            }}>Requested for operation</Text>
                        </View>
                    </View>
                    <View>
                        <Text 
                            style={{
                                fontSize:14,
                                fontWeight:'bold',
                                color:'#E40404'
                            }}>B - ve</Text>
                        <Text style={{
                                fontSize:12,
                                fontWeight:'400',
                                color:'#7B93A4'
                            }}>12:05 pm</Text>
                    </View>
                </View>

                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    checkItemStyle:{
        padding:5,
        fontWeight:'bold',
        fontSize:14,
    },
    radioTxtStyle:{
        fontSize:12,
        fontWeight:'bold',
        color:'#7E7E7E'
    }
});
