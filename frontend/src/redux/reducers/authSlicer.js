import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

//const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    //user: user ? user : null,
    user: null,
    isLoading: false
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
});

export default authSlice.reducer;