import config from "../config";
import * as Storage from '../local_storage/storage';
// import firebase from '../../firebase';
import {Alert} from 'react-native';

async function SendVarificationCode(phoneNumber) {
    // let response = []
    // const phoneProvider = new firebase.auth.PhoneAuthProvider();
    // await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier).then((result) => {
        
    //     response = {
    //         result: result,
    //         phonecode: phoneNumber,
    //         code: 200
    //     };
        
    // }).catch(err => {
    //     alert(err)
    // });
    
    // return response;


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    let user_data =  await Storage.getItem('user_res');
    let data_from_local = JSON.parse(user_data);
    
    Storage.save('user_role', data_from_local.user_type)
    
    var raw = JSON.stringify({ 
        phone: phoneNumber, 
        user_type: data_from_local.user_type, 
        userId: data_from_local.userId 
    })

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };
    
    let api_response = []
    let api_res = []
    // "phone": phoneNumber.slice(3),
    // "userType": data_from_local.user_type,
    // "userId": data_from_local.userId,
    // "user_role": data_from_local.user_role,
    // "otp_code":code
    await fetch(config.baseUrl+"otp-resend", requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
            api_response = JSON.parse(result)
            api_res.push(api_response);
            
            if(api_response.code == 404) {
                Alert.alert(
                    "Not valid!",
                    "The OTP you used is not valid!",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
        })
        .catch((error) => console.log("error --otp-verify", error));
    return api_res;
}

async function MatchVarificationCode(result, code, phoneNumber, user_type) {

    let api_res = [];
    // const credential = firebase.auth.PhoneAuthProvider.credential(result, code);
    
    // await firebase.auth().signInWithCredential(credential)
    //     .then(async (result) => {
    //         api_res = await BackendLogin(phoneNumber, user_type);
    //     })
    //     .catch((err) => {
    //         alert(err);
    //     });
    let user_data =  await Storage.getItem('user_res');
    let data_from_local = JSON.parse(user_data);
    console.log('data',data_from_local)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // let phone_number = mobile_number.slice(3);
    var raw = JSON.stringify({
        "phone": phoneNumber.slice(3),
        "userType": data_from_local.user_type,
        "userId": data_from_local.userId,
        "user_role": data_from_local.user_role,
        "otp_code":code
    });

    // console.log('raw',raw)

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };
    
    let api_response = []
    
    await fetch(config.baseUrl+"otp-verify", requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
            api_response = JSON.parse(result)
            // console.log('6666666666666666666666666666666666',api_response);
            api_res.push(api_response);
            if(api_response.code == 200){
                console.log('success-----------------')
                await Storage.save('token', api_response.token)
                await Storage.save('user_id', api_response.user_id)
            }
            if(api_response.code == 404) {
                Alert.alert(
                    "Not valid!",
                    "The OTP you used is not valid!",
                    [
                    //   {
                    //     text: "Cancel",
                    //     onPress: () => console.log("Cancel Pressed"),
                    //     style: "cancel"
                    //   },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            }
            // if(api_response.user_role === "doctor") {
                // await Storage.save('user_role', "doctor")
            // }
            // const id = api_response?.user_id.toString()
            
            // console.log('login_response',api_response);
        })
        .catch((error) => console.log("error --otp-verify", error));


    return api_res;
}

async function BackendLogin(mobile_number, user_type) {
    let phone_number = mobile_number.slice(3);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ phone: phone_number, user_type: user_type });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };
    
    let api_response = []
    console.log('login_response',raw);
    
    await fetch(config.baseUrl+"login_api_new", requestOptions)
        .then((response) => response.text())
        .then(async (result) => {
            api_response = JSON.parse(result)

            // if(api_response.user_role === "doctor") {
                // await Storage.save('user_role', "doctor")
            // }
            // const id = api_response.user_id.toString()
            // await Storage.save('token', api_response.token)
            // await Storage.save('user_id', id)
            await Storage.save('user_res', result)
            console.log('backend-------------',api_response);
        })
        .catch((error) => console.log("error --login_api_new", error));


    return api_response;
}

module.exports = {
    SendVarificationCode: SendVarificationCode,
    MatchVarificationCode: MatchVarificationCode,
    BackendLogin: BackendLogin,
};