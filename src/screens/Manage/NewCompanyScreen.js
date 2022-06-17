import React, { useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, StatusBar } from 'react-native';
import Icon from '../../components/common/Icon';
import colors from '../../assets/theme/colors';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';

const NewCompanyScreen = ({ navigation }) => {

  const [incoporationDate, setIncoporationDate] = useState('');
  const [orignlCertLocation, setOrignlCertLocation] = useState('');
  const [nameChangeDate, setNameChangeDate] = useState('');
  const [orignlCertNameChange, setOrignlCertNameChange] = useState('');
  const [registNo, setRegistNo] = useState('');
  const [taxIDNo, setTaxIDNo] = useState('');
  const [orignlCertTax, setOrignlCertTax] = useState('');
  const [nssfNo, setNssfNo] = useState('');
  const [orignlCertNSSF, setOrignlCertNSSF] = useState('');
  const [tradeLicenseCINo, setTradeLicenseCINo] = useState('');
  const [immigrationIDNo, setImmigrationIDNo] = useState('');
  const [shareIncrseCapitalDate, setShareIncrseCapitalDate] = useState('');
  const [incrseParticulars, setIncrseParticulars] = useState('');
  const [filedResolnsDate, setFiledResolnsDate] = useState('');
  const [filedResolnsLocatn, setFiledResolnsLocatn] = useState('');
  const [sealLocation, setSealLocation] = useState('');

  return (
    <>
      <StatusBar backgroundColor='#4d505b' barStyle="light-content" />
      <ScrollView style={{ padding: 4 }}>
        <Text style={[{ paddingTop: 20, fontSize: 16, color: '#333333', textDecorationLine: 'underline', textTransform: 'capitalize', alignSelf: 'center' }]}>Key Company Particulars</Text>

        <View style={[styles.inputView, { paddingTop: 15 }]}>
          <Text style={styles.cardTitle}>Date of Incorporation:</Text>
          <TextInput
            value={incoporationDate}
            onChangeText={setIncoporationDate}
            style={styles.textInput}>
          </TextInput>
        </View>
        <View style={styles.separator}></View>

        <View style={[styles.inputView, { paddingTop: 15 }]}>
          <Text style={styles.cardTitle}>Location of Original Certificate:</Text>
          <TextInput
            value={orignlCertLocation}
            onChangeText={setOrignlCertLocation}
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
          <Text style={[styles.cardTitle, { paddingTop: 15, paddingBottom: 10 }]}>Change of Name:</Text>

          <View style={[styles.inputView]}>
            <Text style={styles.cardTitle}>Date of Change of Name:</Text>
            <TextInput
              value={orignlCertLocation}
              onChangeText={setNameChangeDate}
              style={styles.textInput}>
            </TextInput>
          </View>
          <View style={[styles.inputView, { marginTop: 10 }]}>
            <Text style={styles.cardTitle}>Location of Original Certificate of Change of Name:</Text>
            <TextInput
              value={orignlCertNameChange}
              onChangeText={setOrignlCertNameChange}
              style={styles.textInput}>
            </TextInput>
          </View>
        </View>
        <View style={styles.separator}></View>
        <View style={[styles.inputView, { paddingTop: 15 }]}>
          <Text style={styles.cardTitle}>Registration Number:</Text>
          <TextInput
            value={registNo}
            onChangeText={setRegistNo}
            style={styles.textInput}>
          </TextInput>
        </View>
        <View style={styles.separator}></View>

        <View >
          <Text style={[styles.cardTitle, { paddingTop: 15, paddingBottom: 10 }]}>TAX:</Text>

          <View style={[styles.inputView]}>
            <Text style={styles.cardTitle}>Tax Identification Number:</Text>
            <TextInput
              value={taxIDNo}
              onChangeText={setTaxIDNo}
              style={styles.textInput}>
            </TextInput>
          </View>
          <View style={[styles.inputView, { marginTop: 10 }]}>
            <Text style={styles.cardTitle}>Location of Original Certificate:</Text>
            <TextInput
              value={orignlCertTax}
              onChangeText={setOrignlCertTax}
              style={styles.textInput}>
            </TextInput>
          </View>
        </View>
        <View style={styles.separator}></View>

        <View >
          <Text style={[styles.cardTitle, { paddingTop: 15, paddingBottom: 10 }]}>Social Security:</Text>

          <View style={[styles.inputView]}>
            <Text style={styles.cardTitle}>National Social Security Registration Number:</Text>
            <TextInput
              value={nssfNo}
              onChangeText={setNssfNo}
              style={styles.textInput}>
            </TextInput>
          </View>
          <View style={[styles.inputView, { marginTop: 10 }]}>
            <Text style={styles.cardTitle}>Location of Original Certificate:</Text>
            <TextInput
              value={orignlCertNSSF}
              onChangeText={setOrignlCertNSSF}
              style={styles.textInput}>
            </TextInput>
          </View>
        </View>
        <View style={styles.separator}></View>

        <View style={[styles.inputView, { paddingTop: 15 }]}>
          <Text style={styles.cardTitle}>Trade Licence Company Identification Number:</Text>
          <TextInput
            value={tradeLicenseCINo}
            onChangeText={setTradeLicenseCINo}
            style={styles.textInput}>
          </TextInput>
        </View>
        <View style={styles.separator}></View>

        <View style={[styles.inputView, { paddingTop: 15 }]}>
          <Text style={styles.cardTitle}>Immigration Identification Number:</Text>
          <TextInput
            value={immigrationIDNo}
            onChangeText={setImmigrationIDNo}
            style={styles.textInput}>
          </TextInput>
        </View>

        <View style={styles.separator}></View>

        <View >
          <Text style={[styles.cardTitle, { paddingTop: 15, paddingBottom: 10 }]}>Issued Share Capital and Increase in Share Capital:</Text>

          <View style={[styles.inputView]}>
            <Text style={styles.cardTitle}>Date of Increase in Share Capital:</Text>
            <TextInput
              value={shareIncrseCapitalDate}
              onChangeText={setShareIncrseCapitalDate}
              style={styles.textInput}>
            </TextInput>
          </View>
          <View style={[styles.inputView, { marginTop: 10 }]}>
            <Text style={styles.cardTitle}>Particulars of the Increase:</Text>
            <TextInput
              value={incrseParticulars}
              onChangeText={setIncrseParticulars}
              style={styles.textInput}>
            </TextInput>
          </View>
          <View style={[styles.inputView, { marginTop: 10 }]}>
            <Text style={styles.cardTitle}>Date of Filed Resolutions and Forms:</Text>
            <TextInput
              value={filedResolnsDate}
              onChangeText={setFiledResolnsDate}
              style={styles.textInput}>
            </TextInput>
          </View>
          <View style={[styles.inputView, { marginTop: 10 }]}>
            <Text style={styles.cardTitle}>Location of Filed Resolutions and Forms:</Text>
            <TextInput
              value={filedResolnsLocatn}
              onChangeText={setFiledResolnsLocatn}
              style={styles.textInput}>
            </TextInput>
          </View>
        </View>
        <View style={styles.separator}></View>

        <View style={[styles.inputView, { paddingTop: 15 }]}>
          <Text style={styles.cardTitle}>Company Seal location:</Text>
          <TextInput
            value={sealLocation}
            onChangeText={setSealLocation}
            style={styles.textInput}>
          </TextInput>
        </View>
        <View style={styles.separator}></View>

        <View style={styles.button}>
          <TouchableOpacity onPress={() => { }} style={[{
            borderColor: 'rgba(118,121,116, .8)',
            borderWidth: .3,
          }, styles.buttons]}>
            <Text style={{ color: colors.button, alignSelf: 'center' }}>{`Cancel`}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { }} style={[{ backgroundColor: colors.button }, styles.buttons]}>
            <Text style={{ color: '#fff', alignSelf: 'center' }}>{`Save`}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default NewCompanyScreen;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    margin: 10,
    height: '100%',
  },
  textInput: {
    paddingLeft: 15,
    marginHorizontal: 10,
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
  buttons: {
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
    borderColor: colors.button, marginBottom: 10,
  }
});