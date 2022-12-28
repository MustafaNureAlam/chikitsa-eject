import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    View,
    StyleSheet,
    Image,
    Platform,
    Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../assets/app_logo.png';
import * as Animatable from 'react-native-animatable';
import AppLoaderImg from '../assets/Chikitsa_Logo.png';
import local_storage from '../services/local_storage/storage';
import local_config from '../services/config';
import * as Calendar from 'expo-calendar';
// import * as Localization from 'expo-localization';
// Packeges For Expo - Notification 
import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// ---------
// import RNCallKeep from "@config-plugins/react-native-callkeep";

const SplashScreen = ({ navigation }) => {
    //State for ActivityIndicator animation
    const [animating, setAnimating] = useState(true);
    const [token, setToken] = useState(false);

    // Expo Notification Setup
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = React.useRef();
    const responseListener = React.useRef();
    // ----------------
    
    // async function cellular_fn(title_text,schedule_date){
    async function cellular_fn(){
        console.log("FN WORK!")
        // await Cellular.allowsVoipAsync(true).then(result => {
        //     console.log("?")
        //     console.log(result)
        //     console.log("!")
        // })
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            
            const caleve = await Calendar.createEventAsync("1",
                {title:'Chikitsa',
                alarms: [{ relativeOffset: 0, method: 'alert' }],
                startDate: new Date(Date.parse('2022-12-21T11:15:17.327Z')),
                endDate: new Date(Date.parse('2022-12-21T11:20:17.327Z') + 2 * 60 * 60 * 1000),
                timeZone: 'Asia/Dhaka',
                location: 'Dhaka Bangladesh.'})
            // Calendar.openEventInCalendar(caleve)
            const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
            // const calendar = calendars.find(({isPrimary})=>isPrimary);

            console.log('Here are all your calendars:');
            // console.log({ calendars });
            // let calendar_id = calendars[0].id;
            // let calendar_source = calendars[0].source;
            // console.log(calendar_id);
            // console.log(calendar_source);

            // let details = {
            //     title: 'Example Calendar',
            //     color: 'red',
            //     entityType: Calendar.EntityTypes.EVENT,
            //     sourceId: calendar_source['id'],
            //     source: calendar_source,
            //     name: 'Example Calendar',
            //     ownerAccount: '?',
            //     timeZone: 'Asia/Dhaka',
            //     accessLevel: Calendar.CalendarAccessLevel.OWNER,
            // };

            // Calendar.createCalendarAsync(details).then(new_cal_id => {
            //     console.log('New cal id: ', new_cal_id);
            //     let recRule = {
            //         frequency: 'daily',
            //         interval: 1,
            //         endDate: new Date('December 21 2022 19:00:00 EST') //occurrence: 3,
            //     };
            //     let example_event = {
            //         title: 'Example event',
            //         alarms: [{ relativeOffset: 9 * 60, method: Calendar.AlarmMethod.ALERT }],
            //         notes: 'note',
            //         startDate: new Date('December 21 2022 19:00:00 EST'),
            //         endDate: new Date('December 21 2022 19:00:00 EST'),
            //         timeZone: 'Asia/Dhaka',
            //         // endTimeZone: null,
            //         recurrenceRule: recRule,
            //     };
            //     console.log('Creating new event:');
            //     Calendar.createEventAsync(new_cal_id, example_event) .then(resp_id => {
            //         console.log('RESP: ', resp_id);
            //         console.log(new Date());
            //     }).catch(err => console.warn('Err: ', err));
            // });
        }
        
        console.log("FN WORK END--!")
    }
    async function init_fn(){
        console.log("Platform OS: ", Platform.OS)
        let user_token = await local_storage.getItem("token");
        let User_role = await local_storage.getItem("user_role");
        console.log('User Selected Role: ', User_role)

        // setTimeout(() => {
        //     setAnimating(false);

        //     // Expo Notification Setup
        //     registerForPushNotificationsAsync().then(token => {
        //         setExpoPushToken(token)
        //         console.log("Expo Push Token: ", token)
        //         cellular_fn()
        //         // RNCallKeep.setup({
        //         //     ios: {
        //         //       appName: "App name",
        //         //     },
        //         //     android: {
        //         //       alertTitle: "Permissions required",
        //         //       alertDescription: "This application needs to access your phone accounts",
        //         //       cancelButton: "Cancel",
        //         //       okButton: "ok",
        //         //     },
        //         //   }).then((accepted) => {
        //         //     RNCallKeep.displayIncomingCall("1", "+8801689576910");
        //         //     if (Platform.android) {
        //         //       RNCallKeep.setActive(true);
        //         //     }
        //         //     RNCallKeep.addEventListener("answerCall", ({ callUUID, ...o }) => {
        //         //       // to hide the native "accepted call" screen 
        //         //       RNCallKeep.rejectCall(callUUID);
        //         //     });
        //         //     RNCallKeep.addEventListener("endCall", ({ callUUID }) => {
        //         //       console.log("endCall.", callUUID);
        //         //     });
        //         //   }).catch(err => {
        //         //     console.log(err)
        //         //   });
                  
        //     });
        //     // -----------------------

        //     if (user_token) {

        //         if (User_role === "doctor") {
        //             setAnimating(true);
        //             navigation.navigate('DoctorTabNavigationRoutes', { screen: 'DoctorHome' })
        //             setAnimating(false);

        //         } else if (User_role === 'nurse') {
        //             setAnimating(true);
        //             navigation.navigate('NurseTabNavigationRoutes', { screen: 'NurseHome' })
        //             setAnimating(false);
        //         } else {
        //             navigation.navigate('Tab', { screen: 'DrawerNavigationRoutes' })
        //         }
        //     } else {

        //         navigation.navigate('Auth', { screen: 'SliderScreen' })
        //     }

        //     // This listener is fired whenever a notification is received while the app is foregrounded
        //     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        //         setNotification(notification);
        //         let noti_response = notification.request.content.data.notification_for;
        //         let chat_room = notification.request.content.data.optional_data;
        //         let noti_title = notification.request.content.title;
        //         // notification.request.content.data.notification_for
        //         // console.log('notification=====================')
        //         // console.log(notification.request.content.data)
        //         // console.log('notification=====================')
        //         if(noti_response == "doc_join_to_room") {
                    
        //             cellular_fn() // On New Schedule Create Notification.

        //             console.log("GOT NEW NOTIFICATION!!")
        //             Alert.alert(
        //                 "JOIN CALL!",
        //                 noti_title,
        //                 [
        //                   {
        //                     text: "No",
        //                     onPress: () => console.log("Cancel Pressed"),
        //                     style: "cancel"
        //                   },
        //                   { text: "Yes", onPress: () => navigation.navigate('VideoScreen',{meet_room : chat_room}) }
        //                 ]
        //             );
        //             // navigation.navigate('DrawerNavigationRoutes',{screen : 'VideoScreen', url: chat_room});
                    
        //         }
        //     });

        //     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        //     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        //         console.log(response);
        //         let noti_response = notification.request.content.data.notification_for;
        //         let chat_room = notification.request.content.data.optional_data;
        //         // notification.request.content.data.notification_for
        //         // console.log('notification=====================')
        //         // console.log(notification.request.content.data)
        //         // console.log('notification=====================')
        //         if(noti_response == "doc_join_to_room") {
        //             // navigation.navigate('DrawerNavigationRoutes',{screen : 'VideoScreen', url: chat_room});
        //             navigation.navigate('VideoScreen',{meet_room : chat_room});
        //         }
        //     });

        //     return () => {
        //         Notifications.removeNotificationSubscription(notificationListener.current);
        //         Notifications.removeNotificationSubscription(responseListener.current);
        //     };
        // }, 3000);
    }
    useEffect(() => {
        init_fn();
    }, []);


    // Expo Notification Functions
    async function registerForPushNotificationsAsync() {
        let token;
        // if (Device.isDevice) {
        //     const { status: existingStatus } = await Notifications.getPermissionsAsync();
        //     let finalStatus = existingStatus;
        //     if (existingStatus !== 'granted') {
        //         const { status } = await Notifications.requestPermissionsAsync();
        //         finalStatus = status;
        //     }
        //     if (finalStatus !== 'granted') {
        //         alert('Failed to get push token for push notification!');
        //         return;
        //     }
        //     token = (await Notifications.getExpoPushTokenAsync()).data;
        //     // console.log(token);
        //     registerForPushNotifications(token);
        // } else {
        //     alert('Must use physical device for Push Notifications');
        // }

        // if (Platform.OS === 'android') {
        //     Notifications.setNotificationChannelAsync('default', {
        //         name: 'default',
        //         importance: Notifications.AndroidImportance.MAX,
        //         vibrationPattern: [0, 250, 250, 250],
        //         lightColor: '#FF231F7C',
        //     });
        // }

        return token;
    }

    async function registerForPushNotifications(push_token) {

        let user_token = await local_storage.getItem("token");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+user_token);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ token: push_token });
        console.log("push_token")
        console.log("push_token")
        console.log(user_token)
        console.log("push_token")
        console.log("push_token")
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        if(user_token){

            await fetch(local_config.baseUrl+"/expo_push_token_create", requestOptions)
                .then((response) => response.text())
                .then((result) => {
    
                    console.log("############################")
                    console.log(result)
                    console.log("############################")
                })
                .catch((error) => {
                    console.log("error --expo_push_token_create", error);
                    alert(error);
                });
        }
        return []
    };
    // ---------------------------

    // const Redirect = () => {
    //   navigation.navigate("ChoosePath");
    //   console.log(token,'sasasa')
    // }

    return (
        <View style={styles.container}>
            <Animatable.View
                animation="pulse"
                easing="ease-out"
                iterationCount="infinite"
                style={{ textAlign: 'center' }}>
                <Image source={AppLoaderImg} style={{ flex: 1, width: 160, height: 80 }}
                    resizeMode={'center'} />
            </Animatable.View>
            {/* <ActivityIndicator
        animating={animating}
        color="#E30B7D"
        size="large"
        style={styles.activityIndicator}
      /> */}
        </View>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    activityIndicator: {
        alignItems: 'center',
        height: 80,
    },
});