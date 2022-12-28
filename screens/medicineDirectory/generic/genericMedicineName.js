import React, {useState, useCallback,useRef} from 'react'
import { 
    View, 
    Text, 
    StatusBar, 
    SafeAreaView, 
    TextInput, 
    TouchableOpacity, 
    ScrollView,
    FlatList
} from 'react-native';

import { 
    Ionicons,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Octicons,
    Entypo,
    Fontisto ,
    MaterialIcons,
    FontAwesome 
} from '@expo/vector-icons';
import SelectDropdown from 'react-native-select-dropdown';
import { List } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';
import token from '../../../services/local_storage/storage';
import Loader from '../../modules/loader';
import config from '../../../services/config';

export default function GenericMedicineName({navigation, route}) {

    const isMounted = useRef(true);

    const [api_data, setApiData] = useState([]);
    const [is_loading, setLoading] = useState(true);

    const [company, setCompany] = useState("");
    const [power, setPower] = useState("");

    
    const generic_id = route.params?.data?.id;
    // console.log('==========GenericMedicineName===========')
    // console.log(route.params?.path)
    // console.log('==========GenericMedicineName===========')

    const [route_params, setRouteParams] = useState(route.params?.data);

    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);
    


    async function getGenericBrands() {

        let user_token = await token.getItem("token");
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        if(route.params?.path == "generic") {
            var raw = JSON.stringify({
                "generic_id": generic_id,
                "query_brand" : company,
                "power" : power
            });
        } else if(route.params?.path == "brand") {
            var raw = JSON.stringify({
                "brand_id": generic_id,
                "query_brand" : company,
                "power" : power
            });
        } else if (route.params?.path == "class") {
            var raw = JSON.stringify({
                "generic_id": generic_id,
                "query_brand" : company,
                "power" : power
            });
        }


        // console.log('=======objrct======')
        // console.log(raw)
        // console.log('=======objrct======')

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        await fetch( config.baseUrl +  "medicine/generic_brands" , requestOptions)
        .then(response => response.text())
        .then(result => {
            let api_response = JSON.parse(result);
            
            setApiData(api_response);
            // console.log('========api_response========');
            // console.log(api_response);
            // console.log('========api_response========');
            

        })
        .catch(error => console.log('error', error));
    }


    useFocusEffect(
        useCallback(() => {

            if(isMounted) {
                setLoading(true);
                getGenericBrands();
                setLoading(false);
            }
            
        
            return () => {
                // Once the Screen gets blur Remove Event Listener
               isMounted.current = false;
            };
        }, [company , power]),
    );

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff',paddingHorizontal:16}} >
            
            <StatusBar backgroundColor={'#075141'}/>

            {
                is_loading ? (
                    <Loader/>
                ) : (
                    
                    <View style={{marginTop:16, marginBottom:100}}>

                        <Text style={{
                            color:'#7B93A4',
                            fontSize:14,
                            fontWeight:'bold',
                            textAlign:'center'
                        }}>Available Brands</Text>

                        <View style={{
                            flexDirection:'row',
                            justifyContent:'flex-start',
                            marginVertical:16
                        }}>
                            <View style={{
                                // marginVertical:8
                                flex:1,
                                marginHorizontal:3
                            }}>
                                <SelectDropdown
                                    buttonStyle={{width:'100%'}}
                                    buttonTextStyle={{color:'#3AAD94', fontSize:16, fontWeight:"bold"}}
                                    defaultButtonText='Company'
                                    data={api_data?.unique_brand}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index);
                                        setCompany(selectedItem)
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                    renderDropdownIcon={()=> <Ionicons name="chevron-down" size={24} color="#3AAD94" />}
                                />
                            </View>
                            
                            <View style={{
                                // marginVertical:8
                                flex:1,
                                marginHorizontal:3
                            }}>
                                <SelectDropdown
                                    buttonStyle={{width:'100%'}}
                                    buttonTextStyle={{color:'#3AAD94', fontSize:16, fontWeight:"bold"}}
                                    defaultButtonText='Strength'
                                    data={api_data?.unique_medicine_strength}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index);
                                        setPower(selectedItem);
                                    }}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        // text represented after item is selected
                                        // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        return selectedItem
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        // text represented for each item in dropdown
                                        // if data array is an array of objects then return item.property to represent item in dropdown
                                        return item
                                    }}
                                    renderDropdownIcon={()=> <Ionicons name="chevron-down" size={24} color="#3AAD94" />}
                                />
                            </View>

                        </View>

                        <View style={{paddingBottom:100}}>

                            {
                                api_data?.generic_medicines?.length > 0 ? (

                                    <FlatList 
                                        showsVerticalScrollIndicator={false}
                                        data={api_data?.generic_medicines}
                                        renderItem={ ({item, index}) => (
                                            <View style={{}}>
                                                
                                                <TouchableOpacity 
                                                    style={{
                                                        marginVertical:8
                                                    }}
                                                    onPress={() => 
                                                        navigation.navigate('MedicineDetailsScreen',{title : item?.generic, data: item})
                                                    }
                                                >
                                                    <View style={{
                                                        flexDirection:'row',
                                                        justifyContent:'space-between',
                                                        backgroundColor:'#EEEEEE',
                                                        paddingHorizontal:24,
                                                        paddingVertical:16,
                                                        borderRadius:5,
                                                        alignItems:'center'
                                                    }}>
                                                        
                                                        <View style={{
                                                            padding:5,
                                                            flex:1
                                                        }}>
                                                            <Text style={{
                                                                fontSize:14,
                                                                fontWeight:'bold',
                                                                textAlign:'left',
                                                                color:'#000',
                                                                // padding:3
                                                            }}>
                                                                {item?.name + "" + item?.medicine_type + " (" + item?.power + ")"}
                                                            </Text>
                                                            
                                                            <Text style={{
                                                                fontSize:12,
                                                                fontWeight:'bold',
                                                                textAlign:'left',
                                                                color:'#808080',
                                                                paddingTop:4
                                                            }}>
                                                                {item?.manufactured_by?.name}
                                                            </Text>
                                                        </View>
                                                        
                                                        <View style={{
                                                            padding:5,
                                                            flexDirection:'row',
                                                            justifyContent:'space-between',
                                                            alignItems:'center',
                                                            flex:1
                                                        }}>
                                                            <View>
                                                                <Text style={{
                                                                    fontSize:12,
                                                                    fontWeight:'bold',
                                                                    textAlign:'left',
                                                                    color:'#3AAD94'
                                                                }}>{item?.price}</Text>
                                                                
                                                                {/* <Text  style={{
                                                                    fontSize:12,
                                                                    fontWeight:'bold',
                                                                    textAlign:'left',
                                                                    color:'#3AAD94'
                                                                }}>30's Pack - 450.00 BDT</Text> */}
                                                            </View>
                                                            <View>
                                                                <Ionicons name="ios-chevron-forward" size={24} color="#808080" />
                                                            </View>
                                                        </View>
        
                                                    </View>
                                                </TouchableOpacity>
        
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                        ListFooterComponent={
                                            <View style={{
                                                marginTop:50
                                            }}>
                            
                                                {/* <Text style={{
                                                    fontSize:16,
                                                    fontWeight:'bold',
                                                    textAlign:'center',
                                                    paddingVertical:8,
                                                    color:'#000'
                                                }}>
                                                    Acaril Tablet (50 MG)
                                                </Text> */}
                            
                                                {/* <List.Section>
                                                    <List.Accordion
                                                        title="Indications"
                                                        titleStyle={{
                                                            fontWeight:'bold',
                                                            color:'#3AAD94',
                                                            fontSize:18
                                                        }}
                                                    >
                            
                                                        <View>
                                                            <List.Section title="" titleStyle={{fontSize:18, color:'#000'}}>
                                                                <Text style={{
                                                                    paddingHorizontal:16,
                                                                    fontSize:14,
                                                                    fontWeight:'500',
                                                                    paddingVertical:8
                                                                }}>
                                                                    This is indicated in combination with other antiretrovirals or alone 
                                                                    for the treatment of human immunodeficiency virus type 1 (HIV-1) infection.
                                                                </Text>
                                                                
                                                                <View style={{
                                                                    marginHorizontal:16
                                                                }}>
                                                                    
                                                                    <List.Accordion
                                                                        title="Pharmacology"
                                                                        description=""
                                                                        titleStyle={{
                                                                            fontWeight:'bold'
                                                                        }}
                                                                        style={{
                                                                            borderBottomWidth:.3,
                                                                            borderBottomColor:'#ccc'
                                                                        }}
                                                                        // left={props => <List.Icon {...props} icon="folder" />}
                                                                    >
                                                                        <List.Item title="First item" />
                                                                        <List.Item title="Second item" />
                                                                    </List.Accordion>
                            
                                                                    <List.Accordion
                                                                        title="Dosage & Administration"
                                                                        description=""
                                                                        titleStyle={{
                                                                            fontWeight:'bold'
                                                                        }}
                                                                        style={{
                                                                            borderBottomWidth:.3,
                                                                            borderBottomColor:'#ccc'
                                                                        }}
                                                                        // left={props => <List.Icon {...props} icon="folder" />}
                                                                    >
                                                                        <List.Item title="First item" />
                                                                        <List.Item title="Second item" />
                                                                    </List.Accordion>
                            
                                                                    <List.Accordion
                                                                        title="Interaction"
                                                                        description=""
                                                                        titleStyle={{
                                                                            fontWeight:'bold'
                                                                        }}
                                                                        style={{
                                                                            borderBottomWidth:.3,
                                                                            borderBottomColor:'#ccc'
                                                                        }}
                                                                        // left={props => <List.Icon {...props} icon="folder" />}
                                                                    >
                                                                        <List.Item title="First item" />
                                                                        <List.Item title="Second item" />
                                                                    </List.Accordion>
                            
                            
                                                                </View>
                                                            </List.Section>
                                                        </View>
                                                    </List.Accordion>
                                                </List.Section> */}
                                                
                            
                                            </View>
                                        }
                                    />
                                ) : (
                                    <View style={{
                                        justifyContent:"center",
                                        alignItems:'center',
                                        height:'100%'
                                    }}>
                                        {/* <Text style={{
                                            color:'#000',
                                            fontSize:20,
                                            fontWeight:'bold'
                                        }}>No medicine available !</Text> */}
                                        <Loader/>
                                    </View>
                                )
                            }


                        </View>


                    </View>

                )
            }


        </SafeAreaView>
    )
}
