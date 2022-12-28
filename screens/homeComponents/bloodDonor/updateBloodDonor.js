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



    async function DataPost(){
        console.log("questionOne"+questionOne)
        console.log("answerOne"+answerOne)

        let data = {
            questionOne: questionOne,
            answerOne: answerOne,
            questionTwo: questionTwo,
            answerTwo: answerTwo,
            questionThree: questionThree,
            answerThree: answerThree,
            questionFour: questionFour,
            answerFour: answerFour,
            questionFive: questionFive,
            answerFive: answerFive,
            questionSix: questionSix,
            answerSix: answerSix,
            questionSeven: questionSeven,
            answerSeven: answerSeven,
            questionEight: questionEight,
            answerEight: answerEight,
            questionNine: questionNine,
            answerNine: answerNine,
            questionTen: questionTen,
            answerTen: answerTen,
            questionEleven: questionEleven,
            answerEleven: answerEleven,
            questionTwelve: questionTwelve,
            answerTwelve: answerTwelve,
            questionThirteen: questionThirteen,
            answerThirteen: answerThirteen,
            questionFourteen: questionFourteen,
            answerFourteen: answerFourteen,
            questionFifteen: questionFifteen,
            answerFifteen: answerFifteen,
            questionSixteen: questionSixteen,
            answerSixteen: answerSixteen,
            questionSeventeen: questionSeventeen,
            answerSeventeen: answerSeventeen,
            questionEighteen: questionEighteen,
            answerEighteen: answerEighteen,
            questionNinteen: questionNinteen,
            answerNinteen: answerNinteen,
            questionTwenty: questionTwenty,
            answerTwenty: answerTwenty,
        }

        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ answer: JSON.stringify(data) });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        
        // let api_response = []
        
        await fetch( config.baseUrl + "blood_donor/question_answer_store", requestOptions)
            .then((response) => response.text())
            .then(async (result) => {
                console.log(JSON.parse(result))
                navigation.navigate('BloodDonorStack', {screen: 'BloodDonorScreen'})
            })
            .catch((error) => console.log("error", error));
        // question_answer_store/all
    }
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

        let user_token = await token.getItem("token");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        await fetch( config.baseUrl +  "blood_donor/question/all", requestOptions)
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
                                        marginVertical:2
                                    }}>

                                        {
                                            index === 0 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionOne(item.questions)
                                                                setAnswerOne(text)
                                                                // setQuestionData((text) => ({text, text}))
                                                                // console.log('text',text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }

                                        {
                                            index === 1 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionTwo(item.questions)
                                                                setAnswerTwo(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }

                                        {
                                            index === 2 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionThree(item.questions)
                                                                setAnswerThree(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }

                                        {
                                            index === 3 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionFour(item.questions)
                                                                setAnswerFour(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }

                                        {
                                            index === 4 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionFive(item.questions)
                                                                setAnswerFive(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }


                                        {
                                            index === 5 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionSix(item.questions)
                                                                setAnswerSix(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }


                                        {
                                            index === 6 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionSeven(item.questions)
                                                                setAnswerSeven(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }


                                        {
                                            index === 7 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionEight(item.questions)
                                                                setAnswerEight(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }


                                        {
                                            index === 8 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionNine(item.questions)
                                                                setAnswerNine(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }

                                        {
                                            index === 9 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionTen(item.questions)
                                                                setAnswerTen(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }


                                        {
                                            index === 10 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionEleven(item.questions)
                                                                setAnswerEleven(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }

{
                                            index === 11 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionTwelve(item.questions)
                                                                setAnswerTwelve(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }

                                        {
                                            index === 12 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionThirteen(item.questions)
                                                                setAnswerThirteen(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }

                                        {
                                            index === 13 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionFourteen(item.questions)
                                                                setAnswerFourteen(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }

                                        {
                                            index === 14 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionFifteen(item.questions)
                                                                setAnswerFifteen(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }

                                        {
                                            index === 15 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionSixteen(item.questions)
                                                                setAnswerSixteen(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }


                                        {
                                            index === 16 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionSeventeen(item.questions)
                                                                setAnswerSeventeen(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }


                                        {
                                            index === 17 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionEighteen(item.questions)
                                                                setAnswerEighteen(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }


                                        {
                                            index === 18 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionNinteen(item.questions)
                                                                setAnswerNinteen(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }


                                        {
                                            index === 19 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionTwenty(item.questions)
                                                                setAnswerTwenty(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }
{/* 
                                        {
                                            index === 20 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionOne(item.questions)
                                                                setAnswerOne(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        }


                                        {
                                            index === 21 && (
                                                <View>
                                                    <Text style={{
                                                        fontSize:16,
                                                        fontWeight:'bold'
                                                    }}>
                                                        {index + 1} {item.questions}
                                                    </Text>
            
                                                    
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
                                                                setQuestionOne(item.questions)
                                                                setAnswerOne(text)
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                                
                                            )
                                        } */}
                                        

                                    </View>
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
