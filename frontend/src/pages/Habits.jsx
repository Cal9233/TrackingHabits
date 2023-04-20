import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getHabits } from '../redux/reducers/habitSlicer';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import { toast } from 'react-toastify';
import HabitItem from '../components/HabitItem';

const Habits = () => {
  const { task, tasks, isLoading, isError, isSuccess, message } = useSelector((state) => state.habits)
  
  const dispatch = useDispatch()

  useEffect(() => {
    if(isError){
      toast.error(message)
    }
    dispatch(getHabits())
  }, [dispatch])

  if (isLoading) {
    return <Spinner />
  }

  console.log(`task: ${JSON.stringify(task)}`);
  console.log(`tasks: ${JSON.stringify(tasks)}`);

  return (
    <>
      <BackButton />
      {tasks && tasks.length > 0 ? (
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