import "react-native-gesture-handler";
// Import React and Component

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { TouchableOpacity, DeviceEventEmitter } from "react-native";
import { 
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
  FontAwesome ,
  Ionicons 
} from '@expo/vector-icons';

// Import Navigators from React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from "./screens/slpashScreen";
import SliderScreen from "./screens/auth/slider";
import LoginScreen from "./screens/auth/login";
import OtpScreen from './screens/auth/otp';
import RegisterScreen from './screens/auth/register';
// import FlashMessage from "react-native-flash-message";

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from "./screens/tab/home";
import SettingsScreen from "./screens/tab/settings";
import NotificationScreen from "./screens/tab/notification";
import ProfileScreen from "./screens/tab/profile";
import DrawerNavigationRoutes from "./screens/navigationRoutes";
import DoctorTabNavigationRoutes from "./screens/doctorsEnd/doctorNavigation/doctorTabNavigation";
import UpdatePersonalData from "./screens/tab/profileTabs/updatePersonal";
import NurseTabNavigationRoutes from './screens/nurseEnd/nurseNavigation/nurseTabNavigation';
import NotificationDetailsScreen from "./screens/tab/notificationTab/notificationDetails";
import MedicineRoutes from "./screens/medicineRoutes";

import { Root, Popup } from 'popup-ui'
import MapDirectory from "./screens/map/mapDirectory";
import CartScreen from "./screens/tab/cart/cart";
import CheckoutScreen from "./screens/tab/cart/checkout";

import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useRoute } from '@react-navigation/native';
import { getFocusedRouteNameFromRoute, useNavigationState } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

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


const ProfileScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="ProfileScreen"
      screenOptions={{
        headerShown:true,
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
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: 'Patient Profile',
          headerShown:true,
          headerLeft: () => (
            <HeaderBackButton navigation={navigation}/>
          ),
        }}
      />

      <Stack.Screen
        name="UpdatePersonalData"
        component={UpdatePersonalData}
        options={{
          title: 'Update Personal Info',
          headerShown:true
        }}
      />
    </Stack.Navigator>
  );
};


const NotificationScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="NotificationScreen"
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
      
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: 'Notifications',
          headerShown:true,
          headerLeft: () => (
            <HeaderBackButton navigation={navigation}/>
          ),
        }}
      />

      <Stack.Screen
        name="NotificationDetailsScreen"
        component={NotificationDetailsScreen}
        options={{
          title: 'Notifications details',
          headerShown:true
        }}
      />

    </Stack.Navigator>
  );
};

const CartScreenStack = ({navigation, route}) => {
  return (
    <Stack.Navigator
      initialRouteName="CartScreen"
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
      
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: 'My cart',
          headerShown:true,
          headerLeft: () => (
            <HeaderBackButton navigation={navigation}/>
          ),
        }}
      />
      
      <Stack.Screen
        name="CheckoutScreen"
        component={CheckoutScreen}
        options={{
          title: 'Checkout',
          headerShown:true
        }}
      />

    </Stack.Navigator>
  );
};


const SettingsScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        
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
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerShown:true
        }}
      />
    </Stack.Navigator>
  );
};


const MyTabs = ({navigation,route}) => {

  // console.log(route)
  const isMounted = useRef(true);
  // const use_route = useRoute();
  const route_Name = getFocusedRouteNameFromRoute(route);
  const [isVisible, setVisible] = useState('flex');
  const routeNames = useNavigationState(state => state);

  function handleEvent() {

    DeviceEventEmitter.addListener('check_navigation', (event)=> {

      // console.log('$$$$$$handleEvent$$$$$$$$')
      // console.log(event)
      // console.log('$$$$$$handleEvent$$$$$$$$')

      if(event?.params === "AutoAppointmentScreen") {
        setVisible('none')
      } else {
        setVisible('flex')

      }
    })
  }
  
  useLayoutEffect(() => {
    if(isMounted){
      setLoading(true)
      handleEvent();
      setLoading(false)
    }
    
    return () => {
      isMounted.current = false;
    };
  }, [navigation, route])
  
  const [cart_badge, setBadge] = useState(0);
  const [is_loading, setLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("count").then(_count => {
      // setBadge(parseInt(_count ?? 0));
      // console.log("Baaaaaaaaaaaaaaler",_count);
    })
    
  }, [])

  async function test(){
    
    DeviceEventEmitter.addListener("ADD_COUNT", () => {
      AsyncStorage.getItem("count").then(_count => {
        setBadge(parseInt(_count ?? 0));
      })
    })

    
    DeviceEventEmitter.addListener("REDUCE_COUNT", () => {
      AsyncStorage.getItem("count").then(_count => {
        setBadge(parseInt(_count ?? 0));
      })
    })
      
  }


  useLayoutEffect( () => {

    if(isMounted){
      setLoading(true)
      test();
      setLoading(false)
    }

    // async()=> {
    //   try {
    //     await AsyncStorage.removeItem('cart_item')
    //     await AsyncStorage.removeItem('count')
    //   } catch(e) {
    //     // remove error
    //   }
    // }
    return () => {
      isMounted.current = false
    }
  }, [])

  

  return (

    <Tab.Navigator 
      backBehavior="initialRoute"
      initialRouteName="DrawerHome"
      activeColor="#3AAD94"
      inactiveColor="#ccc"
      barStyle={{ 
        backgroundColor: '#D9FFF0', 
        display: isVisible 
      }}
      keyboardHidesNavigationBar= {true}
      
    >

      <Tab.Screen  
        name="DrawerNavigationRoutes" 
        component={DrawerNavigationRoutes}
        options={({route}) => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        })}
        listeners={{
          focus: e => {
            DeviceEventEmitter.emit("ADD_COUNT")
          }
        }}
      />
      
      <Tab.Screen  
        name="NotificationScreenStack" 
        component={NotificationScreenStack}
        options={{
          tabBarBadge:3,
          tabBarLabel: 'Notification',
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="notification-important" size={24} color={color} />
          ),
        }}
      />
      
      <Tab.Screen  
        name="CartScreenStack" 
        component={CartScreenStack}
        options={{
          tabBarBadge: cart_badge ? cart_badge : null,
          tabBarLabel: 'My cart',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="cart-plus" size={24} color={color}/>
          ),
          
        }}
        listeners={({ navigation, route }) => ({
            state: e => {
              // console.log('e3333333222222222222222', e.data.state)
                DeviceEventEmitter.emit("ADD_COUNT")
            },
        })}
      />

      <Tab.Screen  
        name="Profile" 
        component={ProfileScreenStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome name="user-o" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen 
        name="Settings" 
        component={SettingsScreenStack}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <AntDesign name="setting" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Auth = () => {
    
    return (
      <Stack.Navigator initialRouteName="SliderScreen">
        <Stack.Screen name="SliderScreen" component={SliderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
};

const App = () => {

  const isMounted = useRef(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem("count").then(_count => {
        setCount(parseInt(_count ?? 0));
    })
  }, [])


  return (
    <Root>

      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            {/* SplashScreen which will come once for 5 Seconds */}

            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              // Hiding header for Splash Screen
              options={{headerShown: false}}
            />
            {/* Auth Navigator: Include Login and Signup */}

            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{headerShown: false}}
            />
            {/* tab navigation of patientEnd */}

            <Stack.Screen
              name="Tab"
              component={MyTabs}
              options={{headerShown: false}}
              initialParams={count}

            />
            {/* doctor tab navigation */}

            <Stack.Screen
              name="DoctorTabNavigationRoutes"
              component={DoctorTabNavigationRoutes}
              options={{headerShown: false}}
            />
            {/* nurse tab navigation */}

            <Stack.Screen
              name="NurseTabNavigationRoutes"
              component={NurseTabNavigationRoutes}
              options={{headerShown: false}}
            />
            
            <Stack.Screen
              name="MedicineRoutes"
              component={MedicineRoutes}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MapDirectory"
              component={MapDirectory}
              options={{headerShown: false}}
            />
            
          </Stack.Navigator>

        {/* <FlashMessage position="top" /> */}
        </NavigationContainer>

        <Toast />
        
      </SafeAreaProvider> 

    </Root>
  );
};

export default App;