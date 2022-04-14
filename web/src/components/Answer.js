import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { deleteAnswer, } from '../actions/questionActions';

export const Answer = ({ answer }) => {

  const userId = useSelector((state) => state.auth.uid);

  const dispatch = useDispatch();

  const deleteHanlde = () => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
          dispatch(deleteAnswer(answer))
          Swal.fire(
              'Deleted!',
              `Your answer '${answer.id}' has been deleted.`,
              'success'
          )
      }
    })
  }

  return (
      <aside className="answer">
        {
        answer.userId === userId && 
        <button
        className='button right'
        onClick={deleteHanlde}
        >Delete</button>
        }
        <p>{answer.answer}</p>
      </aside>
  )
}
