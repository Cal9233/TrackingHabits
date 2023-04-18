import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';

const initialState = {
    habits: null,
    habit: null
};

export const habitSlice = createSlice({
    name: 'habit',
    initialState,
    reducers: {},
});

export default habitSlice.reducer;