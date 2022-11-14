import {configureStore } from '@reduxjs/toolkit'
import handleCategoryModalReducer /*can be any name*/ from '../features/handleCategoryModal.slice'; 
import handleImageModalReducer /*can be any name*/ from '../features/handleImageModal.slice'

export const store = configureStore({
  reducer: { // you can write an entire reducer in here. most commonly you import the reducer and just use it
    // combineReducer in action; combine all of your reducer to one! 
    handleCategoryModal : handleCategoryModalReducer,
    handleImageModal : handleImageModalReducer
  },
});
