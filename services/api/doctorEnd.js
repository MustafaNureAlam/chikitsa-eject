
import config from '../config';
import token from '../local_storage/storage';



async function getDoctorEndAppointmentData(){

    
    let user_token = await token.getItem("token");
    // console.log('doctor_token=======',user_token);

    var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6IjAxNjg5NTc2OTEwIiwidXNlcklkIjoyLCJpYXQiOjE2NDM0NTUwNTV9.U0kYWrEQeRJSt70hnLuVXukXXuvwE-XqAgEc7PSmdn8" );
    myHeaders.append("Authorization", "Bearer " + user_token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let doctor_response = [];

    await fetch( config.baseUrl + "doctor/upcoming_appointments", requestOptions)
    .then(response => response.text())
    .then(result => {
        
        doctor_response = JSON.parse(result)
        // console.log('======doctorEnd Appoint data',result);
    })
    .catch(error => console.log('error', error));

    return doctor_response;
}

async function getDoctorProfile() {
    
    let user_token = await token.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let doctor_profile = [];

    await fetch(config.baseUrl + "doctor/doctor_user", requestOptions)
    .then(response => response.text())
    .then(result => {
        doctor_profile = JSON.parse(result);
        // console.log('doctor_profile',doctor_profile)

    })
    .catch(error => console.log('error', error));

    return doctor_profile;
}

async function createRoom(appointment_id) {
    let user_token = await token.getItem("token");
    
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let room = [];

    await fetch(config.baseUrl + "doctor/create_room/"+appointment_id, requestOptions)
        .then(response => response.text())
        .then(result => {
            room = JSON.parse(result);
        })
        .catch(error => console.log('error', error));

    return room;
}

    


module.exports = {
    getDoctorEndAppointmentData: getDoctorEndAppointmentData,
    getDoctorProfile: getDoctorProfile,
    createRoom: createRoom,
};