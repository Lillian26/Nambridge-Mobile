import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import actuatedNormalize from '../../helpers/actuatedNormalize';
// import actuatedNormalize from '../helpers/actuatedNormalize';

const ROShareHoldersCard = (props) => {

  const { item, onOpen} = props

  return (

    <View >
      <View style={styles.container}>
        <View style={[styles.titleView, {alignSelf: 'center', width: actuatedNormalize(80)}]}>
        <Text style={[styles.labelView, { fontWeight: 'bold' }]}>{`${item.shareholder_meeting_date}`}</Text>
        </View>

          <View style={[styles.sector, {flexDirection: 'row'}]}>
            <Text style={[styles.labelView]}>{`Date of Shareholder Meeting: `}</Text>
            <Text style={[styles.labelView]}>{`${item.shareholder_meeting_date}`}</Text>
          </View>
          <View style={[styles.sector, {flexDirection: 'row'}]}>
            <Text style={[styles.labelView]}>Type of meeting: </Text>
            <Text style={[styles.labelView]}>{item.type_of_meeting}</Text>
          </View>

        <View style={styles.sector}>
          <Text style={[styles.labelView]}>Resolution Extracted Date: {item.resolution_extraction_date}</Text>
        </View>

          <View style={styles.sector}>
            <Text style={styles.labelView}>Resolution Registration Date: {item.registration_date}</Text>
          </View>
          <View style={{paddingVertical: 6}}>
            <Text style={styles.labelView}>Location of the Original Resolution:</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 6 }}>
          <Text style={[styles.labelView]}>{item.location_of_registration}</Text>

          <TouchableOpacity style={{
            width: actuatedNormalize(120),
            marginTop: 15, shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            backgroundColor: '#fff', borderRadius: 10, padding: 5, alignItems: 'center'
          }}
          onPress={() => onOpen()}>
          <Text style={styles.link}>{'View Record'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Divider style={{ backgroundColor: '#808B96', marginVertical: 1 }} />
    </View>

  );
}
export default ROShareHoldersCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    width: 150,
    // marginBottom: 20
  },
  container: {
    // alignItems: 'fl',
    padding: 20
  },
  titleView: {
    borderRadius: 2,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#f1f3f2',
    marginBottom:5
  },
  notes: {
    fontSize: 15,
    color: '#99A3A4',
  },
  link: {
    fontSize: 15,
    color: '#268d9c',
    // textDecorationLine: 'underline',
  },
  labelView: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#000',
    // textTransform: 'capitalize's
  },
  logoImage: {
    width: null,
    resizeMode: 'contain',
    height: 26
  },
  sector: {
    paddingVertical: 6,
    borderRadius: 2,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#f1f3f2',
  }
});
