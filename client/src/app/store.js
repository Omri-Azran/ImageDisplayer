import {configureStore } from '@reduxjs/toolkit'
import handlePhotoReducer from '../features/handlePhotos.slice';

export const store = configureStore({
  reducer: {
    // combineReducer in action; combine all of your reducer to one! 
    handlePhotos : handlePhotoReducer,
  },
});
