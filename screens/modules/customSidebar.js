
import React from 'react';
import {
  View, 
  Text, 
  Alert, 
  StyleSheet, 
  SafeAreaView,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';



const CustomSidebarMenu = (props) => {

  
  async function logout(key){
    await AsyncStorage.removeItem('token').then(res => {
      props.navigation.replace('Auth');
    });
  }
  // console.log('sidebar_items_props', props)
  return (
    <SafeAreaView>
      <View style={stylesSidebar.sideMenuContainer}>
      {/* <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{fontSize: 25, color: '#307ecc'}}>
            {'Pondit'.charAt(0)}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>
          PONDIT
        </Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} /> */}

      <DrawerContentScrollView {...props}  >
        <DrawerItemList {...props}  />
        <DrawerItem
          label={({color}) => 
            <Text style={{color: '#A2A2C2', fontWeight:'bold'}}>
              Logout
            </Text>
          }
          icon={({ focused, color, size }) => 
              <Ionicons
                name="log-out-outline"
                size={size}
                color={focused ? '#5E81F4' : '#A2A2C2'}
            />}
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Logout',
              'Are you sure? You want to logout?',
              [
                {
                  text: 'Cancel',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    // AsyncStorage.clear();
                    logout(1)
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </View>
    </SafeAreaView>
    
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F7F7F7',
    paddingTop: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    padding: 15,
    textAlign: 'center',
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: '#FFFFFF',
    alignSelf: 'center',
    // paddingHorizontal: 10,
    fontWeight: 'bold',
    fontSize:20,
    justifyContent:'center'
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 10,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
  },
});