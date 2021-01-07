import Axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import getUserByToken from "../Lib/getUserByToken";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const token = new Cookies().get('token');
        getUserByToken(token).then(result => {
            if(result) setUserInfo(result)
            else window.location = "/login"
        })
    }, [])

    const askQuestion = e => {
        e.preventDefault()

        const token = new Cookies().get('token')
        Axios.post(`${process.env.REACT_APP_SERVER_URL}/questions/create`, {token, asker: userInfo.email, title, body})
        .then(res => window.location = `/question/${res.data.id}`)
    }

    return(
        <div className="container">
            <h1>Ask a public question</h1>
            <form className="box box-shdow theme-adjust" onSubmit = {askQuestion}>
                <div className="form-group">
                    <p className="form-label">Title</p>
                    <p>Be specific and imagine you're asking a question to another person</p>
                    <input type="text" className="form-control" placeholder = "e.g. Is there an R function for finding the index of an element in a vector?"
                    value = {title} onChange = {({target: {value}}) => setTitle(value)} />
                </div>
                <div className="form-group my-2">
                    <p className="form-label">Body</p>
                    <p>Include all the information someone would need to answer your question (in markdown):</p>
                    <textarea className="form-control" rows="10" value = {body} onChange = {({target: {value}}) => setBody(value)}></textarea>
                </div>
                <div className="form-group">
                    <input type="submit" value="Submit" className="btn submit-question-btn form-control"/>
                </div>
            </form>
        </div>
    )
}

export default Create;