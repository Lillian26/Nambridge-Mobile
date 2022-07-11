import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, LogBox, TextInput, Alert } from 'react-native';
import { Text } from 'native-base';
import { rOSecretatries } from '../../../model/records';
// import axios from "axios";
import { MenuGroup } from '../../../components/MenuGroup';
import { formatTheDateLabel, defaultDate } from "../../../helpers/helpers";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { docTypes } from '../../../model/docTypes';
import { styles } from '../../../styles/common';
import OutroComponent from '../../../components/OutroComponent';
import { handleAdd, handleRemove, handleChangeInput, fetchDocumentTypes, selectOneFile } from '../../../helpers/uploadMethods';

const ROSecretatries = ({ route, navigation }) => {

  const { entryId, registerId } = route.params ?? {};

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);
  const [record, setRecord] = useState(null)
  const [secretary, setSecretary] = useState("")  
  const [secretaryAddress, setSecretaryAddress] = useState("")
  const [officeHeld, setOfficeHeld] = useState("")
  const [appointmentDate, setAppointmentDate] = useState(defaultDate);
  const [isAppointmentDateVisible, setAppointmentDateVisibility] = useState(false);
  const [appointNotifnDate, setAppointNotifnDate] = useState(defaultDate);
  const [isAppointNotifnDateVisible, setAppointNotifnDateVisibility] = useState(false);

  const [resignationDate, setResignationDate] = useState(defaultDate);
  const [isResignationDateVisible, setResignationDateVisibility] = useState(false);
  const [resignatnNotificatnDate, setResignatnNotificatnDate] = useState(defaultDate);
  const [isResignatnNotificatnDateVisible, setResignatnNotificatnVisibility] = useState(false);

  const [visible, setVisible] = useState(false);
  const [attachmentNo, setAttachmentNo] = useState("0")
  const [uploads, setUploads] = useState([]);
  const [validUploads, setValidUploads] = useState(false);
  const [documentTypes, setDocumentTypes] = useState([])//common
  

// -------------------------- handlers for Date of Resignation Picker --------------------------------------------

const showResignationDatePicker = () => {
  setResignationDateVisibility(true);
};

const hideResignationDatePicker = () => {
  setResignationDateVisibility(false);
};

const handleResignationConfirm = (e) => {
  hideResignationDatePicker();
  var date = new Date(e);

  if (isNaN(date.getTime())) {
    setResignationDate(defaultDate)
  }
  else {
    setResignationDate(date)
  }
};

// -------------------------- handlers for Date of AppointNotifn Picker --------------------------------------------

const showAppointNotifnDatePicker = () => {
  setAppointNotifnDateVisibility(true);
};

const hideAppointNotifnDatePicker = () => {
  setAppointNotifnDateVisibility(false);
};

const handleCessationConfirm = (e) => {
  hideAppointNotifnDatePicker();
  var date = new Date(e);

  if (isNaN(date.getTime())) {
    setAppointNotifnDate(defaultDate)
  }
  else {
    setAppointNotifnDate(date)
  }
};

// -------------------------- handlers for Date of ResignatnNotificatn Picker --------------------------------------------

  const showResignatnNotificatnPicker = () => {
    setResignatnNotificatnVisibility(true);
  };

  const hideResignatnNotificatnPicker = () => {
    setResignatnNotificatnVisibility(false);
  };

  const handleResignatnNotificatnConfirm = (e) => {
    hideResignatnNotificatnPicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setResignatnNotificatn(defaultDate)
    }
    else {
      setResignatnNotificatn(date)
    }
  };

  // -------------------------- handlers for Date of Appointment Picker --------------------------------------------


  const showAppointmentDatePicker = () => {
    setAppointmentDateVisibility(true);
  };

  const hideAppointmentDatePicker = () => {
    setAppointmentDateVisibility(false);
  };

  const handleAppointmentConfirm = (e) => {
    hideAppointmentDatePicker();
    var date = new Date(e);

    if (isNaN(date.getTime())) {
      setAppointmentDate(defaultDate)
    }
    else {
      setAppointmentDate(date)
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
    var theRecord = rOSecretatries.find(x => x.id == entryId);
    setRecord("Register of Secretaries");
    setSecretary(theRecord.secretary);
    setSecretaryAddress(theRecord.secretary_address);
    setOfficeHeld(theRecord.office_held)
    setAppointmentDate(new Date(theRecord.appointment_effective_date));
    setResignationDate(new Date(theRecord.resignation_effective_date));
    setResignatnNotificatnDate(new Date(theRecord.date_notificatn_resignation));
    setAppointNotifnDate(new Date(theRecord.date_notificatn_appointment));
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
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Name:</Text>
            <TextInput
              value={secretary}
              onChangeText={setSecretary}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Address:</Text>
            <TextInput
              value={secretaryAddress}
              onChangeText={setSecretaryAddress}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>
          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Office Held:</Text>
            <TextInput
              value={officeHeld}
              onChangeText={setOfficeHeld}
              style={editMode ? styles.textInputEdit : styles.textInput}
              editable={editMode}>
            </TextInput>
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Appointment Effective Date:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showAppointmentDatePicker} onKeyPress={showAppointmentDatePicker} 
              value={appointmentDate == '' ? '' : formatTheDateLabel(appointmentDate)} />
            <DateTimePickerModal
              isVisible={isAppointmentDateVisible}
              mode="date"
              date={appointmentDate}
              onConfirm={handleAppointmentConfirm}
              onCancel={hideAppointmentDatePicker}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Notification of Appointment:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showAppointNotifnDatePicker} onKeyPress={showAppointNotifnDatePicker} 
              value={appointNotifnDate == '' ? '' : formatTheDateLabel(appointNotifnDate)} />
            <DateTimePickerModal
              isVisible={isAppointNotifnDateVisible}
              mode="date"
              date={appointNotifnDate}
              onConfirm={handleCessationConfirm}
              onCancel={hideAppointNotifnDatePicker}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Resignation Effective Date:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showResignationDatePicker} onKeyPress={showResignationDatePicker} label="Resignation Effective Date" placeholder="Date of Transfer"
              value={resignationDate == '' ? '' : formatTheDateLabel(resignationDate)} />
            <DateTimePickerModal
              isVisible={isResignationDateVisible}
              mode="date"
              date={resignationDate}
              onConfirm={handleResignationConfirm}
              onCancel={hideResignationDatePicker}
            />
          </View>

          <View style={[{ paddingTop: 15 }]}>
            <Text style={editMode ? styles.cardTitleEdit : styles.cardTitle}>Notification of Resignation:</Text>
            <TextInput style={editMode ? styles.textInputEdit : styles.textInput} editable={editMode}
              onFocus={showResignatnNotificatnPicker} onKeyPress={showResignatnNotificatnPicker}
              value={resignatnNotificatnDate == '' ? '' : formatTheDateLabel(resignatnNotificatnDate)} />
            <DateTimePickerModal
              isVisible={isResignatnNotificatnDateVisible}
              mode="date"
              date={resignatnNotificatnDate}
              onConfirm={handleResignatnNotificatnConfirm}
              onCancel={hideResignatnNotificatnPicker}
            />
          </View>

          <OutroComponent editMode={editMode} attachmentNo={attachmentNo} uploads={uploads} setUploads={setUploads} setValidUploads={setValidUploads}
            handleAdd={handleAdd} handleChangeInput={handleChangeInput} handleRemove={handleRemove} selectOneFile={selectOneFile} navigation={navigation}
            submitRecord={submitRecord} setEditMode={setEditMode} entryId={entryId} documentTypes={documentTypes}/>

        </ScrollView>}
    </View>
  );
};

export default ROSecretatries;
