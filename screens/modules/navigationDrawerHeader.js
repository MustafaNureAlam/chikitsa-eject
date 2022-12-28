import React, { useState, useEffect } from "react";
import { View, 
    Image, 
    TouchableOpacity, 
    Text, 
    Modal, 
    StyleSheet, 
    Pressable, 
    Alert, 
    ProgressBarAndroid } from "react-native";
import { useWindowDimensions } from "react-native";
import {useFocusEffect} from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const NavigationDrawerHeader = (props, route) => {

    const toggleDrawer = () => {
        props.navigationProps.toggleDrawer();
    };
    const dimensions = useWindowDimensions();

    const isLargeScreen = dimensions.width >= 768;

    
    return (
        <View style={{ }}>
            <View style={{  }}>
                <TouchableOpacity
                 onPress={toggleDrawer}
                 style={{marginLeft:10}}
                 >
                    {!isLargeScreen ? (
                        // <Image source={BurgerMenu} style={{ width: 25, height: 25, }} resizeMode={"contain"} />
                        <FontAwesome name="bars" size={24} color="#fff" />
                    ) : null}
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default NavigationDrawerHeader;

const styles = StyleSheet.create({

});