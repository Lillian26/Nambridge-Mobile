// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import Iconm from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileScreen from "../screens/ProfileScreen";
import RegisterOfShareHolders from "../screens/RegisterViews/RegisterOfShareHolders";
import MOShareHolders from "../screens/RegisterViews/MOShareHolders";
import RODirectors from "../screens/RegisterViews/RODirectors";
import RODInterest from "../screens/RegisterViews/RODirectors copy";
import RODsSHgParticulars from "../screens/RegisterViews/RODsSHgParticulars";
import MODirectors from "../screens/RegisterViews/MODirectors";
import ROSecretatries from "../screens/RegisterViews/ROSecretatries";
import ROMortgages from "../screens/RegisterViews/ROMortgages";
import ROBranches from "../screens/RegisterViews/ROBranches";
import RODebentures from "../screens/RegisterViews/RODebentures";
import CoSealRegister from "../screens/RegisterViews/CoSealRegister";
import ShareHoldersLedger from "../screens/RegisterViews/ShareHoldersLedger";
import CreateLedger from "../screens/RegisterViews/ShareHoldersLedger/createLedger";
import CompaniesScreen from "../screens/Manage/CompaniesScreen";
import ActiveCompanyScreen from "../screens/Manage/ActiveCompanyScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RegistersList from "../screens/RegistersList";
import NotFound from "../screens/NotFound";
import 'react-native-gesture-handler';
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
          tabBarLabel: 'All Companies'
        }} />
      <Tab.Screen
        name="ActiveCompany"
        component={ActiveCompanyScreen}
        options={{
          tabBarLabel: 'Active'
        }} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

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
        )
      }}
    />

    <Stack.Screen name="RegisterOfShareHolders" component={RegisterOfShareHolders} options={{
      title: '...'
    }} />

    <Stack.Screen name="MOShareHolders" component={MOShareHolders} options={{
      title: '...'
    }} />

    <Stack.Screen name="RODirectors" component={RODirectors} options={{
      title: '...'
    }} />

    <Stack.Screen name="RODInterest" component={RODInterest} options={{
      title: '...'
    }} />

    <Stack.Screen name="RODsSHgParticulars" component={RODsSHgParticulars} options={{
      title: '...'
    }} />

    <Stack.Screen name="MODirectors" component={MODirectors} options={{
      title: '...'
    }} />

    <Stack.Screen name="ROBranches" component={ROBranches} options={{
      title: '...'
    }} />

    <Stack.Screen name="ROSecretatries" component={ROSecretatries} options={{
      title: '...'
    }} />

    <Stack.Screen name="ROMortgages" component={ROMortgages} options={{
      title: '...'
    }} />

    <Stack.Screen name="RODebentures" component={RODebentures} options={{
      title: '...'
    }} />

    <Stack.Screen name="CoSealRegister" component={CoSealRegister} options={{
      title: '...'
    }} />

    <Stack.Screen name="ShareHoldersLedger" component={ShareHoldersLedger} options={{
      title: 'ShareHolders Ledger',
      headerRight: () => (
        <Iconm.Button name="folder-plus-outline" size={28} backgroundColor="#0165ff"
          onPress={() => {
            Alert.alert("Add New", "Proceed to create new Ledger",
              [{ text: 'Ok', onPress: () => navigation.navigate("CreateLedger") }, { text: 'Cancel', onPress: () => { } }])
          }} />
      )
    }} />

    <Stack.Screen name="CreateLedger" component={CreateLedger} options={{
      title: 'Create Ledger'
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

export { HomeStackScreen };
