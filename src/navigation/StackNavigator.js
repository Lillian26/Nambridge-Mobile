// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import Iconb from "react-native-vector-icons/Ionicons";
import Iconm from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterOfShareHolders from "../screens/RegisterViews/RegisterOfShareHolders";
import ShareHoldersLedger from "../screens/RegisterViews/ShareHoldersLedger";
import CompaniesScreen from "../screens/Manage/CompaniesScreen";
import ActiveCompanyScreen from "../screens/Manage/ActiveCompanyScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RegistersList from "../screens/RegistersList";
import NotFound from "../screens/NotFound";
import 'react-native-gesture-handler';
import Director from'../screens/RegisterViews/RegisterOfDirectors';
import RegisterDirectorInterest from'../screens/RegisterViews/RegisterDirectorsInterest'
import MinutesOfshareholder from '../screens/RegisterViews/ShareHoldersLedger/index';

import {
  createMaterialTopTabNavigator
} from '@react-navigation/material-top-tabs';
import { Alert } from "react-native";
import NewCompanyScreen from "../screens/Manage/NewCompanyScreen";

const Tab = createMaterialTopTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="AllCompanies"
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#0165ff',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#002255',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="AllCompanies"
        component={CompaniesScreen}
        options={{
          tabBarLabel: 'All Companies',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons
          //       name="home"
          //       color={color}
          //       size={size}
          //     />
          // ),
        }} />
      <Tab.Screen
        name="ActiveCompany"
        component={ActiveCompanyScreen}
        options={{
          tabBarLabel: 'Active',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons
          //       name="settings"
          //       color={color}
          //       size={size}
          //     />
          // ),
        }} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const HomeStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#0165ff',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '600',
      fontSize: 19,
      left: '-8%',
    }
  }}>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'Registers',
        headerLeft: () => (
          <Icon.Button name="bars" size={20} backgroundColor="#0165ff"
            onPress={() => navigation.openDrawer()} />
        ),
        // headerRight: () => (
        //   <Iconb.Button name="chatbubbles-outline" size={22} backgroundColor="#0165ff"
        //     onPress={() => {}} />
        // ) 
      }}
    />

    {/* <Stack.Screen name="Home" component={HomeScreen} options={{
      title: 'Articles',
      headerLeft: () => (
        <Icon.Button name="bars" size={20} backgroundColor="#0165ff"
          onPress={() => navigation.openDrawer()} />
      ),
      headerRight: () => (
        <Iconb.Button name="chatbubbles-outline" size={22} backgroundColor="#0165ff"
          onPress={() => {}} />
      )
    }} /> */}

    <Stack.Screen name="RegisterOfShareHolders" component={RegisterOfShareHolders} options={{
      title: '...'
    }} />
    
    <Stack.Screen name="Director" component={Director} options={{
      title: '...'
    }} />
     
     <Stack.Screen name="RegisterDirectorInterest" component={RegisterDirectorInterest} options={{
      title: '...'
    }} />


    <Stack.Screen name="MinutesOfshareholder" component={MinutesOfshareholder} options={{
      title: 'ShareHolders Ledger',
      headerRight: () => (
        <Iconm.Button name="folder-plus-outline" size={28} backgroundColor="#0165ff"
          onPress={() => {
            Alert.alert("Add New", "Proceed to create new Ledger",
              [{ text: 'Ok', onPress: () => navigation.navigate("CreateLedger") }, { text: 'Cancel', onPress: () => { } }])
          }} />
      )
    }} />

    <Stack.Screen name="NotFound" component={NotFound} options={{
      title: 'Nambridge Feature'
    }} />

    <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{
      title: '...'
    }} />

    <Stack.Screen name="RegistersList" component={RegistersList} options={{
      title: 'List of Registers'
    }} />

    <Stack.Screen name="Profile" component={ProfileScreen} options={{
      title: 'Board Secretary'
    }} />
    <Stack.Screen
      name="Manage"
      component={TabStack}
      options={{
        title: 'Manage',
        headerLeft: () => (
          <Icon.Button name="bars" size={20} backgroundColor="#0165ff"
            onPress={() => navigation.openDrawer()} />
        ),
        headerRight: () => (
          <Iconm.Button name="newspaper-plus" size={22} backgroundColor="#0165ff"
            onPress={() => {
              Alert.alert("Add New", "Proceed to create new company",
                [{ text: 'Ok', onPress: () => navigation.navigate("NewCompany") }, { text: 'Cancel', onPress: () => { } }])
            }} />
        )
      }}
    />

    <Stack.Screen name="NewCompany" component={NewCompanyScreen} options={{
      title: 'Add a New Company'
    }} />

  </Stack.Navigator>
);

// const ManageStackScreen = ({ navigation }) => (
//   <Stack.Navigator screenOptions={{
//     headerStyle: {
//       backgroundColor: '#0165ff',
//     },
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//       fontWeight: 'bold'
//     }
//   }}>
//     <Stack.Screen
//       name="Manage"
//       component={TabStack}
//       options={{
//         title: 'Manage',
//         headerLeft: () => (
//           <Icon.Button name="bars" size={20} backgroundColor="#0165ff"
//             onPress={() => navigation.openDrawer()} />
//         ),
//         headerRight: () => (
//           <Iconb.Button name="plus" size={22} backgroundColor="#0165ff"
//             onPress={() => { }} />
//         )
//       }}
//     />
//   </Stack.Navigator>
// );

// const ProfileStackScreen = ({ navigation }) => (
//   <Stack.Navigator screenOptions={{
//     headerStyle: {
//       backgroundColor: '#0165ff',
//     },
//     headerTintColor: '#fff',
//     headerTitleStyle: {
//       fontWeight: 'bold'
//     }
//   }}>
//     <Stack.Screen name="Profile" component={ProfileScreen} options={{
//       headerLeft: () => (
//         <Icon.Button name="bars" size={25} backgroundColor="#0165ff"
//           onPress={() => navigation.openDrawer()} />
//       ),
//     }} />
//   </Stack.Navigator>
// );

// const EarnStackScreen = ({ navigation }) => (
//     <Stack.Navigator screenOptions={{
//         headerStyle: {
//             backgroundColor: '#0165ff',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//             fontWeight: 'bold'
//         }
//     }}>
//         <Stack.Screen name="Earn" component={EarnScreen} options={{
//             headerLeft: () => (
//                 <Icon.Button name="ios-menu" size={25} backgroundColor="#0165ff"
//                     onPress={() => navigation.openDrawer()} />
//             ),
//             // headerShown: false,
//         }} />
//     </Stack.Navigator>
// );


export { HomeStackScreen };
