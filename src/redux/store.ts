// store.js
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import messageReducer from './slices/messageSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    message: messageReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
