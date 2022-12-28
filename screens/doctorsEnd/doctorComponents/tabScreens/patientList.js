import React from 'react'
import { View, Text, SafeAreaView, StatusBar } from 'react-native'

export default function PatientListScreen() {
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'} />
            <View>
                <Text>PatientListScreen</Text>
            </View>
        </SafeAreaView> 
    )
}
