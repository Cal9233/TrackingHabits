import { Link } from 'react-router-dom'

function HabitItem({ habit }) {
  return (
    <div className='habit'>
      <div>{new Date(habit.createdAt).toLocaleString('en-US')}</div>
      <div>{habit.product}</div>
      <div className={`status status-${habit.status}`}>{habit.status}</div>
      <Link to={`/habits/${habit._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}

export default HabitItem