import React from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    StatusBar
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NotificationScreen() {
    return (
        <SafeAreaView style={{flex:1,}}>
            <ScrollView>
                <View>
                    <View style={styles.containerStyle}>
                        <View style={{flex:.3,alignItems:'center'}}>
                            <Text>
                                <MaterialCommunityIcons name="calendar-clock" size={30} color="#129C7E" />
                            </Text>
                        </View>
                        <View style={{flex:.7}}>
                            <Text style={styles.textStyle}>You have an appointment at 8 pm</Text>
                            <Text style={{fontSize:12,color:'#83C8B9'}}>15mins to go</Text>
                        </View>
                    </View>
                    <View style={styles.containerStyle}>
                        <View style={{flex:.3,alignItems:'center'}}>
                            <Text>
                                <MaterialCommunityIcons name="shield-check-outline" size={30} color="#129C7E" />
                            </Text>
                        </View>
                        <View style={{flex:.7}}>
                            <Text style={styles.textStyle}>Your lab test reports are ready!</Text>
                            <Text style={{fontSize:12,color:'#83C8B9'}}>15mins to go</Text>
                        </View>
                    </View>
                    <View style={styles.containerStyle}>
                        <View style={{flex:.3,alignItems:'center'}}>
                            <Text>
                                <MaterialCommunityIcons name="calendar-account-outline" size={30} color="#129C7E" />
                            </Text>
                        </View>
                        <View style={{flex:.7}}>
                            <Text style={styles.textStyle}>You have an appointment at 8 pm</Text>
                            <Text style={{fontSize:12,color:'#83C8B9'}}>15mins to go</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            
        </SafeAreaView> 
    )
}

const styles = StyleSheet.create({
    textStyle:{
        fontSize:14,
        color:'#3AAD94',
        fontWeight:'400'
    },
    containerStyle:{
        flexDirection:'row',
        padding:20,
        backgroundColor:'#DCEBE8',
        marginVertical:5,
    }
});
