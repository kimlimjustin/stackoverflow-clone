import React, { useEffect, useState } from "react";
import Axios from "axios";
import ReactMarkdown from 'react-markdown';

const Question = (params) => {
    const [question, setQuestion] = useState(null);

    useEffect(() => {
        Axios.get(`${process.env.REACT_APP_SERVER_URL}/questions/get/${params.match.params.questionId}`)        
        .then(res => {
            if(res.data) setQuestion(res.data)
        })
    }, [params.match.params.questionId])

    return(
        <div className="container">
            <h1 className="question-title">{question?.title}</h1>
            <hr />
            <ReactMarkdown>{question?.body}</ReactMarkdown>
        </div>
    )
}

export default Question