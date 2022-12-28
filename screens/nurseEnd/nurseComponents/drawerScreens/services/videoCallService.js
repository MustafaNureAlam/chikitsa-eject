import React from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { 
    Ionicons,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Octicons,
    Entypo,
    Fontisto 
} from '@expo/vector-icons';
import { NavigationContainer } from "@react-navigation/native";
import { IconButton, Colors, FAB  } from 'react-native-paper';
import SaturdayVideo from './videoCallService/weekdays/saturdayVid';
import SundayVideo from './videoCallService/weekdays/sundayVid';
import MondayVideo from './videoCallService/weekdays/mondayVid';
import TuesdayVideo from './videoCallService/weekdays/tuesdayVid';
import WednesdayVideo from './videoCallService/weekdays/wednesdayVid';
import ThursdayVideo from './videoCallService/weekdays/thursdayVid';
import FridayVideo from './videoCallService/weekdays/fridayVid';

const VideoSlotTab = createMaterialTopTabNavigator();


export default function NurseVideoCallServiceScreen({navigation}) {
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <VideoSlotTab.Navigator
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 12, fontWeight:'bold' },
                    tabBarActiveTintColor:'#fff',
                    tabBarInactiveTintColor:'#3AAD94',
                    tabBarScrollEnabled:true,
                    tabBarIndicatorStyle:{backgroundColor:'#3AAD94',height:'100%'},
                    // lazy:true,
                    tabBarItemStyle: { width: 60 },
                }}
                // style={{minHeight:400}}
                sceneContainerStyle={{backgroundColor:'#fff'}}
                
            >
                <VideoSlotTab.Screen 
                    options={{ tabBarLabel: 'Sat'}}
                    name="SaturdayVideo" 
                    component={SaturdayVideo} 
                />
                
                <VideoSlotTab.Screen 
                    options={{ tabBarLabel: 'Sun'}}
                    name="SundayVideo" 
                    component={SundayVideo} 
                />
                
                <VideoSlotTab.Screen 
                    options={{ tabBarLabel: 'Mon'}}
                    name="MondayVideo" 
                    component={MondayVideo} 
                />
                
                <VideoSlotTab.Screen 
                    options={{ tabBarLabel: 'Tue'}}
                    name="TuesdayVideo" 
                    component={TuesdayVideo} 
                />
                
                
                <VideoSlotTab.Screen 
                    options={{ tabBarLabel: 'Wed'}}
                    name="WednesdayVideo" 
                    component={WednesdayVideo} 
                />
                
                
                <VideoSlotTab.Screen 
                    options={{ tabBarLabel: 'Thu'}}
                    name="ThursdayVideo" 
                    component={ThursdayVideo} 
                />
                
                
                <VideoSlotTab.Screen 
                    options={{ tabBarLabel: 'Fri'}}
                    name="FridayVideo" 
                    component={FridayVideo} 
                />
                
            </VideoSlotTab.Navigator>
        </SafeAreaView>
    )
}
