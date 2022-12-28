import config from '../config';
import token from '../local_storage/storage';

async function mySavedLocation() {

    let user_token = await token.getItem("token");
    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + user_token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let room = [];

    await fetch( config.baseUrl + "location/my_locations", requestOptions)
        .then(response => response.text())
        .then(result => {
            room = JSON.parse(result);
        })
        .catch(error => console.log('error', error));
    
    return room;
}

    


module.exports = {
    mySavedLocation: mySavedLocation,
};