import { createSlice } from "@reduxjs/toolkit"

const imageModalSlice = createSlice({
    name: 'imageModal',
    initialState: {
      value: false
    },
    reducers: {
      setImageModal : (state, action) => {
        state.value = action.payload
      }
    }
  })
  
  export const {setImageModal} = imageModalSlice.actions
  
  export default imageModalSlice.reducer;
  
