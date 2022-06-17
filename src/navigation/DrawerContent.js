import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Image, Alert } from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';

import Icon from '../components/common/Icon';

import { AuthContext } from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';
import actuatedNormalize from '../helpers/actuatedNormalize';
import { useDispatch } from "react-redux";
import { clearcompany } from "../store/slices/activeCompSlice";
import colors from '../assets/theme/colors';

export function DrawerContent(props) {

  const dispatch = useDispatch();
  const { signOut } = React.useContext(AuthContext);

  const menuItems = [
    {
      icon: <Icon type="materialCommunity" size={17} name="folder-table" color ="#f1f3f2" />,
      name: 'Home',
      // name: <Text style={{color: "#f1f3f2"}}>Home</Text>,
      onPress: () => {
        props.navigation.navigate('Home');
      },
    },
    {
      icon: <Icon type="fontisto" size={17} name="player-settings" color ="#f1f3f2"/>,
      name: 'Manage',
      onPress: () => {
        props.navigation.navigate('Manage');
      },
    },
    {
      icon: <Icon type="fa5" size={17} name="user-alt" color ="#f1f3f2"/>,
      name: 'Profile',
      onPress: () => {
        props.navigation.navigate('Profile');
      },
    },
    {
      icon: <Icon type="materialCommunity" size={17} name="logout" color ="#f1f3f2"/>,
      name: 'Logout',
      onPress: () => {
        Alert.alert('Confirm Logout', 'You will be signed out.', [{text: 'Continue', onPress: ()=>{
          dispatch(clearcompany())
          signOut()}},
        {text: 'Cancel', onPress: ()=> {}}])
      },
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView style={styles.container2}>
        <View 
        style={styles.logoImage}>
        <Image
          height={70}
          width={70}
          source={require('../assets/ic_launcher_adaptive_fore.png')}
          style={{ height: undefined, width: undefined, flex: 1}}
          resizeMode="contain"
        />
        </View>
        <View style={{ paddingHorizontal: 7 }}>
          {menuItems.map(({ name, icon, onPress }) => (
            <Drawer.Section style={styles.drawerSection} key={name}>
              <DrawerItem 
                icon={({ color, size }) => (
                  <View style={styles.icon}>{icon}</View>
                )}
                label={()=>(<Text style={{color: '#f1f3f3'}}>{name}</Text>)}
                onPress={onPress}
              />
            </Drawer.Section>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container2: {
    padding: 0,
    backgroundColor: "#4d505b",
    // backgroundColor: "#f1f3f2",
    height: "100%"
  },
  logoImage: {
    height: actuatedNormalize(80),
    width: actuatedNormalize(80),
    alignSelf: 'center',
    marginTop: 50,
  },
  drawerContent: {
    flex: 1,
    // backgroundColor: '#f1f3f2'
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: colors.button,
    borderTopWidth: 1
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
