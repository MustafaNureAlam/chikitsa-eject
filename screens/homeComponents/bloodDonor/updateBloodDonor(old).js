import React, {useState, useEffect,useCallback} from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    StyleSheet
} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RadioButtonRN from 'radio-buttons-react-native';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import token from '../../../services/local_storage/storage';
import Loader from '../../modules/loader';
import config from '../../../services/config';

import { radioBtnView } from './components/inputOptions';



function Item({ id, title, selected, onSelect }) {
    return (
      <TouchableOpacity
        onPress={() => onSelect(id)}
        style={[
          styles.item,
          { backgroundColor: selected ? '#3AAD94' : '#fff' },
        ]}
      >
        <Text style={[styles.title,{color: selected ? '#fff' : '#000'}]}>{title}</Text>
      </TouchableOpacity>
    );
  }

export default function UpdateBloodDonorScreen({navigation}) {

    const [image, setImage] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date_select, setDate] = useState(undefined);
    const [selected, setSelected] = React.useState(new Map());
    const [donor_data, setDonorData] = useState(null);
    const [is_loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    const [questions, setQuestionData] = useState("");
    

    // Question Ans Answer Hook. Hack for now.
    const [questionOne, setQuestionOne] = useState("");
    const [answerOne, setAnswerOne] = useState("");
    const [questionTwo, setQuestionTwo] = useState("");
    const [answerTwo, setAnswerTwo] = useState("");
    const [questionThree, setQuestionThree] = useState("");
    const [answerThree, setAnswerThree] = useState("");
    const [questionFour, setQuestionFour] = useState("");
    const [answerFour, setAnswerFour] = useState("");
    const [questionFive, setQuestionFive] = useState("");
    const [answerFive, setAnswerFive] = useState("");
    const [questionSix, setQuestionSix] = useState("");
    const [answerSix, setAnswerSix] = useState("");
    const [questionSeven, setQuestionSeven] = useState("");
    const [answerSeven, setAnswerSeven] = useState("");
    const [questionEight, setQuestionEight] = useState("");
    const [answerEight, setAnswerEight] = useState("");
    const [questionNine, setQuestionNine] = useState("");
    const [answerNine, setAnswerNine] = useState("");
    const [questionTen, setQuestionTen] = useState("");
    const [answerTen, setAnswerTen] = useState("");
    const [questionEleven, setQuestionEleven] = useState("");
    const [answerEleven, setAnswerEleven] = useState("");
    const [questionTwelve, setQuestionTwelve] = useState("");
    const [answerTwelve, setAnswerTwelve] = useState("");
    const [questionThirteen, setQuestionThirteen] = useState("");
    const [answerThirteen, setAnswerThirteen] = useState("");
    const [questionFourteen, setQuestionFourteen] = useState("");
    const [answerFourteen, setAnswerFourteen] = useState("");
    const [questionFifteen, setQuestionFifteen] = useState("");
    const [answerFifteen, setAnswerFifteen] = useState("");
    const [questionSixteen, setQuestionSixteen] = useState("");
    const [answerSixteen, setAnswerSixteen] = useState("");
    const [questionSeventeen, setQuestionSeventeen] = useState("");
    const [answerSeventeen, setAnswerSeventeen] = useState("");
    const [questionEighteen, setQuestionEighteen] = useState("");
    const [answerEighteen, setAnswerEighteen] = useState("");
    const [questionNinteen, setQuestionNinteen] = useState("");
    const [answerNinteen, setAnswerNinteen] = useState("");
    const [questionTwenty, setQuestionTwenty] = useState("");
    const [answerTwenty, setAnswerTwenty] = useState("");
    // End Question Hook.




    const onSelect = React.useCallback(
        id => {
        const newSelected = new Map(selected);
        newSelected.set(id, !selected.get(id));

        setSelected(newSelected);
        console.log('selected',newSelected)
        },
        [selected],
    );

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        var newstr = date.toString();
        // console.log('str',newstr)

        var newdate = newstr.substr(4, 12);
        // console.log("new"+ newdate);
        // setDate(date)
        setDate(newdate);
        console.log("A date has been picked=========: ", date);
        hideDatePicker();
    };

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


    async function getDonorData() {
        // for (let i = 0; i < 5; i++) {
        //     const [s, i] = useState(i);
        // }
        // console.log("=================================================================")
        // console.log("ssss"+s)
        let user_token = await token.getItem("token");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch( config.baseUrl + "blood_donor/question/all", requestOptions)
        .then(response => response.text())
        .then(result => {
            let api_response = JSON.parse(result);
            
            setDonorData(api_response);
            console.log('api_response', api_response?.data);
            

        })
        .catch(error => console.log('error', error));
    }


    useEffect(() => {
        getDonorData()
        setLoading(false);
        // return () => {
        //     cleanup
        // }
    }, [])

    // function onPress(item){
    //     let old_data = data;
    //     old_data.push(item);
    //     setData(old_data)
    // }

    function DataPost(data){
        
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#fff'}}>
            <StatusBar backgroundColor={'#075141'} />
            {
                is_loading ? (
                    <Loader/>
                ) : (
                    <View>
                        <FlatList
                            data={donor_data?.data}
                            renderItem={({item, index}) => (
                                <View>
                                    <View style={{
                                        marginHorizontal: 20,
                                        marginVertical:20
                                    }}>
                                        <Text style={{
                                            fontSize:16,
                                            fontWeight:'bold'
                                        }}>{index + 1} {item.questions}</Text>

                                        {
                                            item?.ans_excepted_by === 'text' && (
                                                <View style={{
                                                    marginVertical:10
                                                }}>
                                                    <TextInput 
                                                        placeholder='sample'
                                                        style={{
                                                            paddingVertical:7,
                                                            paddingHorizontal:10,
                                                            borderWidth:.3,
                                                            borderRadius:5
                                                        }}
                                                        onChangeText={(text) => {
                                                            setQuestionData((text) => ({text, text}))
                                                            console.log('text',text)
                                                        }}
                                                    />
                                                </View>
                                            )
                                        }

                                        {
                                            item?.ans_excepted_by === 'radio_btn' && (
                                                <View>
                                                    <RadioButtonRN
                                                        data={[
                                                            {
                                                                label: 'Yes'
                                                            },
                                                            {
                                                                label: 'No'
                                                            }
                                                        ]}
                                                        // key={count}
                                                        // initial={initVal}
                                                        selectedBtn={(e) => setQuestionData(e)}
                                                        activeColor="#3AAD94"
                                                        icon={<Ionicons name="checkmark-circle" size={25} color="#3AAD94" />}
                                                    />
                                                </View>
                                                // {radioBtnView}
                                            )
                                        }

                                        <View style={{ }}>

                                            
                                            
                                            {/* <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                                                
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
                                                    <Text style={{ color: "#000",fontWeight:'bold' }}>Upload</Text>
                                                </TouchableOpacity>
                                                {image && <Image source={{ uri: image }} style={{ width: 50, height: 50, borderRadius: 25 }} />}
                                            </View> */}

                                            

                                            {/* <View>
                                                <TouchableOpacity 
                                                    style={{
                                                        borderWidth:.3,
                                                        paddingHorizontal:10,
                                                        paddingVertical:10,
                                                        borderRadius:5,
                                                        borderColor:'#707070',
                                                        marginVertical:10
                                                    }}
                                                    onPress={showDatePicker}
                                                >
                                                    <Text style={{
                                                        color:'#707070',
                                                        fontSize:16,
                                                        fontWeight:'500'
                                                    }}>
                                                        {date_select ? date_select : 'select date'}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View> */}

                                            {/* <View>
                                                <FlatList
                                                    data={DATA}
                                                    renderItem={({ item }) => (
                                                    <Item
                                                        id={item.id}
                                                        title={item.title}
                                                        selected={!!selected.get(item.id)}
                                                        onSelect={onSelect}
                                                    />
                                                    )}
                                                    keyExtractor={item => item.id}
                                                    extraData={selected}
                                                    horizontal={true}
                                                    
                                                />
                                            </View> */}

                                        </View>
                                    </View>

                                    {/* <View>
                                        <DateTimePickerModal
                                            isVisible={isDatePickerVisible}
                                            mode="date"
                                            onConfirm={handleConfirm}
                                            onCancel={hideDatePicker}
                                        />
                                    </View> */}
                                </View>
                            )}
                            keyExtractor={(item, index) => index.toString()}
                            
                            ListFooterComponent={
                                
                                <View style={{
                                    marginHorizontal:20
                                }}>
                                    <TouchableOpacity 
                                        style={{
                                            backgroundColor:'#3AAD94',
                                            borderRadius:100/2,
                                            paddingVertical:10,
                                            paddingHorizontal:20
                                        }}

                                        onPress={() => {
                                            DataPost()
                                        }}
                                    >
                                        <Text style={{
                                            fontSize:14,
                                            fontWeight:'bold',
                                            color:'#fff',
                                            textAlign:'center'
                                        }}>Submit</Text>
                                    </TouchableOpacity>
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
    // container: {
    //   flex: 1,
    //   marginTop: Constants.statusBarHeight,
    // },
    item: {
      backgroundColor: '#f9c2ff',
      padding: 10,
      marginVertical: 8,
      marginHorizontal: 5,
      borderRadius:5, 
      borderWidth: .5, 
      borderColor:'#3AAD94'
    },
    title: {
      fontSize: 14,
      fontWeight:'bold'
    },
  });
