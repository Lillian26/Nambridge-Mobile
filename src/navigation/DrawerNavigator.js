import React from "react";

import {createDrawerNavigator} from "@react-navigation/drawer";

import {DrawerContent} from './DrawerContent';
import {HomeStackScreen} from "./StackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="HomeDrawer" component={HomeStackScreen}/>
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;
