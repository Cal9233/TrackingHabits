import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import { FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { getHabit, closeHabit } from '../redux/reducers/habitSlicer';
import { getNotes, createNote } from '../redux/reducers/noteSlicer';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import NoteItem from '../components/NoteItem';

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative',
  },
}

Modal.setAppElement('#root')

const Habit = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')
  const { task, isLoading, isError, isSuccess, message } = useSelector((state) => state.habits)

  const { notes } = useSelector((state) => state.notes)

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { habitId } = useParams()

  useEffect(() => {
    dispatch(getHabit(habitId)).unwrap().catch(toast.error)
    dispatch(getNotes(habitId)).unwrap().catch(toast.error)
  }, [habitId, dispatch])

  // Close habit
  const onHabitClose = () => {
    dispatch(closeHabit(habitId))
      .unwrap()
      .then(() => {
        toast.success('habit Closed')
        navigate('/habits')
      })
      .catch(toast.error)
  }

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault()
    dispatch(createNote({ noteText, habitId }))
      .unwrap()
      .then(() => {
        setNoteText('')
        closeModal()
      })
      .catch(toast.error)
  }

  // Open/close modal
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='habit-page'>
      <header className='habit-header'>
        <BackButton />
        <h2>
          Habit ID: {task._id ? task._id : ''}
          <span className={`status status-${task.status ? task.status : ''}`}>
            {task.status ? task.status : ''}
          </span>
        </h2>
        <h3>
          Date Submitted: {new Date(task.createdAt).toLocaleString('en-US')}
        </h3>
        <hr />
        <div className='habit-desc'>
          <h3>Description of Issue</h3>
          <p>{task.task}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {task.status !== 'Complete' && (
        <button onClick={openModal} className='btn'>
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel='Add Note'
      >
        <h2>Add Note</h2>
        <button className='btn-close' onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea
              name='noteText'
              id='noteText'
              className='form-control'
              placeholder='Note text'
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes ? (
        notes.map((note) => <NoteItem key={note._id} note={note} />)
      ) : (
        <Spinner />
      )}

      {task.status !== 'Complete' && (
        <button onClick={onHabitClose} className='btn btn-block btn-danger'>
          Close habit
        </button>
      )}
    </div>
  )
}

export default Habit