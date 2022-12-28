import React from 'react'
import { 
    View, 
    Text, 
    useWindowDimensions,
    TouchableOpacity
} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import NavigationDrawerHeader from '../../modules/navigationDrawerHeader';
import NurseVideoScreen from '../nurseComponents/tabScreens/video/video';

import { 
    Ionicons,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Octicons,
    Entypo,
    Fontisto ,
    MaterialIcons 
} from '@expo/vector-icons';

// import DoctorHome from '../doctorComponents/tabScreens/doctorHome';
import CustomSidebarMenu from '../../modules/customSidebar';
// import DoctorAppointmentScreen from '../doctorComponents/drawerScreens/doctorAppointment';
// import AddNewPatientScreen from '../doctorComponents/drawerScreens/addNewPatient';
// import MyPatientsScreen from '../doctorComponents/drawerScreens/myPatients';
// import DocSettingsScreen from '../doctorComponents/drawerScreens/docSettings';
// import DoctorVideoScreen from '../doctorComponents/tabScreens/video/video'
import NurseHomeScreen from '../nurseComponents/drawerScreens/nurseHome';
import NurseAppointmentScreen from '../nurseComponents/drawerScreens/nurseAppointment';
import NurseAddNewPatient from '../nurseComponents/drawerScreens/addNewPatientNurse';
import ServicesScreen from '../nurseComponents/drawerScreens/services/services';
import NurseVoiceCallServiceScreen from '../nurseComponents/drawerScreens/services/voiceCallService/voiceCall';
import CreateNurseCallServiceScreen from '../nurseComponents/drawerScreens/services/voiceCallService/createCallService';
import NurseVideoCallServiceScreen from '../nurseComponents/drawerScreens/services/videoCallService';
import NurseChatServiceScreen from '../nurseComponents/drawerScreens/services/chatService';
import CreateVideoCallServiceScreen from '../nurseComponents/drawerScreens/services/videoCallService/createVideoCallService';
import CreateChatServiceScreen from '../nurseComponents/drawerScreens/services/chatService/createChatService';


const NurseStack = createStackNavigator();
const NurseDrawer = createDrawerNavigator();

const HeaderBackButton = ({ navigation }) => (
    <TouchableOpacity 
      style={{
        marginLeft:10,
        position:'relative',
        top:1
      }} 
      onPress={() => navigation.navigate('NurseHome')}>
      <AntDesign name="left" size={24} color="black" />
    </TouchableOpacity>
);


const NurseHomeScreenStack = ({navigation}) => {
    return (
      <NurseStack.Navigator initialRouteName="NurseHome">
        
        <NurseStack.Screen
          name="NurseHome"
          component={NurseHomeScreen}
          options={{
            headerShown:false,
            title: '',
            // headerLeft: () => (
            //   <NavigationDrawerHeader navigationProps={navigation} />
            // ),
            // headerStyle: {
            //   backgroundColor: '#F9FAFE',
            //   borderBottomWidth:0 
            // },
            // headerTintColor: '#707070', 
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            //   fontSize:20 
            // },
            // headerTitleAlign:'center',
          }}
        />
        
        <NurseStack.Screen
          name="NurseVideoScreen"
          component={NurseVideoScreen}
          options={{
            headerShown:true,
            title: 'Video',
            // headerLeft: () => (
            //   <NavigationDrawerHeader navigationProps={navigation} />
            // ),
            // headerStyle: {
            //   backgroundColor: '#F9FAFE',
            //   borderBottomWidth:0 
            // },
            // headerTintColor: '#707070', 
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            //   fontSize:20 
            // },
            // headerTitleAlign:'center',
          }}
        />



        

      </NurseStack.Navigator>
    );
};

const NurseAppointmentScreenStack = ({navigation}) => {
    return(
        <NurseStack.Navigator>
            <NurseStack.Screen
                name='NurseAppointmentScreen'
                component={NurseAppointmentScreen}
                options={{
                    headerShown:true,
                    title: 'Appointment',
                    headerLeft: () => (
                        <HeaderBackButton navigation={navigation}/>
                    ),
                    headerStyle: {
                      backgroundColor: '#F9FAFE',
                      borderBottomWidth:0 
                    },
                    headerTintColor: '#707070', 
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize:20 
                    },
                    headerTitleAlign:'left',
                  }}
            />
        </NurseStack.Navigator>
    )
}


const NurseAddNewPatientScreenStack = ({navigation}) => {
    return(
        <NurseStack.Navigator>
            <NurseStack.Screen
                name='NurseAddNewPatient'
                component={NurseAddNewPatient}
                options={{
                    headerShown:true,
                    title: 'Add New Patient',
                    headerLeft: () => (
                        <HeaderBackButton navigation={navigation}/>
                    ),
                    headerStyle: {
                      backgroundColor: '#F9FAFE',
                      borderBottomWidth:0 
                    },
                    headerTintColor: '#707070', 
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize:20 
                    },
                    headerTitleAlign:'left',
                  }}
            />
        </NurseStack.Navigator>
    )
}


const ServiceScreenStack = ({navigation}) => {
    return(
        <NurseStack.Navigator initialRouteName='ServicesScreen' >
            
            <NurseStack.Screen
                name='ServicesScreen'
                component={ServicesScreen}
                options={{
                    headerShown:true,
                    title: 'Manage Services',
                    headerLeft: () => (
                        <HeaderBackButton navigation={navigation}/>
                    ),
                    headerStyle: {
                      backgroundColor: '#F9FAFE',
                      borderBottomWidth:0 
                    },
                    headerTintColor: '#707070', 
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize:20 
                    },
                    headerTitleAlign:'left',
                }}
            />

            <NurseStack.Screen
                name='NurseVoiceCallServiceScreen'
                component={NurseVoiceCallServiceScreen}
                options={{
                    headerShown:true,
                    title: 'Call Service',
                    headerStyle: {
                      backgroundColor: '#F9FAFE',
                      borderBottomWidth:0 
                    },
                    headerTintColor: '#707070', 
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize:20 
                    },
                    headerTitleAlign:'left',
                }}
            />

            <NurseStack.Screen
                name='CreateNurseCallServiceScreen'
                component={CreateNurseCallServiceScreen}
                options={{
                    headerShown:true,
                    title: 'Create call service',
                    headerStyle: {
                      backgroundColor: '#F9FAFE',
                      borderBottomWidth:0 
                    },
                    headerTintColor: '#707070', 
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize:20 
                    },
                    headerTitleAlign:'left',
                }}
            />

            <NurseStack.Screen
                name='NurseVideoCallServiceScreen'
                component={NurseVideoCallServiceScreen}
                options={{
                    headerShown:true,
                    title: 'Video Service',
                    headerStyle: {
                      backgroundColor: '#F9FAFE',
                      borderBottomWidth:0 
                    },
                    headerTintColor: '#707070', 
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize:20 
                    },
                    headerTitleAlign:'left',
                }}
            />  
            
            <NurseStack.Screen
                name='CreateVideoCallServiceScreen'
                component={CreateVideoCallServiceScreen}
                options={{
                    headerShown:true,
                    title: 'Video Service',
                    headerStyle: {
                      backgroundColor: '#F9FAFE',
                      borderBottomWidth:0 
                    },
                    headerTintColor: '#707070', 
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize:20 
                    },
                    headerTitleAlign:'left',
                }}
            />  
            <NurseStack.Screen
                name='NurseChatServiceScreen'
                component={NurseChatServiceScreen}
                options={{
                    headerShown:true,
                    title: 'Chat Service',
                    headerStyle: {
                      backgroundColor: '#F9FAFE',
                      borderBottomWidth:0 
                    },
                    headerTintColor: '#707070', 
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize:20 
                    },
                    headerTitleAlign:'left',
                }}
            />  
            
            <NurseStack.Screen
                name='CreateChatServiceScreen'
                component={CreateChatServiceScreen}
                options={{
                    headerShown:true,
                    title: 'Chat Service',
                    headerStyle: {
                      backgroundColor: '#F9FAFE',
                      borderBottomWidth:0 
                    },
                    headerTintColor: '#707070', 
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize:20 
                    },
                    headerTitleAlign:'left',
                }}
            />  
        </NurseStack.Navigator>
    )
}

// const DoctorSettingsScreenStack = ({navigation}) => {
//     return(
//         <DoctorStack.Navigator>
//             <DoctorStack.Screen
//                 name='DocSettingsScreen'
//                 component={DocSettingsScreen}
//                 options={{
//                     headerShown:true,
//                     title: 'My Patients',
//                     headerLeft: () => (
//                         <HeaderBackButton navigation={navigation}/>
//                     ),
//                     headerStyle: {
//                       backgroundColor: '#F9FAFE',
//                       borderBottomWidth:0 
//                     },
//                     headerTintColor: '#707070', 
//                     headerTitleStyle: {
//                       fontWeight: 'bold',
//                       fontSize:20 
//                     },
//                     headerTitleAlign:'left',
//                 }}
//             />
//         </DoctorStack.Navigator>
//     )
// }

const NurseDrawerNavigationRoutes = (props, route) => {

    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;


    return (
        <NurseDrawer.Navigator
            initialRouteName='NurseHome'
            backBehavior="initialRoute"
            drawerType={isLargeScreen ? 'permanent' : 'front'}
            // overlayColor={"transparent"}
            screenOptions={{ 
            drawerStyle:{width:210},
            itemStyle: {marginVertical: 5, color: 'white'},
            drawerActiveTintColor:'#3AAD94',
            drawerInactiveTintColor:'#A2A2C2',
            headerShown:false
            }}
            drawerContent={(props) => <CustomSidebarMenu {...props} />}
        >
            <NurseDrawer.Screen 
                name="NurseHomeScreenStack"
                options={{
                    drawerLabel: 'Home',
                    drawerLabelStyle:{ fontWeight:'bold' },
                    drawerIcon: ({focused, size}) => (
                        <Ionicons
                            name="md-home-outline"
                            size={size}
                            color={focused ? '#3AAD94' : '#A2A2C2'}
                        />
                    )}}
                component={NurseHomeScreenStack}
                initialParams={{ params: route.params }}
            />

            <NurseDrawer.Screen 
                name="NurseAppointmentScreenStack"
                options={{
                    drawerLabel: 'Appointment',
                    drawerLabelStyle:{ fontWeight:'bold' },
                    drawerIcon: ({focused, size}) => (
                        <Ionicons
                            name="checkbox-outline"
                            size={size}
                            color={focused ? '#3AAD94' : '#A2A2C2'}
                        />
                    )}}
                component={NurseAppointmentScreenStack}
                initialParams={{ params: route.params }}
            />

            <NurseDrawer.Screen 
                name="NurseAddNewPatientScreenStack"
                options={{
                    drawerLabel: 'Add New Patient',
                    drawerLabelStyle:{ fontWeight:'bold' },
                    drawerIcon: ({focused, size}) => (
                        <Ionicons
                            name="add-circle-outline"
                            size={size}
                            color={focused ? '#3AAD94' : '#A2A2C2'}
                        />
                    )}}
                component={NurseAddNewPatientScreenStack}
                initialParams={{ params: route.params }}
            />

            <NurseDrawer.Screen 
                name="ServiceScreenStack"
                options={{
                    drawerLabel: 'Services',
                    drawerLabelStyle:{ fontWeight:'bold' },
                    drawerIcon: ({focused, size}) => (
                            <MaterialIcons 
                                name="medical-services" 
                                size={20}
                                color={focused ? '#3AAD94' : '#A2A2C2'} 
                            />
                    )}}
                component={ServiceScreenStack}
                initialParams={{ params: route.params }}
            />

            {/* <NurseDrawer.Screen 
                name="DoctorSettingsScreenStack"
                options={{
                    drawerLabel: 'Settings',
                    drawerLabelStyle:{ fontWeight:'bold' },
                    drawerIcon: ({focused, size}) => (
                        <Ionicons
                            name="settings-outline"
                            size={size}
                            color={focused ? '#3AAD94' : '#A2A2C2'}
                        />
                    )}}
                component={DoctorSettingsScreenStack}
                initialParams={{ params: route.params }}
            /> */}

        </NurseDrawer.Navigator>
    )
}

export default NurseDrawerNavigationRoutes;
