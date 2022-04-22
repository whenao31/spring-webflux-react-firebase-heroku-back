import React, { useEffect } from 'react'

import { fetchQuestion } from '../actions/questionActions'

import { Question } from '../components/Question'
import { Answer } from '../components/Answer'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

const SingleQuestionPage = ({ match, }) => {

  const questionState = useSelector((state) => state.question);
  const {loading, question, hasErrors, redirect} = questionState;

  const {firstName, profileImage} = useSelector((state) => state.auth);
  const userId = useSelector((state) => state.auth.uid)

  const { id } = match.params

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestion(id))
  }, [dispatch, id, redirect])

  const renderQuestion = () => {
    if (loading.question) return <p>Loading question...</p>
    if (hasErrors.question) return <p>Unable to display question.</p>

    return <Question question={question} />
  }

  const renderAnswers = () => {
    return (question.answers && question.answers.length) ? question.answers.map(answer => {
        const userInfo = {firstName: firstName, profileImage: profileImage};
        return (
          <Answer 
            key={answer.id}
            answer={answer}
          />
        )
      }
    ) : <p>Empty answer!</p>;
  }

  return (
    <section>
      {renderQuestion()}
      {userId && <Link to={"/answer/" + id} className="button right">
        Reply
      </Link>}

      <h2>Answers</h2>
      {renderAnswers()}
    </section>
  )
}

export default SingleQuestionPage
