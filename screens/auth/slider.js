import React, { useState, useEffect, useRef, useCallback  } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    TouchableOpacity,
    BackHandler,
    Alert
} from 'react-native';
import Swiper from 'react-native-swiper';
import slide1_img from '../../assets/slide1.png'
import slide2_img from '../../assets/slide2.png'
import slide3_img from '../../assets/slide3.png'
import { useFocusEffect } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

const SliderScreen = ({navigation}) =>  {

    const isMounted = useRef(true);
    const [btn_index, setBtnIndex] = useState(0)
    const [btn_visible, setBtnVisible] = useState(true)

    useFocusEffect(
        useCallback(() => {

            
            
            const onBackPress = () => {
                Alert.alert("EXIT!", "Are you sure you want to exit app?", [
                    {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                    },
                    { text: "YES", onPress: () => BackHandler.exitApp() }
                ]);
                // Return true to stop default back navigaton
                // Return false to keep default back navigaton
                return true;
            };
        
            // Add Event Listener for hardwareBackPress
            BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );
        
            return () => {
                // Once the Screen gets blur Remove Event Listener
                BackHandler.removeEventListener(
                'hardwareBackPress',
                onBackPress
                );
                isMounted.current = false;
            };
        }, []),
    );

    const goBtn = () => {
       return <TouchableOpacity style={{backgroundColor:'#3AAD94', borderRadius:100/2, padding:8}}><Text>Go</Text></TouchableOpacity>
    }

    function getIndex(index) {
        if(index == 2) {
            setBtnVisible(false)
        } else{
            setBtnVisible(true)
        }
    }
  

    return (
        <Swiper
            loadMinimal={true}
            loop={false} 
            style={styles.wrapper} 
            showsButtons={btn_visible}
            buttonWrapperStyle={{
                backgroundColor: 'transparent', 
                flexDirection: 'row', 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                flex: 1, 
                paddingHorizontal: 10, 
                paddingVertical: 10, 
                justifyContent: 'space-between', 
                alignItems: 'flex-end'
            }}
            onIndexChanged={(index) => {
                setBtnIndex(index)
                getIndex(index)
            }}
            nextButton={<Text style={styles.buttonText}>Next</Text>}
            prevButton={<Text style={styles.skipText}>Skip</Text>}
            activeDotColor="#3AAD94"
            activeDotStyle={{height:12,width:12,borderRadius:6}}>
            
            <View style={styles.slide1}>
                <View style={styles.container}>          
                    <View 
                        style={styles.imageBox}>
                        <Image source={slide1_img} style={{ width: 200, height: 200}}
                        resizeMode={'contain'}/>
                    </View>
                    <View style={styles.middleBox}>
                        <Text style={styles.textStyle}>View and buy{"\n"}Medicine online</Text>
                    </View>
                    <View style={styles.bottomBox}>
                        <Text style={styles.summaryNote}>
                        Get 100% Authentic Medicine{"\n"}
                        at an affordable rate particularly{"\n"}
                        curated for you.
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.slide2}>
                <View style={styles.container}>
                
                    <View style={styles.imageBox}>
                        <Image source={slide2_img} style={{ width: 200, height: 200}}
                        resizeMode={'contain'}/>
                    </View> 
                    <View style={styles.middleBox}>
                            <Text style={styles.textStyle}>Online medical & Healthcare</Text>
                    </View>
                    <View style={styles.bottomBox}>
                        <Text style={styles.summaryNote}>
                        Get all your current, future &{"\n"}
                        past Healthcare record specifically{"\n"}
                        generated by your usage & AI
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.slide3}>
                <View style={styles.container}>
                    <View style={styles.imageBox}>
                        <Image source={slide3_img} style={{ width: 200, height: 200}}
                        resizeMode={'contain'}/>
                    </View> 
                    <View style={styles.middleBox}>   
                        <Text style={styles.textStyle}>Get Delivery on time</Text>
                    </View>
                    <View style={styles.bottomBox}>
                        <Text style={styles.summaryNote}>
                        Get prompt delivery of Medicines,{"\n"}
                        along with your Medicine Reminders{"\n"}
                        And predictions of Medicine
                        </Text>
                        
                    </View>

                    <TouchableOpacity style={{
                        backgroundColor:'#3AAD94',
                        padding:8,
                        borderRadius:100/2,
                        width:50,
                        height:50,
                        alignItems:'center',
                        justifyContent:'center',
                        marginTop:12
                    }} onPress={() =>
                        navigation.navigate('LoginScreen')}>
                                <View style={{
                                    flexDirection:'row',
                                    justifyContent:'space-around'
                                }}>
                                    {/* <Text 
                                        style={{
                                            color:'#fff',
                                            fontSize:16,
                                            fontWeight:'bold',
                                            textAlign:'center'
                                        }}>Go
                                    </Text> */}
                                    <Entypo name="chevron-right" size={28} color="#fff" />
                                </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Swiper>
    );
}


export default SliderScreen;

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#FFFFFF'
  },
  container: {
    flex:1,
    // backgroundColor: '#ccc',
    justifyContent:'center',
    alignItems:'center',
  },
  imageBox:{
    //   height:'40%',
    // flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:20
  },
  middleBox:{
    //   height:'20%'
    marginVertical:10
  },
  bottomBox:{
    //   height:'20%',
    //   flex:1,
    //   justifyContent:'center'
    marginVertical:10
  },
  skipBtn:{
    // backgroundColor:'',
    // paddingVertical:16,
    // paddingHorizontal:10,
    borderRadius:10,
    marginHorizontal:60,
    shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.70,
      shadowRadius: 1.41,
      elevation: 1,
  },
  slide2: {
    flex: 1,
    backgroundColor:'#FFFFFF'
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  slide3: {
    flex: 1,
    backgroundColor:'#FFFFFF'
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle:{
      fontWeight:'bold',
      fontSize:20,
      textAlign:'center'
  },
  summaryNote:{
      fontSize:13,
      fontWeight:'500',
      color:'#707070',
      textAlign:'center',
      padding:5
  },
  buttonText:{
      fontWeight:'bold',
      fontSize:18,
      padding:3,
      width:50,
      borderRadius:3,
      position:'relative',
      bottom:15,
      right:20,
      textAlign:'center',
      color:'#3AAD94',
  },
  skipText:{
    fontWeight:'bold',
    fontSize:18,
    padding:3,
    color:'#707070',
    position:'relative',
    bottom:15,
    left:20,
    width:50,
  }
});
