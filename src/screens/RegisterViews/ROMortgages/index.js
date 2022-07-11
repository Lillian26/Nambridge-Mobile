import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, LogBox, TextInput, Alert } from 'react-native';
import { Text } from 'native-base';
import { rOMortgages } from '../../../model/records';
// import axios from "axios";
import { formatTheDateLabel, defaultDate } from "../../../helpers/helpers";
import { MenuGroup } from '../../../components/MenuGroup';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { docTypes } from '../../../model/docTypes';
import { styles } from '../../../styles/common';
import OutroComponent from '../../../components/OutroComponent';
import { handleAdd, handleRemove, handleChangeInput, fetchDocumentTypes, selectOneFile } from '../../../helpers/uploadMethods';


const ROMortgages = ({ route, navigation }) => {

  const { entryId, registerId } = route.params ?? {};

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [record, setRecord] = useState(null)
  const [chargor, setChargor] = useState("")
  const [chargorAddress, setChargorAddress] = useState("")
  const [dateOfCreation, setDateOfCreation] = useState(defaultDate);
  const [isDateOfCreationPickerVisible, setDateOfCreationPickerVisibility] = useState(false);
  const [dischargePropertyDate, setDischargePropertyDate] = useState(defaultDate);
  const [isDischargePropertyDateVisible, setDischargePropertyDateVisibility] = useState(false);
  
  const [visible, setVisible] = useState(false);
  const [attachmentNo, setAttachmentNo] = useState("0")
  const [uploads, setUploads] = useState([]);
  const [validUploads, setValidUploads] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([])//common


// -------------------------- handlers for Date of Creation Picker --------------------------------------------

  const showDateOfCreationPicker = () => {
    setDateOfCreationPickerVisibility(true);
  };

  const hideDateOfCreationPicker = () => {
    setDateOfCreationPickerVisibility(false);
  };

  const handleDateOfCreationConfirm = (e) => {
    hideDateOfCreationPicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setDateOfCreation(defaultDate)
    }
    else {
      setDateOfCreation(date)
    }
  };

  // -------------------------- handlers for Date of DischargeProperty Picker --------------------------------------------

  const showDischargePropertyDatePicker = () => {
    setDischargePropertyDateVisibility(true);
  };

  const hideDischargePropertyDatePicker = () => {
    setDischargePropertyDateVisibility(false);
  };

  const handleDischargePropertyDateConfirm = (e) => {
    hideDischargePropertyDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setDischargePropertyDate(defaultDate)
    }
    else {
      setDischargePropertyDate(date)
    }
  };

  // -------------------------------------------------------

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
    var theRecord = rOMortgages.find(x => x.id == entryId);
    setRecord("Register of Mortgages & Charges");
    setChargor(theRecord.chargor);
    setChargorAddress(theRecord.chargor_address);
    setDateOfCreation(new Date(theRecord.creation_date));
    setDischargePropertyDate(new Date(theRecord.property_discharge_date));
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
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Name of Chargor / Mortgagor:</Text>
            <TextInput
              value={chargor}
              onChangeText={setChargor}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Creation:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode} onFocus={showDateOfCreationPicker} onKeyPress={showDateOfCreationPicker}
              value={dateOfCreation == '' ? '' : formatTheDateLabel(dateOfCreation)}
              showSoftInputOnFocus={false} />
            <DateTimePickerModal
              isVisible={isDateOfCreationPickerVisible}
              mode="date"
              date={dateOfCreation}
              onConfirm={handleDateOfCreationConfirm}
              onCancel={hideDateOfCreationPicker}
            />
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Address of Chargor / Mortgagor:</Text>
            <TextInput
              value={chargorAddress}
              onChangeText={setChargorAddress}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date of Discharge of the Property:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showDischargePropertyDatePicker} onKeyPress={showDischargePropertyDatePicker}
              value={dischargePropertyDate == '' ? '' : formatTheDateLabel(dischargePropertyDate)} />
            <DateTimePickerModal
              isVisible={isDischargePropertyDateVisible}
              mode="date"
              date={dischargePropertyDate}
              onConfirm={handleDischargePropertyDateConfirm}
              onCancel={hideDischargePropertyDatePicker}
            />
          </View>

          <OutroComponent editMode={editMode} attachmentNo={attachmentNo} uploads={uploads} setUploads={setUploads} setValidUploads={setValidUploads}
            handleAdd={handleAdd} handleChangeInput={handleChangeInput} handleRemove={handleRemove} selectOneFile={selectOneFile} navigation={navigation}
            submitRecord={submitRecord} setEditMode={setEditMode} entryId={entryId} documentTypes={documentTypes} />

        </ScrollView>}
    </View>
  );
};

export default ROMortgages ;
