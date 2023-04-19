import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from '../services/noteService';
import { extractErrorMessage } from '../../utilities';

const initialState = {
  notes: null,
  isError: false,
  isSuccess: false,
  message: '',
  isLoading: false,
}

// Get habit notes
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (habitId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.getNotes(habitId, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
          || error.message || error.toString();
          return thunkAPI.rejectWithValue(extractErrorMessage(message));
    }
  }
)

// Create habit note
export const createNote = createAsyncThunk(
  'notes/create',
  async ({ noteText, habitId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.createNote(noteText, habitId, token)
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
          || error.message || error.toString();
          return thunkAPI.rejectWithValue(extractErrorMessage(message));
    }
  }
)

export const noteSlicer = createSlice({
  name: 'note',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.notes = null
        state.isLoading = true
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.notes = null
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.message = action.payload
      })
      .addCase(createNote.pending, (state) => {
        state.notes = null
        state.isLoading = true
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload)
      })
      .addCase(createNote.rejected, (state, action) => {
        state.notes = null
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export default noteSlicer.reducer
