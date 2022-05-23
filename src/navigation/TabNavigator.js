import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from "../screens/HomeScreen";
// import Spend from "../screens/Spend";
// import Earn from "../screens/Earn";

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Home"
    // activeColor="#663300"
    activeColor="#014cff"
    barStyle={{ backgroundColor: '#fff' }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <Icon name="ios-home" color={color} size={26} />
        ),
      }}
    />
    {/* <Tab.Screen
            name="Spend"
            component={Spend}
            options={{
                tabBarLabel: 'Spend',
                tabBarIcon: ({color}) => (
                    <Icon name="ios-card" color={color} size={26}/>
                ),
            }}
        />
        <Tab.Screen
            name="Merchant"
            component={Earn}
            options={{
                tabBarLabel: 'Earn',
                tabBarIcon: ({color}) => (
                    <Icon name="ios-star" color={color} size={26}/>
                ),
            }}
        /> */}
  </Tab.Navigator>
);

export default TabNavigator;

