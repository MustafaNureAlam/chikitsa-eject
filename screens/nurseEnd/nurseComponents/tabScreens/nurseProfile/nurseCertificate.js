import React, { useCallback, useEffect, useState, useRef } from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image,
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Platform
} from 'react-native';
import { Avatar, Appbar } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import {useFocusEffect} from '@react-navigation/native';
import token from '../../../../../services/local_storage/storage';
import config from '../../../../../services/config';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export default function NurseCertificateScreen({navigation, route}) {

    const isMounted = useRef(true);
    const [doc_certificate, setDocCertificate] = useState(null);
    const [is_loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selected_Certi, setSelectedCerti] = useState(null);

    async function getDoctorCertificate() {

        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch( config.baseUrl + "nurse/certificates", requestOptions)
        .then(response => response.text())
        .then(result => {
            let certificate_data = JSON.parse(result);
            setDocCertificate(certificate_data);
            setLoading(false);
            console.log('===certificate_data====')
            console.log(certificate_data)
            console.log('===certificate_data====')
        })
        .catch(error => console.log('error', error));
    }

    useFocusEffect(
        useCallback(() => {
            if(isMounted){
                setLoading(true);
                getDoctorCertificate()
                setLoading(false);
            }
            
            return() => {
                isMounted.current = false;
                console.log('certi_returned')
            }
        }, [navigation, route]),
    );

    function editDocCertificate() {
        setModalVisible(!modalVisible);
        navigation.navigate('UpdateNurseCertificateScreen',selected_Certi);
        // console.log('selected_edu', selected_Certi)
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            {
                is_loading ? (
                    null
                ) : (

                    <View style={{
                        // marginTop: 10
                    }}>
                        <FlatList 
                            data={doc_certificate?.data}
                            renderItem={({ item, index }) => (
                                
                                <View style={{
                                    flex:1,
                                    flexDirection: 'row',
                                    paddingVertical: 10,
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginHorizontal:12,
                                    borderRadius:6,
                                    marginBottom:10,
                                    backgroundColor:'#ECECEC'
                                }}>

                                    <View style={{
                                        flex:1,
                                        flexDirection:'row',
                                        paddingHorizontal:8
                                    }}>
                                        
                                        <Image style={{ width: 60, height: 60 }}
                                            source={{uri : config.baseUrl + 'uploades/' + item?.image}} 
                                        />
                                        
                                        <View style={{
                                            flex: 1,
                                            // alignItems:'flex-start'
                                            paddingHorizontal:12
                                        }}>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                fontSize: 16,
                                                color: '#3AAD94'
                                            }}>{item.deg_name}</Text>

                                            <Text style={{
                                                fontWeight: '500',
                                                fontSize: 14,
                                                color: '#3AAD94'
                                            }}>{item.medical_name}</Text>
                                            

                                            <Text style={{
                                                fontWeight: 'bold',
                                                fontSize: 14,
                                                color: '#3AAD94'
                                            }}>{item.pass_year}</Text>

                                        </View>
                                    </View>


                                    <View>
                                        <Appbar.Action icon={MORE_ICON} 
                                            onPress={() => { 
                                                setModalVisible(true);
                                                setSelectedCerti(null);
                                                setSelectedCerti(item);
                                            }} 
                                        />
                                    </View>
                                    
                                </View>
                            )}
                            numColumns={1}
                            showsVerticalScrollIndicator={false}
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
                                        onPress={() => navigation.navigate('CreateNurseCertificateScreen')}
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
                                                    <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => editDocCertificate()}>
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
