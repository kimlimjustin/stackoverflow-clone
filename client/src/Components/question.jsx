import React, { useEffect, useState } from "react";
import Axios from "axios";
import ReactMarkdown from 'react-markdown';
import moment from "moment";
import Cookies from "universal-cookie";
import getUserByToken from "../Lib/getUserByToken";
import { Link } from "react-router-dom";

const Question = (params) => {
    const [question, setQuestion] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [firstRender, setFirstRender] = useState(true);
    const [inputAnswer, setInputAnswer] = useState('');

    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(result => {
            if(result) setUserInfo(result)
            if(firstRender) setFirstRender(false)
        })
    }, [firstRender])

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER_URL}/questions/get/${params.match.params.questionId}`)        
        .then(res => {
            if(res.data) setQuestion(res.data)
        })
        .catch(() => window.location = "/")
    }, [params.match.params.questionId])

    const postAnswer = e => {
        e.preventDefault();
        const token = new Cookies().get('token')
        Axios.post(`${process.env.REACT_APP_SERVER_URL}/questions/answer`, {token, answer: inputAnswer, answerer: userInfo.email, question: question._id})
        .then(res => {
            console.log(res.data)
            Axios.get(`${process.env.REACT_APP_SERVER_URL}/questions/get/${params.match.params.questionId}`)        
            .then(res => {
                if(res.data) setQuestion(res.data)
            })
            .catch(() => window.location = "/")
            setInputAnswer('')
        })
    }

    return(
        <div className="container">
            <h1 className="question-title">{question?.title}</h1>
            <p>Asked {moment(question?.createdAt).fromNow()}</p>
            <hr />
            <blockquote className="question-body">
                <ReactMarkdown>{question?.body}</ReactMarkdown>
            </blockquote>
            {question?.answers.map(answer => {
                return <div className="my-2" key = {answer.answer}>
                <hr />
                <h1 className="question-title">{answer.answerer.name} answered:</h1>
                <blockquote className="question-body">
                    <ReactMarkdown>{answer.answer}</ReactMarkdown>
                </blockquote>
                </div>
            })}
            <hr />
            {userInfo && !firstRender?
            <form className="my-5" onSubmit = {postAnswer}>
                <h1 className="question-title">Your Answer</h1>
                <textarea rows="8" className="form-control" placeholder = "Your answer (in markdown)" value ={inputAnswer} 
                onChange = {({target: {value}}) => setInputAnswer(value)}></textarea>
                <input type="submit" value="Post Your Answer" className="btn submit-answer-btn my-2" />
            </form>
            :<p><Link to = "/login">Login</Link> to post your answer.</p>}
        </div>
    )
}

export default Question