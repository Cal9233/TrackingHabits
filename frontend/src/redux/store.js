import {configureStore} from '@reduxjs/toolkit';
import authReducer from './reducers/authSlicer';
import habitReducer from './reducers/habitSlicer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        habits: habitReducer,
    },
});