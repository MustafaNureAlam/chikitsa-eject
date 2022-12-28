import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useAutocomplete, useDebounce } from 'use-barikoi';
import { View, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Button, Text, Alert} from 'react-native'
import MapView, { Marker }  from 'react-native-maps';
import { TextInput, RadioButton } from 'react-native-paper';
import * as Location from "expo-location";
import Autocomplete from 'react-native-autocomplete-input';
import RBSheet from "react-native-raw-bottom-sheet";
import config from "../../../services/config";
import Storage  from '../../../services/local_storage/storage';
import Toast from 'react-native-toast-message'

export default function MapScreen({navigation, route}) {

    const isMounted = useRef(true);
    const route_data = route.params.params;
    console.log("route_data______________");
    console.log(route);
    // console.log(route?.params?.action_type);
    console.log("route_data______________");
    const [latitude, setMyLatitude] = useState(route?.params?.item?.latitude ? route?.params?.item?.latitude : "23.8382776");
    const [longitude, setMyLongitude] = useState(route?.params?.item?.longitude ? route?.params?.item?.longitude : "90.3692992");
    
    const [myAddress, setMyAddress] = useState(route?.params?.item?.address ? route?.params?.item?.address : "");
    const [locationId, setLocationId] = useState(route?.params?.item?.id ? route?.params?.item?.id : "");
    const [thana, setThana] = useState(route?.params?.item?.thana ? route?.params?.item?.thana : "");
    const [district, setDistrict] = useState(route?.params?.item?.district ? route?.params?.item?.district : "");
    const [postal_code, setPostalCode] = useState(route?.params?.item?.postal_code ? route?.params?.item?.postal_code : "");
    const [location_name, setLocationName] = useState(route?.params?.item?.location_name ? route?.params?.item?.location_name : "");
    const [mobile_number, setMobileNumber] = useState(route?.params?.item?.location_mobile ? route?.params?.item?.location_mobile : "");

    const refRBSheet = React.useRef();

    const [location, setLocation] = useState("");
    const [regionCoords, setRegion] = useState("");
    const [marker, setMarker] = useState({latitude: latitude,longitude: longitude});
    const [has_location, setMapRegion] = useState(false);
    const apiKey = 'NTE3Olo5SEcxVFRMU0I=';  

    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const value = useDebounce(query, 1000);
    const [result, isLoading] = useAutocomplete(apiKey, value);
    

    useEffect(() => {
        if(isMounted) {

            setMarker({latitude: parseFloat(latitude),longitude: parseFloat(longitude)})
            setLocation({latitude: parseFloat(latitude),longitude: parseFloat(longitude)})
            setRegion({latitude: parseFloat(latitude),longitude: parseFloat(longitude)})
        }

        return () => {
            isMounted.current = false;
        }

    }, [latitude, longitude]);


    function markerView(){
        return (
            <Marker coordinate = {marker} pinColor = {"red"} title={"title"} description={"description"}/>
        )
    }

    async function saveData(){
        
        let user_token = await Storage.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "Bearer " + user_token);

        let jsonData = { 
            locationId: locationId,
            location_name: location_name,
            thana: thana,
            district: district,
            address: myAddress,
            postal_code: postal_code,
            location_mobile: mobile_number,
            latitude: marker.latitude,
            longitude: marker.longitude,
        }
        var raw = JSON.stringify(jsonData);

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        let api_url;
        
        if(route.params.params == "blooddonor"){
            console.log('=====requestOptions=====')
            console.log(jsonData)
            console.log('=====requestOptions=====')
            // console
            // await Storage.remove('blood_request_location');
            await Storage.save('blood_request_location', JSON.stringify(jsonData));
            navigation.navigate('BloodDonorScreen')
        }else{

            if(route?.params?.action_type && route?.params?.action_type == "update"){
                api_url = config.baseUrl+"users_locations/update/"+route?.params?.item?.id
            }else{
                api_url = config.baseUrl+"location/add"
            }
    
            await fetch(api_url, requestOptions)
                .then((response) => response.text())
                .then(async (result) => {
                    const json_data = JSON.parse(result)
                    console.log("json_data----------");
                    console.log(json_data);
                    console.log("json_data----------");
                    
                    if(json_data.status === 200) {
                        
                        await Storage.remove('active_location');
                        await Storage.save('active_location', JSON.stringify(json_data.data.data));
    
                        Toast.show({
                            type: 'success',
                            text1: 'success!',
                            text2: json_data.message
                        });
    
                        if(route.params.params == "drawerHome"){
                            navigation.navigate('DrawerHomeScreen')
                        }
                        // else if(route.params.params == "blooddonor"){
                        //     navigation.navigate('BloodDonorScreen')
                        // }
    
                    } else{
                        Alert.alert(
                            "Error",
                            "Network problem! try after a while.",
                            [
                              { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                        );
                    }
    
            
                    
                })
                .catch((error) => console.log("error -map location", error));
        }

    }


    useEffect(() => {
        if(isMounted){
            getLocation();
        }

        return isMounted.current = false;
    }, []);
    
    async function getLocation(){
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if (!granted){
                Alert.alert("Failed", "Failed", [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel"
                    },
                ]);
                return   
            };
            const {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync();
            setMapRegion(true);
            setLocation({ latitude, longitude });
            setRegion({ latitude, longitude });
            setMarker({ latitude, longitude });

            
            setTimeout(() => {  refRBSheet.current.open(); }, 2000);
        } catch (error) {
            Alert.alert("Failed", error, [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
            ]);
        }
    }

    
    return (
        <SafeAreaView style={{flex: 1}}>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
               
                {/* MAP START */}
                {has_location ? (
                    
                    <View>
                        
                        <View>

                            <MapView 
                                style={styles.map} 
                                initialRegion={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                    latitudeDelta: 0.0021,
                                    longitudeDelta: 0.0011
                                }}
                                mapType='standard'
                                showsUserLocation={true}
                                onPress={(e) => {
                                    setMarker(e.nativeEvent.coordinate),
                                    setQuery(e.nativeEvent);
                                    refRBSheet.current.open();
                                }}
                            >
                                {markerView()}
                            </MapView>
                        </View>
                        <View 
                            style={{ 
                                position: 'absolute', 
                                top: 30, 
                                flex: 1,
                                width: '90%', 
                            }}
                        >
                           
                            <Autocomplete
                                data={result}
                                value={query}
                                style={{
                                    flex: 1
                                }}
                                onChangeText={(text) => { setQuery(text); }}
                                flatListProps={{
                                    keyExtractor: (_, idx) => idx,
                                    renderItem: ({ item }) => <TouchableOpacity onPress={() => {

                                        setMyLatitude(item.latitude)
                                        setMyLongitude(item.longitude)
                                        setMyAddress(item.address)
                                        setLocation({ latitude, longitude });
                                        setRegion({ latitude, longitude });
                                        setSearch(item.address);
                                        setQuery(item.address)
                                        refRBSheet.current.open();
                                    }}><Text>{item.address}</Text></TouchableOpacity>,
                                }}                                
                            />
                            
                        </View>
                        
                    </View>

                ) : (
                    <MapView 
                        style={styles.map}
                        onPress={(e) => {
                            setMarker(e.nativeEvent.coordinate);
                            refRBSheet.current.open();
                        }}
                    />
                )}
                {/* MAP END */}

                {/* Bottom Sheet START */}
                <RBSheet
                    ref={refRBSheet}
                    height={400}
                    closeOnDragDown={true}
                    closeOnPressMask={false}
                    customStyles={{
                    wrapper: {
                        // backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        // backgroundColor: "#000"
                    }
                    }}
                >
                    <View style={{flex:1,paddingVertical:12}}>
                        
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <View style={{ flex: 1, padding:8 }}>
                                
                                <View style={{ flex: 1, backgroundColor: '#fff', padding: 10 }}>

                                    <View style={{ flex: 1, backgroundColor: '#fff',marginVertical:4 }}>
                                        <TextInput
                                            label="Name"
                                            placeholder='Ex: Home'
                                            value={location_name}
                                            onChangeText={value => setLocationName(value)}
                                            mode={'flat'}
                                            activeUnderlineColor={'#3AAD94'}
                                            keyboardType='ascii-capable'
                                        />
                                    </View> 

                                    <View style={{ flex: 1, backgroundColor: '#fff',marginVertical:4 }}>
                                        <TextInput
                                            label="Thana"
                                            placeholder='Mirpur'
                                            value={thana}
                                            onChangeText={value => setThana(value)}
                                            mode={'flat'}
                                            activeUnderlineColor={'#3AAD94'}
                                            keyboardType='ascii-capable'
                                        />
                                    </View>

                                    
                                    
                                    <View style={{ flex: 1, backgroundColor: '#fff',marginVertical:4 }}>
                                        <TextInput
                                            label="District"
                                            value={district}
                                            placeholder="Dhaka"
                                            onChangeText={value => setDistrict(value)}
                                            mode={'flat'}
                                            activeUnderlineColor={'#3AAD94'}
                                            keyboardType='ascii-capable'
                                        />
                                    </View>

                                    <View style={{ flex: 1, backgroundColor: '#fff',marginVertical:4 }}>
                                        <TextInput
                                            label="Address"
                                            placeholder='House#12, Road#11, Mirpur'
                                            value={myAddress}
                                            onChangeText={value => setMyAddress(value)}
                                            mode={'flat'}
                                            activeUnderlineColor={'#3AAD94'}
                                            keyboardType='ascii-capable'
                                        />
                                    </View>

                                    <View style={{ flex: 1, backgroundColor: '#fff',marginVertical:4 }}>
                                        <TextInput
                                            label="Postal code"
                                            placeholder='1206'
                                            value={postal_code}
                                            onChangeText={value => setPostalCode(value)}
                                            mode={'flat'}
                                            activeUnderlineColor={'#3AAD94'}
                                            keyboardType='number-pad'
                                        />
                                    </View>

                                    <View style={{ flex: 1, backgroundColor: '#fff',marginVertical:4 }}>
                                        <TextInput
                                            label="Mobile Number (Optional)"
                                            value={mobile_number}
                                            onChangeText={value => setMobileNumber(value)}
                                            mode={'flat'}
                                            activeUnderlineColor={'#3AAD94'}
                                            keyboardType='number-pad'
                                        />
                                    </View>

                                </View>
                                {/* <Text style={{color: 'red'}}>{myAddress}</Text> */}
                            </View>
                            
                            <View style={{ flex: 1 }}>
                                <Button  title="Save" onPress={() => { saveData() }} />
                            </View>

                        </ScrollView>

                    </View>

                </RBSheet>
                {/* Bottom Sheet END */}

            </View>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 130,
    },
});