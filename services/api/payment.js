
import config from '../config';
import token from '../local_storage/storage';


async function getUserLocation() {

    let user_token = await token.getItem("token");
    var myHeaders = new Headers();

    myHeaders.append("Authorization", "Bearer " + user_token);
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let location_data = [];

    await fetch( config.baseUrl + "location/my_locations", requestOptions)
    .then(response => response.text())
    .then(result => {
        location_data = JSON.parse(result);
        location_data.push(location_data)
    })
    .catch(error => {
        console.log('error', error)
        location_data.push(error)

    });

    return location_data;
}

async function make_payment(){
    let user_token = await token.getItem("token");
    var myHeaders = new Headers();
    
    myHeaders.append("Authorization", "Bearer " + user_token);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "total_amount": "2923",
        "trans_id": "order_id",
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    let payment_data = []
    await fetch(config.baseUrl + "doctor/payment", requestOptions)
    .then(response => response.text())
    .then(async(result) => {
        let api_response = JSON.parse(result)
        console.log("api_response")
        console.log(api_response)
        if(api_response.code == 200 && (api_response.session_url)){
            // setWebRedirect(true)
            // setGetwayURL(api_response.session_url);
            payment_data.push(api_response.session_url)
        }
        console.log("api_response")
        // setIsPay(true);
        // await WebBrowser.openBrowserAsync(api_response.session_url);
        // setGetwayURL(api_response.session_url);
    })
    .catch(error => console.log('error', error));
}

module.exports = {
    getUserLocation: getUserLocation,
};