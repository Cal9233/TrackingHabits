import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getHabits, reset } from '../redux/reducers/habitSlicer';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { toast } from 'react-toastify';
import HabitItem from '../components/HabitItem';

const Habits = () => {
  const { tasks, isLoading, isError, isSuccess, message } = useSelector((state) => state.habits)

  const dispatch = useDispatch()

  useEffect(() => {
    if(isError){
      toast.error(message);
    }
    if(isSuccess || tasks){
      toast.done('Current tasks');
      dispatch(getHabits())
    }
  }, [dispatch, isSuccess, isError, message, tasks])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <BackButton />
      {tasks && tasks.length > 0  ? (
        <>
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
      ) : (
        <>
          <h1>No Habits Added Yet</h1>
        </>
      )}
      
    </>
  )
}

export default Habits