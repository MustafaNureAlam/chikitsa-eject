
import config from '../config';
import token from '../local_storage/storage';

async function requestStore(data_obj) {

    // console.log('nurse_props', nurse_props);
    let user_token = await token.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);
    myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify(data_obj);
    console.log("raw")
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: data_obj,
        redirect: 'follow'
    };

    let request = [];
    console.log(requestOptions)

    await fetch(config.baseUrl + "/blood_donor/request/add", requestOptions)
    .then(response => response.text())
    .then(result => {
        request = JSON.parse(result)
        console.log('===========fsffsfsfs=====',request)
    })
    .catch(error => console.log(error));

    return request;
}

async function getRequests(appointment_id){

    let user_token = await token.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer "+ user_token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let doc_room = []
    await fetch(config.baseUrl+"patient/join_room/"+appointment_id, requestOptions)
        .then(response => response.text())
        .then(result => {
            doc_room = JSON.parse(result)
            console.log("doc_room")
            console.log(doc_room)
            console.log("doc_room")
        })
        .catch(error => console.log('error', error));

    return doc_room;
}
    


module.exports = {
    getRequests : getRequests,
    requestStore : requestStore
};