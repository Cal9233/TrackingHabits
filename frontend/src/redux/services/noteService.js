import axios from 'axios'

const API_URL = '/api/habits/'

// Get habit notes
const getNotes = async (habitId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, habitId, '/notes', config)

  return response.data
}

// Create habit note
const createNote = async (noteText, habitId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(
    API_URL, habitId, '/notes',
    {
      text: noteText,
    },
    config
  )

  return response.data
}

const noteService = {
  getNotes,
  createNote,
}

export default noteService