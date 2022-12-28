import React from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity
} from 'react-native';

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
import NurseDrawerNavigationRoutes from './nurseDrawerNavigation';
import NurseChatScreen from '../nurseComponents/tabScreens/nurseChat';
import NurseNotificationScreen from '../nurseComponents/tabScreens/nurseNotification';
import PatientListNurse from '../nurseComponents/tabScreens/patientListNurse';
import NurseProfileScreen from '../nurseComponents/tabScreens/nurseProfile';
import UpdateNursePersonalScreen from '../nurseComponents/tabScreens/nurseProfile/update/updateNursePersonal';
import CreateNurseConcernScreen from '../nurseComponents/tabScreens/nurseProfile/create/createNurseConcern';
import CreateNurseSpecialityScreen from '../nurseComponents/tabScreens/nurseProfile/create/createNurseSpeciality';
import CreateNurseEducationScreen from '../nurseComponents/tabScreens/nurseProfile/create/createNurseEducation';
import UpdateNurseEducationScreen from '../nurseComponents/tabScreens/nurseProfile/update/updateNurseEducation';
import CreateNurseCertificateScreen from '../nurseComponents/tabScreens/nurseProfile/create/createNurseCertificate';
import UpdateNurseCertificateScreen from '../nurseComponents/tabScreens/nurseProfile/update/updateNurseCertificate';
import CreateNurseAwardsScreen from '../nurseComponents/tabScreens/nurseProfile/create/createNurseAward';
import UpdateNurseAwardsScreen from '../nurseComponents/tabScreens/nurseProfile/update/updateNurseAward';
import CreateNurseMembershipScreen from '../nurseComponents/tabScreens/nurseProfile/create/createNurseMembership';
import UpdateNurseMembershipScreen from '../nurseComponents/tabScreens/nurseProfile/update/updateNurseMembership';

const NurseEndTab = createMaterialBottomTabNavigator();
const NurseProfileStack = createStackNavigator();

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

const NurseProfileScreenStack = ({navigation}) => {
    return (
      <NurseProfileStack.Navigator
        initialRouteName="NurseProfileScreen"
        screenOptions={{
          
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
        
        <NurseProfileStack.Screen
          name="NurseProfileScreen"
          component={NurseProfileScreen}
          options={{
            title: 'Nurse Profile',
            headerShown:true,
            headerLeft: () => (
                <HeaderBackButton navigation={navigation}/>
              ),
          }}
        />
        
        
        <NurseProfileStack.Screen
          name="UpdateNursePersonalScreen"
          component={UpdateNursePersonalScreen}
          options={{
            title: 'Update Profile',
            headerShown:true,
          }}
        />
        
        
        <NurseProfileStack.Screen
          name="CreateNurseConcernScreen"
          component={CreateNurseConcernScreen}
          options={{
            title: 'Create Concerns',
            headerShown:true,
          }}
        />
        
        
        <NurseProfileStack.Screen
          name="CreateNurseSpecialityScreen"
          component={CreateNurseSpecialityScreen}
          options={{
            title: 'Create Speciality',
            headerShown:true,
          }}
        />
        
        <NurseProfileStack.Screen
          name="CreateNurseEducationScreen"
          component={CreateNurseEducationScreen}
          options={{
            title: 'Create Education',
            headerShown:true,
          }}
        />
        
        <NurseProfileStack.Screen
          name="UpdateNurseEducationScreen"
          component={UpdateNurseEducationScreen}
          options={{
            title: 'Update Education',
            headerShown:true,
          }}
        />
        
        <NurseProfileStack.Screen
          name="CreateNurseCertificateScreen"
          component={CreateNurseCertificateScreen}
          options={{
            title: 'Create Certificate',
            headerShown:true,
          }}
        />
        
        <NurseProfileStack.Screen
          name="UpdateNurseCertificateScreen"
          component={UpdateNurseCertificateScreen}
          options={{
            title: 'Update Certificate',
            headerShown:true,
          }}
        />
        
        <NurseProfileStack.Screen
          name="CreateNurseAwardsScreen"
          component={CreateNurseAwardsScreen}
          options={{
            title: 'Create Award',
            headerShown:true,
          }}
        />
        
        <NurseProfileStack.Screen
          name="UpdateNurseAwardsScreen"
          component={UpdateNurseAwardsScreen}
          options={{
            title: 'Update Award',
            headerShown:true,
          }}
        />
        
        <NurseProfileStack.Screen
          name="CreateNurseMembershipScreen"
          component={CreateNurseMembershipScreen}
          options={{
            title: 'Create Membership',
            headerShown:true,
          }}
        />
        
        <NurseProfileStack.Screen
          name="UpdateNurseMembershipScreen"
          component={UpdateNurseMembershipScreen}
          options={{
            title: 'Update Membership',
            headerShown:true,
          }}
        />

      </NurseProfileStack.Navigator>
    );
};

const NurseTabNavigationRoutes = () => {

    return (

        <NurseEndTab.Navigator 
            backBehavior="initialRoute"
            initialRouteName="NurseDrawerNavigationRoutes"
            activeColor="#3AAD94"
            inactiveColor="#ccc"
            barStyle={{ backgroundColor: '#D9FFF0' }}
            >

            <NurseEndTab.Screen  
                name="NurseDrawerNavigationRoutes" 
                component={NurseDrawerNavigationRoutes}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="home" color={color} size={24} />
                    ),
                }}
            />
            
            <NurseEndTab.Screen  
                name="NurseNotification" 
                component={NurseNotificationScreen}
                options={{
                    tabBarBadge:true,
                    tabBarLabel: 'Notification',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialIcons name="notification-important" size={24} color={color} />
                    ),
                }}
            />

            <NurseEndTab.Screen 
                name="PatientListNurse" 
                component={PatientListNurse}
                options={{
                    tabBarLabel: 'Patients',
                    tabBarIcon: ({ color, focused }) => (
                        <Entypo name="user" size={24} color={color} />
                    ),
                }}
            />

            <NurseEndTab.Screen  
                name="NurseProfileScreenStack" 
                component={NurseProfileScreenStack}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <FontAwesome5 name="user-nurse" size={24} color={color} />
                    ),
                }}
            />

            <NurseEndTab.Screen  
                name="NurseChat" 
                component={NurseChatScreen}
                options={{
                    tabBarLabel: 'Chat',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name="ios-chatbubbles-outline" size={24} color={color} />
                    ),
                }}
            />

        </NurseEndTab.Navigator>
    )
}

export default NurseTabNavigationRoutes;
