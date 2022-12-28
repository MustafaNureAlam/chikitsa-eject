import React, { useCallback } from 'react'
import { 
    View, 
    Text,
    TextInput,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Alert,
    Loading,
} from 'react-native'
import { WebView } from 'react-native-webview';
import { Audio, Video } from 'expo-av';
import { Camera } from 'expo-camera';
import { useFocusEffect } from '@react-navigation/native';
import { Root, Popup } from 'popup-ui'


export default function VideoScreen({navigation, route}) {
    console.log('==================================================================')
    console.log(route)
    console.log('==================================================================')
    const [state, setState] = React.useState(true);

    async function permission_fn(){
        const status  = await Camera.requestCameraPermissionsAsync();
        const lsstatus = await Audio.requestPermissionsAsync();
    }
    React.useEffect(() => {
        permission_fn();
    }, []);

    useFocusEffect(
        useCallback(() => {
            // const unsubscribe = API.subscribe(userId, user => setUser(user));
            console.log(state);
            console.log('useFocusEffect');
            navigation.navigate('Tab',{screen:'DrawerNavigationRoutes'})
            // return () => unsubscribe();
        }, [state])
    );

    const onNavigationStateChange = (webViewState) => {
        if(webViewState.url === "https://meet.socian.ai/") {
            navigation.navigate('DrawerHomeScreen')
        }
    };
  
    return (
        <Root>
            <WebView 
                source={{ uri: route.params.meet_room }}
                onNavigationStateChange={onNavigationStateChange}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                startInLoadingState={false}
                scalesPageToFit={true}
                userAgent={
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0 Safari/537.36"
                }
                style={styles.webview}
            />
        </Root>
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
