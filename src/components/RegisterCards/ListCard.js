import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, Divider } from 'react-native-elements';
// import actuatedNormalize from '../../helpers/actuatedNormalize';

const ListCard = (props) => {

  const { item, onOpen } = props

  return (

    <View >
      <View style={styles.container}>
        {/* <View style={[{marginBottom: 10}]}>
            <Image
              style={styles.logoImage}
              source={require('../assets/logos.png')}
            />
          </View> */}
        <View style={{ flexDirection: 'row' }}>
          <View style={[{ flex: 2 }, styles.sector]}>
            <Text style={[styles.labelView]}>{`Name of Member:`}</Text>
            <Text style={[styles.labelView, { fontWeight: 'bold' }]}>{`${item.member}`}</Text>
          </View>
          <View style={[{ flex: 1 }, styles.sector]}>
            <Text style={[styles.labelView]}>Certificate:</Text>
            <Text style={[styles.labelView, { fontWeight: 'bold' }]}>{item.cert_no}</Text>
          </View>

        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={[styles.labelView]}>Shares:</Text>
          <Text style={[styles.labelView]}> {item.shares_no}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={[{ flex: 1, flexDirection: 'row' }, styles.sector]}>
            <Text style={styles.labelView}>Paid: {item.amount_paid}</Text>
          </View>
          <View style={[{ flex: 2, flexDirection: 'row' }, styles.sector]}>
            <Text style={styles.labelView}>Date of Transfer: {item.date_transfered}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>

        </View>

        <Text style={[styles.labelView, styles.sector]}>To Whom Ordinary: {item.to_whom}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
          <Text style={[styles.labelView, { flex: 2 }]}>Shares Transfered: {item.shares_transfered}</Text>

          <TouchableOpacity style={{
            marginTop: 15, flex: 1, shadowColor: '#000',
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
export default ListCard;

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
    // flex: 5,
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
    borderRadius: 2,
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    borderColor: '#f1f3f2',
    paddingBottom: 10,
    paddingTop: 5
  }
});
