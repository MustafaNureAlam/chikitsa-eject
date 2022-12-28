import React from 'react'
import { 
    View, 
    Text,
    SafeAreaView, 
    TextInput,
    StyleSheet,
    ScrollView,
    TouchableOpacity
} from 'react-native'

export default function passwordTab() {
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <ScrollView>
                <View>
                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        marginVertical:30,
                        padding:20
                    }}>
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',
                            padding:5
                        }}>Change Password</Text>
                        <View style={{
                            marginHorizontal:40,
                            marginVertical:10
                        }}>
                            <TextInput
                                style={styles.inputStyle}
                                placeholder='Current Password'
                                placeholderTextColor={'#3AAD94'}
                            />
                            <TextInput
                                style={styles.inputStyle}
                                placeholder='New Password'
                                placeholderTextColor={'#3AAD94'}
                            />
                            <TextInput
                                style={styles.inputStyle}
                                placeholder='Confirm New Password'
                                placeholderTextColor={'#3AAD94'}
                            />

                            <View style={{
                                flex:1,
                                justifyContent:'center',
                                alignItems:'center'
                            }}>
                                <TouchableOpacity style={{
                                    backgroundColor:'#3AAD94',
                                    paddingHorizontal:20,
                                    paddingVertical:10,
                                    borderRadius:100/2
                                }}>
                                    <Text style={{
                                        color:'#fff',
                                        fontSize:16,
                                        fontWeight:'bold'
                                    }}>Reset Password</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    inputStyle:{
        borderWidth:.3,
        borderColor:'#3AAD94',
        paddingVertical:5,
        paddingHorizontal:5,
        minWidth:'100%',
        marginVertical:5,
        borderRadius:100/2,
        textAlign:'center',
        color:'#3AAD94',
        fontWeight:'bold',
        backgroundColor:'#fafefe'
    }
});
