
import React, {useEffect, useCallback, useState, useRef} from 'react'
import { 
    View, 
    Text,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    TextInput,
    ScrollView,
    StatusBar,
    Image,
    ImageBackground,
    Linking
} from 'react-native';
import foodDrinks from '../../../assets/foodDrinks.png';
import medecineAcc from '../../../assets/medicineAcc.png';
import medecinebottle from '../../../assets/medicine-bottle-fharmacy.png';
import fifillBg from '../../../assets/rifillBg.png';
import pharmacyImg from '../../../assets/farmImg.png';
import bbcBg from '../../../assets/bbcImg.png';
import { Avatar } from 'react-native-paper';
import { 
    Ionicons,
    AntDesign,
    MaterialIcons,
    Feather
  } from '@expo/vector-icons';
import token from '../../../services/local_storage/storage';
import config from '../../../services/config';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../modules/loader';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import {debounce} from 'lodash';
import * as Storage from '../../../services/local_storage/storage';


const DATA_ARRAY = [
    {
        "baby": [
            {
                "medicine_id": 1,
                "medicine_name": "Gemolol",
                "medicine_type": "Ophthalmic Solution",
                "prescription_required": 1,
                "medicine_power": "0.5%",
                "price": "70.21",
                "category": "baby",
                "manufactured_by": {
                    "id": 20,
                    "name": "General Pharmaceuticals Ltd.",
                    "createdAt": "2022-10-01T10:57:28.000Z",
                    "updatedAt": "2022-10-01T10:57:28.000Z"
                },
                "pharmacy": {
                    "id": 1,
                    "pharmacy_user_id": 1,
                    "name": "New Model Pharmacy",
                    "image": null,
                    "location_id": 1,
                    "status": 1,
                    "current_rating": null,
                    "sentiment": null,
                    "address": null,
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": null,
                    "createdAt": "2022-07-31T16:02:45.000Z",
                    "updatedAt": "2022-07-31T16:02:45.000Z"
                }
            },
            {
                "medicine_id": 2,
                "medicine_name": "Candela ",
                "medicine_type": "Shampoo",
                "prescription_required": 1,
                "medicine_power": "1%",
                "price": "350.00",
                "category": "baby",
                "manufactured_by": {
                    "id": 6,
                    "name": "Incepta Pharmaceuticals Ltd.",
                    "createdAt": "2022-06-26T12:42:30.000Z",
                    "updatedAt": "2022-06-26T12:42:30.000Z"
                },
                "pharmacy": {
                    "id": 1,
                    "pharmacy_user_id": 1,
                    "name": "New Model Pharmacy",
                    "image": null,
                    "location_id": 1,
                    "status": 1,
                    "current_rating": null,
                    "sentiment": null,
                    "address": null,
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": null,
                    "createdAt": "2022-07-31T16:02:45.000Z",
                    "updatedAt": "2022-07-31T16:02:45.000Z"
                }
            }
        ]
    },
    {
        "skin": [
            {
                "medicine_id": 3,
                "medicine_name": "Dialyte-B ",
                "medicine_type": "Dialysis Solution",
                "prescription_required": 1,
                "medicine_power": "",
                "price": "411.50",
                "category": "skin",
                "manufactured_by": {
                    "id": 22,
                    "name": "Popular Pharmaceuticals Ltd.",
                    "createdAt": "2022-10-01T10:57:32.000Z",
                    "updatedAt": "2022-10-01T10:57:32.000Z"
                },
                "pharmacy": {
                    "id": 1,
                    "pharmacy_user_id": 1,
                    "name": "New Model Pharmacy",
                    "image": null,
                    "location_id": 1,
                    "status": 1,
                    "current_rating": null,
                    "sentiment": null,
                    "address": null,
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": null,
                    "createdAt": "2022-07-31T16:02:45.000Z",
                    "updatedAt": "2022-07-31T16:02:45.000Z"
                }
            }
        ]
    },
    {
        "eye": [
            {
                "medicine_id": 4,
                "medicine_name": "Nab-Xelpac ",
                "medicine_type": "IV Infusion",
                "prescription_required": 1,
                "medicine_power": "100 mg/vial",
                "price": "25,000.00",
                "category": "eye",
                "manufactured_by": {
                    "id": 5,
                    "name": "Beacon Pharmaceuticals Ltd.",
                    "createdAt": "2022-06-26T12:42:21.000Z",
                    "updatedAt": "2022-06-26T12:42:21.000Z"
                },
                "pharmacy": {
                    "id": 1,
                    "pharmacy_user_id": 1,
                    "name": "New Model Pharmacy",
                    "image": null,
                    "location_id": 1,
                    "status": 1,
                    "current_rating": null,
                    "sentiment": null,
                    "address": null,
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": null,
                    "createdAt": "2022-07-31T16:02:45.000Z",
                    "updatedAt": "2022-07-31T16:02:45.000Z"
                }
            },
            {
                "medicine_id": 4,
                "medicine_name": "Nab-Xelpac ",
                "medicine_type": "IV Infusion",
                "prescription_required": 1,
                "medicine_power": "100 mg/vial",
                "price": "25,000.00",
                "category": "eye",
                "manufactured_by": {
                    "id": 5,
                    "name": "Beacon Pharmaceuticals Ltd.",
                    "createdAt": "2022-06-26T12:42:21.000Z",
                    "updatedAt": "2022-06-26T12:42:21.000Z"
                },
                "pharmacy": {
                    "id": 22,
                    "pharmacy_user_id": 53,
                    "name": "Akij Pharmacy",
                    "image": null,
                    "location_id": null,
                    "status": null,
                    "current_rating": null,
                    "sentiment": null,
                    "address": "Mirpur-12, Dhaka",
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": 2,
                    "createdAt": "2022-11-10T12:51:57.000Z",
                    "updatedAt": "2022-11-10T12:51:57.000Z"
                }
            }
        ]
    },
    {
        "nose": [
            {
                "medicine_id": 5,
                "medicine_name": "Activit Silver ",
                "medicine_type": "Tablet",
                "prescription_required": 1,
                "medicine_power": "",
                "price": "7.00",
                "category": null,
                "manufactured_by": {
                    "id": 34,
                    "name": "Delta Pharma Ltd.",
                    "createdAt": "2022-10-20T10:02:01.000Z",
                    "updatedAt": "2022-10-20T10:02:01.000Z"
                },
                "pharmacy": {
                    "id": 1,
                    "pharmacy_user_id": 1,
                    "name": "New Model Pharmacy",
                    "image": null,
                    "location_id": 1,
                    "status": 1,
                    "current_rating": null,
                    "sentiment": null,
                    "address": null,
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": null,
                    "createdAt": "2022-07-31T16:02:45.000Z",
                    "updatedAt": "2022-07-31T16:02:45.000Z"
                }
            },
            {
                "medicine_id": 6,
                "medicine_name": "Arofrez ",
                "medicine_type": "Tablet",
                "prescription_required": 1,
                "medicine_power": "2.5 mg",
                "price": "40.00",
                "category": null,
                "manufactured_by": {
                    "id": 35,
                    "name": "Healthcare Pharmaceuticals Ltd.",
                    "createdAt": "2022-10-20T10:02:02.000Z",
                    "updatedAt": "2022-10-20T10:02:02.000Z"
                },
                "pharmacy": {
                    "id": 1,
                    "pharmacy_user_id": 1,
                    "name": "New Model Pharmacy",
                    "image": null,
                    "location_id": 1,
                    "status": 1,
                    "current_rating": null,
                    "sentiment": null,
                    "address": null,
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": null,
                    "createdAt": "2022-07-31T16:02:45.000Z",
                    "updatedAt": "2022-07-31T16:02:45.000Z"
                }
            },
            {
                "medicine_id": 7,
                "medicine_name": "Eprex ",
                "medicine_type": "IV/SC Injection",
                "prescription_required": 1,
                "medicine_power": "3000 IU",
                "price": "1,647.74",
                "category": null,
                "manufactured_by": {
                    "id": 36,
                    "name": "(Mfg. by: Janssen-Cilag)",
                    "createdAt": "2022-10-20T10:02:03.000Z",
                    "updatedAt": "2022-10-20T10:02:03.000Z"
                },
                "pharmacy": {
                    "id": 1,
                    "pharmacy_user_id": 1,
                    "name": "New Model Pharmacy",
                    "image": null,
                    "location_id": 1,
                    "status": 1,
                    "current_rating": null,
                    "sentiment": null,
                    "address": null,
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": null,
                    "createdAt": "2022-07-31T16:02:45.000Z",
                    "updatedAt": "2022-07-31T16:02:45.000Z"
                }
            },
            {
                "medicine_id": 8,
                "medicine_name": "Cholera Fluid ",
                "medicine_type": "IV Infusion",
                "prescription_required": 1,
                "medicine_power": "",
                "price": "0.00",
                "category": null,
                "manufactured_by": {
                    "id": 37,
                    "name": "Institute of Public Health (IPH)",
                    "createdAt": "2022-10-20T10:02:04.000Z",
                    "updatedAt": "2022-10-20T10:02:04.000Z"
                },
                "pharmacy": {
                    "id": 1,
                    "pharmacy_user_id": 1,
                    "name": "New Model Pharmacy",
                    "image": null,
                    "location_id": 1,
                    "status": 1,
                    "current_rating": null,
                    "sentiment": null,
                    "address": null,
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": null,
                    "createdAt": "2022-07-31T16:02:45.000Z",
                    "updatedAt": "2022-07-31T16:02:45.000Z"
                }
            },
            {
                "medicine_id": 9,
                "medicine_name": "Arbitan ",
                "medicine_type": "Tablet",
                "prescription_required": 1,
                "medicine_power": "75 mg",
                "price": "6.02",
                "category": null,
                "manufactured_by": {
                    "id": 30,
                    "name": "Opsonin Pharma Ltd.",
                    "createdAt": "2022-10-01T10:58:40.000Z",
                    "updatedAt": "2022-10-01T10:58:40.000Z"
                },
                "pharmacy": {
                    "id": 2,
                    "pharmacy_user_id": 1,
                    "name": "Town Road Pharmacy",
                    "image": null,
                    "location_id": 1,
                    "status": 1,
                    "current_rating": null,
                    "sentiment": null,
                    "address": null,
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": null,
                    "createdAt": "2022-07-31T16:02:45.000Z",
                    "updatedAt": "2022-07-31T16:02:45.000Z"
                }
            },
            {
                "medicine_id": 10,
                "medicine_name": "Sodib ",
                "medicine_type": "IV Infusion",
                "prescription_required": 1,
                "medicine_power": "7.5%",
                "price": "25.08",
                "category": null,
                "manufactured_by": {
                    "id": 38,
                    "name": "Jayson Pharmaceuticals Ltd.",
                    "createdAt": "2022-10-20T10:02:05.000Z",
                    "updatedAt": "2022-10-20T10:02:05.000Z"
                },
                "pharmacy": {
                    "id": 2,
                    "pharmacy_user_id": 1,
                    "name": "Town Road Pharmacy",
                    "image": null,
                    "location_id": 1,
                    "status": 1,
                    "current_rating": null,
                    "sentiment": null,
                    "address": null,
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": null,
                    "createdAt": "2022-07-31T16:02:45.000Z",
                    "updatedAt": "2022-07-31T16:02:45.000Z"
                }
            },
            {
                "medicine_id": 11,
                "medicine_name": "Cromolin ",
                "medicine_type": "Ophthalmic Solution",
                "prescription_required": 1,
                "medicine_power": "4%",
                "price": "80.00",
                "category": null,
                "manufactured_by": {
                    "id": 15,
                    "name": "Ibn Sina Pharmaceuticals Ltd.",
                    "createdAt": "2022-07-18T13:41:13.000Z",
                    "updatedAt": "2022-07-18T13:41:13.000Z"
                },
                "pharmacy": {
                    "id": 2,
                    "pharmacy_user_id": 1,
                    "name": "Town Road Pharmacy",
                    "image": null,
                    "location_id": 1,
                    "status": 1,
                    "current_rating": null,
                    "sentiment": null,
                    "address": null,
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": null,
                    "createdAt": "2022-07-31T16:02:45.000Z",
                    "updatedAt": "2022-07-31T16:02:45.000Z"
                }
            },
            {
                "medicine_id": 12,
                "medicine_name": "Arth-A Max ",
                "medicine_type": "Tablet",
                "prescription_required": 1,
                "medicine_power": "750 mg+50 mg",
                "price": "12.03",
                "category": null,
                "manufactured_by": {
                    "id": 8,
                    "name": "ACME Laboratories Ltd.",
                    "createdAt": "2022-06-26T12:42:47.000Z",
                    "updatedAt": "2022-06-26T12:42:47.000Z"
                },
                "pharmacy": {
                    "id": 2,
                    "pharmacy_user_id": 1,
                    "name": "Town Road Pharmacy",
                    "image": null,
                    "location_id": 1,
                    "status": 1,
                    "current_rating": null,
                    "sentiment": null,
                    "address": null,
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": null,
                    "createdAt": "2022-07-31T16:02:45.000Z",
                    "updatedAt": "2022-07-31T16:02:45.000Z"
                }
            },
            {
                "medicine_id": 23,
                "medicine_name": "Kontab ",
                "medicine_type": "Tablet",
                "prescription_required": 1,
                "medicine_power": "50 mg+1 mg",
                "price": "6.00",
                "category": null,
                "manufactured_by": {
                    "id": 41,
                    "name": "(Mfg. by: Efroze Chemical Industries Ltd)",
                    "createdAt": "2022-10-20T10:02:15.000Z",
                    "updatedAt": "2022-10-20T10:02:15.000Z"
                },
                "pharmacy": {
                    "id": 22,
                    "pharmacy_user_id": 53,
                    "name": "Akij Pharmacy",
                    "image": null,
                    "location_id": null,
                    "status": null,
                    "current_rating": null,
                    "sentiment": null,
                    "address": "Mirpur-12, Dhaka",
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": 2,
                    "createdAt": "2022-11-10T12:51:57.000Z",
                    "updatedAt": "2022-11-10T12:51:57.000Z"
                }
            },
            {
                "medicine_id": 23,
                "medicine_name": "Kontab ",
                "medicine_type": "Tablet",
                "prescription_required": 1,
                "medicine_power": "50 mg+1 mg",
                "price": "6.00",
                "category": null,
                "manufactured_by": {
                    "id": 41,
                    "name": "(Mfg. by: Efroze Chemical Industries Ltd)",
                    "createdAt": "2022-10-20T10:02:15.000Z",
                    "updatedAt": "2022-10-20T10:02:15.000Z"
                },
                "pharmacy": {
                    "id": 22,
                    "pharmacy_user_id": 53,
                    "name": "Akij Pharmacy",
                    "image": null,
                    "location_id": null,
                    "status": null,
                    "current_rating": null,
                    "sentiment": null,
                    "address": "Mirpur-12, Dhaka",
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": 2,
                    "createdAt": "2022-11-10T12:51:57.000Z",
                    "updatedAt": "2022-11-10T12:51:57.000Z"
                }
            },
            {
                "medicine_id": 52,
                "medicine_name": "Dualvir ",
                "medicine_type": "Tablet",
                "prescription_required": 1,
                "medicine_power": "90 mg+400 mg",
                "price": "1,000.00",
                "category": null,
                "manufactured_by": {
                    "id": 25,
                    "name": "Aristopharma Ltd.",
                    "createdAt": "2022-10-01T10:58:08.000Z",
                    "updatedAt": "2022-10-01T10:58:08.000Z"
                },
                "pharmacy": {
                    "id": 2,
                    "pharmacy_user_id": 1,
                    "name": "Town Road Pharmacy",
                    "image": null,
                    "location_id": 1,
                    "status": 1,
                    "current_rating": null,
                    "sentiment": null,
                    "address": null,
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": null,
                    "createdAt": "2022-07-31T16:02:45.000Z",
                    "updatedAt": "2022-07-31T16:02:45.000Z"
                }
            },
            {
                "medicine_id": 135,
                "medicine_name": "Cinarin ",
                "medicine_type": "Tablet",
                "prescription_required": 1,
                "medicine_power": "15 mg",
                "price": "1.00",
                "category": null,
                "manufactured_by": {
                    "id": 75,
                    "name": "Nipa Pharmaceuticals Ltd.",
                    "createdAt": "2022-10-20T10:04:05.000Z",
                    "updatedAt": "2022-10-20T10:04:05.000Z"
                },
                "pharmacy": {
                    "id": 24,
                    "pharmacy_user_id": 54,
                    "name": "GULSHAN BRANCH",
                    "image": null,
                    "location_id": null,
                    "status": null,
                    "current_rating": null,
                    "sentiment": null,
                    "address": "GULSHAN-2, DHAKA",
                    "is_sub_branch": 1,
                    "root_branch_id": 2,
                    "branch_limit": null,
                    "createdAt": "2022-11-12T09:29:02.000Z",
                    "updatedAt": "2022-11-12T09:29:02.000Z"
                }
            },
            {
                "medicine_id": 6863,
                "medicine_name": "Napa ",
                "medicine_type": "Syrup",
                "prescription_required": 1,
                "medicine_power": "120 mg/5 ml",
                "price": "18.29",
                "category": null,
                "manufactured_by": {
                    "id": 33,
                    "name": "Beximco Pharmaceuticals Ltd.",
                    "createdAt": "2022-10-01T10:58:57.000Z",
                    "updatedAt": "2022-10-01T10:58:57.000Z"
                },
                "pharmacy": {
                    "id": 25,
                    "pharmacy_user_id": 56,
                    "name": "New Test Pharmacy",
                    "image": null,
                    "location_id": null,
                    "status": null,
                    "current_rating": null,
                    "sentiment": null,
                    "address": "Mirpur-11, Dhaka",
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": 0,
                    "createdAt": "2022-11-15T12:10:26.000Z",
                    "updatedAt": "2022-11-15T12:10:26.000Z"
                }
            },
            {
                "medicine_id": 6863,
                "medicine_name": "Napa ",
                "medicine_type": "Syrup",
                "prescription_required": 1,
                "medicine_power": "120 mg/5 ml",
                "price": "18.29",
                "category": null,
                "manufactured_by": {
                    "id": 33,
                    "name": "Beximco Pharmaceuticals Ltd.",
                    "createdAt": "2022-10-01T10:58:57.000Z",
                    "updatedAt": "2022-10-01T10:58:57.000Z"
                },
                "pharmacy": {
                    "id": 33,
                    "pharmacy_user_id": 7,
                    "name": "Test Store",
                    "image": null,
                    "location_id": null,
                    "status": null,
                    "current_rating": null,
                    "sentiment": null,
                    "address": "Dhaka",
                    "is_sub_branch": 0,
                    "root_branch_id": null,
                    "branch_limit": 0,
                    "createdAt": "2022-11-15T14:27:24.000Z",
                    "updatedAt": "2022-11-15T14:27:24.000Z"
                }
            }
        ]
    }
]

export default function PharmacyHomeScreen({navigation}) {

    const isMounted = useRef(true);
    const [pharmacy_List, setPharmacyList] = useState([]);
    const [category_list, setCategoryList] = useState([]);
    const [product_category, setProductCategory] = useState([]);
    const [all_medicine, setAllMedicine] = useState([]);
    const [indexValue, setIndexValue] = useState(1);
    const [is_loading, setLoading] = useState(false);
    const [text, setText] = useState("");
    const [text_medicine_search, setTextMedicineSearch] = useState("");
    const [default_category, setDefaultCategory] = useState([]);
    const [medicine_index, setMedicineIndex] = useState("");
    const [medicine_search_data, setMedicineSearchData] = useState([]);
    const [medicine, setMedicineName] = useState("");

    

    async function getPharmacyList() {

        setLoading(true)
        
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "pharmacy/suggestion_list", requestOptions)
        .then(response => response.text())
        .then(result => {
            let pharmacy_list_data = JSON.parse(result);
            setPharmacyList(pharmacy_list_data);
            
            // console.log('=====pharmacy_list_data=======', )
            // console.log(pharmacy_list_data )
            // console.log('=====pharmacy_list_data=======', )
            setLoading(false);
            
        })
        .catch(error => console.log('error', error));
    }


    // async function getAllMedicine(indexItem) {
    //     // console.log("+++++++++++++++++++++++++++++++++++++++++++")
    //     // console.log(indexItem)
    //     // console.log("+++++++++++++++++++++++++++++++++++++++++++")
    //     setLoading(true)
    //     let user_token = await token.getItem("token");
    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", "Bearer " + user_token);
    //     myHeaders.append("Content-Type", "application/json");

    //     var requestOptions = {
    //     method: 'GET',
    //     headers: myHeaders,
    //     redirect: 'follow'
    //     };

    //     await fetch( config.baseUrl + "pharmacy/all_medicines/index="+indexItem, requestOptions)
    //     .then(response => response.text())
    //     .then(result => {
    //         let medicines = JSON.parse(result);
    //         setAllMedicine(medicines);
    //         setLoading(false)
    //         // console.log('=====medicines=======', )
    //         // console.log(medicines )
    //         // console.log('=====medicines=======', )
            
    //     })
    //     .catch(error => console.log('error', error));
    // }

    async function getAllMedicineList() {
        // setLoading(true)
        let user_token = await token.getItem("token");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "pharmacy/pharmacy_all_medicines/key=" + medicine_index, requestOptions)
        .then(response => response.text())
        .then(result => {
            let medicines = JSON.parse(result);
            setAllMedicine(medicines.data);
            setMedicineIndex(medicines.key);

            console.log('%%%%%%%%%%%%%%%%%%%%%%%')
            console.log(medicines)
            console.log('%%%%%%%%%%%%%%%%%%%%%%%')
            
        })
        .catch(error => console.log('error', error));
    }

    useEffect(() => {
        
        if(isMounted) {
            setLoading(true);
            // getAllMedicine(indexValue);
            getAllMedicineList();
            setLoading(false);
        }

        return () => {
            isMounted.current = false;
        }

    }, [])
    
    
    
    
    async function getCategoryList(cat_data) {


        let user_token = await token.getItem("token");
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "name": cat_data,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "pharmacy/category_list", requestOptions)
        .then(response => response.text())
        .then(result => {
            let pharmacy_Category_data = JSON.parse(result);
            setLoading(true);
            setCategoryList(pharmacy_Category_data);
            setPharmacyList(pharmacy_Category_data?.pharmacy_data);
            setLoading(false);
            // console.log('=====pharmacy_Category_data=======', )
            // console.log(pharmacy_Category_data)
            // console.log('=====pharmacy_Category_data=======', )
            
        })
        .catch(error => console.log('error', error));

    }


    async function getProductCategory(list_cat) {


        let user_token = await token.getItem("token");
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "name": list_cat?.name,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        // console.log('=====list_cat=======', )
        // console.log(list_cat)
        // console.log('=====list_cat=======', )

        await fetch( config.baseUrl + "pharmacy/product_category", requestOptions)
        .then(response => response.text())
        .then(result => {
            setLoading(true);
            let product_category_data = JSON.parse(result);
            setProductCategory(product_category_data);
            setPharmacyList(product_category_data?.pharmacy_data);
            setLoading(false);
            // console.log('=====product_category_data=======', )
            // console.log(product_category_data)
            // console.log('=====product_category_data=======', )
            
        })
        .catch(error => console.log('error', error));
    }


    async function searchPharmacy() {

        setLoading(true);
        // setApiData([]);
        let user_token = await token.getItem("token");
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
        "name": text,
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        await fetch( config.baseUrl + "pharmacy/search", requestOptions)
        .then(response => response.text())
        .then(result => {
            let api_response = JSON.parse(result);
            
            // console.log('============search data-=========')
            // console.log(api_response)
            // console.log('============search data-=========')

            setPharmacyList(api_response)
            setLoading(false)
            // if(api_response.code == 200) {
            //     setApiData(api_response);
            //     setLoading(false);
            // }
            
        })
        .catch(error => console.log('error', error));
    }

    async function getMediceneName(text) {
        let user_token = await Storage.getItem("token");
        
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + user_token);
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({ "medicine_name" : text})

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        await fetch( config.baseUrl + "pharmacy/pharmacy_all_medicines_search", requestOptions)
        .then(response => response.text())
        .then(result => {
            let user_data_response = JSON.parse(result);
            console.log(user_data_response.data)
            setAllMedicine(user_data_response.data)
            setMedicineIndex(user_data_response.key);

            // console.log('%%%%%%%%%%%%%%%%%%%%%%%######')
            // console.log(medicines)
            // console.log('%%%%%%%%%%%%%%%%%%%%%%%#######')
        })
        .catch(error => console.log(error));
    }

    useEffect(async() => {
        
        if(isMounted){
            debounce(getMediceneName(text_medicine_search), 100);
            
        }
        return() => isMounted.current = false;

    } , [text_medicine_search])

    useEffect(() => {
        if(isMounted){
            setLoading(true);
            searchPharmacy();
            setLoading(false);     
        }

        return () => {
            isMounted.current = false;
        }
    }, [text]);

    useFocusEffect(
        useCallback(() => {

            if(isMounted) {
                setLoading(true);
                getPharmacyList();
                // getCategoryList("");
                // getProductCategory("");
                setLoading(false);
            }
            
            return () => {
                isMounted.current = false;
            }
        }, []),
    );



    return (
        <SafeAreaView style={{flex:1}}>
            <StatusBar backgroundColor={'#075141'} />

            {
                is_loading ? (
                    <Loader/>
                ) : (

                    <ScrollView>

                        <View style={{flex:1}}>

                            <View 
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    backgroundColor:'#5ED4BA',
                                    borderRadius:100/2,
                                    margin: 10,
                                    flex:1
                                }}
                            >
                                <TextInput 
                                    
                                    placeholder='Search'
                                    style={{
                                        // borderWidth:1,
                                        width:'85%',
                                        borderRadius:100/2,
                                        paddingHorizontal:10,
                                        paddingVertical:3,
                                        backgroundColor:'#fff',
                                        height:50,
                                        fontSize:14,
                                        fontWeight:'bold'
                                    }}
                                    onChangeText={(text) => {
                                        setText(text)
                                    }}
                                />
                                <TouchableOpacity 
                                    style={{
                                    
                                    }}>
                                    <Ionicons style={{
                                        marginLeft:5
                                    }} name='mic-outline' size={24} color={'#fff'} />
                                </TouchableOpacity>
                            </View>


                            <View style={{
                                flex:1,
                                marginHorizontal:10
                            }}>
                                <Text style={{
                                    fontWeight:'400',
                                    fontSize:14,
                                    color:'#B6B7B7'
                                }}>Delivering to</Text>
                                <Text style={{
                                    fontSize:18,
                                    fontWeight:'bold',
                                    color:'#7C7D7E'
                                }}>Current Location</Text>
                            </View>

                            <View style={{
                                flex:1
                            }}>

                                <View style={{
                                        marginVertical: 10,
                                        flex:1
                                    }}>
                                        <Text style={{
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                            fontSize: 18,
                                            fontWeight:'bold'
                                        }}>
                                            All Pharmacy
                                        </Text>
                                            
                                </View>
                                
                                {
                                    pharmacy_List?.data ? pharmacy_List?.data.length > 0 && (
                                        
                                        <View style={{
                                            marginHorizontal:5
                                        }}>
                                            <FlatList 
        
                                                showsHorizontalScrollIndicator={false}
                                                data={pharmacy_List?.data}
                                                
                                                renderItem={({ item, index }) => (
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('SinglePharmacyScreen', item)}
                                                        style={{
                                                            marginHorizontal:5,
                                                            // elevation:.3,
                                                            width:160,
                                                            height:240,
                                                            borderWidth: .3,
                                                            borderColor: '#87B2A9',
                                                            borderRadius: 10,
                                                        }}
                                                    >
                                                        
                                                        <View style={{
                                                            flex: 1,
                                                            
                                                        }}>
                                                            
                                                            <View 
                                                                style={{
                                                                    // backgroundColor:'#357C3C',
                                                                    borderTopLeftRadius:10,
                                                                    borderTopRightRadius:10
                                                                }}
                                                            >
                                                                <Image 
                                                                    size={40} 
                                                                    source={pharmacyImg} 
                                                                    // style={{width: '100%'}} 
                                                                    resizeMode="contain"
                                                                    // resizeMethod='auto'
                                                                />
                                                            </View>
                                                            
                                                            <View style={{
                                                                paddingHorizontal:7,
                                                                paddingVertical:7
                                                            }}>
                                                                <Text style={{ 
                                                                    fontSize: 10,
                                                                    color: '#090F47',
                                                                    textAlign: 'left',
                                                                    fontWeight:'bold'
                                                                }}>
                                                                        {item?.name}
                                                                </Text>
                                                                
                                                            </View>
        
                                                            <View style={{
                                                                paddingHorizontal: 10,
                                                                alignItems:'flex-end',
                                                                marginVertical:10
                                                                // flex:1,
                                                                // justifyContent:'flex-end'
                                                            }}>
                                                                <View style={{
                                                                    // justifyContent: 'flex-end',
                                                                    // alignItems: 'center',
                                                                    backgroundColor: '#FFC000',
                                                                    flexDirection: 'row',
                                                                    paddingHorizontal: 10,
                                                                    // marginVertical: 10,
                                                                    borderRadius:20
                                                                }}>
                                                                    <Ionicons name="star-sharp" size={16} color="#FFF" />
                                                                    {/* <Text style={{
                                                                        color: '#FFF',
                                                                        fontWeight:'bold'
                                                                    }}>
                                                                        {item?.current_rating}
                                                                    </Text> */}
                                                                </View>
                                                            </View>
                                                        </View>
        
                                                    </TouchableOpacity>
                                                )}
                                                horizontal={true}
                                                keyExtractor={(item, index) => index.toString()}
                                            />
                                        </View>

                                    ) : (
                                    <View style={{
                                        flex:1,
                                        justifyContent:'center',
                                        alignItems:'center'
                                    }}>
                                            <Text style={{
                                                color:'#000',
                                                fontSize:16,
                                                fontWeight:'bold'
                                            }}>
                                                Not available !
                                            </Text>
                                    </View>
                                    )
                                }

                            </View>


                            

                            <View style={{
                                marginVertical: 10
                            }}>
                                <FlatList 
                                    showsHorizontalScrollIndicator={false}
                                    data={category_list?.data}
                                    renderItem={({ item, index }) => (
                                        <TouchableOpacity 
                                            style={{
                                                flex:1,
                                                paddingVertical: 5, 
                                                paddingHorizontal: 20,
                                                marginLeft: 5,
                                                borderColor: '#9CC2BA',
                                                borderRadius: 50,
                                                borderWidth: 1,
                                            }}

                                            onPress={ () => {
                                                getCategoryList(item)
                                            }}
                                        >
                                            
                                            <Text style={{ 
                                                color: '#3AAD94',
                                                fontWeight:'bold',
                                                fontSize:14
                                            }}>
                                                {item}
                                            </Text>

                                        </TouchableOpacity>
                                    )}
                                    // numColumns={3}
                                    horizontal={true}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View>
                            
                            
                            {/* <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginHorizontal: 10,
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}>
                                    <Text style={{
                                        marginRight: 10
                                    }}>
                                        Filter:
                                    </Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        backgroundColor: '#3AAD94',
                                        borderRadius: 8,
                                        alignItems: 'center',
                                        paddingHorizontal: 10,
                                        paddingVertical: 5
                                    }}>
                                        <Text style={{
                                            color: '#FFF',
                                            marginRight: 15
                                        }}>
                                            Tablet
                                        </Text>
                                        <AntDesign name="down" size={16} color="#FFF" />
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center'
                                }}>
                                    <Text style={{
                                        marginRight: 10
                                    }}>
                                        Sort
                                    </Text>
                                    <MaterialIcons name="sort" size={24} color="#3AAD94" />
                                </View>
                            </View> */}

                            {
                                product_category?.data?.length > 0 && (
                                    
                                    <View style={{
                                        marginVertical: 10
                                    }}>
                                        
                                        <Text style={{
                                            marginRight: 10,
                                            marginHorizontal: 10,
                                            marginBottom: 10,
                                            fontSize: 18
                                        }}>
                                            Categories
                                        </Text>
                                        
                                        <FlatList 
                                            showsHorizontalScrollIndicator={false}
                                            data={product_category?.data}
                                            renderItem={({ item, index }) => (
                                                <View style={{
                                                    padding:4
                                                }}>

                                                    <TouchableOpacity 
                                                        style={{

                                                        }}
                                                        onPress={ () => {
                                                            // navigation.navigate('CategoryScreen', item)
                                                            getProductCategory(item)
                                                        }}
                                                    >

                                                        <View style={{
                                                            flex: 1,
                                                            alignItems: 'center',
                                                            paddingVertical: 5, 
                                                            marginHorizontal: 5,
                                                        }}>
                                                            <Avatar.Image 
                                                                size={50} 
                                                                source={foodDrinks} 
                                                                style={{marginVertical: 0, backgroundColor:'#fff'}} 
                                                            />

                                                            <Text style={{ 
                                                                marginBottom: 10,
                                                                color: '#3AAD94',
                                                                textAlign: 'center'
                                                                }}>
                                                                    {item?.name}
                                                            </Text>
                                                        </View>

                                                    </TouchableOpacity>

                                                </View>
                                            )}
                                            // numColumns={3}
                                            horizontal={true}
                                            keyExtractor={(item, index) => index.toString()}
                                        />

                                    </View>

                                )
                            }


                            

                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 10,
                                paddingHorizontal: 10,
                                backgroundColor: '#3AAD94',
                                alignItems: 'center'
                            }}>
                                <View style={{
                                    padding: 10,
                                    borderRadius: 50,
                                    backgroundColor: '#70CBB7'
                                }}>
                                    <Feather 
                                        name="phone" 
                                        size={28} 
                                        color="#FFF"
                                        onPress={()=> Linking.openURL(`tel:${+8809639400600}`)}
                                    />
                                </View>
                                <Text style={{
                                    fontSize: 18,
                                    color: '#FFF',
                                    marginLeft: 20
                                }}>
                                    Quick consult a female doctor
                                </Text>
                            </View>
                            

                            {/* <View style={{
                                marginVertical: 10
                            }}>
                                <Text style={{
                                    marginRight: 10,
                                    marginHorizontal: 10,
                                    marginBottom: 10,
                                    fontSize: 18
                                }}>
                                    Medical Accessories
                                </Text>
                                <FlatList 
                                    showsHorizontalScrollIndicator={false}
                                    data={[
                                        { img: medecineAcc, productType: 'A123 Stethoscope', margin: 10, key: '1' },
                                        { img: medecineAcc, productType: 'A123 Stethoscope', key: '2' }
                                    ]}
                                    renderItem={({ item }) => (
                                        <View style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                            marginLeft: item.margin,
                                            marginHorizontal: 5,
                                            backgroundColor: '#DDF5F9',
                                            borderRadius: 12,
                                            marginBottom: 10
                                        }}>
                                            <View style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                marginHorizontal: 10,
                                            }}>
                                                <Text style={{ 
                                                    color: '#567277',
                                                    fontSize: 12,
                                                    textAlign: 'center'
                                                }}>
                                                        {item.productType}
                                                </Text>
                                                <View style={{
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <View style={{
                                                        flex: 1,
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-start'
                                                    }}>     
                                                        <Text style={{
                                                            color: '#000',
                                                            fontSize: 22,
                                                            fontWeight: 'bold'
                                                        }}>{'\u09F3'}</Text>   
                                                        <Text style={{ 
                                                            color: '#000',
                                                            fontWeight: 'bold',
                                                            fontSize: 12
                                                        }}>120</Text> 
                                                    </View>
                                                    <View style={{
                                                        flex: 1,
                                                    }}>        
                                                        <Text style={{
                                                            color: '#8B8B8B',
                                                            textAlign: 'right',
                                                            fontSize: 8
                                                        }}>
                                                            MRP {'\u09F3'} 180
                                                        </Text> 
                                                        <Text style={{
                                                            color: '#3AAD94',
                                                            textAlign: 'right',
                                                            fontSize: 8
                                                        }}>20% Off</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <Image size={50} source={item.img} style={{marginVertical: 0}} />
                                        </View>
                                    )}
                                    // numColumns={3}
                                    horizontal={true}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View> */}


                            {/* <TouchableOpacity style={{
                                alignItems: 'center'
                            }}>
                                <Text style={{
                                    color: '#FFF',
                                    backgroundColor: '#3AAD94',
                                    fontWeight: 'bold',
                                    paddingHorizontal: 50,
                                    paddingVertical: 10,
                                    borderRadius: 50,
                                }}>
                                    Show More
                                </Text>
                            </TouchableOpacity> */}


                            {/* <View style={{
                                marginVertical: 10,
                                paddingHorizontal: 10
                            }}>
                                <Text style={{
                                    marginHorizontal: 10,
                                    marginBottom: 10,
                                    fontSize: 18
                                }}>
                                    Most Popular Medicines
                                </Text>
                                <FlatList 
                                    data={[
                                        { img: medecinebottle, productType: 'Sugar\nSubstitute', margin: 10, key: '1' },
                                        { img: medecinebottle, productType: 'Sugar\nSubstitute', key: '2' },
                                        { img: medecinebottle, productType: 'Sugar\nSubstitute', key: '3' },
                                        { img: medecinebottle, productType: 'Sugar\nSubstitute', key: '4' }
                                    ]}
                                    renderItem={({ item }) => (
                                        <View style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            marginRight: 5,
                                            borderWidth: .5,
                                            borderColor: '#87B2A9',
                                            borderRadius: 12,
                                            marginBottom: 10,
                                            overflow: 'hidden'
                                        }}>
                                            <Image size={20} source={item.img} style={{width: '100%'}} />
                                            <View style={{
                                                flex: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                padding: 5
                                            }}>
                                                <Text style={{ 
                                                    flex: 1,
                                                    fontSize: 12,
                                                    marginRight: 4,
                                                    color: '#090F47'
                                                }}>
                                                        {item.productType}
                                                </Text>
                                                <View style={{
                                                    alignItems: 'flex-end'
                                                }}>
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        alignItems: 'center',
                                                        justifyContent: 'flex-end'
                                                    }}>     
                                                        <Text style={{
                                                            color: '#000',
                                                            fontSize: 20,
                                                            fontWeight: 'bold'
                                                        }}>{'\u09F3'}</Text>   
                                                        <Text style={{ 
                                                            color: '#000',
                                                            fontWeight: 'bold',
                                                            fontSize: 12
                                                        }}>120</Text> 
                                                    </View>    
                                                    <Text style={{
                                                        color: '#8B8B8B',
                                                        textAlign: 'right',
                                                        fontSize: 8
                                                    }}>
                                                        MRP {'\u09F3'} 180
                                                    </Text> 
                                                    <Text style={{
                                                        color: '#3AAD94',
                                                        textAlign: 'right',
                                                        fontSize: 8,
                                                        marginTop: 5
                                                    }}>20% Off</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )}
                                    // numColumns={3}
                                    horizontal={true}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                <TouchableOpacity style={{
                                    position: 'absolute',
                                    right: 5,
                                    top: '50%',
                                    backgroundColor: '#FFF',
                                    borderRadius: 50,
                                    padding: 5
                                }}>
                                    <AntDesign name="right" size={16} color="black" />
                                </TouchableOpacity>
                            </View> */}


                            <View style={{
                                marginVertical: 10,
                                paddingLeft: 10,
                                paddingRight: 5,
                                flex:1
                            }}>
                                <View>
                                    <Text style={{
                                        marginHorizontal: 10,
                                        // marginBottom: 10,
                                        fontSize: 14,
                                        fontWeight:'bold',
                                        color:'#70707B'
                                    }}>
                                        All Medicine
                                    </Text>
                                    
                                    <View style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                        backgroundColor:'#5ED4BA',
                                        borderRadius:100/2,
                                        margin: 10,
                                        flex:1,
                                        }}
                                    >
                                        <TextInput 
                                            value={text_medicine_search}
                                            placeholder='Search medicine'
                                            style={{
                                                // borderWidth:1,
                                                width:'85%',
                                                borderRadius:100/2,
                                                paddingHorizontal:10,
                                                paddingVertical:3,
                                                backgroundColor:'#fff',
                                                height:50,
                                                fontSize:14,
                                                fontWeight:'bold'
                                            }}
                                            onChangeText={(text) => {
                                                // getMediceneName(text)
                                                setTextMedicineSearch(text)
                                                // getMediceneName(text)
                                            }}
                                        />
                                        <TouchableOpacity 
                                            style={{
                                            
                                            }}
                                            onPress={() => {
                                                Toast.show({
                                                    type:'success',
                                                    text1:'Coming soon!'
                                                })
                                            }}
                                            >
                                            <Ionicons style={{
                                                marginLeft:5
                                            }} name='mic-outline' size={24} color={'#fff'} />
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View>

                                {/* <View>
                                    <FlatList 
                                    data={all_medicine?.data}
                                    renderItem={({ item, index }) => (
                                        <View style={{
                                            flex:1,
                                            marginHorizontal:4,
                                            marginTop:10
                                        }}>

                                            <TouchableOpacity 
                                                onPress={() => {
                                                    navigation.navigate('MedicineDetailsPharm', { data : item, pharmacyId : item?.pharmacy?.id})
                                                    
                                                }}
                                            >

                                                <View style={{
                                                    flex: 1,
                                                    // justifyContent: 'center',
                                                    marginRight: 5,
                                                    borderWidth: .5,
                                                    borderColor: '#87B2A9',
                                                    borderRadius: 12,
                                                    marginBottom: 10,
                                                    overflow: 'hidden'
                                                }}>
                                                    <Image size={20} source={medecinebottle} style={{width: '100%',height:100}} />
                                                    {
                                                        item?.prescription_required == 1 && (
                                                            
                                                            <View style={{
                                                                flex:1,
                                                                flexDirection:'row',
                                                                alignItems:'center',
                                                                marginVertical:4,
                                                                paddingHorizontal:4
                                                            }}>
                                                                
                                                                <MaterialIcons 
                                                                    // style={{position:'relative', top:24}} 
                                                                    name="assignment" 
                                                                    size={24} 
                                                                    color="#EB1D36" 
                                                                    // onPress={() => {
                                                                    //     Toast.show({
                                                                    //         type:'error',
                                                                    //         text1:'Prescription is required to buy ' + item?.medicine_name,
                                                                    //         text2 : 'Please upload your prescription'
                                                                    //     })
                                                                    // }}
                                                                />
                                                                <Text style={{fontSize:10,fontWeight:'bold', color:'#EB1D36',flex:1}}>
                                                                Prescription required!
                                                                </Text>
                                                            </View>

                                                        )
                                                    }
                                                    <View style={{
                                                        flex: 1,
                                                        flexDirection: 'row',
                                                        // alignItems: 'center',
                                                        padding: 5,
                                                        justifyContent:'space-between'
                                                    }}>
                                                        <View style={{
                                                            // alignItems:'center'
                                                        }}>
                                                            
                                                            <Text style={{ 
                                                                // flex: 1,
                                                                fontSize: 12,
                                                                color: '#090F47',
                                                                fontWeight:'bold'
                                                            }}>
                                                                {item?.medicine_name}
                                                            </Text>

                                                            <Text style={{ 
                                                                // flex: 1,
                                                                fontSize: 10,
                                                                color: '#090F47',
                                                                fontWeight:'bold'
                                                            }}>
                                                                {item?.medicine_type}
                                                            </Text>
                                                        </View>

                                                        <View style={{
                                                            alignItems: 'flex-end'
                                                        }}>
                                                            
                                                            <View style={{
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                justifyContent: 'flex-end'
                                                            }}>     
                                                            
                                                                <Text style={{
                                                                    color: '#000',
                                                                    fontSize: 18,
                                                                    fontWeight: 'bold'
                                                                }}>{'\u09F3'}</Text>   
                                                                
                                                                <Text style={{ 
                                                                    color: '#000',
                                                                    fontWeight: 'bold',
                                                                    fontSize: 10
                                                                }}>{item?.price.split('৳')[1]}</Text> 

                                                            </View>    
                                                            
                                                            <Text style={{
                                                                color: '#8B8B8B',
                                                                textAlign: 'right',
                                                                fontSize: 10
                                                            }}>
                                                                MRP {'\u09F3'} 180
                                                            </Text> 

                                                            <Text style={{
                                                                color: '#3AAD94',
                                                                textAlign: 'right',
                                                                fontSize: 10,
                                                                marginTop: 5
                                                            }}>20% Off</Text>

                                                        </View>

                                                    </View>

                                                    <Text style={{
                                                        position: 'absolute',
                                                        top: 0,
                                                        backgroundColor: '#EB503F',
                                                        color: '#FFF',
                                                        fontSize: 8,
                                                        paddingHorizontal: 10,
                                                        paddingVertical: 4,
                                                        borderBottomRightRadius: 10
                                                    }}>
                                                        Sale
                                                    </Text>

                                                </View>

                                            </TouchableOpacity>

                                        </View>
                                    )}
                                    // numColumns={2}
                                    horizontal
                                    keyExtractor={(item, index) => index.toString()}
                                />
                                </View> */}

                                <View style={{flex:1}}>
                                    <FlatList
                                        data={all_medicine}
                                        renderItem={({item, index}) => (
                                            <View style={{flex:1}}>
                                                <View 
                                                    style={{
                                                        flex:1,
                                                        flexDirection:'row',
                                                        justifyContent:'space-between',
                                                        marginHorizontal:12,
                                                        marginTop:12,
                                                        marginBottom:4,
                                                        alignItems:'center'
                                                    }}
                                                >
                                                    <Text 
                                                        style={{
                                                            fontSize:14,
                                                            fontWeight:'bold',
                                                            color:'#70707B'
                                                        }}
                                                    >
                                                        {Object.keys(all_medicine[index])[0].toUpperCase()}
                                                    </Text>

                                                    <TouchableOpacity
                                                        onPress={()=> {
                                                            navigation.navigate('CategoryScreen',{category : item})
                                                        }}
                                                    >
                                                        <Text 
                                                            style={{
                                                                fontSize:14,
                                                                fontWeight:'bold',
                                                                color:'#3AAD94'
                                                            }}
                                                        >
                                                            SEE ALL
                                                        </Text>

                                                    </TouchableOpacity>
                                                </View>

                                                <View style={{flex:1}}>
                                                    <FlatList
                                                        style={{flex:1}}
                                                        data={all_medicine[index][Object.keys(item)[0]]}
                                                        renderItem={({item, index}) => (
                                                            <View style={{
                                                                flex:1,
                                                                marginHorizontal:4,
                                                                marginTop:10,
                                                            }}>
                    
                                                                <TouchableOpacity 
                                                                    onPress={() => {
                                                                        navigation.navigate('MedicineDetailsPharm', { data : item, pharmacyId : item?.pharmacy?.id})
                                                                        // console.log('item',item)
                                                                    }}
                                                                    style={{flex:1,width:140}}
                                                                >
                    
                                                                    <View style={{
                                                                        flex: 1,
                                                                        // justifyContent: 'center',
                                                                        marginRight: 5,
                                                                        borderWidth: .5,
                                                                        borderColor: '#87B2A9',
                                                                        borderRadius: 12,
                                                                        marginBottom: 10,
                                                                        overflow: 'hidden'
                                                                    }}>
                                                                        <Image size={20} source={medecinebottle} style={{width: '100%',height:100}} />
                                                                        {
                                                                            item?.prescription_required == 1 && (
                                                                                
                                                                                <View style={{
                                                                                    flex:1,
                                                                                    flexDirection:'row',
                                                                                    alignItems:'center',
                                                                                    marginVertical:4,
                                                                                    paddingHorizontal:4
                                                                                }}>
                                                                                    
                                                                                    <MaterialIcons 
                                                                                        // style={{position:'relative', top:24}} 
                                                                                        name="assignment" 
                                                                                        size={24} 
                                                                                        color="#EB1D36" 
                                                                                        // onPress={() => {
                                                                                        //     Toast.show({
                                                                                        //         type:'error',
                                                                                        //         text1:'Prescription is required to buy ' + item?.medicine_name,
                                                                                        //         text2 : 'Please upload your prescription'
                                                                                        //     })
                                                                                        // }}
                                                                                    />
                                                                                    <Text style={{fontSize:10,fontWeight:'bold', color:'#EB1D36',flex:1}}>
                                                                                    Prescription required!
                                                                                    </Text>
                                                                                </View>
                    
                                                                            )
                                                                        }
                                                                        <View style={{
                                                                            // flex: 1,
                                                                            flexDirection: 'row',
                                                                            // alignItems: 'center',
                                                                            padding: 5,
                                                                            justifyContent:'space-between',
                                                                            flexWrap:'wrap'
                                                                        }}>
                                                                            <View style={{
                                                                                // alignItems:'center',
                                                                                // flex:.5,
                                                                                // backgroundColor:'#357C3C',
                                                                                width:'50%'
                                                                            }}>
                                                                                
                                                                                <Text style={{ 
                                                                                    // flex: 1,
                                                                                    fontSize: 10,
                                                                                    color: '#090F47',
                                                                                    fontWeight:'bold'
                                                                                }}>
                                                                                    {item?.medicine_name}
                                                                                </Text>
                    
                                                                                <Text style={{ 
                                                                                    // flex: 1,
                                                                                    fontSize: 10,
                                                                                    color: '#090F47',
                                                                                    fontWeight:'bold'
                                                                                }}>
                                                                                    {item?.medicine_type}
                                                                                </Text>
                                                                            </View>
                    
                                                                            <View style={{
                                                                                // alignItems: 'flex-end',
                                                                                // flex:.5,
                                                                                // marginLeft:6,
                                                                                // backgroundColor:'#567277',
                                                                                width:'50%'
                                                                            }}>
                                                                                
                                                                                <View style={{
                                                                                    flexDirection: 'row',
                                                                                    alignItems: 'center',
                                                                                    justifyContent: 'flex-end',
                                                                                }}>     
                                                                                
                                                                                    <Text style={{
                                                                                        color: '#000',
                                                                                        fontSize: 18,
                                                                                        fontWeight: 'bold'
                                                                                    }}>{'\u09F3'}</Text>   
                                                                                    
                                                                                    <Text style={{ 
                                                                                        color: '#000',
                                                                                        fontWeight: 'bold',
                                                                                        fontSize: 10
                                                                                    }}>{item?.price.split('৳')[1]}</Text> 
                    
                                                                                </View>    
                                                                                
                                                                                <Text style={{
                                                                                    color: '#8B8B8B',
                                                                                    textAlign: 'right',
                                                                                    fontSize: 10
                                                                                }}>
                                                                                    MRP {'\u09F3'} 180
                                                                                </Text> 
                    
                                                                                <Text style={{
                                                                                    color: '#3AAD94',
                                                                                    textAlign: 'right',
                                                                                    fontSize: 10,
                                                                                    marginTop: 5
                                                                                }}>20% Off</Text>
                    
                                                                            </View>
                    
                                                                        </View>
                    
                                                                        
                    
                                                                    </View>

                                                                    <Text style={{
                                                                        position: 'absolute',
                                                                        top: 0,
                                                                        backgroundColor: '#EB503F',
                                                                        color: '#FFF',
                                                                        fontSize: 8,
                                                                        paddingHorizontal: 10,
                                                                        paddingVertical: 4,
                                                                        borderBottomRightRadius: 10
                                                                    }}>
                                                                        Sale
                                                                    </Text>
                    
                                                                </TouchableOpacity>
                    
                                                            </View>
                                                        )}
                                                        keyExtractor={(item, index) => "D" + index.toString()}
                                                        horizontal
                                                    />
                                                </View>
                                            </View>
                                        )}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                </View>
                                
                            </View>


                            {/* <TouchableOpacity 
                                // onPress={() => {getAllMedicine(indexValue+1), setIndexValue(indexValue+1)}}
                                onPress={() => getAllMedicineList()}
                                style={{
                                    alignItems: 'center',
                                    marginBottom:12
                                }}
                            >
                                <Text style={{
                                    color: '#FFF',
                                    backgroundColor: '#3AAD94',
                                    fontWeight: 'bold',
                                    paddingHorizontal: 50,
                                    paddingVertical: 10,
                                    borderRadius: 50,
                                }}>

                                    
                                    Show More
                                </Text>
                            </TouchableOpacity> */}

                            
                            {/* <ImageBackground source={fifillBg} resizeMode="cover" style={{
                                flex: 1,
                                justifyContent: "center", 
                                paddingVertical: 30, 
                                marginHorizontal: 10, 
                                marginVertical: 20, 
                                padding: 15
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <Text style={{
                                        fontSize: 18,
                                        color: '#3AAD94'
                                    }}>
                                        Your Prescribed 
                                    </Text>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                        marginLeft: 5,
                                        color: '#1D7562'
                                    }}>
                                        "Diapro"
                                    </Text>
                                </View>
                                <Text style={{
                                    fontSize: 16,
                                    color: '#3AAD94'
                                }}>
                                    will be over soon
                                </Text>
                                <TouchableOpacity style={{
                                    alignItems: 'flex-start',
                                    marginTop: 10
                                }}>
                                    <Text style={{
                                        backgroundColor: '#3AAD94',
                                        borderRadius: 8,
                                        color: '#FFF',
                                        paddingVertical: 5,
                                        paddingHorizontal: 50
                                    }}>
                                        Refill
                                    </Text>
                                </TouchableOpacity>
                            </ImageBackground>


                            <View style={{
                                marginVertical: 10,
                            }}>
                                <Text style={{
                                    marginHorizontal: 10,
                                    marginBottom: 10,
                                    fontSize: 18
                                }}>
                                    News {'\u0026'} Blogs
                                </Text>
                                <FlatList 
                                    data={[
                                        { img: bbcBg, newsTitle: 'News Headline', newsContent: 'Lorem Ipsum Dolor\nLorem Lorem',  margin: 10, key: '1' },
                                        { img: bbcBg, newsTitle: 'News Headline', newsContent: 'Lorem Ipsum Dolor\nLorem Lorem', key: '2' }
                                    ]}
                                    renderItem={({ item }) => (
                                        <View style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            flexDirection: 'row',
                                            marginLeft: item.margin,
                                            marginHorizontal: 5,
                                            backgroundColor: '#DDF5F9',
                                            borderRadius: 12,
                                            marginBottom: 10,
                                            overflow: 'hidden'
                                        }}>
                                            <View style={{
                                                flex: 1,
                                                justifyContent: 'center',
                                                marginHorizontal: 10,
                                            }}>
                                                <Text style={{ 
                                                    color: '#567277',
                                                    fontSize: 12
                                                }}>
                                                        {item.newsTitle}
                                                </Text>
                                                <Text style={{ 
                                                    color: '#567277',
                                                    fontSize: 12
                                                }}>
                                                        {item.newsContent}
                                                </Text>
                                            </View>
                                            <Image size={50} source={item.img} style={{marginVertical: 0}} />
                                        </View>
                                    )}
                                    // numColumns={3}
                                    horizontal={true}
                                    keyExtractor={(item, index) => index.toString()}
                                />
                            </View> */}
                            
                            
                        </View>

                    </ScrollView>
                )
            }
            
            
        </SafeAreaView>
    )
}
