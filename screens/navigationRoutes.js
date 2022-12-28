
// Import React
import React, {useState} from 'react';
// Import Navigators from React Navigation
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import { 
  useWindowDimensions, 
  Button, 
  View, 
  Text, 
  TouchableOpacity,
  DeviceEventEmitter 
} from 'react-native';

import NavigationDrawerHeader from './modules/navigationDrawerHeader';
import CustomSidebarMenu from './modules/customSidebar';
import * as Animatable from 'react-native-animatable';

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

import AppointmentScreen from './drawer/appointments';
import BookingScreen from './drawer/booking';
import DrawerHomeScreen from './drawer/drawerHome';
import OrderScreen from './drawer/order';
import ConsultationScreen from './drawer/consultation';
import MedicalReportScreen from './drawer/medicalReport';
import MyDoctorScreen from './drawer/myDoctor';
import ReminderScreen from './drawer/reminder';
import PaymentScreen from './drawer/payment';
import DoctorNearbyScreen from './homeComponents/doctorNearby/doctorNearby';
import AutoAppointmentScreen from './homeComponents/autoAppointment/autoAppointment';
import InstantVideoConsultScreen from './homeComponents/instantVideoConsult/instantVideoConsult';
import ClinicNearbyScreen from './homeComponents/clinicNearby/clinicNearby';
import PharmacyScreen from './homeComponents/pharmacy/pharmacy';

import HealthConcernScreen from './homeComponents/doctorNearby/doctorTab/healthConcern';
import SpecialityScreen from './homeComponents/doctorNearby/doctorTab/speciality';
import OrganDonorScreen from './homeComponents/organDonor/organDonor';
import BloodDonorScreen from './homeComponents/bloodDonor/bloodDonor';
import ReportDeliveryScreen from './homeComponents/reportDelivery/reportDelivery';
import DoctorList from './homeComponents/doctorNearby/doctorTab/doctorList';
import MapScreen from './homeComponents/map/map';
import VideoScreen from './homeComponents/video/video';
import SpecialDocScreen from './homeComponents/doctorNearby/doctorTab/specialDocList';
import NurseHealthConcernScreen from './homeComponents/nurse nearby/nurseTab/nurseHealthconcern';
import NurseSpecialityScreen from './homeComponents/nurse nearby/nurseTab/nurseSpeciality';
import NurseListBySpeciality from './homeComponents/nurse nearby/speciality/nurseListBySpeciality';
import NurseListByConcern from './homeComponents/nurse nearby/healthConcern/nurseListByConcern';
import UpdateBloodDonorScreen from './homeComponents/bloodDonor/updateBloodDonor';
import SinglePharmacyScreen from './homeComponents/pharmacy/allPharmacy/singlePharmacy';
import PharmacyHomeScreen from './homeComponents/pharmacy/pharmacy';
import DocListByConcernScreen from './homeComponents/doctorNearby/doctorTab/healthConcernTab/docListByConcern';
import DocBySpecialityScreen from './homeComponents/doctorNearby/doctorTab/specialityTab/docBySpeciality';
import ConcernDocDetailsScreen from './homeComponents/doctorNearby/doctorTab/healthConcernTab/concernDocDetails';
import SpecialityDocDetailsScreen from './homeComponents/doctorNearby/doctorTab/specialityTab/specialityDocDetails';
import NurseDetailsConcernScreen from './homeComponents/nurse nearby/healthConcern/nurseDetailsConcern';
import MyPrescriptionScreen from './drawer/myPrescription';
import PatientPrescriptionDetailsScreen from './drawer/prescriptionDetails/patientPrescriptionDetails';
import NurseDetailsBySpecialityScreen from './homeComponents/nurse nearby/speciality/nurseDetailsBySpeciality';
import BloodHistoryScreen from './homeComponents/bloodDonor/bloodHistory';
import CategoryScreen from './homeComponents/pharmacy/categories.js/category';
import MedicineDetailsPharm from './homeComponents/pharmacy/allPharmacy/medicineDetailsPharm';
import DoctorDirectoryScreen from './homeComponents/doctorDirectory/doctorDirectory';
import ViewDoctorProfileScreen from './homeComponents/doctorDirectory/viewDoctorProfile';
import MedicalAssistantScreen from './homeComponents/medicalAssistant/medicalAssistant';
import ViewAssistantProfileScreen from './homeComponents/medicalAssistant/viewAssistantProfile';
import OrderDetailsScreen from './drawer/orderDetails';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import SymptomsScreen from './homeComponents/symptoms/symptoms';





const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const DoctorTab = createMaterialTopTabNavigator();
const NurseTab = createMaterialTopTabNavigator();

// const [animating, setAnimating] = useState(true);


const HeaderBackButton = ({ navigation }) => (
  <TouchableOpacity 
    style={{
      marginLeft:10,
      position:'relative',
      top:1
    }} 
    onPress={() => navigation.navigate('DrawerHomeScreen')}>
    <AntDesign name="left" size={24} color="black" />
  </TouchableOpacity>
);



//////doctorTab Navigation

const DoctorTabNavigation = ({props, route}) => {
  return (
    <DoctorTab.Navigator 
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight:'bold' },
          // tabBarItemStyle: { width: 100 },
          tabBarActiveTintColor:'#3AAD94',
          tabBarInactiveTintColor:'#ccc',
          // tabBarScrollEnabled:true,
          tabBarIndicatorStyle:{backgroundColor:'#3AAD94'}
      }}
    >
      <DoctorTab.Screen 
        name="HealthConcernStack" 
        component={HealthConcernStack}
        options={{
          tabBarLabel:'Health Concern',
        }}
      />

      <DoctorTab.Screen 
        name="SpecialityStack" 
        component={SpecialityStack}
        options={{
          tabBarLabel:'Speciality',
        }}
      />
    </DoctorTab.Navigator>
  );
}


//////Nursetab Navigation

const NurseTabNavigation = ({props, route}) => {
  return (
    <NurseTab.Navigator 
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontWeight:'bold' },
          // tabBarItemStyle: { width: 100 },
          tabBarActiveTintColor:'#3AAD94',
          tabBarInactiveTintColor:'#ccc',
          // tabBarScrollEnabled:true,
          tabBarIndicatorStyle:{backgroundColor:'#3AAD94'}
      }}
    >
      <NurseTab.Screen 
        name="NursehealthConcernStack" 
        component={NursehealthConcernStack}
        options={{
          tabBarLabel:'Health Concern',
        }}
      />

      <NurseTab.Screen 
        name="NursespecialityStack" 
        component={NursespecialityStack}
        options={{
          tabBarLabel:'Speciality',
        }}
      />
    </NurseTab.Navigator>
  );
}


const NursehealthConcernStack = ({navigation}) => {
  return(
    <Stack.Navigator initialRouteName='NurseHealthConcernScreen'>
      <Stack.Screen
        name='NurseHealthConcernScreen'
        component={NurseHealthConcernScreen}
        options={{
          headerShown:false
        }}
      />
    </Stack.Navigator>
  );
}

const NursespecialityStack = ({navigation}) => {
  return(
    <Stack.Navigator initialRouteName='NurseSpecialityScreen'>
      <Stack.Screen
        name='NurseSpecialityScreen'
        component={NurseSpecialityScreen}
        options={{
          headerShown:false
        }}
      />
    </Stack.Navigator>
  );
}

const HealthConcernStack = ({navigation}) => {
  return(
    <Stack.Navigator initialRouteName='HealthConcernScreen'>
      
      <Stack.Screen
        name='HealthConcernScreen'
        component={HealthConcernScreen}
        options={{
          headerShown:false
        }}
      />
      
      <Stack.Screen
        name='DoctorList'
        component={DoctorList}
        options={{
          headerShown:false
        }}
      />
    </Stack.Navigator>
  );
}

const SpecialityStack = ({navigation}) => {
  return(
    <Stack.Navigator initialRouteName='SpecialityScreen'>
      <Stack.Screen
        name='SpecialityScreen'
        component={SpecialityScreen}
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen
        name='SpecialDocScreen'
        component={SpecialDocScreen}
        options={{
          headerShown:false
        }}
      />
    </Stack.Navigator>
  );
}


const BloodDonorStack = ({navigation}) => {
  return(
    <Stack.Navigator initialRouteName='BloodDonorScreen'>
      
      <Stack.Screen
        name='BloodDonorScreen'
        component={BloodDonorScreen}
        options={{
          headerShown:true,
          // headerRight: () => (
            
          //   <TouchableOpacity style={{
          //     paddingHorizontal:10,
          //     paddingVertical:5,
          //     position:'absolute',
          //     right:10
          //   }}>
              
          //     <Animatable.View 
          //         animation="pulse" 
          //         easing="ease-out" 
          //         iterationCount="infinite" 
          //         style={{ textAlign: 'center' }}
          //     >

          //       <MaterialIcons 
          //         name="history" 
          //         size={28} 
          //         color="#4B7BE5" 
          //         onPress={() => {
          //           navigation.navigate('BloodHistoryScreen')
          //         }}
          //       />

          //     </Animatable.View>
              
              
          //   </TouchableOpacity>
          // ),
          title:'Blood Donations'
        }}
      />

      <Stack.Screen
        name='UpdateBloodDonorScreen'
        component={UpdateBloodDonorScreen}
        options={{
          headerShown:true,
          title:'Interested to donate'
        }}
      />
      

      <Stack.Screen
        name='BloodHistoryScreen'
        component={BloodHistoryScreen}
        options={{
          headerShown:true,
          title:'History'
        }}
      />

    </Stack.Navigator>
  );
}

const PharmacyScreenStack = ({navigation, route}) => {
  return(
    <Stack.Navigator initialRouteName='PharmacyHomeScreen'>
      <Stack.Screen
        name='PharmacyHomeScreen'
        component={PharmacyHomeScreen}
        options={{
          headerShown:true,
          // headerLeft: () => (
          //   <HeaderBackButton navigation={navigation}/>
          // ),
          title:'Pharmacy'
        }}
      />
      
      <Stack.Screen
        name='SinglePharmacyScreen'
        component={SinglePharmacyScreen}
        options={{
          headerShown:true,
          title:'Pharmacy Details'
        }}
      />
      
      <Stack.Screen
        name='MedicineDetailsPharm'
        component={MedicineDetailsPharm}
        options={{
          headerShown:true,
          title:'Medicine Details'
        }}
      />

      <Stack.Screen
        name='CategoryScreen'
        component={CategoryScreen}
        // options={{
        //   headerShown:true,
        //   title:'Category'
        // }}
        options={({ route }) => ({ 
          title: Object.keys(route.params?.category)[0].toUpperCase(), 
          headerShown:true, 
        })}
      />

    </Stack.Navigator>
  );
}


const DoctorDirectoryStack = ({navigation}) => {
  return(
    <Stack.Navigator initialRouteName='DoctorDirectoryScreen'>
      <Stack.Screen
        name='DoctorDirectoryScreen'
        component={DoctorDirectoryScreen}
        options={{
          headerShown:true,
          // headerLeft: () => (
          //   <HeaderBackButton navigation={navigation}/>
          // ),
          title:'Doctor directory'
        }}
      />
      
      <Stack.Screen
        name='ViewDoctorProfileScreen'
        component={ViewDoctorProfileScreen}
        options={{
          headerShown:true,
          title:'Doctor profile'
        }}
      />

    </Stack.Navigator>
  );
}


const AssistantDirectoryStack = ({navigation}) => {
  return(
    <Stack.Navigator initialRouteName='MedicalAssistantScreen'>
      <Stack.Screen
        name='MedicalAssistantScreen'
        component={MedicalAssistantScreen}
        options={{
          headerShown:true,
          title:'Medical assist. directory'
        }}
      />
      
      <Stack.Screen
        name='ViewAssistantProfileScreen'
        component={ViewAssistantProfileScreen}
        options={{
          headerShown:true,
          title:'Assistant profile'
        }}
      />

    </Stack.Navigator>
  );
}
 

/////starts the drawer main stack on after another

const HomeScreenStack = ({navigation, route}) => {

  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    // console.log('==========getFocusedRouteNameFromRoute==========')
    // console.log(routeName)
    // console.log('==========getFocusedRouteNameFromRoute==========')
    
    DeviceEventEmitter.emit('check_navigation', {params : routeName})

    // if (routeName === 'DrawerHomeScreen') {

    //   console.log('got it')
    //   // navigation.setOptions({tabBarStyle : {display : 'none'}});
    //   navigation.setOptions({ tabBarVisible : false })
    // } else {
    //   console.log('else')
    //   navigation.setOptions({tabBarVisible : true});
    // }
  }, [navigation, route]);
  return (
    <Stack.Navigator initialRouteName="DrawerHomeScreen">
      
      <Stack.Screen
        name="DrawerHomeScreen"
        component={DrawerHomeScreen}
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

      <Stack.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          headerShown:true,
          title: 'Map',
          // headerLeft: () => (
          //   <NavigationDrawerHeader navigationProps={navigation} />
          // ),
          headerStyle: {
            backgroundColor: '#F9FAFE',
            borderBottomWidth:0 
          },
          headerTintColor: '#707070', 
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:20 
          },
          headerTitleAlign:'center',
        }}
      />

      <Stack.Screen
        name="VideoScreen"
        component={VideoScreen}
        options={{
          headerShown:true,
          title: 'Video',
          // headerLeft: () => (
          //   <NavigationDrawerHeader navigationProps={navigation} />
          // ),
          headerStyle: {
            backgroundColor: '#F9FAFE',
            borderBottomWidth:0 
          },
          headerTintColor: '#707070', 
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize:20 
          },
          headerTitleAlign:'center',
        }}
      />

      <Stack.Screen
        name="DoctorNearbyScreenStack"
        component={DoctorNearbyScreenStack}
        options={{
          headerShown:false,
          // title: 'Doctor Nearby',
          // headerLeft: () => (
          //   <HeaderBackButton navigation={navigation}/>
          // ),
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

      <Stack.Screen
        name="NurseNearbyScreenStack"
        component={NurseNearbyScreenStack}
        options={{
          headerShown:false,
          // title: 'Nurse Nearby',
          // headerLeft: () => (
          //   <HeaderBackButton navigation={navigation}/>
          // ),
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

      <Stack.Screen
        name="AutoAppointmentScreen"
        component={AutoAppointmentScreen}
        options={{
          headerShown:true,
          title: 'Auto Appointment',
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

      <Stack.Screen
        name="InstantVideoConsultScreen"
        component={InstantVideoConsultScreen}
        options={{
          headerShown:true,
          title: 'Instant Video Consultation',
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

      <Stack.Screen
        name="ClinicNearbyScreenStack"
        component={ClinicNearbyScreenStack}
        options={{
          headerShown:true,
          title: 'Clinics Nearby',
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

      <Stack.Screen
        name="PharmacyScreenStack"
        component={PharmacyScreenStack}
        options={{
          headerShown:false,
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

      <Stack.Screen
        name="DoctorDirectoryStack"
        component={DoctorDirectoryStack}
        options={{
          headerShown:false,
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

      <Stack.Screen
        name="AssistantDirectoryStack"
        component={AssistantDirectoryStack}
        options={{
          headerShown:false,
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

      <Stack.Screen
        name="SymptomsScreen"
        component={SymptomsScreen}
        options={({ route }) => ({ title: route.params.title, headerShown:true })}
        // options={{
        //   headerShown:true,
        //   title:route.params.title,
        //   headerStyle: {
        //     backgroundColor: '#F9FAFE',
        //     borderBottomWidth:0 
        //   },
        //   headerTintColor: '#707070', 
        //   headerTitleStyle: {
        //     fontWeight: 'bold',
        //     fontSize:20 
        //   },
        //   headerTitleAlign:'left',
        // }}
      />

      <Stack.Screen
        name="OrganDonorScreen"
        component={OrganDonorScreen}
        options={{
          headerShown:true,
          title: 'Organ Donations',
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

      <Stack.Screen
        name="BloodDonorStack"
        component={BloodDonorStack}
        options={{
          headerShown:false,
          // title: 'Blood Donations',
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

      <Stack.Screen
        name="ReportDeliveryScreen"
        component={ReportDeliveryScreen}
        options={{
          headerShown:true,
          title: 'Report Delivery',
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
    </Stack.Navigator>
  );
};

///////  DoctorNearbyScreenStack

const DoctorNearbyScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="HealthConcernScreen"
      screenOptions={{
        headerShown:false,
        // headerLeft: () => (
        //   <HeaderBackButton navigation={navigation}/>
        // ),
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

      <Stack.Screen
        name="DoctorTabNavigation"
        component={DoctorTabNavigation}
        options={{
          title: 'Doctor', 
          headerShown:true
        }}
      />

      <Stack.Screen
        name="DocListByConcernScreen"
        component={DocListByConcernScreen}
        options={{
          title: 'Health Concern', 
          headerShown:true
        }}
      />

      <Stack.Screen
        name="ConcernDocDetailsScreen"
        component={ConcernDocDetailsScreen}
        options={{
          title: 'Doctor Details', 
          headerShown:true
        }}
      />

      <Stack.Screen
        name="DocBySpecialityScreen"
        component={DocBySpecialityScreen}
        options={{
          title: 'Speciality', 
          headerShown:true
        }}
      />

      <Stack.Screen
        name="SpecialityDocDetailsScreen"
        component={SpecialityDocDetailsScreen}
        options={{
          title: 'Doctor Details', 
          headerShown:true
        }}
      />

    </Stack.Navigator>
  );
};

///Nurse nearby stack
const NurseNearbyScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="HealthConcernScreen"
      screenOptions={{
        headerShown:false,
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

      <Stack.Screen
        name="NurseTabNavigation"
        component={NurseTabNavigation}
        options={{
          title: 'Medical Assistant', 
          headerShown:true
        }}
      />

      <Stack.Screen
        name='NurseListByConcern'
        component={NurseListByConcern}
        options={{
          title:'Nurse by Health Concern',
          headerShown:true
        }}
      />

      <Stack.Screen
        name='NurseListBySpeciality'
        component={NurseListBySpeciality}
        options={{
          title:'Nurse by Speciality',
          headerShown:true
        }}
      />

      <Stack.Screen
        name="NurseDetailsConcernScreen"
        component={NurseDetailsConcernScreen}
        options={{
          title: 'Nurse Details', 
          headerShown:true
        }}
      />

      <Stack.Screen
        name="NurseDetailsBySpecialityScreen"
        component={NurseDetailsBySpecialityScreen}
        options={{
          title: 'Nurse Details', 
          headerShown:true
        }}
      />

    </Stack.Navigator>
  );
};


const ClinicNearbyScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ClinicNearbyScreen"
      screenOptions={{
        // headerShown:false,
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
        headerTitleAlign:'left'
      }}>

      <Stack.Screen
        name="ClinicNearbyScreen"
        component={ClinicNearbyScreen}
        options={{
          title: '', 
          headerShown:false
        }}
      />
    </Stack.Navigator>
  );
};

const AppointmentScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="AppointmentScreen"
      screenOptions={{
        headerShown:false,
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
        headerTitleAlign:'left'
      }}>
      <Stack.Screen
        name="AppointmentScreen"
        component={AppointmentScreen}
        options={{
          title: 'Appointments',
          headerShown:true
        }}
      />
    </Stack.Navigator>
  );
};

const MyPrescriptionScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="MyPrescriptionScreen"
      screenOptions={{
        headerShown:false,
        // headerLeft: () => (
        //   <HeaderBackButton navigation={navigation}/>
        // ),
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
      
      <Stack.Screen
        name="MyPrescriptionScreen"
        component={MyPrescriptionScreen}
        options={{
          title: 'My prescriptions',
          headerShown:true,
          headerLeft: () => (
            <HeaderBackButton navigation={navigation}/>
          ),
        }}
      />
      
      
      <Stack.Screen
        name="PatientPrescriptionDetailsScreen"
        component={PatientPrescriptionDetailsScreen}
        options={{
          title: 'Prescription',
          headerShown:true,
        }}
      />

    </Stack.Navigator>
  );
};

const BookingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="BookingScreen"
      screenOptions={{
        headerShown:true,
        headerLeft: () => (
          // <NavigationDrawerHeader navigationProps={navigation} />
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
        headerTitleAlign:'left'
      }}>
      <Stack.Screen
        name="BookingScreen"
        component={BookingScreen}
        options={{
          title: 'Test Booking',
          headerShown:true
        }}
      />
    </Stack.Navigator>
  );
};


const OrderScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="OrderScreen"
      screenOptions={{
        headerShown:false,
        // headerLeft: () => (
        //   // <NavigationDrawerHeader navigationProps={navigation} />
        //   <HeaderBackButton navigation={navigation}/>
        // ),
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
      <Stack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          title: 'My orders',
          headerShown:true,
          headerLeft: () => (
            // <NavigationDrawerHeader navigationProps={navigation} />
            <HeaderBackButton navigation={navigation}/>
          ),
        }}
      />

      <Stack.Screen
        name="OrderDetailsScreen"
        component={OrderDetailsScreen}
        options={{
          title: 'Order details',
          headerShown:true
        }}
      />
    </Stack.Navigator>
  );
};


const ConsultationScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ConsultationScreen"
      screenOptions={{
        headerShown:true,
        headerLeft: () => (
          // <NavigationDrawerHeader navigationProps={navigation} />
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
        headerTitleAlign:'left'
      }}>
      <Stack.Screen
        name="ConsultationScreen"
        component={ConsultationScreen}
        options={{
          title: 'Consultation',
          // headerShown:true
        }}
      />
    </Stack.Navigator>
  );
};



const MedicalReportScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="MedicalReportScreen"
      screenOptions={{
        
        headerLeft: () => (
          // <NavigationDrawerHeader navigationProps={navigation} />
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
        headerTitleAlign:'left'
      }}>
      <Stack.Screen
        name="MedicalReportScreen"
        component={MedicalReportScreen}
        options={{
          title: 'Medical Records',
          headerShown:true
        }}
      />
    </Stack.Navigator>
  );
};


const MyDoctorScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="MyDoctorScreen"
      screenOptions={{
        
        headerLeft: () => (
          // <NavigationDrawerHeader navigationProps={navigation} />
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
        headerTitleAlign:'left'
      }}>
      <Stack.Screen
        name="MyDoctorScreen"
        component={MyDoctorScreen}
        options={{
          title: 'My Doctor',
          headerShown:true
        }}
      />
    </Stack.Navigator>
  );
};


const ReminderScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ReminderScreen"
      screenOptions={{
        
        headerLeft: () => (
          // <NavigationDrawerHeader navigationProps={navigation} />
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
        headerTitleAlign:'left'
      }}>
      <Stack.Screen
        name="ReminderScreen"
        component={ReminderScreen}
        options={{
          title: 'Reminders',
          headerShown:true
        }}
      />
    </Stack.Navigator>
  );
};


const PaymentScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="PaymentScreen"
      screenOptions={{
        
        headerLeft: () => (
          // <NavigationDrawerHeader navigationProps={navigation} />
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
        headerTitleAlign:'left'
      }}>
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          title: 'Payment',
          headerShown:true
        }}
      />
    </Stack.Navigator>
  );
};



/////starts the main drawer navigation

const DrawerNavigationRoutes = (props, route) => {
  const dimensions = useWindowDimensions();

  const isLargeScreen = dimensions.width >= 768;
  return (
    <Drawer.Navigator 
      
      initialRouteName='DrawerHome'
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

      <Drawer.Screen 
        name="DrawerHome"
        options={{drawerLabel: 'Home',
                  drawerLabelStyle:{ fontWeight:'bold' },
                  drawerIcon: ({focused, size}) => (
                    <Ionicons
                        name="md-home-outline"
                        size={size}
                        color={focused ? '#3AAD94' : '#A2A2C2'}
                    />
                  )}}
        component={HomeScreenStack}
        initialParams={{ params: route.params }}
      />


      <Drawer.Screen 
        name="Appointment"
        options={{drawerLabel: 'Appointment',
                  drawerLabelStyle:{ fontWeight:'bold' }, 
                  drawerIcon: ({focused, size}) => (
                    <Ionicons
                       name="checkbox-outline"
                       size={size}
                       color={focused ? '#3AAD94' : '#A2A2C2'}
                    />
                 )}}
        component={AppointmentScreenStack}
        initialParams={{ params: route.params }}
      />

      <Drawer.Screen 
        name="MyPrescriptionScreenStack"
        options={{drawerLabel: 'Prescriptions',
                  drawerLabelStyle:{ fontWeight:'bold' }, 
                  drawerIcon: ({focused, size}) => (
                    <MaterialCommunityIcons  
                      name="note-plus-outline"
                      size={size}
                      color={focused ? '#3AAD94' : '#A2A2C2'}  
                    />
                 )}}
        component={MyPrescriptionScreenStack}
        initialParams={{ params: route.params }}
      />


      <Drawer.Screen 
        name="Booking"
        options={{drawerLabel: 'Test Booking',
                  drawerLabelStyle:{ fontWeight:'bold' },
                  drawerIcon: ({focused, size}) => (
                    <Ionicons
                       name="md-bookmark-outline"
                       size={size}
                       color={focused ? '#3AAD94' : '#A2A2C2'}
                    />
                 )}}
        component={BookingScreenStack}
        initialParams={{ params: route.params }}
      />


      <Drawer.Screen 
        name="Order"
        options={{drawerLabel: 'Orders',
                  drawerLabelStyle:{ fontWeight:'bold' }, 
                  drawerIcon: ({focused, size}) => (
                    <MaterialCommunityIcons 
                       name="clipboard-list-outline"
                       size={size}
                       color={focused ? '#3AAD94' : '#A2A2C2'}
                    />
                 )}}
        component={OrderScreenStack}
        initialParams={{ params: route.params }}
      />

      
      <Drawer.Screen 
        name="Consultations"
        options={{drawerLabel: 'Consultations',
                  drawerLabelStyle:{ fontWeight:'bold' }, 
                  drawerIcon: ({focused, size}) => (
                    <FontAwesome5 
                       name="comment-medical"
                       size={size}
                       color={focused ? '#3AAD94' : '#A2A2C2'}
                    />
                 )}}
        component={ConsultationScreenStack}
        initialParams={{ params: route.params }}
      />


      <Drawer.Screen 
        name="MedicalReports"
        options={{drawerLabel: 'Medical Records',
                  drawerLabelStyle:{ fontWeight:'bold' }, 
                  drawerIcon: ({focused, size}) => (
                    <FontAwesome5 
                       name="file-medical-alt"
                       size={size}
                       color={focused ? '#3AAD94' : '#A2A2C2'}
                    />
                 )}}
        component={MedicalReportScreenStack}
        initialParams={{ params: route.params }}
      />

      
      <Drawer.Screen 
        name="MyDoctor"
        options={{drawerLabel: 'My Doctor',
                  drawerLabelStyle:{ fontWeight:'bold' }, 
                  drawerIcon: ({focused, size}) => (
                    <Fontisto 
                       name="doctor"
                       size={size}
                       color={focused ? '#3AAD94' : '#A2A2C2'}
                    />
                 )}}
        component={MyDoctorScreenStack}
        initialParams={{ params: route.params }}
      />

      
      <Drawer.Screen 
        name="Reminders"
        options={{drawerLabel: 'Reminders',
                  drawerLabelStyle:{ fontWeight:'bold' }, 
                  drawerIcon: ({focused, size}) => (
                    <Ionicons 
                       name="timer-outline"
                       size={size}
                       color={focused ? '#3AAD94' : '#A2A2C2'}
                    />
                 )}}
        component={ReminderScreenStack}
        initialParams={{ params: route.params }}
      />

      
      <Drawer.Screen 
        name="PaymentScreenStack"
        options={{drawerLabel: 'Payments',
                  drawerLabelStyle:{ fontWeight:'bold' }, 
                  drawerIcon: ({focused, size}) => (
                    <MaterialCommunityIcons 
                       name="cash-usd-outline"
                       size={size}
                       color={focused ? '#3AAD94' : '#A2A2C2'}
                    />
                 )}}
        component={PaymentScreenStack}
        initialParams={{ params: route.params }}
      />

      
    </Drawer.Navigator>
  );
};

export default DrawerNavigationRoutes;