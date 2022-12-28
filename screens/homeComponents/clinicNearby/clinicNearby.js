import React from 'react'
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
import { Modal, Portal, Button, Provider } from 'react-native-paper';

import ClinicImage from '../../../assets/hospital.png';


export default function ClinicNearbyScreen({navigation}) {

    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20,};


    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor={'#075141'} />
            <ScrollView>
                <View style={{flex:1}}>

                    
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        marginVertical:20,
                        marginHorizontal:10,
                    }}>
                        <View style={{
                            // flex:1
                        }}>
                            <Image source={ClinicImage} width={80} height={80} resizeMode='contain' />
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection:'row'
                        }}>
                            <View>
                                <Text style={{fontSize:16,fontWeight:'bold'}}>Ibn Sina</Text>
                                <Text style={{fontSize:16,fontWeight:'bold'}}>ENT- 18 years</Text>
                                <Text style={{fontSize:14,fontWeight:'500'}}>Consultation, test {"\n"}emergency</Text>
                            </View>
                            <View style={{
                                flex:1,
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <TouchableOpacity 
                                    style={{
                                        backgroundColor:'#3AAD94',
                                        paddingVertical:5,
                                        paddingHorizontal:10,
                                        borderRadius:5
                                    }}
                                    onPress={showModal}
                                >
                                    <Text style={{
                                        fontSize:14,
                                        fontWeight:'bold',
                                        color:'#fff',
                                        padding:2,
                                        textAlign:'center'
                                    }}>Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        marginVertical:20,
                        marginHorizontal:10,
                    }}>
                        <View style={{
                            // flex:1
                        }}>
                            <Image source={ClinicImage} width={80} height={80} resizeMode='contain' />
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection:'row'
                        }}>
                            <View>
                                <Text style={{fontSize:16,fontWeight:'bold'}}>Ibn Sina</Text>
                                <Text style={{fontSize:16,fontWeight:'bold'}}>ENT- 18 years</Text>
                                <Text style={{fontSize:14,fontWeight:'500'}}>Consultation, test {"\n"}emergency</Text>
                            </View>
                            <View style={{
                                flex:1,
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <TouchableOpacity style={{
                                    backgroundColor:'#3AAD94',
                                    paddingVertical:5,
                                    paddingHorizontal:10,
                                    borderRadius:5
                                }}>
                                    <Text style={{
                                        fontSize:14,
                                        fontWeight:'bold',
                                        color:'#fff',
                                        padding:2,
                                        textAlign:'center'
                                    }}>Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        marginVertical:20,
                        marginHorizontal:10,
                    }}>
                        <View style={{
                            // flex:1
                        }}>
                            <Image source={ClinicImage} width={80} height={80} resizeMode='contain' />
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection:'row'
                        }}>
                            <View>
                                <Text style={{fontSize:16,fontWeight:'bold'}}>Ibn Sina</Text>
                                <Text style={{fontSize:16,fontWeight:'bold'}}>ENT- 18 years</Text>
                                <Text style={{fontSize:14,fontWeight:'500'}}>Consultation, test {"\n"}emergency</Text>
                            </View>
                            <View style={{
                                flex:1,
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <TouchableOpacity style={{
                                    backgroundColor:'#3AAD94',
                                    paddingVertical:5,
                                    paddingHorizontal:10,
                                    borderRadius:5
                                }}>
                                    <Text style={{
                                        fontSize:14,
                                        fontWeight:'bold',
                                        color:'#fff',
                                        padding:2,
                                        textAlign:'center'
                                    }}>Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        marginVertical:20,
                        marginHorizontal:10,
                    }}>
                        <View style={{
                            // flex:1
                        }}>
                            <Image source={ClinicImage} width={80} height={80} resizeMode='contain' />
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection:'row'
                        }}>
                            <View>
                                <Text style={{fontSize:16,fontWeight:'bold'}}>Ibn Sina</Text>
                                <Text style={{fontSize:16,fontWeight:'bold'}}>ENT- 18 years</Text>
                                <Text style={{fontSize:14,fontWeight:'500'}}>Consultation, test {"\n"}emergency</Text>
                            </View>
                            <View style={{
                                flex:1,
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <TouchableOpacity style={{
                                    backgroundColor:'#3AAD94',
                                    paddingVertical:5,
                                    paddingHorizontal:10,
                                    borderRadius:5
                                }}>
                                    <Text style={{
                                        fontSize:14,
                                        fontWeight:'bold',
                                        color:'#fff',
                                        padding:2,
                                        textAlign:'center'
                                    }}>Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    

                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        marginVertical:20,
                        marginHorizontal:10,
                    }}>
                        <View style={{
                            // flex:1
                        }}>
                            <Image source={ClinicImage} width={80} height={80} resizeMode='contain' />
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection:'row'
                        }}>
                            <View>
                                <Text style={{fontSize:16,fontWeight:'bold'}}>Ibn Sina</Text>
                                <Text style={{fontSize:16,fontWeight:'bold'}}>ENT- 18 years</Text>
                                <Text style={{fontSize:14,fontWeight:'500'}}>Consultation, test {"\n"}emergency</Text>
                            </View>
                            <View style={{
                                flex:1,
                                alignItems:'center',
                                justifyContent:'center'
                            }}>
                                <TouchableOpacity style={{
                                    backgroundColor:'#3AAD94',
                                    paddingVertical:5,
                                    paddingHorizontal:10,
                                    borderRadius:5
                                }}>
                                    <Text style={{
                                        fontSize:14,
                                        fontWeight:'bold',
                                        color:'#fff',
                                        padding:2,
                                        textAlign:'center'
                                    }}>Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    
                    <Provider>
                        <Portal>
                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <View style={{}}>

                                    <View style={{
                                        justifyContent:'center',
                                        alignItems:'center'
                                    }}>
                                        <Image source={ClinicImage} width={80} height={80} resizeMode='contain' />
                                        <Text style={styles.modalTxtStyle}>
                                            Ibn Sina Medical
                                        </Text>
                                    </View>

                                    <View>
                                        
                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'space-between'
                                        }}>
                                            <Text style={styles.modalTxtStyle}>Specialization sector:</Text>
                                            <Text style={styles.modalTxtStyle}>Dermatology</Text>
                                        </View>

                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'space-between'
                                        }}>
                                            <Text style={styles.modalTxtStyle}>Patient sentiment:</Text>
                                            <Text style={styles.modalTxtStyle}>Positive</Text>
                                        </View>

                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'space-between'
                                        }}>
                                            <Text style={styles.modalTxtStyle}>Experience:</Text>
                                            <Text style={styles.modalTxtStyle}>18 years</Text>
                                        </View>

                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'space-between'
                                        }}>
                                            <Text style={styles.modalTxtStyle}>Address:</Text>
                                            <Text style={{fontSize:14,color:'#000',fontWeight:'bold'}}>
                                                House 14,Road 15{"\n"}Sonargaon road,{"\n"}Dhaka 1230
                                            </Text>
                                        </View>

                                        <View style={{
                                            flexDirection:'row',
                                            justifyContent:'space-between'
                                        }}>
                                            <Text style={styles.modalTxtStyle}>Treatments offered:</Text>
                                            <Text style={{fontSize:14,color:'#000',fontWeight:'bold'}}>
                                            Coronavirus Gynaecology{"\n"}
                                            General Physician{"\n"}
                                            Dermatology

                                            </Text>
                                        </View>

                                    </View>

                                </View>
                            </Modal>
                        </Portal>
                    </Provider>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonTxtStyle:{
        fontSize:12,
        color:'#3AAD94',
        fontWeight:'bold',
        textAlign:'center',
        padding:3
    },
    buttonStyle:{
        borderWidth:1,
        paddingVertical:5,
        paddingHorizontal:10,
        borderRadius:100/2,
        borderColor:'#3AAD94',
        marginVertical:5,
        marginHorizontal:5
    },
    modalTxtStyle:{
        fontSize:16,
        fontWeight:'bold',
        marginVertical:5,
        color:'#091C3F',
    }
})
