import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {  fetchQuestion, postAnswer } from '../actions/questionActions'
import { Question } from '../components/Question'
import { useSelector, useDispatch } from "react-redux";

const FormPage = ({ match }) => {
    
    const questionState = useSelector((state) => state.question);
    const {loading, question, hasErrors, redirect} = questionState;

    const userId = useSelector((state) => state.auth.uid);

    const dispatch = useDispatch();
    
    const { register, handleSubmit } = useForm();
    const { id } = match.params
    const history = useHistory();

    const onSubmit = data => {
        data.userId =  userId;
        data.questionId = id;
        dispatch(postAnswer(data));
    };

    useEffect(() => {
        dispatch(fetchQuestion(id))
    }, [dispatch, id])

    useEffect(() => {
        if (redirect) {
            history.push(redirect);
        }
    }, [redirect, history])

    const renderQuestion = () => {
        if (loading.question) return <p>Loading question...</p>
        if (hasErrors.question) return <p>Unable to display question.</p>

        return <Question question={question} />
    }


    return (
        <section>
            {renderQuestion()}
            <h1>New Answer</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label for="answer">Answer</label>
                    <textarea id="answer" {...register("answer", { required: true, maxLength: 300 })} />
                </div>
                <button type="submit" className="button" disabled={loading} >{
                    loading ? "Saving ...." : "Save"
                }</button>
            </form>
        </section>

    );
}

export default FormPage