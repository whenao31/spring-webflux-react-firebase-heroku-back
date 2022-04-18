import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { clearFilter, filterByCategory } from '../actions/questionActions';
import RadioButton from './RadioButton'

const CategoriesFilter = ({fetchFunction, userId}) => {

    const questionState = useSelector((state) => state.question);
    const {questions, filtered} = questionState;

    const [selectedButton, setSelectedButton] = useState("SELECT...");
    const [buttonDisabled, setBtnDisabled] = useState(false);

    const dispatch = useDispatch();
    
    const radioChangedHandler = (event) => {
        setSelectedButton(event.target.value);
        setBtnDisabled(true)
        dispatch(filterByCategory(event.target.value));
    }
    const clearFilterHandle = () => {
        dispatch(clearFilter());
        userId ? dispatch(fetchFunction(userId)) : dispatch(fetchFunction());
        setBtnDisabled(false)
        setSelectedButton("SELECT...");
    }

    return (
        <>
            <div><h3>Categories Filter</h3></div>

            {
            filtered && 
            <div>
                <button onClick={clearFilterHandle}>x</button>
                 Clear filter 
                <br/>
            </div>
            }
            <div>
                <RadioButton
                    changed={radioChangedHandler}
                    id='1'
                    isSelected={selectedButton === "TECHNOLOGY AND COMPUTER"}
                    label="TECHNOLOGY AND COMPUTER"
                    value="TECHNOLOGY AND COMPUTER"
                    disabled={buttonDisabled}
                />
                <RadioButton
                    changed={radioChangedHandler}
                    id='2'
                    isSelected={selectedButton === "SCIENCES"}
                    label="SCIENCES"
                    value="SCIENCES"
                    disabled={buttonDisabled}
                />
                <RadioButton
                    changed={radioChangedHandler}
                    id='3'
                    isSelected={selectedButton === "SOFTWARE DEVELOPMENT"}
                    label="SOFTWARE DEVELOPMENT"
                    value="SOFTWARE DEVELOPMENT"
                    disabled={buttonDisabled}
                />
                <RadioButton
                    changed={radioChangedHandler}
                    id='4'
                    isSelected={selectedButton === "SOCIAL SCIENCES"}
                    label="SOCIAL SCIENCES"
                    value="SOCIAL SCIENCES"
                    disabled={buttonDisabled}
                />
                <RadioButton
                    changed={radioChangedHandler}
                    id='5'
                    isSelected={selectedButton === "LANGUAGE"}
                    label="LANGUAGE"
                    value="LANGUAGE"
                    disabled={buttonDisabled}
                />            
            </div>
            <hr/>
            <br/>

            {questions.length === 0 && <h6>No questions found for this category.</h6>}
        </>
    )
}

export default CategoriesFilter