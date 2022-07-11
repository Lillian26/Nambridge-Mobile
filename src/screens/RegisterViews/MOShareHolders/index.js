import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, LogBox, TextInput, Alert } from 'react-native';
import { Text } from 'native-base';
import { mOShareHolders } from '../../../model/records';
// import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import { MenuGroup } from '../../../components/MenuGroup';
import { formatTheDateLabel, defaultDate } from "../../../helpers/helpers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { docTypes } from '../../../model/docTypes';
import { pickerStyle ,styles } from '../../../styles/common';
import OutroComponent from '../../../components/OutroComponent';
import { handleAdd, handleRemove, handleChangeInput, fetchDocumentTypes, selectOneFile } from '../../../helpers/uploadMethods';

const MOShareHolders = ({ route, navigation }) => {

  const { entryId, registerId } = route.params ?? {};

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [record, setRecord] = useState(null)
  const [dateOfSHMtg, setDateOfSHMtg] = useState(defaultDate);
  const [isDateOfSHMtgPickerVisible, setDateOfSHMtgPickerVisibility] = useState(false);
  const [typeOfMeeting, setTypeOfMeeting] = useState(null)
  const [keyResolnsSummary, setKeyResolnsSummary] = useState("")
  const [resolnExtractnDate, setResolnExtractnDate] = useState(defaultDate);
  const [isResolnExtractnDateVisible, setResolnExtractnDateVisibility] = useState(false);
  const [resolnRegistratnDate, setResolnRegistratnDate] = useState(defaultDate);
  const [isResolnRegistratnDateVisible, setResolnRegistratnDateVisibility] = useState(false);
  const [originalResolnLoctn, setOriginalResolnLoctn] = useState("")

  const [visible, setVisible] = useState(false);
  const [attachmentNo, setAttachmentNo] = useState("0")
  const [uploads, setUploads] = useState([]);
  const [validUploads, setValidUploads] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([])//common


  // -------------------------- handlers for Date of Resignation Picker --------------------------------------------

  const showResolnRegistratnDatePicker = () => {
    setResolnRegistratnDateVisibility(true);
  };

  const hideResolnRegistratnDatePicker = () => {
    setResolnRegistratnDateVisibility(false);
  };

  const handleResignationConfirm = (e) => {
    hideResolnRegistratnDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setResolnRegistratnDate(defaultDate)
    }
    else {
      setResolnRegistratnDate(date)
    }
  };

  // -------------------------- handlers for ResolnExtractnDate Picker --------------------------------------------


  const showResolnExtractnDatePicker = () => {
    setResolnExtractnDateVisibility(true);
  };

  const hideResolnExtractnDatePicker = () => {
    setResolnExtractnDateVisibility(false);
  };

  const handleAppointmentConfirm = (e) => {
    hideResolnExtractnDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setResolnExtractnDate(defaultDate)
    }
    else {
      setResolnExtractnDate(date)
    }
  };

  // -------------------------- handlers for Date of SHMtg Picker --------------------------------------------

  const showDateOfSHMtgPicker = () => {
    setDateOfSHMtgPickerVisibility(true);
  };

  const hideDateOfSHMtgPicker = () => {
    setDateOfSHMtgPickerVisibility(false);
  };

  const handleDateOfSHMtgConfirm = (e) => {
    hideDateOfSHMtgPicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setDateOfSHMtg(defaultDate)
    }
    else {
      setDateOfSHMtg(date)
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
    var theRecord = mOShareHolders.find(x => x.id == entryId);
    setRecord("Index of Minutes of Shareholders");
    setTypeOfMeeting(theRecord.type_of_meeting);
    setDateOfSHMtg(new Date(theRecord.shareholder_meeting_date));
    setKeyResolnsSummary(theRecord.key_resoln_summary)
    setResolnExtractnDate(new Date(theRecord.resolution_extraction_date));
    setResolnRegistratnDate(new Date(theRecord.registration_date));
    setOriginalResolnLoctn(theRecord.location_of_registration)
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
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}> Date of Shareholder Meeting:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode} onFocus={showDateOfSHMtgPicker} onKeyPress={showDateOfSHMtgPicker}
              value={dateOfSHMtg == '' ? '' : formatTheDateLabel(dateOfSHMtg)}
              showSoftInputOnFocus={false} />
            <DateTimePickerModal
              isVisible={isDateOfSHMtgPickerVisible}
              mode="date"
              date={dateOfSHMtg}
              onConfirm={handleDateOfSHMtgConfirm}
              onCancel={hideDateOfSHMtgPicker}
            />
          </View>
          <Text style={editMode ? [styles.cardTitleEdit, {marginTop: 10}] : [styles.cardTitle, {marginTop: 10}]}>State whether meeting was?:</Text>
          <View style={editMode ? [styles.pickerEdit, { marginHorizontal: 10 }] : styles.picker}>
            <RNPickerSelect
              useNativeAndroidPickerStyle={false}
              placeholder={{ label: "Select option", value: null }}
              onValueChange={(value) => setTypeOfMeeting(value)}
              items={[
                { label: "Annual Meeting", value: "annual" },
                { label: "Extra ordinary general meeting", value: "extra_ordinary" },
                { label: "Circular Meeting", value: "circular" },
                { label: "Other", value: "other" }
              ]}
              disabled={!editMode}
              value={typeOfMeeting}
              style={pickerStyle}
            />
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Summary of the Key Resolutions:</Text>
            <TextInput
              value={keyResolnsSummary}
              onChangeText={setKeyResolnsSummary}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date on which Resolution was Extracted:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showResolnExtractnDatePicker} onKeyPress={showResolnExtractnDatePicker}
              value={resolnExtractnDate == '' ? '' : formatTheDateLabel(resolnExtractnDate)} />
            <DateTimePickerModal
              isVisible={isResolnExtractnDateVisible}
              mode="date"
              date={resolnExtractnDate}
              onConfirm={handleAppointmentConfirm}
              onCancel={hideResolnExtractnDatePicker}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Registration of the Resolution:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showResolnRegistratnDatePicker} onKeyPress={showResolnRegistratnDatePicker} 
              value={resolnRegistratnDate == '' ? '' : formatTheDateLabel(resolnRegistratnDate)} />
            <DateTimePickerModal
              isVisible={isResolnRegistratnDateVisible}
              mode="date"
              date={resolnRegistratnDate}
              onConfirm={handleResignationConfirm}
              onCancel={hideResolnRegistratnDatePicker}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Location of the Original Resolution:</Text>
            <TextInput
              value={originalResolnLoctn}
              onChangeText={setOriginalResolnLoctn}
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

export default MOShareHolders;
