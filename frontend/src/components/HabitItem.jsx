import { Link } from 'react-router-dom'

const HabitItem = ({ habit }) => {

  const date = (habit) => {
    try {
      let newDate = new Date(habit.createdAt).toLocaleString('en-US');
      return newDate;
    } catch(e) {
      console.log(`Error: ${e}`);
    }
  };
  
  return (
    <div className='habit'>
      <div>{date(habit)}</div>
      <div>{habit.task}</div>
      <div className={`status status-${habit.status}`}>{habit.status}</div>
      <Link to={`/habit/${habit._id}`} className='btn btn-reverse btn-sm'>
        View
      </Link>
    </div>
  )
}

export default HabitItem