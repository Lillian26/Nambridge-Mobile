// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import Iconb from "react-native-vector-icons/Ionicons";
import ProfileScreen from "../screens/profile/ProfileScreen2";
import CreateAdvert2 from "../screens/CreateAdvert2";

import PublishedScreen from "../screens/Adverts/Published";
import DraftsScreen from "../screens/Adverts/Drafts";

import 'react-native-gesture-handler';
import {
  createMaterialTopTabNavigator
} from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: '#F8F8F8',
        style: {
          backgroundColor: '#268d9c',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#e89188',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Published',
          // tabBarIcon: ({ color, size }) => (
          //   <MaterialCommunityIcons
          //       name="home"
          //       color={color}
          //       size={size}
          //     />
          // ),
        }}  />
      <Tab.Screen
        name="DraftsScreen"
        component={DraftsScreen}
        options={{
          tabBarLabel: 'Drafts',
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
      backgroundColor: '#268d9c',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '600',
      fontSize: 19,
      left: '-8%',
      alignSelf: 'center'
    }
  }}>
    <Stack.Screen
          name="Home"
          component={TabStack}
          options={{ title: 'Articles',
          headerLeft: () => (
            <Icon.Button name="bars" size={20} backgroundColor="#268d9c"
              onPress={() => navigation.openDrawer()} />
          ),
          headerRight: () => (
            <Iconb.Button name="chatbubbles-outline" size={22} backgroundColor="#268d9c"
              onPress={() => {}} />
          ) }}
        />
    {/* <Stack.Screen name="Home" component={HomeScreen} options={{
      title: 'Articles',
      headerLeft: () => (
        <Icon.Button name="bars" size={20} backgroundColor="#268d9c"
          onPress={() => navigation.openDrawer()} />
      ),
      headerRight: () => (
        <Iconb.Button name="chatbubbles-outline" size={22} backgroundColor="#268d9c"
          onPress={() => {}} />
      )
    }} /> */}

    <Stack.Screen name="CreateAdvert2" component={CreateAdvert2} options={{
      title: 'Article Post'
    }} />

    <Stack.Screen name="Profile" component={ProfileScreen} options={{
      title: 'Settings',
      headerRight: () => (
        <Iconb.Button name="chatbubbles-outline" size={22} backgroundColor="#268d9c"
          onPress={() => {}} />
      ) 
    }} />


  </Stack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => (
  <Stack.Navigator screenOptions={{
    headerStyle: {
      backgroundColor: '#268d9c',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }}>
    <Stack.Screen name="Profile" component={ProfileScreen} options={{
      headerLeft: () => (
        <Icon.Button name="bars" size={25} backgroundColor="#268d9c"
          onPress={() => navigation.openDrawer()} />
      ),
    }} />
  </Stack.Navigator>
);

// const EarnStackScreen = ({ navigation }) => (
//     <Stack.Navigator screenOptions={{
//         headerStyle: {
//             backgroundColor: '#268d9c',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//             fontWeight: 'bold'
//         }
//     }}>
//         <Stack.Screen name="Earn" component={EarnScreen} options={{
//             headerLeft: () => (
//                 <Icon.Button name="ios-menu" size={25} backgroundColor="#268d9c"
//                     onPress={() => navigation.openDrawer()} />
//             ),
//             // headerShown: false,
//         }} />
//     </Stack.Navigator>
// );


export { HomeStackScreen, ProfileStackScreen };
