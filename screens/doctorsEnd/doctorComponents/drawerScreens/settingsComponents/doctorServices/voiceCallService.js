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
import Saturday from './voiceCallService/weekdays/saturday';
import Sunday from './voiceCallService/weekdays/sunday';
import Monday from './voiceCallService/weekdays/monday';
import Tuesday from './voiceCallService/weekdays/tuesday';
import Wednesday from './voiceCallService/weekdays/wednesday';
import Thursday from './voiceCallService/weekdays/thursday';
import Friday from './voiceCallService/weekdays/friday';

const SlotTab = createMaterialTopTabNavigator();


export default function VoiceCallServiceScreen({navigation}) {
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <SlotTab.Navigator
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
                <SlotTab.Screen 
                    options={{ tabBarLabel: 'Sat'}}
                    name="Saturday" 
                    component={Saturday} 
                />
                
                <SlotTab.Screen 
                    options={{ tabBarLabel: 'Sun'}}
                    name="Sunday" 
                    component={Sunday} 
                />
                
                <SlotTab.Screen 
                    options={{ tabBarLabel: 'Mon'}}
                    name="Monday" 
                    component={Monday} 
                />
                
                <SlotTab.Screen 
                    options={{ tabBarLabel: 'Tue'}}
                    name="Tuesday" 
                    component={Tuesday} 
                />
                
                
                <SlotTab.Screen 
                    options={{ tabBarLabel: 'Wed'}}
                    name="Wednesday" 
                    component={Wednesday} 
                />
                
                
                <SlotTab.Screen 
                    options={{ tabBarLabel: 'Thu'}}
                    name="Thursday" 
                    component={Thursday} 
                />
                
                
                <SlotTab.Screen 
                    options={{ tabBarLabel: 'Fri'}}
                    name="Friday" 
                    component={Friday} 
                />
                
            </SlotTab.Navigator>
        </SafeAreaView>
    )
}
