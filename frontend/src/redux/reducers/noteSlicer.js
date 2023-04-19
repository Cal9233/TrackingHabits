import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from '../services/noteService';
import { extractErrorMessage } from '../../utilities';

const initialState = {
  notes: null,
}

// Get habit notes
export const getNotes = createAsyncThunk(
  'notes/getAll',
  async (habitId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await noteService.getNotes(habitId, token)
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
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
      return thunkAPI.rejectWithValue(extractErrorMessage(error))
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
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload)
      })
  },
})

export default noteSlicer.reducer
