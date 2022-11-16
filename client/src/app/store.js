import {configureStore } from '@reduxjs/toolkit'
import CategoryModalReducer /*can be any name*/ from '../features/handleCategoryModal.slice'; 
import ImageModalReducer /*can be any name*/ from '../features/handleImageModal.slice'
import photosDataReducer from '../features/handlePhotos.slice'
import SinglePhotoReducer from '../features/handleSinglePhoto.slice';
export const store = configureStore({
  reducer: {
    // combineReducer in action; combine all of your reducer to one! 
    handleCategoryModal : CategoryModalReducer,
    handleImageModal : ImageModalReducer,
    handlePhotosData : photosDataReducer,
    handleSinglePhoto : SinglePhotoReducer
  },
});
