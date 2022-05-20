import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  companyName: null,
  companyId: null,
};
const activeCompSlice = createSlice({
  name: "companyName",
  initialState,
  reducers: {
    setcompany: (state, action) => {
      return { 
        companyName: action.payload.companyName,
        companyId: action.payload.companyId,
       };
    },
    clearcompany: () => {
      return { 
        companyName: null,
        companyId: null,
      };
    },
  },
});
const { reducer, actions } = activeCompSlice;
export const { setcompany, clearcompany } = actions
export default reducer;