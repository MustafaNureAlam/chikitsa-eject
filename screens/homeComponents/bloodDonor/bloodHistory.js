import React, {useState} from 'react'
import { 
    View, 
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Image
} from 'react-native';
import { 
    Ionicons,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Octicons,
    Entypo,
    Fontisto,
    MaterialIcons,
    Feather
} from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import DonataionHistoryScreen from './historyComponents/donataionHistory';
import RequestHistoryScreen from './historyComponents/requestHistory';
import ActiveDonationHistoryScreen from './historyComponents/activeDonationHistory';

const HistoryTab = createMaterialTopTabNavigator();

export default function BloodHistoryScreen({navigation}) {
    return (
        <SafeAreaView style={{backgroundColor:'#fff', flex:1}}>
            <StatusBar backgroundColor={'#075141'} />

            <View style={{flex:1}}>
                <HistoryTab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 12, fontWeight:'bold' },
                        tabBarActiveTintColor:'#3AAD94',
                        tabBarInactiveTintColor:'#ccc',
                        tabBarScrollEnabled:true,
                        tabBarIndicatorStyle:{backgroundColor:'#3AAD94'}
                    }}
                >
                    <HistoryTab.Screen 
                        options={{ tabBarLabel: 'Donation History'}}
                        name="DonataionHistoryScreen" 
                        component={DonataionHistoryScreen} 
                    />
                    
                    <HistoryTab.Screen 
                        options={{ tabBarLabel: 'Active Donation'}}
                        name="ActiveDonationHistoryScreen" 
                        component={ActiveDonationHistoryScreen} 
                    />

                    <HistoryTab.Screen 
                        options={{ tabBarLabel: 'Request History'}}
                        name="RequestHistoryScreen" 
                        component={RequestHistoryScreen} 
                    />
                    
                </HistoryTab.Navigator>
            </View>
        </SafeAreaView>
    )
}
