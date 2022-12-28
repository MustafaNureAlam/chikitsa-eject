import React from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    StyleSheet,
    ScrollView 
} from 'react-native'

export default function medicalTab() {
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <View>
                <ScrollView>
                    <View>
                        <View style={{
                            flex:1,
                            padding:15
                        }}>

                            <View style={{marginHorizontal:3}}>
                                <Text style={styles.infoTxt}>Allergies</Text>
                                <View style={{
                                    flex:1,
                                    flexDirection:'row',
                                    marginVertical:10
                                }}>
                                    <TouchableOpacity style={styles.medicationBtnStyle}>
                                        <Text style={styles.medicationTxt}>Dust</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.medicationBtnStyle}>
                                        <Text style={styles.medicationTxt}>Water</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{marginHorizontal:3}}>
                                <Text style={styles.infoTxt}>Current Medication:</Text>
                                <View style={{
                                    flex:1,
                                    flexDirection:'row',
                                    // justifyContent:'space-between'
                                    marginVertical:10
                                }}>
                                    <TouchableOpacity style={styles.medicationBtnStyle}>
                                        <Text style={styles.medicationTxt}>Diabetes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.medicationBtnStyle}>
                                        <Text style={styles.medicationTxt}>Kidney</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.medicationBtnStyle}>
                                        <Text style={styles.medicationTxt}>Thyroid</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{marginHorizontal:3}}>
                                <Text style={styles.infoTxt}>Past Medication:</Text>
                                <View style={{
                                    flex:1,
                                    flexDirection:'row',
                                    // justifyContent:'space-between'
                                    marginVertical:10
                                }}>
                                    <TouchableOpacity style={styles.medicationBtnStyle}>
                                        <Text style={styles.medicationTxt}>Diabetes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.medicationBtnStyle}>
                                        <Text style={styles.medicationTxt}>Kidney</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.medicationBtnStyle}>
                                        <Text style={styles.medicationTxt}>Thyroid</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={{
                                marginHorizontal:3,
                            }}>
                                <Text style={styles.infoTxt}>Injuries</Text>
                                
                                <View style={{marginVertical:10}}>
                                    <View style={{
                                        flexDirection:'row',
                                    }}>
                                        <Text style={styles.patientHistoryTxtStyle}>Brain</Text>
                                        <Text style={styles.patientHistoryTxtStyle}>Blood Clot</Text>
                                    </View>
                                    <View style={{
                                        flexDirection:'row',
                                    }}>
                                        <Text style={styles.patientHistoryTxtStyle}>Left ankle</Text>
                                        <Text style={styles.patientHistoryTxtStyle}>Fracture</Text>
                                    </View>
                                </View>
                                
                            </View>

                            <View style={{
                                marginHorizontal:3,
                            }}>
                                <Text style={styles.infoTxt}>Surgeries</Text>
                                
                                <View style={{marginVertical:10}}>
                                    <View style={{
                                        flexDirection:'row',
                                    }}>
                                        <Text style={styles.patientHistoryTxtStyle}>Brain</Text>
                                        <Text style={styles.patientHistoryTxtStyle}>29 Nov 2021</Text>
                                    </View>
                                    <View style={{
                                        flexDirection:'row',
                                    }}>
                                        <Text style={styles.patientHistoryTxtStyle}>Heart</Text>
                                        <Text style={styles.patientHistoryTxtStyle}>28 Nov 2021</Text>
                                    </View>
                                </View>
                                
                            </View>

                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    detailsContainerTxt:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:3
    },
    detailsTxt:{
        color:'#3AAD94',
        fontWeight:'bold',
        fontSize:14
    },
    infoTxt:{
        fontSize:15,
        fontWeight:'bold'
    },
    medicationBtnStyle:{
        paddingVertical:5,
        paddingHorizontal:10,
        borderWidth:.5,
        borderColor:'#3AAD94',
        borderRadius:100/2,
        marginHorizontal:5
    },
    medicationTxt:{
        fontSize:14,
        color:'#3AAD94'
    },
    patientHistoryTxtStyle:{
        borderWidth:.5,
        flex:.5,
        textAlign:'center',
        padding:5,
        color:'#3AAD94',
        fontSize:14,
        fontWeight:'bold'
    },
});
