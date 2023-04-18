import { Link } from 'react-router-dom'
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa'

function Home() {
  return (
    <>
      <section className='heading'>
        <h1>Habit Tracker</h1>
        <p>Please enter a Habit you want to track</p>
      </section>

      <Link to='/new-habit' className='btn btn-reverse btn-block'>
        <FaQuestionCircle /> Create New Habit
      </Link>

      <Link to='/habits' className='btn btn-block'>
        <FaTicketAlt /> View My Habits
      </Link>
    </>
  )
}

export default Home