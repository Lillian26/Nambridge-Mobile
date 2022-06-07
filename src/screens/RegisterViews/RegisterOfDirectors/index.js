import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar, LogBox, Image, TextInput, Alert } from 'react-native';
import colors from '../../../assets/theme/colors';
import DocumentPicker from 'react-native-document-picker';
import { Text } from 'native-base';
import Icona from "react-native-vector-icons/AntDesign";
import {   rODirectors } from '../../../model/records';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Iconsp from "react-native-vector-icons/SimpleLineIcons";
// import axios from "axios";
// import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from "react-native-picker-select";
import actuatedNormalize from '../../../helpers/actuatedNormalize';
import { formatTheDateLabel, defaultDate, formatTheDateText, strtransferDate } from "../../../helpers/helpers";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const RegisterDirectorsInterest = ({ route, navigation }) => {

  const { entryId, registerId } = route.params ?? {};

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [record, setRecord] = useState(null)
  const [director, setDirector] = useState("")
  const [directorAddress, setDirectorAddress] = useState("")
  const [dateOfEntry, setDateOfEntry] = useState(defaultDate);
  const [isDateOfEntryPickerVisible, setDateOfEntryPickerVisibility] = useState(false);
  const [certNo, setCertNo] = useState("")
  const [sharesNo, setSharesNo] = useState("")
  const [fromWhom, setFromWhom] = useState("")
  const [amtPaid, setAmtPaid] = useState("")
  const [transferDate, setTransferDate] = useState(defaultDate);
  const [isTransferDateVisible, setTransferDateVisibility] = useState(false);
  const [toWhom, setToWhom] = useState("")
  const [sharesTransfered, setSharesTransfered] = useState("")
  const [shareBalance, setShareBalance] = useState("")
  const [attachments, setAttachments] = useState([])
  const [visible, setVisible] = useState(false);
  const [transferType, setTransferType] = useState(null);
  const [transferFrom, setTransferFrom] = useState(null);
  const [originalIssue, setOriginalIssue] = useState(null);

  const showTransferDatePicker = () => {
    setTransferDateVisibility(true);
  };

  const hideTransferDatePicker = () => {
    setTransferDateVisibility(false);
  };

  const handleTransferConfirm = (e) => {
    hideTransferDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setTransferDate(defaultDate)
    }
    else {
      setTransferDate(date)
    }
  };

  const showDateOfEntryPicker = () => {
    setDateOfEntryPickerVisibility(true);
  };

  const hideDateOfEntryPicker = () => {
    setDateOfEntryPickerVisibility(false);
  };

  const handleDateOfEntryConfirm = (e) => {
    hideDateOfEntryPicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setDateOfEntry(defaultDate)
    }
    else {
      setDateOfEntry(date)
    }
  };

  useEffect(() => {
    if (entryId) {
      navigation.setOptionss({
        title: 'View Record',
      });
      getRecordDetails();
      if (editMode) {
        navigation.setOptions({
          title: 'Edit Record',
        });
      }
    } else {
      navigation.setOptions({
        title: 'Create New Record',
      });
      setEditMode(true)
    }

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    setLoading(false)
  }, [editMode, loading, transferType]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const getRecordDetails = () => {
    var theRecord = rODirectors.find(x => x.id == entryId);
    setRecord(theRecord);
    setDirector(theRecord.director);
    setDirectorAddress(theRecord.director_address);
    setDateBirth(new Date(theRecord.date_of_birth));
    setCertNo(theRecord.no_of_attachments);
    setNationality(theRecord.nationality);
    setFromWhom(theRecord.no_of_attachments);
    setAttachments(theRecord.no_of_attachments);
    setAmtPaid(theRecord.amount_paid);
    setTransferDate(new Date(theRecord.resignation_date));
    setToWhom(theRecord.to_whom);
    setSharesTransfered(theRecord.shares_transfered);
    setShareBalance(theRecord.shares_no_ordss);
    setTransferType(theRecord.transfer_type);
    if (theRecord.transfer_type == "original_issue") {setOriginalIssue(theRecord.original_issue)};
    if (theRecord.transfer_type == "from_someone") {setTransferFrom(theRecord.from_someone)};

    // getAttachments()

  }


  // TODO
  // submit + axios config + loading
  // Document attachment list component

  //*************************************************************picker and display , click link************************************************** */
  const selectOneFile = async (setFile) => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setFile(res);
    } catch (err) {
      //Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        //If user canceled the document selection
        alert('Action has been Canceled');
      } else {
        //For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const fetchRegister = () => {
    axios({
      url: "",
      method: 'post',
      headers: { "Content-Type": "application/json" },
      cookie: cookie,
      data: {
        "method": "getReports"
      }
    })
      .then(res => {
        if (!mountedRef.current) return null;

        if (res.data.status == "500") { signOut() }
        else {
          setReports(res.data.data);

          let thepR = null;
          thepR = res.data.data.find(x => x.priority == "1");
          setPriorityReport(thepR)
        }
      })
      .catch(function (error) {
        console.log("Report list Error caught: " + error);
        AsyncStorage.clear().then(() => { signOut() });
      });
  }

  const createSH = async () => {

    // alert('Saved!'); navigation.navigate('Home')
    Alert.alert("Saved!", "Proceed to add ledger?", [
      { text: 'Add Ledger', onPress: () => { navigation.navigate("RegisterDirectorInterest") } },
      { text: 'Cancel', onPress: () => { navigation.navigate('Home') } }])
  }

  return (
    <View style={{ flex: 1 }}>
      {loading ?
        <ActivityIndicator animating={loading} color="#268d9c" />
        :
        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 4 }}>
          <View style={{ padding: 4 }}>
            {!entryId ?
              <Text style={[styles.cardTitleEdit, { paddingTop: 20, textDecorationLine: 'underline' }]}>Register of Directors</Text>
              :
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text style={[styles.cardTitleEdit, { textDecorationLine: 'underline', paddingTop: 20, }]}>Register of Directors</Text>
                {editMode ? null :

                  <Provider>
                    <View
                      style={{
                        paddingTop: 7,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginLeft: 50,
                        marginBottom: visible ? 200 : 0
                      }}>
                      <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<TouchableOpacity style={{ backgroundColor: '#f5f7fa', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 5 }} onPress={openMenu}>
                          <Iconsp name="options-vertical" size={22} color="#017eff" />
                        </TouchableOpacity>}>
                        <Menu.Item onPress={() => { closeMenu(); navigation.navigate("Director") }} icon="folder-account-outline" title="Director " />
                        <Divider />
                        <Menu.Item onPress={() => { closeMenu(); setEditMode(true) }} icon="file-document-edit-outline" title="Edit Record" />
                        <Divider />
                        <Menu.Item onPress={() => {
                          closeMenu(); Alert.alert('Delete', 'This record will be deleted.', [{ text: 'Continue', onPress: () => { alert('Archived!'); navigation.goBack() } },
                          { text: 'Cancel', onPress: () => { } }])
                        }} icon="trash-can-outline" title="Delete Record" />
                      </Menu>
                    </View>
                  </Provider>

                }
              </View>
            }
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Name of Member (Register Of Director):</Text>
            <TextInput
              value={director}
              onChangeText={setDirector}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Address of Member (Register Of Director ):</Text>
            <TextInput
              value={directorAddress}
              onChangeText={setDirectorAddress}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Entry as Member (Register of Director):</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode} onFocus={showDateOfEntryPicker} onKeyPress={showDateOfEntryPicker} label="Date of Entry" placeholder="Date of Entry"
              value={dateOfEntry == '' ? '' : formatTheDateLabel(dateOfEntry)}
              showSoftInputOnFocus={false} />
            <DateTimePickerModal
              isVisible={isDateOfEntryPickerVisible}
              mode="date"
              date={dateOfEntry}
              onConfirm={handleDateOfEntryConfirm}
              onCancel={hideDateOfEntryPicker}
            />
          </View>
          <Text style={[editMode ? styles.cardTitleEdit : styles.cardTitle, { paddingTop: 15 }]}>Shares:</Text>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={[{ flex: 1 }]}>
              <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Cert No.</Text>
              <TextInput

                value={certNo}
                onChangeText={setCertNo}
                style={editMode ? styles.textInputEdit : styles.textInput}
                editable={editMode}>
              </TextInput>
            </View>
            <View style={[{ flex: 1 }]}>
              <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Shares No.</Text>
              <TextInput

                value={sharesNo}
                onChangeText={setSharesNo}
                style={editMode ? styles.textInputEdit : styles.textInput}
                editable={editMode}>
              </TextInput>
            </View>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>From whom shares were transfered:</Text>
            <View style={editMode ? styles.pickerEdit : styles.picker}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: "Select Transfer Type", value: null }}
              onValueChange={(value) => setTransferType(value)}
              items={[
                { label: "Allotment / Original Issue", value: "original_issue" },
                { label: "Transfer from Someone", value: "from_someone" },
              ]}
              disabled={!editMode}
              value={transferType}
              style={pickerStyle}
            />
            </View>
          <View style={{marginTop: actuatedNormalize(5)}}>
          {transferType == "original_issue" && 
            <TextInput
            placeholder='Allotment / Original Issue'
            value={`Allotment / Original Issue value: ${originalIssue}`}
            onChangeText={setOriginalIssue}
            style={editMode ? styles.textInputEdit : styles.textInput}
            editable={editMode}>
          </TextInput>}
          {transferType == "from_someone" && 
          <TextInput
          placeholder='From Someone'
          value={`From: ${transferFrom}`}
          onChangeText={setTransferFrom}
          style={editMode ? styles.textInputEdit : styles.textInput}
          editable={editMode}>
        </TextInput>}
          </View>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Amount Paid thereon in UGX</Text>
            <TextInput
              value={amtPaid}
              onChangeText={setAmtPaid}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Transfer of Ordinary Shares:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showTransferDatePicker} onKeyPress={showTransferDatePicker} label="Date of Transfer" placeholder="Date of Transfer"
              value={transferDate == '' ? '' : formatTheDateLabel(transferDate)} />
            <DateTimePickerModal
              isVisible={isTransferDateVisible}
              mode="date"
              date={transferDate}
              onConfirm={handleTransferConfirm}
              onCancel={hideTransferDatePicker}
            />
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>To whom Shares are Transferred:</Text>
            <TextInput
              value={toWhom}
              onChangeText={setToWhom}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Shares transfered:</Text>
            <TextInput
              value={sharesTransfered}
              onChangeText={setSharesTransfered}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Number of Shares Held (balance):</Text>
            <TextInput
              value={shareBalance}
              onChangeText={setShareBalance}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Attach Relevant Documents:</Text>
            <TextInput
              value={attachments.length.toString()}
              // onChangeText={setAttachments}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          {entryId ?
            editMode ? <View style={styles.button}>
              <TouchableOpacity onPress={() => { alert('Saved!'); setEditMode(false); navigation.navigate('Home') }} style={[{ backgroundColor: colors.button }, styles.buttons]}>
                <Text style={{ color: '#fff', alignSelf: 'center' }}>{`Save`}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { setEditMode(false); }} style={[{
                borderColor: 'rgba(118,121,116, .8)',
                borderWidth: .3,
              }, styles.buttons]}>
                <Text style={{ color: colors.button, alignSelf: 'center' }}>{`Cancel`}</Text>
              </TouchableOpacity>
            </View> : null

            : <View style={styles.button}>
              <TouchableOpacity onPress={() => { navigation.navigate('Home') }} style={[{
                borderColor: 'rgba(118,121,116, .8)',
                borderWidth: .3,
              }, styles.buttons]}>
                <Text style={{ color: colors.button, alignSelf: 'center', fontWeight: 'bold' }}>{`Cancel`}</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={createSH} style={[{ backgroundColor: colors.button }, styles.buttons]}>
                <Text style={{ color: '#fff', alignSelf: 'center', fontWeight: 'bold' }}>{`Create`}</Text>
              </TouchableOpacity>
            </View>}
        </ScrollView>}
    </View>
  );
};

export default RegisterDirectorsInterest;
const pickerStyle = {
	inputIOS: {
		color: '#333',
		paddingTop: 10,
		paddingHorizontal: 10,
		paddingBottom: 10,
    fontSize: 16,
	},
	inputAndroid: {
		color: '#333',
    fontSize: 16,
	},
	placeholderColor: 'grey',
	underline: { borderTopWidth: 0 },
	icon: {
		position: 'absolute',
		backgroundColor: 'transparent',
		borderTopWidth: 5,
		borderTopColor: '#00000099',
		borderRightWidth: 5,
		borderRightColor: 'transparent',
		borderLeftWidth: 5,
		borderLeftColor: 'transparent',
		width: 0,
		height: 0,
		top: 20,
		right: 15,
	},
};
const styles = StyleSheet.create({
  textInputEdit: {
    marginHorizontal: 10,
    marginVertical: 3,
    fontSize: 16,
    borderColor: 'rgba(118,121,116, .3)',
    borderWidth: .3,
    borderRadius: 1,
    paddingLeft: 15,
    paddingBottom: 5,
    color: '#333333'
  },
  textInput: {
    marginHorizontal: 10,
    fontSize: 16,
    borderColor: 'rgba(118,121,116, .1)',
    borderBottomWidth: .1,
    borderRadius: 1,
    paddingBottom: 0,
    color: '#333333',
  },
  action: {
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
    fontSize: actuatedNormalize(17),
    paddingTop: actuatedNormalize(20)
  },
  action4: {
    paddingTop: actuatedNormalize(5),
    borderBottomColor: "#dedede",
    borderBottomWidth: 1,
  },
  cardTitleEdit: {
    color: "#333333",
    paddingLeft: 10,
    paddingBottom: 5,
    fontSize: 16,
  },
  cardTitle: {
    color: "grey",
    paddingLeft: 10,
    fontSize: 16,
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
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  pickerEdit: {
    marginHorizontal: 10,
    marginVertical: 3,
    fontSize: 16,
    borderColor: 'rgba(118,121,116, .3)',
    borderWidth: .3,
    borderRadius: 1,
    paddingLeft: 15,
    // paddingBottom: 5,
    marginBottom: 5,
    color: '#333333'
  },
  picker: {
    marginHorizontal: 10,
    fontSize: 16,
    borderColor: 'rgba(118,121,116, .1)',
    borderBottomWidth: .1,
    borderRadius: 1,
    paddingBottom: 0,
    color: '#333333',
  },
});
