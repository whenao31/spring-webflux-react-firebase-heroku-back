import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { deleteAnswer, } from '../actions/questionActions';

export const Answer = ({ answer }) => {

  const userId = useSelector((state) => state.auth.uid);
  const {firstName, profileImage} = useSelector((state) => state.auth);

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
      <div className="answer">
        
          <div style={{"display": "flex", "marginBottom": "0.5rem"}}>
            {
              (answer.userId === userId) &&
              <div className="full border" style={{"marginRight": "1rem"}}>
                  <img src={profileImage} alt="user pic" style={{'width': '30px', 'height': '30px'}}/>
                  <h6>{firstName}</h6>
              </div>
            }
            <p style={{"marginRight": "1rem", "flex": 3}}>{answer.answer}</p>
            {
              answer.userId === userId && 
              <div style={{"flex": 1}} >
                <button
                className='button right'
                onClick={deleteHanlde}
                >Delete</button>
              </div>
              }
          </div>
        
      </div>
  )
}
