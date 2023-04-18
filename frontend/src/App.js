import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Home from './pages/Home';
import NewHabit from './pages/NewHabit';
import PrivateRoute from './components/PrivateRoute';
import Habits from './pages/Habits';

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className='container'>
          <Routes>
          <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/new-habit' element={<PrivateRoute />}>
              <Route path='/new-habit' element={<NewHabit />}/>
            </Route>
            <Route path='/habits' element={<PrivateRoute />}>
              <Route path='/habits' element={<Habits />}/>
            </Route>
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
