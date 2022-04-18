import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchQuestions } from '../actions/questionActions'
import CategoriesFilter from '../components/CategoriesFilter'
import { SearchableDropdown } from '../components/dropdown/SearchableDropdown'
import { Question } from '../components/Question'

const QuestionsPage = () => {

    const questionState = useSelector((state) => state.question);
    const {loading, questions, hasErrors, } = questionState;

    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();

    const result = !searchTerm ?
        questions :
        questions.filter(question => 
            question.question.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

    useEffect(() => {
        dispatch(fetchQuestions())
    }, [dispatch])

    const matchClickHandler = (matchQuestion) => {
        setSearchTerm(matchQuestion);
    }

    // const handleKeyDown = (e, first) => {
    //     console.log(e.keyCode);
    //     if(e.keyCode === 13) {
    //         console.log(first)
    //     }
    // }
    
    const renderQuestions = () => {
        if (loading) return <p>Loading questions...</p>
        if (hasErrors) return <p>Unable to display questions.</p>

        // return questions.map(question => <Question key={question.id} question={question} excerpt />)
        return result.map(question => <Question key={question.id} question={question} excerpt />)
    }

    return (
        <section>
            <h1>Questions</h1>
            <SearchableDropdown 
                list={questions.map(question => question.question)}
                onChangeHandler={(value) => { matchClickHandler(value);}}
                // handleKeyDown={handleKeyDown}
                // setFirstOption={setFirstOption}
            />
            {/* <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleChange}
            /> */}
            <CategoriesFilter fetchFunction={fetchQuestions}/>
            {renderQuestions()}
        </section>
    )
}

export default QuestionsPage
