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
import RBSheet from "react-native-raw-bottom-sheet";

import { 
    Ionicons,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Octicons,
    Entypo,
    Fontisto 
} from '@expo/vector-icons';

import DoctorHome from '../doctorComponents/tabScreens/doctorHome';
import CustomSidebarMenu from '../../modules/customSidebar';
import DoctorAppointmentScreen from '../doctorComponents/drawerScreens/doctorAppointment';
import AddNewPatientScreen from '../doctorComponents/drawerScreens/addNewPatient';
import MyPatientsScreen from '../doctorComponents/drawerScreens/myPatients';
import DocSettingsScreen from '../doctorComponents/drawerScreens/docSettings';
import DoctorVideoScreen from '../doctorComponents/tabScreens/video/video'
import ManageServiceScreen from '../doctorComponents/drawerScreens/settingsComponents/manageService';
import VoiceCallServiceScreen from '../doctorComponents/drawerScreens/settingsComponents/doctorServices/voiceCallService';
import VideoCallServiceScreen from '../doctorComponents/drawerScreens/settingsComponents/doctorServices/videoCallService';
import ChatServiceScreen from '../doctorComponents/drawerScreens/settingsComponents/doctorServices/chatService';
import CreateVoiceCallServiceScreen from '../doctorComponents/drawerScreens/settingsComponents/doctorServices/voiceCallService/createVoiceCallService';
import CreateVideoCallServiceScreen from '../doctorComponents/drawerScreens/settingsComponents/doctorServices/videoCallService/createVideoCallService';
import CreateChatServiceScreen from '../doctorComponents/drawerScreens/settingsComponents/doctorServices/chatService/createChatService';
import PrescriptionScreen from '../../modules/prescription';
import DocEndPrescriptionScreen from '../doctorComponents/drawerScreens/docEndPrescription';
import PrescriptionDetailsScreen from '../doctorComponents/drawerScreens/prescriptionDetails';


const DoctorStack = createStackNavigator();
const DoctorDrawer = createDrawerNavigator();



const HeaderBackButton = ({ navigation }) => (
    <TouchableOpacity 
      style={{
        marginLeft:10,
        position:'relative',
        top:1
      }} 
      onPress={() => navigation.navigate('DoctorHome')}>
      <AntDesign name="left" size={24} color="black" />
    </TouchableOpacity>
);


const DoctorHomeScreenStack = ({navigation}) => {
    return (
      <DoctorStack.Navigator initialRouteName="DoctorHome">
        
        <DoctorStack.Screen
          name="DoctorHome"
          component={DoctorHome}
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
        
        <DoctorStack.Screen
          name="DoctorVideoScreen"
          component={DoctorVideoScreen}
          options={{
            headerShown:true,
            title: 'In Call',
            headerRight: () => (
              <PrescriptionScreen navigationProps={navigation} />
            ),
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

      </DoctorStack.Navigator>
    );
};

const DoctorAppointmentScreenStack = ({navigation}) => {
    return(
        <DoctorStack.Navigator>
            <DoctorStack.Screen
                name='DoctorAppointmentScreen'
                component={DoctorAppointmentScreen}
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
        </DoctorStack.Navigator>
    )
}


const AddNewPatientScreenStack = ({navigation}) => {
    return(
        <DoctorStack.Navigator>
            <DoctorStack.Screen
                name='AddNewPatientScreen'
                component={AddNewPatientScreen}
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
        </DoctorStack.Navigator>
    )
}


const MyPatientScreenStack = ({navigation}) => {
    return(
        <DoctorStack.Navigator>
            <DoctorStack.Screen
                name='MyPatientsScreen'
                component={MyPatientsScreen}
                options={{
                    headerShown:true,
                    title: 'My Patients',
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
        </DoctorStack.Navigator>
    )
}

const DoctorPrescriptionStack = ({navigation}) => {
    return(
        <DoctorStack.Navigator>
            
            <DoctorStack.Screen
                name='DocEndPrescriptionScreen'
                component={DocEndPrescriptionScreen}
                options={{
                    headerShown:true,
                    title: 'Prescriptions',
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

            <DoctorStack.Screen
                name='PrescriptionDetailsScreen'
                component={PrescriptionDetailsScreen}
                options={{
                    headerShown:true,
                    title: 'Prescriptions details',
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
      </DoctorStack.Navigator>
    )
}

const DoctorSettingsScreenStack = ({navigation}) => {
    return(
        <DoctorStack.Navigator>
            <DoctorStack.Screen
                name='DocSettingsScreen'
                component={DocSettingsScreen}
                options={{
                    headerShown:true,
                    title: 'Settings',
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

            <DoctorStack.Screen
                name='ManageServiceScreen'
                component={ManageServiceScreen}
                options={{
                    headerShown:true,
                    title: 'Manage Services',
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

            <DoctorStack.Screen
                name='VoiceCallServiceScreen'
                component={VoiceCallServiceScreen}
                options={{
                    headerShown:true,
                    title: 'Voice call service',
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

            <DoctorStack.Screen
                name='CreateVoiceCallServiceScreen'
                component={CreateVoiceCallServiceScreen}
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

            <DoctorStack.Screen
                name='VideoCallServiceScreen'
                component={VideoCallServiceScreen}
                options={{
                    headerShown:true,
                    title: 'Video call service',
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

            <DoctorStack.Screen
                name='CreateVideoCallServiceScreen'
                component={CreateVideoCallServiceScreen}
                options={{
                    headerShown:true,
                    title: 'Create Video service',
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

            <DoctorStack.Screen
                name='ChatServiceScreen'
                component={ChatServiceScreen}
                options={{
                    headerShown:true,
                    title: 'Chat service',
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

            <DoctorStack.Screen
                name='CreateChatServiceScreen'
                component={CreateChatServiceScreen}
                options={{
                    headerShown:true,
                    title: 'Create Chat service',
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
        </DoctorStack.Navigator>
    )
}

const DoctorDrawerNavigationRoutes = (props, route) => {

    const dimensions = useWindowDimensions();
    const isLargeScreen = dimensions.width >= 768;


    return (
        <DoctorDrawer.Navigator
            initialRouteName='DoctorHome'
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
            <DoctorDrawer.Screen 
                name="DoctorHomeScreenStack"
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
                component={DoctorHomeScreenStack}
                initialParams={{ params: route.params }}
            />

            <DoctorDrawer.Screen 
                name="DoctorAppointmentScreenStack"
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
                component={DoctorAppointmentScreenStack}
                initialParams={{ params: route.params }}
            />

            {/* <DoctorDrawer.Screen 
                name="AddNewPatientScreenStack"
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
                component={AddNewPatientScreenStack}
                initialParams={{ params: route.params }}
            /> */}

            <DoctorDrawer.Screen 
                name="MyPatientScreenStack"
                options={{
                    drawerLabel: 'My Patients',
                    drawerLabelStyle:{ fontWeight:'bold' },
                    drawerIcon: ({focused, size}) => (
                        <FontAwesome5 
                            name="users" 
                            size={20}
                            color={focused ? '#3AAD94' : '#A2A2C2'}/>
                    )}}
                component={MyPatientScreenStack}
                initialParams={{ params: route.params }}
            />

            <DoctorDrawer.Screen 
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
            />

            <DoctorDrawer.Screen 
                name="DoctorPrescriptionStack"
                options={{
                    drawerLabel: 'Prescriptions',
                    drawerLabelStyle:{ fontWeight:'bold' },
                    drawerIcon: ({focused, size}) => (
                        <Ionicons
                            name="ios-pencil-outline"
                            size={size}
                            color={focused ? '#3AAD94' : '#A2A2C2'}
                        />
                    )}}
                component={DoctorPrescriptionStack}
                initialParams={{ params: route.params }}
            />

        </DoctorDrawer.Navigator>

        
    )
}

export default DoctorDrawerNavigationRoutes
