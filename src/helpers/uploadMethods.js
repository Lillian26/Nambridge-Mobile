
import DocumentPicker from 'react-native-document-picker';

export function handleChangeInput(i, value, name, uploads, setUploads, setValidUploads) {
  if (value) {
    const values = [...uploads];

    // console.log('values[i][name]', values[i][name])
    const thisVal = name === "Type" ? value : value[0]
    const otherVal = name === "Type" ? values[i]["Document"] : values[i]["Type"]

    if (values[i] && name === "Document") {
      values[i]["Document"] = thisVal
      values[i]["Type"] = otherVal
    }
    else {
      values[i]["Type"] = thisVal
      values[i]["Document"] = otherVal
    }

    setValidUploads(values.filter(x => Object.values(x).some(x => x === '')).length == 0)
    setUploads(values);
    // console.log(uploads);
  }
}

export function handleAdd(uploads, setUploads, setValidUploads) {
  const values = [...uploads];
  // values.push({ value: null });
  values.push({
    Type: '',
    Document: '',
  });
  setValidUploads(false)
  setUploads(values);
}

export function handleRemove(i, uploads, setUploads, setValidUploads) {
  const values = [...uploads];
  values.splice(i, 1);
  setValidUploads(values.filter(x => Object.values(x).some(x => x === '')).length == 0)
  setUploads(values);
}

export const fetchDocumentTypes = (docTypes, setDocumentTypes) => {
  let dTypes = []
  docTypes.forEach(x => {
    dTypes.push({ label: x.name, value: x.id })
  })
  setDocumentTypes(dTypes);
}

export const selectOneFile = async (idx, uploads, setUploads, setValidUploads) => {
  //Opening Document Picker for selection of one file
  try {
    const res = await DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    });

    // return res;
    // console.log(res, '/n', idx)
    handleChangeInput(idx, res, 'Document', uploads, setUploads, setValidUploads);
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
    return null
  }
};