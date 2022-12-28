import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { 
    Ionicons,
    AntDesign,
    FontAwesome5,
    MaterialCommunityIcons,
    Octicons,
    Entypo,
    Fontisto ,
    MaterialIcons 
} from '@expo/vector-icons';
import MedicineHomeScreen from "./medicineDirectory/medicineHome";
import MedicineGenericScreen from "./medicineDirectory/generic/medicineGeneric";
import DrugClassesScreen from "./medicineDirectory/drugClasses/drugClasses";
import BrandNamesScreen from "./medicineDirectory/brandNames/brandNames";
import DosageFormScreen from "./medicineDirectory/dosagesForms/dosageForms";
import GenericMedicineName from "./medicineDirectory/generic/genericMedicineName";
import MedicineDetailsScreen from "./medicineDirectory/medicineDetails";
import { View } from "react-native-animatable";
import { TouchableOpacity,  Text } from "react-native";
import ClassTypeScreen from "./medicineDirectory/drugClasses/classType";
import ClassDetailsScreen from "./medicineDirectory/drugClasses/classDetails";
import AllMedicinesScreen from "./medicineDirectory/allMedicines/allMedicines";



const Stack = createStackNavigator();

const MedicineRoutes = ({navigation}) => {

    return (
        <Stack.Navigator
            initialRouteName="MedicineHomeScreen"
            screenOptions={{
            headerShown:false,
            headerStyle: {
                backgroundColor: '#F9FAFE',
                borderBottomWidth:0
            },
            headerTintColor: '#707070',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize:20
            },
            headerTitleAlign:'left'
            }}>
    
            <Stack.Screen
                name="MedicineHomeScreen"
                component={MedicineHomeScreen}
                options={{
                    title: 'Medicine directory', 
                    headerShown:true,
                    // headerRight:() => (
                    //     <Ionicons 
                    //         name="md-settings-outline" 
                    //         size={24} 
                    //         color="black" 
                    //         style={{marginHorizontal:24}} 
                    //         onPress={() => console.log('med-pressed')}    
                    //     />
                    // )
                }}
            />
            
            <Stack.Screen
                name="MedicineGenericScreen"
                component={MedicineGenericScreen}
                options={{
                    title: 'List of Generic Names', 
                    headerShown:true,
                    // headerRight:() => (
                    //     <Ionicons 
                    //         name="md-settings-outline" 
                    //         size={24} 
                    //         color="black" 
                    //         style={{marginHorizontal:24}} 
                    //         onPress={() => console.log('med-pressed')}    
                    //     />
                    // )
                }}
            />

            <Stack.Screen
                name="DrugClassesScreen"
                component={DrugClassesScreen}
                options={{
                    title: 'Drug Classes', 
                    headerShown:true,
                }}
            />

            <Stack.Screen
                name="BrandNamesScreen"
                component={BrandNamesScreen}
                options={{
                    title: 'List of Brand Names', 
                    headerShown:true,
                }}
            />

            <Stack.Screen
                name="DosageFormScreen"
                component={DosageFormScreen}
                options={{
                    title: 'Available Dosage Forms', 
                    headerShown:true,
                }}
            />
            
            <Stack.Screen
                name="AllMedicinesScreen"
                component={AllMedicinesScreen}
                options={{
                    title: 'All Medicines', 
                    headerShown:true,
                }}
            />
            
            <Stack.Screen
                name="GenericMedicineName"
                component={GenericMedicineName}
                options={({ route }) => ({ title: route.params.title, headerShown:true })}
            />

            <Stack.Screen
                name="MedicineDetailsScreen"
                component={MedicineDetailsScreen}
                options={({ route }) => ({ 
                    title: route.params.title, 
                    headerShown:true,
                    // headerRight:() => (
                    //     <TouchableOpacity 
                    //         style={{
                    //             padding:8,
                    //             backgroundColor:'#3AAD94',
                    //             borderRadius:5,
                    //             marginHorizontal:16
                    //         }}
                    //         onPress={() => console.log('med-pressed')}
                    //     >
                    //         <FontAwesome5 name="exchange-alt" size={16} color="#fff"/>
                    //     </TouchableOpacity>
                    // )
                })}
            />

            <Stack.Screen
                name="ClassTypeScreen"
                component={ClassTypeScreen}
                options={({ route }) => ({ title: route.params.title, headerShown:true })}
            />
  

            <Stack.Screen
                name="ClassDetailsScreen"
                component={ClassDetailsScreen}
                options={{
                    title: "Generic List", 
                    headerShown:true 
                }}
            />
  
      </Stack.Navigator>
    );
};


export default MedicineRoutes;