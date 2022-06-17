import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Card, Divider } from 'react-native-elements';
import colors from '../assets/theme/colors';
import actuatedNormalize from '../helpers/actuatedNormalize';

const next = (onOpen, theStyles = {
  marginTop: 15, flex: 1, shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,
  elevation: 3,
  backgroundColor: '#fff', borderRadius: 10, padding: 5, alignItems: 'center'
}) => {
  return (
    <TouchableOpacity style={theStyles}
      onPress={() => onOpen()}>
      <Text style={styles.link}>{'View Record'}</Text>
    </TouchableOpacity>
  )
}

const ROShareHoldersCard = (props) => {

  const { item, onOpen } = props

  return (

    <View >
      <View style={styles.container}>
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
          {next(onOpen)}
        </View>
      </View>

      <Divider style={{ backgroundColor: '#808B96', marginVertical: 1 }} />
    </View>

  );
}
const MOShareHoldersCard = (props) => {

  const { item, onOpen } = props

  return (

    <View >
      <View style={styles.container}>
        <View style={[styles.titleView, { alignSelf: 'center', width: actuatedNormalize(80) }]}>
          <Text style={[styles.labelView, { fontWeight: 'bold' }]}>{`${item.shareholder_meeting_date}`}</Text>
        </View>

        <View style={[styles.sector, { flexDirection: 'row' }]}>
          <Text style={[styles.labelView]}>{`Date of Shareholder Meeting: `}</Text>
          <Text style={[styles.labelView]}>{`${item.shareholder_meeting_date}`}</Text>
        </View>
        <View style={[styles.sector, { flexDirection: 'row' }]}>
          <Text style={[styles.labelView]}>Type of meeting: </Text>
          <Text style={[styles.labelView]}>{item.type_of_meeting}</Text>
        </View>

        <View style={styles.sector}>
          <Text style={[styles.labelView]}>Resolution Extracted Date: {item.resolution_extraction_date}</Text>
        </View>

        <View style={styles.sector}>
          <Text style={styles.labelView}>Resolution Registration Date: {item.registration_date}</Text>
        </View>
        <View style={{ paddingVertical: 6 }}>
          <Text style={styles.labelView}>Location of the Original Resolution:</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 6 }}>
          <Text style={[styles.labelView]}>{item.location_of_registration}</Text>

          {next(onOpen, styles.viewBtn)}

        </View>
      </View>

      <Divider style={{ backgroundColor: '#808B96', marginVertical: 1 }} />
    </View>

  );
}
const RODirectorsCard = (props) => {

  const { item, onOpen } = props

  return (

    <View >
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View style={[{ flex: 2 }, styles.sector]}>
            <Text style={[styles.labelView]}>{`Name of Director:`}</Text>
            <Text style={[styles.labelView, { fontWeight: 'bold' }]}>{`${item.director}`}</Text>
          </View>
          <View style={[{ flex: 1 }, styles.sector]}>
            <Text style={[styles.labelView]}>Nationality:</Text>
            <Text style={[styles.labelView]}>{item.nationality}</Text>
          </View>

        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={[styles.labelView]}>Address:</Text>
          <Text style={[styles.labelView]}> {item.director_address}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Date of Birth: {item.date_of_birth}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Office Held: {item.office_held}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Appointment Effective Date: {item.appointment_date}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Resignation Effective Date: {item.resignation_date}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Date of Board Resolution in which appointment was made: {item.date_resolution_appointment}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Date of Cessation of Office: {item.office_cessation_date}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
          <Text style={[styles.labelView, { flex: 2 }]}>Documents: {item.no_of_attachments}</Text>

          {next(onOpen)}

        </View>
      </View>

      <Divider style={{ backgroundColor: '#808B96', marginVertical: 1 }} />
    </View>

  );
}
const RODInterestCard = (props) => {

  const { item, onOpen } = props

  return (

    <View >
      <View style={styles.container}>
        <View style={[styles.sector, { flexDirection: 'row' }]}>
          <Text style={[styles.labelView]}>{`Director: `}</Text>
          <Text style={[styles.labelView, { fontWeight: 'bold' }]}>{`${item.director}`}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Date Notified: {item.date_notified}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
          <Text style={[styles.labelView, { flex: 2 }]}>Documents: {item.no_of_attachments}</Text>

          {next(onOpen)}

        </View>
      </View>

      <Divider style={{ backgroundColor: '#808B96', marginVertical: 1 }} />
    </View>

  );
}
const RODirectorsSHgCard = (props) => {

  const { item, onOpen } = props

  return (

    <View >
      <View style={styles.container}>
        <View style={[styles.sector, { flexDirection: 'row' }]}>
          <Text style={[styles.labelView]}>{`Director: `}</Text>
          <Text style={[styles.labelView, { fontWeight: 'bold' }]}>{`${item.director}`}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Date of Entry: {item.date_of_entry}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Date of Notification: {item.notification_date}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}> Amount of class of shares: {item.amount_of_class}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}> Date of Grant of Right: {item.grant_right_date}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}> Period of Grant: {item.period_of_grant}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>What Consideration?: {item.consideration}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Name in which shares: {item.registered_name}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
          <Text style={[styles.labelView, { flex: 2 }]}>Documents: {item.no_of_attachments}</Text>

          {next(onOpen)}

        </View>
      </View>

      <Divider style={{ backgroundColor: '#808B96', marginVertical: 1 }} />
    </View>

  );
}
const MODirectorsCard = (props) => {

  const { item, onOpen } = props

  return (

    <View >
      <View style={styles.container}>
        <View style={[styles.titleView, { alignSelf: 'center', width: actuatedNormalize(80) }]}>
          <Text style={[styles.labelView, { fontWeight: 'bold' }]}>{`${item.date_of_board_meeting}`}</Text>
        </View>

        <View style={[styles.sector, { flexDirection: 'row' }]}>
          <Text style={[styles.labelView]}>{` Meeting was `}</Text>
          <Text style={[styles.labelView]}>{`${item.venue_type}.`}</Text>
        </View>

        <View style={styles.sector}>
          <Text style={[styles.labelView]}>Resolution Extracted Date: {item.resolution_extracted_date}</Text>
        </View>

        <View style={styles.sector}>
          <Text style={styles.labelView}>Resolution Registration Date: {item.resolution_registration_date}</Text>
        </View>
        <View style={{ paddingVertical: 6 }}>
          <Text style={styles.labelView}>Location of the Original Resolution: {item.location_of_the_orgin_issue}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
          <Text style={[styles.labelView, { flex: 2 }]}>Documents: {item.no_of_attachments}</Text>

          {next(onOpen, styles.viewBtn)}
        </View>
      </View>

      <Divider style={{ backgroundColor: '#808B96', marginVertical: 1 }} />
    </View>

  );
}
const ROSecretatriesCard = (props) => {

  const { item, onOpen } = props

  return (

    <View >
      <View style={styles.container}>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={[styles.labelView]}>{`Name of Secretary: `}</Text>
          <Text style={[styles.labelView, { fontWeight: 'bold' }]}>{`${item.secretary}`}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={[styles.labelView]}>Address:</Text>
          <Text style={[styles.labelView]}> {item.secretary_address}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Office Held: {item.office_held}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Appointment Effective Date: {item.appointment_date}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Notification of Appointment: {item.appointment_date}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Resignation Effective Date: {item.resignation_date}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}> Notification of Resignation: {item.date_notificatn_resignation}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
          <Text style={[styles.labelView, { flex: 2 }]}>Documents: {item.no_of_attachments}</Text>

          {next(onOpen)}

        </View>
      </View>

      <Divider style={{ backgroundColor: '#808B96', marginVertical: 1 }} />
    </View>

  );
}
const ROMortgagesCard = (props) => {

  const { item, onOpen } = props

  return (

    <View >
      <View style={styles.container}>
        <View style={[styles.sector, { flexDirection: 'row' }]}>
          <Text style={[styles.labelView]}>{`Chargor / Mortgagor: `}</Text>
          <Text style={[styles.labelView, { fontWeight: 'bold' }]}>{`${item.chargor}`}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Date of Creation: {item.creation_date}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={[styles.labelView]}>Address of Charger:</Text>
          <Text style={[styles.labelView]}> {item.chargor_address}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Date of Discharge of Property: {item.property_discharge_date}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
          <Text style={[styles.labelView, { flex: 2 }]}>Documents: {item.no_of_attachments}</Text>

          {next(onOpen)}

        </View>
      </View>

      <Divider style={{ backgroundColor: '#808B96', marginVertical: 1 }} />
    </View>

  );
}
const CoSealRegisterCard = (props) => {

  const { item, onOpen } = props

  return (

    <View >
      <View style={styles.container}>

        <View style={[styles.sector, { flexDirection: 'row' }]}>
          <Text style={[styles.labelView]}>{` Date when the Seal was affixed: `}</Text>
          <Text style={[styles.labelView]}>{`${item.seal_affixation_date}`}</Text>
        </View>

        <View style={styles.sector}>
          <Text style={[styles.labelView]}>Particulars of Parties: {item.parties_particulars}</Text>
        </View>

        <View style={{ paddingVertical: 6 }}>
          <Text style={styles.labelView}>Location of Executed Documents: {item.executed_doc_location}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
          <Text style={[styles.labelView, { flex: 2 }]}>Documents: {item.no_of_attachments}</Text>

          {next(onOpen)}

        </View>
      </View>

      <Divider style={{ backgroundColor: '#808B96', marginVertical: 1 }} />
    </View>

  );
}
const RODebenturesCard = (props) => {

  const { item, onOpen } = props

  return (

    <View >
      <View style={styles.container}>
          <View style={[{ flexDirection: 'row' }, styles.sector]}>
            <Text style={[styles.labelView]}>{`Number of Debenture (Series): ${item.debenture_no}`}</Text>
          </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Date of Debenture (Series): {item.date_of_debenture}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Date of Resolutions Authorizing the Issue of Debentures: {item.debenture_authorization_date}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={[styles.labelView]}>Amount Secured:</Text>
          <Text style={[styles.labelView]}> {item.amount_secured}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Name of Debenture Holder: {item.debenture_holder}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Address of Debenture Holder: {item.debenture_holder_address}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Rate of Interest per Annum: {item.yearly_interest_rate}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Interest per annum: {item.yearly_interest}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Date of Interest Becoming Due: {item.date_interest_becoming_due}</Text>
        </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={styles.labelView}>Date of Redemption: {item.redemption_date}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5 }}>
          <Text style={[styles.labelView, { flex: 2 }]}>Documents: {item.no_of_attachments}</Text>

          {next(onOpen)}

        </View>
      </View>

      <Divider style={{ backgroundColor: '#808B96', marginVertical: 1 }} />
    </View>

  );
}
const ROBranchesCard = (props) => {

  const { item, onOpen } = props

  return (

    <View >
      <View style={styles.container}>
          <View style={[{ flexDirection: 'row' }, styles.sector]}>
            <Text style={[styles.labelView]}>{`Name of Member: `}</Text>
            <Text style={[styles.labelView, { fontWeight: 'bold' }]}>{`${item.member}`}</Text>
          </View>
        <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={[styles.labelView]}>Address:</Text>
          <Text style={[styles.labelView]}> {item.member_address}</Text>
        </View>

          <View style={[{ flexDirection: 'row' }, styles.sector]}>
            <Text style={styles.labelView}>Date of Entry of Member: {item.date_of_entry}</Text>
          </View>
          <View style={[{ flexDirection: 'row' }, styles.sector]}>
            <Text style={styles.labelView}>Class Of Shareholding: {item.shareholding_class}</Text>
          </View>

          <View style={[{ flexDirection: 'row' }, styles.sector]}>
          <Text style={[styles.labelView]}> Number Of Shares Held: {item.shares_no}</Text>
          </View>

          <Text style={[styles.labelView, styles.sectorL]}>Membership End Date: {item.membership_end_date}</Text>

        <View style={{ alignItems: 'flex-end', paddingTop: 5 }}>
          {next(onOpen, styles.viewBtn)}
        </View>
      </View>

      <Divider style={{ backgroundColor: '#808B96', marginVertical: 1 }} />
    </View>

  );
}
export {
  MOShareHoldersCard, ROShareHoldersCard, RODirectorsCard, RODInterestCard, RODirectorsSHgCard,
  MODirectorsCard, ROSecretatriesCard, ROMortgagesCard, CoSealRegisterCard, RODebenturesCard, ROBranchesCard
};

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
    marginBottom: 5
  },
  notes: {
    fontSize: 15,
    color: '#99A3A4',
  },
  link: {
    fontSize: 15,
    color: colors.button,
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
  },
  sectorL: {
    paddingTop: 7
  },
  viewBtn: {
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
  }
});
