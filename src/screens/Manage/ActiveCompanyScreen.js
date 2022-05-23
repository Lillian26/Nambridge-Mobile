import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, TextInput, StatusBar, Alert, LogBox } from 'react-native';
// import Icon from '../../components/common/Icon';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/theme/colors';
import * as Animatable from 'react-native-animatable';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';
import { useSelector } from "react-redux";
import ActionButton from 'react-native-action-button';
import actuatedNormalize from '../../helpers/actuatedNormalize';
import Iconsp from "react-native-vector-icons/SimpleLineIcons";
import { Menu, Divider, Provider } from 'react-native-paper';

const ActiveCompanyScreen = ({ navigation }) => {
  const company = useSelector((state) => state.company);

  const [editMode, setEditMode] = useState(false);
  const [visible, setVisible] = useState(false);

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

  useEffect(() => {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    const unsubscribe = navigation.addListener('focus', () => {
      if(company.companyName){
        setEditMode(false)
      }
    })
  
    return unsubscribe
  }, [company])

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <>
      <StatusBar backgroundColor='#f1f3f2' barStyle="dark-content" />
      {company.companyName ?
      <>
        <ScrollView style={{ padding: 4 }}>

          {company.companyName &&
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Text style={[{ paddingTop: 45, paddingBottom: 20, fontSize: 20, fontWeight: 'bold', color: '#333333', textTransform: 'capitalize' }]}>
                {company.companyName}</Text>
              <Provider>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginLeft: 50,
                  marginBottom: visible ? 100 : 0, 
                  marginTop: visible ? -20 : 30
                }}>
                  <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<TouchableOpacity style={{ backgroundColor: '#f5f7fa', padding: 5, marginVertical: visible ? 50 : 0, borderRadius: 5 }} onPress={openMenu}>
                      <Iconsp name="options-vertical" size={22} color="#017eff" />
                    </TouchableOpacity>}>
                    <Menu.Item onPress={() => { closeMenu(); setEditMode(true) }} icon="file-document-edit-outline" title="Edit Company" />
                    <Divider />
                    <Menu.Item onPress={() => {
                      closeMenu(); Alert.alert('Delete', 'This company will be deleted.', [{ text: 'Continue', onPress: () => { alert('Archived!'); navigation.goBack() } },
                      { text: 'Cancel', onPress: () => { } }])
                    }} icon="trash-can-outline" title="Delete Company" />
                  </Menu>
                </View>
              </Provider>
            </View>}

          <View style={[styles.inputView, { paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>Date of Incorporation:</Text>
            <TextInput
              value={incoporationDate}
              onChangeText={setIncoporationDate}
              style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={styles.separator}></View>

          <View style={[styles.inputView, { paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>Location of Original Certificate:</Text>
            <TextInput
              value={orignlCertLocation}
              onChangeText={setOrignlCertLocation}
              style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={styles.separator}></View>

          <View >
            <Text style={editMode ? [styles.cardTitleActive, { paddingTop: 15, paddingBottom: 10 } ]:[ styles.cardTitle, { paddingTop: 15, paddingBottom: 10 }]}>Change of Name:</Text>

            <View style={[styles.inputView]}>
              <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>Date of Change of Name:</Text>
              <TextInput
                value={orignlCertLocation}
                onChangeText={setNameChangeDate}
                style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
              </TextInput>
            </View>
            <View style={[styles.inputView, { marginTop: 10 }]}>
              <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>Location of Original Certificate of Change of Name:</Text>
              <TextInput
                value={orignlCertNameChange}
                onChangeText={setOrignlCertNameChange}
                style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
              </TextInput>
            </View>
          </View>
          <View style={styles.separator}></View>
          <View style={[styles.inputView, { paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>Registration Number:</Text>
            <TextInput
              value={registNo}
              onChangeText={setRegistNo}
              style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={styles.separator}></View>

          <View >
            <Text style={editMode ? [styles.cardTitleActive, { paddingTop: 15, paddingBottom: 10 } ]:[ styles.cardTitle, { paddingTop: 15, paddingBottom: 10 }]}>TAX:</Text>

            <View style={[styles.inputView]}>
              <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>Tax Identification Number:</Text>
              <TextInput
                value={taxIDNo}
                onChangeText={setTaxIDNo}
                style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
              </TextInput>
            </View>
            <View style={[styles.inputView, { marginTop: 10 }]}>
              <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>Location of Original Certificate:</Text>
              <TextInput
                value={orignlCertTax}
                onChangeText={setOrignlCertTax}
                style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
              </TextInput>
            </View>
          </View>
          <View style={styles.separator}></View>


          <View >
            <Text style={editMode ? [styles.cardTitleActive, { paddingTop: 15, paddingBottom: 10 } ]:[ styles.cardTitle, { paddingTop: 15, paddingBottom: 10 }]}>Social Security:</Text>

            <View style={[styles.inputView]}>
              <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>National Social Security Registration Number:</Text>
              <TextInput
                value={nssfNo}
                onChangeText={setNssfNo}
                style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
              </TextInput>
            </View>
            <View style={[styles.inputView, { marginTop: 10 }]}>
              <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>Location of Original Certificate:</Text>
              <TextInput
                value={orignlCertNSSF}
                onChangeText={setOrignlCertNSSF}
                style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
              </TextInput>
            </View>
          </View>
          <View style={styles.separator}></View>

          <View style={[styles.inputView, { paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>Trade Licence Company Identification Number:</Text>
            <TextInput
              value={tradeLicenseCINo}
              onChangeText={setTradeLicenseCINo}
              style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={styles.separator}></View>

          <View style={[styles.inputView, { paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>Immigration Identification Number:</Text>
            <TextInput
              value={immigrationIDNo}
              onChangeText={setImmigrationIDNo}
              style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <View style={styles.separator}></View>

          <View >
            <Text style={editMode ? [styles.cardTitleActive, { paddingTop: 15, paddingBottom: 10 } ]:[ styles.cardTitle, { paddingTop: 15, paddingBottom: 10 }]}>Issued Share Capital and Increase in Share Capital:</Text>

            <View style={[styles.inputView]}>
              <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>Date of Increase in Share Capital:</Text>
              <TextInput
                value={shareIncrseCapitalDate}
                onChangeText={setShareIncrseCapitalDate}
                style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
              </TextInput>
            </View>
            <View style={[styles.inputView, { marginTop: 10 }]}>
              <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>Particulars of the Increase:</Text>
              <TextInput
                value={incrseParticulars}
                onChangeText={setIncrseParticulars}
                style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
              </TextInput>
            </View>
            <View style={[styles.inputView, { marginTop: 10 }]}>
              <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>Date of Filed Resolutions and Forms:</Text>
              <TextInput
                value={filedResolnsDate}
                onChangeText={setFiledResolnsDate}
                style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
              </TextInput>
            </View>
            <View style={[styles.inputView, { marginTop: 10 }]}>
              <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>Location of Filed Resolutions and Forms:</Text>
              <TextInput
                value={filedResolnsLocatn}
                onChangeText={setFiledResolnsLocatn}
                style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
              </TextInput>
            </View>
          </View>
          <View style={styles.separator}></View>

          <View style={[styles.inputView, { paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleActive : styles.cardTitle}>Company Seal location:</Text>
            <TextInput
              value={sealLocation}
              onChangeText={setSealLocation}
              style={editMode ? styles.textInputActive : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={editMode ? styles.separator : [styles.separator, {marginBottom: actuatedNormalize(40)}]}></View>

          {editMode ? <View style={styles.button}>
            <TouchableOpacity onPress={() => { if(editMode){setEditMode(false)}; navigation.navigate('Home')}} style={[{
              borderColor: 'rgba(118,121,116, .8)',
              borderWidth: .3,
            }, styles.buttons]}>
              <Text style={{ color: colors.button, alignSelf: 'center' }}>{`Cancel`}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {alert('Saved!'); if(editMode){setEditMode(false)}; navigation.navigate('Home') }} style={[{ backgroundColor: colors.button }, styles.buttons]}>
              <Text style={{ color: '#fff', alignSelf: 'center' }}>{`Save`}</Text>
            </TouchableOpacity>
          </View> : null}
        </ScrollView>
      </>
      :
        <Text style={[{ paddingTop: 20, fontSize: 16, color: '#333333', alignSelf: 'center' }]}>
          No company Selected</Text>}
    </>
  );
};

export default ActiveCompanyScreen;

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
    color: "grey",
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  actionButtonIcon2: {
    fontSize: 25,
    height: 28,
    color: 'white',
  },
  separator: {
    borderRadius: 2, borderWidth: 1, borderStyle: 'dotted',
    borderColor: colors.button, marginBottom: 10,
  },
  // textInputEdit: {
  //   marginHorizontal: 10,
  //   marginVertical: 3,
  //   fontSize: 16,
  //   borderColor: 'rgba(118,121,116, .3)',
  //   borderWidth: .3,
  //   borderRadius: 1,
  //   paddingLeft: 15,
  //   paddingBottom: 5,
  //   color: '#333333'
  // },
  // textInput: {
  //   marginHorizontal: 10,
  //   // marginVertical: 3,
  //   fontSize: 16,
  //   borderColor: 'rgba(118,121,116, .1)',
  //   borderBottomWidth: .1,
  //   borderRadius: 1,
  //   // paddingLeft: 15,
  //   paddingBottom: 0,
  //   color: '#333333',
  //   // fontWeight: '700'
  // },
});