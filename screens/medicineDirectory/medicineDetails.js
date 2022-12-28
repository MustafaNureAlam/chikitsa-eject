import React, {useState, useRef} from 'react'
import { View, Text, SafeAreaView, StatusBar, ScrollView, FlatList, useWindowDimensions } from 'react-native';
import { List } from 'react-native-paper';

import { useFocusEffect } from '@react-navigation/native';
import token from '../../services/local_storage/storage';
import Loader from '../modules/loader';
import config from '../../services/config';
import RenderHTML from "react-native-render-html";

export default function MedicineDetailsScreen({navigation, route}) {
    
    
    
    const { width } = useWindowDimensions();
    const isMounted = useRef(true);

    const route_params = route.params;
    const [is_loading, setLoading] = useState(true);

    const [expanded, setExpanded] = useState(true);
    const handlePress = () => setExpanded(!expanded);

    console.log('=====MedicineDetailsScreen=====')
    console.log(route_params)
    console.log('=====MedicineDetailsScreen=====')

    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff',paddingHorizontal:16}} >
            
            <StatusBar backgroundColor={'#075141'}/>

            <View>

                    <FlatList 
                        showsVerticalScrollIndicator={false}
                        data={route_params?.data?.manual}
                        renderItem={ ({item, index}) => (
                                <List.AccordionGroup title="" titleStyle={{fontSize:18, color:'#000'}}>
                                    {/* <Text style={{
                                        paddingHorizontal:16,
                                        fontSize:14,
                                        fontWeight:'500',
                                        paddingVertical:8
                                    }}>
                                        This is indicated in combination with other antiretrovirals or alone 
                                        for the treatment of human immunodeficiency virus type 1 (HIV-1) infection.
                                    </Text> */}
                                    
                                    <View style={{
                                        marginHorizontal:8
                                    }}>
                                        
                                        <List.Accordion
                                            id={index + 1}
                                            title={item?.title}
                                            description=""
                                            titleStyle={{
                                                fontWeight:'bold'
                                            }}
                                            style={{
                                                borderBottomWidth:.3,
                                                borderBottomColor:'#ccc'
                                            }}
                                            onPress={handlePress}
                                            expanded={expanded}
                                            // left={props => <List.Icon {...props} icon="folder" />}
                                        >
                                            <View>
                                                <RenderHTML contentWidth={width} source={{html: item?.body}} />
                                            </View>
                                        </List.Accordion>


                                    </View>
                                </List.AccordionGroup>

                                
                            // <View style={{}}>

                            // </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}

                        ListHeaderComponent={
                            <View 
                                style={{
                                    marginVertical:16
                                }}
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
                                            fontSize:16,
                                            fontWeight:'bold',
                                            textAlign:'left',
                                            color:'#000',
                                            // padding:3
                                        }}>
                                            {route_params?.data?.name + "(" + route_params?.data?.power + ")"} {"\n"}
                                            {route_params?.data?.medicine_type}
                                        </Text>
                                        
                                        <Text style={{
                                            fontSize:12,
                                            fontWeight:'bold',
                                            textAlign:'left',
                                            color:'#808080',
                                            paddingTop:4
                                        }}>{route_params?.data?.manufactured_by?.name} </Text>
                                    </View>
                                    
                                    <View style={{
                                        padding:5,
                                        alignItems:'flex-end',
                                        flex:1
                                    }}>
                                        <View>
                                            <Text style={{
                                                fontSize:12,
                                                fontWeight:'bold',
                                                textAlign:'left',
                                                color:'#3AAD94'
                                            }}>{route_params?.data?.price}  </Text>
                                            
                                        </View>

                                    </View>

                                </View>
                            </View>
                        }

                    />
                    
            </View>
            
        </SafeAreaView>
    )
}
