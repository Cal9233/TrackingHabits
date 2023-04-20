import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import habitService from '../services/habitService';
import { extractErrorMessage } from '../../utilities';

const initialState = {
  tasks: [],
  task: {},
  status: null,
  isError: false,
  isSuccess: false,
  message: '',
  isLoading: false,
}

// Create new habit
export const createHabit = createAsyncThunk(
  'habits/create',
  async (habitData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await habitService.createHabit(habitData, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
          || error.message || error.toString();
      return thunkAPI.rejectWithValue(extractErrorMessage(message));
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
      const message = (error.response && error.response.data && error.response.data.message)
          || error.message || error.toString();
      return thunkAPI.rejectWithValue(extractErrorMessage(message));
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
      const message = (error.response && error.response.data && error.response.data.message)
          || error.message || error.toString();
      return thunkAPI.rejectWithValue(extractErrorMessage(message));
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
      const message = (error.response && error.response.data && error.response.data.message)
          || error.message || error.toString();
      return thunkAPI.rejectWithValue(extractErrorMessage(message));
    }
  }
)

export const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHabits.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getHabits.fulfilled, (state, action) => {
        state.tasks = action.payload
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getHabits.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getHabit.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getHabit.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getHabit.fulfilled, (state, action) => {
        state.task = action.payload
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(closeHabit.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.task = action.payload
        state.tasks = state.tasks.map((task) =>
          task._id === action.payload._id ? (task.status = 'Incomplete') : task
        )
      })
  },
})

export const {reset} = habitSlice.actions;
export default habitSlice.reducer;