import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getHabits } from '../redux/reducers/habitSlicer';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import HabitItem from '../components/HabitItem';

const Habits = () => {
  const { tasks } = useSelector((state) => state.habits)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHabits())
  }, [dispatch])

  if (!tasks) {
    return <Spinner />
  }

  return (
    <>
      <BackButton />
      <h1>Habits</h1>
      <div className='habits'>
        <div className='habit-headings'>
          <div>Date</div>
          <div>Task</div>
          <div>Status</div>
          <div></div>
        </div>
        {tasks.map((habit) => (
          <HabitItem key={habit._id} habit={habit} />
        ))}
      </div>
    </>
  )
}

export default Habits