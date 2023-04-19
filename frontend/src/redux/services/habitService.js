import axios from 'axios'

const API_URL = '/api/habits/'

// Create new ticket
const createHabit = async (habitData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, habitData, config)

  return response.data
}

// Get user Habits
const getHabits = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Get user Habit
const getHabit = async (habitId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, habitId, config)

  return response.data
}

// Close Habit
const closeHabit = async (habitId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(
    API_URL,
    habitId,
    { status: 'Complete' },
    config
  )

  return response.data
}

const habitService = {
  createHabit,
  getHabits,
  getHabit,
  closeHabit,
}

export default habitService