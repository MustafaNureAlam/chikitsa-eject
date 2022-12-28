import React from 'react'
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

const INJECTED_JAVASCRIPT = `(function() {
    navigator.mediaDevices.getUserMedia({audio: true, video: false})
    .then(function(stream) {
    console.log(stream);
    })
    .catch(function(err) {
        console.log(err);
    });
    
})();`;


export default function NurseVideoScreen({navigation, route}) {
    
    React.useEffect(() => {
         (async () => {
          const status  = await Camera.requestCameraPermissionsAsync();
          const lsstatus = await Audio.requestPermissionsAsync();
          console.log(route.params.meet_room);
        })();
    }, []);
  
    return (
        <WebView 
            source={{ uri: route.params.meet_room }}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={true}
            javaScriptEnabled={true}
            userAgent={
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0 Safari/537.36"
            }
            style={styles.webview}
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
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 130,
    },
      
    webview: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 130
    }
});
