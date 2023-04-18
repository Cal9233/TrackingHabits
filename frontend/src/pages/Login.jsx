import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa'
import Spinner from '../components/Spinner';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const {email, password} = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  const onChange = (e) => {
    const data = {
      [e.target.id]: e.target.value
    };
    setFormData(data);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
  }

  if(state.isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt/> Login
        </h1>
        <p>Login to Track your Habits</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              name='email'
              className="form-control" 
              id="email" 
              placeholder='Enter your Email'
              value={email}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input 
              type="password" 
              name='password'
              className="form-control" 
              id="password" 
              placeholder='Enter your Password'
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group'>
            <button className="btn btn-block">submit</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login