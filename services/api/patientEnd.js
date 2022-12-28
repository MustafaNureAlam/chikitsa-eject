
import config from '../config';
import token from '../local_storage/storage';


async function concern(){

    
    let user_token = await token.getItem("token");
    // console.log('ttt',user_token); 

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);

    // console.log('myHeader........................',myHeaders);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let response = []
    await fetch( config.baseUrl + "concern/all", requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result)
            response = JSON.parse(result)
        })
        .catch(error => console.log('error', error));

    return response;
}

async function nurse_concern(){

    
    let user_token = await token.getItem("token");
    // console.log('ttt',user_token); 

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);

    // console.log('myHeader........................',myHeaders);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let response = []
    await fetch( config.baseUrl + "concern/nurse", requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result)
            response = JSON.parse(result)
        })
        .catch(error => console.log('error', error));

    return response;
}


async function speciality(){

    
    let user_token = await token.getItem("token");
    // console.log('ttt',user_token); 

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);

    // console.log('myHeader........................',myHeaders);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let response = []
    await fetch( config.baseUrl + "specialization/all", requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result)
            response = JSON.parse(result)
        })
        .catch(error => console.log('error', error));

    return response;
}

async function nurse_speciality(){

    
    let user_token = await token.getItem("token");
    // console.log('ttt',user_token); 

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);

    // console.log('myHeader........................',myHeaders);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let response = []
    await fetch( config.baseUrl + "specialization/nurse", requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result)
            response = JSON.parse(result)
        })
        .catch(error => console.log('error', error));

    return response;
}


async function doctorByConcern(concernId){

    
    let user_token = await token.getItem("token");
    // console.log('response_id',concernId);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let response = []
    await fetch( config.baseUrl + "concern_by_doctors/" + concernId, requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result)
            response = JSON.parse(result)
        })
        .catch(error => console.log('error', error));

    return response;
}

async function getNurseByConcern(concernId){

    
    let user_token = await token.getItem("token");
    console.log('response_id',concernId);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let response = []
    await fetch( config.baseUrl + "concern_by_nurses/" + concernId, requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log('================resulkt',result)
            response = JSON.parse(result)
        })
        .catch(error => console.log('error', error));

    return response;
}


async function getDoctorBySpeciality(concernId, signal){

    
    let user_token = await token.getItem("token");
    // console.log('response_id',concernId);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let response = []
    await fetch( config.baseUrl + "specialization_by_doctors/" + concernId, requestOptions, signal)
        .then(response => response.text())
        .then(result => {
            // console.log('doctorByspeciality===========',result)
            response = JSON.parse(result)
        })
        .catch(error => console.log('error', error));

    return response;
}


async function getNurseBySpeciality(concernId){

    
    let user_token = await token.getItem("token");
    // console.log('response_id',concernId);

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    let response = []
    await fetch( config.baseUrl + "specialization_by_nurses/" + concernId, requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result)
            response = JSON.parse(result)
        })
        .catch(error => console.log('error', error));

    return response;
}


async function getAppointmentData(){

    
    let user_token = await token.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+user_token);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    await fetch( config.baseUrl + "my_upcoming_doctor_appointments/", requestOptions)
    .then(response => response.text())
    .then(result => {
        console.log(result)
    })
    .catch(error => console.log('error', error));

    return response;
}

async function doctorSchedule(doctor_appoint_props) {

    // console.log('doctor_appoint_props', doctor_appoint_props);
    let user_token = await token.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "doctor_user_id": doctor_appoint_props?.doctor_user_id,
        "day": doctor_appoint_props?.appointment_date
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let schedule_data_array = [];

    await fetch( config.baseUrl + "get_doctor_slots/", requestOptions)
    .then(response => response.text())
    .then(result => {
        schedule_data_array = JSON.parse(result)
        // console.log('===========fsffsfsfs=====',schedule_data_array)
    })
    .catch(error => console.log('error', error));

    return schedule_data_array;
}

async function getAvailableTimeStartFrom(data) {

    // console.log('doctor_appoint_props', doctor_appoint_props);
    let user_token = await token.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let schedule_data_array = [];

    await fetch( config.baseUrl + "get-available-time-start-from/", requestOptions)
    .then(response => response.text())
    .then(result => {
        schedule_data_array = JSON.parse(result)
        // console.log('===========fsffsfsfs=====',schedule_data_array)
    })
    .catch(error => console.log('error', error));

    return schedule_data_array;
}


async function nurseSchedule(nurse_props) {

    // console.log('nurse_props', nurse_props);
    let user_token = await token.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "nurse_user_id": nurse_props?.doctor_user_id,
    "day": nurse_props?.appointment_date
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    let schedule_data_array = [];

    await fetch( config.baseUrl + "get_nurse_slots/", requestOptions)
    .then(response => response.text())
    .then(result => {
        schedule_data_array = JSON.parse(result)
        // console.log('===========fsffsfsfs=====',schedule_data_array)
    })
    .catch(error => console.log('error', error));

    return schedule_data_array;
}


async function getPatientProfile(signal) {
    
    let user_token = await token.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    let patient_profile = [];

    await fetch(config.baseUrl + "patient_profile", requestOptions, signal)
    .then(response => response.text())
    .then(result => {
        patient_profile = JSON.parse(result);
        // console.log('patient_profile',patient_profile)

    })
    .catch(error => {
        if (error.name == 'AbortError') {
            console.log('request was cancelled');
        }
        console.log('error', error)
    });

    return patient_profile;
}


async function joinRoom(appointment_id, signal){

    let user_token = await token.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+ user_token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let doc_room = []
    await fetch(config.baseUrl+"patient/join_room/"+appointment_id, requestOptions, signal)
        .then(response => response.text())
        .then(result => {
            doc_room = JSON.parse(result)
        })
        .catch(error => {
            if (error.name == 'AbortError') {
                console.log('request was cancelled');
            }
            console.log('error', error)
        });

    return doc_room;
}
    


module.exports = {
    concern : concern,
    nurse_concern : nurse_concern,
    speciality : speciality,
    nurse_speciality : nurse_speciality,
    doctorByConcern : doctorByConcern,
    getDoctorBySpeciality : getDoctorBySpeciality,
    doctorSchedule : doctorSchedule,
    getAvailableTimeStartFrom : getAvailableTimeStartFrom,
    getAppointmentData : getAppointmentData,
    getPatientProfile : getPatientProfile,
    joinRoom : joinRoom,
    getNurseByConcern : getNurseByConcern,
    getNurseBySpeciality : getNurseBySpeciality,
    nurseSchedule : nurseSchedule
};