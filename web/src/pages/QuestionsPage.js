import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchQuestions } from '../actions/questionActions'
import CategoriesFilter from '../components/CategoriesFilter'
import { SearchableDropdown } from '../components/dropdown/SearchableDropdown'
import { Question } from '../components/Question'
import { findUserById } from '../firebase'

import '../assets/styles/questionUserInfo.css'

const defaultImageUrl = "https://www.gravatar.com/avatar/?d=identicon";

const QuestionsPage = () => {

    const questionState = useSelector((state) => state.question);
    const {uid, firstName, profileImage} = useSelector((state) => state.auth);
    const {loading, questions, hasErrors, } = questionState;

    const [searchTerm, setSearchTerm] = useState("");

    const dispatch = useDispatch();

    const result = !searchTerm ?
        questions :
        questions.filter(question => 
            question.question.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

    useEffect(() => {
        dispatch(fetchQuestions())
        findUserById(uid, dispatch);
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

        // return result.map(question => <Question key={question.id} question={question} excerpt />)
        return result.map((question) => {
            return (
                <div key={question.id} style={{"display": "flex", "marginBottom": "2rem"}}>
                    {
                        (question.userId === uid) &&
                        // <div style={{"marginRight": "1rem"}}>
                        <div className="full border" style={{"marginRight": "1rem"}}>
                            <img src={profileImage} alt="user pic" style={{'width': '40px', 'height': '40px'}}/>
                            <h6>{firstName}</h6>
                        </div>
                    }
                    <Question question={question} excerpt />
                </div>
            );
        });
    }

    return (
        <section>
            <h1>Questions</h1>
            {
                (!loading && !hasErrors) &&
                <>
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
                </>
            }            
            {renderQuestions()}
        </section>
    )
}

export default QuestionsPage
