import React, { useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';
import Icon from '../components/common/Icon';
import colors from '../assets/theme/colors';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import Iconb from "react-native-vector-icons/Ionicons";

//state, hooks for function based

const ManageScreen = ({ navigation }) => {

  const [incoporationDate, setIncoporationDate] = useState('');
  const [orignlCertLocation, setOrignlCertLocation] = useState('');
  const [nameChangeDate, setNameChangeDate] = useState('');
  const [orignlCertNameChange, setOrignlCertNameChange] = useState('');
  const [registNo, setRegistNo] = useState('');
  const [taxIDNo, setTaxIDNo] = useState('');
  const [orignlCertTax, setOrignlCertTax] = useState('');
  const [nssfNo, setNssfNo] = useState('');
  const [tradeLicenseCINo, setTradeLicenseCINo] = useState('');
  const [shareIncrseCapital, setShareIncrseCapital] = useState('');
  const [incrseParticulars, setIncrseParticulars] = useState('');
  const [filedResolnsDate, setFiledResolnsDate] = useState('');
  const [filedResolnsLocatn, setFiledResolnsLocatn] = useState('');
  const [sealLocation, setSealLocation] = useState('');


  return (
    <>
      <StatusBar backgroundColor='#f1f3f2' barStyle="dark-content" />
      <ScrollView style={{ padding: 4 }}>
      <Text style={[{paddingTop: 20, fontSize: 16, color: '#333333', textDecorationLine: 'underline', textTransform: 'capitalize', alignSelf: 'center'}]}>Key Company Particulars</Text>

      <View style={[styles.inputView, {paddingTop: 15}]}>
      <Text style={styles.cardTitle}>Date of Incorporation:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>
      <View style={styles.separator}></View>

      <View style={[styles.inputView , {paddingTop: 15}]}>
      <Text style={styles.cardTitle}>Location of Original Certificate:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>
      <View style={styles.separator}></View>

      {/* <View style={[styles.inputView , {paddingTop: 15}]}>
      <Text style={styles.cardTitle}>Date of Entry as Member (Shareholder):</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View> 
      <View style={styles.separator}></View>
      */}

      <View >
      <Text style={[styles.cardTitle, {paddingTop: 15, paddingBottom: 10}]}>Change of Name:</Text>

      <View style={[styles.inputView]}>
      <Text style={styles.cardTitle}>Date of Change of Name:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>
      <View style={[styles.inputView, { marginTop:10}]}>
      <Text style={styles.cardTitle}>Location of Original Certificate of Change of Name:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>
      </View>
      <View style={styles.separator}></View>
      <View style={[styles.inputView , {paddingTop: 15}]}>
      <Text style={styles.cardTitle}>Registration Number:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>
      <View style={styles.separator}></View>

      <View >
      <Text style={[styles.cardTitle, {paddingTop: 15, paddingBottom: 10}]}>TAX:</Text>

      <View style={[styles.inputView]}>
      <Text style={styles.cardTitle}>Tax Identification Number:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>
      <View style={[styles.inputView, { marginTop:10}]}>
      <Text style={styles.cardTitle}>Location of Original Certificate:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>
      </View>
      <View style={styles.separator}></View>

      <View >
      <Text style={[styles.cardTitle, {paddingTop: 15, paddingBottom: 10}]}>Social Security:</Text>

      <View style={[styles.inputView]}>
      <Text style={styles.cardTitle}>National Social Security Registration Number:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>
      <View style={[styles.inputView, { marginTop:10}]}>
      <Text style={styles.cardTitle}>Location of Original Certificate:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>
      </View>
      <View style={styles.separator}></View>

      <View style={[styles.inputView, {paddingTop: 15}]}>
      <Text style={styles.cardTitle}>Trade Licence Company Identification Number:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>
      <View style={styles.separator}></View>

      <View style={[styles.inputView, {paddingTop: 15}]}>
      <Text style={styles.cardTitle}>Immigration Identification Number:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>

      <View style={styles.separator}></View>

      <View >
      <Text style={[styles.cardTitle, {paddingTop: 15, paddingBottom: 10}]}>Issued Share Capital and Increase in Share Capital:</Text>

      <View style={[styles.inputView]}>
      <Text style={styles.cardTitle}>Date of Increase in Share Capital:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>
      <View style={[styles.inputView, { marginTop:10}]}>
      <Text style={styles.cardTitle}>Particulars of the Increase:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>
      <View style={[styles.inputView, { marginTop:10}]}>
      <Text style={styles.cardTitle}>Date of Filed Resolutions and Forms:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>
      <View style={[styles.inputView, { marginTop:10}]}>
      <Text style={styles.cardTitle}>Location of Filed Resolutions and Forms:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>
      </View>
      <View style={styles.separator}></View>

      <View style={[styles.inputView, {paddingTop: 15}]}>
      <Text style={styles.cardTitle}>Company Seal location:</Text>
      <TextInput
          onChangeText={(val) => {}}
          style={styles.textInput}>
        </TextInput>
      </View>
      <View style={styles.separator}></View>

      <View style={styles.button}>
        <TouchableOpacity onPress={() => { }} style={[{borderColor: 'rgba(118,121,116, .8)',
    borderWidth: .3,},styles.buttons]}>
          <Text style={{ color: '#268d9c', alignSelf: 'center' }}>{`Cancel`}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { }} style={[{backgroundColor: '#268d9c'}, styles.buttons]}>
          <Text style={{ color: '#fff', alignSelf: 'center' }}>{`Save`}</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={() => {
          navigation.navigate('CreateAdvert2');
        }}>
        <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
          <Icon name="edit" size={25} color={colors.white} />
        </Animatable.View>
      </TouchableOpacity>
    </>
  );
};

export default ManageScreen;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    margin: 10,
    height: '100%',
  },
  textInput: {
    paddingLeft: 15,
    marginHorizontal: 10,
    // marginVertical: 3,
    fontSize: 16,
    borderColor: 'rgba(118,121,116, .3)',
    borderBottomWidth: .3,
    borderRadius: 1,
    paddingLeft: 15,
    color: '#333333',
    paddingBottom: 5
  },
  textInputActive: {
    paddingLeft: 15,
    marginHorizontal: 10,
    // marginVertical: 3,
    fontSize: 16,
    borderColor: 'rgba(118,121,116, .3)',
    borderBottomWidth: .3,
    borderRadius: 1,
    paddingLeft: 15,
    color: '#333333',
    paddingBottom: 0
  },
  textPhoto: {
    fontSize: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 150,
    width: '40%'
  },
  action3: {
    paddingTop: 5,
    borderBottomColor: '#dedede',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  action2: {
    paddingTop: 10,
  },
  chooseText: {
    color: colors.primary,
    textAlign: 'center',
  },
  cardTitle: {
    color: "#333333",
    // fontWeight: '700',
    paddingLeft: 10,
    // paddingBottom: 5,
    fontSize: 16,
  },
  cardTitleActive: {
    color: "#333333",
    // fontWeight: '700',
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
  },
  cardHeader: {
    //   paddingVertical: 0
  },
  featuredPhoto: {
    flexDirection: 'row',
    borderStyle: 'dashed',
    marginBottom: 10,
    borderColor: 'rgba(118,121,116, .3)',
    marginHorizontal: 10,
    borderWidth: .3,
    borderRadius: 1,
  },
  button: {
    marginVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  textSign: {
    fontWeight: 'bold',
  },
  buttons:{
    paddingVertical: 12,
    borderRadius: 50,
     width: 130,
  },
  textInput2: {
    paddingLeft: 15,
    fontSize: 16,
  },

  floatingActionButton: {
    backgroundColor: colors.button,
    width: 55,
    height: 55,
    position: 'absolute',
    bottom: 45,
    right: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
  separator: {
    borderRadius: 2, borderWidth: 1, borderStyle: 'dotted',
    borderColor: '#268d9c', marginBottom: 10,
  }
});