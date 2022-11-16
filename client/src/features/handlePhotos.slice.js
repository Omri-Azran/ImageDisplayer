import { createSlice } from "@reduxjs/toolkit"

const photosDataSlice = createSlice({
    name: 'photosData',
    initialState: {
      value: []
    },
    reducers: {
      setPhotosData : (state, action) => {
        state.value = action.payload
      }
    }
  })
  
  export const {setPhotosData} = photosDataSlice.actions
  
  export default photosDataSlice.reducer;
  
