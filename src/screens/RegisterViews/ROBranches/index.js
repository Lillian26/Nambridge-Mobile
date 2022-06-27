import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, StatusBar, LogBox, Image, TextInput, Alert } from 'react-native';
import colors from '../../../assets/theme/colors';
import DocumentPicker from 'react-native-document-picker';
import { Text } from 'native-base';
import Icona from "react-native-vector-icons/AntDesign";
import { rOBranches } from '../../../model/records';
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Iconsp from "react-native-vector-icons/SimpleLineIcons";
// import axios from "axios";
// import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from "react-native-picker-select";
import actuatedNormalize from '../../../helpers/actuatedNormalize';
import { formatTheDateLabel, defaultDate, formatTheDateText } from "../../../helpers/helpers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { docTypes } from '../../../model/docTypes';
import { pickerStyle, styles } from '../../../styles/common';

const ROBranches = ({ route, navigation }) => {

  const { entryId, registerId } = route.params ?? {};

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [record, setRecord] = useState(null)
  const [member, setMember] = useState("")
  const [memberAddress, setMemberAddress] = useState("")
  const [dateOfEntry, setDateOfEntry] = useState(defaultDate);
  const [isDateOfEntryPickerVisible, setDateOfEntryPickerVisibility] = useState(false);
  const [shareholdingClass, setShareholdingClass] = useState("")
  const [sharesNo, setSharesNo] = useState("")
  const [memberShipEndDate, setMemberShipEndDate] = useState(defaultDate);
  const [isMemberShipEndDateVisible, setMemberShipEndDateVisibility] = useState(false);
  
  const [visible, setVisible] = useState(false);
  const [attachmentNo, setAttachmentNo] = useState("0")
  const [uploads, setUploads] = useState([]);
  const [validUploads, setValidUploads] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([])//common


// -------------------------- handlers for Date of Entry Picker --------------------------------------------

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

  // -------------------------- handlers for Date of Membership End Picker --------------------------------------------

  const showMemberShipEndDatePicker = () => {
    setMemberShipEndDatePickerVisibility(true);
  };

  const hideMemberShipEndDatePicker = () => {
    setMemberShipEndDatePickerVisibility(false);
  };

  const handleMemberShipEndDateConfirm = (e) => {
    hideMemberShipEndDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setMemberShipEndDate(defaultDate)
    }
    else {
      setMemberShipEndDate(date)
    }
  };

  function handleAdd(uploads, setUploads, setValidUploads) {
    const values = [...uploads];
    // values.push({ value: null });
    values.push({
      Type: '',
      Document: '',
    });
    setValidUploads(false)
    setUploads(values);
  }

  function handleRemove(i, uploads, setUploads, setValidUploads) {
    const values = [...uploads];
    values.splice(i, 1);
    setValidUploads(values.filter(x => Object.values(x).some(x => x === '')).length == 0)
    setUploads(values);
  }

  const fetchDocumentTypes = () => {
    let dTypes = []
    docTypes.forEach(x => {
      dTypes.push({ label: x.name, value: x.id })
    })
    setDocumentTypes(dTypes);
  }
  // -------------------------------------------------------

  useEffect(() => {
    fetchDocumentTypes(); //common
    if (entryId) {
      navigation.setOptions({
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
  }, [editMode, loading]);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const getRecordDetails = () => {
    var theRecord = rOBranches.find(x => x.id == entryId);
    setRecord(theRecord);
    setMember(theRecord.member);
    setMemberAddress(theRecord.member_address);
    setDateOfEntry(new Date(theRecord.date_of_entry));
    setSharesNo(theRecord.shares_no);
    setShareholdingClass(theRecord.shareholding_class)
    setMemberShipEndDate(new Date(theRecord.membership_end_date));
    setAttachmentNo(theRecord.no_of_attachments)

    // getAttachments()

  }


  // TODO
  // submit + axios config + loading
  // Document attachment list component

  //*************************************************************picker and display , click link************************************************** */
  const selectOneFile = async (idx) => {
    //Opening Document Picker for selection of one file
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // return res;
      // console.log(res, '/n', idx)
      handleChangeInput(idx, res, 'Document', uploads, setUploads, setValidUploads);
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
      return null
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

  const submitRecord = async () => {

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
                        marginBottom: visible ? 155 : 0
                      }}>
                      <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={<TouchableOpacity style={{ backgroundColor: '#f5f7fa', paddingHorizontal: 5, paddingVertical: 5, borderRadius: 5 }} onPress={openMenu}>
                          <Iconsp name="options-vertical" size={22} color="#017eff" />
                        </TouchableOpacity>}>
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
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Name of Member:</Text>
            <TextInput
              value={member}
              onChangeText={setMember}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Address of Member:</Text>
            <TextInput
              value={memberAddress}
              onChangeText={setMemberAddress}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Entry:</Text>
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
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Class Of Shareholding:</Text>
            <TextInput
              value={shareholdingClass}
              onChangeText={setShareholdingClass}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Number Of Shares Held:</Text>
            <TextInput
              value={sharesNo}
              onChangeText={setSharesNo}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date When Membership Ended:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showMemberShipEndDatePicker} onKeyPress={showMemberShipEndDatePicker} label="Date When Membership Ended" placeholder="Date When Membership Ended"
              value={memberShipEndDate == '' ? '' : formatTheDateLabel(memberShipEndDate)} />
            <DateTimePickerModal
              isVisible={isMemberShipEndDateVisible}
              mode="date"
              date={memberShipEndDate}
              onConfirm={handleMemberShipEndDateConfirm}
              onCancel={hideMemberShipEndDatePicker}
            />
          </View>

          {!editMode ?
          <View style={{ paddingTop: 15, flexDirection: 'row', paddingBottom: 25 }}>
          <Text style={styles.cardTitle}>Relevant Documents: </Text>
            <Text>{attachmentNo}</Text>
        </View>
          :
          <View style={[{ paddingTop: 15 }]}>
          <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Attach Relevant Documents:</Text>

             <TouchableOpacity onPress={() => handleAdd(uploads, setUploads, setValidUploads)} style={[{ backgroundColor: "green", marginVertical: 10 }, styles.buttons]}>
              <Text style={{ color: '#fff', alignSelf: 'center' }}>{`Add Upload`}</Text>
            </TouchableOpacity>

            { uploads.map((field, idx) => {
              return (
                <View key={`${field}-${idx}`} style={{
                  // borderRadius: 1, borderWidth: .3, borderStyle: 'dashed',
                  // borderColor: 'green',
                  marginBottom: 10,
                }}>

                  <View style={editMode ? [styles.pickerEdit, {marginHorizontal: 10}] : styles.picker}>
                    <RNPickerSelect
                      useNativeAndroidPickerStyle={false}
                      placeholder={{ label: "Select Document Type", value: null }}
                      onValueChange={(val) => {
                        handleChangeInput(idx, val, 'Type', uploads, setUploads, setValidUploads);
                      }}
                      items={documentTypes}
                      disabled={!editMode}
                      value={uploads[idx]['Type']}
                      style={pickerStyle}
                    />
                  </View>

                  <View style={[styles.action3]}>
                    <TouchableOpacity onPress={() => selectOneFile(idx)}>
                      <TextInput style={{ fontSize: 17 }} onFocus={() => selectOneFile(idx)}
                        label="attachments" placeholder="Click here to upload document" onChangeText={() => selectOneFile(idx)}
                        value={uploads[idx]['Document'].name} />
                    </TouchableOpacity>
                  </View>

                    <TouchableOpacity onPress={() => handleRemove(idx, uploads, setUploads, setValidUploads)} style={[{ backgroundColor: "red",
                  justifyContent: 'center',
                  margin: 5,
                  alignSelf: 'flex-end', }, styles.button2]}>
                      <Text style={{ color: '#fff', alignSelf: 'center' }}>{`Remove`}</Text>
                    </TouchableOpacity>
                </View>
              );
            })}

          </View>}
          {entryId ?
            editMode ? <View style={styles.button}>
              <TouchableOpacity onPress={() => submitRecord()} style={[{ backgroundColor: colors.button }, styles.buttons]}>
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

              <TouchableOpacity onPress={submitRecord} style={[{ backgroundColor: colors.button }, styles.buttons]}>
                <Text style={{ color: '#fff', alignSelf: 'center', fontWeight: 'bold' }}>{`Create`}</Text>
              </TouchableOpacity>
            </View>}
        </ScrollView>}
    </View>
  );
};

export default ROBranches ;
