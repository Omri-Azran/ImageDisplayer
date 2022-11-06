import { createSlice } from "@reduxjs/toolkit"

const handlePhotos = createSlice({
    name: 'handlePhotos',
    initialState: {
      value: []
    },
    reducers: {
    // I tried to make a "dumb" project and then learn Redux and convert it but i couldnt figure it out on time.
    // I believe that with a little more Redux practice I could handle that
      getAllPhotos: (state,action) => {
        state.value = action.payload 
      },
      getSinlgePhoto: (state,action) => {
        state.value = action.payload
      }
    }
  })
  
  export const { getAllPhotos, getSinlgePhoto } = handlePhotos.actions
  
  export default handlePhotos.reducer;
  