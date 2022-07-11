import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, LogBox, TextInput, Alert } from 'react-native';
import { Text } from 'native-base';
import { rODsSHgParticulars } from '../../../model/records';
// import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import { MenuGroup } from '../../../components/MenuGroup';
import { formatTheDateLabel, defaultDate } from "../../../helpers/helpers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { docTypes } from '../../../model/docTypes';
import { pickerStyle ,styles } from '../../../styles/common';
import OutroComponent from '../../../components/OutroComponent';
import { handleAdd, handleRemove, handleChangeInput, fetchDocumentTypes, selectOneFile } from '../../../helpers/uploadMethods';

const RODsSHgParticulars = ({ route, navigation }) => {

  const { entryId, registerId } = route.params ?? {};

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [record, setRecord] = useState(null)
  const [director, setDirector] = useState("")  
  const [dateOfEntry, setDateOfEntry] = useState(defaultDate);
  const [isDateOfEntryPickerVisible, setDateOfEntryPickerVisibility] = useState(false);
  const [notificnDate, setNotificnDate] = useState(defaultDate);
  const [isNotificnDateVisible, setNotificnDateVisibility] = useState(false);
  const [natureExtInterest, setNatureExtInterest] = useState("")
  const [sHDebentureClassAmount, setSHDebentureClassAmount] = useState("")
  const [grantRightDate, setGrantRightDate] = useState(defaultDate);
  const [isGrantRightDateVisible, setGrantRightDateVisibility] = useState(false);
  const [grantPeriod, setGrantPeriod] = useState("")
  const [consideration, setConsideration] = useState(null)
  const [shrRegisterdName, setShrRegisterdName] = useState("")

  const [visible, setVisible] = useState(false);
  const [attachmentNo, setAttachmentNo] = useState("0")
  const [uploads, setUploads] = useState([]);
  const [validUploads, setValidUploads] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([])//common


  // -------------------------- handlers for Date of GrantRightDate Picker --------------------------------------------

  const showGrantRightDatePicker = () => {
    setGrantRightDateVisibility(true);
  };

  const hideGrantRightDatePicker = () => {
    setGrantRightDateVisibility(false);
  };

  const handleResignationConfirm = (e) => {
    hideGrantRightDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setGrantRightDate(defaultDate)
    }
    else {
      setGrantRightDate(date)
    }
  };

  // -------------------------- handlers for NotificnDate Picker --------------------------------------------

  const showNotificnDatePicker = () => {
    setNotificnDateVisibility(true);
  };

  const hideNotificnDatePicker = () => {
    setNotificnDateVisibility(false);
  };

  const handleAppointmentConfirm = (e) => {
    hideNotificnDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setNotificnDate(defaultDate)
    }
    else {
      setNotificnDate(date)
    }
  };

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

  useEffect(() => {
    fetchDocumentTypes(docTypes, setDocumentTypes)

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
    var theRecord = rODsSHgParticulars.find(x => x.id == entryId);
    setRecord("Registers of Directors Shareholding and Related Particulars");
    setDirector(theRecord.director)
    setConsideration(theRecord.consideration);
    setDateOfEntry(new Date(theRecord.date_of_entry));
    setNatureExtInterest(theRecord.nature)
    setSHDebentureClassAmount(theRecord.sh_debenture_class_amt)
    setShrRegisterdName(theRecord.shr_registerd_name)
    setNotificnDate(new Date(theRecord.notification_date));
    setGrantRightDate(new Date(theRecord.grant_right_date));
    setGrantPeriod(theRecord.period_of_grant)
    setAttachmentNo(theRecord.no_of_attachments)

    // getAttachments()

  }

  // TODO
  // submit + axios config + loading

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
    Alert.alert("Saved!", "Record sucessfully saved!", [
      { text: 'Cancel', onPress: () => { navigation.goBack() } },
      { text: 'Go to Home', onPress: () => { navigation.navigate('Home') } }])
  }

  return (
    <View style={{ flex: 1 }}>
      {loading ?
        <ActivityIndicator animating={loading} color="#268d9c" />
        :
        <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 4 }}>

          <MenuGroup recordName={record} entryId={entryId} editMode={editMode} visible={visible} setEditMode={setEditMode} closeMenu={closeMenu} openMenu={openMenu}
            navigation={navigation} />

<View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Name of Director:</Text>
            <TextInput
              value={director}
              onChangeText={setDirector}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}> Date of Entry:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode} onFocus={showDateOfEntryPicker} onKeyPress={showDateOfEntryPicker}
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
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date on Notification:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showNotificnDatePicker} onKeyPress={showNotificnDatePicker}
              value={notificnDate == '' ? '' : formatTheDateLabel(notificnDate)} />
            <DateTimePickerModal
              isVisible={isNotificnDateVisible}
              mode="date"
              date={notificnDate}
              onConfirm={handleAppointmentConfirm}
              onCancel={hideNotificnDatePicker}
            />
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Nature and extent of interest and events affecting them:</Text>
            <TextInput
              value={natureExtInterest}
              onChangeText={setNatureExtInterest}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Amount of class of shares or Debentures involved:</Text>
            <TextInput
              value={sHDebentureClassAmount}
              onChangeText={setSHDebentureClassAmount}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Grant of Right within which exercisable:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showGrantRightDatePicker} onKeyPress={showGrantRightDatePicker} 
              value={grantRightDate == '' ? '' : formatTheDateLabel(grantRightDate)} />
            <DateTimePickerModal
              isVisible={isGrantRightDateVisible}
              mode="date"
              date={grantRightDate}
              onConfirm={handleResignationConfirm}
              onCancel={hideGrantRightDatePicker}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Period of Grant within which exercisable:</Text>
            <TextInput
              value={grantPeriod}
              onChangeText={setGrantPeriod}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <Text style={editMode ? [styles.cardTitleEdit, {marginTop: 10}] : [styles.cardTitle, {marginTop: 10}]}>What Consideration?:</Text>
          <View style={editMode ? [styles.pickerEdit, { marginHorizontal: 10 }] : styles.picker}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: "Select option", value: null }}
              onValueChange={(value) => setConsideration(value)}
              items={[
                { label: "Cash", value: "cash" },
                { label: "In Kind", value: "kind" },
              ]}
              disabled={!editMode}
              value={consideration}
              style={pickerStyle}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Name in which shares or Debenture Registered:</Text>
            <TextInput
              value={shrRegisterdName}
              onChangeText={setShrRegisterdName}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <OutroComponent editMode={editMode} attachmentNo={attachmentNo} uploads={uploads} setUploads={setUploads} setValidUploads={setValidUploads}
            handleAdd={handleAdd} handleChangeInput={handleChangeInput} handleRemove={handleRemove} selectOneFile={selectOneFile} navigation={navigation}
            submitRecord={submitRecord} setEditMode={setEditMode} entryId={entryId} documentTypes={documentTypes} />

        </ScrollView>}
    </View>
  );
};

export default RODsSHgParticulars;
