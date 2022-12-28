import React, {useEffect, useCallback, useState, useRef, useLayoutEffect} from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    Image,
    ImageBackground,
    Linking
} from 'react-native';
import medecinebottle from '../../../../assets/medicine-bottle-fharmacy.png';
import { 
    Ionicons,
    AntDesign,
    MaterialIcons,
    Feather
} from '@expo/vector-icons';

const DATA = [
    {
        medicine_name: 'Napa',
        medicine_type: 'tablet',
        price: '20'
    },
    {
        medicine_name: 'extra',
        medicine_type: 'tablet',
        price: '10'
    },
    {
        medicine_name: 'Ace',
        medicine_type: 'tablet',
        price: '30'
    },
    {
        medicine_name: 'Hozom',
        medicine_type: 'tablet',
        price: '100'
    },
]

export default function CategoryScreen({navigation, route}) {

    const isMounted = useRef(true);

    const [route_data, setRouteData] = useState(route.params.category[Object.keys(route.params.category)[0]]);
    const [is_loading, setLoading] = useState(false);

    useLayoutEffect(() => {
        
        if(isMounted) {
            setLoading(true);
            console.log('4444444444444444444444444444444444' )
            console.log(route_data )
            console.log('4444444444444444444444444444444444' )
            setLoading(false);
        }
        return () => {
            isMounted.current = false;
        };

    }, [])


    return (
        <View style={{flex:1,paddingHorizontal:12}}>
            <View style={{
                flex:1,
                marginHorizontal:4,
                marginTop:10
            }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={route_data}
                    renderItem={({item, index}) => (
                        <View style={{
                            // flex:1,
                            width:'33%',
                            marginHorizontal:1
                        }}>
                            <TouchableOpacity 
                                onPress={() => {
                                    navigation.navigate('MedicineDetailsPharm', { data : item, pharmacyId : item?.pharmacy?.id})
                                }}
                                style={{flex:1}}
                            >

                                <View style={{
                                    flex: 1,
                                    // justifyContent: 'center',
                                    marginRight: 5,
                                    borderWidth: .5,
                                    borderColor: '#87B2A9',
                                    borderRadius: 12,
                                    marginBottom: 10,
                                    overflow: 'hidden'
                                }}>
                                    <Image size={20} source={medecinebottle} style={{width: '100%',height:100}} />
                                    
                                            
                                    <View style={{
                                        flex:1,
                                        flexDirection:'row',
                                        alignItems:'center',
                                        marginVertical:4,
                                        paddingHorizontal:4
                                    }}>
                                        
                                        <MaterialIcons 
                                            // style={{position:'relative', top:24}} 
                                            name="assignment" 
                                            size={24} 
                                            color="#EB1D36" 
                                            // onPress={() => {
                                            //     Toast.show({
                                            //         type:'error',
                                            //         text1:'Prescription is required to buy ' + item?.medicine_name,
                                            //         text2 : 'Please upload your prescription'
                                            //     })
                                            // }}
                                        />
                                        <Text style={{fontSize:10,fontWeight:'bold', color:'#EB1D36',flex:1}}>
                                        Prescription required!
                                        </Text>
                                    </View>

                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        // alignItems: 'center',
                                        padding: 5,
                                        justifyContent:'space-between',
                                        flexWrap:'wrap'
                                    }}>
                                        <View style={{
                                            // alignItems:'center',
                                            width:'50%'
                                        }}>
                                            
                                            <Text style={{ 
                                                // flex: 1,
                                                fontSize: 10,
                                                color: '#090F47',
                                                fontWeight:'bold'
                                            }}>
                                                {item?.medicine_name}
                                            </Text>

                                            <Text style={{ 
                                                // flex: 1,
                                                fontSize: 10,
                                                color: '#090F47',
                                                fontWeight:'bold'
                                            }}>
                                                {item?.medicine_type}
                                            </Text>
                                        </View>

                                        <View style={{
                                            // alignItems: 'flex-end',
                                            width:'50%'
                                        }}>
                                            
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'flex-end'
                                            }}>     
                                            
                                                <Text style={{
                                                    color: '#000',
                                                    fontSize: 18,
                                                    fontWeight: 'bold'
                                                }}>{'\u09F3'}</Text>   
                                                
                                                <Text style={{ 
                                                    color: '#000',
                                                    fontWeight: 'bold',
                                                    fontSize: 10
                                                }}>
                                                    {/* {item?.price.split('৳')[1]} */}
                                                    {item.price}
                                                </Text> 

                                            </View>    
                                            
                                            <Text style={{
                                                color: '#8B8B8B',
                                                textAlign: 'right',
                                                fontSize: 10
                                            }}>
                                                MRP {'\u09F3'} 180
                                            </Text> 

                                            <Text style={{
                                                color: '#3AAD94',
                                                textAlign: 'right',
                                                fontSize: 10,
                                                marginTop: 5
                                            }}>20% Off</Text>

                                        </View>

                                    </View>

                                    <Text style={{
                                        position: 'absolute',
                                        top: 0,
                                        backgroundColor: '#EB503F',
                                        color: '#FFF',
                                        fontSize: 8,
                                        paddingHorizontal: 10,
                                        paddingVertical: 4,
                                        borderBottomRightRadius: 10
                                    }}>
                                        Sale
                                    </Text>

                                </View>

                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                />

                

            </View>
        </View>
    )
}
