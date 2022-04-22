import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {  fetchQuestion, postAnswer } from '../actions/questionActions'
import { Question } from '../components/Question'
import { useSelector, useDispatch } from "react-redux";
import { findEmailByUserId } from "../firebase"

const FormPage = ({ match }) => {
    
    const questionState = useSelector((state) => state.question);
    const {loading, question, hasErrors, redirect} = questionState;

    const replyUserId = useSelector((state) => state.auth.uid);
    const userEmail = useSelector((state) => state.auth.email);
    const questionUserEmail = useSelector((state) => state.auth.questionUserEmail);

    const dispatch = useDispatch();
    
    const { register, handleSubmit } = useForm();
    const { id } = match.params
    const history = useHistory();

    const onSubmit = data => {
        data.userId =  replyUserId;
        data.questionId = id;
        data.questionUserEmail = questionUserEmail;
        dispatch(postAnswer(data));
    };

    useEffect(() => {
        dispatch(fetchQuestion(id))
    }, [dispatch, id])

    useEffect(() => {
        console.log("estoy en form answer" + question.userId);
        if (question.userId !== undefined)
            findEmailByUserId(question.userId, dispatch);
    }, [dispatch, question.userId])
    

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
                    <label htmlFor="answer">Answer</label>
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