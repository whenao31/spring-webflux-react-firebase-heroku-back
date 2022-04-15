import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchQuestions } from '../actions/questionActions'
import CategoriesFilter from '../components/CategoriesFilter'
import { Question } from '../components/Question'

const QuestionsPage = () => {

    const questionState = useSelector((state) => state.question);
    const {loading, questions, hasErrors, } = questionState;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])
    
    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        return questions.map(question => <Question key={question.id} question={question} excerpt />)
    }

    return (
        <section>
            <h1>Questions</h1>
            <CategoriesFilter fetchFunction={fetchQuestions}/>
            {renderQuestions()}
        </section>
    )
}

export default QuestionsPage
