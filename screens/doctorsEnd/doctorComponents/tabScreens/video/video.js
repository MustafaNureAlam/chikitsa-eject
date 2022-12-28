import React, { useCallback } from 'react'
import { 
    View, 
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Loading,
} from 'react-native'
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import { Audio, Video } from 'expo-av';
import { Camera } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';
import * as Storage from '../../../../../services/local_storage/storage';


export default function DoctorVideoScreen({navigation, route}) {
    async function init_fn(){
        const status  = await Camera.requestCameraPermissionsAsync();
        const lsstatus = await Audio.requestPermissionsAsync();
        

        const obj = {
            appointment_id: route.params.api_data.data[0].id,
            doctor_user_id: route.params.api_data.data[0].doctor_user_id,
            patient_user_id: route.params.patient_data.patient_user_id,
        }

        await Storage.save('appointment_data', JSON.stringify([obj])).then(save_res => {
            console.log(save_res)
        })
    }
    useFocusEffect(
        useCallback(() => {
            init_fn()
        }, []),
    );
        
    const onNavigationStateChange = (webViewState) => {
        if(webViewState.url === "https://meet.socian.ai/") {
            // Nevigate to next screen
            navigation.navigate('DoctorHome')
        }
    };


    return (
        <WebView 
            source={{ uri: route.params.createRoom.meet_room }}
            onNavigationStateChange={onNavigationStateChange}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={true}
            userAgent={
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0 Safari/537.36"
            }
            style={{ flex: 1 }}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      map: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 130,
      },
});
