import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';

import { 
    MaterialCommunityIcons,
    AntDesign,
    MaterialIcons,
    FontAwesome,
    Entypo,
    FontAwesome5,
    Ionicons  
} from '@expo/vector-icons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import DoctorHomeScreen from '../doctorComponents/tabScreens/doctorHome';
import NotificationScreen from '../doctorComponents/tabScreens/notifications';
import DoctorProfileScreen from '../doctorComponents/tabScreens/doctorProfile';
import PatientListScreen from '../doctorComponents/tabScreens/patientList';
import DoctorChatScreen from '../doctorComponents/tabScreens/doctorChat';
import DoctorDrawerNavigationRoutes from './doctorDrawerNavigationRoutes';
import UpdateDocPersonalData from '../doctorComponents/tabScreens/doctorProfileTab/updateDocPersonal';
import CreateDocAwardsScreen from '../doctorComponents/tabScreens/doctorProfileTab/create/createDocAwards';
import UpdateDocAwardsScreen from '../doctorComponents/tabScreens/doctorProfileTab/update/updateDocAwards';
import CreateDocMembershipScreen from '../doctorComponents/tabScreens/doctorProfileTab/create/createDocMembership';
import UpdateDocMembershipScreen from '../doctorComponents/tabScreens/doctorProfileTab/update/updateDocMembership';
import CreateDocEducationScreen from '../doctorComponents/tabScreens/doctorProfileTab/create/createDocEducation';
import CreateDocCertificateScreen from '../doctorComponents/tabScreens/doctorProfileTab/create/createDocCertificate';
import UpdateDocEducationScreen from '../doctorComponents/tabScreens/doctorProfileTab/update/updateDocEducation';
import UpdateDoctorCertificateScreen from '../doctorComponents/tabScreens/doctorProfileTab/update/updateDocCertificate';
import CreateDocConcernScreen from '../doctorComponents/tabScreens/doctorProfileTab/create/createDocConcern';
import CreateDocSpecialityScreen from '../doctorComponents/tabScreens/doctorProfileTab/create/createDocSpeciality';
import CreateDoctorSlotScreen from '../doctorComponents/tabScreens/doctorProfileTab/create/createDoctorSlot';
import CreateSlotTimeScreen from '../doctorComponents/tabScreens/doctorProfileTab/create/createSlotTime';
import CreateDocSymptoms from '../doctorComponents/tabScreens/doctorProfileTab/create/createProblem';
const DoctorEndTab = createMaterialBottomTabNavigator();
const DoctorProfileStack = createStackNavigator();

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

const DoctorProfileScreenStack = ({navigation}) => {
    return (
      <DoctorProfileStack.Navigator
        initialRouteName="DoctorProfileScreen"
        screenOptions={{
          
          headerShown:true,
          headerStyle: {
            backgroundColor: '#F9FAFE',
            borderBottomWidth:0
          },
          headerTintColor: '#707070',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:20
          },
          headerTitleAlign:'left'
        }}>

        <DoctorProfileStack.Screen
          name="DoctorProfileScreen"
          component={DoctorProfileScreen}
          options={{
            title: 'Doctor Profile',
            headerShown:true,
            headerLeft: () => (
                <HeaderBackButton navigation={navigation}/>
              ),
          }}
        />
        
        <DoctorProfileStack.Screen
          name="UpdateDocPersonalData"
          component={UpdateDocPersonalData}
          options={{
            title: 'Update personal info',
            headerShown:true
          }}
        />
        
        <DoctorProfileStack.Screen
          name="CreateDocAwardsScreen"
          component={CreateDocAwardsScreen}
          options={{
            title: 'Create Awards',
            headerShown:true
          }}
        />
        
        <DoctorProfileStack.Screen
          name="UpdateDocAwardsScreen"
          component={UpdateDocAwardsScreen}
          options={{
            title: 'Update Awards',
            headerShown:true
          }}
        />
        
        <DoctorProfileStack.Screen
          name="CreateDocMembershipScreen"
          component={CreateDocMembershipScreen}
          options={{
            title: 'Create Membership',
            headerShown:true
          }}
        />
        
        <DoctorProfileStack.Screen
          name="UpdateDocMembershipScreen"
          component={UpdateDocMembershipScreen}
          options={{
            title: 'Update Membership',
            headerShown:true
          }}
        />
        
        <DoctorProfileStack.Screen
          name="CreateDocEducationScreen"
          component={CreateDocEducationScreen}
          options={{
            title: 'Create Education',
            headerShown:true
          }}
        />
        
        
        <DoctorProfileStack.Screen
          name="UpdateDocEducationScreen"
          component={UpdateDocEducationScreen}
          options={{
            title: 'Update Education',
            headerShown:true
          }}
        />
        
        <DoctorProfileStack.Screen
          name="CreateDocCertificateScreen"
          component={CreateDocCertificateScreen}
          options={{
            title: 'Create Certificate',
            headerShown:true
          }}
        />
        
        <DoctorProfileStack.Screen
          name="UpdateDoctorCertificateScreen"
          component={UpdateDoctorCertificateScreen}
          options={{
            title: 'Update Certificate',
            headerShown:true
          }}
        />

        <DoctorProfileStack.Screen
          name="CreateDocConcernScreen"
          component={CreateDocConcernScreen}
          options={{
            title: 'Create Concern',
            headerShown:true
          }}
        />

        <DoctorProfileStack.Screen
          name="CreateDocSymptoms"
          component={CreateDocSymptoms}
          options={{
            title: 'Create Symptom',
            headerShown:true
          }}
        />
        

        <DoctorProfileStack.Screen
          name="CreateDocSpecialityScreen"
          component={CreateDocSpecialityScreen}
          options={{
            title: 'Create Speciality',
            headerShown:true
          }}
        />
        

        <DoctorProfileStack.Screen
          name="CreateDoctorSlotScreen"
          component={CreateDoctorSlotScreen}
          options={{
            title: 'Create Slot',
            headerShown:true
          }}
        />
        

        <DoctorProfileStack.Screen
          name="CreateSlotTimeScreen"
          component={CreateSlotTimeScreen}
          options={{
            title: 'Create slot Time',
            headerShown:true
          }}
        />
        
      </DoctorProfileStack.Navigator>
    );
};

const DoctorTabNavigationRoutes = () => {

    return (

        <DoctorEndTab.Navigator 
            backBehavior="initialRoute"
            initialRouteName="DoctorDrawerNavigationRoutes"
            activeColor="#3AAD94"
            inactiveColor="#ccc"
            barStyle={{ backgroundColor: '#D9FFF0' }}
            >

            <DoctorEndTab.Screen  
                name="DoctorDrawerNavigationRoutes" 
                component={DoctorDrawerNavigationRoutes}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="home" color={color} size={24} />
                    ),
                }}
            />
            
            <DoctorEndTab.Screen  
                name="DoctorNotifications" 
                component={NotificationScreen}
                options={{
                    tabBarBadge:true,
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name="notification-important" size={24} color={color} />
                    ),
                }}
            />

            {/* <DoctorEndTab.Screen 
                name="PatientList" 
                component={PatientListScreen}
                options={{
                    tabBarLabel: 'Patients',
                    tabBarIcon: ({ color, focused }) => (
                        <Entypo name="user" size={24} color={color} />
                    ),
                }}
            /> */}

            <DoctorEndTab.Screen  
                name="DoctorProfileScreenStack" 
                component={DoctorProfileScreenStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesome5 name="user-nurse" size={24} color={color} />
                    ),
                }}
            />

            <DoctorEndTab.Screen  
                name="DoctorChat" 
                component={DoctorChatScreen}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name="ios-chatbubbles-outline" size={24} color={color} />
                    ),
                }}
            />

        </DoctorEndTab.Navigator>
    )
}

export default DoctorTabNavigationRoutes;
