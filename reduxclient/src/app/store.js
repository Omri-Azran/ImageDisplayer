import {configureStore } from '@reduxjs/toolkit'
import paginatorReducer from '../features/paginator.slice';

export const store = configureStore({
  reducer: {
    // combineReducer in action 
    paginator : paginatorReducer,
  },
});
