
import config from '../config';
import token from '../local_storage/storage';


async function concern(){

    let user_token = await token.getItem("token");

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + user_token);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    
    let response = []
    await fetch( config.baseUrl + "/concern/all", requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result)
            response = JSON.parse(result)
        })
        .catch(error => console.log('error', error));

    return response;
}

module.exports = {
    concern: concern,
};