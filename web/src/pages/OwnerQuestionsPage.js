import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'

import { fetchOwnerQuestions, deleteQuestion } from '../actions/questionActions'
import CategoriesFilter from '../components/CategoriesFilter'
import { Question } from '../components/Question'

const OwnerQuestionsPage = () => {
    const questionState = useSelector((state) => state.question);
    const {loading, questions, hasErrors, redirect} = questionState;

    const userId = useSelector((state) => state.auth.uid);

    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(fetchOwnerQuestions(userId))
    }, [dispatch, userId]);

    useEffect(() => {
        if (redirect) {
            dispatch(fetchOwnerQuestions(userId))
        }
    }, [redirect, dispatch, userId]);

    const onDelete = (id) => {
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
                dispatch(deleteQuestion(id))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
          })
    }


    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        return questions.map(question => <Question
            key={question.id}
            question={question}
            excerpt onDelete={onDelete} />)
    }

    return (
        <section>
            <h1>Questions</h1>
            {/* {
                // questions.length > 0 ?  */}
                <CategoriesFilter fetchFunction={fetchOwnerQuestions} userId={userId}/> {/*:*/} 
                {/* <p>You haven't made any question yet...We encourage you to do it  <NavLink to="/new">here!</NavLink></p> */}
            {/* }             */}
            {renderQuestions()}
        </section>
    )
}

export default OwnerQuestionsPage;
