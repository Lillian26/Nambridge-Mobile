import React, { useRef, useEffect, useCallback, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Platform, StatusBar, LogBox, Image } from 'react-native';
import Icon from '../components/common/Icon';
import colors from '../assets/theme/colors';
import Wizard from "react-native-wizard";
import PrevButton from '../components/PrevButton';
import FinishButton from '../components/FinishButton';
import NextButton from '../components/NextButton';
import Container from '../components/Container';
import { DEFAULT_IMAGE_URI } from '../constants/general';
import DocumentPicker from 'react-native-document-picker';

//state, hooks for function based

const CreateAdvert = ({ navigation }) => {
  const wizard = useRef(null);
  const [isFirstStep, setIsFirstStep] = useState(true);
  const [isLastStep, setIsLastStep] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [uploading, setIsUploading] = useState(false);

  const [remembrancePic, setRemembrancePic] = useState(null);

  useEffect(() => {
    setCurrentStep(0);
    // retrieveUserId();
    // fetchDistricts();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const goToNext = () => {
    // console.log('next clicked')
    wizard.current.next();
    // console.log("values: "+JSON.stringify(values()));

  };

  const goToPrev = () => {
    wizard.current.prev();
  };

  const goToFinish = () => {
    // setIsLoading(true);
    // onSubmit();
  };
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

  const stepList = [
    {
      content:
        <View style={[styles.content, { paddingTop: 0, justifyContent: 'space-around' }]}>
          <View style={{ alignSelf: 'center', paddingVertical: 20 }}>
            <Text style={styles.textSize}>
              {'Please give us information about the person'}
            </Text>
          </View>

          <Container>
            <Image
              width={150}
              height={150}
              source={{ uri: DEFAULT_IMAGE_URI }}
              // source={{ uri: remembrancePic?.path || remembrancePic || DEFAULT_IMAGE_URI }}
              style={styles.imageView}
            />
            {/* <TouchableOpacity>
              <Text style={styles.chooseText}>Choose image</Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => selectOneFile(setRemembrancePic)}>
              <Text style={{ fontSize: 16 }} >Choose Remembrance Picture</Text>
            </TouchableOpacity>
          </Container>

          <NextButton goToNext={goToNext} disable={false} />
        </View>,
    },
    {
      content:
        <View style={[styles.content, { paddingTop: 0, justifyContent: "center" }]}>

          <View style={{
            flexDirection: 'row', marginVertical: 10, justifyContent: 'space-between',
            paddingTop: 10, alignContent: 'center',
          }}>
            <PrevButton goToPrev={goToPrev} />
            <NextButton goToNext={goToNext} disable={false} />
          </View>
        </View>
    },
  ]

  return (
    // wizard setup
    <View style={{ justifyContent: "center" }}>
      <Wizard
        ref={wizard}
        steps={stepList}
        // activeStep={0}
        isFirstStep={val => setIsFirstStep(val)}
        isLastStep={val => setIsLastStep(val)}
        onNext={() => {
          // console.log("Next Step Called")

        }}
        onPrev={() => {
          // console.log("Previous Step Called")
        }}
        currentStep={({ currentStep, isLastStep, isFirstStep }) => {
          setCurrentStep(currentStep)
        }}
      />
    </View>
  );
};

export default CreateAdvert;

const styles = StyleSheet.create({
  content: {
    padding: 10,
    margin: 10,
    height: '100%',
  },
  textSize: {
    fontSize: 20
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
});
