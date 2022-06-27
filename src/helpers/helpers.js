import moment from 'moment';
export const formatTheDateLabel = (dateStr = defaultDate) => {
  return dateStr.toString().split(" ").splice(1, 2).join(' ') + ', ' + dateStr.toString().split(" ")[3]
}

export const formatTheDateText = (dateStr) => {
  return dateStr.getFullYear() + '-' + (dateStr.getMonth() + 1) + '-' + dateStr.getDate()
}

export const defaultDate = new Date();

export const strToDate = (dateStr) => {

  // var dateString = dateStr;
  //   var dataSplit = dateString.split('/');
  //   var dateConverted;

  //   if (dataSplit[2].split(" ").length > 1) {

  //       var hora = dataSplit[2].split(" ")[1].split(':');
  //       dataSplit[2] = dataSplit[2].split(" ")[0];
  //       dateConverted = new Date(dataSplit[2], dataSplit[1]-1, dataSplit[0], hora[0], hora[1]);

  //   } else {
  //       dateConverted = new Date(dataSplit[2], dataSplit[1] - 1, dataSplit[0]);
  //   }
  //   return dateConverted
  // return dateStr.toDate('dd/mm/yyyy', '/')
  console.log("dateStr: ", new Date (moment(dateStr, 'DD/MM/YYYY')))
  // var date = new Date(dateStr);
  // if (isNaN(date.getTime())) {
  //   return defaultDate
  // }
  // else {
  //   return date
  // }

  // var parts ='2014-04-03'.split('-');
// Please pay attention to the month (parts[1]); JavaScript counts months from 0:
// January - 0, February - 1, etc.
// var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
return defaultDate
}

export const convertArrayToObject = (array) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item]: item,
    };
  }, initialValue);
};