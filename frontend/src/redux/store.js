import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/authSlicer';
import habitReducer from './reducers/habitSlicer';
import noteSlicer from './reducers/noteSlicer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        habits: habitReducer,
        notes: noteSlicer,
    },
});