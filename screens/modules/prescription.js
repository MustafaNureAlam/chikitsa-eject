import React, {useCallback, useState, useEffect, useRef} from 'react'
import { View, Text, TouchableOpacity, ScrollView, FlatList, Pressable, Alert, Picker } from 'react-native'
import RBSheet from "react-native-raw-bottom-sheet";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import { 
    MaterialCommunityIcons, 
    MaterialIcons, 
    FontAwesome5, 
    Fontisto,
    Ionicons ,
    AntDesign  
} from '@expo/vector-icons';
import * as Storage from '../../services/local_storage/storage';
import { useFocusEffect } from '@react-navigation/native';
import { Root, Popup } from 'popup-ui';
import app_config from '../../services/config'
import SelectDropdown from 'react-native-select-dropdown'
import Autocomplete from 'react-native-autocomplete-input';

const PrescriptionTab = createMaterialTopTabNavigator();


async function addPatientProblems(problems){

    // await Storage.remove('problems')
    await Storage.getItem('problems').then(res => {
        if(res == null){
            const obj = {
                problem: problems
            }
            Storage.save('problems', JSON.stringify([obj])).then(save_res => {
                console.log(save_res)
            })
        }else {
            let problems_data = JSON.parse(res)
            const obj = {
                problem: problems
            }
            problems_data.push(obj)
            Storage.save('problems', JSON.stringify(problems_data)).then(save_res => {
                console.log(save_res)
            })
        }
    })
}

async function addPatientTests(problems){

    // await Storage.remove('tests')
    console.log('=======tests====')
    console.log(problems)
    console.log('=======tests====')
    await Storage.getItem('tests').then(async (res) => {
        if(res == null){
            const appointment_data = await Storage.getItem('appointment_data')
            let local_data = JSON.parse(appointment_data);
            const obj = {
                test_id: null,
                test_name: problems,
                appointment_id : local_data[0].appointment_id
            }
            Storage.save('tests', JSON.stringify([obj])).then(save_res => {
                console.log(save_res)
            })
        }else {
            let problems_data = JSON.parse(res)
            const appointment_data = await Storage.getItem('appointment_data')
            let local_data = JSON.parse(appointment_data);
            const obj = {
                test_id: null,
                test_name: problems,
                appointment_id : local_data[0].appointment_id
            }
            problems_data.push(obj)
            Storage.save('tests', JSON.stringify(problems_data)).then(save_res => {
                console.log(save_res)
            })
        }
    })
}

function PatientsProblem({navigation}) {

    const [problems, setProblems] = useState("");
    const [problemCache, setProblemCache] = useState([]);

    useEffect(async() => {
        await Storage.getItem('problems').then(res => {
            if(res && res.length > 0){
                setProblemCache(JSON.parse(res))
            }
        })
    } , [])

    return(
        <View style={{flex:1}}>

            <View style={{
                paddingVertical:10,
                paddingHorizontal:15,
            }}>
                <View>
                    

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={problemCache}
                        renderItem={({item, index}) => (
                            // <View style={{
                            //     marginVertical:3
                            // }}>
                            //     <Text>{item.suggestion}</Text>
                            // </View>
                            <Pressable style={{
                                marginVertical:3,
                                borderRadius:5,
                                backgroundColor:'#3AAD94',  
                                paddingVertical:7,
                                paddingHorizontal:5
                            }}>
                                <TouchableOpacity onPress={async() => {
                                    // Storage.remove('problems')
                                    setProblems(problemCache[index].problem)
                                    if(index === problemCache.length){
                                        problemCache.pop()
                                    }else{
                                        problemCache.splice(index, 1)
                                    }
                                    setProblemCache(problemCache)
                                    Storage.remove('problems').then(result => {
                                        Storage.save('problems', JSON.stringify(problemCache))
                                    })
                                }}>
                                    <Text style={{
                                        fontSize:14, 
                                        fontWeight:'bold',
                                        color:'#fff',
                                        paddingHorizontal:10,
                                        paddingVertical:5
                                    }}>
                                    {index + 1} . {item.problem}
                                    </Text>
                                </TouchableOpacity>
                                

                            </Pressable>

                            
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={
                            <Text style={{
                                fontSize:16, 
                                fontWeight:'bold',
                                color:'#000',
                                // backgroundColor:'#3AAD94',
                                paddingVertical:7,
                                paddingHorizontal:5
                            }}>Problems</Text>
                        }
                        ListFooterComponent={
                            <View style={{
                                marginHorizontal:10,
                                marginVertical:10,
                            }}>
                                <TextInput 
                                    label={"Type Patient Problems"}
                                    value={problems}
                                    onChangeText={(text) => {
                                        setProblems(text)
                                        // console.log('problems', problems)
                                    }}
                                    mode="flat"
                                    activeUnderlineColor='#3AAD94'
                                />
        
                                <TouchableOpacity 
                                    style={{
                                        backgroundColor:'#3AAD94',
                                        paddingVertical:7,
                                        paddingHorizontal:10,
                                        marginVertical:20,
                                        borderRadius:100/2,
                                        marginHorizontal:30
        
                                    }}
        
                                    onPress={() => {
                                        if(problems){
                                            addPatientProblems(problems),
                                            setProblemCache([...problemCache, {problem:problems}]),
                                            setProblems("")
                                        }
                                    }}
                                >
                                    <Text style={{
                                        textAlign:'center',
                                        fontSize:16,
                                        fontWeight:'bold',
                                        padding:5,
                                        color:'#fff'
                                    }}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />

                </View>

                   
            </View>

        </View>
    )
}


async function addNewSuggestion(suggestions){
    // await Storage.remove('suggestions')
    await Storage.getItem('suggestions').then(res => {
        if(res == null){
            const obj = {
                suggestion: suggestions
            }
            Storage.save('suggestions', JSON.stringify([obj])).then(save_res => {
                console.log(save_res)
            })
        }else {
            let new_suggestions = JSON.parse(res)
            const obj = {
                suggestion: suggestions
            }
            new_suggestions.push(obj)
            Storage.save('suggestions', JSON.stringify(new_suggestions)).then(save_res => {
                console.log(save_res)
            })
        }
    })
}

function PatientsSuggestions({navigation}) {

    const [suggestions, setSuggest] = useState("");
    const [is_loading, setLoading] = useState(false);
    const [suggestCache, setSuggestCache] = useState([]);

    useEffect(async() => {
        await Storage.getItem('suggestions').then(res => {
            if(res && res.length > 0){
                setSuggestCache(JSON.parse(res))
            }
        })
    } , [])

    return(
        <View style={{flex:1}}>

            <View style={{
                paddingVertical:10,
                paddingHorizontal:15,
            }}>
                    
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={suggestCache}
                    renderItem={({item, index}) => (
                        
                        <Pressable style={{
                            marginVertical:3,
                            borderRadius:5,
                            backgroundColor:'#3AAD94',  
                            paddingVertical:7,
                            paddingHorizontal:5
                        }}>
                            <TouchableOpacity onPress={async() => {
                                setSuggest(suggestCache[index].suggestion)
                                if(index === suggestCache.length){
                                    suggestCache.pop()
                                }else{
                                    suggestCache.splice(index, 1)
                                }
                                setSuggestCache(suggestCache)
                                Storage.remove('suggestions').then(result => {
                                    Storage.save('suggestions', JSON.stringify(suggestCache))
                                })
                            }}>
                                <Text style={{
                                    fontSize:14, 
                                    fontWeight:'bold',
                                    color:'#fff',
                                    paddingHorizontal:10,
                                    paddingVertical:5
                                }}>
                                {index + 1} . {item.suggestion}
                                </Text>
                            </TouchableOpacity>
                            

                        </Pressable>

                        
                    )}
                    keyExtractor={(item, index) => index.toString()}

                    ListHeaderComponent={
                        <Text style={{
                            fontSize:16,
                            fontWeight:'bold',
                            paddingVertical:5
                        }}>
                            Suggestions
                        </Text>
                    }

                    ListFooterComponent={
                        <View style={{
                            marginHorizontal:10,
                            marginVertical:10,
                        }}>
                            <TextInput 
                                label={"Type Patient Suggestions"}
                                value={suggestions}
                                onChangeText={(text) => {
                                    setSuggest(text)
                                }}
                                mode="flat"
                                activeUnderlineColor='#3AAD94'
                            />
    
                            <TouchableOpacity 
                                style={{
                                    backgroundColor:'#3AAD94',
                                    paddingVertical:7,
                                    paddingHorizontal:10,
                                    marginVertical:20,
                                    borderRadius:100/2,
                                    marginHorizontal:30
    
                                }}
    
                                onPress={ () => { 
                                    if(suggestions){
                                        addNewSuggestion(suggestions),
                                        setSuggestCache([...suggestCache, {suggestion:suggestions}]),
                                        setSuggest("")
                                    }
                                }}
                            >
                                <Text style={{
                                    textAlign:'center',
                                    fontSize:16,
                                    fontWeight:'bold',
                                    padding:5,
                                    color:'#fff'
                                }}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
                    
            </View>

        </View>
    )
}

async function addNewMedicine(frequency, duration, selectedValue, dosage){
    // await Storage.remove('medicine')
    // console.log('======state uddareffc=======')
    // console.log(frequency)
    // console.log('======state uddareffc=======')
    await Storage.getItem('medicine').then(res => {
        if(res == null){
            const medicine_obj = {
                medicine: selectedValue.name,
                power: selectedValue.power,
                medicine_id: selectedValue.id,
                frequency: frequency,
                duration: duration,
                dosage: dosage
            }
            Storage.save('medicine', JSON.stringify([medicine_obj])).then(save_res => {
                console.log(save_res)
            })
        }else {
            let new_medicine = JSON.parse(res)
            const medicine_obj = {
                medicine: selectedValue.name,
                power: selectedValue.power,
                medicine_id: selectedValue.id,
                frequency: frequency,
                duration: duration,
                dosage: dosage
            }
            new_medicine.push(medicine_obj)
            Storage.save('medicine', JSON.stringify(new_medicine)).then(save_res => {
                console.log(save_res)
            })
        }
    })
}

function PatientsMedications({navigation}) {


    const [medicine, setMedicineName] = useState("");
    const [dosage, setMedicineDosage] = useState("");
    const [frequency, setMedicineFrequency] = useState("");
    const [duration, setMedicineDuration] = useState("");
    const [cache, setCache] = useState([]);

    const [off, setOff] = useState(0);
    const [on, setOn] = useState(1);
    
    const [onAfternoon, setOnAfternoon] = useState(1);
    const [offAfternoon, setOffAfternoon] = useState(0);
    
    const [onNight, setOnNight] = useState(1);
    const [offNight, setOffNight] = useState(0);
    
    const [bg, setBg] = useState('');
    const [noonBg, setNoonBg] = useState('');
    const [nightBg, setNightBg] = useState('');
    
    const [color, setColor] = useState('#3AAD94');
    const [noonColor, setNoonColor] = useState('#3AAD94');
    const [nightColor, setNightColor] = useState('#3AAD94');
    
    const [isMorning, setisMorning] = useState(false);
    const [isAfternoon, setisAfternoon] = useState(false);
    const [isNight, setisNight] = useState(false);

    const [selected_days, setSelectedDays] = useState();
    
    // const [query, setQuery] = useState('');
    const [search_data, setSearchData] = useState([]);

    const [filteredFilms, setFilteredFilms] = useState([]);
    // For Selected Data
    const [selectedValue, setSelectedValue] = useState({});
    
    const isMounted = useRef(true);


    const setQuery = (query) => {
        // Method called every time when we change the value of the input
        if (query) {
          // Making a case insensitive regular expression
          const regex = new RegExp(`${query.trim()}`, 'i');
          // Setting the filtered film array according the query
          setFilteredFilms(
            search_data.filter((film) => film.name.search(regex) >= 0)
          );
        } else {
          // If the query is null then return blank
          setFilteredFilms([]);
        }
      };



    async function getMediceneName() {
        let user_token = await Storage.getItem("token");
        // var myHeaders = new Headers({
        //     Accept: 'application/json',
        //     'Content-Type': 'multipart/form-data',
        //     Authorization: 'Bearer ' + user_token
        // });

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({medicine})

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        await fetch( app_config.baseUrl + "medicine/search", requestOptions)
        .then(response => response.text())
        .then(result => {

            let user_data_response = JSON.parse(result);
            setSearchData(user_data_response.data);
            // console.log("'man',user_data_response")
            // console.log(user_data_response)
            // console.log("'man',user_data_response")


           
        })
        .catch(error => console.log(error));
    }

    useEffect(async() => {
        
        if(isMounted){
            getMediceneName()
        }
        return() => isMounted.current = false;

    } , [medicine])
    

    useEffect(async() => {
        await Storage.getItem('medicine').then(res => {
            if(res && res.length > 0){
                setCache(JSON.parse(res))
            }
        })
    } , [])

    return(
        <View style={{flex:1, backgroundColor:'#fff'}}>

            <View style={{
                paddingVertical:10,
                paddingHorizontal:15,
                marginTop:10,
            }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={cache}
                    renderItem={({item, index}) => (
                        <TouchableOpacity 
                            style={{
                                backgroundColor:'#3AAD94',
                                paddingVertical:10,
                                paddingHorizontal:10,
                                borderRadius:5,
                                marginHorizontal:10,
                                marginVertical:5
                            }}
                            onPress={async() => {
                                console.log("onpresed cach item")
                                console.log(item)
                                console.log("onpresed cach item -- END")
                                // selectedValue, 
                                setSelectedValue({
                                    "id": item?.medicine_id,
                                    "name": item.medicine,
                                    "power": item?.power,
                                })
                                setMedicineDosage(item.dosage)
                                setMedicineDuration(item.duration)
                                let frequency_split = item.frequency.split("+")
                                
                                if(frequency_split[0] == "1"){
                                    setisMorning(true)
                                    setBg('#3AAD94')
                                    setColor("#fff") 
                                }else{
                                    setisMorning(false)
                                    setBg('#fff')
                                    setColor("#3AAD94") 
                                }
                                
                                if(frequency_split[1] == "1"){
                                    setisAfternoon(true)
                                    setNoonBg('#3AAD94')
                                    setNoonColor("#fff") 
                                }else{
                                    setisAfternoon(false)
                                    setNoonBg('#fff')
                                    setNoonColor("#3AAD94") 
                                }
                                
                                if(frequency_split[2] == "1"){
                                    setisNight(true)
                                    setNightBg('#3AAD94')
                                    setNightColor("#fff") 
                                }else{
                                    setisNight(false)
                                    setNightBg('#fff')
                                    setNightColor("#3AAD94") 
                                }
                                
                                if(index === cache.length){
                                    cache.pop()
                                }else{
                                    cache.splice(index, 1)
                                }
                                setCache(cache)
                                Storage.remove('medicine').then(result => {
                                    Storage.save('medicine', JSON.stringify(cache))
                                })
                            }}
                        >
                            <Text style={{
                                fontSize:14, 
                                fontWeight:'bold',
                                color:'#fff',
                            }}>
                                {index + 1} . {item.medicine} - {item.power}{'\n'}
                                Dosage : {item.dosage}{'\n'}
                                Frequency : {item.frequency}{'\n'}
                                Duration :  {item.duration}{'\n'}
                            </Text>

                        </TouchableOpacity>

                        
                    )}
                    keyExtractor={(item, index) => index.toString()}

                    ListFooterComponent={
                        <View style={{
                            marginHorizontal:10,
                            marginVertical:10,
                        }}>
                            <View style={{
                                marginVertical:5,
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'flex-start'
                            }}>
                                <View style={{
                                    flex:1,
                                    marginTop:5
                                }}>
                                    {/* <TextInput 
                                        label={"Type Medicine"}
                                        value={medicine}
                                        onChangeText={(text) => {
                                            setMedicineName(text)
                                        }}
                                        mode="flat"
                                        activeUnderlineColor='#3AAD94'
                                    /> */}

                                    <View style={{
                                        
                                    }}>
                                        <Autocomplete
                                            inputContainerStyle={{padding:5}}
                                            placeholder='Medicine name'
                                            data={filteredFilms}
                                            defaultValue={
                                                JSON.stringify(selectedValue) === '{}' ?
                                                '' :
                                                selectedValue.name + " - " + selectedValue.power
                                            }
                                            value={selectedValue}
                                            onChangeText={(text) => { 
                                                setQuery(text);
                                                setMedicineName(text); 
                                            }}
                                            flatListProps={{
                                                keyExtractor: (_, idx) => idx,
                                                renderItem: ({ item }) => 
                                                
                                                <View style={{
                                                    padding:3
                                                }}>
                                                    
                                                    <TouchableOpacity onPress={() => {

                                                        console.log("on press med item========")
                                                        console.log(item)
                                                        console.log("on press med item==========END")
                                                        // setMyLatitude(item.latitude)
                                                        // setMyLongitude(item.longitude)
                                                        // setMyAddress(item.address)
                                                        // setLocation({ latitude, longitude });
                                                        // setRegion({ latitude, longitude });
                                                        // setSearch(item.address);
                                                        // setQuery(item.name)
                                                        setSelectedValue(item);
                                                        setFilteredFilms([]);
                                                        // refRBSheet.current.open();
                                                    }}>
                                                        <Text>{item.name} - {item.power}</Text>
                                                    
                                                    </TouchableOpacity>
                                                    
                                                </View>
                                            }}                                
                                        />
                                    </View>


                                    <View style={{
                                        borderWidth:.3,
                                        borderColor:'#70707B',
                                        borderRadius:5,
                                        marginVertical:5,
                                    }}>
                                        <Picker 
                                            selectedValue={dosage}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setMedicineDosage(itemValue)
                                            }
                                            style={{color:'#70707B', }}
                                        >
                                            <Picker.Item label={"Dosage"} value={""} />
                                            <Picker.Item label={"1/2 Tablet"} value={"1/2 Tablet"} />
                                            <Picker.Item label={"1 Tablet"} value={"1 Tablet"} />
                                            <Picker.Item label={"1.5 Tablets"} value={"1.5 Tablets"} />
                                            <Picker.Item label={"2 Tablets"} value={"2 Tablets"} />
                                            <Picker.Item label={"3 Tablets"} value={"3 Tablets"} />
                                            <Picker.Item label={"1/2 Cup"} value={"1/2 Cup"} />
                                            <Picker.Item label={"1 Cup"} value={"1 Cup"} />
                                            <Picker.Item label={"1.5 Cups"} value={"1.5 Cups"} />
                                            <Picker.Item label={"2 Cups"} value={"2 Cups"} />
                                            <Picker.Item label={"3 Cups"} value={"3 Cups"} />
                                            <Picker.Item label={"1/2 Drop"} value={"1/2 Drop"} />
                                            <Picker.Item label={"1 Drop"} value={"1 Drop"} />
                                            <Picker.Item label={"1.5 Drops"} value={"1.5 Drops"} />
                                            <Picker.Item label={"2 Drops"} value={"2 Drops"} />
                                            <Picker.Item label={"3 Drops"} value={"3 Drops"} />
                                        </Picker>
                                    </View>

                                    <View style={{
                                        borderWidth:.3,
                                        borderColor:'#70707B',
                                        borderRadius:5,
                                        marginVertical:5,
                                    }}>
                                        <Picker 
                                            selectedValue={duration}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setMedicineDuration(itemValue)
                                            }
                                            style={{color:'#70707B', }}
                                        >
                                            <Picker.Item label={"Duration"} value={""} />
                                            <Picker.Item label={"1 Time"} value={"1 Time"} />
                                            <Picker.Item label={"1 Day"} value={"1 Day"} />
                                            <Picker.Item label={"2 Days"} value={"2 Days"} />
                                            <Picker.Item label={"3 Days"} value={"3 Days"} />
                                            <Picker.Item label={"5 Days"} value={"5 Days"} />
                                            <Picker.Item label={"1 Week"} value={"1 Week"} />
                                            <Picker.Item label={"10 Days"} value={"10 Days"} />
                                            <Picker.Item label={"12 Days"} value={"12 Days"} />
                                            <Picker.Item label={"2 Weeks"} value={"2 Weeks"} />
                                            <Picker.Item label={"15 Days"} value={"15 Days"} />
                                            <Picker.Item label={"20 Days"} value={"20 Days"} />
                                            <Picker.Item label={"3 Weeks"} value={"3 Weeks"} />
                                            <Picker.Item label={"1 Month"} value={"1 Month"} />
                                            <Picker.Item label={"1.5 Months"} value={"1.5 Months"} />
                                            <Picker.Item label={"2 Months"} value={"2 Months"} />
                                            <Picker.Item label={"2.5 Months"} value={"2.5 Months"} />
                                            <Picker.Item label={"3 Month"} value={"3 Month"} />
                                            <Picker.Item label={"4 Month"} value={"4 Month"} />
                                            <Picker.Item label={"5 Month"} value={"5 Month"} />
                                            <Picker.Item label={"6 Month"} value={"6 Month"} />
                                            <Picker.Item label={"8 Month"} value={"8 Month"} />
                                            <Picker.Item label={"10 Month"} value={"10 Month"} />
                                            <Picker.Item label={"1 Year"} value={"1 Year"} />
                                            <Picker.Item label={"1.5 Years"} value={"1.5 Years"} />
                                            <Picker.Item label={"2 Years"} value={"2 Years"} />
                                            <Picker.Item label={"3 Years"} value={"3 Years"} />
                                            <Picker.Item label={"5 Years"} value={"5 Years"} />
                                            <Picker.Item label={"LifeTime"} value={"LifeTime"} />
                                        </Picker>
                                    </View>

                                    
                                </View>
                                
                                <View style={{
                                    flexDirection:'row',
                                    flex:.4,
                                    alignItems:'flex-start',
                                    justifyContent:'space-around',
                                    paddingHorizontal:3
                                }}>

                                    <View style={{
                                        // alignItems:'flex-start'
                                    }}>
                                        <Text style={{
                                            color:'#3AAD94',
                                            fontWeight:'bold',
                                            fontSize:14,
                                            // marginTop:15,
                                            textAlign:'center'
                                        }}>{isMorning ? "1" : "0"} + {isAfternoon ? "1" : "0"} + {isNight ? "1" : "0"}
                                        </Text>
                                        
                                        <TouchableOpacity 
                                            style={{
                                                paddingHorizontal:10,
                                                paddingVertical:7,
                                                borderRadius:100/2,
                                                borderWidth:1,
                                                borderColor:'#3AAD94',
                                                marginTop:5,
                                                backgroundColor:bg,
                                            }}
                                            onPress={() => {
                                                setisMorning(prevState => !prevState)
                                                setBg( isMorning ?  '#fff' : "#3AAD94" )
                                                setColor( isMorning ?  '#3AAD94' : "#fff" ) 
                                            }}
                                        >
                                            <Text style={{
                                                color:color,
                                                fontSize:10,
                                                fontWeight:'bold',
                                                textAlign:'center',
                                            }}>Morning</Text>
                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity
                                            style={{
                                                paddingHorizontal:10,
                                                paddingVertical:7,
                                                borderRadius:100/2,
                                                borderWidth:1,
                                                borderColor:'#3AAD94',
                                                marginTop:5,
                                                backgroundColor:noonBg
                                            }}
                                            onPress={() => {
                                                setisAfternoon(prevState => !prevState)
                                                setNoonBg( isAfternoon ?  '#fff' : "#3AAD94" )
                                                setNoonColor( isAfternoon ?  '#3AAD94' : "#fff" ) 
                                            }}
                                        >
                                            <Text style={{
                                                color:noonColor,
                                                fontSize:10,
                                                fontWeight:'bold',
                                                textAlign:'center'
                                            }}>Afternoon</Text>

                                        </TouchableOpacity>
                                        
                                        <TouchableOpacity
                                            style={{
                                                paddingHorizontal:10,
                                                paddingVertical:7,
                                                borderRadius:100/2,
                                                borderWidth:1,
                                                borderColor:'#3AAD94',
                                                marginTop:5,
                                                backgroundColor:nightBg
                                            }}
                                            onPress={() => {
                                                setisNight(prevState => !prevState)
                                                setNightBg( isNight ?  '#fff' : "#3AAD94" )
                                                setNightColor( isNight ?  '#3AAD94' : "#fff" ) 
                                            }}
                                        >
                                            <Text style={{
                                                color:nightColor,
                                                fontSize:10,
                                                fontWeight:'bold',
                                                textAlign:'center'
                                            }}>Night</Text>

                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            

                            {/* <View style={{
                                marginVertical:5
                            }}>
                                <TextInput 
                                    label={"Dosage Ex: 10 ml."}
                                    value={dosage}
                                    onChangeText={(text) => {
                                        setMedicineDosage(text)
                                    }}
                                    mode="flat"
                                    activeUnderlineColor='#3AAD94'
                                />
                            </View> */}

                            {/* <View style={{
                                marginVertical:5
                            }}>
                                <TextInput 
                                    label={"Frequency Ex: 1+0+1"}
                                    value={frequency}
                                    onChangeText={(text) => {
                                        setMedicineFrequency(text)
                                    }}
                                    mode="flat"
                                    activeUnderlineColor='#3AAD94'
                                />
                            </View> */}
                            
                            {/* <View style={{
                                marginVertical:5
                            }}> 
                                <TextInput 
                                    label={"Duration Ex: 7 days"}
                                    value={duration}
                                    onChangeText={(text) => {
                                        setMedicineDuration(text)
                                    }}
                                    mode="flat"
                                    activeUnderlineColor='#3AAD94'
                                />
                            </View> */}
                            
                            
                            
        
                            <TouchableOpacity 
                                style={{
                                    backgroundColor:'#3AAD94',
                                    paddingVertical:7,
                                    paddingHorizontal:10,
                                    marginVertical:20,
                                    borderRadius:100/2,
                                    marginHorizontal:30
        
                                }}
        
                                onPress={ () => { 
                                    
                                    if(selectedValue.name && duration && dosage && isMorning || isAfternoon || isNight){

                                        let morning_value;
                                        let afternoon_value;
                                        let night_value;
                                        
                                        if(isMorning == true){
                                            morning_value = 1
                                        } else{
                                            morning_value = 0
                                        }
    
                                        if(isAfternoon == true){
                                            afternoon_value = 1
                                        } else{
                                            afternoon_value = 0
                                        }
                                        
                                        if(isNight == true){
                                            night_value = 1
                                        } else{
                                            night_value = 0
                                        }
                                        
                                        let medicine_frequency = morning_value + "+" + afternoon_value + "+" + night_value
                                        setMedicineFrequency(medicine_frequency)
    
    
                                        // console.log('====setMedicineFrequency====')
                                        // console.log(frequency)
                                        // console.log('====setMedicineFrequency====')
    
                                        addNewMedicine(medicine_frequency, duration, selectedValue, dosage);
                                        const cacheData = {
                                            medicine_id: selectedValue.id,
                                            medicine: selectedValue.name,
                                            power: selectedValue.power,
                                            frequency: morning_value + "+" + afternoon_value + "+" + night_value,
                                            duration: duration,
                                            dosage: dosage
                                        };
            
                                        setCache((prevState) => [...prevState, cacheData]);
                                        setSelectedValue({});
                                        setMedicineFrequency("");
                                        setMedicineDuration("");
                                        setMedicineDosage("");
    
                                        setisMorning(false)
                                        setBg('#fff')
                                        setColor("#3AAD94")
    
                                        setisAfternoon(false)
                                        setNoonBg('#fff')
                                        setNoonColor("#3AAD94") 
    
                                        setisNight(false)
                                        setNightBg('#fff')
                                        setNightColor("#3AAD94") 
                                    }
                                }}
                            >
                                <Text style={{
                                    textAlign:'center',
                                    fontSize:16,
                                    fontWeight:'bold',
                                    padding:5,
                                    color:'#fff'
                                }}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
                

                
            </View>

        </View>
    )
}
function PatientsTests({navigation}) {
    const [tests, setTests] = useState("");
    const [testCache, setTestCache] = useState([]);

    useEffect(async() => {
        await Storage.getItem('tests').then(res => {
            if(res && res.length > 0){
                setTestCache(JSON.parse(res))
            }
        })
    } , [])

    return(
        <View style={{flex:1}}>

            <View style={{
                paddingVertical:10,
                paddingHorizontal:15,
            }}>
                <View>
                    

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={testCache}
                        renderItem={({item, index}) => (
                            // <View style={{
                            //     marginVertical:3
                            // }}>
                            //     <Text>{item.suggestion}</Text>
                            // </View>
                            <Pressable style={{
                                marginVertical:3,
                                borderRadius:5,
                                backgroundColor:'#3AAD94',  
                                paddingVertical:7,
                                paddingHorizontal:5
                            }}>
                                <TouchableOpacity
                                    onPress={async() => {
                                        setTests(testCache[index].test_name)
                                        if(index === testCache.length){
                                            testCache.pop()
                                        }else{
                                            testCache.splice(index, 1)
                                        }
                                        setTestCache(testCache)
                                        Storage.remove('tests').then(result => {
                                            Storage.save('tests', JSON.stringify(testCache))
                                        })
                                    }}
                                >
                                    <Text style={{
                                        fontSize:14, 
                                        fontWeight:'bold',
                                        color:'#fff',
                                        paddingHorizontal:10,
                                        paddingVertical:5
                                    }}>
                                    {index + 1} . {item.test_name}
                                    </Text>
                                </TouchableOpacity>
                                

                            </Pressable>

                            
                        )}
                        keyExtractor={(item, index) => index.toString()}
                        ListHeaderComponent={
                            <Text style={{
                                fontSize:16, 
                                fontWeight:'bold',
                                color:'#000',
                                // backgroundColor:'#3AAD94',
                                paddingVertical:7,
                                paddingHorizontal:5
                            }}>Tests</Text>
                        }
                        ListFooterComponent={
                            <View style={{
                                marginHorizontal:10,
                                marginVertical:10,
                            }}>
                                <TextInput 
                                    label={"Type Test Name"}
                                    value={tests}
                                    onChangeText={(text) => {
                                        setTests(text)
                                        // console.log('problems', problems)
                                    }}
                                    mode="flat"
                                    activeUnderlineColor='#3AAD94'
                                />
        
                                <TouchableOpacity 
                                    style={{
                                        backgroundColor:'#3AAD94',
                                        paddingVertical:7,
                                        paddingHorizontal:10,
                                        marginVertical:20,
                                        borderRadius:100/2,
                                        marginHorizontal:30
        
                                    }}
        
                                    onPress={async() => {
                                        if(tests){
                                            addPatientTests(tests);
    
                                            const appointment_data = await Storage.getItem('appointment_data')
                                            let local_data = JSON.parse(appointment_data);
                                            const obj = {
                                                test_id: null,
                                                test_name: tests,
                                                appointment_id : local_data[0].appointment_id
                                            }
                                            setTestCache([...testCache, obj]),
                                            
                                            setTests("")
                                        }else{
                                            console.log("Kichu Likho!")
                                        }
                                    }}
                                >
                                    <Text style={{
                                        textAlign:'center',
                                        fontSize:16,
                                        fontWeight:'bold',
                                        padding:5,
                                        color:'#fff'
                                    }}>Add</Text>
                                </TouchableOpacity>
                            </View>
                        }
                    />

                </View>

                   
            </View>

        </View>
    )
}


async function SaveData(){
    console.log("hit")
    var myHeaders = new Headers();
    
    const user_token = await Storage.getItem('token')
    const appointment_data = await Storage.getItem('appointment_data')
    let local_data = JSON.parse(appointment_data);

    let suggetion_data = []; 
    let medicine_data = [];
    let problems_data = [];
    let tests_data = [];

    suggetion_data = JSON.parse(await Storage.getItem('suggestions')); 
    medicine_data = JSON.parse(await Storage.getItem('medicine'))
    problems_data = JSON.parse(await Storage.getItem('problems'))
    tests_data = JSON.parse(await Storage.getItem('tests'))

    
    myHeaders.append("Authorization", "Bearer "+ user_token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "patient_user_id": local_data[0].patient_user_id,
        "doctor_user_id": local_data[0].doctor_user_id,
        "appointment_id": local_data[0].appointment_id,
        // "prescribed_date": "1",
        // "type": "old",
        "prescription_test": tests_data,
        "prescription_problems": problems_data,
        "prescription_medicines": medicine_data,
        "prescription_suggestions": suggetion_data
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    
    await fetch(app_config.baseUrl+"prescription/store", requestOptions)
        .then(response => response.text())
        .then(async(result) => {
            
            let res_result = JSON.parse(result)
            Alert.alert(
                res_result.message_type,
                res_result.message,
                [
                  {
                    text: "ok",
                    // onPress: () => Alert.alert("Cancel Pressed"),
                    style: "cancel",
                  },
                ],
            )

            if(res_result.code === 200){
                await Storage.remove('problems')
                await Storage.remove('suggestions')
                await Storage.remove('medicine')
                await Storage.remove('appointment_data')
                await Storage.remove('tests')
            }
        })
        .catch(error => console.log('error', error));
}

function PrescriptionPreview({navigation}) {

    const [is_loading, setLoading] = useState(false);
    const [view_suggest, setViewSuggest] = useState([]);
    const [view_problems, setViewProblems] = useState([]);
    const [view_medicine, setViewMedicine] = useState([]);
    const [view_tests, setViewTests] = useState([]);

    // console.log('====view_medicine======')
    // console.log(view_medicine)
    // console.log('=====view_medicine=====')

    async function getPatientSuggestion(){
        // await Storage.remove('suggestions')
        await Storage.getItem('suggestions').then(res => {

            if(res == null){
                setViewSuggest([])
            }else {
                let data_arr = JSON.parse(res);
                setViewSuggest(data_arr);
                console.log('else===suggest',data_arr)
            }
        })

    }
    async function getPatientProblems(){
        // await Storage.remove('suggestions')
        await Storage.getItem('problems').then(res => {

            if(res == null){
                setViewProblems([])
                // console.log('if===',res)
            }else {
                let data_arr = JSON.parse(res);
                console.log('else===problem',data_arr)
                setViewProblems(data_arr);
            }
        })

    }

    async function getPatientTests(){
        // await Storage.remove('suggestions')
        await Storage.getItem('tests').then(res => {

            if(res == null){
                setViewTests([])
            }else {
                let data_arr = JSON.parse(res);
                setViewTests(data_arr);
            }
        })

    }

    async function getPatientMedicine(){
        // await Storage.remove('medicine')
        await Storage.getItem('medicine').then(res => {

            // console.log('------------=get DAta--=====', res);
            if(res == null){
                setViewMedicine([])
                // console.log('if===',res)
            }else {
                let data_arr = JSON.parse(res);
                // console.log('else===medicine',data_arr)
                setViewMedicine(data_arr);
            }
        })

    }

    useFocusEffect(
        useCallback(() => {
            
            setLoading(true);
            getPatientSuggestion();
            getPatientProblems();
            getPatientMedicine();
            getPatientTests();
            setLoading(false);
            
            
        }, []),
    );

    return(
        <View style={{flex:1, }}>
            {
                is_loading ? (
                    null
                ) : (
                    <View style={{
                        paddingVertical:10,
                        paddingHorizontal:15,
                    }}>
                        <ScrollView style={{height:'100%'}} showsVerticalScrollIndicator={false}>
                        
                            <Pressable style={{
                                backgroundColor:'#4BD4B6',
                                paddingHorizontal:20,
                                paddingVertical:15,
                                borderRadius:10,
                                marginHorizontal:15,
                                marginVertical:7
                            }}>
                                <View style={{
                                    flexDirection:'row',
                                    alignItems:'center'
                                }}>
                                    
                                    <Text style={{ 
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                    }}>
                                        <MaterialIcons name="report-problem" size={30} color="#fff" />
                                    </Text>

                                    <Text style={{ 
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        paddingHorizontal:10
                                    }}>
                                        Problems
                                    </Text>
                                </View>

                                <View style={{
                                    backgroundColor:'#fff',
                                    borderRadius:10,
                                    paddingHorizontal:10,
                                    paddingVertical:10,
                                    marginVertical:10
                                }}>
                                    
                                    <FlatList
                                        data={view_problems}
                                        renderItem={({item, index}) => (
                                            <View>
                                                <Text style={{
                                                    color:'#7B93A4',
                                                    fontSize:14,
                                                    fontWeight:'500',
                    
                                                }}>
                                                   {index + 1}. {item?.problem}
                                                </Text>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
        
                                
                            </Pressable>
        
                            <Pressable style={{
                                backgroundColor:'#4BD4B6',
                                paddingHorizontal:20,
                                paddingVertical:15,
                                borderRadius:10,
                                marginHorizontal:15,
                                marginVertical:7
                            }}>
                                <View style={{
                                    flexDirection:'row',
                                    alignItems:'center'
                                }}>

                                    <Text style={{ 
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                    }}>
                                        <MaterialIcons name="speaker-notes" size={30} color="#fff" />
                                    </Text>
                                    <Text style={{ 
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        paddingHorizontal:10
                                    }}>
                                        Suggestions
                                    </Text>
                                </View>
        
                                <View style={{
                                    backgroundColor:'#fff',
                                    borderRadius:10,
                                    paddingHorizontal:10,
                                    paddingVertical:10,
                                    marginVertical:10
                                }}>
                                    
                                    <FlatList
                                        data={view_suggest}
                                        renderItem={({item, index}) => (
                                            <View>
                                                <Text style={{
                                                    color:'#7B93A4',
                                                    fontSize:14,
                                                    fontWeight:'500',
                    
                                                }}>
                                                   {index + 1}. {item?.suggestion}
                                                </Text>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            </Pressable>
        
                            <Pressable style={{
                                backgroundColor:'#4BD4B6',
                                paddingHorizontal:20,
                                paddingVertical:15,
                                borderRadius:10,
                                marginHorizontal:15,
                                marginVertical:7
                            }}>
                                <View style={{
                                    flexDirection:'row',
                                    alignItems:'center'
                                }}>

                                    <Text style={{ 
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                    }}>
                                        <FontAwesome5 name="capsules" size={30} color="#fff" />
                                    </Text>
                                    
                                    <Text style={{ 
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        paddingHorizontal:10
                                    }}>
                                        Medicines
                                    </Text>
                                </View>
                                
        
                                <View style={{
                                    backgroundColor:'#fff',
                                    borderRadius:10,
                                    paddingHorizontal:10,
                                    paddingVertical:10,
                                    marginVertical:10
                                }}>
                                    
                                    
                                    <FlatList
                                        data={view_medicine}
                                        renderItem={({item, index}) => (
                                            <View>
                                                <Text style={{
                                                    color:'#7B93A4',
                                                    fontSize:14,
                                                    fontWeight:'500',
                    
                                                }}>
                                                   {index + 1} . {'Medicine Name : ' + item.medicine + " - " + item.power}{'\n'}
                                                    Dosage : {item.dosage}{'\n'}
                                                    Frequency : {item.frequency}{'\n'}
                                                    Duration :  {item.duration}{'\n'}
                                                </Text>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            </Pressable>
        
                            <Pressable style={{
                                backgroundColor:'#4BD4B6',
                                paddingHorizontal:20,
                                paddingVertical:15,
                                borderRadius:10,
                                marginHorizontal:15,
                                marginVertical:7
                            }}>

                                <View style={{
                                    flexDirection:'row',
                                    alignItems:'center'
                                }}>

                                    <Text style={{ 
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                    }}>
                                        <Fontisto name="test-tube" size={30} color="#fff" />
                                    </Text>
                                    
                                    <Text style={{ 
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        paddingHorizontal:10
                                    }}>
                                        Tests and Reports
                                    </Text>
                                </View>
        
                                <View style={{
                                    backgroundColor:'#fff',
                                    borderRadius:10,
                                    paddingHorizontal:10,
                                    paddingVertical:10,
                                    marginVertical:10
                                }}>
                                    <FlatList
                                        data={view_tests}
                                        renderItem={({item, index}) => (
                                            <View>
                                                <Text style={{
                                                    color:'#7B93A4',
                                                    fontSize:14,
                                                    fontWeight:'500',
                    
                                                }}>
                                                   {index + 1}. {item?.test_name}
                                                </Text>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                            </Pressable>
        
                            <TouchableOpacity 
                                style={{
                                backgroundColor:'#3AAD94',
                                paddingHorizontal:20,
                                paddingVertical:15,
                                borderRadius:100/2,
                                marginHorizontal:15,
                                marginVertical:7
                                }}
                                onPress={()=> {
                                    SaveData();
                                }}
                            >
                                <Text style={{
                                    color:'#fff',
                                    fontSize:16,
                                    fontWeight:'bold',
                                    textAlign:'center'
        
                                }}>Generate Prescription</Text>
                            </TouchableOpacity>
                            {/* <FlatList 
                                data={[
                                    { title: 'Problems', key: '1', details: '1. Severe pain- Right side- Stomach' },
                                    { title: 'Suggestions', key: '2', details:'Eat lots of healthy fruits & vegetables' },
                                    { title: 'Medicines', key: '3', details:'1. Napa - 1+0+1'  },
                                    { title: 'Tests & Reports', key: '4', details:'1. Appendicitis'  },
                                ]}
                                renderItem={({ item, index }) => (
                                    
                                    <View style={{ flex:1,
                                        // backgroundColor: '#D9FFF0',
                                    }}>
        
                                        <View style={{
                                            backgroundColor:'#4BD4B6',
                                            paddingHorizontal:20,
                                            paddingVertical:15,
                                            borderRadius:10,
                                            marginHorizontal:15,
                                            marginVertical:7
                                        }}>
                                            <Text style={{ 
                                                color: "#fff",
                                                fontWeight: "bold",
                                                fontSize: 16,
                                            }}>
                                                {item.title}
                                            </Text>
        
                                            <View style={{
                                                backgroundColor:'#fff',
                                                borderRadius:10,
                                                paddingHorizontal:10,
                                                paddingVertical:10,
                                                marginVertical:10
                                            }}>
                                                <Text style={{
                                                    color:'#7B93A4',
                                                    fontSize:14,
                                                    fontWeight:'500',
        
                                                }}>
                                                    {item?.details}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )}
                                keyExtractor={(item, index) => index.toString()}
                            />  */}
                        </ScrollView>
                    </View>
                )
            }
        </View>
    )
}
export default function PrescriptionScreen({navigation}) {

    const refRBSheet = React.useRef();

    return (
        <View style={{flex:1}}>
            <View style={{marginTop:12}}>
                <TouchableOpacity
                    style={{
                        backgroundColor:'#3AAD94',
                        padding:7,
                        borderRadius:5,
                        marginHorizontal:15
                    }}
                    onPress={() => refRBSheet.current.open()}
                    // onPress={() => console.log('const refRBSheet = React.useRef();')}
                >
                    <Text style={{
                        color:'#fff',
                        fontSize:12,
                        fontWeight:'bold'
                    }}>Prescribe</Text>
                </TouchableOpacity>
            </View>

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                height={500}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#ccc",
                        width: 0,
                        height: 0,
                        backgroundColor: "transparent",
                        borderStyle: "solid",
                        borderLeftWidth: 20,
                        borderRightWidth: 20,
                        borderTopWidth:10,
                        borderLeftColor: "transparent",
                        borderRightColor: "transparent",
                        borderTopColor: "#70707B",
                    },
                    container:{
                        backgroundColor:'#f0f0ff'
                    }
                }}
                animationType='slide'
                
            >
            
                <View style={{ flex: 100 }}>
                    <Text style={{
                        color:'#70707B',
                        fontSize:16,
                        fontWeight:'bold',
                        padding:5,
                        textAlign:'center',
                        borderBottomWidth:.2,
                        borderBottomColor:'#70707B'
                    }}>
                        Patient Prescription
                    </Text>
                    
                    <View style={{flex:1,height:'100%'}}>
                        <NavigationContainer independent={true} >
                            <PrescriptionTab.Navigator
                                
                                screenOptions={{
                                    tabBarLabelStyle: { fontSize: 12, fontWeight:'bold' },
                                    // tabBarItemStyle: { width: 100 },
                                    tabBarActiveTintColor:'#3AAD94',
                                    tabBarInactiveTintColor:'#ccc',
                                    tabBarScrollEnabled:true,
                                    tabBarIndicatorStyle:{backgroundColor:'#3AAD94'},
                                    
                                    
                                }}
                                style={{height:400,backgroundColor:'#3AAD94'}}
                            >
                                <PrescriptionTab.Screen 
                                    name="PatientsProblem" 
                                    component={PatientsProblem} 
                                    options={{ 
                                        tabBarLabel:'Problems',
                                        tabBarIcon: ({ color, focused }) => (
                                            <Ionicons name="ios-warning" size={24} color={color} />
                                        ),
                                    }} 
                                />
                                
                                <PrescriptionTab.Screen 
                                    name="PatientsSuggestions" 
                                    component={PatientsSuggestions} 
                                    options={{ 
                                        tabBarLabel:'Suggestions',
                                        tabBarIcon: ({ color, focused }) => (
                                            <MaterialIcons name="speaker-notes" size={24} color={color} />
                                        ),
                                    }} 
                                />
                                
                                <PrescriptionTab.Screen 
                                    name="PatientsMedications" 
                                    component={PatientsMedications} 
                                    options={{ 
                                        tabBarLabel:'Medications',
                                        tabBarIcon:({color, focused}) => (
                                            <AntDesign name="medicinebox" size={24} color={color} />
                                        )
                                    }} 
                                />
                                
                                <PrescriptionTab.Screen 
                                    name="PatientsTests" 
                                    component={PatientsTests} 
                                    options={{ 
                                        tabBarLabel:'Tests',
                                        tabBarIcon:({color, focused}) => (
                                            <MaterialCommunityIcons name="test-tube" size={24} color={color} />
                                        )
                                    }} 
                                />
                                
                                <PrescriptionTab.Screen 
                                    name="PrescriptionPreview" 
                                    component={PrescriptionPreview} 
                                    options={{ 
                                        tabBarLabel:'Preview Prescription',
                                        tabBarIcon:({color, focused}) => (
                                            <Fontisto name="preview" size={24}  color={color} />
                                        )
                                    }} 
                                />

                            </PrescriptionTab.Navigator>
                        </NavigationContainer>
                    </View>

                </View>

                <View style={{ flex: 1 }}>
                    {/* <Button title="Save" onPress={() => { saveData() }} /> */}
                </View>

            </RBSheet>
        </View>
    )
}
