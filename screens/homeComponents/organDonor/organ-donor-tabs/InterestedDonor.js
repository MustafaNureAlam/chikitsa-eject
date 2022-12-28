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
import { RadioButton, Avatar } from 'react-native-paper';

export default function InterestedDonor() {

    const [gender, setGender] = useState('Male');
    const [maritalStatus, setMaritalStatus] = useState('Married');
    const [donorParts, setDonorParts] = useState('Lungs');

    return(
        <ScrollView>
            <View style={{backgroundColor:'#fff'}}>
                
                <View style={{
                    marginVertical:10
                }}>
                    <Text style={{
                        textAlign:'center',
                        padding:5,
                        fontSize:16,
                        fontWeight:'bold'
                    }}>Personal Details</Text>
                    
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        paddingHorizontal:5,
                        marginVertical:10,
                        marginHorizontal:5
                    }}>
                        <TextInput
                            placeholder='01675******'
                            style={{
                                fontSize:12,
                                fontWeight:'bold',
                                borderWidth:.3,
                                borderColor:'#70707B',
                                borderRadius:100/2,
                                paddingHorizontal:5,
                                flex:.5,
                                marginHorizontal:3,
                                textAlign:'center'
                            }}
                        />
                        <TextInput
                            placeholder='example@mail.com'
                            style={{
                                fontSize:12,
                                fontWeight:'bold',
                                borderWidth:.3,
                                borderColor:'#70707B',
                                borderRadius:100/2,
                                paddingHorizontal:5,
                                flex:.5,
                                marginHorizontal:3,
                                textAlign:'center'
                            }}
                        />
                    </View>

                    <View style={{
                        marginVertical:5,
                        marginHorizontal:10
                    }}>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            alignItems:'center'
                        }}>
                            <Text style={styles.checkItemStyle}>Gender</Text>
                            <RadioButton.Group  onValueChange={newValue => setGender(newValue)} value={gender}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <RadioButton value="Male" />
                                        <Text style={styles.radioTxtStyle}>Male</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <RadioButton value="Female" />
                                        <Text style={styles.radioTxtStyle}>Female</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <RadioButton value="Other" />
                                        <Text style={styles.radioTxtStyle}>Other</Text>
                                    </View>
                                </View>
                            </RadioButton.Group>
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

                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            paddingHorizontal:5,
                            marginVertical:10,
                            marginHorizontal:5
                        }}>
                            <TextInput
                                placeholder='Height'
                                style={{
                                    fontSize:12,
                                    fontWeight:'bold',
                                    borderWidth:.3,
                                    borderColor:'#70707B',
                                    borderRadius:100/2,
                                    paddingHorizontal:5,
                                    flex:.5,
                                    marginHorizontal:3,
                                    textAlign:'center'
                                }}
                            />
                            <TextInput
                                placeholder='Weight'
                                style={{
                                    fontSize:12,
                                    fontWeight:'bold',
                                    borderWidth:.3,
                                    borderColor:'#70707B',
                                    borderRadius:100/2,
                                    paddingHorizontal:5,
                                    flex:.5,
                                    marginHorizontal:3,
                                    textAlign:'center'
                                }}
                            />
                        </View>

                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            alignItems:'center'
                        }}>
                            <Text style={styles.checkItemStyle}>Marital status</Text>
                            
                            <RadioButton.Group  onValueChange={newValue => setMaritalStatus(newValue)} value={maritalStatus}>
                                <View style={{flexDirection:'row'}}>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <RadioButton value="Married" />
                                        <Text style={styles.radioTxtStyle}>Married</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <RadioButton value="Single" />
                                        <Text style={styles.radioTxtStyle}>Single</Text>
                                    </View>
                                </View>
                            </RadioButton.Group>
                        </View>
                        
                    </View>

                    

                </View>

                <View style={{
                    marginHorizontal:10
                }}>
                    <Text style={{
                        textAlign:'center',
                        padding:5,
                        fontSize:16,
                        fontWeight:'bold'
                    }}>Medical Details</Text>

                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center'
                    }}>
                        <Text style={styles.checkItemStyle}>Group</Text>
                        <RadioButton.Group  onValueChange={newValue => setDonorParts(newValue)} value={donorParts}>
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

                    <View style={{paddingVertical:10}}>
                        <Text style={styles.checkItemStyle}>Allergies</Text>
                        <View style={{
                            flexDirection:'row',
                            marginVertical:10
                        }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor:'#fefefe',
                                    borderWidth:1,
                                    borderColor:'#3AAD94',
                                    borderRadius:100/2,
                                    paddingVertical:5,
                                    paddingHorizontal:10,
                                    marginHorizontal:5
                                }}
                            >
                                <Text style={{
                                    fontSize:12,
                                    fontWeight:'bold',
                                    textAlign:'center'
                                }}>Allergy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor:'#fefefe',
                                    borderWidth:1,
                                    borderColor:'#3AAD94',
                                    borderRadius:100/2,
                                    paddingVertical:5,
                                    paddingHorizontal:10
                                }}
                            >
                                <Text style={{
                                    fontSize:12,
                                    fontWeight:'bold',
                                    textAlign:'center'
                                }}>Allergy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{paddingVertical:10}}>
                        <Text style={styles.checkItemStyle}>Current Medications</Text>
                        <View style={{
                            flexDirection:'row',
                            marginVertical:10
                        }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor:'#fefefe',
                                    borderWidth:1,
                                    borderColor:'#3AAD94',
                                    borderRadius:100/2,
                                    paddingVertical:5,
                                    paddingHorizontal:10,
                                    marginHorizontal:5
                                }}
                            >
                                <Text style={{
                                    fontSize:12,
                                    fontWeight:'bold',
                                    textAlign:'center'
                                }}>Diabetes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{
                                    backgroundColor:'#fefefe',
                                    borderWidth:1,
                                    borderColor:'#3AAD94',
                                    borderRadius:100/2,
                                    paddingVertical:5,
                                    paddingHorizontal:10
                                }}
                            >
                                <Text style={{
                                    fontSize:12,
                                    fontWeight:'bold',
                                    textAlign:'center'
                                }}>Kidney</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

                <View style={{
                    alignItems:'center',
                    marginVertical:20
                }}>
                    <TouchableOpacity style={{
                        backgroundColor:'#3AAD94',
                        paddingVertical:10,
                        paddingHorizontal:20,
                        borderRadius:10
                    }}>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',
                            textAlign:'center',
                            color:'#fff'
                        }}>Submit</Text>
                    </TouchableOpacity>
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
