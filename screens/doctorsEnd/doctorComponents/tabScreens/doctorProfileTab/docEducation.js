import React, { useCallback, useState, useEffect, useRef } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image,
    FlatList,
    StyleSheet,
    Pressable,
    Platform,
    Modal
} from 'react-native';
import { Avatar, Appbar } from 'react-native-paper';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import token from '../../../../../services/local_storage/storage';
import Loader from '../../../../modules/loader';
import config from '../../../../../services/config';
import {useFocusEffect} from '@react-navigation/native';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export default function DocEducationScreen({navigation, route}) {

    const isMounted = useRef(true);
    const [doc_education, setDocEducation] = useState(null);
    const [selected_edu, setSelectedEdu] = useState(null);
    const [is_loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    async function getDoctorEducation() {

        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "doctor/educations", requestOptions)
        .then(response => response.text())
        .then(result => {
            let education_data = JSON.parse(result);
            setLoading(true);
            setDocEducation(education_data);
            setLoading(false);
            // console.log('===education_data====')
            // console.log(education_data)
            // console.log('===education_data====')
        })
        .catch(error => console.log('error', error));
    }

    useFocusEffect(
        useCallback(() => {
            if(isMounted) {
                setLoading(true);
                getDoctorEducation()
                setLoading(false);
            }

            return () => {
                isMounted.current = false;
            };
        }, []),
    );

    function editDocEducation() {
        setModalVisible(!modalVisible);
        navigation.navigate('UpdateDocEducationScreen',selected_edu);
        console.log('selected_edu', selected_edu)
    }

    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'}/>
            {
                is_loading ? (
                    null
                ) : (
                    <View style={{
                        // marginBottom: 50
                        }}>
                        
                        <View style={{
                            // flex: 1,
                            // marginVertical:10
                        }}>
                            
                            <View style={{
                                // marginTop: 10
                            }}>
                                <FlatList 
                                    data={doc_education?.data}
                                    renderItem={({ item, index }) => (

                                        <View style={{
                                            flex:1,
                                            borderWidth:.3,
                                            borderRadius:5,
                                            marginHorizontal:15,
                                            marginVertical:5,
                                        }}>
                                            <View style={{
                                                flexDirection:'row',
                                                justifyContent:'space-between',
                                                alignItems:'center',
                                                borderBottomWidth:.2,
                                                backgroundColor:'#3AAD94',
                                                borderTopLeftRadius:5,
                                                borderTopRightRadius:5
                                            }}>
                                                <Text style={{
                                                    paddingHorizontal:10,
                                                    fontSize:16,
                                                    fontWeight:'bold',
                                                    color:'#fff'
                                                }}>{item?.deg_name}</Text>
                                                <View style={{
                                                    // justifyContent:'flex-end'
                                                }}>
                                                    <Appbar.Action icon={MORE_ICON} color={'#fff'}
                                                        onPress={() => { 
                                                            setModalVisible(true);
                                                            setSelectedEdu(null);
                                                            setSelectedEdu(item);
                                                        }} 
                                                    />
                                                </View>
                                            </View>

                                            <View style={{
                                                flex:1,
                                                marginHorizontal:10,
                                                marginVertical:5
                                            }}>
                                                
                                                <View style={{
                                                    flexDirection:'row',
                                                    justifyContent:'space-between',
                                                    paddingVertical:5,
                                                }}>
                                                    
                                                    {/* <Text style={{
                                                        fontSize:15,
                                                        fontWeight:'700',
                                                    }}>Institute :</Text> */}
                                                    
                                                    <Text style={{
                                                        fontSize:14,
                                                        fontWeight:'500',
                                                    }}>{item?.medical_name}</Text>

                                                </View>
                                                
                                                <View style={{
                                                    flexDirection:'row',
                                                    justifyContent:'space-between',
                                                    paddingVertical:5
                                                }}>
                                                    {/* <Text style={{
                                                        fontSize:15,
                                                        fontWeight:'700',
                                                    }}>Passing Year :</Text> */}

                                                <Text style={{
                                                        fontSize:13,
                                                        fontWeight:'700',
                                                    }}>{item?.pass_year}</Text>
                                                </View>

                                            </View>

                                        </View>
                                        
                                        
                                    )}
                                    numColumns={1}
                                    keyExtractor={(item, index) => index.toString()}
                                    ListHeaderComponent={
                                        <View style={{
                                            justifyContent:'center',
                                            alignItems:'flex-end',
                                            marginVertical:15
                                        }}>
                                            <TouchableOpacity 
                                                style={{
                                                    flexDirection: 'row',
                                                    backgroundColor: '#3AAD94',
                                                    paddingHorizontal:10,
                                                    paddingVertical: 5,
                                                    borderTopLeftRadius:100/2,
                                                    borderBottomLeftRadius:100/2,
                                                    alignItems:'center'
                                                }}
                                                onPress={() => navigation.navigate('CreateDocEducationScreen')}
                                            >
        
                                                <MaterialIcons name="add-circle" size={16} color="#FFF" />
                                                <Text style={{
                                                    color: '#FFF',
                                                    marginLeft: 5
                                                }} >Create</Text>
        
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    ListFooterComponent={
                                        <View style={styles.centeredView}>
                                            <Modal
                                                animationType="slide"
                                                transparent={true}
                                                visible={modalVisible}
                                                onRequestClose={() => {
                                                    // Alert.alert("Modal has been closed.");
                                                    setModalVisible(!modalVisible);
                                                }}
                                            >
                                                <View style={styles.centeredView}>
                                                    <View style={styles.modalView}>
                                                        <View style={{marginHorizontal:3}}>
                                                            <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => editDocEducation()}>
                                                                <Text style={styles.textStyle}>Edit</Text>
                                                            </Pressable>
                                                        </View>
                                                        <View style={{marginHorizontal:3}}>
                                                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                                                                <Text style={styles.textStyle}>Cancel</Text>
                                                            </Pressable>
                                                        </View>
                                                    </View>
                                                </View>
                                            </Modal>
                                        </View>
                                    }
                                />
                            </View>
                        </View>
                    </View>
                )
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    boxShadow: {
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.7,
        shadowRadius: 1.41,
        elevation: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        flexDirection:'row',
        justifyContent:'space-around'
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#3AAD94",
    },
    buttonClose: {
        backgroundColor: "#F31554",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
