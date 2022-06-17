import React, { useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, StatusBar, SafeAreaView, FlatList } from 'react-native';
import Icon from '../components/common/Icon';
import colors from '../assets/theme/colors';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import Iconb from "react-native-vector-icons/Ionicons";
import Registers from '../model/registers';
import actuatedNormalize from '../helpers/actuatedNormalize';

const NotFound = ({ navigation }) => {

  return (
    <>
      <StatusBar backgroundColor='#4d505b' barStyle="light-content" />
      <View
        style={[{ alignItems: 'center', paddingTop: actuatedNormalize(50) }]}
      >
        <Text style={{fontSize: 28, color: 'gray'}}>404.</Text>
        <Text style={{fontSize: 16, marginTop: 20}}>This function is under implementation.</Text>
      </View>
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => {navigation.goBack()}}
        >
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          {/* <Icon name="plus" size={25} color={colors.white} /> */}
          <Text style={{color: colors.white, fontWeight: 'bold'}}>Go Back</Text>
        </Animatable.View>
      </TouchableOpacity>
    </>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  floatingActionButton: {
    backgroundColor: colors.button,
    width: 75,
    height: 55,
    position: 'absolute',
    bottom: 60,
    right: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  }
});
