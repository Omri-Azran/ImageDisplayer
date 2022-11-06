import { createSlice } from "@reduxjs/toolkit"

const paginatorSlice = createSlice({
    name: 'pagination',
    initialState: {
      value: 1
    },
    reducers: {
      incremented: state => {
        state.value += 1
      },
      decremented: state => {
        state.value -= 1
      },
      incrementByValue : (state,action) =>{
        state.value +=action.payload
      }
    }
  })
  
  export const { incremented, decremented, incrementByValue } = paginatorSlice.actions
  
  export default paginatorSlice.reducer;
  