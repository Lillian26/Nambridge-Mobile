import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, LogBox, TextInput, Alert } from 'react-native';
import { Text } from 'native-base';
import { coSealRegister } from '../../../model/records';

// import axios from "axios";
// import { Picker } from '@react-native-picker/picker';
import { MenuGroup } from '../../../components/MenuGroup';
import { formatTheDateLabel, defaultDate } from "../../../helpers/helpers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { docTypes } from '../../../model/docTypes';
import { styles } from '../../../styles/common';
import OutroComponent from '../../../components/OutroComponent';
import { handleAdd, handleRemove, handleChangeInput, fetchDocumentTypes, selectOneFile } from '../../../helpers/uploadMethods';

const CoSealRegister = ({ route, navigation }) => {

  const { entryId, registerId } = route.params ?? {};

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [record, setRecord] = useState(null)
  const [sealAffixationDate, setSealAffixationDate] = useState(defaultDate);
  const [isSealAffixationDatePickerVisible, setSealAffixationDatePickerVisibility] = useState(false);
  const [sealAffixationDesc, setsealAffixationDesc] = useState("")
  const [partiesParticulars, setPartiesParticulars] = useState("")
  const [execDocumentLocation, setExecDocumentLocation] = useState("")

  const [visible, setVisible] = useState(false);
  const [attachmentNo, setAttachmentNo] = useState("0")
  const [uploads, setUploads] = useState([]);
  const [validUploads, setValidUploads] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([])//common

// -------------------------- handlers for Date of Entry Picker --------------------------------------------

  const showSealAffixationDatePicker = () => {
    setSealAffixationDatePickerVisibility(true);
  };

  const hideSealAffixationDatePicker = () => {
    setSealAffixationDatePickerVisibility(false);
  };

  const handleSealAffixationDateConfirm = (e) => {
    hideSealAffixationDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setSealAffixationDate(defaultDate)
    }
    else {
      setSealAffixationDate(date)
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
    var theRecord = coSealRegister.find(x => x.id == entryId);
    setRecord("Company Seal Register");
    setSealAffixationDate(new Date(theRecord.seal_affixation_date));
    setsealAffixationDesc(theRecord.document_description);
    setPartiesParticulars(theRecord.parties_particulars);
    setExecDocumentLocation(theRecord.executed_doc_location);
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
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Date when the Seal was affixed:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode} onFocus={showSealAffixationDatePicker} onKeyPress={showSealAffixationDatePicker} label="Date of Entry" placeholder="Date of Entry"
              value={sealAffixationDate == '' ? '' : formatTheDateLabel(sealAffixationDate)}
              showSoftInputOnFocus={false} />
            <DateTimePickerModal
              isVisible={isSealAffixationDatePickerVisible}
              mode="date"
              date={sealAffixationDate}
              onConfirm={handleSealAffixationDateConfirm}
              onCancel={hideSealAffixationDatePicker}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Description of Document on which Seal was affixed:</Text>
            <TextInput
              value={sealAffixationDesc}
              onChangeText={setsealAffixationDesc}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Particulars of Parties that signed the Documents:</Text>
            <TextInput
              value={partiesParticulars}
              onChangeText={setPartiesParticulars}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Location of the Executed Documents:</Text>
            <TextInput
              value={execDocumentLocation}
              onChangeText={setExecDocumentLocation}
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

export default CoSealRegister ;
