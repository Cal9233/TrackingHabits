import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import habitService from '../services/habitService';
import { extractErrorMessage } from '../../utilities';

const initialState = {
  tasks: null,
  task: null,
  status: null
}

// Create new habit
export const createHabit = createAsyncThunk(
  'habits/create',
  async (habitData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await habitService.createHabit(habitData, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Get user habits
export const getHabits = createAsyncThunk(
  'habits/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await habitService.getHabits(token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Get user habit
export const getHabit = createAsyncThunk(
  'habits/get',
  async (habitId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await habitService.getHabit(habitId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

// Close habit
export const closeHabit = createAsyncThunk(
  'habits/close',
  async (habitId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await habitService.closeHabit(habitId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
    }
  }
)

export const habitSlice = createSlice({
  name: 'habits',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getHabits.pending, (state) => {
        state.task = null
      })
      .addCase(getHabits.fulfilled, (state, action) => {
        state.tasks = action.payload
      })
      .addCase(getHabit.fulfilled, (state, action) => {
        state.task = action.payload
      })
      .addCase(closeHabit.fulfilled, (state, action) => {
        state.task = action.payload
        state.tasks = state.tasks.map((habit) =>
          habit._id === action.payload._id ? action.payload : habit
        )
      })
  },
})

export default habitSlice.reducer