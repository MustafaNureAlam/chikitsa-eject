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
import NurseFriday from './weekdays/friday';
import NurseMonday from './weekdays/monday';
import NurseSaturday from './weekdays/saturday';
import NurseSunday from './weekdays/sunday';
import NurseThursday from './weekdays/thursday';
import NurseWednesday from './weekdays/wednesday';
import NurseTuesday from './weekdays/tuesday';
// import NurseSaturday from './weekdays/saturday';
// import NurseSunday from './weekdays/sunday';
// import NurseTuesday from './weekdays/tuesday';
// import NurseThursday from './weekdays/thursday';
// import NurseWednesday from './weekdays/wednesday';

const NurseSlotTab = createMaterialTopTabNavigator();


export default function NurseVoiceCallServiceScreen({navigation}) {
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            
            <NurseSlotTab.Navigator
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
                <NurseSlotTab.Screen 
                    options={{ tabBarLabel: 'Sat'}}
                    name="NurseSaturday" 
                    component={NurseSaturday} 
                />
                
                <NurseSlotTab.Screen 
                    options={{ tabBarLabel: 'Sun'}}
                    name="NurseSunday" 
                    component={NurseSunday} 
                />
                
                <NurseSlotTab.Screen 
                    options={{ tabBarLabel: 'Mon'}}
                    name="NurseMonday" 
                    component={NurseMonday} 
                />
                
                <NurseSlotTab.Screen 
                    options={{ tabBarLabel: 'Tue'}}
                    name="NurseTuesday" 
                    component={NurseTuesday} 
                />
                
                
                <NurseSlotTab.Screen 
                    options={{ tabBarLabel: 'Wed'}}
                    name="NurseWednesday" 
                    component={NurseWednesday} 
                />
                
                
                <NurseSlotTab.Screen 
                    options={{ tabBarLabel: 'Thu'}}
                    name="NurseThursday" 
                    component={NurseThursday} 
                />
                
                
                <NurseSlotTab.Screen 
                    options={{ tabBarLabel: 'Fri'}}
                    name="NurseFriday" 
                    component={NurseFriday} 
                />
                
            </NurseSlotTab.Navigator>

        </SafeAreaView>
    )
}
