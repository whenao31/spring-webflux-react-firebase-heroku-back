import React from 'react'
import { NavLink } from 'react-router-dom'

export const Question = ({ question, excerpt, onDelete }) => {
  
  return (
    <article className={excerpt ? 'question-excerpt' : 'question'}>
      <h2>{question.question}</h2>{question.category}  - <small>{question.type}</small>
      
      {onDelete && (
        <button className="button right" onClick={() => onDelete(question.id)}>DELETE</button>
      )}
      {excerpt && (
        <NavLink to={`/question/${question.id}`} className="button">
          View Question
        </NavLink>
      )}
    </article>
  )
}
