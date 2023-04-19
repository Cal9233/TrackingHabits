import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createHabit, reset } from '../redux/reducers/habitSlicer';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const NewHabit = () => {
  const { user } = useSelector((state) => state.auth)

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('Incomplete');

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.habits);

  useEffect(() => {
      if(isError){
          console.log(`error: ${message}`)
          toast.error(message)
      }
      if(isSuccess){
          dispatch(reset());
          navigate('/habits')
      }
      dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(createHabit({ task, status }))
      .unwrap()
      .then(() => {
        navigate('/habits')
        toast.success('New habit created!')
      })
      .catch(toast.error)
  }

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <BackButton />
      <section className='heading'>
        <h1>Create New Habit</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' className='form-control' value={name} disabled />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='text' className='form-control' value={email} disabled />
        </div>
        <form onSubmit={onSubmit}>
        <div className='form-group'>
            <label htmlFor='task'>Description of the habit</label>
            <textarea
              name='task'
              id='task'
              className='form-control'
              placeholder='Task'
              value={task}
              onChange={(e) => setTask(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <label htmlFor='status'>Status</label>
            <select
              name='status'
              id='status'
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value='Incomplete'>Incomplete</option>
              <option value='Complete'>Complete</option>
            </select>
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewHabit