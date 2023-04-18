import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { login, reset } from '../redux/reducers/authSlicer';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const {email, password} = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  useEffect(() => {
    if(state.isError){
      toast.error(state.message);
    }
    if(state.isSuccess || state.user){
      navigate('/');
    }
    dispatch(reset());
  }, [state.isError, state.message, state.user]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    if(!email || !password){
      toast.error('Fields are empty');
    } else {
      const userData = {
        email,
        password
      };
      dispatch(login(userData))
        .unwrap()
        .then((user) => {
          toast.success(`Welcome ${user[0]}`);
          navigate('/');
        })
    }
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