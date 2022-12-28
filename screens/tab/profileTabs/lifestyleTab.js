import React, { useEffect, useCallback, useState, useRef} from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    StyleSheet ,
    StatusBar
} from 'react-native'
import Loader from '../../modules/loader';
import * as patientEnd from '../../../services/api/patientEnd';
import { useFocusEffect } from '@react-navigation/native';

export default function LifestyleTab({navigation, route}) {

    const isMounted = useRef(true);
    const [profile, setProfile] = useState(null);
    const [is_loading, setLoading] = useState(true);

    

    async function getUserProfileData() {
        if(isMounted) {
            setLoading(true);
            let patient_profile_data = await patientEnd.getPatientProfile()
            setProfile(patient_profile_data)
            setLoading(false);
        }

        // console.log('==============patient_profile_data==================',patient_profile_data);
    }

    useFocusEffect(
        useCallback(() => {
            if(isMounted) {
                setLoading(true);
                getUserProfileData();
                setLoading(false);
            }
            return () => {
                isMounted.current = false;
            }
        }, [navigation, route])
    );
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>

            <View>
                {
                    is_loading ? (
                        <Loader/>
                    ) : (
                        <ScrollView>
                            <View>
                                <View style={{
                                    flex:1,
                                    padding:15,
                                    marginHorizontal:20
                                }}>
                                    <View style={styles.detailsContainerTxt}>
                                        <Text style={styles.infoTxt}>Smoking :</Text>
                                        <Text style={styles.detailsTxt}> {profile?.personal_info?.smoking} </Text>
                                    </View>
                                    <View style={styles.detailsContainerTxt}>
                                        <Text style={styles.infoTxt}>Alcohol :</Text>
                                        <Text style={styles.detailsTxt}> {profile?.personal_info?.alcohol} </Text>
                                    </View>
                                    <View style={styles.detailsContainerTxt}>
                                        <Text style={styles.infoTxt}>Activity level :</Text>
                                        <Text style={styles.detailsTxt}>High</Text>
                                    </View>
                                    <View style={styles.detailsContainerTxt}>
                                        <Text style={styles.infoTxt}>Food Preference :</Text>
                                        <Text style={styles.detailsTxt}>Junk</Text>
                                    </View>
                                    <View style={styles.detailsContainerTxt}>
                                        <Text style={styles.infoTxt}>Profession :</Text>
                                        <Text style={styles.detailsTxt}>{profile?.user?.profession}</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    )
                }
                
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    detailsContainerTxt:{
        flexDirection:'row',
        justifyContent:'space-between',
        padding:3
    },
    detailsTxt:{
        color:'#3AAD94',
        fontWeight:'bold',
        fontSize:14
    },
    infoTxt:{
        fontSize:15,
        fontWeight:'bold'
    },
    medicationBtnStyle:{
        paddingVertical:5,
        paddingHorizontal:10,
        borderWidth:.5,
        borderColor:'#3AAD94',
        borderRadius:100/2,
        marginHorizontal:5
    },
    medicationTxt:{
        fontSize:14,
        color:'#3AAD94'
    },
    patientHistoryTxtStyle:{
        borderWidth:.5,
        flex:.5,
        textAlign:'center',
        padding:5,
        color:'#3AAD94',
        fontSize:14,
        fontWeight:'bold'
    },
});
