import React from 'react'
import { 
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet
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

export default function InstantVideoConsultScreen({navigation}) {
    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor={'#075141'} />
            <ScrollView>
                <View style={{flex:1}}>
                    <View style={{
                        flexDirection:'row',
                        alignItems:'center',
                        backgroundColor:'#5ED4BA',
                        borderRadius:100/2,
                        marginHorizontal:20,
                        marginVertical:20
                        }}>
                        <TextInput 
                            placeholder='Search'
                            style={{
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


                    <View style={{
                            flex:1,
                            margin:15
                        }}>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold'
                        }}>Top Specialities</Text>
                        <View style={{
                            flex:1,
                            flexDirection:'row',
                        }}>
                            <TouchableOpacity 
                                style={styles.buttonStyle}
                            >
                                <Text style={styles.buttonTxtStyle}>Coronavirus</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Gynecologic</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Sexology</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection:'row',
                        }}>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>General Physcian</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Dermatology</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Homeopathy</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{
                            flex:1,
                            margin:15
                        }}>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold'
                        }}>Common Health Issues</Text>
                        <View style={{
                            flex:1,
                            flexDirection:'row',
                        }}>
                            <TouchableOpacity 
                                style={styles.buttonStyle}
                            >
                                <Text style={styles.buttonTxtStyle}>Stomach pain</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Back Pain</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Eczema</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection:'row',
                        }}>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Fungal Infection</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Headaches</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>ACNE</Text>
                            </TouchableOpacity>
                        </View>
                    </View>


                    <View style={{
                            flex:1,
                            margin:15
                        }}>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold'
                        }}>General Physician</Text>
                        <View style={{
                            flex:1,
                            flexDirection:'row',
                        }}>
                            <TouchableOpacity 
                                style={styles.buttonStyle}
                            >
                                <Text style={styles.buttonTxtStyle}>Orthopedist</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Dizziness</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Leg Pain</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection:'row',
                        }}>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Knee pain</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Fever</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Shoulder pain</Text>
                            </TouchableOpacity>
                        </View>
                    </View>



                    <View style={{
                            flex:1,
                            margin:15
                        }}>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold'
                        }}>Dermatologist</Text>
                        <View style={{
                            flex:1,
                            flexDirection:'row',
                        }}>
                            <TouchableOpacity 
                                style={styles.buttonStyle}
                            >
                                <Text style={styles.buttonTxtStyle}>Vitiligo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Hair loss</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Acne Scars</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flex:1,
                            flexDirection:'row',
                        }}>
                            <TouchableOpacity style={styles.buttonStyle}>
                                <Text style={styles.buttonTxtStyle}>Dandruff</Text>
                            </TouchableOpacity>
                        </View>
                    </View>   

                    <View style={{
                        flex:1,
                        // justifyContent:'center',
                        // alignItems:'center',
                        marginVertical:20,
                        marginHorizontal:40
                    }}>
                        <TouchableOpacity style={{
                            backgroundColor:'#3AAD94',
                            paddingVertical:10,
                            paddingHorizontal:20,
                            borderRadius:100/2,
                            flex:1
                        }}>
                            <Text style={{
                                fontSize:16,
                                fontWeight:'bold',
                                textAlign:"center",
                                color:'#fff',
                                padding:5
                            }}>Proceed</Text>
                        </TouchableOpacity>
                    </View> 

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
    }
})
