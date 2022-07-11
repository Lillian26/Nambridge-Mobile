import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, LogBox, TextInput, Alert } from 'react-native';
import { Text } from 'native-base';
import { rODInterest } from '../../../model/records';
// import axios from "axios";
import { MenuGroup } from '../../../components/MenuGroup';
import { formatTheDateLabel, defaultDate } from "../../../helpers/helpers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { docTypes } from '../../../model/docTypes';
import { styles } from '../../../styles/common';
import OutroComponent from '../../../components/OutroComponent';
import { handleAdd, handleRemove, handleChangeInput, fetchDocumentTypes, selectOneFile } from '../../../helpers/uploadMethods';

const RODInterest = ({ route, navigation }) => {

  const { entryId, registerId } = route.params ?? {};

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [record, setRecord] = useState(null)
  const [director, setDirector] = useState("")  
  const [interestConflictDesc, setInterestConflictDesc] = useState("")
  const [directorRelatedInterest, setDirectorRelatedInterest] = useState("")
  const [dateOfNotificn, setDateOfNotificn] = useState(defaultDate);
  const [isDateOfNotificnPickerVisible, setDateOfNotificnPickerVisibility] = useState(false);
  const [remarks, setRemarks] = useState("")

  const [visible, setVisible] = useState(false);
  const [attachmentNo, setAttachmentNo] = useState("0")
  const [uploads, setUploads] = useState([]);
  const [validUploads, setValidUploads] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([])//common

  // -------------------------- handlers for Date of Notificn Picker --------------------------------------------

  const showDateOfNotificnPicker = () => {
    setDateOfNotificnPickerVisibility(true);
  };

  const hideDateOfNotificnPicker = () => {
    setDateOfNotificnPickerVisibility(false);
  };

  const handleDateOfNotificnConfirm = (e) => {
    hideDateOfNotificnPicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setDateOfNotificn(defaultDate)
    }
    else {
      setDateOfNotificn(date)
    }
  };

  useEffect(() => {
    fetchDocumentTypes( docTypes, setDocumentTypes)

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
    var theRecord = rODInterest.find(x => x.id == entryId);
    setRecord("Register of Directors Interest");
    setDirector(theRecord.director);
    setDirectorRelatedInterest(theRecord.director_related_interest);
    setDateOfNotificn(new Date(theRecord.date_notified));
    setInterestConflictDesc(theRecord.interest_conflict_desc);
    setRemarks(theRecord.remarks)
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
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Description of Conflicts of Interest:</Text>
            <TextInput
              value={interestConflictDesc}
              onChangeText={setInterestConflictDesc}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Does Interest relate to the Director or a person connected to the Director?:</Text>
            <TextInput
              value={directorRelatedInterest}
              onChangeText={setDirectorRelatedInterest}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date Notified:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode} onFocus={showDateOfNotificnPicker} onKeyPress={showDateOfNotificnPicker} label="Date of Entry" placeholder="Date of Entry"
              value={dateOfNotificn == '' ? '' : formatTheDateLabel(dateOfNotificn)}
              showSoftInputOnFocus={false} />
            <DateTimePickerModal
              isVisible={isDateOfNotificnPickerVisible}
              mode="date"
              date={dateOfNotificn}
              onConfirm={handleDateOfNotificnConfirm}
              onCancel={hideDateOfNotificnPicker}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Remarks:</Text>
            <TextInput
              value={remarks}
              onChangeText={setRemarks}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <OutroComponent editMode={editMode} attachmentNo={attachmentNo} uploads={uploads} setUploads={setUploads} setValidUploads={setValidUploads}
            handleAdd={handleAdd} handleChangeInput={handleChangeInput} handleRemove={handleRemove} selectOneFile={selectOneFile} navigation={navigation}
            submitRecord={submitRecord} setEditMode={setEditMode} entryId={entryId} documentTypes={documentTypes}/>

        </ScrollView>}
    </View>
  );
};

export default RODInterest ;
