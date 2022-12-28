import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import AppLoaderImg from '../../assets/Chikitsa_Logo.png';

const Loader = ({navigation}) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const [token, setToken] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
        <Animatable.View 
            animation="pulse" 
            easing="ease-out" 
            iterationCount="infinite" 
            style={{ textAlign: 'center' }}>
                <Image source={AppLoaderImg} style={{flex:1, height:60, width:120 }}
                resizeMode={'center'} />
        </Animatable.View>
      {/* <ActivityIndicator
        animating={animating}
        color="#E30B7D"
        size="large"
        style={styles.activityIndicator}
      /> */}
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});