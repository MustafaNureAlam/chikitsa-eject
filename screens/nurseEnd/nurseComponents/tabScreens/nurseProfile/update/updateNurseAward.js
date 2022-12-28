import React, {useCallback, useState, useEffect} from 'react'
import { 
    View, 
    Text, 
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Platform,
    Image,
    Alert
} from 'react-native';
import { TextInput, RadioButton } from 'react-native-paper';
import user_id from '../../../../../../services/local_storage/storage';
import token from '../../../../../../services/local_storage/storage';
import * as ImagePicker from "expo-image-picker";
import app_config from '../../../../../../services/config'
import { Root, Popup } from 'popup-ui'

export default function UpdateNurseAwardsScreen({navigation, route}) {

    console.log('route',route)
    const award_id = route.params.id
    const [award_name, setAwardName] = useState(route.params?.award_name);
    const [award_year, setAwardYear] = useState(route.params?.year);
    const [org_name, setOrg] = useState(route.params?.org_name);
    const [doctor_id, setDoctorId] = useState("");
    const [image, setImage] = useState(null);

    useEffect(async() => {
        let doc_id = await user_id.getItem("user_id");
        setDoctorId(doc_id);
        // console.log('=====user_id=====',doc_id);
    }, [])

    const pickImage = async () => {
        
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need storage permissions to make this work!');
            } else{
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.All,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });

                console.log(result);

                if (!result.cancelled) {
                    setImage(result.uri);
                }
            }
        }  
    };


    async function updateDoctorAwards() {
        
        let user_token = await token.getItem("token");
        var myHeaders = new Headers({
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + user_token
        });
        
        let formData = new FormData();

        let localUri;
        let filename;
        let match;
        let type;

        if(image == null){
            const image = Image.resolveAssetSource(default_image).uri
            const myArr = image.split("?");

            localUri = myArr[0];
            filename = "user.png";
            type = "image/png";

        }else{
        localUri = image;
        console.log('local', localUri)

        filename = localUri.split('/').pop();
        
        match = /\.(\w+)$/.exec(filename);
        type = match ? `image/${match[1]}` : `image`;
        console.log('local', type)
        }

        
        formData.append('doctor_user_id',  doctor_id);
        formData.append('pass_year',  award_year );
        formData.append('award_name',  award_name );
        formData.append('org_name',  org_name );
        formData.append('file', { uri: localUri, name: filename, type });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formData,
            redirect: 'follow'
        };
        
        
        await fetch( app_config.baseUrl + "nurse/awards_update/" + award_id, requestOptions)
        .then(response => response.text())
        .then(result => {

            let user_data_response = JSON.parse(result);
            // console.log('====user_data_response=====',user_data_response)

            if(user_data_response.code == 200) {
                Popup.show({
                    type: 'Success',
                    title: 'Award updated',
                    button: true,
                    textBody: 'Congrats! successfully updated award',
                    buttonText: 'Ok',
                    callback: () => {
                        Popup.hide()
                        navigation.navigate('NurseProfileScreen')
                    },
                    
                })
            } 
            
            else{
                Popup.show({
                    type: 'Danger',
                    title: 'Failed to create',
                    textBody:
                      'Sorry! can not complete your request right now. Please try after a while.',
                    buttontext: 'Try again',
                    callback: () => Popup.hide(),
                })
            }
        })
        .catch(error => console.log(error));
    }

    return (
        <Root>
            <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
                <StatusBar backgroundColor={'#075141'} />
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        <View style={{marginHorizontal:20,marginVertical:10}} >
                            
                            <View style={{marginVertical:7}}>
                                <TextInput
                                    label="Award Name"
                                    value={award_name}
                                    onChangeText={award => setAwardName(award)}
                                    mode={'flat'}
                                    activeUnderlineColor={'#3AAD94'}
                                    keyboardType='ascii-capable'
                                />
                            </View>

                            <View style={{marginVertical:7}}>
                                <TextInput
                                    label="Year"
                                    value={award_year}
                                    onChangeText={year => setAwardYear(year)}
                                    mode={'flat'}
                                    activeUnderlineColor={'#3AAD94'}
                                    keyboardType='phone-pad'
                                />
                            </View>

                            <View style={{marginVertical:7}}>
                                <TextInput
                                    label="Organization"
                                    value={org_name}
                                    onChangeText={org => setOrg(org)}
                                    mode={'flat'}
                                    activeUnderlineColor={'#3AAD94'}
                                    keyboardType='ascii-capable'
                                />
                            </View>

                            <View style={{ marginTop:5 }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                                    
                                    <TouchableOpacity
                                        onPress={pickImage}
                                        style={{
                                            backgroundColor: "#F5F6FA",
                                            borderRadius: 10,
                                            // marginTop:'15%',
                                            shadowColor: "#000",
                                            shadowOffset: {
                                                width: 0,
                                                height: 1,
                                            },
                                            shadowOpacity: 0.7,
                                            shadowRadius: 1.41,
                                            elevation: 1,
                                            paddingHorizontal: 20,
                                            paddingVertical: 10,
                                        }}
                                    >
                                        <Text style={{ color: "#000",fontWeight:'bold' }}>Select Photo</Text>
                                    </TouchableOpacity>
                                    {image && <Image source={{ uri: image }} style={{ width: 50, height: 50, borderRadius: 25 }} />}
                                </View>

                            </View>

                        </View>

                        <View style={{
                            marginVertical:30,
                            marginHorizontal:20
                        }}>
                            <TouchableOpacity 
                                style={{
                                    backgroundColor:'#3AAD94',
                                    padding:12,
                                    borderRadius:100/2
                                }}

                                onPress={()=> updateDoctorAwards()}
                            >
                                <Text style={{
                                    fontSize:16,
                                    fontWeight:'bold',
                                    color:'#fff',
                                    textAlign:'center'
                                }}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </Root>
    )
}
