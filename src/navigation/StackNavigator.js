// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import ProfileScreen from "../screens/profile/ProfileScreen";
import CreateAdvert from "../screens/CreateAdvert";

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
      backgroundColor: '#5b2c90',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      // fontWeight: 'bold'
    }
  }}>
    <Stack.Screen name="Home" component={HomeScreen} options={{
      title: 'Announcements',
      headerLeft: () => (
        <Icon.Button name="bars" size={20} backgroundColor="#5b2c90"
          onPress={() => navigation.openDrawer()} />
      )
    }} />

    <Stack.Screen name="CreateAdvert" component={CreateAdvert} options={{
      title: 'Create Advert'
    }} />

    <Stack.Screen name="Profile" component={ProfileScreen} options={{
      title: 'Profile',
      headerShown: false,
    }} />


  </Stack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#5b2c90',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <Stack.Screen name="Profile" component={ProfileScreen} options={{
      headerLeft: () => (
        <Icon.Button name="bars" size={25} backgroundColor="#5b2c90"
          onPress={() => navigation.openDrawer()} />
      ),
      headerShown: false,
    }} />
  </Stack.Navigator>
);

// const EarnStackScreen = ({ navigation }) => (
//     <Stack.Navigator screenOptions={{
//         headerStyle: {
//             backgroundColor: '#5b2c90',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//             fontWeight: 'bold'
//         }
//     }}>
//         <Stack.Screen name="Earn" component={EarnScreen} options={{
//             headerLeft: () => (
//                 <Icon.Button name="ios-menu" size={25} backgroundColor="#5b2c90"
//                     onPress={() => navigation.openDrawer()} />
//             ),
//             // headerShown: false,
//         }} />
//     </Stack.Navigator>
// );


export { HomeStackScreen, ProfileStackScreen };
