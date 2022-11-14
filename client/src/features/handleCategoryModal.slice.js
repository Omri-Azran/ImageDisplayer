import { createSlice } from "@reduxjs/toolkit"

const categoryModalSlice = createSlice({
    name: 'categoryModal',
    initialState: {
      value: false
    },
    reducers: {
      setCategoryModal : (state, action) => {
        state.value = action.payload
      }
    }
  })
  
  export const {setCategoryModal} = categoryModalSlice.actions
  
  export default categoryModalSlice.reducer;
  
