import React, { useEffect, useState } from "react";
import Axios from "axios";
import ReactMarkdown from 'react-markdown';
import moment from "moment";

const Question = (params) => {
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER_URL}/questions/get/${params.match.params.questionId}`)        
        .then(res => {
            if(res.data) setQuestion(res.data)
        })
        .catch(() => window.location = "/")
    }, [params.match.params.questionId])

    return(
        <div className="container">
            <h1 className="question-title">{question?.title}</h1>
            <p>Asked {moment(question?.createdAt).fromNow()}</p>
            <hr />
            <blockquote className="question-body">
                <ReactMarkdown>{question?.body}</ReactMarkdown>
            </blockquote>
        </div>
    )
}

export default Question