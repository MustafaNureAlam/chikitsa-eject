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
import SaturdayChat from './chatService/chatWeekdays/saturdayVid';
import SundayChat from './chatService/chatWeekdays/sundayVid';
import MondayChat from './chatService/chatWeekdays/mondayVid';
import TuesdayChat from './chatService/chatWeekdays/tuesdayVid';
import WednesdayChat from './chatService/chatWeekdays/wednesdayVid';
import ThursdayChat from './chatService/chatWeekdays/thursdayVid';
import FridayChat from './chatService/chatWeekdays/fridayVid';

const VideoSlotTab = createMaterialTopTabNavigator();


export default function NurseChatServiceScreen({navigation}) {
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
                    name="SaturdayChat" 
                    component={SaturdayChat} 
                />
                
                <VideoSlotTab.Screen 
                    options={{ tabBarLabel: 'Sun'}}
                    name="SundayChat" 
                    component={SundayChat} 
                />
                
                <VideoSlotTab.Screen 
                    options={{ tabBarLabel: 'Mon'}}
                    name="MondayChat" 
                    component={MondayChat} 
                />
                
                <VideoSlotTab.Screen 
                    options={{ tabBarLabel: 'Tue'}}
                    name="TuesdayChat" 
                    component={TuesdayChat} 
                />
                
                
                <VideoSlotTab.Screen 
                    options={{ tabBarLabel: 'Wed'}}
                    name="WednesdayChat" 
                    component={WednesdayChat} 
                />
                
                
                <VideoSlotTab.Screen 
                    options={{ tabBarLabel: 'Thu'}}
                    name="ThursdayChat" 
                    component={ThursdayChat} 
                />
                
                
                <VideoSlotTab.Screen 
                    options={{ tabBarLabel: 'Fri'}}
                    name="FridayChat" 
                    component={FridayChat} 
                />
                
            </VideoSlotTab.Navigator>
        </SafeAreaView>
    )
}
