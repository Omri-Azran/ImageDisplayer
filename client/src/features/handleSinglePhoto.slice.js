import { createSlice } from "@reduxjs/toolkit"

const singlePhotoSlice = createSlice({
    name: 'singlehoto',
    initialState: {
      value: []
    },
    reducers: {
      setSinglePhoto : (state, action) => {
        state.value = action.payload
      }
    }
  })
  
  export const {setSinglePhoto} = singlePhotoSlice.actions
  
  export default singlePhotoSlice.reducer;
  
